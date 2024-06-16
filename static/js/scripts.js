const punctuation_timer = 145;
const space_timer = 17;
const letter_timer = 10;

const dialog = [
    "Hi! My name is Isaiah, and I'm a software developer. You can check out some of my work by scrolling down below, or you can see my skills by clicking on this textbox!",
    "I typically use Python and Javascript with a bit of C#, HTML, and CSS. I do have some knowledge with C++ and Java too.",
    "Some of the software and frameworks that I've used are the Godot and Unity game engines, Git, Docker, MongoDB, Flask, Bootstrap, and Postman!"

]

var dialogIndex = 0
var can_click = true

const dialogFinishedEvent = new Event("dialogFinished")
const dialogStartEvent = new Event('dialogStart')
const arrow = document.querySelector("#arrow-right")

document.addEventListener('dialogFinished', e => {
    arrow.style.opacity = 1;
    console.log('in')
})

document.addEventListener('dialogStart', e => {
    arrow.style.opacity = 0;
    console.log('out')
})

// On start up
document.addEventListener('DOMContentLoaded', function(e) {
    const text = document.querySelector(".dialog-text");
    document.dispatchEvent(dialogStartEvent)
    printLetterByLetter(text, dialog[dialogIndex++], 10);

});

const clip = document.querySelectorAll(".hover-to-play");
for (let i = 0; i < clip.length; i++) { clip[i].addEventListener("mouseenter", function (e) { clip[i].play();
  }); clip[i].addEventListener("mouseout", function (e) { clip[i].pause(); }); }


const textBox = document.querySelector(".dialog-box");
textBox.addEventListener("click", function(e) {
   const text = document.querySelector(".dialog-text");
   document.dispatchEvent(dialogStartEvent)
   printLetterByLetter(text, dialog[dialogIndex++], 10);

    if (dialogIndex >= dialog.length) {
        dialogIndex = 0
    }
});

async function printLetterByLetter(destination, message, speed){
    if (!can_click) {
        return;
    }

    can_click = false;
    var i = 0;
    destination.innerHTML = "";

    // For each character:
    for (var i = 0; i <= message.length; i++) {

        var char = message.charAt(i);
        //console.log(char)
       destination.innerHTML += char;
        switch (char) {
            case "!":
                await new Promise(resolve => setTimeout(resolve, punctuation_timer));
            case ".":
                await new Promise(resolve => setTimeout(resolve, punctuation_timer));
            case ",":
                await new Promise(resolve => setTimeout(resolve, punctuation_timer));
            case "?":
                await new Promise(resolve => setTimeout(resolve, punctuation_timer));
            case ":":
                await new Promise(resolve => setTimeout(resolve, punctuation_timer));
            case " ":
                await new Promise(resolve => setTimeout(resolve, space_timer));
            default:
                await new Promise(resolve => setTimeout(resolve, letter_timer));
        }
    }

    can_click = true
    document.dispatchEvent(dialogFinishedEvent)
}
