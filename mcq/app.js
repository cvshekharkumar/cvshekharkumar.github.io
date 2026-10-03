const $=id=>document.getElementById(id),uid=()=>`Q-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
const starter=()=>({id:uid(),title:'Question',problemHtml:'<h2>Problem Statement</h2><p>Write a Python program that reads input and prints the required output.</p><p><b>Input Specification:</b><br>Read values using <code>input()</code>.</p><p><b>Output Specification:</b><br>Print only the required answer.</p>',code:'# Read input and write your solution here\nvalue = input().strip()\nprint(value)',tests:[{input:'hello',expected:'hello'},{input:'42',expected:'42'}],customFonts:[]});
let state={format:'python-assessment-set',version:2,setId:`SET-${Date.now().toString(36).toUpperCase()}`,title:'Python Assessment',timerMinutes:60,questions:[starter()]},current=0,history=[],remaining=3600,timerHandle;
const code=$('code'),problem=$('problem'),lines=$('lines');function q(){return state.questions[current]}function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}function toast(m){let t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(t.x);t.x=setTimeout(()=>t.classList.remove('show'),1700)}
function applyFonts(x){(x.customFonts||[]).forEach(f=>{if(!document.getElementById('font-'+f.id)){let s=document.createElement('style');s.id='font-'+f.id;s.textContent=`@font-face{font-family:${JSON.stringify(f.name)};src:url(${JSON.stringify(f.data)})}`;document.head.appendChild(s)}if(![...$('fontName').options].some(o=>o.value===f.name)){$('fontName').add(new Option(f.name,f.name))}})}function saveCurrent(){clearTimeout(debounce);let x=q();if(!x)return;if(problem)x.problemHtml=problem.innerHTML;if(code)x.code=code.value;save()}function save(){try{localStorage.setItem('assessment-rich-v3',JSON.stringify(state));const s=$('saveState');if(s)s.textContent='Saved just now';if(typeof candidateRunning!=='undefined'&&candidateRunning&&typeof readExamSession==='function'){const sess=readExamSession();if(sess?.started){writeExamSession({currentQuestion:current,updatedAt:Date.now()})}}}catch(e){console.error('Save failed:',e)}}
function load(){try{let s=JSON.parse(localStorage.getItem('assessment-rich-v3'));if(s?.questions?.length)state=s}catch(e){};$('setIdText').textContent=state.setId;$('timerMinutes').value=state.timerMinutes;openQuestion(0);setTimer(false)}function openQuestion(i){current=i;let x=q();if(!x.problemHtml&&x.problem)x.problemHtml=`<p>${esc(x.problem).replace(/\n/g,'<br>')}</p>`;x.customFonts=x.customFonts||[];applyFonts(x);problem.innerHTML=x.problemHtml||'';code.value=x.code||'';$('questionTitle').textContent=`Question ${i+1}`;$('questionId').textContent=x.id;updateLines();renderTests();renderSteps()}function renderSteps(){$('steps').innerHTML=state.questions.map((x,i)=>`<button class="${i===current?'active':''}" onclick="go(${i})">${i+1}</button>`).join('');$('prev').disabled=current===0;$('next').disabled=false;$('next').textContent=current>=state.questions.length-1?'Finish':'Next ›';if(current>=state.questions.length-1)$('next').classList.add('finish-btn');else $('next').classList.remove('finish-btn');}window.go=i=>{saveCurrent();openQuestion(i)};
$('addQuestion').onclick=()=>{saveCurrent();state.questions.push(starter());openQuestion(state.questions.length-1);save()};$('prev').onclick=()=>current&&go(current-1);$('next').onclick=()=>current<state.questions.length-1&&go(current+1);$('deleteQuestion').onclick=()=>{if(state.questions.length<2)return toast('At least one question is required');if(confirm('Delete this question?')){state.questions.splice(current,1);openQuestion(Math.min(current,state.questions.length-1));save()}};
const floatingNextButton=$('mobileFloatingNext');
if(floatingNextButton)floatingNextButton.onclick=e=>{
  if(e){e.preventDefault();e.stopPropagation();}
  const primaryNextButton=$('next');
  if(primaryNextButton&&!primaryNextButton.disabled)primaryNextButton.click();
};

function isWelcomeModalOpen() {
  const m = document.getElementById('welcomeModal');
  if (!m) return false;
  return m.classList.contains('show') && m.style.display !== 'none';
}

function isWaWidgetOpen() {
  const w = document.getElementById('waFloatingWidget');
  if (!w) return false;
  return w.style.display !== 'none';
}

function updateFloatingNextVisibility() {
  const button = document.getElementById('mobileFloatingNext');
  if (!button) return;
  const welcomeOpen = isWelcomeModalOpen();
  const waOpen = isWaWidgetOpen();
  if (welcomeOpen || waOpen) {
    button.classList.remove('show');
    button.style.display = 'none';
  } else {
    button.classList.add('show');
    button.style.display = 'inline-flex';
  }
}
window.updateFloatingNextVisibility = updateFloatingNextVisibility;

window.closeWelcomeModal = function() {
  const m = document.getElementById('welcomeModal');
  if (m) {
    m.classList.remove('show');
    m.style.display = 'none';
  }
  updateFloatingNextVisibility();
};

window.closeWaWidget = function() {
  const w = document.getElementById('waFloatingWidget');
  if (w) {
    w.style.display = 'none';
  }
  updateFloatingNextVisibility();
};

// Update the floating control whenever a question is opened. This runs before
// the optional candidate-mode modules, so ZIP imports reliably show Finish on
// the last question.
function syncFloatingNextButton(){
  const button=$('mobileFloatingNext');
  if(!button||!state?.questions?.length)return;
  const isLastQuestion=current>=state.questions.length-1;
  button.disabled=false;
  button.title=isLastQuestion?'Finish assessment':'Next question';
  button.setAttribute('aria-label',button.title);
  button.innerHTML=`<span>${isLastQuestion?'Finish':'Next'}</span><span class="mobile-next-arrow">${isLastQuestion?'✓':'➔'}</span>`;
  button.classList.toggle('finish-btn',isLastQuestion);
  updateFloatingNextVisibility();
}
const renderStepsBeforeFloatingNext=renderSteps;
renderSteps=function(){
  renderStepsBeforeFloatingNext();
  syncFloatingNextButton();
};
let debounce;problem.oninput=code.oninput=()=>{updateLines();clearTimeout(debounce);debounce=setTimeout(saveCurrent,400)};problem.addEventListener('paste',async e=>{let items=[...(e.clipboardData?.items||[])],media=items.find(x=>x.type.startsWith('image/')||x.type.startsWith('video/'));if(media){e.preventDefault();insertFile(media.getAsFile())}});function updateLines(){lines.textContent=Array.from({length:code.value.split('\n').length},(_,i)=>i+1).join('\n');lines.scrollTop=code.scrollTop}code.onscroll=()=>lines.scrollTop=code.scrollTop;code.onkeydown=e=>{if(e.key==='Tab'){e.preventDefault();code.setRangeText('    ',code.selectionStart,code.selectionEnd,'end');updateLines()}if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();runAll()}};
function keepFocus(){problem.focus()}document.querySelectorAll('[data-cmd]').forEach(b=>b.onclick=()=>{keepFocus();document.execCommand(b.dataset.cmd,false,null);saveCurrent()});$('styleFormat').onchange=e=>{keepFocus();document.execCommand('formatBlock',false,e.target.value);saveCurrent()};$('fontName').onchange=e=>{keepFocus();document.execCommand('fontName',false,e.target.value);saveCurrent()};$('fontSize').onchange=e=>{keepFocus();document.execCommand('fontSize',false,e.target.value);saveCurrent()};$('foreColor').oninput=e=>{keepFocus();document.execCommand('foreColor',false,e.target.value)};$('backColor').oninput=e=>{keepFocus();document.execCommand('hiliteColor',false,e.target.value)};$('clearFormat').onclick=()=>{keepFocus();document.execCommand('removeFormat');saveCurrent()};$('linkBtn').onclick=()=>{let u=prompt('Enter link URL:','https://');if(u){keepFocus();document.execCommand('createLink',false,u);saveCurrent()}};
function insertHtml(html){problem.focus();document.execCommand('insertHTML',false,html);saveCurrent()}function readData(file){return new Promise((res,rej)=>{let r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)})}async function insertFile(file){if(!file)return;if(file.size>25*1024*1024&&!confirm('This media file is larger than 25 MB and will make exports very large. Continue?'))return;let data=await readData(file),safe=esc(file.name);if(file.type.startsWith('image/'))insertHtml(`<figure><img src="${data}" alt="${safe}"><figcaption>${safe}</figcaption></figure>`);else if(file.type.startsWith('video/'))insertHtml(`<figure><video controls src="${data}"></video><figcaption>${safe}</figcaption></figure>`);else toast('Unsupported media file')}$('insertImage').onclick=()=>{$('mediaFile').accept='image/*,.gif';$('mediaFile').click()};$('insertVideo').onclick=()=>{$('mediaFile').accept='video/*';$('mediaFile').click()};$('mediaFile').onchange=e=>{insertFile(e.target.files[0]);e.target.value=''};$('insertFont').onclick=()=>$('fontFile').click();$('fontFile').onchange=async e=>{let f=e.target.files[0];if(!f)return;let name=prompt('Font display name:',f.name.replace(/\.[^.]+$/,''));if(!name)return;let obj={id:Date.now().toString(36),name,data:await readData(f),fileName:f.name};q().customFonts.push(obj);applyFonts(q());$('fontName').value=name;problem.focus();document.execCommand('fontName',false,name);saveCurrent();toast('Font embedded in this question');e.target.value=''};$('problemFullscreen').onclick = () => {
    const panel = $('problemPanel');
    panel.classList.toggle('full');

    const isFull = panel.classList.contains('full');

    $('problemFullscreen').textContent =
        isFull ? '✕ Exit Full Screen' : '⛶ Full Screen';

    document.body.classList.toggle('problem-fullscreen-active', isFull);

    if (isFull) {
        window.scrollTo(0, 0);
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const panel = $('problemPanel');
        if (panel.classList.contains('full')) {
            panel.classList.remove('full');
            document.body.classList.remove('problem-fullscreen-active');
            $('problemFullscreen').textContent = '⛶ Full Screen';
        }
    }
});$('codeFullscreen').onclick=()=>document.querySelector('.editor-card').classList.toggle('full');
function renderTests(){$('testCount').textContent=q().tests.length;$('testList').innerHTML=q().tests.map((t,i)=>`<div class="test-card"><div class="test-head"><b>Test Case ${i+1}</b><span><span id="badge${i}" class="badge">Not run</span><button class="delete" onclick="removeTest(${i})">✕</button></span></div><div class="test-grid"><div class="field"><label>INPUT</label><textarea oninput="setTest(${i},'input',this.value)">${esc(t.input)}</textarea></div><div class="field"><label>EXPECTED OUTPUT</label><textarea oninput="setTest(${i},'expected',this.value)">${esc(t.expected)}</textarea></div><div class="field actual"><label>ACTUAL OUTPUT</label><textarea id="actual${i}" readonly></textarea></div></div></div>`).join('')}window.setTest=(i,k,v)=>{q().tests[i][k]=v;save()};window.removeTest=i=>{q().tests.splice(i,1);renderTests();save()};$('addTest').onclick=()=>{q().tests.push({input:'',expected:''});renderTests();save()};async function execute(input){let r=await fetch('/api/run',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code:code.value,input})});return r.json()}function norm(s){return String(s).replace(/\r\n/g,'\n').trimEnd()}function busy(v){$('runTests').disabled=$('runCustom').disabled=v;$('runTests').textContent=v?'Running...':'Compile and Test'}
async function runAll(){saveCurrent();if(!q().tests.length)return toast('Add a test case');busy(true);document.querySelector('[data-tab=tests]').click();let pass=0;for(let i=0;i<q().tests.length;i++){let b=$('badge'+i);b.textContent='Running...';try{let d=await execute(q().tests[i].input),ok=d.ok&&norm(d.output)===norm(q().tests[i].expected);$('actual'+i).value=(d.output||'')+(d.error||'');b.textContent=ok?'Passed':'Failed';b.className='badge '+(ok?'pass':'fail');pass+=ok?1:0}catch(e){b.textContent='Runner error';b.className='badge fail'}}history.unshift({id:q().id,result:`${pass}/${q().tests.length} passed`,time:new Date().toLocaleTimeString()});renderHistory();busy(false);if(pass===q().tests.length)celebrate();else tryAgain(pass,q().tests.length)}async function runCustom(){busy(true);let input=$('customToggle').checked?(prompt('Enter custom input:','')||''):'';try{let d=await execute(input);showOutput((d.output||'')+(d.error?'\n'+d.error:''))}catch(e){showOutput('Cannot connect. Start server.py.')}busy(false)}function showOutput(t){document.querySelector('[data-tab=execution]').click();$('empty').hidden=true;$('console').hidden=false;$('console').textContent=t}function renderHistory(){$('historyList').innerHTML=history.map(h=>`<div class="history-row"><b>${esc(h.id)} · ${esc(h.result)}</b><span>${h.time}</span></div>`).join('')}$('runTests').onclick=runAll;$('runCustom').onclick=runCustom;
function overlay(text,wrong=false){let o=$('resultOverlay');o.className='result-overlay show'+(wrong?' wrong':'');$('resultCard').textContent=text;setTimeout(()=>o.className='result-overlay',2600)}function tryAgain(p,n){overlay(`Try again · ${p}/${n} passed`,true)}function celebrate(){overlay('🎉 Excellent! All test cases passed! 🎉');let c=$('confetti'),x=c.getContext('2d');c.width=innerWidth;c.height=innerHeight;let pieces=Array.from({length:150},()=>({x:Math.random()*c.width,y:-20-Math.random()*c.height*.5,v:2+Math.random()*5,r:3+Math.random()*6,a:Math.random()*6.28,col:['#ff4d6d','#ffd60a','#22c55e','#3b82f6','#a855f7'][Math.floor(Math.random()*5)]})),start=performance.now();(function draw(t){x.clearRect(0,0,c.width,c.height);pieces.forEach(p=>{p.y+=p.v;p.x+=Math.sin(p.a+=.08)*1.5;x.fillStyle=p.col;x.fillRect(p.x,p.y,p.r,p.r*1.7)});if(t-start<2400)requestAnimationFrame(draw)})(start)}
function download(blob,name){let a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000)}$('exportQuestion').onclick=()=>{saveCurrent();download(new Blob([JSON.stringify({format:'python-assessment-rich-question',version:2,question:q()},null,2)],{type:'application/json'}),`${q().id}.question.json`)};$('importQuestion').onclick=()=>$('questionFile').click();$('questionFile').onchange=async e=>{try{let d=JSON.parse(await e.target.files[0].text()),x=d.question||d;if(!x.id||!Array.isArray(x.tests))throw Error();saveCurrent();let i=state.questions.findIndex(v=>v.id===x.id);if(i>=0)state.questions[i]=x;else{state.questions.push(x);i=state.questions.length-1}openQuestion(i);save();toast('Question imported with embedded media and fonts')}catch(err){toast('Invalid question file')}e.target.value=''};$('exportSet').onclick=async()=>{saveCurrent();let r=await fetch('/api/export-set',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(state)});download(await r.blob(),`${state.setId}.zip`)};$('importSet').onclick=()=>$('setFile').click();$('setFile').onchange=async e=>{try{let arr=new Uint8Array(await e.target.files[0].arrayBuffer()),bin='';for(let b of arr)bin+=String.fromCharCode(b);let r=await fetch('/api/import-set',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({base64:btoa(bin)})}),d=await r.json();if(!d.ok)throw Error(d.error);state={...state,...d.manifest,questions:d.questions};$('setIdText').textContent=state.setId;$('timerMinutes').value=state.timerMinutes||60;openQuestion(0);setTimer(false);save();toast('Full set imported')}catch(err){toast(err.message||'Invalid ZIP')}e.target.value=''};
function setTimer(show=true){state.timerMinutes=Math.max(1,parseInt($('timerMinutes').value)||60);remaining=state.timerMinutes*60;clearInterval(timerHandle);tick();timerHandle=setInterval(()=>{remaining--;tick();if(remaining<=0){clearInterval(timerHandle);$('timeoutModal').classList.add('show')}},1000);save();if(show)toast('Timer set')}function tick(){let h=String(Math.floor(remaining/3600)).padStart(2,'0'),m=String(Math.floor(remaining%3600/60)).padStart(2,'0'),s=String(Math.max(0,remaining%60)).padStart(2,'0');$('timer').textContent=`${h}:${m}:${s}`}$('setTimer').onclick=()=>setTimer();document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button,.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.tab).classList.add('active')});$('fontUp').onclick=()=>font(1);$('fontDown').onclick=()=>font(-1);function font(d){let s=parseInt(getComputedStyle(code).fontSize)+d;code.style.fontSize=Math.max(11,Math.min(22,s))+'px';lines.style.fontSize=code.style.fontSize}function initThemeHandler(){const saved=localStorage.getItem('mcq_theme_mode');if(saved==='dark'){document.body.classList.add('dark')}const btn=$('theme');const syncText=()=>{if(btn){btn.textContent=document.body.classList.contains('dark')?'☀️ Light':'☾ Dark'}};syncText();const toggle=(e)=>{if(e&&e.type==='touchstart'){e.preventDefault()}document.body.classList.toggle('dark');const isDark=document.body.classList.contains('dark');localStorage.setItem('mcq_theme_mode',isDark?'dark':'light');syncText()};if(btn){btn.onclick=toggle;btn.addEventListener('touchstart',toggle,{passive:false})}}function isHeaderLinksLocked(){return !!state.headerLinksLocked}
function updateHeaderLinksLockUI(){const locked=isHeaderLinksLocked();const items=[{id:'helpGuideBtn',label:'Help Guide'},{id:'homeBtn',label:'Home'},{id:'appStoreBtn',label:'App store'}];items.forEach(({id,label})=>{const el=$(id);if(!el)return;el.classList.toggle('header-link-locked',locked);if(locked){el.textContent=`🔒 ${label}`;el.title=`${label} is locked with password (12345) for this exam`}else{el.textContent=label;el.title=id==='helpGuideBtn'?'View complete user guide':label}})}
async function lockHeaderLinksForExam(){state.headerLinksLocked=true;state.headerLinksLockHash=await pinHash('12345');updateHeaderLinksLockUI();save()}
function setupHeaderLinksLock(){const items=[{id:'helpGuideBtn',name:'Help Guide'},{id:'homeBtn',name:'Home'},{id:'appStoreBtn',name:'App store'}];items.forEach(({id,name})=>{const el=$(id);if(!el)return;el.addEventListener('click',async e=>{if(isHeaderLinksLocked()){e.preventDefault();e.stopPropagation();const entered=prompt(`"${name}" is locked for the exam.\nEnter password to access:`, '');if(entered===null)return;const expectedHash=state.headerLinksLockHash||(await pinHash('12345'));if(entered==='12345'||(await pinHash(entered))===expectedHash){state.headerLinksLocked=false;updateHeaderLinksLockUI();save();toast(`Password verified. Unlocked ${name}`);if(el.href)window.open(el.href,'_blank')}else{toast('Incorrect password. Access is locked.')}}})});updateHeaderLinksLockUI()}
function toggleAppFullscreen(){if(!document.fullscreenElement&&!document.webkitFullscreenElement&&!document.mozFullScreenElement&&!document.msFullscreenElement){const doc=document.documentElement,req=doc.requestFullscreen||doc.webkitRequestFullscreen||doc.mozRequestFullScreen||doc.msRequestFullscreen;if(req)req.call(doc).catch(err=>toast('Full screen request: '+(err?.message||'Not allowed')))}else{const ex=document.exitFullscreen||document.webkitExitFullscreen||document.mozCancelFullScreen||document.msExitFullscreen;if(ex)ex.call(document).catch(()=>{})}}
function syncAppFullscreenUI(){const isFull=!!(document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement),btn=$('appFullscreen');if(btn){btn.textContent=isFull?'✕ Exit Full Screen':'⛶ Full Screen';btn.title=isFull?'Exit full screen (fn+F11 / Esc)':'Toggle browser full screen (fn+F11)'}}
function setupAppFullscreen(){const btn=$('appFullscreen');if(btn)btn.onclick=toggleAppFullscreen;['fullscreenchange','webkitfullscreenchange','mozfullscreenchange','MSFullscreenChange'].forEach(ev=>document.addEventListener(ev,syncAppFullscreenUI));syncAppFullscreenUI()}
initThemeHandler();load();setupHeaderLinksLock();setupAppFullscreen();
/* v4: rich media selection/deletion, undo/redo, and sequential reports */
let selectedMedia=null;
problem.addEventListener('click',e=>{const m=e.target.closest('video,img,figure');if(selectedMedia)selectedMedia.classList.remove('selected-media');selectedMedia=m;if(m)m.classList.add('selected-media')});
problem.addEventListener('contextmenu',e=>{const m=e.target.closest('video,img,figure');if(!m)return;e.preventDefault();if(selectedMedia)selectedMedia.classList.remove('selected-media');selectedMedia=m;m.classList.add('selected-media');const menu=$('mediaContext');menu.style.left=Math.min(e.clientX,innerWidth-170)+'px';menu.style.top=Math.min(e.clientY,innerHeight-70)+'px';menu.classList.add('show')});
document.addEventListener('click',e=>{if(!e.target.closest('#mediaContext')&&!e.target.closest('#problem'))$('mediaContext').classList.remove('show')});
function removeSelectedMedia(){if(!selectedMedia)return;let target=selectedMedia.closest('figure')||selectedMedia;target.remove();selectedMedia=null;$('mediaContext').classList.remove('show');saveCurrent();toast('Media deleted')}
$('deleteMedia').onclick=removeSelectedMedia;
problem.addEventListener('keydown',e=>{if((e.key==='Delete'||e.key==='Backspace')&&selectedMedia){e.preventDefault();removeSelectedMedia()}});
$('problemUndo').onclick=()=>{problem.focus();document.execCommand('undo');saveCurrent()};
$('problemRedo').onclick=()=>{problem.focus();document.execCommand('redo');saveCurrent()};
function reportPayload(){saveCurrent();return {state,history};}
function safeName(n){return String(n||'assessment').replace(/[^a-z0-9._-]+/gi,'-')}
function exportDownload(endpoint,name){fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(reportPayload())}).then(async r=>{if(!r.ok)throw Error(await r.text());download(await r.blob(),name)}).catch(e=>toast('Export failed: '+e.message))}
$('exportHtml').onclick=()=>exportDownload('/api/export-html',safeName(state.setId)+'-report.html');
$('exportPdf').onclick=()=>exportDownload('/api/export-pdf',safeName(state.setId)+'-report.pdf');
$('exportWord').onclick=()=>exportDownload('/api/export-word',safeName(state.setId)+'-report.docx');

/* v5 stable question selector */
const questionPicker=$('questionPicker'),questionPalette=$('questionPalette');
questionPicker.onclick=e=>{e.stopPropagation();const open=questionPalette.classList.toggle('show');questionPicker.setAttribute('aria-expanded',String(open))};
questionPalette.onclick=e=>e.stopPropagation();
document.addEventListener('click',()=>{questionPalette.classList.remove('show');questionPicker.setAttribute('aria-expanded','false')});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){questionPalette.classList.remove('show');questionPicker.setAttribute('aria-expanded','false')}});
const originalRenderSteps=renderSteps;
renderSteps=function(){
  originalRenderSteps();
  $('currentQuestionLabel').textContent=`Question ${current+1} of ${state.questions.length}`;
  $('questionTotal').textContent=`${state.questions.length} question${state.questions.length===1?'':'s'}`;
  [...$('steps').querySelectorAll('button')].forEach((button,index)=>{button.textContent=index+1;button.title=`Open Question ${index+1} · ${state.questions[index].id}`;button.addEventListener('click',()=>{questionPalette.classList.remove('show');questionPicker.setAttribute('aria-expanded','false')})});
};
renderSteps();

/* v7 reliable run/test flow */
async function runCurrentMode(){
  if(!$('customToggle').checked){
    await runAll();
    return;
  }
  busy(true);
  try{
    const input=prompt('Enter custom input. Use line breaks for multiple values:','');
    if(input===null){busy(false);return;}
    const d=await execute(input);
    const text=(d.output||'')+(d.error?'\n'+d.error:'');
    showOutput(text.trim()?text:'Program completed successfully, but produced no output.');
  }catch(e){
    showOutput('Runner connection failed. Start the application with start.bat and try again.');
  }finally{busy(false)}
}
$('runCustom').onclick=runCurrentMode;
$('runCustom').textContent='Run';
// Harden the test runner so all failures remain visible and feedback always appears.
runAll=async function(){
  saveCurrent();
  if(!q().tests.length){toast('Add at least one test case');return;}
  busy(true);
  document.querySelector('[data-tab="tests"]').click();
  let pass=0;
  try{
    for(let i=0;i<q().tests.length;i++){
      const b=$('badge'+i), actual=$('actual'+i);
      b.className='badge'; b.textContent='Running...'; actual.value='Running...';
      try{
        const d=await execute(q().tests[i].input);
        const output=d.output||'';
        actual.value=output+(d.error?'\n'+d.error:'');
        const ok=!!d.ok&&norm(output)===norm(q().tests[i].expected);
        b.textContent=ok?'Passed':'Failed'; b.className='badge '+(ok?'pass':'fail');
        if(ok)pass++;
      }catch(e){
        actual.value='Runner connection failed. Start the application with start.bat.';
        b.textContent='Runner error'; b.className='badge fail';
      }
    }
    history.unshift({id:q().id,result:`${pass}/${q().tests.length} passed`,time:new Date().toLocaleTimeString()});
    renderHistory();
    if(pass===q().tests.length)celebrate(); else tryAgain(pass,q().tests.length);
  }finally{busy(false)}
};
$('runTests').onclick=runAll;

/* v8 teacher lock for problem statements */
async function pinHash(value){
  const bytes=new TextEncoder().encode(String(value));
  const hash=await crypto.subtle.digest('SHA-256',bytes);
  return [...new Uint8Array(hash)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
function isStatementLocked(){return !!(state.problemLocked || q()?.problemLocked)}
function applyStatementLock(){
  const x=q(); if(!x)return;
  const locked=isStatementLocked();
  problem.contentEditable=locked?'false':'true';
  problem.setAttribute('aria-readonly',String(locked));
  $('problemPanel').classList.toggle('statement-locked',locked);
  $('statementLockStatus').textContent=locked?'Problem statement locked':'Problem statement editable';
  $('statementLockStatus').classList.toggle('locked',locked);
  $('statementLock').textContent=locked?'🔒 Unlock Editing':'🔓 Lock Editing';
  $('formatbar').querySelectorAll('button,select,input').forEach(el=>el.disabled=locked);
  // Fullscreen remains available while reading a locked statement.
  $('problemFullscreen').disabled=false;
}
const openQuestionBeforeLock=openQuestion;
openQuestion=function(i){openQuestionBeforeLock(i);applyStatementLock()};
$('statementLock').onclick=async()=>{
  const curLocked=isStatementLocked();
  if(!curLocked){
    const first=prompt('Teacher: create a passcode to lock this problem statement. The same passcode is required to unlock after import:','');
    if(first===null)return;
    if(first.length<4){toast('Use a passcode with at least 4 characters');return;}
    const second=prompt('Confirm the passcode:','');
    if(second!==first){toast('Passcodes do not match');return;}
    saveCurrent();
    const hash=await pinHash(first);
    state.problemLocked=true;
    state.problemLockHash=hash;
    state.questions.forEach(item=>{item.problemLocked=true;item.problemLockHash=hash;});
    applyStatementLock();
    save();
    toast('Problem statement locked for sharing');
  }else{
    const entered=prompt('Enter the teacher passcode to unlock editing:','');
    if(entered===null)return;
    const expectedHash=state.problemLockHash||q()?.problemLockHash;
    if(await pinHash(entered)!==expectedHash){toast('Incorrect passcode. Problem statement remains locked.');return;}
    state.problemLocked=false;
    state.questions.forEach(item=>{item.problemLocked=false;});
    applyStatementLock();
    save();
    toast('Problem statement editing enabled');
  }
};
// Prevent rich-content mutation paths while locked.
problem.addEventListener('beforeinput',e=>{if(isStatementLocked())e.preventDefault()},true);
problem.addEventListener('paste',e=>{if(isStatementLocked()){e.preventDefault();toast('Problem statement is locked by the teacher')}},true);
problem.addEventListener('drop',e=>{if(isStatementLocked())e.preventDefault()},true);
problem.addEventListener('contextmenu',e=>{if(isStatementLocked()&&e.target.closest('video,img,figure'))e.preventDefault()},true);
const removeSelectedMediaBeforeLock=removeSelectedMedia;
removeSelectedMedia=function(){if(isStatementLocked()){toast('Unlock the problem statement before deleting media');return}return removeSelectedMediaBeforeLock()};
applyStatementLock();

/* v9 teacher-locked timer, ready gate, and automatic time-up exports */
let assessmentStarted=false, autoExportStarted=false;
function timerOwner(){return state}
function isTimerLocked(){return !!timerOwner().timerLocked}
function updateTimerLockUI(){
  const locked=isTimerLocked();
  document.body.classList.toggle('timer-locked',locked);
  $('timerMinutes').disabled=locked;
  $('setTimer').disabled=locked;
  $('timerLock').textContent=locked?'Unlock Timer':'Lock Timer';
  $('timerLock').classList.toggle('is-locked',locked);
  $('timerLock').title=locked?'Teacher passcode required to edit timer':'Lock timer before exporting';
}
async function lockTimer(){
  const owner=timerOwner();
  if(!owner.timerLocked){
    const minutes=Math.max(1,parseInt($('timerMinutes').value)||60);
    const first=prompt(`Teacher: lock the assessment timer at ${minutes} minute(s). Create a passcode:`, '');
    if(first===null)return;
    if(first.length<4){toast('Use a timer passcode with at least 4 characters');return;}
    const second=prompt('Confirm the timer passcode:', '');
    if(second!==first){toast('Passcodes do not match');return;}
    owner.timerMinutes=minutes; owner.timerLockHash=await pinHash(first); owner.timerLocked=true;
    assessmentStarted=false; clearInterval(timerHandle); remaining=minutes*60; tick();
    document.body.classList.add('timer-waiting'); updateTimerLockUI(); save(); toast('Timer locked for student sharing');
  }else{
    const entered=prompt('Enter the teacher timer passcode to unlock:', '');
    if(entered===null)return;
    if(await pinHash(entered)!==owner.timerLockHash){toast('Incorrect timer passcode');return;}
    owner.timerLocked=false; owner.timerLockHash=''; assessmentStarted=false; document.body.classList.remove('timer-waiting'); updateTimerLockUI(); save(); toast('Timer editing enabled');
  }
}
$('timerLock').onclick=lockTimer;
function showReadyGate(){
  if(!isTimerLocked()||assessmentStarted)return;
  clearInterval(timerHandle); remaining=(Number(state.timerMinutes)||60)*60; tick();
  document.body.classList.add('timer-waiting');
  $('readyText').textContent=`You have ${state.timerMinutes} minute(s). The timer starts only after you select Yes.`;
  $('readyModal').classList.add('show');
}
$('readyNo').onclick=()=>{$('readyModal').classList.remove('show');toast('Timer has not started')};
$('readyYes').onclick=()=>{$('readyModal').classList.remove('show');startLockedAssessment()};
function startLockedAssessment(){
  if(assessmentStarted)return;
  assessmentStarted=true; autoExportStarted=false; remaining=(Number(state.timerMinutes)||60)*60;
  document.body.classList.remove('timer-waiting','timer-finished'); clearInterval(timerHandle); tick();
  timerHandle=setInterval(()=>{remaining=Math.max(0,remaining-1);tick();if(remaining<=0){clearInterval(timerHandle);finishLockedAssessment()}},1000);
  toast('Assessment timer started');
}
async function automaticDownload(endpoint,name){
  const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(reportPayload())});
  if(!r.ok)throw Error(await r.text()); download(await r.blob(),name);
}
async function finishLockedAssessment(){
  if(autoExportStarted)return; autoExportStarted=true; assessmentStarted=false;
  document.body.classList.add('timer-finished'); $('timeoutModal').classList.add('show'); saveCurrent();
  const base=safeName(state.setId||'assessment');
  const results=[];
  try{await automaticDownload('/api/export-set',base+'-time-up.zip');results.push('ZIP')}catch(e){console.error(e)}
  try{await automaticDownload('/api/export-pdf',base+'-time-up.pdf');results.push('PDF')}catch(e){console.error(e)}
  toast(results.length?`Time is out. ${results.join(' and ')} exported.`:'Time is out. Browser blocked automatic downloads. Use Export Set ZIP and Export PDF.');
}
// Override normal timer-setting behavior: locked timers wait for student confirmation.
const setTimerBeforeTeacherLock=setTimer;
setTimer=function(show=true){
  if(isTimerLocked()){updateTimerLockUI();showReadyGate();return;}
  assessmentStarted=true; setTimerBeforeTeacherLock(show);
};
// Add timer configuration to single-question sharing and restore it on import.
$('exportQuestion').onclick=()=>{saveCurrent();const packet={format:'python-assessment-rich-question',version:3,timer:{minutes:state.timerMinutes,locked:!!state.timerLocked,lockHash:state.timerLockHash||''},question:q()};download(new Blob([JSON.stringify(packet,null,2)],{type:'application/json'}),`${q().id}.question.json`)};
$('questionFile').onchange=async e=>{try{const d=JSON.parse(await e.target.files[0].text()),x=d.question||d;if(!x.id||!Array.isArray(x.tests))throw Error();saveCurrent();let i=state.questions.findIndex(v=>v.id===x.id);if(i>=0)state.questions[i]=x;else{state.questions.push(x);i=state.questions.length-1}if(d.timer){state.timerMinutes=Number(d.timer.minutes)||60;state.timerLocked=!!d.timer.locked;state.timerLockHash=d.timer.lockHash||'';$('timerMinutes').value=state.timerMinutes}openQuestion(i);updateTimerLockUI();save();if(isTimerLocked())showReadyGate();toast('Question and timer settings imported')}catch(err){toast('Invalid question file')}e.target.value=''};
// Wrap full-set import so imported timer lock is enforced after the asynchronous handler completes.
$('setFile').addEventListener('change',()=>setTimeout(()=>{updateTimerLockUI();if(isTimerLocked())showReadyGate()},500));
updateTimerLockUI();
// The original startup begins a timer immediately. Stop it when an imported/saved teacher lock exists.
if(isTimerLocked())showReadyGate();

/* v10 imported candidate mode: first question, forward-only navigation, quiet failures */
let candidateSequentialMode=false;
function applyCandidateMode(){
  document.body.classList.toggle('candidate-sequential',candidateSequentialMode);
  if(candidateSequentialMode){
    $('prev').disabled=true;
    $('questionPicker').disabled=true;
    $('next').disabled=false;
    $('next').textContent=current>=state.questions.length-1?'Finish':'Next ›';
  }
}
const renderStepsBeforeCandidateMode=renderSteps;
renderSteps=function(){renderStepsBeforeCandidateMode();applyCandidateMode()};
function enterCandidateMode(){
  candidateSequentialMode=true;
  current=0;
  openQuestion(0);
  applyCandidateMode();
  lockHeaderLinksForExam();
  toast('Assessment opened at Question 1. Navigation is forward only.');
}
// Capture full-set import and switch to candidate mode after the imported state is applied.
$('setFile').addEventListener('change',()=>setTimeout(()=>{if(state.questions&&state.questions.length)enterCandidateMode()},700));
// A shared single question is also treated as candidate content, starting at its imported question.
$('questionFile').addEventListener('change',()=>setTimeout(()=>{candidateSequentialMode=true;applyCandidateMode()},500));
// Prevent any backward jump through the number-grid function while candidate mode is active.
const goBeforeCandidateMode=window.go;
window.go=i=>{
  if(candidateSequentialMode&&i<current){toast('Previous questions cannot be reopened in candidate mode');return}
  goBeforeCandidateMode(i);
};
$('prev').onclick=()=>{if(candidateSequentialMode){toast('Previous questions cannot be reopened in candidate mode');return}if(current)window.go(current-1)};
$('next').onclick=()=>{
  if(current<state.questions.length-1){
    window.go(current+1);
    applyCandidateMode();
  } else {
    if(candidateSequentialMode || candidateRunning || ($('finishAssessment') && !$('finishAssessment').hidden)){
      $('finishAssessment').click();
    } else {
      toast('You are on the final question');
    }
  }
};
// Replace test execution feedback: no failure popup and no pass-count celebration unless every test succeeds.
runAll=async function(){
  saveCurrent();
  if(!q().tests.length){toast('Add at least one test case');return;}
  busy(true);
  document.querySelector('[data-tab="tests"]').click();
  const summary=$('testSummary');
  summary.className='test-summary'; summary.textContent='Evaluating...';
  let pass=0;
  try{
    for(let i=0;i<q().tests.length;i++){
      const badge=$('badge'+i),actual=$('actual'+i);
      badge.className='badge'; badge.textContent='Evaluating'; actual.value='';
      try{
        const d=await execute(q().tests[i].input),output=d.output||'';
        actual.value=output+(d.error?'\n'+d.error:'');
        const ok=!!d.ok&&norm(output)===norm(q().tests[i].expected);
        // Do not reveal individual hidden-style pass/fail details to the candidate.
        badge.textContent='Checked'; badge.className='badge';
        if(ok)pass++;
      }catch(e){actual.value='Execution could not be completed.';badge.textContent='Checked';badge.className='badge'}
    }
    history.unshift({id:q().id,result:`${pass}/${q().tests.length} passed`,time:new Date().toLocaleTimeString()});
    renderHistory();
    if(pass===q().tests.length){
      summary.textContent='All test cases passed'; summary.className='test-summary success';
      celebrate();
    }else{
      summary.textContent=`${pass} of ${q().tests.length} test cases passed`;
      summary.className='test-summary partial';
      // Deliberately no Try Again overlay. Candidate remains in the code workspace.
    }
  }finally{busy(false)}
};
$('runTests').onclick=runAll;
$('runCustom').onclick=runCurrentMode;
applyCandidateMode();

/* v17 retained teacher controls, protected candidate start, and browser compiler */
const V17_DEFAULTS={python:'# Write Python 3 code here\nvalue = input().strip()\nprint(value)',c:'#include <stdio.h>\nint main(void){ char value[1024]; if(fgets(value,sizeof value,stdin)) printf("%s",value); return 0; }',cpp:'#include <iostream>\n#include <string>\nusing namespace std;\nint main(){ string value; getline(cin,value); cout << value; return 0; }'};
let packageProtected=false,candidateRunning=false,importInProgress=false;
function lang(){return q()?.language||state.language||'python'}function rid(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}
function setLanguageUI(){const l=lang();$('languageSelect').value=l;$('compilerStatus').textContent='Online compiler · '+l.toUpperCase()}
$('languageSelect').onchange=e=>{saveCurrent();const x=q(),old=x.language||'python',next=e.target.value;const isDefault=!x.code||x.code.trim()===''||Object.values(V17_DEFAULTS).map(v=>v.trim()).includes(x.code.trim())||x.code.trim()==='# Read input and write your solution here\nvalue = input().strip()\nprint(value)'.trim()||x.code.trim()===starter().code.trim();if(isDefault){x.code=V17_DEFAULTS[next];code.value=x.code;updateLines()}x.language=next;state.language=next;setLanguageUI();save()};
const open17=openQuestion;openQuestion=function(i){open17(i);setLanguageUI();applyTestFreeze();applyCustomFreeze();applyCandidateSecurity()};
$('codeFullscreen').onclick=()=>{const p=document.querySelector('.editor-card');p.classList.toggle('full');const f=p.classList.contains('full');document.body.classList.toggle('code-fullscreen-active',f);$('codeFullscreen').textContent=f?'✕ Exit Full Screen':'⛶ Full Screen'};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const p=document.querySelector('.editor-card');if(p.classList.contains('full')){$('codeFullscreen').click()}}});
function packetText(p){return typeof p==='string'?p:String(p?.output??p?.error??p?.stderr??p?.message??'')}
function stripNoise(v){return String(v||'').replace(/\x1b\[[0-?]*[ -\/]*[@-~]/g,'').replace(/\r\n?/g,'\n').split('\n').filter(line=>!/^\s*(>{3}|\$|\/tmp\/[\w.-]+\.(o|out|exe))\s*$/.test(line)).join('\n').replace(/^\s*[>$]\s?/gm,'').trim()}
function removeEcho(out,input){out=stripNoise(out);input=String(input||'').replace(/\r\n?/g,'\n').trim();if(!input)return out;const o=out.split('\n'),n=input.split('\n');if(n.every((x,i)=>(o[i]||'').trimEnd()===x.trimEnd())&&o.length>n.length)return o.slice(n.length).join('\n').trim();return out}
function remoteRun(language,source,stdin){return new Promise((resolve,reject)=>{if(typeof io!=='function')return reject(Error('Compiler connection library is unavailable.'));const sock=io(`https://repl-web.programiz.com/?sessionId=${rid()}&lang=${language}`,{transports:['websocket'],forceNew:true,reconnection:false});let raw='',done=false,settle,hard;const finish=()=>{if(done)return;done=true;clearTimeout(settle);clearTimeout(hard);sock.disconnect();const err=/error:|traceback|syntaxerror|runtimeerror|segmentation fault|invalid preprocessing directive|undefined reference/i.test(raw);resolve({ok:!err,output:err?'':removeEcho(raw,stdin),error:err?stripNoise(raw):''})};const fail=m=>{if(done)return;done=true;clearTimeout(settle);clearTimeout(hard);sock.disconnect();reject(Error(m))};sock.on('connect',()=>{sock.emit('run',{code:source});if(String(stdin)!==''){const lines=String(stdin).replace(/\r\n?/g,'\n').split('\n');setTimeout(()=>{lines.forEach((x,i)=>setTimeout(()=>sock.emit('evaluate',{code:x}),i*160))},500)}});sock.on('output',p=>{raw+=packetText(p);clearTimeout(settle);settle=setTimeout(finish,1200)});sock.on('error',p=>{raw+=packetText(p)||'Compiler error';clearTimeout(settle);settle=setTimeout(finish,700)});sock.on('connect_error',()=>fail('Unable to connect to compiler server.'));hard=setTimeout(()=>raw?finish():fail('Compiler server did not return output.'),18000)})}
execute=async input=>remoteRun(lang(),code.value,input);
function norm17(v){return String(v??'').replace(/\r\n?/g,'\n').split('\n').map(x=>x.replace(/[ \t]+$/,'')).join('\n').trim()}
runAll=async function(){saveCurrent();if(!q().tests.length)return toast('Add at least one test case');busy(true);document.querySelector('[data-tab=tests]').click();let pass=0;const summary=$('testSummary');summary.textContent='Checking 0 of '+q().tests.length;try{for(let i=0;i<q().tests.length;i++){const t=q().tests[i],b=$('badge'+i),a=$('actual'+i);b.textContent='Running';a.value='Executing...';try{const r=await remoteRun(lang(),code.value,t.input),ok=r.ok&&norm17(r.output)===norm17(t.expected);a.value=r.error||r.output||'[Program produced no output]';b.textContent=ok?'Passed':'Failed';b.className='badge '+(ok?'pass':'fail');if(ok)pass++}catch(e){a.value=e.message;b.textContent='Runner error';b.className='badge fail'}summary.textContent=`Checking ${i+1} of ${q().tests.length}`}history.unshift({id:q().id,result:`${pass}/${q().tests.length} passed`,time:new Date().toLocaleTimeString()});renderHistory();if(pass===q().tests.length){summary.textContent='All test cases passed';summary.className='test-summary success';celebrate()}else{summary.textContent=`${pass} of ${q().tests.length} test cases passed`;summary.className='test-summary partial'}}finally{busy(false)}};$('runTests').onclick=runAll;

