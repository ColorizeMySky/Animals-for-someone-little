var mammals = ['bear', 'boar', 'camel', 'cat', 'cow', 'deer', 'dog', 'donkey',
			   'elephant', 'elk', 'fox', 'giraffe', 'goat', 'hamster', 'hedgehog', 'hippo',
			   'horse', 'hyena', 'kangaroo', 'lion', 'monkey', 'mouse', 'panda', 'porcupine',
			   'rabbit', 'racoon', 'rhinoceros', 'sheep', 'squirrel', 'tiger', 'wolf', 'zebra'];

var message = document.querySelector('.message');

var control = mammals.slice();

mammals.sort(compareRandom);
step();

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function step() {
	if (mammals.length == 0) {
		startAgain();
	}
	else {
		let current = mammals.pop();

		let icon = document.querySelector('.icon');
		icon.classList.remove(icon.classList[1]);
		icon.classList.add(current);

		let choose = randomTwo(control, current);
		choose.push(current);
		choose.sort(compareRandom);

		message.classList.add('invisible');

		let choosingBox = document.querySelectorAll('.image');

		for (let i = 0; i < choosingBox.length; i++) {
			choosingBox[i].classList.remove('unclickable', 'guessed', choosingBox[i].classList[1]);
			choosingBox[i].classList.add(choose[i]);			
			choosingBox[i].innerHTML = '<p>' + choose[i]+ '</p>';

			choosingBox[i].addEventListener("click", function(){
				this.classList.add('chosen');
				let check = this.classList[1];
				compare(check);
			});
		}
	}
}

//choose two random from array
function randomTwo(arr, mammal) {
	do {
		var first = arr[Math.floor(Math.random() * arr.length)];
	}
	while (first == mammal);
	
	do {
		var second = arr[Math.floor(Math.random() * arr.length)];
	}
	while ( second == first || second == mammal);

	var randomTwo = [first, second];
	return randomTwo;
}

//block the click and compare animals
function compare(item) {
	let icon = document.querySelector('.icon');
	let choosingBox = document.querySelectorAll('.image');

	for (box of choosingBox) {
		box.classList.add('unclickable');
	}

	message.classList.remove('invisible');

	if (item == icon.classList[1]) {
		document.querySelector('.chosen').classList.add(item);
		document.querySelector('.chosen').classList.add('guessed');
		document.querySelector('.chosen').classList.remove('chosen');
		message.innerHTML = '<p>Yes! <br> It\'s right!</p><p>Next</p>';
		message.addEventListener('click', step);
	}
	else {
		message.removeEventListener('click', step);
		message.innerHTML = '<p>No! <br> Try again!</p>';
		setTimeout(function() {
			for (box of choosingBox) {
				box.classList.remove('unclickable', 'chosen');
			}		
		}, 1500);
	}
}

function startAgain() {
	message.innerHTML = '<p>You have guessed them all!<br> Click for play again.</p>';
	message.addEventListener("click", function() {
			location.reload();
	});
}