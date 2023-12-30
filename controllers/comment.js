import { db } from "../utils/connect.js"
import jwt from "jsonwebtoken"
import moment from "moment"

export const getComments = (req, res) => {
    const { postId } = req.query;

    const query = `SELECT c.*, u.name, u.profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`;
    db.query(query, [postId], (err, data) => {
        return res.status(200).json(data)
    })
}


export const addComment = (req, res) => {
    const { desc, postId } = req.body;

    const token = req.cookies.accessToken;
    if (!token) 
        return res.status(401).json("not logged in")
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err)
            return res.status(403).json("Token is not valid")
        
        const query = "INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";
        const values = [
            desc,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            postId
        ];
        db.query(query, [values], (err, data) => {
            if (err)
                return res.status(500).json(err)
            return res.status(200).json("Comment has been created");
        })
    })
}