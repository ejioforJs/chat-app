const express = require("express")
const {sendMessage, allMessages, sendNotif} = require("../controllers/messageControllers")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

router.route("/").post(protect, sendMessage)
router.route("/:chatId").get(protect,allMessages)
router.route("/notif").post(protect, sendNotif)

module.exports = router

