import React from "react";

import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import "./styles/Header.css";

const Header = () => {
    return(
        <div className="header">
            <IconButton>
                <PersonIcon className="header__icon" />
            </IconButton>
            <img src='https://cdn-icons-png.flaticon.com/512/4645/4645924.png'
            alt='boba logo' className='header__logo'
            />
            <IconButton>
                <ForumIcon className='header__icon' />
            </IconButton>
        </div>
    );
}

export default Header;