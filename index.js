//NAVIGATION

const clockSection = document.getElementById("clock-section");
const timerSection = document.getElementById("timer-section");
const stopwatchSection = document.getElementById("stopwatch-section");

const clock = document.getElementById("clock");
const stopwatch = document.getElementById("stopwatch");
const timer = document.getElementById("timer");

clockSection.onclick = function() {
	stopwatch.style.display = "none";
	timer.style.display = "none";
	clock.style.display = "block";
}

stopwatchSection.onclick = function() {
	clock.style.display = "none";
	timer.style.display = "none";
	stopwatch.style.display = "block";
}

timerSection.onclick = function() {
	clock.style.display = "none";
	stopwatch.style.display = "none";
	timer.style.display = "block";
	timerMsgBox.style.display = "none";
	timerDevice.style.display = "none";
	timerInput.style.display = "block";
}

//*******************************************************************************************************************************************************************************************

//CLOCK SECTION

function updateClock() {
	currentTime = new Date();
	const secs = currentTime.getSeconds().toString().padStart(2,0);
	const mins = currentTime.getMinutes().toString().padStart(2,0);
	const meridiam = currentTime.getHours() < 12 ? "AM" : "PM";
	const hours = (currentTime.getHours() % 12 || 12).toString().padStart(2,0);
	const timeString = `${hours}:${mins}:${secs} ${meridiam}`;
	clock.textContent = timeString;
}

setInterval(updateClock, 1);

//*******************************************************************************************************************************************************************************************

//STOPWATCH SECTION

const stopwatchDisplay = document.getElementById("stopwatch-display");
const stopwatchStart = document.getElementById("stopwatch-start");
const stopwatchStop = document.getElementById("stopwatch-stop");
const stopwatchReset = document.getElementById("stopwatch-reset");

let startTime = 0;
let stopwatchID = null;
let elapsedTime = 0;
let stopwatchIsRunning = false;

stopwatchStart.onclick = function() {
	if (!stopwatchIsRunning) {
		startTime = Date.now() - elapsedTime;
		stopwatchID = setInterval(updateStopwatch, 10);
		stopwatchIsRunning = true;
	}
}

stopwatchStop.onclick = function() {
	if (stopwatchIsRunning) {
		elapsedTime = Date.now() - startTime;
		clearInterval(stopwatchID);
		stopwatchIsRunning = false;
	}
}

stopwatchReset.onclick = function() {
	clearInterval(stopwatchID);
	startTime = 0;
	stopwatchID = null;
	elapsedTime = 0;
	stopwatchIsRunning = false;
	stopwatchDisplay.textContent = "00:00:00:00";
}

function updateStopwatch() {
	elapsedTime = Date.now() - startTime;
	const hours = Math.floor(elapsedTime/(1000*60*60)).toString().padStart(2,0);
	const mins = Math.floor((elapsedTime/(1000*60))%60).toString().padStart(2,0);
	const secs = Math.floor((elapsedTime/1000)%60).toString().padStart(2,0);
	const msecs = Math.floor((elapsedTime%1000)/10).toString().padStart(2,0);
	stopwatchDisplay.textContent = `${hours}:${mins}:${secs}:${msecs}`;
}

//*******************************************************************************************************************************************************************************************

//TIMER section

const timerInput = document.getElementById("timer-input");
const timerDevice = document.getElementById("timer-device");
const timerMsgBox = document.getElementById("timer-msg");

const timerHoursInput = document.getElementById("timer-hours");
const timerMinsInput = document.getElementById("timer-mins");
const timerSecsInput = document.getElementById("timer-secs");
const timerInputSubmit = document.getElementById("timer-submit");

timerInputSubmit.onclick = function() {
	
	if (timerHoursInput.value === "" || timerMinsInput.value === "" || timerSecsInput.value === "" || 
		isNaN(Number(timerHoursInput.value)) || isNaN(Number(timerMinsInput.value)) || isNaN(Number(timerSecsInput.value)) ||
		Number(timerHoursInput.value) < 0 || Number(timerMinsInput.value) < 0 || Number(timerSecsInput.value) < 0 ||
		!Number.isInteger(Number(timerHoursInput.value)) || !Number.isInteger(Number(timerMinsInput.value)) || !Number.isInteger(Number(timerSecsInput.value))) {
		
			timerMsgBox.textContent = "Invalid time entry :(";
			timerInput.style.display = "none";
			timerMsgBox.style.display = "block";
		
	}
	
	else {
		
		timerInput.style.display = "none";
		timerMsgBox.style.display = "none";
		timerDevice.style.display = "block";
		
		const timerDisplay = document.getElementById("timer-display");
		const timerStart = document.getElementById("timer-start");
		const timerStop = document.getElementById("timer-stop");
		const timerReset = document.getElementById("timer-reset");
		
		timerDisplay.textContent = `${timerHoursInput.value.padStart(2,0)}:${timerMinsInput.value.padStart(2,0)}:${timerSecsInput.value.padStart(2,0)}`;
		
		let startTime = Date.now();
		let elapsedTime = 0;
		let totalTime = (Number(timerHoursInput.value)*60*60*1000) + (Number(timerMinsInput.value)*60*1000) + (Number(timerSecsInput.value)*1000);
		let remainingTime = totalTime - elapsedTime;
		let isRunning = true;
		let timerID = setInterval(updateTimer, 10);
		
		function updateTimer() {
			elapsedTime = Date.now() - startTime;
			remainingTime = totalTime - elapsedTime;
			let hours = Math.floor(remainingTime/(1000*60*60)).toString().padStart(2,0);
			let mins = Math.floor((remainingTime/(60*1000))%60).toString().padStart(2,0);
			let secs = Math.floor((remainingTime/1000)%60).toString().padStart(2,0);
			timerDisplay.textContent = `${hours}:${mins}:${secs}`;
			
			if(remainingTime <= 0) {
				clearInterval(timerID);
				timerDisplay.textContent = "00:00:00";
				timerDevice.style.display = "none"
				timerMsgBox.textContent = "TIME UP!";
				timerMsgBox.style.display = "block";
				isRunning = false;
				timerID = null;
				document.getElementById("timer-audio").play();
			}
		}
		
		timerStart.onclick = function() {
			if(!isRunning) {
				startTime = Date.now() - elapsedTime;
				timerID = setInterval(updateTimer, 10);
				isRunning = true;
			}
		}
		
		timerStop.onclick = function() {
			if(isRunning) {
				clearInterval(timerID);
				elapsedTime = Date.now() - startTime;
				isRunning = false;
			}
		}
		
		timerReset.onclick = function() {
			
			clearInterval(timerID);
			
			startTime = Date.now();
			elapsedTime = 0;
			totalTime = (Number(timerHoursInput.value)*60*60*1000) + (Number(timerMinsInput.value)*60*1000) + (Number(timerSecsInput.value)*1000);
			remainingTime = totalTime - elapsedTime;
			isRunning = true;
			timerID = setInterval(updateTimer, 10);
			
		}
		
	}
	
}