/* teacher frozen tests */
function applyTestFreeze(){if(!$('testLock')||!q())return;$('testLock').textContent=q().testsLocked?'🔒 Unfreeze Test Cases':'🔓 Freeze Test Cases';renderTests17()}
function renderTests17(){if(!q())return;const locked=!!q().testsLocked||candidateRunning||!!state.customInputLocked;$('testCount').textContent=q().tests.length;$('testList').innerHTML=q().tests.map((t,i)=>{const frozen=locked&&!t.studentDefined;return `<div class="test-card ${frozen?'teacher-frozen':'student-extra'}"><div class="test-head"><b>Test Case ${i+1} <small>${frozen?'Teacher frozen':'Practice'}</small></b><span><span id="badge${i}" class="badge">Not run</span>${frozen?'':`<button class="delete" onclick="removeTest(${i})">✕</button>`}</span></div><div class="test-grid"><div class="field"><label>INPUT</label><textarea ${frozen?'disabled':''} oninput="setTest17(${i},'input',this.value)">${esc(t.input)}</textarea></div><div class="field"><label>EXPECTED OUTPUT</label><textarea ${frozen?'disabled':''} oninput="setTest17(${i},'expected',this.value)">${esc(t.expected)}</textarea></div><div class="field actual"><label>ACTUAL OUTPUT</label><textarea id="actual${i}" readonly></textarea></div></div></div>`}).join('')}
window.setTest17=(i,k,v)=>{if((q().testsLocked||candidateRunning||state.customInputLocked)&&!q().tests[i].studentDefined)return toast('Teacher test case is frozen');q().tests[i][k]=v;save()};window.removeTest=i=>{if((q().testsLocked||candidateRunning||state.customInputLocked)&&!q().tests[i].studentDefined)return;q().tests.splice(i,1);renderTests17();save()};
$('testLock').onclick=async()=>{const x=q();if(!x.testsLocked){const p=prompt('Create password to freeze teacher test cases:','');if(!p||p.length<4)return toast('Use at least 4 characters');if(prompt('Confirm password:','')!==p)return toast('Passwords do not match');x.tests.forEach(t=>t.studentDefined=false);x.testLockHash=await pinHash(p);x.testsLocked=true}else{const p=prompt('Enter frozen test-case password:','');if(p===null)return;if(await pinHash(p)!==x.testLockHash)return toast('Incorrect password');x.testsLocked=false}save();applyTestFreeze()};

