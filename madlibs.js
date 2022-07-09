const parseStory = (story) => {
return story 
}


let editSection = document.getElementById("madLibsEdit")     // Targeting the First editable section
let review = document.getElementById('ssmadLibsPreview')    //  Targeting the Second review section


// This function will contain all the work from creating a list of objects, until the input fields.
const processedStory = (parsed) => {
 
 // The story is being separated into chunks including special characters such as Commas, Periods, etc.
  let words = /[a-z\[a-z\]]+|[?,/\.!]+/ig    // It was really a tough task just to figure out how to write this simple line of code but I did it at the end.....Horaaay 😅.
  const parsedStory = parsed.match(words)   // The result of applying the Regexp on the story


ObjsList = []
for (let i = 0; i < parsedStory.length; i++) {
  if (parsedStory[i].includes("[")) { // Handling the words that will be edited
    checkType = parsedStory[i].split('[')
    switch( checkType[1][0]) {
      case ('n'):
        ObjsList.push({word: checkType[0], pos: `[noun] `})
        break;
      case ('v'):
        ObjsList.push({word: checkType[0], pos: `[verb] `})
        break;
      case ('a'):
        ObjsList.push({word: checkType[0], pos: `[adjective] `})
    }
    if (parsedStory[i+1] === "," || parsedStory[i+1] === ".") {   // This is  to handle the spaces before the special characters like commas and periods when coming with "pos"
      ObjsList[ObjsList.length-1].pos = ObjsList[ObjsList.length-1].pos.trimEnd()
    }
  }
  else {
    ObjsList.push({word: parsedStory[i]+" "})
    if (parsedStory[i+1] === "," || parsedStory[i+1] === ".") { // This is to handle the spaces before the special characters like commas and periods when coming with "word"
      ObjsList[ObjsList.length-1].word = ObjsList[ObjsList.length-1].word.trimEnd()
    }
  }
}

// A loop to dispaly the list of objects in the editSection......As simple as it should be.
let index = 0
let placeholder0 = ''
for (el of ObjsList) {
  
  if (el.pos) {
    editSection.innerHTML += `<input type="text" class="editableFields" id=${index} name="editPane" size= '2' style= "padding:2px;margin:2px;border-radius:10px;" placeholder="${el.pos}" </input>`
    review.innerHTML += `<span id=${index} class="review" style="color:red">${el.pos}</span>`

    index++}
  else {editSection.innerHTML += `${el.word}`;
  review.innerHTML += `${el.word} `
}
}
const editable = document.querySelectorAll(".editableFields");   //Targeting the editable fields
const reviewPane = document.querySelectorAll(".review");        //Targeting the review fields
const button =document.getElementById("button") //targeting the restart button
button.addEventListener("click" , (e) => {
  editable.forEach((field) => {  
    reviewPane[`${field.getAttribute("id")}`].innerText = placeholder0
field.value = ""

})
})
editable.forEach((field) => {       // Iterating through the editable fields and updating the review fields.
    let placeholder = field.getAttribute("placeholder");
    placeholder0 = placeholder                          
  field.addEventListener("keyup", (e) => {
    if (field.value.length > 0) {
      reviewPane[`${field.getAttribute("id")}`].innerText = `${field.value} ` 
    }
    else{
    reviewPane[`${field.getAttribute("id")}`].innerText = placeholder  // Handling the empty field. 
  }

  })
  field.addEventListener('click', (e) => {           // Handling the focus on the editable fields.
    field.placeholder = ''
    // Here, we can add some css styles to the editable fields.
    document.addEventListener('click', (e) => {
      if (e.target !== field) {
        field.placeholder = placeholder
      }
    })
    
  })
  })
}

getRawStory().then(parseStory).then(processedStory)