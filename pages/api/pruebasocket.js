import { Server } from 'socket.io'

const sessionStore = new Map()
global.onlineUsers = new Map();

const SocketHandler = (req, res) => {
    try {
        if (res.socket.server.io) {
            console.log('Socket is already running')
        } else {
            console.log('Socket is initializing')
            const io = new Server(res.socket.server)
            res.socket.server.io = io
            io.on("connection", (socket) => {
                socket.on("add-user", (userId) => {
                    console.log(userId);
                    onlineUsers.set(userId, socket.id);
                    console.log(onlineUsers);
                });

                socket.on("send-msg", (data) => {
                    console.log(data);
                    const sendUserSocket = onlineUsers.get(data.to);
                    console.log(sendUserSocket);
                    console.log(onlineUsers);
                    if (sendUserSocket) {
                        socket.to(sendUserSocket).emit("msg-recieve", data.content);
                    }
                });
            });
        }
        console.log("conexion cerrada");
        res.end()
    } catch (error) {
        console.log(error);
    }

}
export default SocketHandler