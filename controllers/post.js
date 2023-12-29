import { db } from "../utils/connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"

export const getPosts = (req, res) => {
    try {
        const token = req.cookies.accessToken;
        if (!token)
            return res.status(401).json("Not logged in")
        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err)
                return res.status(401).json("Token invalid")
            const query = `SELECT p.*, u.name, u.profilePic FROM post AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ?`;
            db.query(query, [userInfo.id, userInfo.id], (err, data) => {
                console.log(data)
                return res.status(200).json(data)
            })
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}


export const addPost = (req, res) => {
    try {
        const { desc, img } = req.body;
        const token = req.cookies.accessToken;
        if (!token)
            return res.status(401).json("Not logged in")
        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err)
                return res.status(401).json("Token invalid")
            const query = "INSERT INTO post (`desc`, `img`, `userId`, `createdAt`) VALUE (?)"
            const values = [desc, img, userInfo.id, moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")]
            db.query(query, [values], (err, data) => {
                return res.status(200).json("Post has been created")
            })
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}