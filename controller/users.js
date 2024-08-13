import { User } from "../model/mongoDB/user.js";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const userController = {
  async getAll(req, res) {
    const productCollection = await Product.find();
    productCollection
    ? res.status(200).json({
        succes:true,
        message: "List of users",
        data: productCollection,
    })
    : res
        .status(404)
        .json({ success: false, message: "Users database empty"});
    
  },
    async registerUser(req, res) {
        const { fullName, email } = req.body;
        const password = await bcrypt.hash(req.body.password, saltRounds);
        const data = { fullName, email, password };
        const newUser = new User(data);
        try {
            const savedUser = await newUser.save();
            res
              .status(201)
              .json({ sucess: true, message: "User registered", data: savedUser });
          } catch (err) {
            res
              .status(500)
              .json({ sucess: false, message: "Internal Error: " + err.message });
          }
        },
      
        async loginUser(req, res) {
          const user = await User.find().where({ email: req.body.email });
          if (!user.length) {
            return res
              .status(401)
              .json({ success: false, message: "Incorrect Email or Password" });
          }
      
          const hashedPassword = user[0].password;
          const match = await bcrypt.compare(req.body.password, hashedPassword);
          if (!match) {
            return res
              .status(401)
              .json({ success: false, message: "Incorrect Email or Password" });
          }
      
          const accessToken = await token.generate(user[0]);
          res
            .status(200)
            .json({ sucess: true, message: "user logged in", data: accessToken });
        },
};
