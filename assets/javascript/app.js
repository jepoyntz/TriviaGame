window.onload=function(){
	var interval;
	var correctAnswers = 0;
   	var seconds = 30;
   	var questionCounter = 0;
   	var incorrectAnswers = 0;
   	var unanswered = 0;
   	var gameIsOver = false 
    var questionBank = [
    	{
    		question: "'Have you ever gotten the Aunt Jemima treatment?'",
    		choices: ["Beverly Hills Cop" , "Trapped in Paradise" , " The Jerk" , "Stripes"],
    		link: "https://youtu.be/FOknJG0iRwk",
    		image: "https://sp.yimg.com/ib/th?id=OIP.4JUleGdbBuDwbzm68w-_CwEsDD&pid=15.1&rs=1&c=1&qlt=95&w=147&h=95",
    		correct: 3
    	},
    	{
    		question: "'Hey, that's Enrico Pallazo!'",
    		choices: ["Mafia!" , "The Naked Gun" , "Top Secret" , "Dirty Rotten Scoundrels"],
    		link: "https://youtu.be/hyCc1DzRAgQ",
    		image: "https://sp.yimg.com/ib/th?id=OIP.-6vbGsP3ZmC7JGgH9w-tsgEsCt&pid=15.1&rs=1&c=1&qlt=95&w=206&h=119",
    		correct: 1
    	},
    	{
    		question: "'Hercules, Hercules, Hercules!'",
    		choices: ["The Nutty Professor", "48 Hours", " Beverly Hills Cop", " Coming to America"],
    		link: "https://www.youtube.com/watch?list=RDPxYQQoYfMtQ&v=BS8zi7Dg8TM",
    		image: "https://tse4.mm.bing.net/th?id=OIP.04MyrXhTY76EMD0RGiEhxAEsCt&pid=15.1&P=0&w=278&h=161",
    		correct: 0,
    	},
    	{
    		question: "'It's just a flesh wound.'",
    		choices: ["Monty Python and the Holy Grail", " Life of Brian", "And Now for Something Completely Different", "The Meaning of Life"],
    		link: "https://youtu.be/ra_cUTmQykc",
    		image: "http://vignette3.wikia.nocookie.net/villains/images/9/97/Blackknight.png/revision/latest/scale-to-width-down/250?cb=20100227224111",
    		correct: 0
    	},
    	{
    		question: "A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti",
    		choices: ["The Wizard of Oz ", "The Lord of the Rings: The Two Towers", "The Silence of the Lambs", "Jerry Maguire" ],
    		link: "https://youtu.be/SEQZiElLp-E",
    		image: "https://sp.yimg.com/ib/th?id=OIP.WMMErHmZGSBwj-9MUr_uzgEsDa&pid=15.1&rs=1&c=1&qlt=95&w=166&h=121",
    		correct: 2
    	},
    	{
    		question: "Joey, do you like movies about Gladiators?",
    		choices: ["Mafia!" , "The Naked Gun" , "Top Secret" , "Airplane!"],
    		image : "https://images-na.ssl-images-amazon.com/images/M/MV5BODc0NzA5NzMxOV5BMl5BanBnXkFtZTcwMTU0NTA2OQ@@._V1_UY105_CR27,0,105,105_AL_.jpg",
    		correct: 3

    	}
    ]; 
    // HTML elements
    var choicesList = document.getElementById("choices")
     var startButton =  document.getElementById("startButton")
     var secondsDisplay = document.getElementById("seconds")
     var questionDisplay = document.getElementById("question")

    // use our startButton variable here:
    startButton.onclick = function(){
    	if (gameIsOver) {
    		resetGame()
    		gameIsOver = false
    		choicesList.innerHTML = ""
    		questionDisplay.innerHTML = ""
    		return
    	}
    	restartTimer()
     	nextQuestion()
     	toggleButtonVisible()
     	startButton.textContent = "next";
     	
    }
    function nextQuestion(){
    	choicesList.innerHTML = "";
		
		//took question from html and made question from array
		// index into our questionBank array, and set the next question
		questionDisplay.textContent = questionBank[questionCounter].question
		// grab the choices array, and loop through the choices
		var currentChoices = questionBank[questionCounter].choices
		for (var i = 0; i < currentChoices.length; i++){
			// create a <p> or <span> or something, to hold the choice at currentChoices[i]
			var p = document.createElement("p")
			p.textContent = currentChoices[i]
			// attach an onclick listener to the <p>/<span>, for checking the answer when clicked
			p.onclick = function(e){
				stopTimer()
				choicesList.innerHTML = ""
				checkAnswer(e.target.textContent)
				console.log(e.target)
				showMedia()
				toggleButtonVisible()
				checkIfFinished()

			}
			// append the element to our chociesList
			choicesList.appendChild(p)
		}
		//next time we call this function, will be next index value(next question)
		
	}
    function toggleButtonVisible() {
    	if (startButton.classList.contains("hide")){
    		startButton.classList.remove("hide")

    	}
    		else {
    			startButton.classList.add("hide")
    		}
    }
    function stopTimer() {
		//clear interval if its set
		clearInterval(interval);
    }
    function restartTimer() {
    	seconds = 30;
    	secondsDisplay.textContent = seconds
		interval= setInterval(function(){
	  		//every one sec we want this to fire
			seconds--;
		   	//grab element with seconds and setting to zero
		   	//this will happen every one second
		   	secondsDisplay.textContent=seconds
		   	//when seconds hits 0 we are clearing interval
		   	//dont do this anymore when it gets to 0
		   	if (seconds==0){
		   		stopTimer()
		   		outOfTime()
		   		unanswered++
		    }
	    }, 1000);
    }
    function checkAnswer(answer) {
    	console.log(answer);
    	// get the correct answer's index from the questionBank
    	var correctChoice = questionBank[questionCounter].correct
    	// get the index of the 'answer' argument inside the array of choices
    	var indexOfAnswer = questionBank[questionCounter].choices.indexOf(answer);
    	// see if those indices are the same, if yes win! if no, fail.
    	if (correctChoice == indexOfAnswer){
    		success()
    		
    	}
    	else {
    			fail()
    			incorrectAnswers++
    		}
    }
    function checkIfFinished() {
    	//if ques counter is at end of array, we can offer reset option
    	if (questionBank.length - 1 == questionCounter){
    		startButton.textContent = "Reset"
    		questionCounter = 0
    		displayScores()
    		gameIsOver = true
    	}
    	else {
    		questionCounter++
    	}

    }
    function success() {
    	correctAnswers++
    	console.log("yeah")
    	var message2 = document.createElement("p")
    	message2.textContent = "You Got This One Right!"
    	choicesList.appendChild(message2)
    }
    function fail() {
    	var message2 = document.createElement("p")
    	message2.textContent = "Nope! Correct Answer Is " + questionBank[questionCounter].choices[questionBank[questionCounter].correct]
    	choicesList.appendChild(message2)
    	console.log("no")

    }
    function resetGame() {
    	startButton.textContent = "Start" 
    	
    	correctAnswers = 0
    	incorrectAnswers = 0
    	unanswered = 0


    }
    function showMedia(){
    	var media = document.createElement("img")
    	//ques counter is a number to grab object bank, counter
    	media.src = questionBank[questionCounter].image
    	
    	choicesList.appendChild(media)
    	
    	

    		
    }
    function displayScores(){

    	var message1 = document.createElement("p")
    	message1.textContent = "All Done! Heres How You Did"
    	var message2 = document.createElement("p")
    	message2.textContent = "Correct Answers " + correctAnswers
    	var message3 = document.createElement("p")
    	message3.textContent = "Incorrect Answers " + incorrectAnswers
    	var message4 = document.createElement("p")	

    	message4.textContent = "Unanswered " + unanswered
    	choicesList.appendChild(message1)
    	choicesList.appendChild(message2)
    	choicesList.appendChild(message3)
    	choicesList.appendChild(message4)



    	

    }

}




  	//var questions = [ , "'Hey, that's Enrico Pallazo!'" , "'Hercules, Hercules, Hercules!'", "'It's just a flesh wound.'", "A census taker once tried to test me. I ate his liver with some fava beans and a nice Chianti", "Joey, do you like movies about gladiators", "It's good to be the king!", "Merry New Year!", "", "" ];
  	//var answers = [  , ["The Wizard of Oz ", "The Lord of the Rings: The Two Towers", "The Silence of the Lambs", "Jerry Maguire" ], ["Top Secret", "Airplane", "The Naked Gun", "Beverly Hills Cop"] , ["Spaceballs", "Young Frankenstein" , "History of the World Part I", "High Anxiety"] , ["Coming to America", "Beverly Hills Cop", "Trading Places", "48 Hours"] ]