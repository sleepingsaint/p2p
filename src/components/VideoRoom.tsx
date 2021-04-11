import Peer from "peerjs";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styles from "../stylesheets/chatRoom.module.scss";
import waitingSvg from "../assets/waiting.svg";
import { FaRegCopy } from "react-icons/fa";
import Video from "./Video";
import { PeerContext, CallContext } from "../App";
import {MediaDataConnectionContext} from '../interfaces';

export default function VideoRoom(props: RouteComponentProps) {

    const peer = React.useContext<Peer>(PeerContext);
    const {conn, call} = React.useContext<MediaDataConnectionContext>(CallContext);

    console.log(conn);
    console.log(call);
    
    const copyRoomId = (e: React.MouseEvent<HTMLDivElement>) => {
        if(peer) navigator.clipboard.writeText(peer.id);
    };

    if (!conn || !call) {
        return (
            <div className={styles.loading_container}>
                <img src={waitingSvg} alt="waiting" />
                <h4>Waiting for your peer to connect...</h4>
                <div className={styles.copy_room_id} onClick={copyRoomId}>
                    <FaRegCopy /> <span>Copy Room Id</span>
                </div>
            </div>
        );
    }

    return <Video />;
}
