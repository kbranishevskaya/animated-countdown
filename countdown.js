function updateTimer(deadline) {
	let time = deadline - new Date();
	return {
		'days': Math.floor(time/(1000*60*60*24)),
		'hours': Math.floor((time/(1000*60*60)) % 24),
		'minutes': Math.floor((time/(1000*60)) % 60),
		'seconds': Math.floor((time/1000) % 60),
		'total': time
	};
}

function animateClock(span) {
	span.className = "turn";
	setTimeout(function() {
		span.className = "";
	}, 700);
}

function startTimer(id, deadline) {
	let timerInterval = setInterval(function() {
		let clock = document.querySelector('#clock');
		let timer = updateTimer(deadline);

		clock.innerHTML = '<span>' + timer.days + '</span>'
						  + '<span>' + timer.hours + '</span>'
						  + '<span>' + timer.minutes + '</span>'
						  + '<span>' + timer.seconds + '</span>';

		//animations
		let spans = clock.getElementsByTagName('span');
		animateClock(spans[3]);
		if (timer.seconds == 59) animateClock(spans[2]);
		if (timer.minutes == 59) animateClock(spans[1]);
		if (timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);

		//check for the end of timer
		if (timer.total < 1) {
			clearInterval(timerInterval);
			clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
		}
	}, 1000);
}

window.onload = function() {
	let deadline = new Date("March 1, 2019 12:00:00");
	startTimer("clock", deadline);
};