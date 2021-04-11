import React from "react";
import {CallContext} from '../App';
import {MediaDataConnectionContext} from '../interfaces';

export default function Video(){
    const localRef = React.useRef<HTMLVideoElement>(null);
    const remoteRef = React.useRef<HTMLVideoElement>(null);
    const {stream, call, conn, setConn} = React.useContext<MediaDataConnectionContext>(CallContext);

    React.useEffect(() => {
        if(localRef && localRef.current && localRef.current.srcObject){
            localRef.current.srcObject = stream;
        }
    }, []);

    React.useEffect(() => {
        conn?.on('close', () => {
            alert("Looks like your peer is disconnected");
            setConn(undefined);
        })

        call?.on("stream", (stream: MediaStream) => {
            if(localRef && localRef.current && localRef.current.srcObject){
                localRef.current.srcObject = stream;
            }
        })
    })

    
    return (<div>
        <video ref={localRef} />
        <video ref={remoteRef} />
    </div>);
}