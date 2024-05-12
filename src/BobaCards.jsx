// The Header Component -- file is capitalized because it is an component
import React, { useEffect, useState } from "react"
import './styles/BobaCards.css'
import TinderCard from 'react-tinder-card'
import { useLockBodyScroll } from "@uidotdev/usehooks";
import database from "./firebase"


function BobaCards() {

    useLockBodyScroll();

    const [boba, setBoba] = useState([]);

    useEffect(() => {

        database.collection('BobaTea').onSnapshot(snapshot => (
            setBoba(snapshot.docs.map(doc => doc.data()))
        ))

    }, []);

    return (
        <div>
            <p> TinderCards 🔥</p>

            <div className="cardContainer">
                {boba.map(tea => (
                    <TinderCard className="swipe"
                        // Key very important in React
                        key={tea.name}
                        // Prevent from swiping up and down
                        preventSwipe={['up', 'down']}
                    >
                        <div
                            style={{ backgroundImage: `url(${tea.url})` }}
                            className='card'>
                            <h3>{tea.name} | {tea.shop}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div >
    );

}

export default BobaCards