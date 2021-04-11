import { DataConnection, MediaConnection } from "peerjs";
import { Dispatch, SetStateAction } from "react";

export interface DataConnectionContext{
    conn: DataConnection | undefined;
    setConn: Dispatch<SetStateAction<DataConnection | undefined>>;
}

export interface MediaDataConnectionContext{
    stream: MediaStream | null;
    conn: DataConnection | undefined;
    call: MediaConnection | undefined;
    setConn: Dispatch<SetStateAction<DataConnection | undefined>>;
    setCall: Dispatch<SetStateAction<MediaConnection | undefined>>;
    setStream: Dispatch<SetStateAction<MediaStream | null>>;
}