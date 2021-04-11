import React from "react";
import ChatRoom from "./components/ChatRoom";
import HomeScreen from "./components/HomeScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Peer, { DataConnection, MediaConnection } from "peerjs";
import {
    DataConnectionContext,
    MediaDataConnectionContext,
} from "./interfaces";
import VideoRoom from "./components/VideoRoom";

const peer = new Peer();

export const PeerContext = React.createContext<Peer>(peer);
export const ConnContext = React.createContext<DataConnectionContext>({
    conn: undefined,
    setConn: () => {},
});
export const CallContext = React.createContext<MediaDataConnectionContext>({
    stream: null,
    conn: undefined,
    call: undefined,
    setCall: () => {},
    setConn: () => {},
    setStream: () => {},
});

function App() {
    const [conn, setConn] = React.useState<DataConnection | undefined>(
        undefined
    );

    const [stream, setStream] = React.useState<MediaStream | null>(null);
    const [call, setCall] = React.useState<MediaConnection | undefined>(
        undefined
    );

    console.log(call);

    peer.on("connection", (_conn: DataConnection) => setConn(_conn));
    peer.on("call", (call: MediaConnection) => {
        console.log("incoming call")
        navigator.getUserMedia({video: true, audio: true}, (stream: MediaStream) => {
            call.answer(stream);
            setCall(call);
        }, err => console.log(err))
    });

    return (
        <PeerContext.Provider value={peer}>
            <ConnContext.Provider value={{ conn, setConn }}>
                <CallContext.Provider
                    value={{ stream, conn, call, setConn, setCall, setStream }}
                >
                    <Router>
                        <Route exact path="/" component={HomeScreen} />
                        <Route
                            exact
                            path="/chat/:room_id/"
                            component={ChatRoom}
                        />
                        <Route exact path="/video/:room_id/" component={VideoRoom} />
                    </Router>
                </CallContext.Provider>
            </ConnContext.Provider>
        </PeerContext.Provider>
    );
}

export default App;
