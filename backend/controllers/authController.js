import User from "../model/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


// REGISTER USER

export const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK IF USER EXISTS

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // HASH PASSWORD

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE USER

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // SEND RESPONSE

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};



// LOGIN USER

export const loginUser = async (req, res) => {

  try {

    const email = req.body?.email;
    const password = req.body?.password;

    if (!email || !password) {

    return res.status(400).json({
    message: "Please provide email and password",
    });

}

    // FIND USER

    const user = await User.findOne({ email });

    // CHECK PASSWORD

    if (
      user &&
      (await bcrypt.compare(password, user.password))
    ) {

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });

    } else {

      res.status(401).json({
        message: "Invalid email or password",
      });

    }

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};