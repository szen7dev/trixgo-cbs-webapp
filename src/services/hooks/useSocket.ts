import { useState, useEffect, useContext } from 'react';
import SocketContext from 'services/contexts/Socket';
import io from 'socket.io-client';

type UseSocket = {
  socket: SocketIOClient.Socket | null;
  connect: () => SocketIOClient.Socket;
  disconnect: () => void;
  isConnected: () => boolean;
};

export const useSocket = (): UseSocket => {
    const { dispatch } = useContext(SocketContext);
    const [socket, setSocket] = useState<SocketIOClient.Socket | null>(null);

    useEffect(() => {
        connect();

        // return () => {
        //     initSocket.close();
        // };
    }, [setSocket]);

    const isConnected = () => socket ? socket.connected : false;

    const connect = () => {
        const token = localStorage.getItem('token') as string;
        const initSocket = io(`${process.env.REACT_APP_URL_SOCKET}?token=${JSON.parse(token)}`);

        setSocket(initSocket);
        dispatch({ type: "CONNNECT" });

        return initSocket;
    }

    const disconnect = () => {
        setSocket(null);
        dispatch({ type: "DISCONNNECT" });

        if(socket && socket.connected) socket.close();
    }

    return {
        socket,
        connect,
        disconnect,
        isConnected
    };
};
