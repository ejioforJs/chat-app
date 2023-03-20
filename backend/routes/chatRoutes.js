import { Router } from "express"
import { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } from "../controllers/chatControllers.js"
import { protect } from "../middleware/authMiddleware.js"

const chatRouter = Router()

chatRouter.route("/").post(protect, accessChat)
chatRouter.route("/").get(protect, fetchChats)
chatRouter.route("/group").post(protect, createGroupChat)
chatRouter.route("/rename").put(protect, renameGroup)
chatRouter.route("/groupadd").put(protect, addToGroup)
chatRouter.route("/groupremove").put(protect, removeFromGroup)

export default chatRouter
