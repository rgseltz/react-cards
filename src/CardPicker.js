import React, {useState, useEffect} from "react";
import Card from "./Card";
import Axios from "axios";

const CardPicker = () => {
    const [deck, setDeck] = useState(null);
    const [cardUrl, setCardUrl] = useState(null)
    const [cards, setCards] = useState([])
    const [getCard, setGetCard] = useState(false)
    
    /**Gets initial deck id */
    useEffect(() => {
        async function shuffle() {
            const res = await Axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
            setDeck(() => res.data.deck_id);
            };
        shuffle();
        console.log(cardUrl)
    },[setDeck])
    console.log(deck)

    const handlePick = ()=> {
        setCardUrl(`http://deckofcardsapi.com/api/deck/${deck}/draw`);
        toggleGetCard();
    }

    const toggleGetCard = ()=> {
        setGetCard(!getCard)
    }
    console.log(cardUrl)
    /**Gets a new card object when handlePick is called */
    useEffect(() => {
        try {
        if (getCard) {
        async function pickCard() {
            const cardRes = await Axios.get(cardUrl);
            console.log(cardRes)
            setCards([...cards, cardRes])
        } 
        pickCard();
        return () => setGetCard(true)
    } else return;
    } catch (err) {
        console.log('Request running too soon?')
    }
    },[getCard])
    console.log(cards)
    
    return (
        <div>
        <h1>Card Picker!</h1>
        {/* <button onClick={shuffleDeck}>New Deck</button> */}
        <button onClick={handlePick}>Pick Card</button>
        {cards ? cards.map(c => <Card info={c.cards} />) : null}
        </div>
    )
}

export default CardPicker;