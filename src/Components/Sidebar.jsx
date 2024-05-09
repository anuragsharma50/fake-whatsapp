import { Outlet } from "react-router-dom";
import ChatList from "./ChatList";
import Contacts from "./Contacts";
import { useState } from "react";

const Sidebar = () => {

    const [showContacts,setShowContacts] = useState(false);

    return (
        <>
        <div className="sidebar">
            {
                showContacts ? <Contacts setShowContacts={setShowContacts} /> 
                : <ChatList setShowContacts={setShowContacts} />
            }
            {/* <ChatList /> */}
            {/* <Contacts /> */}
        </div>
        <Outlet />
        </>
    )

}

export default Sidebar;