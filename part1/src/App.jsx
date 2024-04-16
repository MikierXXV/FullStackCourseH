import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

/* Components increase and decrease */
const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

/* Components right and left*/
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div> 
        the app is used by pressing the buttons 
      </div>
    )
  }
  return (
    <div> 
        button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button2 = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

/* Components Pasando funciones controlador de eventos */
const Button3 = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

/* Components unicafe */
const FeedBack = ({isGood, isNeutral, isBad}) => {
  return (
    <div>
      <h3>Give feedback by pressing the buttons</h3>
      <div>
        <Button onClick={isGood} text='Good'/>
        <Button onClick={isNeutral} text='Neutral'/>
        <Button onClick={isBad} text='Bad'/>
      </div>
    </div>
  )
}
const DisplayCafeValues = ({comments}) =>  {
  return (
    <div>
      <ul>
        <li>Good: {comments.good} </li>
        <li>Neutral: {comments.neutral} </li>
        <li>Bad: {comments.bad} </li>
      </ul>
    </div>
  )
}

const DisplayStatistics = ({totalComments, averageComments, positivePercentage}) => {
  if (totalComments === 0 && averageComments === 0 && positivePercentage === 0) {
    return (
      <div>
        <h2>Statisitics</h2>
        <p>No feedback given!</p>
      </div>
    )
  }
  return (
    <div>
      <h2>Statisitics</h2>
      <DisplayStatisticLine text="Total:" value={totalComments} ispercentage={0}/>
      <DisplayStatisticLine text="Average:" value={averageComments} ispercentage={0}/>
      <DisplayStatisticLine text="Positive:" value={positivePercentage} ispercentage={1}/>
    </div>
  )
}

const DisplayStatisticLine = ({text, value, ispercentage}) => {
  if (ispercentage === 0){
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>{text}</td>
              <td>{value}</td>
            </tr>
          </tbody>
        </table>
      </>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>{text}</td>
            <td>{value}%</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

/* Components ancdotes */
const DisplayRandomAnecdote = ({selected, anecdotes}) => {
  return (
    <>
      <p>{anecdotes[selected]}</p>
    </>
  )
}

const DisplayVotesAnecdotes = ({voteCuote, points, selected}) => {
  return (
    <>
      <Button onClick={voteCuote} text="Vote"/>
      <p>Has ({points[selected]}) votes</p>
    </>
  )
}

const DisplayMaxVotesAnecdote = ({selected, anecdotes}) => {
  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[selected]}</p>
    </>
  )
}

const App = () => {
  //const {counter} = props;
  /*const [count, setCount] = useState(0)
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Header = (props) => {
    return (
      <>
        <h1>{props.course.name}</h1>
      </>
    )
  }

  const Content = (props) => {
    /*const part1 = {
      name: 'Fundamentals of React',
      exercises: 10
    }
    const part2 = {
      name: 'Using props to pass data',
      exercises: 7
    }
    const part3 = {
      name: 'State of a component',
      exercises: 14
    }
    const parts = [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
    const Part = (props) => {
      return (
        <>
          <p>
            {props.parts.name} {props.parts.exercises}
          </p>
        </>
      )
    }
    return (
      <>
        <Part parts={props.course.parts[0]}/>
        <Part parts={props.course.parts[1]}/>
        <Part parts={props.course.parts[2]}/>
      </>
    )
  }

  const Total = (props) => {
    return (
      <>
        <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
      </>
    )
  }
  const Hello = ({ name, age }) => {
    //const { name, age } = props
    const bornYear = () => new Date().getFullYear() - age

    return (
      <>
        <p>Hello {name}, you are {age} years old</p>
        <p>So you were probably born in {bornYear()}</p>
      </>
    )
  }

  /*setTimeout (
    () => setCounter(counter + 1),
    1000
  )*/

  /* Increase and decrease */
  const  [counter, setCounter] = useState(0)
  const increase = () => setCounter(counter + 1)
  const decrease = () => setCounter(counter - 1)
  const reset = () => setCounter(0)

  /* Right and left */
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
      /*const newClicks = {
        left: clicks.left + 1,
        right: clicks.right
      }
      setClicks(newClicks)*/
      setAll(allClicks.concat('L'))
      const updatedLeft = clicks.left + 1;
      setClicks({ ...clicks, left: updatedLeft})
      setTotal(updatedLeft + clicks.right)
  }
  const handleRightClick = () => {
      /*const newClicks = {
        left: clicks.left,
        right: clicks.right + 1
      }
      setClicks(newClicks)*/
      setAll(allClicks.concat('R'))
      const updatedRight = clicks.right + 1;
      setClicks({ ...clicks, right: updatedRight})
      setTotal(updatedRight + clicks.left)
  }


  /* Pasando funciones controlador de eventos */
  /*const declare = (who) => {
    return () => console.log('Hello', who)
  }*/
  const declare = (who) => () => console.log('Hello', who)
  const [value, setValue] = useState(10)

  const setToValue = (newvalue) => {
    console.log('actual value', newvalue)
    setValue(newvalue)
  }

  /* unifcafe */
  const [comments, setComments] = useState({
    good: 0, neutral: 0, bad: 0
  })
  const [totalComments, setTotalComments] = useState(0)
  const [averageComments, setAverageComments] = useState(0)
  const [positivePercentage, setPositivePercentage] = useState(0)
  
  const isGood = () => {
    const updatedgood = comments.good + 1
    setComments({...comments, good: updatedgood})
    const updatedtotal = totalComments + 1;
    setTotalComments(updatedtotal)
    average(updatedgood, comments.neutral, comments.bad, updatedtotal)
    positivepercentage(updatedgood, updatedtotal)
  }
  const isNeutral = () => {
    const updatedneutral = comments.neutral + 1
    setComments({...comments, neutral: updatedneutral})
    const updatedtotal = totalComments + 1;
    setTotalComments(updatedtotal)
    average(comments.good, updatedneutral, comments.bad, updatedtotal)
    positivepercentage(comments.good, updatedtotal)
  }
  const isBad = () => {
    const updatedbad = comments.bad + 1
    setComments({...comments, bad: updatedbad})
    const updatedtotal = totalComments + 1;
    setTotalComments(updatedtotal)
    average(comments.good, comments.neutral, updatedbad, updatedtotal)
    positivepercentage(comments.good, updatedtotal)
  }
  
  const average = (goodvalue, neutralvalue, badvalue, totalComments) => {
    const avg = (goodvalue * 1 + neutralvalue * 0 + badvalue * -1) / totalComments
    setAverageComments(avg.toFixed(2))
  }
  
  const positivepercentage = (goodvalue, totalComments) => {
    const positivePercentage = (goodvalue/totalComments) * 100
    setPositivePercentage(positivePercentage.toFixed(2))
  }

  /* Anecdotes */

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({ 0: 1, 1: 3, 2: 4, 3: 2, 4: 0, 5: 0, 6: 0, 7: 0})
  const [maxvotes, setMaxVotes] = useState(0)

  
  const selectRandom = () => {
    const rand = Math.floor(Math.random() * (8 - 0) + 0)
    setSelected(rand)
    maxVotes()
  }
  
  const voteCuote = (selected) => {
    const copy = { ...points }
    copy[selected] += 1
    points[selected] = copy[selected]
    setPoints(copy)
  }

  const maxVotes = () => {
    const max = Object.keys(points).reduce((a, b) => points[a] > points[b] ? a : b)
    console.log('max', max)
    setMaxVotes(max)
  }

  setTimeout(() => maxVotes(), 1000)

  return (
    <>
      <div>
        <FeedBack 
            isGood={()=> isGood()}
            isNeutral={()=> isNeutral()}
            isBad={()=> isBad()}
        />
        <DisplayCafeValues comments={comments}/>
        <DisplayStatistics 
          totalComments={totalComments}
          averageComments={averageComments}
          positivePercentage={positivePercentage}
        />
      </div>
      <div>
        <button onClick={selectRandom}>Next cuote</button>
        <DisplayRandomAnecdote anecdotes={anecdotes} selected={selected}/>
        <DisplayVotesAnecdotes
           points={points} 
           selected={selected}
           voteCuote = {() => voteCuote(selected)}
        />
        <DisplayMaxVotesAnecdote anecdotes={anecdotes} selected={maxvotes}/>
      </div>
      <div>
        {/*<Hello name="Alexander The Greate" age={25}/>
        <Header course={course}/>
        <Content course={course}/>
        <Total course={course}/>*/}
        {/*<Hello name={name} />*/}
      </div>
      <div> {/* Increase and decrease
        <Display counter={counter}/>
        <Button onClick={increase} text='+'/>
        <Button onClick={decrease} text='-'/>
        <Button onClick={reset} text='reset'/>
      */}</div>
      <div> {/* Right and left
        {clicks.left}
        <Button2 handleClick={handleLeftClick} text='L'/>
        <Button2 handleClick={handleRightClick} text='R'/>
        {clicks.right}
        <History allClicks={allClicks}/>
        <p>total {total}</p>
      */}</div>
      <div> {/* Pasando funciones
        <Button3 handleClick={declare('Michael')} text='MICHAEL'/>
        <Button3 handleClick={declare('Laia')} text='LAIA'/>
        <Button3 handleClick={() => setToValue(1000)} text='Thousand'/>
        <Button3 handleClick={() => setToValue(value + 1)} text='Increment'/> 
      */}</div>
      {/*<div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
  </p>*/}
    </>
  )
}

export default App
