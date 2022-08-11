import React, {useState, useEffect, useRef} from "react";
import Axios from "axios";
import Card from "./Card";

const CardTimer = () => {
    const BASE_URL = `http://deckofcardsapi.com/api/deck`
    const [deck, setDeck] = useState(null);
    const [cardUrl, setCardUrl] = useState(null);
    const [isTimer, setIsTimer] = useState(false);
    const [cards, setCards] = useState([]);
    const autoPick = useRef()
    /**on mount get deck from api */
    useEffect(() => {
        async function getDeck() {
            const res = await Axios.get(`${BASE_URL}/new/shuffle/`)
            setDeck(() => res.data.deck_id);
        }
        getDeck();
    }, [])
    console.log(deck)
    /**handles draw button - makes api req for new card and toggles timer*/
    const handleClick = () => {
        pickCard();
        toggleTimer()
        
    }
    /**boolean that is toggled together with timer */
    const toggleTimer = () => {
        setIsTimer(!isTimer)
    }

    const pickCard = async () => {
                const cardRes = await Axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw`)
                const cardData = cardRes.data.cards
                console.log(cardRes.data.cards)
                setCards(card => [...card ,...cardData]);
            }
    
    useEffect(() => {
        if (!isTimer) {
            return;}
        autoPick.current = setInterval(async () => {
            await pickCard();
        }, 1000);
        return () => { clearInterval(autoPick.current);
        autoPick.current=null};
    }
    ,[isTimer])

    return (
    <div>
        <h1>CardTimer!</h1>
        <button onClick={handleClick}>Start Card Timer</button>
        {isTimer && <section>{cards.map(c => <Card key={c.code} info={c}/>)}</section>}
    </div>

    )
}

export default CardTimer;