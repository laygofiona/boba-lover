// The Header Component -- file is capitalized because it is an component
import React from 'react'
import './styles/BobaCards.css'
import TinderCard from 'react-tinder-card'
import database from "./firebase"


function BobaCards() {
    return (
        <div className='cards'>
            <p> TinderCards 🔥</p>
        </div>
    );
}

export default BobaCards