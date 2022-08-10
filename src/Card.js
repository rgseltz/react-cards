import React, {useState} from "react";

const Card = ({info}) => {
    return (
        <>
            
            
                    <img 
                    src={info.image}
                    data-value={info.value}
                    data-suit={info.suit}
                    />
            
        </>
    )
}

export default Card;