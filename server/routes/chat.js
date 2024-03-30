import express from "express";
import { getMyChats, getMyGroups, newGroupChat,addmembers } from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";

const app = express.Router();



// After here user must be logged in to access the route
app.use(isAuthenticated);

app.post("/new",newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);

app.put("/addmembers",addmembers)

export default app;