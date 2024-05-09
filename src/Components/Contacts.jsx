import { useState } from "react";
import data from "../data.json";
import { NavLink } from "react-router-dom";

const Contacts = ({setShowContacts}) => {

    const[contacts,setContacts] = useState(data.contacts);
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
            <div className="sidebar-heading" style={{justifyContent:"flex-start"}}>
                <span onClick={() => setShowContacts(false)} data-icon="back" class="backIcon"><svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" version="1.1" x="0px" y="0px" enable-background="new 0 0 24 24"><title>back</title><path fill="currentColor" d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"></path></svg></span>
                <h2>Contacts</h2>
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
                                    </div>
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

export default Contacts;