import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoutes.js';
import messageRouter from './routes/messageRoutes.js';
import pkg from 'mongoose';
const { connect } = pkg;
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { resolve, join } from "path";
import { Server } from "socket.io";
import cors from "cors"

// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            //access-control-allow-credentials:true
//   optionSuccessStatus:200
// }

// connectdb()
config()

connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(cors())

app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message', messageRouter);

const __dirname = resolve()

app.use(express.static(join(__dirname, "/frontend/build")))

app.get("*", (req, res) =>
  res.sendFile(
    join(__dirname, "/frontend/build/index.html")
  )
)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 2000;

const server = app.listen(PORT, console.log(`server started on port ${PORT}`));

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'https://jweb-chat-app.onrender.com',
  },
});

io.on('connection', (socket) => {
  console.log('connected to socket.io');

  socket.on('setup', (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
    console.log('User joined room: ' + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"))
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"))

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log('chat.users not defined');

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit('message recieved', newMessageRecieved);
    });
  });
});
