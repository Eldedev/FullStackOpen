const Course = ({course}) => {
    return (
        <div>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
        </div>
    )
}


const Header = ({title}) => {
    return (
        <h1>{title}</h1>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part}/>)}
            <Total parts={parts} />
        </div>
    )
}

const Part = ({part}) => {
    return(
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
    return (
        <b>Total of {total} exercises</b>
    )
}

export default Course