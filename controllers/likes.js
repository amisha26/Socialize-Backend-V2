import { db } from "../utils/connect.js"
import jwt from "jsonwebtoken"

export const getLikes = (req, res) => {
    const { postId } = req.query;

    const query = "SELECT userId from likes WHERE postId = ?"

    db.query(query, [postId], (err, data) => {
        if (err)
            return res.status(500).json(err);
        return res.status(200).json(data)
    })
}

export const addLike = (req, res) => {
    try {
        const { postId } = req.body;
        const token = req.cookies.accessToken;
        if (!token)
            return res.status(401).json("Not logged in")
        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err)
                return res.status(401).json("Token invalid")
            const query = "INSERT INTO likes (`userId`, `postId`) VALUES (?)"
            const values = [userInfo.id, postId]
            db.query(query, [values], (err, data) => {
                return res.status(200).json("Post has been liked")
            })
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}


export const deleteLike = (req, res) => {
    try {
        const { postId } = req.body;
        const token = req.cookies.accessToken;
        if (!token)
            return res.status(401).json("Not logged in")
        jwt.verify(token, "secretkey", (err, userInfo) => {
            if (err)
                return res.status(401).json("Token invalid")
            const query = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?"
            const values = [userInfo.id, postId]
            db.query(query, [values], (err, data) => {
                return res.status(200).json("Post has been deleted")
            })
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}