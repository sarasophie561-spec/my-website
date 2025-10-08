// Navigation through question pages
const questions = document.querySelectorAll('.question-box');
questions.forEach((q,index)=>{
  const nextBtn = q.querySelector('.nextBtn');
  if(nextBtn){
    nextBtn.addEventListener('click', ()=>{
      q.classList.remove('active');
      const next = questions[index+1];
      if(next) next.classList.add('active');
    });
  }
});

// Emotion selection
const crystals = document.querySelectorAll('.crystal');
let selectedEmotions = [];

crystals.forEach(c=>{
  c.addEventListener('click', ()=>{
    c.classList.toggle('selected');
    const emotion = c.dataset.emotion;
    if(selectedEmotions.includes(emotion)){
      selectedEmotions = selectedEmotions.filter(e=>e!==emotion);
    } else {
      selectedEmotions.push(emotion);
    }
    updateCauldron();
  });
});

// Update cauldron color based on selected emotions
const cauldron = document.getElementById('cauldron');
function updateCauldron(){
  if(selectedEmotions.length===0){
    cauldron.style.color='#ffffff';
    cauldron.style.transform='scale(1)';
    return;
  }
  const colors = {
    happy:'#FFD700',
    sad:'#1E90FF',
    angry:'#FF4500',
    anxious:'#9370DB',
    relaxed:'#00FA9A',
    lonely:'#FF69B4',
    grateful:'#FFA500'
  };
  let r=0,g=0,b=0;
  selectedEmotions.forEach(e=>{
    const hex = colors[e].replace('#','');
    r+=parseInt(hex.substr(0,2),16);
    g+=parseInt(hex.substr(2,2),16);
    b+=parseInt(hex.substr(4,2),16);
  });
  r=Math.floor(r/selectedEmotions.length);
  g=Math.floor(g/selectedEmotions.length);
  b=Math.floor(b/selectedEmotions.length);
  cauldron.style.color=`rgb(${r},${g},${b})`;
  cauldron.style.transform='scale(1.2)';
}

// Finish questions and mix potion
document.querySelector('.finishBtn').addEventListener('click', ()=>{
  const textAnswers = [];
  document.querySelectorAll('.answer').forEach(a=>{
    textAnswers.push(a.value);
  });

  document.getElementById('questionContainer').style.display='none';
  document.getElementById('cauldronArea').style.display='flex';

  // Animate potion bubbling
  cauldron.textContent='🧪✨';
  setTimeout(showFinalPage, 2000);
});

// Final soothing page
const finalPage = document.getElementById('finalPage');
const transformation = document.getElementById('transformation');
const finalText = document.getElementById('finalText');

function showFinalPage(){
  document.getElementById('cauldronArea').style.display='none';
  finalPage.style.display='flex';

  transformation.textContent='✨🍵✨';

  let messages = [];
  if(selectedEmotions.includes('happy')) messages.push("Your happiness spreads light around you.");
  if(selectedEmotions.includes('sad')) messages.push("It’s okay to feel sadness, it helps you heal.");
  if(selectedEmotions.includes('angry')) messages.push("Your anger transforms into strength and clarity.");
  if(selectedEmotions.includes('anxious')) messages.push("Your anxiety dissolves into calm and peace.");
  if(selectedEmotions.includes('relaxed')) messages.push("You are at peace and grounded.");
  if(selectedEmotions.includes('lonely')) messages.push("You are not alone, you are valued.");
  if(selectedEmotions.includes('grateful')) messages.push("Your gratitude lights up your mind and heart.");

  finalText.textContent = messages.join('\n') || "You are strong and capable. 💖";
}