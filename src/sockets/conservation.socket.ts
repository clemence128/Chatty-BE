import { Server, Socket } from "socket.io";
import { IJoinConservationSocket } from "~/interfaces/conservation.interface";
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
                console.log(`ROOMS: `, this.io.sockets.adapter.rooms)
            })

            socket.on("sendMessage", (data) => {
                const {message, conservation} = data;
                socket.to(`conservation:${conservation._id}`).emit('receivedMessage', {message, conservation})
                const {users} = conservation;

                // Case user is online but not in conservation
                // const onlineUser = Array.from(this.io.sockets.sockets.values())
                //                     .filter(socket => connectedUserSocket.has(socket.id) && !socket.rooms.has(`conservation:${conservation._id}`))
                //                     .map(socket => connectedUserSocket.get(socket.id))

                for(const user of users){
                    if(connectedUserSocket.has(user._id)){
                        if(!this.io.sockets.sockets.get((connectedUserSocket.get(user._id)) as string)?.rooms.has(`conservation:${conservation._id}`)){
                            // socket.to(connectedUserSocket.get(user._id) as string).emit('receivedMessage', {message, conservation})
                            this.io.to(connectedUserSocket.get(user._id) as string).emit('receivedMessage', {message, conservation})
                        }
                    }
                }
            })
        })
    }
}