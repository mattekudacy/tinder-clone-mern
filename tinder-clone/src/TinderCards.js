import React, { useState, useEffect } from 'react'
import TinderCard from "react-tinder-card"
import "./TinderCards.css"
import axios from "./axios"

function TinderCards() {
    const [people, setPeople] = useState([])

    useEffect(() => {
        async function fetchData(){
            const req = await axios.get("/tinder/card")

            setPeople(req.data)
        }

        fetchData()

    }, [])

    console.log(people)
    
    const swiped = (direction, nameToDelete) => {
        console.log("removing" + nameToDelete);
    }

    const outOfFrame = (name) => {
        console.log(name + "left the screen");
    }

    return (
        <div className="tinderCards">
            <div className = "tinderCards__container">
            {people.map((people)=> (
                <TinderCard className="swipe" 
                key={people.name} 
                preventSwipe={["up", "down"]} 
                onSwipe= {(dir) => swiped(dir, people.name)}
                onCardLeftScreen={()=> outOfFrame(people.name)}>
                
            <div style= {{ backgroundImage: "url("+ people.imgUrl+")"}}
                className="card">
               <h3>{people.name}</h3>
            </div>
                </TinderCard>
            ))}
            </div>
        </div>
    )
}


export default TinderCards
