import express from "express";
import { getComments, addComment } from "../controllers/comment.js"

const router = express.Router()

router.get("/", getComments)
router.post("/add_comment", addComment)


export default router