/* custom input state freeze */
function applyCustomFreeze(){const locked=!!state.customInputLocked;$('customToggle').checked=!!state.customInputChecked;$('customToggle').disabled=locked;document.body.classList.toggle('custom-input-locked',locked);$('customInputLock').textContent=locked?'🔒 Unlock Custom Input':'🔓 Freeze Custom Input'}
$('customToggle').onchange=()=>{state.customInputChecked=$('customToggle').checked;save()};
$('customInputLock').onclick=async()=>{if(!state.customInputLocked){state.customInputChecked=$('customToggle').checked;const p=prompt(`Freeze Custom Input as ${state.customInputChecked?'checked':'not checked'}. Create password:`,'');if(!p||p.length<4)return toast('Use at least 4 characters');if(prompt('Confirm password:','')!==p)return toast('Passwords do not match');state.customInputLockHash=await pinHash(p);state.customInputLocked=true}else{const p=prompt('Enter Custom Input password:','');if(p===null)return;if(await pinHash(p)!==state.customInputLockHash)return toast('Incorrect password');state.customInputLocked=false}applyCustomFreeze();save()};
$('addTest').onclick=()=>{q().tests.push({input:'',expected:'',studentDefined:true});renderTests17();save()};

function applyCandidateSecurity(){document.body.classList.toggle('candidate-running',candidateRunning);$('deleteQuestion').disabled=packageProtected||candidateRunning;$('deleteQuestion').hidden=packageProtected||candidateRunning;if(candidateRunning){$('addQuestion').disabled=true;$('importQuestion').disabled=true;$('exportQuestion').disabled=true;if($('problem'))$('problem').contentEditable='false'}else if(!isStatementLocked()){if($('problem'))$('problem').contentEditable='true'}}
async function hashPack(p,s){return pinHash(s+'|'+p)}
async function buildAssessmentZip(security,fileName){saveCurrent();const zip=new JSZip();const manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),packageSecurity:security};zip.file('assessment.json',JSON.stringify(manifest,null,2));state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));zip.file('README.txt','Import this assessment ZIP using Browser Assessment IDE.');download(await zip.generateAsync({type:'blob',compression:'DEFLATE'}),fileName||`${state.setId}.zip`)}
$('exportSet').onclick=async()=>{saveCurrent();const use=confirm('Do you want to save password?\n\nOK = Save password\nCancel = Export without password');let sec={protected:false,deleteQuestionsAllowed:true};if(use){const p=prompt('Teacher: enter ZIP password (minimum 4 characters):','');if(!p||p.length<4)return toast('Use at least 4 characters');if(prompt('Confirm ZIP password:','')!==p)return toast('Passwords do not match');const salt=rid();sec={protected:true,salt,hash:await hashPack(p,salt),deleteQuestionsAllowed:false}}else if(!confirm('Export without password?'))return;await buildAssessmentZip(sec,`${state.setId}.zip`)};
$('setFile').onchange=async e=>{try{importInProgress=true;const zip=await JSZip.loadAsync(e.target.files[0]),manifest=JSON.parse(await zip.file('assessment.json').async('text')),sec=manifest.packageSecurity||{};if(sec.protected){const p=prompt('Enter password to open assessment ZIP:','');if(p===null)throw Error('Import cancelled');if(await hashPack(p,sec.salt)!==sec.hash)throw Error('Incorrect password')}const names=Object.keys(zip.files).filter(n=>/^questions\/.*\.json$/i.test(n)).sort(),questions=[];for(const n of names)questions.push(JSON.parse(await zip.file(n).async('text')));if(!questions.length)throw Error('No questions found');delete manifest.packageSecurity;state={...state,...manifest,questions};packageProtected=!!sec.protected;current=0;$('setIdText').textContent=state.setId;$('timerMinutes').value=state.timerMinutes||60;openQuestion(0);save();candidateSequentialMode=true;applyCandidateMode();applyCandidateSecurity();updateTimerLockUI();applyCustomFreeze();lockHeaderLinksForExam();if(isTimerLocked())showReadyGate();else{candidateRunning=true;applyCandidateSecurity()}toast('Assessment imported')}catch(err){toast(err.message||'Invalid ZIP')}finally{importInProgress=false;e.target.value=''}};

/* start gate: Not Yet terminates current attempt until page reload */
const blocker=document.createElement('div');blocker.className='assessment-blocker';document.body.appendChild(blocker);
$('readyNo').onclick=()=>{$('readyModal').classList.remove('show');blocker.classList.add('show');clearInterval(timerHandle);assessmentStarted=false};
$('readyYes').onclick=()=>{$('readyModal').classList.remove('show');candidateRunning=true;applyCandidateSecurity();startLockedAssessment()};

