

export default function Welcome(props) {

    return (
        <div className="welcome">
                <div className="logo start-logo">
                <b><i class="fa-solid fa-dice"></i></b>
                </div>
                    <p className="title">How to play</p>
                    <p className="instructions">
                        Roll until all dice are the same!
                        <br/>
                        Click each die to freeze it at its current value.
                    </p>
                    <button 
                    className="start"
                    onClick={props.startGame}
                    >Got it!</button>
                </div>
    )   
}