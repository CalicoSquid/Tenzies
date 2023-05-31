import {useState, useEffect} from "react"
import Die from "./Die"
import Header from "./Header"
import Welcome from "./Welcome"
import Confetti from 'react-confetti'
import useSound from 'use-sound'
import {nanoid} from "nanoid"
import diceSound from "../Sounds/dice-roll.mp3"
import winner from "../Sounds/winner-winner.mp3"
import click from "../Sounds/click.mp3"
import startNewGame from "../Sounds/game-start.mp3"




export default function Game() {

    const [dice, setDice] = useState(allNewDice())
    const [currentScore, setCurrentScore] = useState(0)
    const [bestScore, setBestScore] = useState(JSON.parse(localStorage.getItem("highscore")) || 0)
    const [tenzies, setTenzies] = useState(true)
    const [start, setStart] = useState(false)
    const [playDice] = useSound(diceSound)
    const [playWinner] = useSound(winner)
    const [playClick]= useSound(click)
    const [playGameStart] = useSound(startNewGame)

    useEffect(() => {
        const allEqual = dice.every(die => die.value === dice[0].value);
        const allHeld = dice.every(die => die.isHeld)
        if( allEqual && allHeld) {
            setTenzies(true)
            playWinner()
            highScore()
        }
    }, [dice, playWinner])

    function startGame() {
        setTenzies(false)
        playGameStart()
        setStart(true)
    }

    function generateNewDie() {
        let diceNum = Math.ceil(Math.random() * 6)
        return {
            value: diceNum,
            isHeld: false,
            id: nanoid(),
        }
    }

    function allNewDice() {
        const numArray = []
        for(let i = 0; i < 10; i++) {   
            numArray.push(generateNewDie())
        }
        return numArray
    }

    function rollDice() {
        playDice()
        setCurrentScore(oldScore => oldScore + 1)
        setDice(prevDice => prevDice.map(die => {
            return !die.isHeld ? generateNewDie() : die
        }))
    }

    function hold(id) {
        playClick()
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    function highScore() {
        if (currentScore < bestScore || bestScore === 0) {
            setBestScore(currentScore)
            console.log(bestScore)
            localStorage.setItem("highscore", JSON.stringify(currentScore))
        }
        
    }

    function newGame() {
        playDice()
        setDice(allNewDice())
        setCurrentScore(0)
        setTenzies(false)
    }

    let diceElements = dice.map(die => {
        return <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld}
        holdDie={() => hold(die.id)}
        tenzies={tenzies}
        />
    })


    return (
        <>
        {tenzies && currentScore > 0 && <Confetti />}
        <div id="wrapper">
            <Header />
            
            <div className="frame">

                {!start && <Welcome startGame={startGame}/>}

                {start && <div className="game-container">
                    <div id="scoreboard">
                        <div className="score current">
                            <p className="score-text">Score</p>
                            <div className="score-count">{currentScore}</div>
                        </div>
                        <div className="score high">
                            <p className="score-text">Best Score</p>
                            { bestScore > 0 && <div className="score-count">{bestScore}</div>}
                        </div>
                    </div>
                    <div className="grid-container">
                        {diceElements}
                    </div>
                    <button 
                    className="roll-dice" 
                    onClick={tenzies ? newGame : rollDice}
                    
                    >
                        {tenzies ? "New Game" : "Roll"}
                    </button>
                    
                </div>}    
            </div>
        </div>
        <footer className="footer">Created by 
        <span className="signature signature-c">
            <a href="https://github.com/CalicoSquid"> CalicoSquid </a></span>
         using 
         <span className="signature signature-r"> 
            {" "}
            <i class="fa-brands fa-react"></i>
         </span>
         </footer>
        </>
        
    )
}