function reportHtml17(){saveCurrent();return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(state.title||'MCQ Assessment Report')}</title></head><body><h1>${esc(state.title||'MCQ Assessment Report')}</h1>${state.questions.map((x,i)=>{const opts=Array.isArray(x.options)?x.options:['Option 1','Option 2','Option 3','Option 4'];const stud=Array.isArray(x.studentAnswer)?x.studentAnswer:[];const corr=Array.isArray(x.correctOptions)?x.correctOptions:[];return `<article><h2>Question ${i+1}</h2><div>${x.problemHtml||''}</div><h3>Options</h3><ol>${opts.map(o=>`<li>${esc(o)}</li>`).join('')}</ol><p><b>Teacher answer:</b> ${stud.length?stud.map(n=>`${n+1}. ${esc(opts[n]||'')}`).join('; '):'Not answered'}</p><p><b>Your answer:</b> ${corr.length?corr.map(n=>`${n+1}. ${esc(opts[n]||'')}`).join('; '):'Not answered'}</p></article>`}).join('')}</body></html>`}
$('exportHtml').onclick=()=>download(new Blob([reportHtml17()],{type:'text/html'}),safeName(state.setId)+'-report.html');$('exportWord').onclick=()=>download(new Blob([reportHtml17()],{type:'application/msword'}),safeName(state.setId)+'-report.doc');$('exportPdf').onclick=()=>{const d=document.createElement('div');d.innerHTML=reportHtml17();html2pdf().set({filename:safeName(state.setId)+'-report.pdf'}).from(d).save()};
finishLockedAssessment=async function(){if(autoExportStarted)return;autoExportStarted=true;assessmentStarted=false;clearInterval(timerHandle);saveCurrent();await buildAssessmentZip({protected:false,deleteQuestionsAllowed:false},safeName(state.setId)+'-completed.zip');const d=document.createElement('div');d.innerHTML=reportHtml17();await html2pdf().set({filename:safeName(state.setId)+'-completed.pdf'}).from(d).save();$('timeoutModal').querySelector('h2').textContent='Time is out';$('timeoutModal').querySelector('p').textContent='Please share exported zip and pdf to the question provider to evaluate';$('timeoutModal').classList.add('show')};
setLanguageUI();applyTestFreeze();applyCustomFreeze();applyCandidateSecurity();

/* v18 refresh-safe timer, locked candidate toolbar, Finish Assessment, and session cleanup */
const EXAM_SESSION_KEY='browser-assessment-active-session-v18';
const EXAM_STATE_KEY='assessment-rich-v3';
function examCookieNames(){return document.cookie.split(';').map(x=>decodeURIComponent((x.split('=')[0]||'').trim())).filter(n=>n.startsWith('assessment_')||n.startsWith('browser_assessment_'))}
function clearExamCookies(){for(const name of examCookieNames()){document.cookie=`${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`}}
function readExamSession(){try{return JSON.parse(localStorage.getItem(EXAM_SESSION_KEY)||'null')}catch(e){return null}}
function writeExamSession(extra={}){const previous=readExamSession()||{};const session={...previous,...extra,setId:state.setId,active:true,packageProtected:!!packageProtected,candidateSequentialMode:true,customInputChecked:!!state.customInputChecked,updatedAt:Date.now()};localStorage.setItem(EXAM_SESSION_KEY,JSON.stringify(session));return session}
function clearExamSession(){clearInterval(timerHandle);localStorage.removeItem(EXAM_SESSION_KEY);localStorage.removeItem(EXAM_STATE_KEY);clearExamCookies();candidateRunning=false;packageProtected=false;assessmentStarted=false;autoExportStarted=false}
function setCandidateToolbarLocked(locked){
  const controls=['addQuestion','importQuestion','exportQuestion','exportJson','importJson','importSet','exportSet','exportHtml','exportPdf','exportWord'];
  controls.forEach(id=>{const el=$(id);if(el){el.disabled=locked;el.setAttribute('aria-disabled',String(locked))}});
  $('finishAssessment').hidden=!locked;
  document.body.classList.toggle('candidate-running',locked);
  $('deleteQuestion').hidden=locked;$('deleteQuestion').disabled=locked;
}
function startPersistentCountdown(deadline){
  assessmentStarted=true;candidateRunning=true;autoExportStarted=false;setCandidateToolbarLocked(true);applyCandidateSecurity();
  clearInterval(timerHandle);
  const update=()=>{remaining=Math.max(0,Math.ceil((deadline-Date.now())/1000));tick();if(remaining<=0){clearInterval(timerHandle);finishAssessmentV18('timeout')}};
  update();if(remaining>0)timerHandle=setInterval(update,1000);
}
function beginPersistentAssessment(){
  const duration=Math.max(1,Number(state.timerMinutes)||60);const deadline=Date.now()+duration*60000;
  writeExamSession({started:true,startTime:Date.now(),deadline,durationMinutes:duration});
  startPersistentCountdown(deadline);
}
function resumePersistentAssessment(session){
  packageProtected=!!session.packageProtected;candidateSequentialMode=true;candidateRunning=true;current=Math.max(0,Math.min(Number(session.currentQuestion)||0,state.questions.length-1));
  openQuestion(current);applyCandidateMode();applyCandidateSecurity();setCandidateToolbarLocked(true);applyCustomFreeze();updateTimerLockUI();
  if(session.deadline<=Date.now()){remaining=0;tick();finishAssessmentV18('timeout');return}
  startPersistentCountdown(session.deadline);toast('Assessment resumed from the saved timer');
}
const goV18=window.go;window.go=i=>{goV18(i);const s=readExamSession();if(s?.started)writeExamSession({currentQuestion:current})};
$('readyYes').onclick=()=>{$('readyModal').classList.remove('show');beginPersistentAssessment()};
$('readyNo').onclick=()=>{clearExamSession();$('readyModal').classList.remove('show');location.reload()};

async function completedZipBlobV18(){
  saveCurrent();const zip=new JSZip();
  const manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),completedAt:new Date().toISOString(),submission:true};
  zip.file('assessment.json',JSON.stringify(manifest,null,2));
  state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));
  zip.file('README.txt','Completed assessment submission. Share this ZIP and the exported PDF with the question provider.');
  return zip.generateAsync({type:'blob',compression:'DEFLATE'});
}
async function downloadCompletedPdfV18(base){
  const holder=document.createElement('div');holder.innerHTML=reportHtml17();
  await html2pdf().set({margin:8,filename:base+'-completed.pdf',html2canvas:{scale:1.5},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}}).from(holder).save();
}
async function finishAssessmentV18(reason){
  if(autoExportStarted)return;autoExportStarted=true;clearInterval(timerHandle);saveCurrent();
  const base=safeName(state.setId||'assessment');let zipStarted=false,pdfStarted=false;
  try{download(await completedZipBlobV18(),base+'-completed.zip');zipStarted=true}catch(e){console.error(e)}
  try{await downloadCompletedPdfV18(base);pdfStarted=true}catch(e){console.error(e)}
  clearExamSession();
  document.body.classList.add('submission-complete');
  const modal=$('timeoutModal');modal.querySelector('h2').textContent=reason==='timeout'?'Time is out':'Assessment finished';
  modal.querySelector('p').textContent='Please share exported zip and pdf to the question provider to evaluate';
  const button=modal.querySelector('button');button.textContent='Return to Import Screen';button.onclick=()=>location.reload();modal.classList.add('show');
  if(!zipStarted||!pdfStarted)toast('If a download was blocked, allow multiple downloads and use Finish Assessment again before closing this page.');
}
$('finishAssessment').onclick=()=>{if(confirm('Finish the assessment now and export the completed ZIP and PDF?'))finishAssessmentV18('manual')};
finishLockedAssessment=()=>finishAssessmentV18('timeout');

// Persist imported candidate package before the start gate is shown.
const setFileV18=$('setFile');setFileV18.addEventListener('change',()=>setTimeout(()=>{
  if(state?.questions?.length&&isTimerLocked())writeExamSession({started:false,deadline:null,currentQuestion:0,packageProtected:!!packageProtected});
},900));

// Resume only an assessment that was actually started. A clean/opened page remains in teacher/import mode.
(function restoreActiveExamV18(){
  const session=readExamSession();
  if(session?.active&&session.started&&state?.setId===session.setId&&state?.questions?.length){resumePersistentAssessment(session)}
  else{setCandidateToolbarLocked(false)}
})();

/* v19 candidate identity, consent-based camera evidence, full-screen gate, and submission package */
const EXAM_EVIDENCE_KEY='browser-assessment-evidence-v19';
let evidenceFrames=[],cameraStream=null,captureHandle=null,candidateMeta=null,finishV19Running=false;
function formatIstDateTime(d){if(!d)return '';const date=typeof d==='string'||typeof d==='number'?new Date(d):d;if(isNaN(date.getTime()))return String(d);return date.toLocaleString('en-IN',{timeZone:'Asia/Kolkata',hour12:true})+' IST'}
function formatIstDate(d){if(!d)return '';const date=typeof d==='string'||typeof d==='number'?new Date(d):d;if(isNaN(date.getTime()))return String(d);return date.toLocaleDateString('en-IN',{timeZone:'Asia/Kolkata'})}
function formatIstTime(d){if(!d)return '';const date=typeof d==='string'||typeof d==='number'?new Date(d):d;if(isNaN(date.getTime()))return String(d);return date.toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false})}
function examNowParts(){const d=new Date(),dateStr=d.toLocaleDateString('en-IN',{timeZone:'Asia/Kolkata'}),timeStr=d.toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}),[hour,minute]=timeStr.split(':');return {iso:d.toISOString(),date:dateStr,hour:hour||'00',minute:minute||'00',local:formatIstDateTime(d),ist:formatIstDateTime(d)}}
function updateQuestionCountV19(){const el=$('candidateQuestionCount');if(el)el.textContent=`Current/Total question : ${current+1}/${state.questions.length}`}
const renderStepsV19=renderSteps;renderSteps=function(){renderStepsV19();updateQuestionCountV19()};updateQuestionCountV19();
function ownerConfig(){return state.ownerConfig||{email:'',submissionMinutes:10}}
function applyOwnerConfig(){const c=ownerConfig();$('ownerEmail').value=c.email||'';$('submissionMinutes').value=c.submissionMinutes||10}
$('proctorSettings').onclick=()=>{applyOwnerConfig();$('ownerModal').classList.add('show')};
$('ownerCancel').onclick=()=>$('ownerModal').classList.remove('show');
$('ownerSave').onclick=()=>{const email=$('ownerEmail').value.trim(),minutes=Math.max(1,Number($('submissionMinutes').value)||10);if(email&&!/^\S+@\S+\.\S+$/.test(email))return toast('Enter a valid owner email');state.ownerConfig={email,submissionMinutes:minutes};save();$('ownerModal').classList.remove('show');toast('Exam owner setup saved in assessment package')};
function populateCandidateTime(){const n=examNowParts();$('candidateDate').value=n.date;$('candidateHour').value=n.hour;$('candidateMinute').value=n.minute}
async function openCandidateCamera(){try{cameraStream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:360},facingMode:'user'},audio:false});$('cameraPreview').srcObject=cameraStream;$('cameraStatus').textContent='Camera is open. Keep this preview visible while confirming.';updateCandidateStartState()}catch(e){$('cameraStatus').textContent='Camera permission was not granted. The assessment cannot start in evidence mode.';toast('Camera permission is required for this configured assessment')}}
$('openCamera').onclick=openCandidateCamera;
function updateCandidateStartState(){const ok=$('candidateName').value.trim()&&$('candidateRoll').value.trim()&&$('cameraConsent').checked&&cameraStream;$('candidateStart').disabled=!ok}
['candidateName','candidateRoll','cameraConsent'].forEach(id=>$(id).addEventListener('input',updateCandidateStartState));
function watermarkFrame(canvas,stamp){const x=canvas.getContext('2d');x.save();x.font='bold 14px Segoe UI';x.fillStyle='rgba(0,0,0,.60)';x.fillRect(0,canvas.height-34,canvas.width,34);x.fillStyle='#fff';x.fillText(stamp,10,canvas.height-12);x.font='bold 18px Segoe UI';x.fillStyle='rgba(34,197,94,.58)';for(let yy=24;yy<canvas.height-30;yy+=72)for(let xx=18;xx<canvas.width;xx+=110)x.fillText('✓',xx,yy);x.restore()}
function captureEvidenceFrame(){if(!cameraStream||!candidateRunning)return;const v=$('cameraPreview'),c=document.createElement('canvas');c.width=480;c.height=270;const x=c.getContext('2d');x.drawImage(v,0,0,c.width,c.height);const now=new Date(),stamp=now.toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})+' IST.'+String(now.getMilliseconds()).padStart(3,'0');watermarkFrame(c,stamp);c.toBlob(blob=>{if(blob)evidenceFrames.push({name:`evidence/${String(evidenceFrames.length+1).padStart(6,'0')}_${now.toISOString().replace(/[:.]/g,'-')}.png`,blob,stamp})},'image/png')}
function startEvidenceCapture(){clearInterval(captureHandle);captureEvidenceFrame();captureHandle=setInterval(captureEvidenceFrame,1000)}
function stopEvidenceCapture(){clearInterval(captureHandle);captureHandle=null;if(cameraStream){cameraStream.getTracks().forEach(t=>t.stop());cameraStream=null}}
async function requestExamFullscreen(){try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen()}catch(e){toast('Full screen was blocked. Use the browser full-screen control before continuing.')}}
function showCandidateGateV19(){populateCandidateTime();$('candidateName').value='';$('candidateRoll').value='';$('cameraConsent').checked=false;$('candidateStart').disabled=true;$('candidateModal').classList.add('show')}
async function startCandidateV19(){const n=examNowParts();candidateMeta={fullName:$('candidateName').value.trim(),rollNumber:$('candidateRoll').value.trim(),currentDate:n.date,currentHour:n.hour,currentMinute:n.minute,startTime:n.iso,ownerEmail:ownerConfig().email||'',submissionMinutes:ownerConfig().submissionMinutes||10};localStorage.setItem(EXAM_EVIDENCE_KEY,JSON.stringify(candidateMeta));$('candidateModal').classList.remove('show');await requestExamFullscreen();beginPersistentAssessment();startEvidenceCapture();alert(`After the exam, share the exported PDF and ZIP with the exam owner within ${candidateMeta.submissionMinutes} minute(s) at ${candidateMeta.ownerEmail||'the email provided by the owner'}. Do not press Esc or close the exam. Ending early will finish the attempt.`)}
$('candidateStart').onclick=startCandidateV19;
const readyYesV19=$('readyYes');readyYesV19.onclick=()=>{$('readyModal').classList.remove('show');showCandidateGateV19()};
function blockCandidateClipboard(e){if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')))return;if(candidateRunning){e.preventDefault();toast('Copy, cut, and paste are disabled during the assessment')}}
['copy','cut','paste'].forEach(type=>document.addEventListener(type,blockCandidateClipboard,true));
document.addEventListener('contextmenu',e=>{if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')))return;if(candidateRunning){e.preventDefault();toast('Right-click is disabled during the assessment')}},true);
function instructionTextV19(reason,end){const c=candidateMeta||{};const owner=ownerConfig();const due=new Date(end.getTime()+(Number(c.submissionMinutes||owner.submissionMinutes||10)*60000));const startDisp=formatIstDateTime(c.startTime)||c.startTime||'',endDisp=formatIstDateTime(end),dueDisp=formatIstDateTime(due);return `ASSESSMENT SUBMISSION INSTRUCTIONS\n\nCandidate Full Name: ${c.fullName||''}\nRoll Number: ${c.rollNumber||''}\nCurrent Date: ${c.currentDate||formatIstDate(c.startTime)}\nCurrent Hour: ${c.currentHour||''}\nCurrent Minute: ${c.currentMinute||''}\nExam Start (IST): ${startDisp}\nExam End (IST): ${endDisp}\nFinish Reason: ${reason}\nTotal Questions: ${state.questions.length}\nOwner Email: ${c.ownerEmail||owner.email||''}\nSubmission Window: ${c.submissionMinutes||owner.submissionMinutes||10} minute(s)\nSubmit By (IST): ${dueDisp}\n\nShare both the completed ZIP and PDF with the exam owner. Keep the original files unchanged. Camera images are assessment evidence for authorized review only. This application does not automatically determine cheating, identity, emotion, or gaze.`}
function reportHtmlV19(reason,end){const c=candidateMeta||{};const startDisp=formatIstDateTime(c.startTime)||esc(c.startTime||''),endDisp=formatIstDateTime(end),dateDisp=c.currentDate||formatIstDate(c.startTime)||formatIstDate(new Date()),timeDisp=c.currentHour&&c.currentMinute?(c.currentHour+':'+c.currentMinute+' IST'):formatIstTime(c.startTime)||formatIstTime(new Date());return `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;margin:24px;color:#102a43}h1{color:#073b88}.meta{border:1px solid #9fb3c8;padding:12px;background:#f4f7fb;border-radius:6px;margin-bottom:20px}article{border:1px solid #c7d7ea;border-radius:8px;padding:16px;margin:16px 0}ol{line-height:1.7;margin:8px 0;padding-left:24px}.shot{page-break-inside:avoid;margin:12px 0}.shot img{width:100%;max-width:700px}.stamp{font-size:11px}</style></head><body><h1>Assessment Submission Report</h1><div class="meta"><b>Full Name:</b> ${esc(c.fullName||'')}<br><b>Roll Number:</b> ${esc(c.rollNumber||'')}<br><b>Current Date:</b> ${esc(dateDisp)}<br><b>Current Time:</b> ${esc(timeDisp)}<br><b>Exam Start (IST):</b> ${esc(startDisp)}<br><b>Exam End (IST):</b> ${esc(endDisp)}<br><b>Finish Reason:</b> ${esc(reason)}<br><b>Total Questions:</b> ${state.questions.length}</div>${state.questions.map((x,i)=>{const opts=Array.isArray(x.options)?x.options:['Option 1','Option 2','Option 3','Option 4'];const stud=Array.isArray(x.studentAnswer)?x.studentAnswer:[];const corr=Array.isArray(x.correctOptions)?x.correctOptions:[];return `<article><h2>Question ${i+1}</h2><div>${x.problemHtml||''}</div><h3>Options</h3><ol>${opts.map(o=>`<li>${esc(o)}</li>`).join('')}</ol><p><b>Teacher answer:</b> ${stud.length?stud.map(n=>`${n+1}. ${esc(opts[n]||'')}`).join('; '):'Not answered'}</p><p><b>Your answer:</b> ${corr.length?corr.map(n=>`${n+1}. ${esc(opts[n]||'')}`).join('; '):'Not configured'}</p></article>`}).join('')}<h2>Camera Evidence</h2><div id="evidenceShots"></div></body></html>`}
function evidenceHtmlV20(end){const c=candidateMeta||{};return `<!doctype html><html><head><meta charset="utf-8"><title>Camera Evidence Report</title><style>body{font-family:Arial,sans-serif;margin:24px;color:#102a43}h1{color:#073b88}.meta{border:1px solid #9fb3c8;padding:12px;background:#f4f7fb;border-radius:6px;margin-bottom:20px}.shot{margin:20px 0;padding:15px;border:1px solid #bfd2eb;border-radius:8px;background:#fff;page-break-inside:avoid}.shot img{width:100%;max-width:640px;border-radius:5px;display:block;margin-bottom:10px}.stamp{font-size:12px;font-weight:bold;color:#607495}</style></head><body><h1>Camera Evidence Report</h1><div class="meta"><b>Full Name:</b> ${esc(c.fullName||'')}<br><b>Roll Number:</b> ${esc(c.rollNumber||'')}<br><b>Exam Start (IST):</b> ${esc(formatIstDateTime(c.startTime))}<br><b>Exam End (IST):</b> ${esc(formatIstDateTime(end))}</div><h2>Evidence Frames</h2><div id="evidenceShots">${evidenceFrames.map((f,i)=>`<div class="shot"><h3>Frame ${i+1}</h3><img src="${f.name}"><div class="stamp">${esc(f.stamp)}</div></div>`).join('')}</div></body></html>`}
async function pdfBlobV19(reason,end){const holder=document.createElement('div');holder.innerHTML=reportHtmlV19(reason,end);const shots=holder.querySelector('#evidenceShots');if(shots){shots.innerHTML='<p>Camera evidence screenshots are generated in HTML format inside the <b>camera-evidence.html</b> file in the completed ZIP.</p>'}return html2pdf().set({margin:8,html2canvas:{scale:1},jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}}).from(holder).output('blob')}
async function completedZipBlobV19(reason,end,pdfBlob,onProgress){saveCurrent();const zip=new JSZip(),manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),candidate:candidateMeta,completedAt:end.toISOString(),finishReason:reason,submission:true};zip.file('assessment.json',JSON.stringify(manifest,null,2));state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));for(const f of evidenceFrames)zip.file(f.name,f.blob);zip.file('camera-evidence.html',evidenceHtmlV20(end));zip.file('instruction.txt',instructionTextV19(reason,end)+'\nCamera Evidence: camera-evidence.html\n');zip.file('assessment-report.pdf',pdfBlob);return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:1}},metadata=>{if(onProgress)onProgress(Math.round(metadata.percent))})}
async function finishAssessmentV19(reason){if(finishV19Running)return;finishV19Running=true;autoExportStarted=true;clearInterval(timerHandle);captureEvidenceFrame();await new Promise(r=>setTimeout(r,250));stopEvidenceCapture();saveCurrent();const end=new Date(),base=safeName((candidateMeta?.rollNumber||state.setId||'assessment')+'-'+(candidateMeta?.fullName||'candidate'));let pdfBlob,zipBlob;const progressModal=document.createElement('div');progressModal.className='modal show';progressModal.style.zIndex='2147483647';progressModal.innerHTML=`<div class="setup-card" style="text-align:center;max-width:480px;padding:30px;"><h2 style="margin-top:0;color:var(--blue);">Creating Submission Package</h2><p style="margin:15px 0;font-weight:bold;line-height:1.5;color:var(--text);">Please wait for some minutes.<br>The process of ZIP and PDF creation is under progress...</p><div style="background:var(--soft);border-radius:10px;height:20px;width:100%;overflow:hidden;margin:20px 0;border:1px solid var(--line);"><div id="exportProgressBar" style="background:var(--blue);width:0%;height:100%;transition:width 0.1s ease;"></div></div><div id="exportProgressPercent" style="font-size:18px;font-weight:bold;color:var(--text);">0%</div></div>`;document.body.appendChild(progressModal);try{pdfBlob=await pdfBlobV19(reason,end);download(pdfBlob,base+'-completed.pdf');const evidenceHtml=evidenceHtmlV20(end);download(new Blob([evidenceHtml],{type:'text/html'}),base+'-camera-evidence.html');zipBlob=await completedZipBlobV19(reason,end,pdfBlob,percent=>{const bar=document.getElementById('exportProgressBar');const txt=document.getElementById('exportProgressPercent');if(bar)bar.style.width=percent+'%';if(txt)txt.textContent=percent+'%'});download(zipBlob,base+'-completed.zip');download(new Blob([instructionTextV19(reason,end)],{type:'text/plain'}),base+'-instruction.txt')}catch(e){console.error(e);toast('Export failed: '+e.message);finishV19Running=false;progressModal.remove();return}finally{progressModal.remove()}clearExamSession();localStorage.removeItem(EXAM_EVIDENCE_KEY);if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});document.body.classList.add('submission-complete');const m=$('timeoutModal');m.querySelector('h2').textContent=reason==='timeout'?'Time is out':reason==='escape'?'Assessment ended by Esc':'Assessment finished';m.querySelector('p').textContent=`Share the exported PDF and ZIP within ${candidateMeta?.submissionMinutes||ownerConfig().submissionMinutes||10} minute(s) to ${candidateMeta?.ownerEmail||ownerConfig().email||'the exam owner email'}.`;const b=m.querySelector('button');b.textContent='Return to Import Screen';b.onclick=()=>location.reload();m.classList.add('show')}
finishAssessmentV18=finishAssessmentV19;finishLockedAssessment=()=>finishAssessmentV19('timeout');$('finishAssessment').onclick=()=>{if(confirm('Finish now? This ends the attempt and exports the PDF, ZIP, and instruction file.'))finishAssessmentV19('manual')};
let escapeArmed=false;document.addEventListener('keydown',e=>{if(candidateRunning&&e.key==='Escape'&&!escapeArmed){escapeArmed=true;e.preventDefault();finishAssessmentV19('escape')}},true);
function autoSaveExamStateBeforeUnload(){try{if(typeof saveCurrent==='function')saveCurrent();if(typeof candidateRunning!=='undefined'&&candidateRunning&&typeof readExamSession==='function'){const sess=readExamSession();if(sess?.started){writeExamSession({currentQuestion:current,updatedAt:Date.now()})}}}catch(e){console.error('Autosave before refresh failed:',e)}}
window.addEventListener('beforeunload',e=>{autoSaveExamStateBeforeUnload();if(candidateRunning&&!finishV19Running){e.preventDefault();e.returnValue='Your active assessment is running. Your work is autosaved.'}});
window.addEventListener('pagehide',autoSaveExamStateBeforeUnload);
window.addEventListener('unload',autoSaveExamStateBeforeUnload);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')autoSaveExamStateBeforeUnload()});
document.addEventListener('keydown',e=>{if(e.key==='F5'||((e.ctrlKey||e.metaKey)&&(e.key==='r'||e.key==='R'))){autoSaveExamStateBeforeUnload()}},true);
const originalSetImportV19=$('setFile').onchange;$('setFile').onchange=async e=>{await originalSetImportV19.call($('setFile'),e);updateQuestionCountV19()};

