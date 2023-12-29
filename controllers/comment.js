import { db } from "../utils/connect.js"

export const getComments = (req, res) => {
    const { postId } = req.query;

    const query = `SELECT c.*, u.name, u.profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId) WHERE c.postId = ? ORDER BY c.createdAt DESC`;
    db.query(query, [postId], (err, data) => {
        return res.status(200).json(data)
    })
}