import React, { useRef, useContext } from "react";
import chatting from "../assets/chatting.svg";
import videoChat from "../assets/videoCall.svg";

import styles from "../stylesheets/home.module.scss";

import { FaAngleRight } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { RouteComponentProps } from "react-router";
import { PeerContext, ConnContext, CallContext } from "../App";
import Peer from "peerjs";
import {
    DataConnectionContext,
    MediaDataConnectionContext,
} from "../interfaces";

export default function HomeScreen(props: RouteComponentProps) {
    const roomId = useRef<HTMLInputElement>(null);
    const videoRoomId = useRef<HTMLInputElement>(null);

    const peer = useContext<Peer>(PeerContext);
    const { setConn } = useContext<DataConnectionContext>(ConnContext);
    const { setStream, setCall } = useContext<MediaDataConnectionContext>(
        CallContext
    );

    const handleCreateRoom = (e: React.MouseEvent<HTMLDivElement>) => {
        props.history.push({
            pathname: `/chat/${peer?.id}`,
        });
    };

    const handleJoinRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (roomId && roomId.current && roomId.current.value.trim() !== "") {
            const _conn = peer.connect(roomId.current.value);
            _conn.on("open", () => setConn(_conn));
            props.history.push(`/chat/${roomId.current?.value}`);
        }
    };

    const handleCreateVideoRoom = (e: React.MouseEvent<HTMLDivElement>) => {
        var getUserMedia = navigator.getUserMedia;
        getUserMedia(
            { video: true, audio: true },
            (stream: MediaStream) => setStream(stream),
            (e) => alert("Please allow permission")
        );

        props.history.push(`/video/${peer?.id}`);

    };

    const handleJoinVideoRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (videoRoomId && videoRoomId.current && videoRoomId.current.value.trim() !== "") {
            console.log("hello world")
            navigator.getUserMedia(
                { video: true, audio: true },
                (stream: MediaStream) => {
                    if(videoRoomId && videoRoomId.current && videoRoomId.current.value.trim() !== ""){
                        console.log("home screen");                      
                        const _call = peer.call(videoRoomId.current.value, stream);
                        const _conn = peer.connect(videoRoomId.current.value);
                        setCall(_call);
                        _conn.on("open", () => setConn(_conn));
                        setStream(stream);
                    }
                },
                (e) => alert("Please allow permission")
            );

            props.history.push(`/video/${videoRoomId.current?.value}`);
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.info}>
                    <h1>Secure, Unlimited Peer 2 Peer Text Chat</h1>
                    <p>
                        All the text messages are transmitted between you and
                        your peer browsers. Speed depends only on uplink and
                        downlink speed of your internet connection.
                    </p>

                    <div className={styles.actions}>
                        <div
                            className={styles.create_room_btn}
                            onClick={handleCreateRoom}
                        >
                            <AiOutlinePlus /> Create Room
                        </div>

                        <div className={styles.divider}>or</div>
                        <input
                            type="text"
                            className={styles.room_id_input}
                            placeholder="Enter the room id"
                            ref={roomId}
                        />
                        <button
                            className={styles.join_room_btn}
                            onClick={handleJoinRoom}
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
                <div className={styles.banner}>
                    <img src={chatting} alt="chatting" />
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.info}>
                    <h1>Secure, Unlimited Peer 2 Peer Video Chat</h1>
                    <p>
                        All the video frames are transmitted between you and
                        your peer browsers. Speed depends only on uplink and
                        downlink speed of your internet connection.
                    </p>

                    <div className={styles.actions}>
                        <div
                            className={styles.create_room_btn}
                            onClick={handleCreateVideoRoom}
                        >
                            <AiOutlinePlus /> Create Room
                        </div>

                        <div className={styles.divider}>or</div>
                        <input
                            type="text"
                            className={styles.room_id_input}
                            placeholder="Enter the room id"
                            ref={videoRoomId}
                        />
                        <button
                            className={styles.join_room_btn}
                            onClick={handleJoinVideoRoom}
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
                <div className={styles.banner}>
                    <img src={videoChat} alt="video chatting" />
                </div>
            </div>
        </div>
    );
}
