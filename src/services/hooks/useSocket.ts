import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

type UseSocket = {
    socketRef: SocketIOClient.Socket | null;
};

export const useSocket = (): UseSocket => {
    const socketRef: any = useRef<SocketIOClient.Socket | null>(null);

    useEffect(() => {
        const initSocket = () => {
            const token = localStorage.getItem('token') as string;
            const url = `${process.env.REACT_APP_URL_SOCKET}?token=${JSON.parse(token)}`;

            const socket = io(url, {
                transports: ['websocket'],
                upgrade: false,
                jsonp: false,
            });

            socket.connect();
            socket.on('connect', () => {
                console.log('--------connected to socket server-------');
            });

            socket.on('error', (error: any) => {
                console.log("--------error to socket server-------", error);
            });
            socket.on('connect_error', (con_error: any) => {
                console.log("--------connect_error to socket server-------", con_error);
            });

            socketRef.current = socket;
        }

        initSocket();
        return () => {
            console.log("disconnect socket");
            socketRef.current.disconnect();
        }
    }, []);

    return socketRef;
};
