import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../utils/authUtil.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address , answer } = req.body;

    // validations
    if (!name) {
      return res.send({ message: "Name is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no. is required" });
    }
    if (!address) {
      return res.send({ message: "Address is required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is required" });
    }

    // check user
    const existingUser = await userModel.findOne({ email });
    // check if user already exists
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }
    // register user
    const hashedPassword = await hashPassword(password);
    // save user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// POST LOGIN

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validations
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    // check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    // check password
    const isMatch = await comparePassword(password, user.password);
    // check if password is correct
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    // create token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {

        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// test controller
export const testController = (req, res) => {
   try{
    res.send("Protected route");
   }catch(error){
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in test controller",
      error,
    });
   }
};

// forgot password controller

export const forgotPasswordController = async (req, res) => {
  try {
      const { email, answer, newPassword } = req.body;
      // validations
      if(!email){
        return res.status(400).send({ message: "Email is required" });
      }
      if(!answer){
        return res.status(400).send({ message: "Answer is required" });
      }
      if(!newPassword){
        return res.status(400).send({ message: "New password is required" });
      }
      // check user
      const user = await userModel.findOne({ email, answer });
      // check if user exists
      if(!user){
        return res.status(404).send({
          success: false,
          message: "Wrong Email or Answer",
        });
      }
      // hash new password
      const hashed = await hashPassword(newPassword);
      // update password
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset successfully",
      });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
}

// update user profile controller
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password -answer"); // Exclude sensitive fields
    res.status(200).send({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error fetching users",
      error,
    });
  }
};