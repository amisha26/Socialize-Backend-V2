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
    
}