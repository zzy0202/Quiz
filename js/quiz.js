let startPage = document.querySelector('.startAnswer');
let questionPage = document.querySelector('.questionShow');
let startButton = document.querySelector('.startAnswer>div');
let countDownShow = document.querySelector('.questionShow h6');
let questionAmount = document.querySelector('.questionAmount');
let score = document.querySelector('.score');
let button = document.querySelector("button");
let questionList = null;
let random,answer,isChoose,timer,amount=0,scoreGet=0,startCountDown=3;
let question = document.querySelector('.questionContent>p')
let ol = document.querySelector('ol');
function countDown() {
	let count = 10;
	countDownShow.innerHTML = count.toString();
	timer = setInterval(function () {
		count--;
		countDownShow.innerHTML = count.toString();
		if(count===0) {
			clearInterval(timer);
			if(!isChoose) {
				ol.children[Number.parseInt(answer)-1].classList.add('correctAns');
				amount++;
				questionAmount.innerHTML = '已答：'+amount.toString();
			}
		}
	},1000)
}
ajax({
	method: 'GET',
	url: './js/data.json',
	callback: function (res) {
		questionList = JSON.parse(res.response);
	}
})
function refresh(questionObject) {
	for (let i = 0; i < ol.childElementCount; i++) {
		ol.children[i].classList.remove('correctAns');
		ol.children[i].classList.remove('wrongAns');
	}
	question.innerHTML = questionObject.quiz;
	ol.children[0].innerHTML = questionObject.options[0];
	ol.children[1].innerHTML = questionObject.options[1];
	ol.children[2].innerHTML = questionObject.options[2];
	ol.children[3].innerHTML = questionObject.options[3];
	answer = questionObject.answer;
}
let timer1 = setInterval(function () {
	startCountDown--;
	startPage.children[0].innerHTML = startCountDown.toString();
	if(startCountDown===0) {
		startPage.children[0].innerHTML = '开始回答';
		startButton.addEventListener('click',function () {
			startPage.classList.remove('active');
			questionPage.classList.add('active');
			random = Math.ceil(Math.random()*301);
			refresh(questionList[random]);
			countDown();
		})
		clearInterval(timer1);
	}
},1000)
ol.addEventListener('click',function (e) {
	if(!isChoose) {
		if(!e.target.className.includes('ol')&&answer == e.target.getAttribute('choose')) {
			e.target.classList.add('correctAns');
			amount++;
			questionAmount.innerHTML = '已答：'+amount.toString();
			scoreGet++;
			score.innerHTML = '得分：'+scoreGet.toString();
			isChoose = true;
			clearInterval(timer);
		}
		else if(!e.target.className.includes('ol')) {
			e.target.classList.add('wrongAns');
			ol.children[Number.parseInt(answer)-1].classList.add('correctAns');
			amount++;
			questionAmount.innerHTML = '已答：'+amount.toString();
			isChoose = true;
			clearInterval(timer);
		}
	}
})
button.addEventListener('click',function () {
	isChoose = false;
	random = Math.ceil(Math.random()*301);
	refresh(questionList[random]);
	countDown();
})
