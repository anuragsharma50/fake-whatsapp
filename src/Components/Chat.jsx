import { useEffect, useState } from "react";
import data from "../data.json";
import { redirect, useNavigate, useParams } from "react-router-dom";
import Home from "./Home";

export const Chat = () => {

    const {contactId} = useParams();

    // fetching contact based on contactId passed in params when clicking on a person's contact/chat 
    const [contact,setContact] = useState(data.chatData.filter(c => c.contactId === Number(contactId))[0] || data.contacts.filter(c => c.contactId === Number(contactId))[0] );
    const [msg,setMsg] = useState("");

    useEffect(() => {
        setContact(data.chatData.filter(c => c.contactId === Number(contactId))[0] || data.contacts.filter(c => c.contactId === Number(contactId))[0] );
    },[contactId])

    const send = () => {

        // taking current date(and time) and formatting it accordingly
        let now = new Date(); 
        let hours;
        let dn;
        if(hours >= 12) {
            hours = now.getHours() - 12;
            dn = "pm";
        } 
        else{
            hours = now.getHours();
            dn = "am";
        }

        let mins = now.getMinutes();
        if(mins < 10 ){
            mins = "0"+now.getMinutes();
        }

        let date = now.getDate() + "/" +(now.getMonth()+1)+ '/' + now.getFullYear(); 
        let time = hours +':' +  mins + " " + dn; 

        // new msg body
        let newMsg = {
            msg,
            fromYou: true,
            time
        }

        let chats = contact.chats;

        // if no msg is there then directly add to array
        if(!chats || chats.length === 0) {
            setContact({...contact, chats: [{date,chat:[newMsg]}]})
            setMsg("");
            return;
        }

        // check if last msg was also on same date, if yes no need to add new date
        // else add new msg under new date
        let lastDate = chats[chats.length-1].date;

        if(lastDate === date){
            chats[chats.length-1].chat.push(newMsg)
            setContact({...contact, chats})
        }
        else{
            setContact({...contact, chats:[...chats,{date,chat:[newMsg]}]})
        }

        setMsg("");
        document.scrollingElement.scroll(0, 1);
    }

    if(!contact) {
        return <Home />
    }

    return (
        <div className="chatContainer">
            <div className="chatHeader">
                <img className="dp" src={contact.img} alt={contact.contactName} />
                <span className="contactname">{contact.contactName}</span>
            </div>
            <div className="chats">
                {
                    contact.chats && contact.chats.map(chat => {
                        return (
                            <div key={chat.date}>
                                <div className="chatDate">{chat.date}</div>
                                {
                                    chat.chat.map(c => {
                                        return (
                                            <div key={Math.random()*100000} className={c.fromYou ? "msgSend" : "msgRecieved"}>
                                                <span>{c.msg}</span>
                                                <span className="extraSpace" ></span>
                                                <span className="chatTime">{c.time}</span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                <div id="anchor"></div>
            </div>
            <div className="chatOptions">
                <input type="text" className="input" onChange={e => setMsg(e.target.value)} value={msg} />
                <span onClick={send} data-icon="send" className="sendIcon"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><title>send</title><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg></span>
            </div>
        </div>
    )

}