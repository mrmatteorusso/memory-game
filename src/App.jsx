import React from "react"
import arrayOfCards from "./arrayOfCards";
import { useState, useRef, useEffect } from "react";

import EnterNumberOfCards from "./components/EnterNumberOfCards";
import ChooseApi from "./components/ChooseApi";
import StartButton from "./components/StartButton";
// import Confetti from './components/Confetti'
import Confetti from 'react-confetti'

function App() {
  const [cards, setCards] = React.useState([]);
  const [chosenNumberOfCards, setChosenNumberOfCards] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [match, setMatch] = React.useState(0)
  const [isAtStart, setIsAtStart] = React.useState(true)
  const [rememeberLastClickedCard, setRememeberLastClickedCard] = React.useState({})
  const [apiChoice, setApiChoice] = React.useState("")
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null); <Confetti numberOfPieces={150} width={width} height={height} />

  const confetiRef = useRef(null);
  /*
  reset button
  setting the initial states
  useReducer()
  */


  // React.useEffect(() => {
  //   // document.addEventListener('contextmenu', event => { event.preventDefault(); alert("What are you doing?!!!") });
  //   async function fetchData() {

  //     try {
  //       const arrayTest = await arrayOfCards(chosenNumberOfCards, apiChoice);
  //       console.log("this is array TEST", arrayTest);
  //       setCards(arrayTest)
  //     } catch (error) {
  //       console.error("error from useEffect:", error);
  //     }
  //   }
  //   fetchData()
  // },
  //   [setCards, chosenNumberOfCards, apiChoice]
  // )

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);


  async function fetchWhenStart() {
    try {
      const arrayTest = await arrayOfCards(chosenNumberOfCards, apiChoice);
      setCards(arrayTest)
    } catch (error) {
      console.error("error from useEffect:", error);
    }
  }

  function handleClick(card) {
    if (card.isShown) return;
    setCount(prevCount => prevCount + 1);
    setCards(
      oldCards => oldCards.map(
        oldCard => oldCard.id === card.id ? ({ ...oldCard, isShown: !oldCard.isShown }) : oldCard
      )
    )

    if (count % 2 === 0) {
      setRememeberLastClickedCard(card)
    } else {
      if (rememeberLastClickedCard.id != card.id && rememeberLastClickedCard.imgUrl === card.imgUrl) {
        setMatch(prev => prev + 1)
        //find remberedCard and change paired
        setCards(
          oldCards => oldCards.map(
            oldCard => oldCard.id === rememeberLastClickedCard.id ? ({ ...oldCard, isPaired: true }) : oldCard
          )
        )
        //find card with same img and change paired
        setCards(
          oldCards => oldCards.map(
            oldCard => oldCard.imgUrl === rememeberLastClickedCard.imgUrl ? ({ ...oldCard, isPaired: true }) : oldCard
          )
        )
        //logic to highlight the pair
      } else {
        setTimeout(() =>
          setCards(
            oldCards => oldCards.map(
              card => card.isPaired !== true ? ({ ...card, isShown: false }) : card
            )
          ), 1000)

      }

      setRememeberLastClickedCard({})
    }
  }
  if (match === cards.length / 2) {
  }


  function doStuff() {
    //debugger;
  }


  const cardsElement = cards.map((card) => {
    return (
      <div className="card"
        key={card.id}
        onClick={() => handleClick(card)
        }
      >

        <div
          className={`content ${card.isShown ? "flip" : ""}`}
        >
          <div
            className="front"
          >
            <p className="front-paragraph">Memory</p>
            <p className="front-paragraph">Game</p>
          </div>
          {!card.isPaired ?
            <img
              className="back"
              style={{ border: "4px solid yellow" }}
              src={card.imgUrl}
              alt="cat"
              loop="infinite"
            />
            :
            <img
              className="back"
              style={{ border: "4px solid green" }}
              src={card.imgUrl}
              alt="cat"
              loop="infinite"
            />
          }
        </div>
      </div >
    )
  }
  )

  function storeNumber(event) {
    setChosenNumberOfCards(event.target.value)
  }

  function machApi(newValue) {
    setApiChoice(newValue)
  }

  function disableScroll() {
    // // Get the current scroll position
    // const scrollX = window.scrollX || window.pageXOffset;
    // const scrollY = window.scrollY || window.pageYOffset;

    // // Save the current scroll position in data attributes
    // document.body.dataset.scrollX = 0;
    // document.body.dataset.scrollY = 0;

    // Set the body to a fixed position and prevent scrolling
    document.body.style.position = 'fixed';
    document.body.style.width = "100%";
  }

  return (
    <div className="main-container">
      < h1 >
        Memory Card Game
      </h1 >
      <nav>
        {match !== cards.length / 2 &&

          <div>count= {count} || match= {match}</div>}
        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#cbcaca" fillOpacity="1" d="M0,128L40,144C80,160,160,192,240,208C320,224,400,224,480,213.3C560,203,640,181,720,181.3C800,181,880,203,960,186.7C1040,171,1120,117,1200,101.3C1280,85,1360,107,1400,117.3L1440,128L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg> */}
      </nav>
      {
        isAtStart && <div className="rules" style={{ backgroundColor: "grey" }}>
          <h3>Rules</h3>

          <ChooseApi handleChange={machApi} />
          <div>
            <label htmlFor="number">How many pairs? </label>
            <input type="number" id="number" min="1" max="20" onChange={() => setChosenNumberOfCards(event.target.value)} />
          </div>

          <button
            disabled={apiChoice === "" || chosenNumberOfCards < 1}
            className="primary-btn"

            onClick={() => {
              if (apiChoice === "" || chosenNumberOfCards < 1) {
                console.log("Button is disabled, so clicking it won't do anything.");
              } else {
                fetchWhenStart();
                setIsAtStart(false);
              }
            }}
          > Start</button>
        </div>
      }
      <div
        className="container">
        {cardsElement}
      </div>
      {
        match > 0 &&
        match === cards.length / 2 &&
        <>
          {disableScroll()}
          <Confetti width={width} height={height} />

          {/* {
            window.onscroll = function () {
              window.scrollTo(0, 0);
            }
          } */}

          <div className="winner-container">
            <h1>YOU WON</h1>

            <h3>count= {count} || match= {match}</h3>
            <button className="primary-btn" onClick={() => {
              setMatch(0)
              setChosenNumberOfCards(4)
              setIsAtStart(true)
              location.reload()

            }}>START AGAIN</button>

          </div>
        </>
      }
    </div >
  )
}

export default App
