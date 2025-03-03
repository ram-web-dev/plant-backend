import dbPromise from "../db/connectDb.js";

export const createUser = async (username, email, password) => {
  const db = await dbPromise;
  const createUserQuery =
    "INSERT INTO users(name, email, password) VALUES(?, ?, ?)";
  await db.run(createUserQuery, [username, email, password]);
};

export const getUserByEmail = async (email) => {
  const db = await dbPromise;
  const getUserByEmailQuery = "SELECT * FROM users WHERE email = ?";
  const user = await db.get(getUserByEmailQuery, [email]);
  return user;
};
