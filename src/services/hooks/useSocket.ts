import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

type UseSocket = {
    socketRef: SocketIOClient.Socket | null;
};

export const useSocket = (): UseSocket => {
    const socketRef: any = useRef<SocketIOClient.Socket | null>(null);

    useEffect(() => {
        const BASE_URL = process.env.REACT_APP_ENV === 'development'
            ? process.env.REACT_APP_URL_SOCKET_LOCAL
            : process.env.REACT_APP_URL_SOCKET_STAGING;

        const initSocket = () => {
            const token = localStorage.getItem('token') as string;
            const url = `${BASE_URL}?token=${JSON.parse(token)}`;
            console.log({ BASE_URL, url, token })

            const socket = io(url, {
                transports: ['websocket'],
                upgrade: false,
                jsonp: false,
            });

            socket.connect();
            socket.on('connect', () => {
                console.log('--------connected to SocketController server-------');
            });

            socket.on('error', (error: any) => {
                console.log("--------error to SocketController server-------", error);
            });
            socket.on('connect_error', (con_error: any) => {
                console.log("--------connect_error to SocketController server-------", con_error);
            });

            console.log({ socket })
            socketRef.current = socket;
        }

        initSocket();
        return () => {
            socketRef && socketRef.current && socketRef.current.disconnect();
        }
    }, []);

    return socketRef;
};