/* v19.1 fix: require candidate details/camera for every imported assessment and preserve metadata */
function validCandidateMetaV191(){return !!(candidateMeta&&candidateMeta.fullName&&candidateMeta.rollNumber&&candidateMeta.startTime)}
function restoreCandidateMetaV191(){try{const x=JSON.parse(localStorage.getItem(EXAM_EVIDENCE_KEY)||'null');if(x&&x.fullName&&x.rollNumber)candidateMeta=x}catch(e){}}
restoreCandidateMetaV191();
async function waitForVideoV191(video){if(video.readyState>=2&&video.videoWidth)return;await new Promise((resolve,reject)=>{const done=()=>{cleanup();resolve()},fail=()=>{cleanup();reject(Error('Camera preview could not start'))},cleanup=()=>{video.removeEventListener('loadeddata',done);video.removeEventListener('error',fail)};video.addEventListener('loadeddata',done,{once:true});video.addEventListener('error',fail,{once:true});setTimeout(()=>{cleanup();video.videoWidth?resolve():reject(Error('Camera preview timed out'))},5000)})}
openCandidateCamera=async function(){try{if(cameraStream)cameraStream.getTracks().forEach(t=>t.stop());cameraStream=await navigator.mediaDevices.getUserMedia({video:{width:{ideal:640},height:{ideal:360},facingMode:'user'},audio:true});const v=$('cameraPreview');v.srcObject=cameraStream;await v.play();await waitForVideoV191(v);$('cameraStatus').textContent='Camera is ready. Evidence capture will start after Ready to Exam.';updateCandidateStartState()}catch(e){cameraStream=null;$('cameraStatus').textContent='Camera could not start: '+e.message;$('candidateStart').disabled=true;toast('Open the app from http://127.0.0.1 or HTTPS and allow camera permission')}};
$('openCamera').onclick=openCandidateCamera;
captureEvidenceFrame=function(){if(!cameraStream||!candidateRunning)return;const v=$('cameraPreview');if(v.readyState<2||!v.videoWidth||!v.videoHeight)return;const c=document.createElement('canvas');c.width=480;c.height=270;const x=c.getContext('2d');x.drawImage(v,0,0,c.width,c.height);const now=new Date(),stamp=now.toLocaleString()+'.'+String(now.getMilliseconds()).padStart(3,'0');watermarkFrame(c,stamp);c.toBlob(blob=>{if(blob)evidenceFrames.push({name:`evidence/${String(evidenceFrames.length+1).padStart(6,'0')}_${now.toISOString().replace(/[:.]/g,'-')}.png`,blob,stamp})},'image/png')};
const startCandidateBeforeV191=startCandidateV19;
startCandidateV19=async function(){if(!cameraStream||$('cameraPreview').readyState<2)return toast('Open the camera and wait until the preview is visible');await startCandidateBeforeV191()};
$('candidateStart').onclick=startCandidateV19;
// Every imported assessment, locked or unlocked, must pass through candidate verification.
$('setFile').addEventListener('change',()=>setTimeout(()=>{if(!state?.questions?.length)return;clearInterval(timerHandle);assessmentStarted=false;candidateRunning=false;autoExportStarted=false;setCandidateToolbarLocked(false);applyCandidateSecurity();showCandidateGateV19()},1300));
// Do not permit manual export/finish before identity and camera start are established.
$('finishAssessment').onclick=()=>{if(!validCandidateMetaV191()||!candidateRunning)return toast('Start the assessment with candidate details and camera before finishing');if(confirm('Finish now? This ends the attempt and exports the PDF, ZIP, and instruction file.'))finishAssessmentV19('manual')};
const finishAssessmentBeforeV191=finishAssessmentV19;
finishAssessmentV19=async function(reason){if(!validCandidateMetaV191()){finishV19Running=false;autoExportStarted=false;toast('Candidate details are missing. Return to the start screen and begin the assessment correctly.');return}return finishAssessmentBeforeV191(reason)};
finishAssessmentV18=finishAssessmentV19;finishLockedAssessment=()=>finishAssessmentV19('timeout');

