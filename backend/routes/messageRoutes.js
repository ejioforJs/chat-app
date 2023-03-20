import { Router } from "express"
import { sendMessage, allMessages, sendNotif } from "../controllers/messageControllers.js"
import { protect } from "../middleware/authMiddleware.js"

const messageRouter = Router()

messageRouter.route("/").post(protect, sendMessage)
messageRouter.route("/:chatId").get(protect,allMessages)
messageRouter.route("/notif").post(protect, sendNotif)

export default messageRouter

