// the cure — olivia rodrigo, lyrics typed as code.
// format inspired by @idfcauuu on tiktok. lines transcribed from the video.

const LINES = [
  'why.cant( "you_come" ){ stitch: "me_up" };',
  'why.cant( "it_ever" ){ be: "enough" };',
  'why.cant( "you_come" ){ stitch: "me_up" };',
  'why.cant( "it_ever" ){ be: "enough" };',
  '// by nabil',
  '{ its_not: "enough" };',
  'oh.because( "my_head" ){ is_full_of: "poison" };',
  'and( "my_heart" ){ is_full_of: "doubt" };',
  'i.got( "toxins" ){ in: "my_bloodstream" };',
  'you.tried_so_hard( to: "suck_em_out" };',
  'and( "it_feels" ){ like: "medication" };',
  'and( "its_good" ){ for_me: "im_sure" };',
  'but.it( "it_dont_matter" ){ how: "your_love_feels_anymore" };',
  'itll_never_be( "the_cure" );',
  '// the cure — olivia rodrigo',
];

const CHAR_MS = 55;      // ms per character
const LINE_PAUSE = 380;  // ms after each line
const END_PAUSE = 3200;  // ms before looping

const codeEl = document.getElementById("code");
const gutterEl = document.getElementById("gutter");
const wrapEl = document.getElementById("codeWrap");
const statusEl = document.getElementById("status");
const stageEl = document.getElementById("stage");
const replayBtn = document.getElementById("replay");

const TOKEN_RE = /(\/\/.*)|("(?:[^"\\]|\\.)*")|\b(why|because|got|and|but|oh)\b|\b(stitch|be|is_full_of|its_not|in|to|like|for_me|how)\b|([{}:;])|([()])|(.)/g;

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function highlight(text) {
  let out = "";
  TOKEN_RE.lastIndex = 0;
  let m;
  while ((m = TOKEN_RE.exec(text)) !== null) {
    const tok = m[0];
    let cls = "pl";
    if (m[1] !== undefined) cls = "com";
    else if (m[2] !== undefined) cls = "str";
    else if (m[3] !== undefined) cls = "kw";
    else if (m[4] !== undefined) cls = "prop";
    else if (m[5] !== undefined) cls = "br";
    else if (m[6] !== undefined) cls = "par";
    out += '<span class="' + cls + '">' + escapeHtml(tok) + "</span>";
    if (TOKEN_RE.lastIndex === m.index) TOKEN_RE.lastIndex++;
  }
  return out;
}

let lineIdx = 0;
let charIdx = 0;
let timer = null;

function render() {
  let html = "";
  for (let i = 0; i < lineIdx; i++) {
    html += highlight(LINES[i]) + "\n";
  }
  if (lineIdx < LINES.length) {
    html += highlight(LINES[lineIdx].slice(0, charIdx));
  }
  html += '<span class="cursor"></span>';
  codeEl.innerHTML = html;

  const total = lineIdx + 1;
  let nums = "";
  for (let i = 1; i <= total; i++) nums += i + "\n";
  gutterEl.textContent = nums;

  wrapEl.scrollTop = wrapEl.scrollHeight;
  const cursor = codeEl.querySelector(".cursor");
  if (cursor) {
    const x = cursor.offsetLeft;
    if (x > wrapEl.clientWidth - 120) wrapEl.scrollLeft = x - wrapEl.clientWidth + 120;
  }
}

function tick() {
  if (lineIdx >= LINES.length) {
    statusEl.textContent = "done — restarting…";
    timer = setTimeout(start, END_PAUSE);
    return;
  }
  const line = LINES[lineIdx];
  if (charIdx < line.length) {
    charIdx++;
    render();
    timer = setTimeout(tick, CHAR_MS + Math.random() * 30);
  } else {
    lineIdx++;
    charIdx = 0;
    render();
    timer = setTimeout(tick, LINE_PAUSE);
  }
}

function start() {
  clearTimeout(timer);
  lineIdx = 0;
  charIdx = 0;
  statusEl.textContent = "typing…";
  render();
  timer = setTimeout(tick, 600);
}

replayBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  start();
});
stageEl.addEventListener("click", start);

start();
