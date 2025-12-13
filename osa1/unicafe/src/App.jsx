import { useState } from 'react'

const Button = (props) => {
    return (
        <button onClick={() => props.func(props.value+1)}>{props.text}</button>
    )

}

const StatisticLine = (props) => {
    return(
        <td>{props.text} {props.value}</td>
    )
}

const Statistics = (props) => {
    if (props.good + props.bad + props.neutral > 0) return (
        <table>
            <tbody>
            <tr><StatisticLine text="Hyvä: " value={props.good}/></tr>
            <tr><StatisticLine text="Keskiverto: " value={props.neutral}/></tr>
            <tr><StatisticLine text="Huono: " value={props.bad}/></tr>
            <tr><StatisticLine text="Palautteiden määrä: " value={props.good+props.neutral+props.bad}/></tr>
            <tr><StatisticLine text="Palautteiden keskiarvo: " value={(props.good-props.bad)/(props.good+props.neutral+props.bad)}/></tr>
            <tr><StatisticLine text="Positiivisuusindeksi: " value={100*(props.good/(props.good+props.neutral+props.bad)) + "%"}/></tr>
            </tbody>
        </table>
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