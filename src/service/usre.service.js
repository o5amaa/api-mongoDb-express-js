import User from "../model/user.model.js";

export const createUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = new User(data);
      const { email } = userData;
      const userExist = await User.findOne({ email });
      if (userExist) {
        reject({
          message: "User already exist.",
          row: userData,
        });
      } else {
        const saved = await userData.save();
        resolve(saved);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userData = new User(data);
      const { email, name } = userData;
      const userExist = await User.findOne({ email, name });
      if (!userExist) {
        console.log("userData:", userData);
        reject({
          code: 0,
          message: "User not found.",
          row: userData,
        });
      } else
        resolve({ code: 1, message: "User already exist.", row: userExist });
    } catch (error) {
      reject({ code: 2, error: error });
    }
  });
};
