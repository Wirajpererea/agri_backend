const { verifyToken } = require("../../utils/cipherServices");

module.exports = {
  verifyUser: (req, res, next) => {
    if (
      req.path === "/v1/auth/register" ||
      req.path === "/v1/mobile/constantRouter/getCountries" ||
      req.path === "/v1/assets/getAsset" ||
      req.path === "/v1/auth/login" ||
      req.path === "/v1/mobile/auth/checkPhoneNumberAvailability" ||
      req.path === "/v1/mobile/auth/checkPasswordAvailability" ||
      req.path === "/v1/mobile/auth/checkLoginOtp" ||
      req.path === "/v1/mobile/userDataRouter/getIsNewUser" ||
      req.path === "/v1/mobile/apartment/getUserApartmentComplexes" ||
      req.path === "/v1/mobile/userDataRouter/saveUserLoginData" ||
      req.path === "/v1/auth/sendForgotPasswordEmailWeb" ||
      req.path === "/v1/auth/setNewPassword"
    ) {
      next();
    } else {
      try {
        const isUserValid = verifyToken(
          req.headers.authorization.split(" ")[1]
        );
        if (Object.keys(isUserValid).length > 0) {
          next();
        } else {
          res
            .status(400)
            .send({ status: "fail", message: "Invalid authentication" });
        }
      } catch (error) {
        res
          .status(400)
          .send({ status: "fail", message: "Invalid authentication" });
      }
    }
  },
};
