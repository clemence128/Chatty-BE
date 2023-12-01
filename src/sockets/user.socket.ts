import { Server, Socket } from "socket.io";
import { IUserLoginSocket } from "~/interfaces/user.interface";

export const connectedUserSocket: Map<string, string> = new Map<string, string>();

export class UserSocket{
    private io: Server;

    constructor(io: Server){
        this.io = io;
    }

    public listen(): void{
        this.io.on('connection', (socket: Socket) => {
            socket.on('user_login', (data: IUserLoginSocket) => {
                connectedUserSocket.set(data._id, socket.id);
                console.log("User connected...")
                console.table(connectedUserSocket);
            })

            socket.on('disconnect', () => {
                for(let [userId, socketId] of connectedUserSocket.entries()){
                    if(socketId === socket.id){
                        connectedUserSocket.delete(userId)
                    }
                }

                console.log("User disconnected...")
                console.table(connectedUserSocket);
            })
        })

        
    }
}

