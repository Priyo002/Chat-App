import express from "express";
import { getMyChats, getMyGroups, newGroupChat } from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();



// After here user must be logged in to access the route
app.use(isAuthenticated);

app.post("/new",newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);

export default app;