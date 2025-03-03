import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail } from "../models/userModel.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .send({ err_msg: "Username, Email, Password cannot be empty!" });
  }

  const user = await getUserByEmail(email);

  if (user !== undefined) {
    return res.status(409).send({ errMsg: "email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await createUser(username, email, hashedPassword);
  res.sendStatus(201);
};

export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ errMsg: "Email, Password cannot be empty!" });
  }

  const user = await getUserByEmail(email);
  if (user === undefined) {
    return res.status(404).send({ errMsg: "Email not found" });
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return res.status(401).send({ errMsg: "Invalid Password" });
  }

  const userPayload = { email: user.email, role: user.role };
  const jwtToken = jwt.sign(userPayload, process.env.JWT_SECRET_TOKEN);
  res.send({
    jwtToken,
    role: user.role,
  });
};
