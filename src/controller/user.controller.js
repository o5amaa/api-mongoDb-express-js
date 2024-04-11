import { createUser, fetchUser } from "../service/usre.service.js";

export const addUser = (req, res) => {
  console.log("Start Create User");

  try {
    console.log(req.body);

    createUser(req.body)
      .then((data) => {
        console.info("Data: ", data);

        res.status(200).json({
          status: `${res.statusCode}`,
          msg: "ok",
          length: data.length,
          response: data,
        });
      })
      .catch((err) => {
        console.error("Err: ", err);

        res.status(400).json({
          status: `${res.statusCode}`,
          message: err.message,
          error: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      status: `${res.statusCode}`,
      error: error,
    });
  }
};


export const getUser = async (req, res)=>{
  console.log("Start Get User");

  try {
    console.log(req.body);

    fetchUser(req.body)
      .then((data) => {
        console.info("Data: ", data);

        res.status(200).json({
          status: `${res.statusCode}`,
          msg: "ok",
          length: data.length,
          response: data,
        });
      })
      .catch((err) => {
        console.error("Err: ", err);

        res.status(400).json({
          status: `${res.statusCode}`,
          message: err.message,
          error: err,
        });
      });
  } catch (error) {
    res.status(500).json({
      status: `${res.statusCode}`,
      error: error,
    });
  }
}
