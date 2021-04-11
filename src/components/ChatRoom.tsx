import Peer from "peerjs";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styles from "../stylesheets/chatRoom.module.scss";
import waitingSvg from "../assets/waiting.svg";
import { FaRegCopy } from "react-icons/fa";
import Chat from "./Chat";
import { PeerContext, ConnContext } from "../App";
import {DataConnectionContext} from '../interfaces';

export default function ChatRoom(props: RouteComponentProps) {

    const peer = React.useContext<Peer>(PeerContext);
    const {conn} = React.useContext<DataConnectionContext>(ConnContext);

    const copyRoomId = (e: React.MouseEvent<HTMLDivElement>) => {
        if(peer) navigator.clipboard.writeText(peer.id);
    };

    if (!conn) {
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

    return <Chat />;
}
