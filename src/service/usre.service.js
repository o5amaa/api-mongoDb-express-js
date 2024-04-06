import User from "../model/user.model.js"


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
      }

      const saved = await userData.save();
      resolve(saved);
    } catch (error) {
      reject(error);
    }
  });
};
