export const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "Access Denied Only Admins Allowed!" });
  }
};

//this is userMiddelWare function

export const userMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "user") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access Denied Only Admins Allowed!" });
    }
  };

export const guideMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "guide") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Access Denied Only Guides Allowed!" });
    }
  };