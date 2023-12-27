import { db } from "../utils/connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Register a user
export const register = (req, res) => {
    try {
        const { username, password, email, name } = req.body;

        // CHECK IF USER EXISTS
        const query = "SELECT * FROM users WHERE username = ?"

        db.query(query, [username], (err, data) => {
            if (data.length)
                return res.status(409).json("User already exists")
            // CREATE A NEW USER
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(password, salt);

            const query1 = "INSERT INTO users (`username`, `password`, `email`, `name`) VALUE (?)"
            const values = [username, hashedPassword, email, name]
            db.query(query1, [values], (err, data) => {
                return res.status(200).json("User has been created")
            })
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}


// Login User
export const login = (req, res) => {
    try {
        const { username, password } = req.body;

        // CHECK IF USER EXISTS
        const query = "SELECT * FROM users WHERE username = ?"

        db.query(query, [username], (err, data) => {
            if (data === null)
                return res.status(404).json("User not found")
            const checkPassword = bcrypt.compareSync(password, data[0].password)
            if (!checkPassword) 
                return res.status(400).json("Wrong password or username")

            const token = jwt.sign({ id: data[0].id }, "secretkey")

            //const { password: _, ...others } = data[0];
            res.cookie("accessToken", token, {
                httpOnly: true,
            }).status(200).json("Login successful");
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}



export const logout = (req, res) => {
    res.send("it works!")
}