import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import ForumIcon from "@material-ui/icons/Forum";
import IconButton from "@material-ui/core/IconButton";
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