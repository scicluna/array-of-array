//DOMS
const string = document.querySelector(".dice-string")
const resultsList = document.querySelector(".results")
const totalsList = document.querySelector(".totals")
const rollBtn = document.querySelector(".roller")

//splitting the string into arrays of an array
function splitString (str) {
    let splitStrings = []
    let subArray = str.split(/[-+]/)

    while(subArray.length){
    subString = subArray.splice(0,1);
    splitStrings.push(subString)
    }
    
    return splitStrings
}

//splitting up the sub arrays so that "d" is a delimiter
function splitArray (array) {
    let cuttedArrays = []
    for (let i = 0; i<array.length; i++){
        let cutSplit = array[i][0].split('d')
        cuttedArrays.push(cutSplit)
    }
return cuttedArrays
}

//roll a single dice
function diceRoll(size){
    let rolledDie = Math.ceil(Math.random()*size)
    return rolledDie
}

//roll many dice
function allRoll(quantity, size){
    let rolledDice = []
    if (size != undefined){
    for (i=0; i<quantity; i++){
        rolledDice.push(diceRoll(size))
    }}
    else {
        let addition = parseInt(quantity)
        rolledDice.push(addition);
    }

    return rolledDice
}

//put all of the dice into a single array
function rollAll(array){
    allDice = []
    for (let i=0; i<array.length;i++){
        allDice.push(allRoll(array[i][0],array[i][1]));
    }
    console.log(allDice)
    return allDice
}

//total the dice in a 2d array
function totalAll(array){
    total = 0;
    for (let i=0;i<array.length;i++){
        for (let j=0; j<array[i].length;j++){
            total = total + array[i][j]
        }
    }
    console.log(total)
    return total
}

rollBtn.addEventListener('click', function(){
    //init functions
    rollAll(splitArray(splitString(string.value)));
    totalAll(rollAll(splitArray(splitString(string.value))));
    //Create an Li
    const newLi = document.createElement('LI');
    //liContent must equal the content I want to display 
    const liContent = document.createTextNode(allDice)
    newLi.appendChild(liContent);
    //Attach the Li to the results list
    resultsList.appendChild(newLi);
    //Repeat for Total 
    const newLi2 = document.createElement("LI");
    const liContent2 = document.createTextNode(total);
    newLi2.appendChild(liContent2);
    totalsList.appendChild(newLi2);
})