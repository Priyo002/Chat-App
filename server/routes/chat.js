import express from "express";
import { getMyChats, getMyGroups, newGroupChat,addmembers, removemembers, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";

const app = express.Router();



// After here user must be logged in to access the route
app.use(isAuthenticated);

app.post("/new",newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);

app.put("/addmembers",addmembers);
app.put("/removemember",removemembers);

app.delete("/leave/:id",leaveGroup);

// Send Attachment
app.post("/message",attachmentsMulter,sendAttachments);

// Get messages
app.get("/message/:id",getMessages);

app.route("/:id").get(getChatDetails).put(renameGroup).delete(deleteChat);

export default app;