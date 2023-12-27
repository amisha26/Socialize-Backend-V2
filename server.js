import express from "express";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likesRoute from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();


// middlewares
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// Routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likesRoute)
app.use("/api/auth", authRoutes)


const PORT = 8080
app.listen(PORT, () => console.log(`API working at port ${PORT}`) )