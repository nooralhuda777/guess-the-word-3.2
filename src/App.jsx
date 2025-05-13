import logo from "/logo.png";
import "./App.css";
import { getRandomWord } from "./utils";
import { useState, useEffect } from "react";
import axios from "axios";
import { use } from "react";
function App() {
  // currWord is the current secret word for this round. Update this with the updater function after each round.
  const [currWord, setCurrentWord] = useState(getRandomWord());
  // guessedLetters stores all letters a user has guessed so far
  const [guessedLetters, setGuessedLetters] = useState([]);

  //Add additional states below as required.
  const [totalTries, setTotalTries] = useState(0);
  const [userWon, setUserWon] = useState(false);
  const [remainingTries, setRemainingTries] = useState(10);
  console.log(currWord);
  const generateWordDisplay = () => {
    const wordDisplay = [];
    // for...of is a string and array iterator that does not use index
    for (let letter of currWord) {
      if (guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    return wordDisplay.toString();
  };

  //create additional function to power the
  const handleSubmitLetter = (e) => {
    const word = e.target.value.toLowerCase();
    const letter = word[word.length - 1];
    if (word.length > guessedLetters.length) {
      setGuessedLetters([...guessedLetters, letter]);
      setTotalTries(totalTries + 1);
    } else {
      const filteredGuessedLetters = guessedLetters.filter(
        (l, idx) => idx !== letter
      );
      guessedLetters.length = setGuessedLetters(filteredGuessedLetters);
    }
    e.preventDefault();
    setGuessedLetters([...guessedLetters, letter]);
    console.log(e.target.value.length);
  };
  const handleRestart = () => {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setTotalTries(0);
    setUserWon(false);
  };
  const handleTry = () => {
    console.log("handleTry called");
    setRemainingTries(remainingTries - 1);
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
    setTotalTries(0);
    setUserWon(false);
  };
  useEffect(() => {
    const guessedWord = guessedLetters.join("").toLowerCase();
    const containsAllLetters = currWord
      .split("")
      .every((l) => guessedWord.includes(l));
    console.log(containsAllLetters);
    if (remainingTries === 0) {
      setUserWon(false);
    }
    if (totalTries < 10 && containsAllLetters) {
      setUserWon(true);
    }
  }, [currWord, totalTries, guessedLetters]);

  console.log(currWord, guessedLetters);

  return (
    <>
      <div>
        <div>
          <img src={logo} className="logo" alt="Rocket logo" />
        </div>
        <div>
          {userWon ? (
            <div className="win">
              <h1>YOU WIN</h1>

              <button onClick={handleRestart}>Restart Game</button>
            </div>
          ) : null}
        </div>
        <h1>Guess The Word 🚀</h1>
        <h3>Word Display</h3>
        {totalTries > 10
          ? "You lose, the word was: " + currWord
          : generateWordDisplay()}
        {totalTries <= 10 && (
          <>
            <h3>Guessed Letters</h3>
            {guessedLetters.length > 0 ? guessedLetters.toString() : "-"}
            <br />

            <h3>Input</h3>
            {/* Insert form element here */}
            <form>
              <input type="text" onChange={handleSubmitLetter} />
              <h4>Remaining Tries: {remainingTries}</h4>
            </form>
          </>
        )}
        {totalTries > 10 && <button onClick={handleTry}>Restart Game</button>}
        {remainingTries === 0 && (
          <button onClick={handleRestart}>Restart Game</button>
        )}
      </div>
    </>
  );
}

export default App;

//mypractice
// //
// // const url =
// //  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";

// //useEffect(() => {
// //const data = axios.get(url);
// // console.log(data);
// //});
// //const [coins, setCoins] = useState([]);
// //* useEffect(() => {
// // axios
// //   .get(url)
// // .then((res) => {
// // setCoins(res.data);  })
// // .catch((err) => console.log(err));
// //});
// //const coinsList = coins ? (
// // coins.map((coin, idx) => {
// // return (
// // <li key={idx}>
// // <h1>Name:{coin.name}</h1>
// //<img src={coin.image} />
// //<h3>{coin.current_price}</h3>
// //</li>
// // );
// //})
// // ) : (
// //   <li>loading</li>
// // );
// // return <ul>{coinsList}</ul>;
// // //
// //mypracticeend
// //}
// // Perform logic after the request is complete.
// //const handleResponse = (response) => {
// // Handle request success
// // console.log(response);
