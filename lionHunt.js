const savana = "      L        Z  L    Z    "
const zebra = 'Z'
const lion = 'L'
const lengthOfSavana = savana.length
let distanceBetweenThem = 0 
let minDistanceBetweenThem = lengthOfSavana
let lionLastLoc = -1
let zebraLastLoc = -1 

for (let currentPlace = 0 ; currentPlace <= lengthOfSavana ; currentPlace ++) {
    let currentLetter = savana[currentPlace]
    if (currentLetter === lion) { 
        
        if (zebraLastLoc !== -1) {
            distanceBetweenThem = currentPlace - zebraLastLoc -1
            minDistanceBetweenThem = (distanceBetweenThem < minDistanceBetweenThem) ? distanceBetweenThem : minDistanceBetweenThem
        }lionLastLoc = currentPlace
    }
    if (currentLetter === zebra) {
        zebraLastLoc = currentPlace
        if (lionLastLoc !== -1) {
            distanceBetweenThem = currentPlace - lionLastLoc -1
             minDistanceBetweenThem = (distanceBetweenThem < minDistanceBetweenThem) ? distanceBetweenThem : minDistanceBetweenThem
        }zebraLastLoc = currentPlace
    }
} 
if (minDistanceBetweenThem === lengthOfSavana){
    minDistanceBetweenThem = -1
}
console.log("Minimum spaces between lion and zebra = " , minDistanceBetweenThem );
