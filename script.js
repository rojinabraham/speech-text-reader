const main = document.querySelector("main");
const voiceSelect = document.getElementById("voices");
const textArea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggle = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

data.forEach(createBox);

//creacte speech box
function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;

  box.classList.add("box");
  box.innerHTML = `
  <img src="${image}" alt="${text}"/>
  <p class="info">${text}</p> 
  `;
  //speak event
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    //add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active"), 1000);
  });
  main.appendChild(box);
}

//innit speech synthesis
const message = new SpeechSynthesisUtterance();

//array to store voices

let voices = [];
function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.forEach((voice) => {
    // console.log(voice);
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voiceSelect.appendChild(option);
  });
}

//set text
function setTextMessage(text) {
  message.text = text;
}
//speek text
function speakText() {
  speechSynthesis.speak(message);
}
//set voice
function setVoice(e) {
  console.log(e.target.value);
  message.voice = voices.find((voice) => voice.name === e.target.value);
  console.log(message.voice);
}
//voices changed
speechSynthesis.addEventListener("voiceschanged", getVoices);
toggle.addEventListener("click", () => {
  document.getElementById("text-box").classList.toggle("show");
});

//close
closeBtn.addEventListener("click", () => {
  document.getElementById("text-box").classList.remove("show");
});

voiceSelect.addEventListener("change", setVoice);

readBtn.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speakText();
});

getVoices();
