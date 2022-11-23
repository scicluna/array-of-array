//DOMS
const string = document.querySelector(".dice-string")
const resultsList = document.querySelector(".results")
const totalsList = document.querySelector(".totals")
const rollBtn = document.querySelector(".roller")
explosiveFlag = "off"

//splitting the string into arrays of an array
function splitString (str) {
    let splitStrings = []
    let subArray = str.split(/[+]/)

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
function allRoll(quantity, size, drop){
    let rolledDice = []

//handling explosive dice syntax
    if (size != undefined && size.includes('!')){
        size = size.replace(/!/g, '')
        explosiveFlag = "on"
    }
//running a loop to roll the dice per quantity
    if (size != undefined){
    for (i=0; i<quantity; i++){
        let addDice =diceRoll(size)
    //handling explosive dice rolling
        if (addDice == size && explosiveFlag == "on" && size != 1){
            i--
            explosiveFlag = "off"
        }

        rolledDice.push(addDice)
//handling regular addition
    }}
    else {
        let addition = parseInt(quantity)
        rolledDice.push(addition);
    }
//handles dropping dice and sorts
    if (drop != undefined){
        rolledDice = rolledDice.sort((a,b) => b-a).slice(0,rolledDice.length-drop)
        rolledDice = rolledDice.sort((a,b) => a-b)
    }

//handles no drops and sorts
    else {
        rolledDice = rolledDice.sort((a,b) => a-b)
    }

    return colorify(rolledDice, size);
}

//put all of the dice into a single array
function rollAll(array){
    allDice = []
    for (let i=0; i<array.length;i++){
        allDice.push(allRoll(array[i][0],array[i][1],array[i][2]));
    
    }
    return allDice
}

//total the dice in a 2d array - still don't know why not declaring total as a variable works here
function totalAll(array){
    total = 0;
    for (let i=0;i<array.length;i++){
        for (let j=0; j<array[i].length;j++){
            total = total + array[i][j]
        }
    }
    return total
}

function flattenArrays(array){
    arr1 = array.flat();
    return arr1
}

function colorify (array, size) {
    arrayofObject = []
    for (i=0;i<array.length;i++){
        if (array[i] == size){
            let newObject = Object.assign({}, array[i])
            newObject.no = array[i]
            newObject.color = "green"
            arrayofObject.push(newObject)
        }
        else if (array[i] == 1){
            let newObject = Object.assign({}, array[i])
            newObject.no = array[i]
            newObject.color = "red"
            arrayofObject.push(newObject)
        }

        else {
            let newObject = Object.assign({}, array[i])
            newObject.no = array[i]
            newObject.color = "black"
            arrayofObject.push(newObject)
    }
}
return arrayofObject

}
function no (item){
    return item.no
}

function color (item){
    return item.color
}

function sum (prev, next){
    return prev + next;
}

function value (item){
    return item.value
}


//Run everything when we click the "Roll" button
rollBtn.addEventListener('click', function(){
    //init functions
    const arraySplit = splitArray(splitString(string.value))
    const rolledAll = rollAll(arraySplit);
    console.log(rolledAll);
    const flatArray = flattenArrays(allDice);
    console.log(flatArray)


    const newDiv = document.createElement('div');

    for (let i = 0;i<flatArray.length;i++){
    const numbertoadd = no(flatArray[i]);
    //Create an Li
    const newLi = document.createElement('LI');
    //liContent must equal the content I want to display 
    const liContent = document.createTextNode(numbertoadd)
    newLi.appendChild(liContent);

    //color hacks
    if(color(flatArray[i]) == "red"){
        newLi.className = newLi.className + "red" + " "
    }
    if(color(flatArray[i]) == "green"){
        newLi.className = newLi.className + "green" + " "
    }

    //Attach the Li to the results list
    resultsList.appendChild(newLi)
    newDiv.appendChild(newLi);
    
    //cool animation
    setTimeout(function(){
        newLi.className = newLi.className +"show";  }, 10);
    }
    resultsList.appendChild(newDiv)

    //Repeat for Total 
    let total = 0
    for (let i=0; i<flatArray.length;i++){
        total = total + no(flatArray[i])
    }
    const newLi2 = document.createElement("LI");
    const liContent2 = document.createTextNode(total);
    newLi2.appendChild(liContent2);
    totalsList.appendChild(newLi2, totalsList.firstChild)
            //cool animation
         setTimeout(function(){
            newLi2.className = newLi2.className +" show";  }, 10);
        }
        )

//Run everything when we hit enter while in the input field
string.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
            //init functions
    //init functions
    const arraySplit = splitArray(splitString(string.value))
    const rolledAll = rollAll(arraySplit);
    console.log(rolledAll);
    const flatArray = flattenArrays(allDice);
    console.log(flatArray)


    const newDiv = document.createElement('div');

    for (let i = 0;i<flatArray.length;i++){
    const numbertoadd = no(flatArray[i]);
    //Create an Li
    const newLi = document.createElement('LI');
    //liContent must equal the content I want to display 
    const liContent = document.createTextNode(numbertoadd)
    newLi.appendChild(liContent);

    //color hacks
    if(color(flatArray[i]) == "red"){
        newLi.className = newLi.className + "red" + " "
    }
    if(color(flatArray[i]) == "green"){
        newLi.className = newLi.className + "green" + " "
    }

    //Attach the Li to the results list
    resultsList.appendChild(newLi)
    newDiv.appendChild(newLi);
    
    //cool animation
    setTimeout(function(){
        newLi.className = newLi.className +"show";  }, 10);
    }
    resultsList.appendChild(newDiv)

    //Repeat for Total 
    let total = 0
    for (let i=0; i<flatArray.length;i++){
        total = total + no(flatArray[i])
    }
    const newLi2 = document.createElement("LI");
    const liContent2 = document.createTextNode(total);
    newLi2.appendChild(liContent2);
    totalsList.appendChild(newLi2, totalsList.firstChild)
            //cool animation
         setTimeout(function(){
            newLi2.className = newLi2.className +" show";  }, 10);
        }
    })
