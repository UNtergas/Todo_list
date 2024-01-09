import React from "react";
import { CardContainer } from "../styles";


interface CardProp {
    text: string
}


const Card = ({ text }: CardProp) => {
    return (
        <CardContainer>
            {text}
        </CardContainer>
    )
}


export default Card