// لعبة رياضيات للأطفال - 3 مستويات - بالعربي

// ✅ أسئلة المستوى الثالث (10 أسئلة ثابتة تختاري منهم 5 عشوائي كل محاولة)
const level3QuestionsPool = [
  { q: "مسابقة لشد الحبل تشارك فيها 7 مدارس عدد الطلاب المشاركين من كل مدرسة هو 20 طالب، فإن عدد الطلاب المشاركين في المسابقة ؟", options: [140, 210, 280], answer: 0 },
  { q: "يمتلك محمد 5 مجموعات من الطوابع كل مجموعة تحتوى على 20 طابع، فإن عدد الطوابع لدى محمد ؟", options: [50, 100, 150], answer: 1 },
  { q: "قيمة هاتف تساوي 40 ريال عماني، فإن قيمة 3 هواتف بالريال العماني = ", options: [90, 120, 150], answer: 1 },
  { q: "يتكون منزل سالم من 3 طوابق ارتفاع كل طابق 4 متر، فإن ارتفاع المنزل = ....... متر", options: [12, 15, 18], answer: 0 },
  { q: "لدى أنس 6 صناديق كل صندوق به 5 علب عصير، فإن عدد علب العصير في الصناديق الستة ..... ", options: [20, 25, 30], answer: 2 },
  { q: "سعر دراجة نارية 100 ريال عماني ، فإن سعر 4 دراجات هوائية = ...........", options: [280, 400, 320], answer: 1 },
  { q: "كيس يحتوى على 5 كجم من الأرز، فإن مقدار الأرز الموجود في 12 كيس = ......", options: [50, 55, 60], answer: 2 },
  { q: "عدد الأقلام في العلبة الواحدة 8 أقلام، فإن عدد الأقلام في 9 علب = .......", options: [64, 72, 80], answer: 1 },
  { q: "اشترت فاطمة 3 كتب للقراءة قيمة الكتاب الواحد 7 ريال عماني، فإن قيمة الكتب الثلاثة = ....", options: [14, 28, 21], answer: 2 },
  { q: "عبوة تحتوى على 7 كجم من السكر، فإن مقدار السكر الموجود في 6 عبوات =.......", options: [42, 36, 38], answer: 0 }

];

// ✅ دالة توليد الأسئلة
function generateLevelQuestions(levelNum){
  let questions = [];
  if(levelNum === 1){
    // المستوى الأول: جدول 1-5 (5 أسئلة عشوائية)
    for(let i=0; i<5; i++){
      let a = Math.floor(Math.random()*5)+1;
      let b = Math.floor(Math.random()*5)+1;
      let correct = a * b;
      let options = [correct];
      while(options.length<3){
        let fake = Math.floor(Math.random()*25)+1;
        if(!options.includes(fake)) options.push(fake);
      }
      options = shuffle(options);
      questions.push({q:`ما ناتج ${a} × ${b}؟`, options, answer:options.indexOf(correct)});
    }
  } else if(levelNum === 2){
    // المستوى الثاني: ضرب عددين (1-12) (5 أسئلة عشوائية)
    for(let i=0; i<5; i++){
      let a = Math.floor(Math.random()*12)+1;
      let b = Math.floor(Math.random()*12)+1;
      let correct = a * b;
      let options = [correct];
      while(options.length<3){
        let fake = Math.floor(Math.random()*144)+1;
        if(!options.includes(fake)) options.push(fake);
      }
      options = shuffle(options);
      questions.push({q:`ما ناتج ${a} × ${b}؟`, options, answer:options.indexOf(correct)});
    }
  } else if(levelNum === 3){
    // المستوى الثالث: اختيار 5 عشوائي من 10 أسئلة ثابتة
    let shuffled = shuffle([...level3QuestionsPool]);
    questions = shuffled.slice(0,5);
  }
  return {questions};
}

// ✅ دالة خلط
function shuffle(array){
  return array.sort(()=> Math.random()-0.5);
}

