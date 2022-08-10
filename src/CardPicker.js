import React, {useState, useEffect} from "react";
import Card from "./Card";
import Axios from "axios";
import {v4 as uuid} from 'uuid';

const CardPicker = () => {
    const [deck, setDeck] = useState(null);
    const [cardUrl, setCardUrl] = useState(null)
    const [cards, setCards] = useState([])
    
    /**Gets initial deck id */
    useEffect(() => {
        async function shuffle() {
            const res = await Axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/')
            setDeck(() => res.data.deck_id);
            };
        shuffle();
        console.log(cardUrl)
    },[])

    const pickCard = async () => {
        const cardRes = await Axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw`);
        console.log(cardRes)
        setCards([...cards, cardRes.data.cards[0]])
    } 
    
    return (
        <div>
        <h1>Card Picker!</h1>
        {/* <button onClick={shuffleDeck}>New Deck</button> */}
        <button onClick={pickCard}>Pick Card</button>
        {cards ? <section> {cards.map(c => <Card key={c.code} info={c}/>)}</section> : null}
        </div>
    )
}

export default CardPicker;