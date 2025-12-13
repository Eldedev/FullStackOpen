import { useState } from 'react'

const Button = (props) => {
    return (
        <button onClick={() => props.func(props.value+1)}>{props.text}</button>
    )

}

const Statistics = (props) => {
    if (props.good + props.bad + props.neutral > 0) return (
        <div>
            <p>Hyvä: {props.good}</p>
            <p>Keskiverto: {props.neutral}</p>
            <p>Huono: {props.bad}</p>
            <p>Palautteiden määrä: {props.good+props.neutral+props.bad}</p>
            <p>Palautteiden keskiarvo: {(props.good-props.bad)/(props.good+props.neutral+props.bad)}</p>
            <p>Positiivisuusindeksi: {100*(props.good/(props.good+props.neutral+props.bad))}%</p>
        </div>
    )
    else return (
        <p>Palautetta ei ole vielä annettu</p>
    )

}


const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>Anna palautetta!</h1>
            <Button func={setGood} value={good} text="Hyvä"/>
            <Button func={setNeutral} value={neutral} text="Keskiverto"/>
            <Button func={setBad} value={bad} text="Huono"/>

            <h1>Tilastot</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App