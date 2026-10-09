const topics = [
  {name:"Arithmetic", icon:"➗", desc:"Percentages, profit & loss", color:"#e9f5ef"},
  {name:"Algebra", icon:"𝑥²", desc:"Equations and expressions", color:"#f0edff"},
  {name:"Geometry", icon:"△", desc:"Shapes, areas and angles", color:"#fff1df"},
  {name:"Number Systems", icon:"🔢", desc:"Factors, multiples, remainders", color:"#eaf2ff"},
  {name:"Modern Math", icon:"∑", desc:"Counting and probability", color:"#fcecf4"},
  {name:"Time & Work", icon:"◷", desc:"Work rates and motion", color:"#e9f5ef"}
];
const questions = [
 {id:1,topic:"Arithmetic",q:"An item marked at ₹1,000 is sold at a 20% discount. What is the selling price?",options:["₹700","₹750","₹800","₹850"],answer:2,explanation:"Discount = 20% of ₹1,000 = ₹200. Selling price = ₹1,000 − ₹200 = ₹800."},
 {id:2,topic:"Arithmetic",q:"A number is increased by 20% and then decreased by 20%. What is the net change?",options:["No change","4% decrease","4% increase","2% decrease"],answer:1,explanation:"Assume 100. After a 20% increase it becomes 120. A 20% decrease gives 96. Net change = 4% decrease."},
 {id:3,topic:"Arithmetic",q:"The ratio of boys to girls in a class is 3:2. If there are 40 students, how many are girls?",options:["12","16","20","24"],answer:1,explanation:"Total parts = 3 + 2 = 5. Each part is 40 ÷ 5 = 8. Girls = 2 × 8 = 16."},
 {id:4,topic:"Arithmetic",q:"A shopkeeper buys an item for ₹500 and sells it for ₹600. What is the profit percentage?",options:["10%","15%","20%","25%"],answer:2,explanation:"Profit = ₹600 − ₹500 = ₹100. Profit percentage = (100 ÷ 500) × 100 = 20%."},
 {id:5,topic:"Arithmetic",q:"The average of five numbers is 18. If four numbers sum to 68, what is the fifth number?",options:["18","20","22","24"],answer:2,explanation:"Total sum = 5 × 18 = 90. Fifth number = 90 − 68 = 22."},
 {id:6,topic:"Algebra",q:"If 3x + 7 = 25, what is x?",options:["4","5","6","7"],answer:2,explanation:"3x + 7 = 25 ⇒ 3x = 18 ⇒ x = 6."},
 {id:7,topic:"Algebra",q:"If x + y = 10 and x − y = 4, what is x?",options:["3","5","7","9"],answer:2,explanation:"Add the equations: 2x = 14, so x = 7."},
 {id:8,topic:"Geometry",q:"What is the area of a triangle with base 10 cm and height 6 cm?",options:["16 cm²","30 cm²","60 cm²","36 cm²"],answer:1,explanation:"Area = ½ × base × height = ½ × 10 × 6 = 30 cm²."},
 {id:9,topic:"Geometry",q:"The sum of the interior angles of a quadrilateral is:",options:["180°","270°","360°","540°"],answer:2,explanation:"The interior angles of any simple quadrilateral add up to 360°."},
 {id:10,topic:"Number Systems",q:"What is the HCF of 24 and 36?",options:["6","8","12","18"],answer:2,explanation:"Factors common to both include 1, 2, 3, 4, 6 and 12. The highest is 12."},
 {id:11,topic:"Modern Math",q:"How many different ways can 3 distinct books be arranged on a shelf?",options:["3","6","9","12"],answer:1,explanation:"The number of arrangements is 3! = 3 × 2 × 1 = 6."},
 {id:12,topic:"Time & Work",q:"A can complete a job in 10 days. At the same rate, what fraction of the job does A complete in 2 days?",options:["1/2","1/5","1/10","1/20"],answer:1,explanation:"Daily work = 1/10. In 2 days, work completed = 2/10 = 1/5."}
];
const $ = id => document.getElementById(id);
let selectedTopic = "Arithmetic", setQuestions = [], current = 0, chosen = null, answered = false, seconds = 900, interval = null;
let stats = loadStats();
function loadStats(){try{return JSON.parse(localStorage.getItem("qc-stats"))||{attempted:0,correct:0,byTopic:{}}}catch{return {attempted:0,correct:0,byTopic:{}}}}
function saveStats(){localStorage.setItem("qc-stats",JSON.stringify(stats))}
function renderTopics(){
 $("topic-grid").innerHTML=topics.map(t=>`<button class="topic-card ${t.name===selectedTopic?"selected":""}" data-topic="${t.name}"><span class="topic-emoji" style="color:${t.color==="#e9f5ef"?"#176b54":"#6e6b9a"}">${t.icon}</span><strong>${t.name}</strong><small>${t.desc}</small></button>`).join("");
 document.querySelectorAll("[data-topic]").forEach(b=>b.addEventListener("click",()=>startTopic(b.dataset.topic)));
}
function startTopic(topic){
 selectedTopic=topic; setQuestions=questions.filter(q=>q.topic===topic);
 if(setQuestions.length<5){const rest=questions.filter(q=>q.topic!==topic);setQuestions=[...setQuestions,...rest].slice(0,5)}else setQuestions=setQuestions.slice(0,5);
 current=0;chosen=null;answered=false;seconds=900;clearInterval(interval);interval=setInterval(tick,1000);
 $("set-title").textContent=topic+" practice";$("set-subtitle").textContent="Solve the questions, then review the explanation.";renderTopics();renderQuestion();$("question-panel").scrollIntoView({behavior:"smooth",block:"start"});
}
function renderQuestion(){
 const q=setQuestions[current];if(!q){finishSet();return}
 chosen=null;answered=false;$("question-count").textContent=`QUESTION ${current+1} OF ${setQuestions.length}`;$("question-topic").textContent=q.topic.toUpperCase();$("question-text").textContent=q.q;$("set-progress").style.width=(current/setQuestions.length*100)+"%";$("feedback").className="feedback hidden";$("feedback").innerHTML="";
 $("options").innerHTML=q.options.map((o,i)=>`<button class="option" data-index="${i}"><span class="letter">${String.fromCharCode(65+i)}</span><span>${o}</span></button>`).join("");
 document.querySelectorAll("[data-index]").forEach(b=>b.addEventListener("click",()=>{if(answered)return;chosen=Number(b.dataset.index);document.querySelectorAll(".option").forEach(x=>x.classList.toggle("selected",Number(x.dataset.index)===chosen));$("check-btn").disabled=false;}));
 $("check-btn").disabled=true;$("check-btn").innerHTML='Check answer <span>→</span>';$("skip-btn").textContent="Skip for now";
}
function checkAnswer(){
 if(answered){current++;renderQuestion();return}
 if(chosen===null)return;const q=setQuestions[current];answered=true;stats.attempted++;stats.byTopic[q.topic]??={attempted:0,correct:0};stats.byTopic[q.topic].attempted++;
 const ok=chosen===q.answer;if(ok){stats.correct++;stats.byTopic[q.topic].correct++}saveStats();updateStats();
 document.querySelectorAll(".option").forEach((b,i)=>{b.disabled=true;if(i===q.answer)b.classList.add("correct");if(i===chosen&&!ok)b.classList.add("wrong")});
 $("feedback").className="feedback"+(ok?"":" incorrect");$("feedback").innerHTML=`<strong>${ok?"Correct — nice work!":"Not quite. Keep learning!"}</strong>${q.explanation}`;
 $("check-btn").innerHTML=current===setQuestions.length-1?'Finish set <span>→</span>':'Next question <span>→</span>';$("set-progress").style.width=((current+1)/setQuestions.length*100)+"%";
}
function skip(){if(answered){current++;renderQuestion();return}current++;renderQuestion()}
function finishSet(){clearInterval(interval);$("question-count").textContent="SET COMPLETE";$("question-topic").textContent="WELL DONE";$("question-text").textContent="Practice complete! Review your progress or choose another topic."; $("options").innerHTML=`<div class="feedback">You've finished this practice set. Keep going to build consistency.</div>`;$("feedback").className="feedback hidden";$("check-btn").disabled=true;$("check-btn").textContent="Choose another topic";$("check-btn").onclick=()=>{$("question-panel").scrollIntoView({behavior:"smooth"})};$("skip-btn").textContent="View progress";$("skip-btn").onclick=()=>showView("progress");$("set-progress").style.width="100%";}
function tick(){if(seconds>0){seconds--;const m=String(Math.floor(seconds/60)).padStart(2,"0"),s=String(seconds%60).padStart(2,"0");$("timer").textContent=m+":"+s}else{clearInterval(interval);$("timer").textContent="Time up"}}
function updateStats(){
 const accuracy=stats.attempted?Math.round(stats.correct/stats.attempted*100)+"%":"—";
 $("attempted-stat").textContent=stats.attempted;$("correct-stat").textContent=stats.correct;$("accuracy-stat").textContent=accuracy;
 $("progress-attempted").textContent=stats.attempted;$("progress-correct").textContent=stats.correct;$("progress-accuracy").textContent=accuracy;
 $("streak").textContent=stats.attempted?"You're building momentum":"Start your streak";
 $("topic-progress").innerHTML=topics.map(t=>{const s=stats.byTopic[t.name]||{attempted:0,correct:0},pct=s.attempted?Math.round(s.correct/s.attempted*100):0;return `<div class="topic-progress-row"><div class="topic-progress-head"><strong>${t.name}</strong><span>${s.correct}/${s.attempted} correct · ${s.attempted?pct+"% accuracy":"Not started"}</span></div><div class="topic-progress-track"><div style="width:${pct}%"></div></div></div>`}).join("");
}
function showView(view){const progress=view==="progress";$("practice-view").classList.toggle("hidden",progress);$("progress-view").classList.toggle("hidden",!progress);$("page-title").textContent=progress?"My progress":"Quant practice";document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));if(progress)updateStats();window.scrollTo({top:0,behavior:"smooth"})}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
$("check-btn").addEventListener("click",()=>{if(!$("check-btn").disabled){if(current>=setQuestions.length-1&&answered){finishSet();return}checkAnswer()}});
$("skip-btn").addEventListener("click",skip);
$("reset-btn").addEventListener("click",()=>{if(confirm("Reset all practice stats stored on this device?")){stats={attempted:0,correct:0,byTopic:{}};saveStats();updateStats()}});
renderTopics();updateStats();startTopic("Arithmetic");