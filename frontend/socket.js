
import { io } from "socket.io-client";
import { baseURL } from "./src/constant";
export const socket = io(baseURL, {
    'forceNew': true,
    'reconnection': true,
    'reconnectionDelay': 1000,
    'reconnectionDelayMax': 10000,
    'reconnectionAttempts': 50
});