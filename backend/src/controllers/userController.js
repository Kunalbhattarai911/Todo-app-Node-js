import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TodoList } from "../models/todoListModel.js";

export const userRegistration = async (req, res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            email,
            address,
            age,
            phoneNumber,
            gender,
            password
        } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "This Email is already registered. Please try again with another valid email.",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            firstName,
            middleName,
            lastName,
            email,
            address,
            age,
            gender,
            password: hashedPassword,
            phoneNumber
        });

        return res.status(201).json({
            message: "User Registration Successful",
            success: true,
            firstName,
            middleName,
            lastName,
            email,
            address,
            age,
            gender,
            phoneNumber
        });

    } catch (error) {
        console.log("Error Details", error);
        return res.status(500).json({
            message: "An error occurred while registering the user",
            error: error.message,
            success: false
        });
    }
};


export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(403).json({
                message: "Email or password is wrong.",
                success: false
            })
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(403).json({
                message: "Email or password is wrong",
                success: false
            })
        }

        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: '24h' })

       const userDetails = {
            _id: user._id,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            age: user.age,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
        }

        //cookie tarika le login garna sath cookie store hunxa 
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: "Login Successful",
            success: true,
            token,
            userDetails
        })



    } catch (error) {
        console.log("Error Details", error);
        return res.status(500).json({
            message: "An error occurred while logging the user",
            error: error.message,
            success: false
        });
    }
}


export const updateUserDetail = async (req,res) => {
    try {
        const {
            firstName,
            middleName,
            lastName,
            email,
            address,
            age,
            phoneNumber,
            gender,
        } = req.body;

        const userId = req.id; // Middleware authentication
        
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }

        const useremail = await User.findOne({ email });
        if (useremail) {
            return res.status(400).json({
                message: "This Email is already registered.",
                success: false
            });
        }

        //update garne tarika
        if(firstName) user.firstName = firstName;
        if(middleName) user.middleName = middleName;
        if(lastName) user.lastName = lastName;
        if(email) user.email = email;
        if(address) user.address = address;
        if(age) user.age = age;
        if(gender) user.gender = gender;
        if(phoneNumber) user.phoneNumber = phoneNumber;

        await user.save();

        //aaba update vayepaxi k return garne 
        user = {
            _id: user._id,
            firstName: user.firstName,
            middleName: user.middleName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            age: user.age,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
        }

        return res.status(201).json({
            message : "User Profile Updated Successfully.",
            success : true,
            user
        })

    } catch (error) {
        console.log("Error Details", error);
        return res.status(500).json({
            message : "An Error occured while updating the user profile.",
            error : error.message,
            success : false
        })
        
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while logging out the user",
            error: error.message,
            success: false
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;  

        // Find the user by ID
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                success: false
            });
        }

        // yadi yo userid ma todo ko list xa vane delete garda sab task remove garne tarika
        await TodoList.deleteMany({ userId: id });

        // Delete the user
        await user.deleteOne();

        return res.status(200).json({
            message: "User and all related tasks deleted successfully.",
            success: true
        });
    } catch (error) {
        console.log("Error Details:", error);
        return res.status(500).json({
            message: "An error occurred while deleting the user",
            error: error.message,
            success: false
        });
    }
};