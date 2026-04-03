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

// 🎮 LEVELS
const levels = [

  [
    makeCard("Estoy aprendiendo", "I am learning", true),
    makeCard("No soy suficiente", "I am not enough", false),
    makeCard("Puedo mejorar", "I can improve", true),
    makeCard("Siempre fallo", "I always fail", false),
    makeCard("Estoy creciendo", "I am growing", true),
    makeCard("Nada me sale bien", "Nothing works for me", false),
    makeCard("Voy paso a paso", "I go step by step", true),
    makeCard("Es imposible", "This is impossible", false),
    makeCard("Estoy intentando", "I am trying", true),
    makeCard("No puedo hacerlo", "I can't do this", false)
  ],

  [
    makeCard("Esto es difícil pero puedo", "This is hard but I can", true),
    makeCard("Nunca lo lograré", "I will never make it", false),
    makeCard("Estoy aprendiendo de esto", "I am learning from this", true),
    makeCard("Todo sale mal", "Everything goes wrong", false),
    makeCard("Puedo adaptarme", "I can adapt", true),
    makeCard("No tiene sentido", "There is no point", false),
    makeCard("Estoy avanzando", "I am progressing", true),
    makeCard("Soy un desastre", "I am a mess", false),
    makeCard("Lo intento de nuevo", "I try again", true),
    makeCard("No sirvo para esto", "I'm not good at this", false)
  ],

  [
    makeCard("No es perfecto pero está bien", "Not perfect but okay", true),
    makeCard("Debo hacerlo perfecto", "I must be perfect", false),
    makeCard("Estoy orgullosa de mí", "I am proud of myself", true),
    makeCard("No valgo nada", "I am worthless", false),
    makeCard("Estoy haciendo lo mejor que puedo", "I'm doing my best", true),
    makeCard("Siempre arruino todo", "I ruin everything", false),
    makeCard("Puedo descansar", "I can rest", true),
    makeCard("No puedo parar", "I can't stop", false),
    makeCard("Estoy mejorando cada día", "I'm improving every day", true),
    makeCard("Nada cambiará", "Nothing will change", false)
  ]
];

// 🐧 Penguin state
function setPenguin(state){
  let p = document.getElementById("penguin");
  p.classList.remove("happy","sad");
  p.src = penguinImages[state];
  if(state==="happy") p.classList.add("happy");
  if(state==="sad") p.classList.add("sad");
}

// 🎯 Load question
function load(){
  let q = levels[currentLevel][current][language];

  document.getElementById("questionText").innerText = q.q;
  document.getElementById("answers").innerHTML = "";
  document.getElementById("feedback").classList.add("hidden");
  document.getElementById("nextBtn").classList.add("hidden");

  setPenguin("idle");

  // 🌍 LANGUAGE TEXTS
  document.getElementById("subtitle").innerText =
    language==="es"
    ? "Practica pensamientos más amables"
    : "Practice gentler thoughts";

  document.getElementById("penguinMood").innerText =
    language==="es"
    ? "Respira. Vamos paso a paso 💗"
    : "Take a breath. One step at a time 💗";

  document.getElementById("nextBtn").innerText =
    language==="es" ? "Siguiente" : "Next";

  document.getElementById("levelText").innerText =
    language==="es"
    ? "Nivel " + (currentLevel+1)
    : "Level " + (currentLevel+1);

  document.getElementById("completeTitle").innerText =
    language==="es"
    ? "Nivel completado 🎉"
    : "Level complete 🎉";

  document.getElementById("restartBtn").innerText =
    language==="es"
    ? "Reiniciar"
    : "Restart";

  // 🧠 Answers
  q.a.forEach((text,i)=>{
    let b = document.createElement("button");
    b.innerText = text;
    b.onclick = ()=>answer(i);
    document.getElementById("answers").appendChild(b);
  });

  update();
}

// 🎯 Answer logic
function answer(i){
  let q = levels[currentLevel][current][language];
  let buttons = document.querySelectorAll("#answers button");

  buttons.forEach((b,index)=>{
    b.disabled = true;
    if(index===q.c) b.classList.add("correct");
    if(index===i && i!==q.c) b.classList.add("wrong");
  });

  let mood = document.getElementById("penguinMood");

  if(i===q.c){
    score++;
    correctSound.play();
    setPenguin("happy");
    mood.innerText = q.f;
  } else {
    setPenguin("sad");
    mood.innerText =
      language==="es"
      ? "Está bien 💗 intentemos otra forma"
      : "That's okay 💗 let's try another way";
  }

  document.getElementById("feedback").innerText = q.f;
  document.getElementById("feedback").classList.remove("hidden");
  document.getElementById("nextBtn").classList.remove("hidden");
}

// 📊 Score + progress
function update(){
  document.getElementById("score").innerText = score;

  let progress = ((current + 1) / levels[currentLevel].length) * 100;
  document.getElementById("progressFill").style.width = progress + "%";
}

// ➡️ Next
document.getElementById("nextBtn").onclick = ()=>{
  current++;

  if(current < levels[currentLevel].length){
    load();
  } else {
    currentLevel++;
    current = 0;

    if(currentLevel < levels.length){
      alert(language==="es"?"Nuevo nivel ✨":"New level ✨");
      load();
    } else {
      document.getElementById("levelComplete").classList.remove("hidden");
    }
  }
};

// 🔄 Restart
document.getElementById("restartBtn").onclick = ()=>{
  score = 0;
  current = 0;
  currentLevel = 0;
  load();
  document.getElementById("levelComplete").classList.add("hidden");
};

// 🌍 Language toggle (FULL FIX)
document.getElementById("langToggle").onclick = ()=>{
  language = language==="es" ? "en" : "es";

  document.getElementById("langToggle").innerText =
    language==="es" ? "Español 🇪🇸" : "English 🇺🇸";

  load();
};

// 🚀 Start game
load();
