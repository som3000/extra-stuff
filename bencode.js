function encode(data) {
  switch (typeof (data)) {
    case "number":
      return encodeInteger(data);
    case "string":
      return encodeString(data);
    case "object":
      return encodeArray(data);
    default:
      console.log("Not of any Prescribed Type");
      break;
  }
}

function encodeInteger(n) {
  return "i" + n + "e";
}

function encodeString(data) {
  return `${data.length}:${data}`;
}

function encodeArray(data) {
  let encodedStr = "l";
  for (let index = 0; index < data.length; index++) {
    encodedStr += encode(data[index])
  }
  return encodedStr + "e";
}

function findKeywordIndex(keyword, data, startIndex) {
  for (let index = startIndex; index < data.length; index++) {
    if (data[index] === keyword) {
      return index;
    }
  }
  return "KeyWord Not Found"
}

function decodeInteger(data, startIndex, char = "e") {
  const keyWordIndex = findKeywordIndex(char, data, startIndex);
  return parseInt(data.slice(startIndex, keyWordIndex));
}

function decodeString(data, startIndex) {
  const keywordIndex = findKeywordIndex(":", data, startIndex);
  const lengthOfStr = decodeInteger(data, startIndex, ":");
  return data.slice(keywordIndex + 1, keywordIndex + lengthOfStr + 2);
}

function decodeArray(data, startIndex) {
  let arrayFormed = [];
  for (let index = startIndex; index < data.length;) {
    const currentElement = decode(data, index)
    arrayFormed.push(currentElement);
    index = indexForArray(currentElement, index);
    if (data[index] === "e") {
      return arrayFormed;
    }
  }
}

function indexForArray(currentElement, index) {
  switch (typeof (currentElement)) {
    case "number": return index + (currentElement + "").length + 2;
    case "string":
      const lengthStr = currentElement.length
      const totalLength = lengthStr + (lengthStr + "").length
      return index + totalLength;
    case "object":


    default:
      break;
  }
}

function decode(data, startIndex = 0) {
  if (data[startIndex] === "i") {
    return decodeInteger(data, startIndex + 1);
  }
  if (data[startIndex] === "l") {
    return decodeArray(data, startIndex + 1);
  }

  if ("123456789".includes(data[startIndex])) {
    return decodeString(data, startIndex);
  }

}

function areArrayEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }
  for (let index = 0; index < array1.length; index++) {
    if (array1[index] !== array2[index]) {
      return false;
    }
  }
  return true;
}

function displayMessage(actualOutput, input, expectedOutput, type) {
  if (actualOutput === expectedOutput) {
    return "✅ : " + type;
  }
  
  if (typeof (actualOutput) === "object") {
     if (areArrayEqual(actualOutput, expectedOutput)) {
      return "✅ : " + type;
     }
  }

  let message = "❌  [ " + input + " ]";
  message += "| Calculated output = " + actualOutput;
  message += "| Expected output = " + expectedOutput;

  return message;
}

function testEncode(input, expectedOutput, type) {
  const actualOutput = encode(input);
  return displayMessage(actualOutput, input, expectedOutput, type);
}

function testIntegerEncode() {
  console.log(testEncode(123456, "i123456e", "Integer"));
  console.log(testEncode(1234, "i1234e", "Simple Integer"));
  console.log(testEncode(-123, "i-123e", "Negative Integer"));
}

function testStringEncode() {
  console.log(testEncode("hello", "5:hello", "Simple String"));
  console.log(testEncode("HEllo22", "7:HEllo22", "String with number"));
  console.log(testEncode("HEllo#@2", "8:HEllo#@2", "String with Special Characters"));
  console.log(testEncode("HEllo  2", "8:HEllo  2", "String with Spaces"));
}

function testArrayEncode() {
  console.log(testEncode([1, 4], "li1ei4ee", "List Containing Integers only"));
  console.log(testEncode([1, "two", 4], "li1e3:twoi4ee", "List Containing Integers and String"));
  console.log(testEncode([1, "two", ["three", 4]], "li1e3:twol5:threei4eee", "nested array"));
}

function testDecode(input, expectedOutput, type) {
  const actualOutput = decode(input);
  return displayMessage(actualOutput, input, expectedOutput, type);
}

function testIntegerDecode() {
  console.log(testDecode("i123e", 123, "Simple Integer"));
}

function testStringDecode() {
  console.log(testDecode("3:two", "two", "Simple String"));
  console.log(testDecode("12:123456789ten", "123456789ten", "String of 2 digit length."));
}

function testArrayDecode() {
  console.log(testDecode("li2ei34ei566ee", [2, 34, 566], "Array Containing only numbers"));
  console.log(testDecode("li2e3:twoi566ee", [2, "two", 566], "Array Containing number and string"));
}

function main() {
  // console.log("\nEncoding of Integer");
  // testIntegerEncode();

  // console.log("\nEncoding of String");
  // testStringEncode();

  // console.log("\nEncoding of Array");
  // testArrayEncode();

  console.log("\n\nDECODE");
  console.log("\nDecoding of Integer");
  testIntegerDecode();

  console.log("\nDecoding of String");
  testStringDecode();

  console.log("\nDecoding of Array");
  testArrayDecode();
}

main();
