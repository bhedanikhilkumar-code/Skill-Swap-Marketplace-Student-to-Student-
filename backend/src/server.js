import http from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { connectDb } from './config/db.js';
import { env } from './config/env.js';
import { setSocket } from './services/socketService.js';
import Message from './models/Message.js';
import Swap from './models/Swap.js';

const bootstrap = async () => {
  await connectDb();
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: '*' } });
  setSocket(io);

  io.on('connection', (socket) => {
    socket.on('join-swap', async ({ swapId, userId }) => {
      const swap = await Swap.findById(swapId);
      if (swap?.status === 'ACCEPTED' && [swap.fromUser.toString(), swap.toUser.toString()].includes(userId)) {
        socket.join(`swap:${swapId}`);
      }
    });

    socket.on('send-message', async ({ swapId, senderId, text }) => {
      const swap = await Swap.findById(swapId);
      if (!swap || swap.status !== 'ACCEPTED') return;
      const message = await Message.create({ swapId, senderId, text, readBy: [senderId] });
      io.to(`swap:${swapId}`).emit('new-message', message);
    });
  });

  server.listen(env.port, () => console.log(`Server on :${env.port}`));
};

bootstrap();
