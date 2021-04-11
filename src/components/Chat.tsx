import React, {useRef, useState, useContext} from "react";
import styles from "../stylesheets/chat.module.scss";
import { FaAngleRight } from "react-icons/fa";
import { ConnContext } from "../App";
import { DataConnectionContext } from "../interfaces";

interface Message{
    data: String;
    local: Boolean;
}

export default function Chat() {
    const msgInputRef = useRef<HTMLInputElement>(null);
    const [msgs, setMsgs] = useState<Array<Message>>([]);
    const {conn} = useContext<DataConnectionContext>(ConnContext);

    React.useEffect(() => {
        conn?.on('data', (data: String) => setMsgs([...msgs, {data: data, local: false}]));
        conn?.on("close", () => alert("Looks like your is disconneted"));
    }, [msgs, conn]);
    
    const handleSendMsg = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(msgInputRef && msgInputRef.current && msgInputRef.current.value !== ""){
            conn?.send(msgInputRef.current.value);
            setMsgs([...msgs, {data: msgInputRef.current?.value, local: true}]);   
            msgInputRef.current.value = "";  
        }
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && msgInputRef && msgInputRef.current && msgInputRef.current.value !== ""){
            conn?.send(msgInputRef.current.value);
            setMsgs([...msgs, {data: msgInputRef.current?.value, local: true}]); 
            msgInputRef.current.value = "";  
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.messageBox}>
                {msgs.map((msg, index) => (
                    <div key={index}
                        className={[
                            styles.msg,
                            msg.local ? styles.local_msg : styles.remote_msg,
                        ].join(" ")}
                    >
                        {msg.data}
                    </div>
                ))}
            </div>
            <div className={styles.inputControl}>
                <input type="text" placeholder="Type your message here" ref={msgInputRef} onKeyUp={handlePressEnter} />
                <button onClick={handleSendMsg}>
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
}
