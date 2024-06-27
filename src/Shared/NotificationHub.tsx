import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";

export const EVENTS = {
    ANSWER_CREATED: 'answer_created',
}

const socket = io(import.meta.env.PICKFU_WEBSOCKET_URL);
socket.on("connect", () => {
    console.log("Socket connected");
});

socket.on("connect_error", (err) => {
    console.log(err);
});

socket.on("disconnect", () => { // fire when socked is disconnected
    console.log("Socket disconnected");
})

const NotificationContext = createContext<Socket | undefined>(undefined);


export const NotificationContextProvider = ({ children }) => {
    return <>
        <NotificationContext.Provider value={socket}>
            {children}
        </NotificationContext.Provider>
    </>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotificationHub() {

    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error('useNotificationHub must be used within a NotificationContextProvider')
    }
    return context;
}