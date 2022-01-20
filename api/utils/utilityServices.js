const Sequelize = require("sequelize");
const { db } = require("../config/connection");

const getMaxIdOfRecords = async (Model, recordIdFieldName) => {
  const maxRecordData = await Model.findOne({
    attributes: [
      [Sequelize.fn("max", Sequelize.col(recordIdFieldName)), "maxRowId"],
    ],
    raw: true,
  });
  return maxRecordData["maxRowId"] ? maxRecordData["maxRowId"] : 0;
};

const checkIfIsCurrentRowActive = async (Model, rowIdFieldName, rowId) => {
  if (typeof rowIdFieldName !== "undefined" && typeof rowId !== "undefined") {
    // beta validaion
    const whereClause = {};
    whereClause[rowIdFieldName] = rowId;
    const oldRowData = await Model.findOne({
      attributes: ["status"],
      where: whereClause,
    });
    return oldRowData["status"] == "active" ? true : false;
  }
  else{
    console.log("checkIfIsCurrentRowActive params missing");
    return false;
  }
};

const getOldRecordData = async (Model, recordIdFieldName, recordId) => {
  const whereClause = {};
  whereClause[recordIdFieldName] = recordId;
  whereClause["status"] = "active";
  const oldRowData = await Model.findOne({
    where: whereClause,
  });
  return oldRowData;
};

const insertNewRecord = async (Model, data, transaction = null) => {
  let insertData = {};
  if(transaction){
    // has transaction
    insertData = await Model.create(data, {
      transaction: transaction
    });
  }else{
    // doesnt have a transaction
    insertData = await Model.create(data);
  }
  return insertData;
};

const insertUpdateNewRecord = async (Model, data, transaction = null) => {
  try {
    const newDataValues = { ...data };
    Object.keys(data).forEach((key, index) => {
      if (index === 0) {
        delete newDataValues[key];
      }
    });
  
    let insertData = {};
    if(transaction){
      // has transaction
      insertData = await Model.create(newDataValues, {
        transaction: transaction
      });
    }else{
      // does not have transaction
      // this block should be removed once transactions have been applied to all
      insertData = await Model.create(newDataValues);
    }
  
    return insertData;
  } catch (error) {
    throw new Error(error);
  }
};

const updateOldRecord = async (Model, recordIdFieldName, recordId, transaction = null) => {
  try {
    const whereClause = {};
    whereClause[recordIdFieldName] = recordId;
    whereClause["status"] = "active";
    let updateData = {};
    if(transaction){
      // has transaction
      updateData = await Model.update(
        { status: "deactive" },
        {
          where: whereClause,
          raw: true,
          transaction: transaction
        }
      );
    }else{
      // does not have transaction
      // this block should be removed once transactions have been applied to all
      updateData = await Model.update(
        { status: "deactive" },
        {
          where: whereClause,
          raw: true,
        }
      );
    }
    return updateData;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createWithHistoryRecord: async (DataModel, dataFields, index = 0, transaction = null) => {
    try {
      const recordIdFieldName = dataFields["ROW_ID"];
      const maxRecordId = await getMaxIdOfRecords(DataModel, recordIdFieldName);
      dataFields[dataFields["ROW_ID"]] = maxRecordId + (index + 1);
      let newRecordData = {};
      if(transaction){
        // has transaction
        newRecordData = await insertNewRecord(DataModel, dataFields, transaction);
      }else{
        // doesnot have a transaction//
        newRecordData = await insertNewRecord(DataModel, dataFields);
      }
      return newRecordData;
    } catch (error) {
      throw error;
    }
  },

  updateWithHistoryRecord: async (
    DataModel,
    dataFields,
    recordId,
    status = "edit",
    rowId,
    rowIdFieldName
  ) => {
    const recordState = await checkIfIsCurrentRowActive(
      DataModel,
      rowIdFieldName,
      rowId
    );
    if (recordState) {
      let transaction = await db.transaction();
      try {
        const newDataValues = { ...dataFields };
        Object.keys(dataFields).forEach((key) => {
          if (typeof dataFields[key] === "undefined") {
            delete newDataValues[key];
          }
        });
        const recordIdFieldName = dataFields["ROW_ID"];
        const updatedRecordData = await getOldRecordData(
          DataModel,
          recordIdFieldName,
          recordId
        );
        const updatedRecord = await updateOldRecord(
          DataModel,
          recordIdFieldName,
          recordId,
          transaction
        );
        newDataValues["status"] = status == "edit" ? "active" : "delete";
        const toUpdateDataField = {
          ...updatedRecordData.dataValues,
          ...newDataValues,
        };
        const newUpdateRecordData = await insertUpdateNewRecord(
          DataModel,
          toUpdateDataField,
          transaction
        );
        await transaction.commit();
        return newUpdateRecordData;
      } catch (error) {
        console.log(error);
        await transaction.rollback();
        throw error;
      }
    } else {
      return {
        msg_status: "fail",
        messsage:
          "This record has been updated by another user, please reload to view the updated record",
      };
    }
  },
  deactivateRecord: async (Model, recordIdFieldName, recordId) => {
    return updateOldRecord(Model, recordIdFieldName, recordId);
  },

/**
 * <b>Common function to generate the where clause for unit id search</b>
 * @author Sandun M
 *
 */
commonUnitIdClauseQueryBuilder : (
  unitId,
  complexId,
  userId,
  tableName,
  unitIdColumnName
) => {
  let unitIdWhereClause = "";
  if (typeof unitId !== "undefined" && unitId != "undefined") {
    unitIdWhereClause = ` ${tableName}.${unitIdColumnName} = ${unitId} `;
  } else {
    // query for all units of user in this complex
    unitIdWhereClause = ` ${tableName}.${unitIdColumnName} IN(
      select apartment_unit_user_relationship.apartment_unit_id 
      from apartment_unit_user_relationship
      JOIN apartment_unit ON apartment_unit_user_relationship.apartment_unit_id = apartment_unit.apartment_unit_id
      JOIN apartment_block ON apartment_unit.apartment_block_id = apartment_block.apartment_block_id
      where apartment_block.status = 'active' 
      AND apartment_unit.status = 'active' 
      AND apartment_block.apartment_complex_id = ${complexId} 
      AND apartment_unit_user_relationship.user_id = ${userId}
    ) `;
  }

  return unitIdWhereClause;
},

/**
 * Common util function to build a url to append to the asset path
 * 
 * @author Sandun M
 * @since 2021-10-07
 */
getAssetBaseURL : () => {
  const { SERVER_HOST, PORT, SERVER_PROTOCOL } = process.env;
  return `${SERVER_PROTOCOL}://${SERVER_HOST}:${PORT}/api/v1/assets/getAsset?filePath=`;
}

};
