import User from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {

    const { username, email, password } = req.body;

    try {

        
        const  userFoundByEmail = await User.findOne({email});

        const userFoundByUsername = await User.findOne({username});

        if(userFoundByUsername && userFoundByEmail) return res.status(400).json(["El usuario y el correo ya están en uso"]);
        
        if(userFoundByEmail) return res.status(400).json(["El email está en uso"]);

        if(userFoundByUsername) return res.status(400).json(["El nombre de usuario está en uso"]);

        const passwordHash = await bcrypt.hash(password, 10); //aletoy hash string
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save(); 

        const token = await createAccessToken({id: userSaved._id});
        res.cookie('token', token);
        res.json({
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            createAt: userSaved.createdAt,
            updateAt: userSaved.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const userFound = await User.findOne({email});

        if(!userFound) return res.status(400).json(["Usuario inexistente"]);


        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch) return res.status(400).json(["Contraseña Incorrecta"]); 

        const token = await createAccessToken({id: userFound._id});
        res.cookie('token', token);
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updateAt: userFound.updatedAt,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
};

export const logout = (req, res) => {
    res.cookie('token', "",{
        expires: new Date(0),
    });

    return res.sendStatus(200);
};


//Profile have a middleware and this pass the argument req.user in req parameter
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if(!userFound) return res.status(400).json({message: "User not found"});
    return res.json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
    });
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies;

    if(!token) return res.status(401).json({message: "Unauthorized"});


    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({message: "Invalid Token"});

        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json({message: "User not found"});

        return res.json({
            id: userFound._id,
            email: userFound.email,
        });
    })

}