/* v20 clear cookies, no forced fullscreen, keyboard-only code entry, and screen recording */
let screenStream=null,screenRecorder=null,screenChunks=[],screenRecordingBlob=null,screenRecordingStartedAt=null;
function clearAllAssessmentDataV20(){if(candidateRunning&&!confirm('An assessment is active. Clearing data will end it. Continue?'))return;try{stopEvidenceCapture()}catch(e){}try{stopScreenRecordingV20()}catch(e){}clearInterval(timerHandle);clearExamCookies();localStorage.removeItem(EXAM_SESSION_KEY);localStorage.removeItem(EXAM_STATE_KEY);localStorage.removeItem(EXAM_EVIDENCE_KEY);sessionStorage.clear();candidateMeta=null;evidenceFrames=[];state={format:'python-assessment-set',version:2,setId:`SET-${Date.now().toString(36).toUpperCase()}`,title:'Python Assessment',timerMinutes:60,questions:[starter()]};toast('Assessment cookies and local session data cleared');setTimeout(()=>location.reload(),400)}
$('clearExamData').onclick=clearAllAssessmentDataV20;
async function openScreenCaptureV20(){try{if(!navigator.mediaDevices?.getDisplayMedia)throw Error('Screen sharing is not supported by this browser');if(screenStream)screenStream.getTracks().forEach(t=>t.stop());screenStream=await navigator.mediaDevices.getDisplayMedia({video:{frameRate:{ideal:8,max:12}},audio:true});const v=$('screenPreview');v.srcObject=screenStream;await v.play();$('screenStatus').textContent='Screen sharing is ready. Select the exam screen or browser tab and keep sharing until submission.';screenStream.getVideoTracks()[0].addEventListener('ended',()=>{if(candidateRunning&&!finishV20Running){$('screenStatus').textContent='Screen sharing stopped. The assessment will be finished.';finishAssessmentV20('screen-share-stopped')}});updateCandidateStartStateV20()}catch(e){screenStream=null;$('screenStatus').textContent='Screen sharing could not start: '+e.message;$('candidateStart').disabled=true;toast('Screen sharing permission is required for this configured assessment')}}
$('openScreen').onclick=openScreenCaptureV20;
function updateCandidateStartStateV20(){const ok=$('candidateName').value.trim()&&$('candidateRoll').value.trim()&&$('cameraConsent').checked&&$('screenConsent').checked&&cameraStream&&screenStream&&$('cameraPreview').readyState>=2&&$('screenPreview').readyState>=2;$('candidateStart').disabled=!ok}
updateCandidateStartState=updateCandidateStartStateV20;
['candidateName','candidateRoll','cameraConsent','screenConsent'].forEach(id=>$(id).addEventListener('input',updateCandidateStartStateV20));
const openCameraBeforeV20=openCandidateCamera;openCandidateCamera=async function(){await openCameraBeforeV20();updateCandidateStartStateV20()};$('openCamera').onclick=openCandidateCamera;
function startScreenRecordingV20(){screenChunks=[];screenRecordingBlob=null;screenRecordingStartedAt=new Date();let mime='';for(const type of ['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm']){if(MediaRecorder.isTypeSupported(type)){mime=type;break}}const recordingTracks=[];if(screenStream){recordingTracks.push(...screenStream.getVideoTracks());recordingTracks.push(...screenStream.getAudioTracks())}if(cameraStream){recordingTracks.push(...cameraStream.getAudioTracks())}const recordingStream=new MediaStream(recordingTracks);screenRecorder=new MediaRecorder(recordingStream,mime?{mimeType:mime,videoBitsPerSecond:450000}:{videoBitsPerSecond:450000});screenRecorder.ondataavailable=e=>{if(e.data&&e.data.size)screenChunks.push(e.data)};screenRecorder.onstop=()=>{screenRecordingBlob=new Blob(screenChunks,{type:'video/mp4'})};screenRecorder.start(1000);$('screenStatus').textContent='Screen recording is active.'}
function stopScreenRecordingV20(){return new Promise(resolve=>{if(screenRecorder&&screenRecorder.state!=='inactive'){screenRecorder.addEventListener('stop',()=>resolve(),{once:true});screenRecorder.stop()}else resolve();if(screenStream){screenStream.getTracks().forEach(t=>t.stop());screenStream=null}})}
// Fullscreen is intentionally not requested after exam start.
requestExamFullscreen=async function(){};
const startCandidateBeforeV20=startCandidateV19;startCandidateV19=async function(){if(!screenStream||$('screenPreview').readyState<2)return toast('Share the exam screen and wait until the preview is visible');if(!$('screenConsent').checked)return toast('Screen-recording consent is required');await startCandidateBeforeV20();startScreenRecordingV20()};$('candidateStart').onclick=startCandidateV19;
// During an active exam, typing is allowed only in the code editor. Clipboard operations and context menus are blocked everywhere.
function blockExamInputV20(e){if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')))return;if(!candidateRunning)return;if(['copy','cut','paste','drop','dragstart'].includes(e.type)){e.preventDefault();e.stopImmediatePropagation();toast('Copy, paste, drag, and drop are disabled during the assessment');return}if(e.type==='beforeinput'&&e.target!==code){e.preventDefault();e.stopImmediatePropagation();return}if(e.type==='keydown'){const navigation=['Tab','Shift','Control','Alt','Meta','CapsLock','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown','Backspace','Delete','Enter'];const shortcut=e.ctrlKey||e.metaKey||e.altKey;if(e.target!==code&&!navigation.includes(e.key)){e.preventDefault();e.stopImmediatePropagation()}if(shortcut&&['v','V','c','C','x','X','a','A','s','S','p','P'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();toast('Keyboard shortcuts are disabled during the assessment')}}}
['copy','cut','paste','drop','dragstart','beforeinput','keydown'].forEach(t=>document.addEventListener(t,blockExamInputV20,true));
document.addEventListener('contextmenu',e=>{if(e.target&&e.target.closest&&(e.target.closest('.modal')||e.target.closest('.test-card.student-extra')))return;if(candidateRunning){e.preventDefault();e.stopImmediatePropagation();toast('Right-click is disabled during the assessment')}},true);
// Remove all exam termination behavior related to Escape or fullscreen changes.
escapeArmed=true;
let finishV20Running=false;
const originalReportHtmlV19=reportHtmlV19;
function reportHtmlV20(reason,end){const base=originalReportHtmlV19(reason,end);const startDisp=formatIstDateTime(screenRecordingStartedAt),endDisp=formatIstDateTime(end);return base.replace('<h2>Camera Evidence</h2><div id="evidenceShots"></div>','<h2>Camera Evidence</h2><div id="evidenceShots"></div><h2>Screen Recording</h2><p>The completed ZIP contains the screen recording in the screen-recording folder. Recording format: MP4. Start (IST): '+esc(startDisp)+'. End (IST): '+esc(endDisp)+'.</p>')}
reportHtmlV19=reportHtmlV20;
async function completedZipBlobV20(reason,end,pdfBlob,onProgress){saveCurrent();const zip=new JSZip(),manifest={...state,questions:undefined,questionIds:state.questions.map(x=>x.id),candidate:candidateMeta,completedAt:end.toISOString(),finishReason:reason,submission:true,screenRecording:{file:'screen-recording/exam-screen.mp4',startedAt:screenRecordingStartedAt?.toISOString()||'',endedAt:end.toISOString()}};zip.file('assessment.json',JSON.stringify(manifest,null,2));state.questions.forEach((x,i)=>zip.file(`questions/${String(i+1).padStart(3,'0')}-${x.id}.json`,JSON.stringify(x,null,2)));for(const f of evidenceFrames)zip.file(f.name,f.blob);zip.file('camera-evidence.html',evidenceHtmlV20(end));zip.file('instruction.txt',instructionTextV19(reason,end)+'\nScreen Recording: screen-recording/exam-screen.mp4\nCamera Evidence: camera-evidence.html\n');zip.file('assessment-report.pdf',pdfBlob);if(screenRecordingBlob?.size)zip.file('screen-recording/exam-screen.mp4',screenRecordingBlob);return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:1}},metadata=>{if(onProgress)onProgress(Math.round(metadata.percent))})}
completedZipBlobV19=completedZipBlobV20;
const finishBeforeV20=finishAssessmentV19;finishAssessmentV20=async function(reason){if(finishV20Running)return;finishV20Running=true;await stopScreenRecordingV20();finishV19Running=false;return finishBeforeV20(reason)};
finishAssessmentV19=finishAssessmentV20;finishAssessmentV18=finishAssessmentV20;finishLockedAssessment=()=>finishAssessmentV20('timeout');$('finishAssessment').onclick=()=>{if(!validCandidateMetaV191()||!candidateRunning)return toast('Start the assessment with candidate details, camera, and screen sharing before finishing');if(confirm('Finish now? This ends the attempt and exports the PDF, ZIP, instruction file, camera evidence, and screen recording.'))finishAssessmentV20('manual')};

/* v21 teacher full-assessment JSON import and export */
function fullAssessmentJsonPayloadV21(){
  saveCurrent();
  return {
    format:'browser-assessment-ide-full-json',
    version:21,
    exportedAt:new Date().toISOString(),
    assessment:state
  };
}
function validFullAssessmentV21(value){
  return value&&typeof value==='object'&&Array.isArray(value.questions)&&value.questions.length>0&&
    value.questions.every(x=>x&&typeof x==='object'&&typeof x.id==='string'&&Array.isArray(x.tests));
}
$('exportJson').onclick=()=>{
  try{
    const payload=fullAssessmentJsonPayloadV21();
    const name=safeName(state.setId||'assessment')+'-full.json';
    download(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),name);
    toast('Full assessment JSON exported');
  }catch(err){
    console.error(err);
    toast('JSON export failed: '+(err.message||'Unknown error'));
  }
};
function applyFullAssessmentJson(parsed, showToast = true){
  const imported=parsed.assessment||parsed.state||parsed;
  if(!validFullAssessmentV21(imported))throw Error('The file does not contain a valid full assessment');
  saveCurrent();
  state=imported;
  state.questions=state.questions.map(x=>({
    ...x,
    code:typeof x.code==='string'?x.code:'',
    problemHtml:typeof x.problemHtml==='string'?x.problemHtml:'',
    tests:Array.isArray(x.tests)?x.tests:[],
    customFonts:Array.isArray(x.customFonts)?x.customFonts:[]
  }));
  current=0;
  history=[];
  candidateSequentialMode=false;
  candidateRunning=false;
  packageProtected=false;
  assessmentStarted=false;
  autoExportStarted=false;
  clearInterval(timerHandle);
  $('setIdText').textContent=state.setId||'';
  $('timerMinutes').value=Number(state.timerMinutes)||60;
  openQuestion(0);
  updateTimerLockUI();
  applyCustomFreeze();
  applyCandidateSecurity();
  setCandidateToolbarLocked(false);
  applyCandidateMode();
  updateQuestionCountV19();
  save();
  if(showToast){
    toast('Full assessment JSON imported with all questions, media, code, and settings');
  }
}

const SAMPLE_MOCK_ASSESSMENT = {
  "format": "browser-assessment-ide-full-json",
  "version": 21,
  "exportedAt": "2026-09-27T15:45:40.022Z",
  "assessment": {
    "format": "mcq-assessment-set",
    "version": 22,
    "setId": "SET-MUJZBM5X",
    "title": "Python MCQ Assessment",
    "timerMinutes": 60,
    "questions": [
      {
        "id": "Q-MUJZBM5X-G9NQ",
        "title": "Question 1: Data Types & Mutability",
        "problemHtml": "<h2>Python Data Types &amp; Mutability</h2><p>Consider the following Python code snippet:</p><pre><code>a = [1, 2, 3]\nb = a\nb.append(4)\nprint(len(a))</code></pre><p>What is the output of the code?</p>",
        "code": "",
        "tests": [
          {
            "input": "2",
            "expected": "4"
          }
        ],
        "customFonts": [],
        "questionType": "single",
        "options": [
          "3",
          "4",
          "[1, 2, 3, 4]",
          "AttributeError"
        ],
        "correctOptions": [
          1
        ],
        "studentAnswer": [],
        "problemLocked": false,
        "problemLockHash": "",
        "optionsLocked": false,
        "optionsLockHash": "",
        "typeLocked": false,
        "typeLockHash": "",
        "deleteLocked": false,
        "deleteLockHash": ""
      },
      {
        "id": "Q-MUJZKBJL-WAYK",
        "title": "Question 2: String Slicing",
        "problemHtml": "<h2>String Slicing</h2><p>What will be the output of the following Python code?</p><pre><code>text = \"PythonProgramming\"\nprint(text[2:8:2])</code></pre>",
        "code": "",
        "tests": [
          {
            "input": "2",
            "expected": "toP"
          }
        ],
        "customFonts": [],
        "questionType": "single",
        "options": [
          "tho",
          "toP",
          "tonP",
          "to"
        ],
        "correctOptions": [
          1
        ],
        "studentAnswer": [],
        "problemLocked": false,
        "problemLockHash": "",
        "optionsLocked": false,
        "optionsLockHash": "",
        "typeLocked": false,
        "typeLockHash": "",
        "deleteLocked": false,
        "deleteLockHash": ""
      },
      {
        "id": "Q-MUJZKCZT-SCRB",
        "title": "Question 3: List Comprehension",
        "problemHtml": "<h2>List Comprehension</h2><p>What is the output of the following list comprehension in Python?</p><pre><code>numbers = [1, 2, 3, 4, 5, 6]\nresult = [x * 2 for x in numbers if x % 2 == 0]\nprint(result)</code></pre>",
        "code": "",
        "tests": [
          {
            "input": "3",
            "expected": "[4, 8, 12]"
          }
        ],
        "customFonts": [],
        "questionType": "single",
        "options": [
          "[2, 4, 6]",
          "[2, 4, 6, 8, 10, 12]",
          "[4, 8, 12]",
          "[1, 4, 9]"
        ],
        "correctOptions": [
          2
        ],
        "studentAnswer": [],
        "problemLocked": false,
        "problemLockHash": "",
        "optionsLocked": false,
        "optionsLockHash": "",
        "typeLocked": false,
        "typeLockHash": "",
        "deleteLocked": false,
        "deleteLockHash": ""
      },
      {
        "id": "Q-MUJZKD4X-QERX",
        "title": "Question 4: Dictionary Lookup",
        "problemHtml": "<h2>Dictionary Operations</h2><p>What will be printed by the following code?</p><pre><code>data = {\"a\": 1, \"b\": 2}\nprint(data.get(\"c\", 0) + data.get(\"a\", 0))</code></pre>",
        "code": "",
        "tests": [
          {
            "input": "3",
            "expected": "1"
          }
        ],
        "customFonts": [],
        "questionType": "single",
        "options": [
          "KeyError",
          "0",
          "1",
          "None"
        ],
        "correctOptions": [
          2
        ],
        "studentAnswer": [],
        "problemLocked": false,
        "problemLockHash": "",
        "optionsLocked": false,
        "optionsLockHash": "",
        "typeLocked": false,
        "typeLockHash": "",
        "deleteLocked": false,
        "deleteLockHash": ""
      },
      {
        "id": "Q-MUJZKDAP-86DA",
        "title": "Question 5: Mutable Default Arguments",
        "problemHtml": "<h2>Mutable Default Arguments</h2><p>Consider the following function definition and calls:</p><pre><code>def add_item(item, item_list=[]):\n    item_list.append(item)\n    return item_list\n\nadd_item(1)\nprint(add_item(2))</code></pre><p>What is the output?</p>",
        "code": "",
        "tests": [
          {
            "input": "2",
            "expected": "[1, 2]"
          }
        ],
        "customFonts": [],
        "questionType": "single",
        "options": [
          "[2]",
          "[1, 2]",
          "[[1], [2]]",
          "[1]"
        ],
        "correctOptions": [
          1
        ],
        "studentAnswer": [],
        "problemLocked": false,
        "problemLockHash": "",
        "optionsLocked": false,
        "optionsLockHash": "",
        "typeLocked": false,
        "typeLockHash": "",
        "deleteLocked": false,
        "deleteLockHash": ""
      },
      {
        "id": "Q-MUJZKDG1-QVBP",
        "title": "Question 6: Variable Arguments (*args)",
        "problemHtml": "<h2>Function Arguments (*args)</h2><p>What is the output of the following code?</p><pre><code>def calculate(*args):\n    return sum(args) // len(args)\n\nprint(calculate(10, 20, 30, 40))</code></pre>",
        "code": "",
        "tests": [
          {
            "input": "1",
            "expected": "25"
          }
        ],
        "customFonts": [],
        "questionType": "single",
        "options": [
          "25",
          "25.0",
          "100",
          "TypeError"
        ],
        "correctOptions": [
          0
        ],
        "studentAnswer": [],
        "problemLocked": false,
        "problemLockHash": "",
        "optionsLocked": false,
        "optionsLockHash": "",
        "typeLocked": false,
        "typeLockHash": "",
        "deleteLocked": false,
        "deleteLockHash": ""
      },
      {
        "id": "Q-MUJZKDLL-36GP",
        "title": "Question 7: Exception Handling Flow",
        "problemHtml": "<h2>Exception Handling Flow</h2><p>What will the following code print?</p><pre><code>def check_flow():\n    try:\n        return 10\n    finally:\n        return 20\n\nprint(check_flow())</code></pre>",
        "code": "",
        "tests": [
          {
            "input": "2",
            "expected": "20"
          }
        ],
        "customFonts": [],
        "questionType": "single",
        "options": [
          "10",
          "20",
          "30",
          "None"
        ],
        "correctOptions": [
          1
        ],
        "studentAnswer": [],
        "problemLocked": false,
        "problemLockHash": "",
        "optionsLocked": false,
        "optionsLockHash": "",
        "typeLocked": false,
        "typeLockHash": "",
        "deleteLocked": false,
        "deleteLockHash": ""
      }
    ]
  }
};

async function loadMockTestData(){
  const m=document.getElementById('welcomeModal');
  if(m){
    m.classList.remove('show');
    m.style.display='none';
  }
  if(typeof window.closeWelcomeModal==='function') window.closeWelcomeModal();
  try{
    let sampleData=null;
    try{
      const res=await fetch('SET-MUJZBM5X-full.json');
      if(res.ok){
        sampleData=await res.json();
      }
    }catch(fetchErr){
      // local protocol fetch fallback
    }
    if(!sampleData && typeof SAMPLE_MOCK_ASSESSMENT!=='undefined'){
      sampleData=SAMPLE_MOCK_ASSESSMENT;
    }
    if(!sampleData){
      throw Error('Sample assessment file could not be loaded');
    }
    applyFullAssessmentJson(sampleData, false);
  }catch(err){
    console.error(err);
    toast('Mock test data import failed: '+(err.message||'Unknown error'));
  }
}

$('importJson').onclick=()=>$('jsonFile').click();
if($('tryMockDataBtn')) $('tryMockDataBtn').onclick=()=>loadMockTestData();
$('jsonFile').onchange=async e=>{
  const file=e.target.files&&e.target.files[0];
  if(!file)return;
  try{
    const parsed=JSON.parse(await file.text());
    applyFullAssessmentJson(parsed);
  }catch(err){
    console.error(err);
    toast('JSON import failed: '+(err.message||'Invalid JSON file'));
  }finally{
    e.target.value='';
  }
};

