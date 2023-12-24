import Express from "express";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import likesRoute from "./routes/likes.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";


const app = Express();

// Routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likesRoute)
app.use("/api/auth", authRoutes)


const PORT = 8800
app.listen(PORT, () => console.log(`API working at port ${PORT}`) )