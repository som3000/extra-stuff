console.clear();
const cardSet = ["A♦️", "2♦️", "3♦️", "4♦️", "5♦️", "6♦️", "7♦️", "8♦️", "9♦️", "10♦️", "J♦️", "Q♦️", "K♦️"];
cardSet.push("A❤️", "2❤️", "3❤️", "4❤️", "5❤️", "6❤️", "7❤️", "8❤️", "9❤️", "10❤️", "J❤️", "Q❤️", "K❤️");
cardSet.push("A♧", "2♧", "3♧", "4♧", "5♧", "6♧", "7♧", "8♧", "9♧", "10♧", "J♧", "Q♧", "K♧");
cardSet.push("A♤", "2♤", "3♤", "4♤", "5♤", "6♤", "7♤", "8♤", "9♤", "10♤", "J♤", "Q♤", "K♤");

const p1Hand = [];
const p2Hand = [];
for (let index = 1; index <= 52; index = index + 2) {
  p1Hand.push(randomCard(cardSet.length))
  p2Hand.push(randomCard(cardSet.length))
}

let wonP;
let lostP;

const name1 = prompt("ENTER FIRST PERSON NAME").toUpperCase();
const name2 = prompt("ENTER SECOND PERSON NAME").toUpperCase();

function randomCard(totalCards) {
  const cardIndex = Math.floor(Math.random() * 100) % totalCards;
  let cardSelected = cardSet[cardIndex];
  if (cardSelected[0] !== "1") {
    cardSelected += " ";
  }
  cardSet.splice(cardIndex, 1);
  return cardSelected;
}

function convertToArray(string, delimiter = ",") {
  const array = [];
  let strFormed = "";
  for (let index = 0; index < string.length; index++) {
    if (string[index] === delimiter) {
      array.push(strFormed);
      strFormed = "";
    } else {
      strFormed += string[index];
    }
  }
  array.push(strFormed);

  return array;
}

function hideHand(hand) {
  const hiddenHand = [];
  for (let index = 0; index < hand.length; index++) {
    hiddenHand.push("⬜️")
  }

  return hiddenHand;
}

function duplicateArray(array) {
  const dupArray = [];
  for (let index = 0; index < array.length; index++) {
    dupArray.push(array[index]);
  }
  return dupArray
}

function paddedArray(array, length) {
  const arrayProcessed = duplicateArray(array);
  for (let index = array.length; index < length; index++) {
    arrayProcessed.push("   ");
  }
  return arrayProcessed;
}

function cardDisplay(handToShow) {
  console.log("\t" + name1 + "'s  HAND\t\t\t\t\t\t\t\t\t\t" + name2 + "'s  HAND");
  console.log(formatHand(p1Hand, p2Hand, handToShow));
}

function formatHand(hand1sent, hand2sent, handToShow) {
  const biggerNumber = hand1sent.length < hand2sent.length ? hand2sent.length : hand1sent.length;
  let hand1padded = hideHand(paddedArray(hand1sent, biggerNumber));
  let hand2padded = paddedArray(hand2sent, biggerNumber);
  if (handToShow === 1) {
    hand1padded = paddedArray(hand1sent, biggerNumber);
    hand2padded = hideHand(paddedArray(hand2sent, biggerNumber));
  }

  const formatedArray = [];
  for (let index = 0; index < biggerNumber && index < 10; index++) {
    let eachCardPair = index + "  - " + hand1padded[index] + "\t\t\t\t\t\t  |  \t\t\t\t\t\t" + index + "  - " + hand2padded[index];
    formatedArray.push(eachCardPair);
  }
  for (let index = 10; index < biggerNumber; index++) {
    let eachCardPair = index + " - " + hand1padded[index] + "\t\t\t\t\t\t  |  \t\t\t\t\t\t" + index + " - " + hand2padded[index];
    formatedArray.push(eachCardPair);
  }
  return formatedArray.join("\n")
}

function gameBegin() {
  console.clear();
  console.log("\n\t\t\t\t     -------WELCOME TO THE GAME OF BLUFF-------");
  console.log("\n\t\t\t\t\t\tLET THE DEALING BEGIN");
  return mainPlay(name1, name2);
}

function startOfChance(wonP, lostP) {
  const wonPNum = wonP === name1 ? 1 : 2;
  cardDisplay(wonPNum);
  const cardForRound = prompt(wonP + "  :  CHOOSE THE CARD VALUE FOR THE ROUND");
  const cardIndexToPlay = prompt(wonP + "  : ENTER THE INDEXS OF CARD YOU WANNA PLAY\n(form : a,b...) [No Spaces]");
  const arrayOfIndex = convertToArray(cardIndexToPlay);
  const currentHand = wonP === name1 ? p1Hand : p2Hand;
  const cardsPlayed = [];
  for (let index = 0; index < arrayOfIndex.length; index++) {
    cardsPlayed.push(currentHand[parseInt(arrayOfIndex[index])]);
    currentHand.splice(parseInt(arrayOfIndex[index]), 1);
  }
  const isOk = prompt(cardsPlayed + "cards Played ok (y / n)");
  console.clear();
  
  return midGame(cardForRound, [], cardsPlayed, 2);
}

function midGame(cardForRound, prevCards, newCards, turnNum) {
  const currentPname = turnNum % 2 === 0 ? name2 : name1;
  const currentPNum = turnNum % 2 === 0 ? 2 : 1;
  cardDisplay(currentPNum);
  const hidPrevCards = [];
  for (let index = 0; index < prevCards.length; index++) {
    hidPrevCards.push("⬜️");
  }
  console.log("\t\t\t\tCARD FOR THE TURN IS : ", cardForRound);
  console.log("\t\t\t\tCARDS PLAYED" + "⬜️".repeat(newCards.length));
  const choice = prompt(currentPname + ":  ENTER 1 TO SHOW ; ENTER 2 TO PLAY");
  if (choice === "1") {    // if want to show
    return show(cardForRound, newCards);
  }

  prevCards = prevCards + newCards;
  console.clear();
  cardDisplay(currentPNum);
  console.log("\t\t\t\tCARDS PLAYED" + "⬜️".repeat(prevCards.length));
  const newIndexPlayed = prompt(currentPname + "  : ENTER THE INDEXS OF CARD YOU WANNA PLAY\n(form : a,b...) [No Spaces]");
  const arrayOfIndex = convertToArray(newIndexPlayed);
  let new1Cards = [];
  const currentHand = turnNum % 2 === 0 ? p2Hand : p1Hand;
  for (let index = 0; index < arrayOfIndex.length; index++) {
    new1Cards.push(currentHand[parseInt(arrayOfIndex[index])]);
    currentHand.splice(parseInt(arrayOfIndex[index]), 1);
  }
  const isOk = prompt(new1Cards + "cards Played ok (y / n)");
  return (cardForRound, prevCards, new1Cards, turnNum++)
}

function show(cardForRound, cardsPlayed) {
  console.log(cardsPlayed);
  for (let index = 0; index < cardsPlayed.length; index++) {
    if (cardsPlayed[index][0] !== cardForRound) {
      return false;
    }
  }

  return true;
}

function mainPlay(wonP, lostP) {
  return startOfChance(wonP, lostP);
}

function gameFlow() {
  gameBegin();
  mainPlay(wonP, lostP);
}

gameFlow();
