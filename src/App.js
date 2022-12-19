import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import zachCandy from './images/zach.jpg'
import kerenCandy from './images/keren.jpeg'
import morCandy from './images/mor.jpg'
import nivCandy from './images/niv.jpg'
import rachelCandy from './images/rachel.jpg'
import elieCandy from './images/elie.jpg'
import blank from './images/blank.jpg'
import Heading from "./components/Heading";




const width = 8
const candyColors = [
  zachCandy,
  kerenCandy,
  morCandy,
  rachelCandy,
  elieCandy,
  nivCandy
]

const App = () => {

  const [currentColorArrangment, setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged, setSquareBeingDragged] = useState(null);
  const [squareBeingReplaced, setSquareBeingReplaced] = useState(null);
  const [scoreDisplay, setScoreDisplay] = useState(0);

  const checkForColumnOfThree = () => {
    for (let i = 0; i <= 47; i++){
      const columnOfThree = [i, i + width, i + width * 2]
      const decidedColor = currentColorArrangment[i];
      const isBlank = currentColorArrangment[i] == blank

      if (columnOfThree.every(square => currentColorArrangment[square] === decidedColor && !isBlank)){
        setScoreDisplay((score) => score + 4)
        columnOfThree.forEach(square => currentColorArrangment[square] = blank)
        return true
      }
    }
  }

  const checkForColumnOfFour = () => {
    for (let i = 0; i <= 39; i++){
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
      const decidedColor = currentColorArrangment[i];
      const isBlank = currentColorArrangment[i] == blank


      if (columnOfFour.every(square => currentColorArrangment[square] === decidedColor && !isBlank)){
        setScoreDisplay((score) => score + 4)
        columnOfFour.forEach(square => currentColorArrangment[square] = blank)
        return true
      }
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++){
      const rowOfThree = [i, i + 1, i + 2]
      const decidedColor = currentColorArrangment[i];
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,63,64]
      const isBlank = currentColorArrangment[i] == blank


      if (notValid.includes(i)) continue

      if (rowOfThree.every(square => currentColorArrangment[square] === decidedColor && !isBlank)){
        setScoreDisplay((score) => score + 3)
        rowOfThree.forEach(square => currentColorArrangment[square] = blank)
        return true
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++){
      const rowOfFour = [i, i + 1, i + 2, i + 3]
      const decidedColor = currentColorArrangment[i];
      const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,62,63,64]
      const isBlank = currentColorArrangment[i] == blank


      if (notValid.includes(i)) continue

      if (rowOfFour.every(square => currentColorArrangment[square] === decidedColor && !isBlank)){
        setScoreDisplay((score) => score + 3)
        rowOfFour.forEach(square => currentColorArrangment[square] = blank)
        return true
      }
    }
  }

  const moveIntoSquareBelow = () => {
    for (let i = 0; i <= 55; i++) {
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
        const isFirstRow = firstRow.includes(i)

        if (isFirstRow && currentColorArrangment[i] === blank) {
            let randomNumber = Math.floor(Math.random() * candyColors.length)
            currentColorArrangment[i] = candyColors[randomNumber]
        }

        if ((currentColorArrangment[i + width]) === blank) {
          currentColorArrangment[i + width] = currentColorArrangment[i]
          currentColorArrangment[i] = blank
        }
    }
}

  const dragStart = (e) => {
    console.log('drag start')
    setSquareBeingDragged(e.target)
  }
  const dragDrop = (e) => {
    console.log('drag drop')
    setSquareBeingReplaced(e.target)
  }
  const dragEnd = (e) => {
    console.log('drag end')
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
    const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

    currentColorArrangment[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
    currentColorArrangment[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

    console.log(squareBeingDraggedId)
    console.log(squareBeingReplacedId)

    const validMoves = [
      squareBeingDraggedId -1,
      squareBeingDragged - width,
      squareBeingDraggedId + 1,
      squareBeingDraggedId + width
    ]

    const validMove = validMoves.includes(squareBeingReplaced)

    const isAColumnOfFour = checkForColumnOfFour()
    const isARowOfFour = checkForRowOfFour()
    const isAColumnOfThree = checkForColumnOfThree()
    const isARowOfThree = checkForRowOfThree()

    if (squareBeingReplacedId &&
      validMove &&
      (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
      setSquareBeingDragged(null)
      setSquareBeingReplaced(null)
  } else {
      currentColorArrangment[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
      currentColorArrangment[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
      setCurrentColorArrangement([...currentColorArrangment])
  }
  }


  const createBoard = () => {
    const randomColorArrangment = [];
    for (let i = 0; i < width * width; i++){
      const randomNumberFrom0to5 = Math.floor(Math.random() * candyColors.length);
        const randomColor = candyColors[randomNumberFrom0to5];
        randomColorArrangment.push(randomColor);
    }
    setCurrentColorArrangement(randomColorArrangment)
  }
  
  useEffect(() => {
    createBoard()
  }, [])
  
  useEffect(() => {
    const timer = setInterval(() => {
        checkForColumnOfFour()
        checkForRowOfFour()
        checkForColumnOfThree()
        checkForRowOfThree()
        moveIntoSquareBelow()
        setCurrentColorArrangement([...currentColorArrangment])
    }, 100)
    return () => clearInterval(timer)
}, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangment])
  
  return (
    <div className="app">
    <Heading/>
    <div className="game">
      {currentColorArrangment.map((candyColor, index) => (
        <img
        key={index}
        src={candyColor}
        alt={candyColor}
        data-id={index}
        onDragStart={dragStart}
        draggable={true}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        onDrop={dragDrop}
        onDragEnd={dragEnd}
        />
    ))}
    </div>
    <ScoreBoard score={scoreDisplay} />
    </div>
  );
}

export default App;
