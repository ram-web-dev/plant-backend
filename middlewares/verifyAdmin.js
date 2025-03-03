const verifyAdmin = (req, res, next) => {
  if (!req.role || req.role !== "admin") {
    return res.status(403).send({ err_msg: "Access Denied" });
  } else {
    next();
  }
};

export default verifyAdmin;
