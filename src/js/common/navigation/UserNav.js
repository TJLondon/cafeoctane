import React from 'react';

const UserNav = (props) => {
    return (
        <ul>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/settings">Settings</a></li>
            <li><a href="/user/signout" className="logout">Logout</a></li>
        </ul>
    )
};

export default UserNav;