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

  // Add additional states below as required.
  const [totalTries, setTotalTries] = useState(0);
  const [userWon, setUserWon] = useState(false);
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

  // create additional function to power the
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
    //e.preventDefault();
    setGuessedLetters([...guessedLetters, letter]);
    console.log(e.target.value.length);
  };
  const handleRestart = () => {
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
            </form>
          </>
        )}
        {totalTries > 10 && (
          <button onClick={handleRestart}>Restart Game</button>
        )}
      </div>
    </>
  );
}

// Perform logic after the request is complete.
const handleResponse = (response) => {
  // Handle request success
  console.log(response);
};

// Make a request and store return value (promise) in getRequestPromise
const getRequestPromise = axios.get("http://dog.ceo/api/breeds/image/random");

// Tell the program to call handleResponse when getRequestPromise resolves.
getRequestPromise.then(handleResponse);

let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("value"), 2000);
});
// .finally(() => alert("Promise ready")) // triggers first
// .then((result) => alert(result)); // <-- .then shows "value"

// resolve runs the first function in .then
//promise.then(
//(result) => alert(result), // shows "done!" after 1 second
//(error) => alert(error), // doesn't run

// .catch(f) is the same as promise.then(null, f)
//promise.catch(alert); // shows "Error: Whoops!" after 1 second

//);
const data = fetch("https://jsonplaceholder.typicode.com/todos/1");
console.log(data);
//
//

//
export default App;
