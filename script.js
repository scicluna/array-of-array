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
        const addDice =diceRoll(size)
    //handling explosive dice rolling
        if (addDice == size && explosiveFlag == "on"){
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
    }
//handles no drops and sorts
    else {
        rolledDice = rolledDice.sort((a,b) => b-a)
    }
    return rolledDice
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

rollBtn.addEventListener('click', function(){
    //init functions
    const arraySplit = splitArray(splitString(string.value))
    const rolledAll = rollAll(arraySplit);
    totalAll(rolledAll);
    //Create an Li
    const newLi = document.createElement('LI');
    //liContent must equal the content I want to display 
    const liContent = document.createTextNode(allDice)
    newLi.appendChild(liContent);
    //Attach the Li to the results list
    resultsList.appendChild(newLi);
        //cool animation
        setTimeout(function(){
            newLi.className = newLi.className +" show"; 
        }, 10);
    //Repeat for Total 
    const newLi2 = document.createElement("LI");
    const liContent2 = document.createTextNode(total);
    newLi2.appendChild(liContent2);
    totalsList.appendChild(newLi2);
            //cool animation
            setTimeout(function(){
                newLi2.className = newLi2.className +" show"; 
            }, 10);
})

string.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {    
        //init functions
        const arraySplit = splitArray(splitString(string.value))
        const rolledAll = rollAll(arraySplit);
        totalAll(rolledAll);
        //Create an Li
        const newLi = document.createElement('LI');
        //liContent must equal the content I want to display 
        const liContent = document.createTextNode(allDice)
        newLi.appendChild(liContent);
        //Attach the Li to the results list
        resultsList.appendChild(newLi);
            //cool animation
            setTimeout(function(){
                newLi.className = newLi.className +" show"; 
            }, 10);
        //Repeat for Total 
        const newLi2 = document.createElement("LI");
        const liContent2 = document.createTextNode(total);
        newLi2.appendChild(liContent2);
        totalsList.appendChild(newLi2);
                //cool animation
                setTimeout(function(){
                    newLi2.className = newLi2.className +" show"; 
                }, 10);
            }
    });