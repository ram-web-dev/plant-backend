import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  let jwtToken;
  const authHeader = req.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    return res.status(401).send({ errorMessage: "Invalid Access Token" });
  } else {
    jwt.verify(jwtToken, process.env.JWT_SECRET_TOKEN, async (err, payload) => {
      if (err) {
        return res.status(401).send({ errorMessage: "Invalid Access Token" });
      } else {
        req.email = payload.email;
        req.role = payload.role;
        next();
      }
    });
  }
};

export default verifyJWT;
