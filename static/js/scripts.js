const default_punctuation_timer = 145;
const default_space_timer = 17;
const default_letter_timer = 10;

var punctuation_timer = default_punctuation_timer;
var space_timer = default_space_timer;
var letter_timer =  default_letter_timer;


const dialog = [
    "Hi! My name is Isaiah, and I'm a software developer. You can check out some of my work by scrolling down below, or I can tell you more about myself if you click on this textbox!",
    "I prefer using high-level programming languages like Python and Javascript for most apps because the ease of getting projects off the ground quickly!",
    "I have also worked with other languages like C#, Java, and C++ before. As you can probably tell from this webpage, I got a quite the knack for HTML and CSS too!",
    "If you checked out below, I'm a bit of a hobbyist game developer, so I've quite used to using game engines like Godot and Unity to make all sorts of neat projects like top-down shooters, and 2D platformers.",
    "As for other technologies, I'm definitely familiar with version control systems like Git and a bit familiar containerization apps like Docker as well. ",
    "I've also used web frameworks like Flask and React a bit! With a touch of databases like MongoDB and SQL!",
]

var dialogIndex = 0
var can_click = true
var double_time = false

const dialogFinishedEvent = new Event("dialogFinished")
const dialogStartEvent = new Event('dialogStart')
const arrow = document.querySelector("#arrow-right")

document.addEventListener('dialogFinished', e => {
    arrow.style.opacity = 1;
    can_click = true
    double_time = false
    setTimersDefault()
})

document.addEventListener('dialogStart', e => {
    arrow.style.opacity = 0;
})

// On start up
document.addEventListener('DOMContentLoaded', play_dialog)

const clip = document.querySelectorAll(".hover-to-play");
for (let i = 0; i < clip.length; i++) { clip[i].addEventListener("mouseenter", function (e) { clip[i].play();
  }); clip[i].addEventListener("mouseout", function (e) { clip[i].pause(); }); }


const textBox = document.querySelector(".dialog-box");
textBox.addEventListener("click", play_dialog)

function play_dialog() {
    // User cannot click to advance the box to next dialog
    if (!can_click) {
        // Double clicking the box will make the dialog talk twice as fast.
        if (!double_time) {
            punctuation_timer = 0.002;
            space_timer = 0.002;
            letter_timer = 0.002;
            double_time = true
        }
        return;
   }
   // User can click to advance
   else {
      can_click = false;
      const text = document.querySelector(".dialog-text");
      document.dispatchEvent(dialogStartEvent)
      printLetterByLetter(text, dialog[dialogIndex++]);

      // Loop back to beginning of the dialog list
      if (dialogIndex >= dialog.length) {
        dialogIndex = 0
      }
   }
}

async function printLetterByLetter(destination, message){
    var i = 0;
    destination.innerHTML = "";

    // For each character:
    for (var i = 0; i <= message.length; i++) {

       var char = message.charAt(i);
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

    document.dispatchEvent(dialogFinishedEvent)
}

function setTimersDefault() {
    punctuation_timer = default_punctuation_timer;
    space_timer = default_space_timer;
    letter_timer = default_letter_timer
}