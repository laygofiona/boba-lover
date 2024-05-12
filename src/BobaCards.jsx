// The Header Component -- file is capitalized because it is an component
import React, { useState } from "react"
import './styles/BobaCards.css'
import TinderCard from 'react-tinder-card'
// import database from "./firebase"


function BobaCards() {

    // const [boba, setBoba] = useState([]);

    // useEffect(() => {

    //     database.collection('BobaTea').onSnapshot(snapshot => (
    //         setPeople(snapshot.docs.map(doc => doc.data()))
    //     ))
    //     // This will run once when the component loads & never runs again
    // }, []);


    //  Hard Coded

    const [boba, setBoba] = useState([
        {
            name: "BoboTea Strawberry",
            url: "https://i.ibb.co/6DBMG0M/Screenshot-2024-05-11-211740.png",
        },
        {
            name: "Chatime Standard Milk Tea",
            url: "https://api.vip.foodnetwork.ca/wp-content/uploads/2024/04/Chatime-Sakura-Bloom-Feat.png?w=3840&quality=75"
        },
    ]);


    return (
        <div>
            <div className="cards">
                <p> TinderCards 🔥</p>
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
                            <h3>{tea.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div >
    );
}

export default BobaCards