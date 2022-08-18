import { NextApiRequest } from 'next';
import { Server as ServerIO } from 'socket.io';
import { Server as NetServer } from 'http';

export const config = {
    api: {
        bodyParser: false
    }
};

export default async (req: NextApiRequest, res: any) => {
    if (!res.socket.server.io) {
        console.log('New Socket.io server...');
        // adapt Next's net Server to http Server
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: '/api/socket'
        });
        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io;

        io.on('connection', (socket: any) => {
            socket.on('get-message', (msg: any) => {
                socket.broadcast.emit('message', `Hello from the backend, you said, "${msg}"`);
                console.log('frontend message', msg);
            });
        });
    }
    res.end();
};

// import { Server } from 'Socket.IO';
//
// const SocketHandler = (req: any, res: any) => {
//     if (res.socket.server.io) {
//         console.log('Socket is already running');
//     } else {
//         console.log('Socket is initializing');
//         const io = new Server(res.socket.server);
//         res.socket.server.io = io;
//
//         io.on('connection', (socket: any) => {
//             socket.on('get-message', (msg: any) => {
//                 socket.broadcast.emit('message', `Hello from the backend, you said, "${msg}"`);
//                 console.log('frontend message', msg);
//             });
//         });
//     }
//     res.end();
// };
//
// export default SocketHandler;
