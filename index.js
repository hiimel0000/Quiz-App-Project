const mybtn = document.querySelector(".mybtn button");
const Rulesbox = document.querySelector(".RulesBox");
const ExitButton = document.querySelector(".buttons .ExitButton");
const ContinueButton = document.querySelector(".buttons .ContinueButton");
const FullDiv = document.querySelector(".FullDiv");
const nextbtn = document.querySelector(".nxtbtn");
const timeCount = document.querySelector(".timer .seconds");
const timeLine = document.querySelector(".QueHeading .time_line");
const resultbox = document.querySelector(".resultbox");
const quit = document.querySelector( ".finalbuttons .quit");
const restart = document.querySelector(".finalbuttons .restart");

mybtn.onclick = ()=>{
    Rulesbox.classList.add("activeinfo");
}

ExitButton.onclick = ()=>{
    Rulesbox.classList.remove("activeinfo");
}
ContinueButton.onclick = () =>{
    Rulesbox.classList.remove("activeinfo");
    FullDiv.classList.add("activequiz");
    showquestions(0);
    startTimer(15);
    StartTimeLine(0);
}
restart.onclick = () =>{
    resultbox.classList.remove("activeresult");
    FullDiv.classList.add("activequiz");
    que_count = 0;
    timeValue = 15;
    widthValue = 0;
    userScore = 0;
    showquestions(que_count);
    timeCount.textContent = timeValue;
    nextbtn.style.display = "none";
    startTimer(timeValue);
    StartTimeLine(widthValue);
}
quit.onclick = () =>{
    window.location.reload();
}

let que_count = 0;
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

function showBox(){
    Rulesbox.classList.remove("activeinfo");
    FullDiv.classList.remove("activequiz");
    resultbox.classList.add("activeresult");
   
    const scoreText = document.querySelector(".scoretext");
    if(userScore > 3){
        let scoreTag = '<span>Congrats!, You got <p>'+ userScore +' </p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>Carry on, You got <p>'+userScore+'</p> out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>Sorry, You got only <p>'+userScore+'</p> out of <p>'+questions.length+'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
 }

nextbtn.onclick = () =>{
    if(que_count < questions.length - 1){
        que_count ++
        showquestions(que_count);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        StartTimeLine(widthValue);
        nextbtn.style.display = "none"; 
    }
    else{
        console.log("Task Completed");
        showBox();
    }
}
function showquestions(index){
const que_text = document.querySelector(".question1");
let que_tag = "<span>" + questions[index].numb + "." + questions[index].question + "</span>";
que_text.innerHTML = que_tag;

const option_list = document.querySelector(".Myoptions");
let option_tag  = '<div class = "options1"><span>'+ questions[index].options[0] +'</span></div>'
+ '<div class = "options1"><span>'+ questions[index].options[1] +'</span></div>'
+ '<div class = "options1"><span>'+ questions[index].options[2] +'</span></div>'
+ '<div class = "options1"><span>'+ questions[index].options[3] +'</span></div>'
;
option_list.innerHTML = option_tag;
const potato = document.querySelector(".foot");
let foot_tag = '<p>' + questions[index].numb + ' of 5 </p>'
potato.innerHTML = foot_tag;
const option = document.querySelectorAll(".options1");
for(i=0; i<option.length; i++){
    option[i].setAttribute("onclick", "optionSelected(this)");
}
}

let tickIcon = '<div class ="tick"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class ="cross"><i class="fas fa-times"></i></div>'

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let alloptions = document.querySelectorAll(".options1");
    if(userAns == correctAns){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    }
    else{
        answer.classList.add("incorrect");
        console.log("Answer is wrong")
        answer.insertAdjacentHTML("beforeend", crossIcon);
    }
    for(let i=0; i<alloptions.length; i++){
        if(alloptions[i].textContent == correctAns){
           alloptions[i].setAttribute("class", "options1 correct");
        }
    }
    
    for(let i=0; i<alloptions.length; i++){
        alloptions[i].classList.add("disabled");
    }

    nextbtn.style.display = "block";

 

}
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--
        if(time < 0){
            timeCount.textContent = "00";
        }
    }
}
function StartTimeLine(time){
    counterLine = setInterval(timer, 50);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 319){
            clearInterval(counterLine);
        }
    }
}