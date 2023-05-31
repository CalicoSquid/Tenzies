
export default function Die(props) {


const colorArr = [
    {dice1: "#ff6a00", dice2: "#f7b17e", dice3: "#ffddc4", pip: "#00ffff"},
    {dice1: "#bd0272", dice2: "#fc90d1", dice3: "#fccce9", pip: "#00ffb7"},
    {dice1: "#09020a", dice2: "#845ba8", dice3: "#f4dcf7", pip: "#fa50db"},
    {dice1: "#c70007", dice2: "#f58488", dice3: "#fcdcdd", pip: "#00ff15"},
    {dice1: "#e89907", dice2: "#ffd17d", dice3: "#fcf0d9", pip: "#f70010"},
    {dice1: "#0008ed", dice2: "#abafff", dice3: "#d9dafc", pip: "#bfff00"},
]
const color = colorArr[props.value - 1]


    const styles = {
        dice : {
            background: props.isHeld ? 
            `radial-gradient(circle, ${color.dice2} 0%, ${color.dice1} 100%)` :
            `radial-gradient(circle, white 0%, #f0f0f0 100%)`,
            
            boxShadow: props.isHeld ?
                `inset 0 4px ${color.dice3}, inset 0 -4px ${color.dice1}, inset 4px 0 ${color.dice2}, inset -4px 0 ${color.dice2}` :
                `inset 0 4px white, inset 0 -4px #bbb, inset 4px 0 #d7d7d7, inset -4px 0 #d7d7d7`
        },
        pips : {
            backgroundColor: props.isHeld ? color.pip : "#000"
        }
        
    }

    const Pip = () => <span className="pip" style={styles.pips} />;

    let pips = Array(props.value)
            .fill(0)
            .map((_, i) => <Pip key={i} />)

    return (
        <div className={
            props.isHeld ?
            `die-face` :
            `die-face ${!props.tenzies && "fa-shake"}`
        }
        onClick={props.holdDie} 
        style={styles.dice}
        >{pips}
        </div>
    
        
        
    )
}