let language = "es";
let currentLevel = 0;
let current = 0;
let score = 0;

const penguinImages = {
  idle: "https://i.imgur.com/FJGERuP.jpg",
  happy: "https://i.imgur.com/5257psB.jpg",
  sad: "https://i.imgur.com/OVsgM1A.jpg"
};

const correctSound = new Audio("https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3");

// 🧠 Card generator
function makeCard(es, en, isPositive){
  return {
    es:{
      q: es,
      a: ["Pensamiento amable","Pensamiento negativo"],
      c: isPositive ? 0 : 1,
      f: isPositive 
        ? "Eso es 💗 estás siendo amable contigo"
        : "Podemos cambiar ese pensamiento 💗"
    },
    en:{
      q: en,
      a: ["Gentler thought","Negative thought"],
      c: isPositive ? 0 : 1,
      f: isPositive 
        ? "Yes 💗 you're being kind to yourself"
        : "We can reframe that 💗"
    }
  };
}

// 🎮 Levels
const levels = [
  [
    makeCard("Estoy aprendiendo", "I am learning", true),
    makeCard("No soy suficiente", "I am not enough", false)
  ],
  [
    makeCard("Esto es difícil pero puedo", "This is hard but I can", true),
    makeCard("Nunca lo lograré", "I will never make it", false)
  ],
  [
    makeCard("Estoy mejorando cada día", "I'm improving every day", true),
    makeCard("Nada cambiará", "Nothing will change", false)
  ],
  [
    makeCard("Estoy aprendiendo a valorarme", "I am learning to value myself", true),
    makeCard("Siempre fallo", "I always fail", false)
  ]
];

// 🐧 Penguin
function setPenguin(state){
  let p = document.getElementById("penguin");
  p.src = penguinImages[state];
}

// 🎯 Load question
function load(){
  let q = levels[currentLevel][current][language];

  document.getElementById("questionText").innerText = q.q;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");

  setPenguin("idle");

  document.getElementById("penguinMood").innerText =
    language==="es"
    ? "Respira. Vamos paso a paso 💗"
    : "Take a breath. One step at a time 💗";

  document.getElementById("levelText").innerText =
    language==="es"
    ? "Nivel " + (currentLevel+1)
    : "Level " + (currentLevel+1);

  // 🔥 CREATE BUTTONS (IMPORTANT)
  q.a.forEach((text,i)=>{
    let btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = ()=>answer(i);
    answersDiv.appendChild(btn);
  });

  document.getElementById("score").innerText = score;
}

// 🎯 Answer
function answer(i){
  let q = levels[currentLevel][current][language];

  if(i === q.c){
    score++;
    correctSound.play();
    setPenguin("happy");
  } else {
    setPenguin("sad");
  }

  document.getElementById("nextBtn").classList.remove("hidden");
}

// ➡️ Next
document.getElementById("nextBtn").onclick = ()=>{
  current++;

  if(current >= levels[currentLevel].length){
    currentLevel++;
    current = 0;
  }

  if(currentLevel >= levels.length){
    currentLevel = 0;
    score = 0;
  }

  load();
};

// 🌍 Language toggle
document.getElementById("langToggle").onclick = ()=>{
  language = language==="es" ? "en" : "es";

  document.getElementById("langToggle").innerText =
    language==="es" ? "Español 🇪🇸" : "English 🇺🇸";

  load();
};

// 🚀 Start
load();