/* v22 MCQ assessment mode: teacher authoring, protected candidate import, hidden answer keys */
(function(){
  const MCQ_VERSION=22;
  let v22CandidateMode=false;

  function isOptionsLocked(){ return !!(state.optionsLocked || q()?.optionsLocked); }
  function isTypeLocked(){ return !!(state.typeLocked || q()?.typeLocked); }
  function isDeleteLocked(){ return !!(state.deleteLocked || q()?.deleteLocked); }
  function isClearLocked(){ return !!(state.clearLocked || q()?.clearLocked); }
  function isAddQuestionLocked(){ return !!(state.addQuestionLocked || q()?.addQuestionLocked); }

  function ensureMcq(question){
    if(!question)return;
    question.questionType=question.questionType==='multiple'?'multiple':'single';
    if(!Array.isArray(question.options)||question.options.length<2){
      question.options=['Option 1','Option 2','Option 3','Option 4'];
    }
    question.correctOptions=Array.isArray(question.correctOptions)?question.correctOptions.map(Number).filter(n=>n>=0&&n<question.options.length):[];
    question.studentAnswer=Array.isArray(question.studentAnswer)?question.studentAnswer.map(Number).filter(n=>n>=0&&n<question.options.length):[];
    question.tests=question.correctOptions.map(n=>({input:String(n+1),expected:String(question.options[n]||'')}));
    question.code='';
    if(state.problemLocked!==undefined){
      question.problemLocked=!!state.problemLocked;
      question.problemLockHash=state.problemLockHash||question.problemLockHash||'';
    }else{
      question.problemLocked=!!question.problemLocked;
      question.problemLockHash=question.problemLockHash||'';
    }
    if(state.optionsLocked!==undefined){
      question.optionsLocked=!!state.optionsLocked;
      question.optionsLockHash=state.optionsLockHash||question.optionsLockHash||'';
    }else{
      question.optionsLocked=!!question.optionsLocked;
      question.optionsLockHash=question.optionsLockHash||'';
    }
    if(state.typeLocked!==undefined){
      question.typeLocked=!!state.typeLocked;
      question.typeLockHash=state.typeLockHash||question.typeLockHash||'';
    }else{
      question.typeLocked=!!question.typeLocked;
      question.typeLockHash=question.typeLockHash||'';
    }
    if(state.deleteLocked!==undefined){
      question.deleteLocked=!!state.deleteLocked;
      question.deleteLockHash=state.deleteLockHash||question.deleteLockHash||'';
    }else{
      question.deleteLocked=!!question.deleteLocked;
      question.deleteLockHash=question.deleteLockHash||'';
    }
    if(state.clearLocked!==undefined){
      question.clearLocked=!!state.clearLocked;
      question.clearLockHash=state.clearLockHash||question.clearLockHash||'';
    }else{
      question.clearLocked=!!question.clearLocked;
      question.clearLockHash=question.clearLockHash||'';
    }
    if(state.addQuestionLocked!==undefined){
      question.addQuestionLocked=!!state.addQuestionLocked;
      question.addQuestionLockHash=state.addQuestionLockHash||question.addQuestionLockHash||'';
    }else{
      question.addQuestionLocked=!!question.addQuestionLocked;
      question.addQuestionLockHash=question.addQuestionLockHash||'';
    }
  }
  state.format='mcq-assessment-set'; state.version=MCQ_VERSION; state.title=state.title==='Python Assessment'?'MCQ Assessment':state.title;
  state.questions.forEach(ensureMcq);

  const editorCard=document.querySelector('.editor-card');
  editorCard.innerHTML=`
    <div class="editor-top mcq-editor-top">
      <span><b id="mcqSectionTitle">Answer options</b> <small id="mcqModeHint">Teacher authoring</small></span>
      <div><button id="optionsLock" title="Lock or unlock answer options">🔓 Lock Editing</button><button id="addOption">+ Add Option</button></div>
    </div>
    <div id="mcqOptions" class="mcq-options"></div>`;

  const runbar=document.querySelector('.runbar');
  runbar.innerHTML=`<div class="mcq-type-control"><label>Question type <select id="mcqType"><option value="single">Single choice</option><option value="multiple">Multiple choice</option></select></label><button id="typeLock" title="Lock or unlock question type">🔓 Lock Editing</button></div><div><button id="finishAssessment" class="danger" hidden>Finish Assessment</button><button id="deleteLock" title="Lock or unlock question deletion">🔓 Lock Editing</button><button id="deleteQuestion" class="danger">Delete</button></div>`;

  document.querySelector('.tabs').innerHTML=`<button data-tab="tests" class="active">Correct Answer</button><button data-tab="history">History</button>`;
  document.body.insertAdjacentHTML('beforeend',`<div id="mcqLegacy" hidden><select id="languageSelect"><option value="python">Python 3</option><option value="c">C</option><option value="cpp">C++</option></select><span id="compilerStatus"></span><button id="codeFullscreen"></button><div id="lines"></div><textarea id="code"></textarea><input id="customToggle" type="checkbox"><button id="customInputLock"></button><button id="runCustom"></button><button id="runTests"></button><button id="testLock"></button><button id="addTest"></button><span id="testCount"></span><span id="testSummary"></span><div id="testList"></div></div>`);
  $('tests').innerHTML=`<div class="test-title"><b>Correct answer key</b><span class="answer-help">Select option number(s). The option text is saved automatically.</span><div style="display:flex;gap:6px;align-items:center;"><button id="clearLock" title="Lock or unlock clear key">🔓 Lock Editing</button><button id="clearCorrect" class="clear-correct-btn" type="button" title="Clear correct answer key">🗑️ Clear Key</button></div></div><div id="answerKey"></div>`;
  $('execution').remove();

  function clearCorrect(){
    const x=q();
    if(!x)return;
    if(isClearLocked())return toast('Clear key is locked by the teacher');
    if(!x.correctOptions||!x.correctOptions.length)return toast('No correct answer is currently selected');
    x.correctOptions=[];
    ensureMcq(x);
    renderAnswerKey();
    renderOptions();
    save();
    toast('Correct answer key cleared');
  }
  function optionText(index,value){
    const x=q(); if(isOptionsLocked())return; x.options[index]=value; ensureMcq(x); renderAnswerKey(); save();
  }
  function removeOption(index){
    const x=q(); if(isOptionsLocked())return toast('Answer options are locked by the teacher');
    if(x.options.length<=2)return toast('At least two options are required');
    x.options.splice(index,1);
    x.correctOptions=x.correctOptions.filter(n=>n!==index).map(n=>n>index?n-1:n);
    x.studentAnswer=x.studentAnswer.filter(n=>n!==index).map(n=>n>index?n-1:n);
    ensureMcq(x); renderMcq(); save();
  }
  function selectStudent(index){
    const x=q();
    if(x.questionType==='multiple') x.studentAnswer=x.studentAnswer.includes(index)?x.studentAnswer.filter(n=>n!==index):[...x.studentAnswer,index].sort((a,b)=>a-b);
    else x.studentAnswer=[index];
    renderOptions(); saveCurrent();
  }
  function toggleCorrect(index){
    const x=q();
    if(x.questionType==='multiple') x.correctOptions=x.correctOptions.includes(index)?x.correctOptions.filter(n=>n!==index):[...x.correctOptions,index].sort((a,b)=>a-b);
    else x.correctOptions=[index];
    ensureMcq(x); renderAnswerKey(); renderOptions(); save();
  }
  function renderOptions(){
    const x=q(); ensureMcq(x);
    const locked=isOptionsLocked();
    $('mcqOptions').innerHTML=x.options.map((text,i)=>{
      if(v22CandidateMode){
        const chosen=x.studentAnswer.includes(i),type=x.questionType==='multiple'?'checkbox':'radio';
        return `<label class="candidate-option ${chosen?'selected':''}"><input type="${type}" name="answer-${esc(x.id)}" ${chosen?'checked':''} onchange="window.v22SelectStudent(${i})"><span class="option-number">${i+1}</span><span>${esc(text)}</span></label>`;
      }
      return `<div class="teacher-option"><span class="option-number">${i+1}</span><textarea aria-label="Option ${i+1}" ${locked?'disabled readonly':''} oninput="window.v22OptionText(${i},this.value)">${esc(text)}</textarea><button class="delete" ${locked?'disabled':''} onclick="window.v22RemoveOption(${i})" title="Delete option">✕</button></div>`;
    }).join('');
  }
  function renderAnswerKey(){
    const x=q(); ensureMcq(x);
    $('answerKey').innerHTML=x.options.map((text,i)=>`<label class="answer-key-row"><input type="${x.questionType==='multiple'?'checkbox':'radio'}" name="correct-${esc(x.id)}" ${x.correctOptions.includes(i)?'checked':''} onchange="window.v22ToggleCorrect(${i})"><b>Option ${i+1}</b><span>${esc(text||'(empty option)')}</span></label>`).join('')+
      `<div class="correct-answer-text"><b>Saved correct answer:</b> ${x.correctOptions.length?x.correctOptions.map(i=>`${i+1}. ${esc(x.options[i])}`).join('<br>'):'No correct option selected'}</div>`;
  }
  function renderMcq(){
    const x=q(); ensureMcq(x);
    $('mcqType').value=x.questionType;
    renderOptions(); renderAnswerKey();
    $('mcqModeHint').textContent=v22CandidateMode?(x.questionType==='multiple'?'Select all correct options':'Select one option'):'Teacher authoring';
    $('addOption').hidden=v22CandidateMode;
    const optLocked=isOptionsLocked();
    $('addOption').disabled=v22CandidateMode||optLocked;
    const cLocked=isClearLocked();
    if($('clearCorrect')){
      $('clearCorrect').disabled=v22CandidateMode||cLocked;
      $('clearCorrect').hidden=v22CandidateMode;
    }
    if($('clearLock')){
      $('clearLock').textContent=cLocked?'🔒 Unlock Editing':'🔓 Lock Editing';
      $('clearLock').hidden=v22CandidateMode;
    }
    $('optionsLock').textContent=optLocked?'🔒 Unlock Editing':'🔓 Lock Editing';
    $('optionsLock').hidden=v22CandidateMode;
    const tLocked=isTypeLocked();
    $('typeLock').textContent=tLocked?'🔒 Unlock Editing':'🔓 Lock Editing';
    $('typeLock').hidden=v22CandidateMode;
    const dLocked=isDeleteLocked();
    $('deleteLock').textContent=dLocked?'🔒 Unlock Editing':'🔓 Lock Editing';
    $('deleteLock').hidden=v22CandidateMode;
    const addQLocked=isAddQuestionLocked();
    if($('addQuestionLock')){
      $('addQuestionLock').textContent=addQLocked?'Unlock Adding':'Lock Adding';
      $('addQuestionLock').classList.toggle('is-locked',addQLocked);
      $('addQuestionLock').hidden=v22CandidateMode;
    }
    if($('addQuestion')){
      $('addQuestion').disabled=v22CandidateMode||addQLocked;
    }
    $('mcqType').disabled=v22CandidateMode||tLocked;
    $('deleteQuestion').disabled=dLocked;
    document.body.classList.toggle('mcq-candidate',v22CandidateMode);
    document.body.classList.toggle('mcq-teacher',!v22CandidateMode);
  }
  window.v22OptionText=optionText; window.v22RemoveOption=removeOption; window.v22SelectStudent=selectStudent; window.v22ToggleCorrect=toggleCorrect; window.v22ClearCorrect=clearCorrect;
  if($('clearCorrect')) $('clearCorrect').onclick=clearCorrect;
  $('addOption').onclick=()=>{const x=q();if(isOptionsLocked())return toast('Answer options are locked by the teacher');x.options.push(`Option ${x.options.length+1}`);renderMcq();save()};
  if($('clearLock')) $('clearLock').onclick=async()=>{
    const curLocked=isClearLocked();
    if(!curLocked){
      const first=prompt('Teacher: create a passcode to lock clear key. The same passcode is required to unlock:','');
      if(first===null)return;
      if(first.length<4){toast('Use a passcode with at least 4 characters');return;}
      const second=prompt('Confirm the passcode:','');
      if(second!==first){toast('Passcodes do not match');return;}
      saveCurrent();
      const hash=await pinHash(first);
      state.clearLocked=true;
      state.clearLockHash=hash;
      state.questions.forEach(item=>{item.clearLocked=true;item.clearLockHash=hash;});
      renderMcq(); save(); toast('Clear key locked');
    }else{
      const entered=prompt('Enter the teacher passcode to unlock clear key:','');
      if(entered===null)return;
      const expectedHash=state.clearLockHash||q()?.clearLockHash;
      if(await pinHash(entered)!==expectedHash){toast('Incorrect passcode. Clear key remains locked.');return;}
      state.clearLocked=false;
      state.questions.forEach(item=>{item.clearLocked=false;});
      renderMcq(); save(); toast('Clear key editing enabled');
    }
  };
  $('optionsLock').onclick=async()=>{
    const curLocked=isOptionsLocked();
    if(!curLocked){
      const first=prompt('Teacher: create a passcode to lock answer options. The same passcode is required to unlock:','');
      if(first===null)return;
      if(first.length<4){toast('Use a passcode with at least 4 characters');return;}
      const second=prompt('Confirm the passcode:','');
      if(second!==first){toast('Passcodes do not match');return;}
      saveCurrent();
      const hash=await pinHash(first);
      state.optionsLocked=true;
      state.optionsLockHash=hash;
      state.questions.forEach(item=>{item.optionsLocked=true;item.optionsLockHash=hash;});
      renderMcq(); save(); toast('Answer options locked');
    }else{
      const entered=prompt('Enter the teacher passcode to unlock editing:','');
      if(entered===null)return;
      const expectedHash=state.optionsLockHash||q()?.optionsLockHash;
      if(await pinHash(entered)!==expectedHash){toast('Incorrect passcode. Answer options remain locked.');return;}
      state.optionsLocked=false;
      state.questions.forEach(item=>{item.optionsLocked=false;});
      renderMcq(); save(); toast('Answer options editing enabled');
    }
  };
  $('typeLock').onclick=async()=>{
    const curLocked=isTypeLocked();
    if(!curLocked){
      const first=prompt('Teacher: create a passcode to lock question type. The same passcode is required to unlock:','');
      if(first===null)return;
      if(first.length<4){toast('Use a passcode with at least 4 characters');return;}
      const second=prompt('Confirm the passcode:','');
      if(second!==first){toast('Passcodes do not match');return;}
      saveCurrent();
      const hash=await pinHash(first);
      state.typeLocked=true;
      state.typeLockHash=hash;
      state.questions.forEach(item=>{item.typeLocked=true;item.typeLockHash=hash;});
      renderMcq(); save(); toast('Question type locked');
    }else{
      const entered=prompt('Enter the teacher passcode to unlock editing:','');
      if(entered===null)return;
      const expectedHash=state.typeLockHash||q()?.typeLockHash;
      if(await pinHash(entered)!==expectedHash){toast('Incorrect passcode. Question type remains locked.');return;}
      state.typeLocked=false;
      state.questions.forEach(item=>{item.typeLocked=false;});
      renderMcq(); save(); toast('Question type editing enabled');
    }
  };
  $('deleteLock').onclick=async()=>{
    const curLocked=isDeleteLocked();
    if(!curLocked){
      const first=prompt('Teacher: create a passcode to lock question deletion. The same passcode is required to unlock:','');
      if(first===null)return;
      if(first.length<4){toast('Use a passcode with at least 4 characters');return;}
      const second=prompt('Confirm the passcode:','');
      if(second!==first){toast('Passcodes do not match');return;}
      saveCurrent();
      const hash=await pinHash(first);
      state.deleteLocked=true;
      state.deleteLockHash=hash;
      state.questions.forEach(item=>{item.deleteLocked=true;item.deleteLockHash=hash;});
      renderMcq(); save(); toast('Question deletion locked');
    }else{
      const entered=prompt('Enter the teacher passcode to unlock deleting:','');
      if(entered===null)return;
      const expectedHash=state.deleteLockHash||q()?.deleteLockHash;
      if(await pinHash(entered)!==expectedHash){toast('Incorrect passcode. Question deletion remains locked.');return;}
      state.deleteLocked=false;
      state.questions.forEach(item=>{item.deleteLocked=false;});
      renderMcq(); save(); toast('Question deletion editing enabled');
    }
  };
  if($('addQuestionLock')) $('addQuestionLock').onclick=async()=>{
    const curLocked=isAddQuestionLocked();
    if(!curLocked){
      const first=prompt('Teacher: create a passcode to lock adding new questions. The same passcode is required to unlock:','');
      if(first===null)return;
      if(first.length<4){toast('Use a passcode with at least 4 characters');return;}
      const second=prompt('Confirm the passcode:','');
      if(second!==first){toast('Passcodes do not match');return;}
      saveCurrent();
      const hash=await pinHash(first);
      state.addQuestionLocked=true;
      state.addQuestionLockHash=hash;
      state.questions.forEach(item=>{item.addQuestionLocked=true;item.addQuestionLockHash=hash;});
      renderMcq(); save(); toast('Adding questions locked');
    }else{
      const entered=prompt('Enter the teacher passcode to unlock adding questions:','');
      if(entered===null)return;
      const expectedHash=state.addQuestionLockHash||q()?.addQuestionLockHash;
      if(await pinHash(entered)!==expectedHash){toast('Incorrect passcode. Adding questions remains locked.');return;}
      state.addQuestionLocked=false;
      state.addQuestionLockHash='';
      state.questions.forEach(item=>{item.addQuestionLocked=false;item.addQuestionLockHash='';});
      renderMcq(); save(); toast('Adding questions enabled');
    }
  };
  $('addQuestion').onclick=()=>{
    if(isAddQuestionLocked()) return toast('Adding questions is locked by the teacher');
    saveCurrent();
    state.questions.push(starter());
    openQuestion(state.questions.length-1);
    save();
  };
  $('deleteQuestion').onclick=()=>{if(isDeleteLocked())return toast('Question deletion is locked by the teacher');if(state.questions.length<2)return toast('At least one question is required');if(confirm('Delete this question?')){state.questions.splice(current,1);current=Math.min(current,state.questions.length-1);openQuestion(current);save()}};
  $('finishAssessment').onclick=()=>{if(!candidateRunning)return toast('Start the assessment before finishing');if(confirm('Finish now? This ends the attempt and exports the submission files.'))finishAssessmentV20('manual')};
  document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button,.tab').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.tab).classList.add('active')});
  $('mcqType').onchange=e=>{const x=q();if(isTypeLocked()){e.target.value=x.questionType;return toast('Question type is locked by the teacher')}x.questionType=e.target.value;if(x.questionType==='single'&&x.correctOptions.length>1)x.correctOptions=x.correctOptions.slice(0,1);if(x.questionType==='single'&&x.studentAnswer.length>1)x.studentAnswer=x.studentAnswer.slice(0,1);ensureMcq(x);renderMcq();save()};

  const oldOpenQuestion=openQuestion;
  openQuestion=function(i){oldOpenQuestion(i);ensureMcq(q());renderMcq()};
  const oldSaveCurrent=saveCurrent;
  saveCurrent=function(){ensureMcq(q());oldSaveCurrent()};

  const oldStarter=starter;
  starter=function(){const x=oldStarter();x.title='MCQ Question';x.problemHtml='<p>Enter the question here.</p>';x.code='';x.questionType='single';x.options=['Option 1','Option 2','Option 3','Option 4'];x.correctOptions=[];x.studentAnswer=[];x.tests=[];x.problemLocked=!!state.problemLocked;x.problemLockHash=state.problemLockHash||'';x.optionsLocked=!!state.optionsLocked;x.optionsLockHash=state.optionsLockHash||'';x.typeLocked=!!state.typeLocked;x.typeLockHash=state.typeLockHash||'';x.deleteLocked=!!state.deleteLocked;x.deleteLockHash=state.deleteLockHash||'';x.clearLocked=!!state.clearLocked;x.clearLockHash=state.clearLockHash||'';x.addQuestionLocked=!!state.addQuestionLocked;x.addQuestionLockHash=state.addQuestionLockHash||'';return x};

  // A password is mandatory for every teacher ZIP. The existing import verifies it before rendering questions.
  $('exportSet').onclick=async()=>{
    saveCurrent();
    const p=prompt('Teacher: create the password students must enter after importing this ZIP (minimum 4 characters):','');
    if(p===null)return;
    if(p.length<4)return toast('Use a password with at least 4 characters');
    if(prompt('Confirm assessment password:','')!==p)return toast('Passwords do not match');
    const salt=rid(),security={protected:true,salt,hash:await hashPack(p,salt),deleteQuestionsAllowed:false,mcq:true};
    await buildAssessmentZip(security,`${state.setId}.zip`);
  };

  // Detect a successful ZIP import and switch to the student-only assessment layout.
  $('setFile').addEventListener('change',()=>setTimeout(()=>{
    if(importInProgress||!state.questions?.length)return;
    v22CandidateMode=true; candidateSequentialMode=true; packageProtected=true;
    state.questions.forEach(ensureMcq); current=0; openQuestion(0);
    applyCandidateMode(); applyCandidateSecurity(); lockHeaderLinksForExam();
    document.querySelector('[data-tab="tests"]').classList.remove('active');
    $('tests').classList.remove('active');
    toast('Assessment unlocked. Questions and options are ready.');
  },900));

  // The answer key/test case area never appears to students.
  const oldApplyCandidateSecurity=applyCandidateSecurity;
  applyCandidateSecurity=function(){oldApplyCandidateSecurity();document.body.classList.toggle('mcq-candidate',v22CandidateMode);if(v22CandidateMode){$('tests').classList.remove('active');if($('problem'))$('problem').contentEditable='false'}};

  // Exported reports/submissions contain selected answers for examiner review, while the live student screen hides keys.
  reportHtml17=function(){saveCurrent();return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(state.title||'MCQ Assessment Report')}</title></head><body><h1>${esc(state.title||'MCQ Assessment Report')}</h1>${state.questions.map((x,i)=>{ensureMcq(x);return `<article><h2>Question ${i+1}</h2><div>${x.problemHtml||''}</div><h3>Options</h3><ol>${x.options.map(o=>`<li>${esc(o)}</li>`).join('')}</ol><p><b>Your answer:</b> ${x.studentAnswer.length?x.studentAnswer.map(n=>`${n+1}. ${esc(x.options[n])}`).join('; '):'Not answered'}</p></article>`}).join('')}</body></html>`};

  reportHtmlV19=function(reason,end){
    saveCurrent();
    const c=candidateMeta||{};
    const startDisp=formatIstDateTime(c.startTime)||esc(c.startTime||''),endDisp=formatIstDateTime(end),dateDisp=c.currentDate||formatIstDate(c.startTime)||formatIstDate(new Date()),timeDisp=c.currentHour&&c.currentMinute?(c.currentHour+':'+c.currentMinute+' IST'):formatIstTime(c.startTime)||formatIstTime(new Date());
    return `<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;margin:24px;color:#102a43}h1{color:#073b88}.meta{border:1px solid #9fb3c8;padding:12px;background:#f4f7fb;border-radius:6px;margin-bottom:20px}article{border:1px solid #c7d7ea;border-radius:8px;padding:16px;margin:16px 0}ol{line-height:1.7;margin:8px 0;padding-left:24px}.shot{page-break-inside:avoid;margin:12px 0}.shot img{width:100%;max-width:700px}.stamp{font-size:11px}</style></head><body><h1>Assessment Submission Report</h1><div class="meta"><b>Full Name:</b> ${esc(c.fullName||'')}<br><b>Roll Number:</b> ${esc(c.rollNumber||'')}<br><b>Current Date:</b> ${esc(dateDisp)}<br><b>Current Time:</b> ${esc(timeDisp)}<br><b>Exam Start (IST):</b> ${esc(startDisp)}<br><b>Exam End (IST):</b> ${esc(endDisp)}<br><b>Finish Reason:</b> ${esc(reason)}<br><b>Total Questions:</b> ${state.questions.length}</div>${state.questions.map((x,i)=>{ensureMcq(x);return `<article><h2>Question ${i+1}</h2><div>${x.problemHtml||''}</div><h3>Options</h3><ol>${x.options.map(o=>`<li>${esc(o)}</li>`).join('')}</ol><p><b>Your answer:</b> ${x.studentAnswer.length?x.studentAnswer.map(n=>`${n+1}. ${esc(x.options[n])}`).join('; '):'Not answered'}</p></article>`}).join('')}<h2>Camera Evidence</h2><div id="evidenceShots"></div><h2>Screen Recording</h2><p>The completed ZIP contains the screen recording in the screen-recording folder. Recording format: MP4. Start (IST): ${esc(formatIstDateTime(screenRecordingStartedAt))}. End (IST): ${esc(endDisp)}.</p></body></html>`;
  };
  reportHtmlV20=reportHtmlV19;

  function activateCandidateMcqV221(){
    if(!packageProtected||!state.questions?.length)return false;
    v22CandidateMode=true; candidateSequentialMode=true;
    state.questions.forEach(ensureMcq);
    current=Math.max(0,Math.min(current,state.questions.length-1));
    openQuestion(current); applyCandidateMode(); applyCandidateSecurity();
    document.body.classList.add('mcq-candidate');
    document.querySelector('.bottom').hidden=true;
    $('tests').hidden=true;
    const answerTab=document.querySelector('[data-tab="tests"]');
    if(answerTab)answerTab.hidden=true;
    return true;
  }
  // Re-apply after every asynchronous ZIP-import stage so the answer key cannot flash or remain visible.
  $('setFile').addEventListener('change',()=>[0,100,250,500,900,1400].forEach(delay=>setTimeout(activateCandidateMcqV221,delay)));
  const candidateGuard=new MutationObserver(()=>{if(packageProtected||(typeof candidateRunning!=='undefined'&&candidateRunning))activateCandidateMcqV221()});
  candidateGuard.observe(document.body,{attributes:true,attributeFilter:['class']});
  const restoredSession=typeof readExamSession==='function'?readExamSession():null;
  if(restoredSession?.active&&restoredSession?.started&&restoredSession.setId===state?.setId){
    packageProtected=true; v22CandidateMode=true; candidateSequentialMode=true;
    activateCandidateMcqV221();
  }

  function sameAnswerV221(a,b){return [...(a||[])].map(Number).sort((x,y)=>x-y).join(',')===[...(b||[])].map(Number).sort((x,y)=>x-y).join(',')}
  function resultReportHtmlV221(reason,end){
    saveCurrent();
    const rows=state.questions.map((x,i)=>{ensureMcq(x);const answered=x.studentAnswer.length>0,correct=answered&&sameAnswerV221(x.studentAnswer,x.correctOptions);return {x,i,answered,correct}});
    const score=rows.filter(r=>r.correct).length,total=rows.length,attempted=rows.filter(r=>r.answered).length;
    const candidateName=esc(candidateMeta?.fullName||'Candidate'),roll=esc(candidateMeta?.rollNumber||'Not provided');
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MCQ Result Report</title><style>body{font:14px Segoe UI,Arial,sans-serif;color:#102a56;margin:32px}h1{color:#063b88}.summary{display:grid;grid-template-columns:repeat(4,minmax(130px,1fr));gap:12px;margin:20px 0}.card{border:1px solid #bdd0e8;border-radius:8px;padding:14px;background:#f6f9fd}.question{border:1px solid #c7d7ea;border-radius:8px;padding:18px;margin:16px 0}.ok{color:#08783e}.bad{color:#b42318}.muted{color:#667085}ol{line-height:1.7}@media print{body{margin:12mm}.question{break-inside:avoid}}</style></head><body><h1>${esc(state.title||'MCQ Assessment')} - Result Report</h1><p><b>Candidate:</b> ${candidateName}<br><b>Roll Number:</b> ${roll}<br><b>Assessment ID:</b> ${esc(state.setId||'')}<br><b>Completed (IST):</b> ${esc(formatIstDateTime(end))}<br><b>Finish reason:</b> ${esc(reason)}</p><div class="summary"><div class="card"><b>Score</b><br>${score}/${total}</div><div class="card"><b>Percentage</b><br>${total?Math.round(score*100/total):0}%</div><div class="card"><b>Attempted</b><br>${attempted}/${total}</div><div class="card"><b>Not attempted</b><br>${total-attempted}</div></div>${rows.map(({x,i,answered,correct})=>`<section class="question"><h2>Question ${i+1} <span class="${correct?'ok':'bad'}">${correct?'Correct':answered?'Incorrect':'Not attempted'}</span></h2><div>${x.problemHtml||''}</div><h3>Options</h3><ol>${x.options.map(o=>`<li>${esc(o)}</li>`).join('')}</ol><p><b>Your answer:</b> ${answered?x.studentAnswer.map(n=>`${n+1}. ${esc(x.options[n])}`).join('; '):'Not answered'}</p><p><b>Correct answer:</b> ${x.correctOptions.length?x.correctOptions.map(n=>`${n+1}. ${esc(x.options[n])}`).join('; '):'Not answered'}</p></section>`).join('')}</body></html>`;
  }
  const completedZipBeforeV221=completedZipBlobV19;
  completedZipBlobV19=async function(reason,end,pdfBlob,onProgress){
    const original=await completedZipBeforeV221(reason,end,pdfBlob,onProgress);
    const zip=await JSZip.loadAsync(original);
    zip.file('result-report.html',resultReportHtmlV221(reason,end));
    return zip.generateAsync({type:'blob',compression:'DEFLATE',compressionOptions:{level:1}},metadata=>{if(onProgress)onProgress(Math.round(metadata.percent))});
  };
  $('finishAssessment').onclick=()=>{
    if(!validCandidateMetaV191()||!candidateRunning)return toast('Start the assessment with candidate details, camera, and screen sharing before finishing');
    if(!confirm('Finish now? This ends the attempt and exports the PDF, ZIP, result HTML, instruction file, camera evidence, and screen recording.'))return;
    const end=new Date(),base=safeName((candidateMeta?.rollNumber||state.setId||'assessment')+'-'+(candidateMeta?.fullName||'candidate'));
    download(new Blob([resultReportHtmlV221('manual',end)],{type:'text/html'}),base+'-result-report.html');
    finishAssessmentV20('manual');
  };

  window.closeWelcomeModal = function() {
    const m = document.getElementById('welcomeModal');
    if (m) {
      m.classList.remove('show');
      m.style.display = 'none';
    }
    updateFloatingNextVisibility();
  };

  const welcomeModal = $('welcomeModal');
  if (welcomeModal) {
    const welcomeCloseTop = $('welcomeCloseTop');
    if (welcomeCloseTop) welcomeCloseTop.onclick = function(e) { if(e) e.stopPropagation(); window.closeWelcomeModal(); };
    const welcomeContinue = $('welcomeContinue');
    if (welcomeContinue) welcomeContinue.onclick = function(e) { if(e) e.stopPropagation(); window.closeWelcomeModal(); };
    const tryMockDataBtn = $('tryMockDataBtn');
    if (tryMockDataBtn) tryMockDataBtn.onclick = function(e) { if(e) e.stopPropagation(); loadMockTestData(); };
    welcomeModal.addEventListener('click', function(e) {
      if (e.target === welcomeModal) window.closeWelcomeModal();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') window.closeWelcomeModal();
    });
  }

  const waCloseBtn = $('waCloseBtn');
  if (waCloseBtn) {
    waCloseBtn.onclick = function(e) {
      if (e) e.stopPropagation();
      window.closeWaWidget();
    };
  }

  // Mobile & top navigation buttons synchronization (top Next + floating Next + header Prev / Next)
  function setupMobileNavButtons() {
    const mobNext = $('mobileFloatingNext');
    const headNext = $('mobileHeaderNext');
    const headPrev = $('mobileHeaderPrev');

    function handleNextClick(e) {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }
      saveCurrent();
      if (!state || !state.questions || !state.questions.length) return;
      const isLast = current >= state.questions.length - 1;
      if (isLast) {
        if ($('finishAssessment') && !$('finishAssessment').hidden) {
          $('finishAssessment').click();
        } else if (typeof finishAssessmentV20 === 'function' && typeof candidateRunning !== 'undefined' && candidateRunning) {
          $('finishAssessment').click();
        } else if (typeof candidateSequentialMode !== 'undefined' && candidateSequentialMode) {
          if ($('finishAssessment')) $('finishAssessment').click();
          else toast('You are on the final question');
        } else if ($('finishAssessment')) {
          $('finishAssessment').click();
        } else {
          toast('You are on the final question');
        }
        return;
      }
      const nextIdx = current + 1;
      if (typeof window.go === 'function') {
        window.go(nextIdx);
      } else {
        openQuestion(nextIdx);
      }
      if (typeof applyCandidateMode === 'function') applyCandidateMode();
      syncMobileNavState();
    }

    function handlePrevClick(e) {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }
      if (typeof candidateSequentialMode !== 'undefined' && candidateSequentialMode) {
        toast('Previous questions cannot be reopened in candidate mode');
        return;
      }
      if (current > 0) {
        const prevIdx = current - 1;
        if (typeof window.go === 'function') {
          window.go(prevIdx);
        } else {
          openQuestion(prevIdx);
        }
        syncMobileNavState();
      }
    }

    // Keep the floating button on the exact same path as the primary
    // navigation button below the navigation bar.
    function handleFloatingNextClick(e) {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }
      const primaryNext = $('next');
      if (primaryNext && !primaryNext.disabled) primaryNext.click();
    }

    window.goNextQuestion = handleNextClick;
    window.goPrevQuestion = handlePrevClick;

    if ($('next')) $('next').onclick = handleNextClick;
    if ($('prev')) $('prev').onclick = handlePrevClick;
    if (mobNext) mobNext.onclick = handleFloatingNextClick;
    if (headNext) headNext.onclick = handleNextClick;
    if (headPrev) headPrev.onclick = handlePrevClick;

    function syncMobileNavState() {
      const origNext = $('next');
      const origPrev = $('prev');
      if (!state || !state.questions) return;
      const isLast = current >= state.questions.length - 1;
      const isFinish = isLast || (origNext && origNext.textContent.toLowerCase().includes('finish'));
      
      if (headPrev) {
        headPrev.disabled = current === 0 || (typeof candidateSequentialMode !== 'undefined' && candidateSequentialMode);
      }
      if (origPrev) {
        origPrev.disabled = current === 0 || (typeof candidateSequentialMode !== 'undefined' && candidateSequentialMode);
      }

      if (origNext) {
        origNext.disabled = false;
        origNext.textContent = isFinish ? 'Finish' : 'Next ›';
        origNext.title = isFinish ? 'Finish assessment' : 'Next question';
        if (isFinish) origNext.classList.add('finish-btn');
        else origNext.classList.remove('finish-btn');
      }

      if (mobNext) {
        mobNext.disabled = false;
        mobNext.innerHTML = `<span>${isFinish ? 'Finish' : 'Next'}</span><span class="mobile-next-arrow">${isFinish ? '✓' : '➔'}</span>`;
        if (isFinish) mobNext.classList.add('finish-btn');
        else mobNext.classList.remove('finish-btn');
      }

      if (headNext) {
        headNext.disabled = false;
        headNext.textContent = isFinish ? 'Finish' : 'Next ›';
        if (isFinish) headNext.classList.add('finish-btn');
        else headNext.classList.remove('finish-btn');
      }
    }

    function checkMobileScroll() {
      // The floating Next control is shown only when welcome dialog and
      // whatsapp message box are both closed.
      updateFloatingNextVisibility();
    }

    window.addEventListener('scroll', checkMobileScroll, { passive: true });
    window.addEventListener('resize', checkMobileScroll, { passive: true });

    const mainEl = document.querySelector('main');
    if (mainEl) mainEl.addEventListener('scroll', checkMobileScroll, { passive: true });
    const probEl = document.getElementById('problem');
    if (probEl) probEl.addEventListener('scroll', checkMobileScroll, { passive: true });

    const prevRenderSteps = renderSteps;
    renderSteps = function() {
      prevRenderSteps();
      syncMobileNavState();
      checkMobileScroll();
    };

    syncMobileNavState();
    checkMobileScroll();
  }

  setupMobileNavButtons();

  renderMcq(); save();
})();
