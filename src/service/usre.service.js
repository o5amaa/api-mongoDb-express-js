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

export const uploadFile = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { userId } = data.body;
      const { file } = data.file;

      console.log("User Id:", userId);

      const userExist = await getUserById(userId);

      if (!userExist) {
        reject({
          code: 0,
          message: "User not found.",
          row: userExist,
        });
      } else {
        await User.updateOne(
          { _id: userId },
          {
            url: data.file.destination,
            image: data.file.filename,
            path: data.file.path,
          }
        );

        resolve({
          code: 1,
          message: "User already exists.",
          // request: { File: data.file, Body: data.body },
          row: await getUserById(userId),
        });
      }
    } catch (error) {
      reject({ code: 2, error: error });
    }
  });
};

const getUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await User.findOne({ _id: id }));
    } catch (error) {
      reject({ code: 2, error: error });
    }
  });
};
