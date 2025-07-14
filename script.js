//Starts the fast
function startFast(){
  //Grab the input values from the Start a Fast page
  const reason = document.getElementById('reason').value;
  const fastType = document.getElementById('fastType').value;
  const endTime = document.getElementById('endTime').value;

  //Check if all the inputs are filled out
  if(!reason || !fastType || !endTime){
    alert('Please fill out all the fields including the fast type!');
    return;
  }

  //Create a new fast object
  const fastData = {
    reason: reason,
    endTime: new Date(endTime).getTime(), //Convert the end time to a timestamp
    startTime: Date.now(), //Get the current timestamp
    fastType: fastType,
    completed: false
  };
  
//Saving the fast data to local storage
localStorage.setItem("currentFast", JSON.stringify(fastData));

//Redirect to the countdown page
window.location.href = "countdown.html"
}

function loadCountdown(){
  // Grab the fast data from local storage
  const fastData = JSON.parse(localStorage.getItem("currentFast"));

  //Check if the data exists
  if(!fastData){
    document.body.innerHTML = "<h2>No fast in progress</h2>";
    return;
  }

  //Display the fast data
  document.getElementById("reasonDisplay").innerText = fastData.reason;
  document.getElementById("typeDisplay").innerText = fastData.fastType;

  // Display a random encouraging verse
  displayRandomVerse(fastData.fastType);

  // Countdown logic
  const countdownEl = document.getElementById("countdown");

  const interval = setInterval(() => {
    const now = Date.now();
    const distance = fastData.endTime - now;

    if (distance <= 0) {
      clearInterval(interval);
      countdownEl.textContent = "Fast Complete!";
      document.getElementById("encouragement").textContent = "Well done. Take a moment to reflect. 💛";

      // Mark fast as completed and store it
      fastData.completed = true;
      let logs = JSON.parse(localStorage.getItem("fastLogs")) || [];
      logs.push(fastData);
      localStorage.setItem("fastLogs", JSON.stringify(logs));
      localStorage.removeItem("currentFast");
      return;
    }

    // Convert milliseconds to days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display it!
    countdownEl.textContent = `${days} day${days !== 1 ? "s" : ""}, ${hours} hour${hours !== 1 ? "s" : ""},     ${minutes} min${minutes !== 1 ? "s" : ""}, ${seconds} sec${seconds !== 1 ? "s" : ""}`;

  }, 1000);
  
}

// Helper to format fast type names
function formatFastType(type) {
  const labels = {
    soul: "Soul Fast",
    food: "Food Fast",
    prayer: "Prayer-Focused Fast",
    worship: "Worship-Focused Fast",
    media: "Media Fast",
    custom: "Custom Fast"
  };
  return labels[type] || "Unknown Type";
}

// Run this only on the countdown page
if (window.location.pathname.includes("countdown.html")) {
  loadCountdown();
}

function endFast(){
// Grab the fast data from local storage
const fastData = JSON.parse(localStorage.getItem("currentFast"));

  // Check if the data exists
  if(!fastData){
    alert("No fast in progress");
    return;
  }

  fastData.completed = true;

  //Save the updated fast data to local storage
  let logs = JSON.parse(localStorage.getItem("fastLogs")) || [];
  logs.push(fastData);
  localStorage.setItem("fastLogs", JSON.stringify(logs));

  //Remove the current fast data from local storage
  localStorage.removeItem("currentFast");

  //Give feedback to the user
  alert("Fast ended and saved to the log!");
  window.location.href = "index.html";
}

function displayRandomVerse(fastType){
  //Grab the verse bank
  const verses = verseBank[fastType];

  //Check if the verse bank exists
  if(!verses)return;

  const randomIndex = Math.floor(Math.random() * verses.length);
  const verse = verses[randomIndex];

  //Display the verse
  document.getElementById("encouragement").innerText = verse;
  }

function checkForCurrentFast(){
  const currentFast = JSON.parse(localStorage.getItem("currentFast"));
  const resumeDiv = document.getElementById("resumeFastContainer");

  if(currentFast && !currentFast.completed){
    resumeDiv.innerHTML=`<p>You have an ongoing fast: <strong>${currentFast.reason}</strong></p>
    <button onclick="window.location.href='countdown.html'">View Current Fast</button>`;
  }
}

//Only run on the home page
if(window.location.pathname.includes("index.html") || window.location.pathname === "/"){
  checkForCurrentFast();
}

fetch('themeToggle.html')
.then(res => res.text())
.then(html => {
  document.getElementById('theme-toggle-placeholder').innerHTML = html;

  // Theme logic AFTER the toggle has loaded
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  if (localStorage.getItem('theme') === 'dark' ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    toggle.checked = true;
    body.classList.add('dark-mode');
  } else {
    body.classList.add('light-mode');
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  });
});

.theme-switch {
  --toggle-size: 30px;
  /* the size is adjusted using font-size,
     this is not transform scale,
     so you can choose any size */
  --container-width: 5.625em;
  --container-height: 2.5em;
  --container-radius: 6.25em;
  /* radius 0 - minecraft mode :) */
  --container-light-bg: #3D7EAE;
  --container-night-bg: #1D1F2C;
  --circle-container-diameter: 3.375em;
  --sun-moon-diameter: 2.125em;
  --sun-bg: #ECCA2F;
  --moon-bg: #C4C9D1;
  --spot-color: #959DB1;
  --circle-container-offset: calc((var(--circle-container-diameter) - var(--container-height)) / 2 * -1);
  --stars-color: #fff;
  --clouds-color: #F3FDFF;
  --back-clouds-color: #AACADF;
  --transition: .5s cubic-bezier(0, -0.02, 0.4, 1.25);
  --circle-transition: .3s cubic-bezier(0, -0.02, 0.35, 1.17);
}

