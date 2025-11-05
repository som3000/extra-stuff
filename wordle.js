console.clear();
function randomWord() {
  const wordBank = ["APPLE", "BRAIN", "CHESS", "DREAM", "EARTH", "FAITH", "GLASS", "HAPPY", "IGLOO", "JELLY"];
  wordBank.push("KNIFE", "LEMON", "MUSIC", "NURSE", "OPERA", "PEARL", "QUEEN", "RIVER", "STORM", "TABLE");
  wordBank.push("UNITY", "VENOM", "WATER", "PIZZA", "SADLY", "ZEBRA", "ANGEL", "BEAST", "CANDY", "DANCE");
  wordBank.push("EAGLE", "FANCY", "GIANT", "HORSE", "INDEX", "JOKER", "QUICK", "LASER", "MAGIC", "NOBLE");
  wordBank.push("EAGLE", "FANCY", "GIANT", "HORSE", "INDEX", "JOKER", "KOALA", "LASER", "MAGIC", "NOBLE");
  wordBank.push("OCEAN", "PARTY", "QUACK", "ROBOT", "SWEET", "TIGER", "URBAN", "VIVID", "WOMAN", "YOUTH");
  wordBank.push("MIGHT", "FLUID", "BERRY", "CRISP", "DELTA", "EMBER", "FROST", "GRASS", "HOUSE", "INPUT");
  wordBank.push("MERCY", "KNACK", "BRICK", "MODEL", "NIGHT", "LIGHT", "BLADE", "QUILL", "ROAST", "SHADE");
  wordBank.push("TRUST", "USUAL", "EARTH", "SHOES", "VOTER", "NOVEL", "ACTOR", "PLANT", "CHARM", "DRINK");
  wordBank.push("DRAMA", "FLAME", "GHOST", "HEART", "IRONY", "JUICE", "KITES", "LIVER", "METAL", "NORTH");

  return wordBank[randomCard()];
}

function randomCard() {
  return Math.floor(Math.random() * 100);
}

const targetWord = randomWord().toLowerCase();
const targetArray = wordToArray(targetWord);

function positionStatus(targetArray, guessedWord) {
  const statusArray = ["❌", "❌", "❌", "❌", "❌"];
  const guessedArray = wordToArray(guessedWord);

  for (let index = 0; index < 5; index++) {
    if (targetArray.includes(guessedWord[index])) {
      statusArray[index] = "🔆";
      if (targetArray[index] === guessedArray[index]) {
        statusArray[index] = "✅";
      }
    }
  }

  return statusArray;
}

function wordToArray(word) {
  let array = [];
  for (let index = 0; index < word.length; index++) {
    array.push(word[index]);
  }
  return array;
}

function gameBegin() {
  console.log("\n\nYou are granted 10 ATTEMPTS to guess the 5 letter word, spend them WISELY.");

  return cardDisplay(targetArray);
}

function underline(word) {
  return "-".repeat(word.length);
}

function displayMessage(event, guessedWord, targetArray) {
  if (event === "lost") {
    return "Better Luck Next Time    !!! \n the WORD WAS \n" + targetWord;
  }
  if (event === "won") {
    return "WALLAHI HABIBI !! COME TO DUBAI !! 🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉 \n";
  }
  let message = "\t\t\t" + underline(guessedWord) + "\n";
  message += positionStatus(targetArray, guessedWord);
  return message + "\nTRY AGAIN";
}

function cardDisplay(targetArray, chancesLeft = 10) {
  chancesLeft--;
  const guessedWord = prompt("Enter 5 letter Word    ").toLowerCase();
  if (chancesLeft === 0) {
    return console.log(displayMessage("lost") + "\n The Word was = ", targetArray);
  }
  if (guessedWord === targetWord) {
    return console.log(displayMessage("won", guessedWord));
  }
  if (guessedWord === "helpme") {
    console.log("\t\t\t" + underline(guessedWord));
    chancesLeft++;
    console.log("\t\tCHEAT CODE ACTIVATED\n\t\t THE FIRST WORD IS  " + targetWord[0] + "\n");
    return cardDisplay(targetArray, chancesLeft + 1)
  }
  if (guessedWord === "telltheword") {
    console.log("\t\t\t" + underline(guessedWord));
    let reply = prompt("SAY PLEASE  !!!!     ").toLowerCase();
    chancesLeft++;
    if (reply === "please") {
      console.log("\t\tCHEAT CODE ACTIVATED\n\t\t THE WORD IS  " + targetWord);
    } else {
      console.log("WHERE ARE YOUR MANNERS 😡😡😡😡😡😡😡😡😡😡😡😡!!");
      return gameBegin();
    }

    reply = prompt("\n\tU FORGOT TO SAY THANK YOU !!!!").toLocaleLowerCase();
    if (reply === "thankyou" || reply === "thank you") {
      console.log("\n\t\tGOOD BOY  !!!!");
    } else {
      console.log("WHERE ARE YOUR MANNERS 😡😡😡😡😡😡😡😡😡😡😡😡!!");
      return gameBegin();
    }

  }

  console.log(displayMessage("try again", guessedWord, targetArray));
  console.log("\nChances Left = " + chancesLeft + "\n");

  return cardDisplay(targetArray, chancesLeft);
}

gameBegin();
