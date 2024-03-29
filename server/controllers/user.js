import {User} from '../models/user.js'

// Create a new user and save it to the database and save in cookie
const newUser=async(req,res)=>{
    const avatar={
        public_id:"sdfsd",
        url:"asdfd",
    }
    await User.create({
        name:"Chaman",
        username:"chaman",
        password:"chaman",
        avatar,
    })
    res.status(201).json({message:"User created successfully"});
};

const login = (req,res) => {
    res.send("Hello");
}

export {
    login,
    newUser
};