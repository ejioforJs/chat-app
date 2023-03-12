const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./data/data');
const connectdb = require("./config/db")
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const mongoose = require('mongoose');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const path = require("path")

dotenv.config();
connectdb()

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send('api is running');
// });

// app.get('/api/getList', (req,res) => {
//   var list = ["item1", "item2", "item3"];
//   res.json(list);
//   console.log('Sent list of items');
// });

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

// const __dirname = path.resolve()

app.use(express.static(path.join(__dirname, "/frontend/build")))

app.get("*", (req, res) =>
  res.sendFile(
    path.join(__dirname, "/frontend/build/index.html")
  )
)

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 2000;

const server = app.listen(PORT, console.log(`server started on port ${PORT}`));

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
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
