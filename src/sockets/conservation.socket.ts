import { Server, Socket } from "socket.io";
import { IJoinConservationSocket } from "~/interfaces/conservation.interface";
import { ISendMessageSocket } from "~/interfaces/message.interface";
import { connectedUserSocket } from "./user.socket";

export class ConservationSocket{
    private io: Server;
    constructor(io: Server){
        this.io = io;
    }

    public listen(){
        this.io.on("connection", (socket: Socket) => {
            socket.on("joinConservation", (data: IJoinConservationSocket) => {
                const {conservation} = data;
                socket.join(`conservation:${conservation._id}`)
            })

            socket.on("sendMessage", (data: ISendMessageSocket) => {
                const {message, conservation} = data;
                socket.broadcast.emit('receivedMessage', message)
                const {users} = conservation;

                // Case user is online but not in conservation
                for(const user of users){
                    const isInRoom = this.io.sockets.adapter.rooms.has(socket.id);

                    if(connectedUserSocket.has(user as string) && !isInRoom){
                        socket.to(user as string).emit('receivedMessage', message)
                    }
                }
            })
        })
    }
}