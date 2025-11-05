const runs = [45, 12, 89, 0, 34, 67, 5, 78, 23, 54, 10, 99, 38, 60, 7, 81, 25, 50, 13, 42, 36, 72, 58, 19, 90, 90];

function sortAscending(dataArray) {
  const sortedArray = dataArray.slice();
  for (let i = 0; i < dataArray.length; i++) {
    for (let j = i + 1; j < dataArray.length; j++) {
      if (sortedArray[i] > sortedArray[j]) {
        const temp = sortedArray[j];
        sortedArray[j] = sortedArray[i];
        sortedArray[i] = temp;
      }
    }
  }
  return sortedArray;
}

function median(sortedData) {
  return sortedData[Math.floor(sortedData.length / 2)]
}

function mean(data) {
  let sum = 0;
  for (let index = 0; index < data.length; index++) {
    sum += data[index];
  }
  return sum / data.length;
}

function standardDeviation(data) {
  const meanCal = mean(data);
  let sumSquareDifference = 0;
  for (let index = 0; index < data.length; index++) {
    const difference = meanCal - data[index];
    sumSquareDifference += difference * difference;
  }
  return Math.sqrt(sumSquareDifference / data.length);
}

const sortedRuns = sortAscending(runs);
console.log(sortedRuns);
console.log("Mean of data : " + Math.round(mean(runs)));
console.log("\nMedian of the data is : " + median(sortedRuns));
console.log("\nStandard Deviation of the data is : " + standardDeviation(runs) + "\n");