// ✅ الحالة العامة
let state = {
  currentLevel: null,
  qIndex: 0,
  levelCorrectCount: 0,
  totalScore: 0,
  totalQuestions: 15, // 5 لكل مستوى
  levelResults: {1:0,2:0,3:0},
  attempts: 0, // المحاولات الكلية
  levelAttempts: {1:0,2:0,3:0} // محاولات كل مستوى
};

// ✅ عناصر DOM
const el = {
  menu: document.getElementById('menu'),
  game: document.getElementById('game'),
  end: document.getElementById('end'),
  level1Btn: document.getElementById('level1-btn'),
  level2Btn: document.getElementById('level2-btn'),
  level3Btn: document.getElementById('level3-btn'),
  levelTitle: document.getElementById('levelTitle'),
  qNum: document.getElementById('qNum'),
  qTotal: document.getElementById('qTotal'),
  questionArea: document.getElementById('question-area'),
  nextBtn: document.getElementById('next-btn'),
  backBtn: document.getElementById('back-btn'),
  retryBtn: document.getElementById('retry-btn'),
  menuBtn: document.getElementById('menu-btn'),
  scoreText: document.getElementById('score-text'),
  starsDiv: document.getElementById('stars'),
  finalMessage: document.getElementById('final-message')
};

// ✅ init handlers
el.level1Btn.addEventListener('click', ()=> startLevel(1));
el.level2Btn.addEventListener('click', ()=> {
  if(el.level2Btn.dataset.locked === 'true'){ alert('المستوى مقفول - أكمل المستوى السابق أولاً'); return; }
  startLevel(2);
});
el.level3Btn.addEventListener('click', ()=> {
  if(el.level3Btn.dataset.locked === 'true'){ alert('المستوى مقفول - أكمل المستوى السابق أولاً'); return; }
  startLevel(3);
});
el.backBtn.addEventListener('click', showMenu);
el.retryBtn.addEventListener('click', ()=> location.reload());
el.menuBtn.addEventListener('click', ()=> { resetToMenu(); });

function resetToMenu(){
  state.currentLevel = null; state.qIndex = 0; state.levelCorrectCount = 0;
  showMenu();
}

// ✅ عرض القائمة
function showMenu(){ 
  el.menu.classList.remove('hidden'); 
  el.game.classList.add('hidden'); 
  el.end.classList.add('hidden'); 
}

// ✅ بدء مستوى
function startLevel(levelNum){
  state.currentLevel = levelNum;
  state.qIndex = 0;
  state.levelCorrectCount = 0;

  // زيادة المحاولات
  state.attempts++;
  state.levelAttempts[levelNum]++;

  // توليد أسئلة جديدة
  state.currentQuestions = generateLevelQuestions(levelNum).questions;

  el.menu.classList.add('hidden');
  el.game.classList.remove('hidden');
  renderQuestion();
}

// ✅ عرض السؤال
function renderQuestion(){
  const lvlNum = state.currentLevel;
  const lvl = state.currentQuestions;
  el.levelTitle.textContent = `المستوى ${lvlNum}`;
  el.qTotal.textContent = lvl.length;
  el.qNum.textContent = state.qIndex + 1;
  el.questionArea.innerHTML = '';
  el.nextBtn.classList.add('hidden');

  const q = lvl[state.qIndex];
  const box = document.createElement('div'); box.className='question';
  box.innerHTML = `<div class="q-text">${q.q}</div>`;
  const answers = document.createElement('div'); answers.className='answers';
  q.options.forEach((opt,i)=>{
    const b = document.createElement('button'); b.className='btn-answer'; b.textContent = opt;
    b.addEventListener('click', ()=>{
      if(b.classList.contains('disabled')) return;
      if(i === q.answer){ 
        b.classList.add('correct'); 
        state.levelCorrectCount++; 
        state.totalScore++; 
      }
      else{ b.classList.add('wrong'); }
      [...answers.querySelectorAll('button')].forEach(x=>x.disabled=true);
      el.nextBtn.classList.remove('hidden');
    });
    answers.appendChild(b);
  });
  box.appendChild(answers);
  el.questionArea.appendChild(box);
}

