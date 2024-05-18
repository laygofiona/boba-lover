import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import "./styles/Header.css";
import { Link } from "react-router-dom"
import logo from './img/logo.png';

const Header = () => {
    return (
        <div className="header">
            <Link to="/profile">
                <IconButton>
                    <PersonIcon className="header__icon" />
                </IconButton>
            </Link>
            <Link to="/">
                <img src='https://cdn-icons-png.flaticon.com/512/4645/4645924.png'
                    alt='boba logo' className='header__logo' />
                <img src={logo}
                    alt='boba logo' className='header__logo' />
            </Link>
            <Link to="/chats">
                <IconButton>
                    <ForumIcon className='header__icon' />
                </IconButton>
            </Link>
        </div>
    );
}

export default Header;