import React from 'react';

const UserNav = () => {
    return (
        <ul>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/bookmarks">Saved Events</a></li>
            <li><a href="/user/signout" className="logout">Logout</a></li>
        </ul>
    )
};

export default UserNav;