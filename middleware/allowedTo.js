const appError = require("../utils/appError");

module.exports = (...roles) => {
  // ["ADMIN", "MANAGER"]
  // console.log(roles);
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(appError.create("This role is not authorized", 401));
    }
    next();
  };
};