.theme-switch, .theme-switch *, .theme-switch *::before, .theme-switch *::after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: var(--toggle-size);
}

.theme-switch__container {
  width: var(--container-width);
  height: var(--container-height);
  background-color: var(--container-light-bg);
  border-radius: var(--container-radius);
  overflow: hidden;
  cursor: pointer;
  -webkit-box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
  box-shadow: 0em -0.062em 0.062em rgba(0, 0, 0, 0.25), 0em 0.062em 0.125em rgba(255, 255, 255, 0.94);
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
  position: relative;
}

.theme-switch__container::before {
  content: "";
  position: absolute;
  z-index: 1;
  inset: 0;
  -webkit-box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
  box-shadow: 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset, 0em 0.05em 0.187em rgba(0, 0, 0, 0.25) inset;
  border-radius: var(--container-radius)
}

.theme-switch__checkbox {
  display: none;
}

.theme-switch__circle-container {
  width: var(--circle-container-diameter);
  height: var(--circle-container-diameter);
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  left: var(--circle-container-offset);
  top: var(--circle-container-offset);
  border-radius: var(--container-radius);
  -webkit-box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), inset 0 0 0 3.375em rgba(255, 255, 255, 0.1), 0 0 0 0.625em rgba(255, 255, 255, 0.1), 0 0 0 1.25em rgba(255, 255, 255, 0.1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-transition: var(--circle-transition);
  -o-transition: var(--circle-transition);
  transition: var(--circle-transition);
  pointer-events: none;
}

.theme-switch__sun-moon-container {
  pointer-events: auto;
  position: relative;
  z-index: 2;
  width: var(--sun-moon-diameter);
  height: var(--sun-moon-diameter);
  margin: auto;
  border-radius: var(--container-radius);
  background-color: var(--sun-bg);
  -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
  box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #a1872a inset;
  -webkit-filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
  filter: drop-shadow(0.062em 0.125em 0.125em rgba(0, 0, 0, 0.25)) drop-shadow(0em 0.062em 0.125em rgba(0, 0, 0, 0.25));
  overflow: hidden;
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
}

.theme-switch__moon {
  -webkit-transform: translateX(100%);
  -ms-transform: translateX(100%);
  transform: translateX(100%);
  width: 100%;
  height: 100%;
  background-color: var(--moon-bg);
  border-radius: inherit;
  -webkit-box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
  box-shadow: 0.062em 0.062em 0.062em 0em rgba(254, 255, 239, 0.61) inset, 0em -0.062em 0.062em 0em #969696 inset;
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
  position: relative;
}

.theme-switch__spot {
  position: absolute;
  top: 0.75em;
  left: 0.312em;
  width: 0.75em;
  height: 0.75em;
  border-radius: var(--container-radius);
  background-color: var(--spot-color);
  -webkit-box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
  box-shadow: 0em 0.0312em 0.062em rgba(0, 0, 0, 0.25) inset;
}

.theme-switch__spot:nth-of-type(2) {
  width: 0.375em;
  height: 0.375em;
  top: 0.937em;
  left: 1.375em;
}

.theme-switch__spot:nth-last-of-type(3) {
  width: 0.25em;
  height: 0.25em;
  top: 0.312em;
  left: 0.812em;
}

.theme-switch__clouds {
  width: 1.25em;
  height: 1.25em;
  background-color: var(--clouds-color);
  border-radius: var(--container-radius);
  position: absolute;
  bottom: -0.625em;
  left: 0.312em;
  -webkit-box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
  box-shadow: 0.937em 0.312em var(--clouds-color), -0.312em -0.312em var(--back-clouds-color), 1.437em 0.375em var(--clouds-color), 0.5em -0.125em var(--back-clouds-color), 2.187em 0 var(--clouds-color), 1.25em -0.062em var(--back-clouds-color), 2.937em 0.312em var(--clouds-color), 2em -0.312em var(--back-clouds-color), 3.625em -0.062em var(--clouds-color), 2.625em 0em var(--back-clouds-color), 4.5em -0.312em var(--clouds-color), 3.375em -0.437em var(--back-clouds-color), 4.625em -1.75em 0 0.437em var(--clouds-color), 4em -0.625em var(--back-clouds-color), 4.125em -2.125em 0 0.437em var(--back-clouds-color);
  -webkit-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  -o-transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
  transition: 0.5s cubic-bezier(0, -0.02, 0.4, 1.25);
}

.theme-switch__stars-container {
  position: absolute;
  color: var(--stars-color);
  top: -100%;
  left: 0.312em;
  width: 2.75em;
  height: auto;
  -webkit-transition: var(--transition);
  -o-transition: var(--transition);
  transition: var(--transition);
}

/* actions */

.theme-switch__checkbox:checked + .theme-switch__container {
  background-color: var(--container-night-bg);
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container {
  left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter));
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__circle-container:hover {
  left: calc(100% - var(--circle-container-offset) - var(--circle-container-diameter) - 0.187em)
}

.theme-switch__circle-container:hover {
  left: calc(var(--circle-container-offset) + 0.187em);
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__moon {
  -webkit-transform: translate(0);
  -ms-transform: translate(0);
  transform: translate(0);
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__clouds {
  bottom: -4.062em;
}

.theme-switch__checkbox:checked + .theme-switch__container .theme-switch__stars-container {
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}