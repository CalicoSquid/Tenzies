
export default function Die(props) {
    const diceNumberArray = ["", "one", "two", "three", "four", "five", "six"];
    const diceNum = diceNumberArray[props.value]

    return (

 
        
        
        <i className={
            props.isHeld ?
            `dice-face fa-solid fa-dice-${diceNum} held held-${diceNum}` :
            `dice-face fa-solid fa-dice-${diceNum} not-held ${!props.tenzies && "fa-shake"}`
            }
            onClick={props.holdDie} 
            >
        </i>
      
    )
}