// ✅ زر التالي
el.nextBtn.addEventListener('click', ()=>{
  const lvlNum = state.currentLevel;
  const lvl = state.currentQuestions;
  state.qIndex++;
  if(state.qIndex >= lvl.length){
    const needed = lvl.length;
    if(state.levelCorrectCount === needed){
      state.levelResults[lvlNum] = needed;
      unlockNextAndReturn(lvlNum);
    } else {
      alert('فيه إجابات خطأ ❌. لازم تجاوب كل الأسئلة صح عشان تفتح المستوى التالي. هنعيد المستوى الآن.');
      recalcTotalScoreAfterFailure(lvlNum);
      state.qIndex = 0;
      state.levelCorrectCount = 0;

      // 👇 زيادة المحاولات عند الإعادة
      state.attempts++;
      state.levelAttempts[lvlNum]++;

      state.currentQuestions = generateLevelQuestions(lvlNum).questions; // أسئلة جديدة عند الإعادة
      renderQuestion();
    }
  } else {
    renderQuestion();
  }
});

function unlockNextAndReturn(lvlNum){
  if(lvlNum === 1){
    document.getElementById('level2-btn').classList.remove('locked');
    document.getElementById('level2-btn').dataset.locked = 'false';
  }
  if(lvlNum === 2){
    document.getElementById('level3-btn').classList.remove('locked');
    document.getElementById('level3-btn').dataset.locked = 'false';
  }
  alert('ممتاز! نجحت في كل أسئلة المستوى ' + lvlNum + ' وتم فتح المستوى التالي.');
  if(lvlNum === 3){
    showResults();
  } else {
    showMenu();
  }
}

function recalcTotalScoreAfterFailure(failedLevel){
  let sum = 0;
  for(const k in state.levelResults) sum += state.levelResults[k] || 0;
  state.totalScore = sum;
}

// ✅ إظهار النتائج النهائية
function showResults(){
  el.menu.classList.add('hidden');
  el.game.classList.add('hidden');
  el.end.classList.remove('hidden');

  const score = state.totalScore;
  const total = state.totalQuestions;
  const percent = Math.round((score / total) * 100);
  el.scoreText.textContent = `درجتك: ${score} من ${total} — النسبة: ${percent}%`;

  // ✅ إضافة الصورة بجانب النتيجة
  const img = document.createElement('img');
  img.src = "images/student.png"; 
  img.alt = "طالب فائز";
  img.style.width = "200px";
  img.style.height = "300px";
  img.style.margin = "15px";

  // عنصر لتجميع الصورة + النص
  const resultBox = document.createElement('div');
  resultBox.style.display = "flex";
  resultBox.style.alignItems = "center";
  resultBox.style.gap = "20px";

  resultBox.appendChild(img);

  const textBox = document.createElement('div');
  textBox.appendChild(el.scoreText.cloneNode(true));
  textBox.appendChild(el.starsDiv.cloneNode(true));
  textBox.appendChild(el.finalMessage.cloneNode(true));
  resultBox.appendChild(textBox);

  el.end.innerHTML = "";
  el.end.appendChild(resultBox);

  // عرض عدد المحاولات
  const attemptsInfo = document.createElement('p');
  attemptsInfo.textContent = `عدد المحاولات الكلية: ${state.attempts}`;
  el.end.appendChild(attemptsInfo);

  const levelInfo = document.createElement('p');
  levelInfo.textContent = `محاولات المستويات: (الأول: ${state.levelAttempts[1]}، الثاني: ${state.levelAttempts[2]}، الثالث: ${state.levelAttempts[3]})`;
  el.end.appendChild(levelInfo);
}

// ✅ بدء عرض القائمة عند التحميل
showMenu();
