// The Header Component -- file is capitalized because it is an component
import React, { useEffect, useState } from "react"
import './styles/BobaCards.css'
import TinderCard from 'react-tinder-card'
import { useLockBodyScroll } from "@uidotdev/usehooks";
import database from "./firebase"


function BobaCards() {
    // Locks Scrolling in the body
    useLockBodyScroll();

    // The useState & UseEffect are use to implement the firebase Database
    const [boba, setBoba] = useState([]);

    // State to store counts for each shop
    const [shopCounts, setShopCounts] = useState({});

    useEffect(() => {

        database.collection('BobaTea').onSnapshot(snapshot => (
            setBoba(snapshot.docs.map(doc => doc.data()))
        ))

    }, []);

    const onCardLeftScreen = (direction, tea) => {
        console.log(tea.name + ' left the screen to the ' + direction)

        if (direction === "right") {
            const shopName = tea.shop;
            setShopCounts(prevCounts => ({
                ...prevCounts,
                [shopName]: (prevCounts[shopName] || 0) + 1
            }));

        }
    }

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
                        onCardLeftScreen={(direction) => onCardLeftScreen(direction, tea)}
                        flickOnSwipe
                    // swipeRequirementType="velocity" // Evaluate direction based on the direction of the swiping movement
                    // swipeThreshold={1} // Set a lower threshold for faster swipes
                    >
                        <div
                            style={{ backgroundImage: `url(${tea.url})`, backgroundColor: `${tea.color}` }}
                            className='card'>
                            <h3>{tea.name} | {tea.shop}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
            {/* Display shop counts */}
            <div>
                <h2>Shop Counts:</h2>
                <ul>
                    {Object.entries(shopCounts).map(([shop, count]) => (
                        <li key={shop}>{shop}: {count}</li>
                    ))}
                </ul>
            </div>
        </div >
    );



}

export default BobaCards