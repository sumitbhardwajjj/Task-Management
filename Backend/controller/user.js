const model = require("../models/user");
const USERS = model.USERS;
const JWT = require("jsonwebtoken");
const bcrypt = require('bcrypt')

exports.Signup = async (req, res) => {
  try {
    const doc = await USERS.findOne({ email: req.body.email });

    if (doc) {
      return res.json("exist");
    }

    const user = new USERS(req.body);

    const hash = bcrypt.hashSync(req.body.password, 10);
    user.password = hash;

    await user.save();
    res.status(201).json("OK");
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json("Internal Server Error");
  }
};

exports.Login = async (req, res) => {
  try {
    const doc = await USERS.findOne({ email: req.body.email });

    if (!doc) {
      return res.json("not");
    }
    const isAuth = bcrypt.compareSync(req.body.password, doc.password);

    if (isAuth) {

      const token = JWT.sign({ email: doc.email }, process.env.SECRET);

      doc.token = token;
  
      await doc.save();

      res.json({ token });
    } else {

      res.sendStatus(401);
    }
  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


