const UserModal = require("../../models/user");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const { email, name, phoneNumber, password } = req.body;
  try {
    let checkUser = await UserModal.findOne({
      $or: [{ email: email }, { name: name }, { phoneNumber: phoneNumber }],
    });

    if (!!checkUser) {
      if (checkUser?.name == name) {
        res.status(403).json({ status: false, message: "Name  already exist" });
      } else if (checkUser?.email == email) {
        res
          .status(403)
          .json({ status: false, message: "Email  already exist" });
      } else if (checkUser?.phoneNumber == phoneNumber) {
        res
          .status(403)
          .json({ status: false, message: "Number  already exist" });
      }
    } else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
      let result = await UserModal.create({
        ...req.body,
        password: passwordHash,
      });
      res.send({
        data: result,
        message: "User create successfully",
        status: true,
      });
    }
  } catch (error) {
    res.status(403).json({ status: false, message: error?.message });
  }
  console.log("createUser");
};
const loginUser = async (req, res) => {
  const { email } = req.body;
  const  passwordData = req.body.password;
  try {
    let result = await UserModal.findOne({ email: email });
    let token = jwt.sign({userId:result._id,email:result.email},process.env.TOKEN_KEY)
    let {...data} = result
    let {_doc}= data
    if (!!result) {
          let passwordCheck = bcrypt.compareSync(passwordData, result?.password); // true

      if (!!passwordCheck) {
        res.send({
          data: { ..._doc,token:token },
          message: "Login SuccessFull",
          status: true,
        });
      } else {
        res.status(403).json({ status: false, message: "Incorrect password" });
      }
    } else {
      res.status(403).json({ status: false, message: "Incorrect email" });
    }
  } catch (error) {
    res.status(403).json({ status: false, message: error?.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
