const user = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next)=>{
    try {
        const {username, email, password} = req.body;
    const usernameCheck = await user.findOne({username});
    if(usernameCheck){
        return res.json({msg: "Username already present.", status: false});
    }
    const emailCheck = await user.findOne({email});
    if(emailCheck){
        return res.json({msg: "Email already in use.", status: false});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
        username, email, password: hashedPassword
    });
    delete user.password;
    return res.json({status: true, user});
    } catch (error) {
        next(error);
    }
}