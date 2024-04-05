import express from "express";
import { getMyChats, getMyGroups, newGroupChat,addmembers, removemembers, leaveGroup, sendAttachments, getChatDetails, renameGroup, deleteChat, getMessages } from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import { addMemberValidator, chatIdValidator, newGroupValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, validateHandler } from "../lib/validators.js";

const app = express.Router();



// After here user must be logged in to access the route
app.use(isAuthenticated);

app.post("/new",newGroupValidator(),validateHandler,newGroupChat);
app.get("/my",getMyChats);
app.get("/my/groups",getMyGroups);

app.put("/addmembers",addMemberValidator(),validateHandler,addmembers);

app.put("/removemember",removeMemberValidator(),validateHandler,removemembers);

app.delete("/leave/:id",chatIdValidator(),validateHandler,leaveGroup);

// Send Attachment
app.post("/message",attachmentsMulter,sendAttachmentsValidator(),validateHandler,sendAttachments);

// Get messages
app.get("/message/:id",chatIdValidator(),validateHandler,getMessages);

app
    .route("/:id")
    .get(chatIdValidator(),validateHandler,getChatDetails)
    .put(renameValidator(),validateHandler,renameGroup)
    .delete(chatIdValidator(),validateHandler,deleteChat);

export default app;