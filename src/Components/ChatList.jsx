import { useState } from "react";
import data from "../data.json";
import { NavLink } from "react-router-dom";

const ChatList = ({setShowContacts}) => {

    const[contacts,setContacts] = useState(data.chatData);
    const[searchText,setSearchText] = useState("");

    // to filter based on search, using trim and lowercasing it to find correctly.
    const handleSearch = (e) => {
        let text = e.target.value?.trim().toLowerCase();
        console.log(text);
        setSearchText(text);

        if(text === "") {
            setContacts(data.contacts);
        }
        else{
            let filteredContracts = contacts.filter(c => c.contactName.toLowerCase().includes(text));
            setContacts(filteredContracts);
        }
    }

    // clearing search result once click on x icon
    const clear = () => {
        setSearchText("");
        setContacts(data.contacts);
    }

    return (
        <>
            <div className="sidebar-heading">
                <h2>Chats</h2>
                <span onClick={() => setShowContacts(true)} data-icon="new-chat-outline" className="contactIcon"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>new-chat-outline</title><path d="M9.53277 12.9911H11.5086V14.9671C11.5086 15.3999 11.7634 15.8175 12.1762 15.9488C12.8608 16.1661 13.4909 15.6613 13.4909 15.009V12.9911H15.4672C15.9005 12.9911 16.3181 12.7358 16.449 12.3226C16.6659 11.6381 16.1606 11.0089 15.5086 11.0089H13.4909V9.03332C13.4909 8.60007 13.2361 8.18252 12.8233 8.05119C12.1391 7.83391 11.5086 8.33872 11.5086 8.991V11.0089H9.49088C8.83941 11.0089 8.33411 11.6381 8.55097 12.3226C8.68144 12.7358 9.09947 12.9911 9.53277 12.9911Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M0.944298 5.52617L2.99998 8.84848V17.3333C2.99998 18.8061 4.19389 20 5.66665 20H19.3333C20.8061 20 22 18.8061 22 17.3333V6.66667C22 5.19391 20.8061 4 19.3333 4H1.79468C1.01126 4 0.532088 4.85997 0.944298 5.52617ZM4.99998 8.27977V17.3333C4.99998 17.7015 5.29845 18 5.66665 18H19.3333C19.7015 18 20 17.7015 20 17.3333V6.66667C20 6.29848 19.7015 6 19.3333 6H3.58937L4.99998 8.27977Z" fill="currentColor"></path></svg></span>
            </div>
            <div className="search">
                <i className="fa fa-search" aria-hidden="true" style={{color: "gray"}}></i>
                <input type="text" placeholder="Search" onChange={(e) => handleSearch(e)} value={searchText} />
                <i className="fa-solid fa-xmark" style={{color: "gray",cursor:"pointer"}} onClick={clear}></i>
            </div>
            <hr className="line" />
            <div className="contacts">
                {
                    contacts.map(contact => {
                        return (
                            <NavLink to={`/${contact.contactId}`}  key={contact.contactId} className="contact">
                                <img className="dp" src={contact.img} alt={contact.contactName} />
                                <div className="contact-details">
                                    <div className="contact-title">
                                        <span className="contactname">{contact.contactName}</span>
                                        <span className="msgDate">{contact.lastMsgDate}</span>
                                    </div>
                                    <p className="lastMsg">
                                        {contact.fromYou && 
                                        <span aria-label=" Delivered " data-icon="msg-dblcheck" className="doubleCheck"><svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" className="" fill="none"><title>msg-dblcheck</title><path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor"></path></svg></span>
                                        }
                                        {!contact.fromYou && contact.contactName + ": " }{contact.lastMsg}
                                    </p>
                                </div>
                                <hr className="line" />
                            </NavLink >
                        )
                    })
                }
            </div>
        </>
    )
}

export default ChatList;