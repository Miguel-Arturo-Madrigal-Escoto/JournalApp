import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { JournalEntries } from './JournalEntries';
import { AiOutlineLogout } from 'react-icons/ai';
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import { startNewNote } from '../../actions/notes';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const { name, photoURL } = useSelector(state => state.auth);


    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(startLogout());
    }

    const handleAddEntry = () => {
        dispatch(startNewNote())
    }

    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-5">
                    {/* <i className="fa fa-moon"></i> */}
                    <div className="journal__profile">
                        <img src={ photoURL } alt="foto de perfil" className="journal__profile-img"/>
                    </div>
                    <span className="journal__username">{ name }</span>
                </h3>
                
            </div>

            <div 
                className="journal__new-entry pointer"
                onClick={ handleAddEntry }
            >
                {/* <i className="far fa-calendar-plus fa-5x"></i> */}
                <BsFillCalendarPlusFill fontSize="2.5rem" color="#fff" />
                <p className="mt-5">
                    New entry
                </p>
            </div>

            <JournalEntries />

            <div className="journal__logout">
                <button 
                    className="btn"
                    onClick={ handleLogOut }
                >
                    Logout 
                </button>
                <AiOutlineLogout fontSize="1.3rem" />
            </div>
        </aside>
    )
}
