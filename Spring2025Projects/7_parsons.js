// Just 4 questions
const questions = [
    {   
        question: "How do you prefer to spend your free time?",
        options: [
            "Relaxing at home with a good book or movie",
            "Since when did potatoes have free time to spend?",
            "Peeing and Pooping",
            "Thinking about the sins I have committed "
        ]
    },
    {
        question: "How would friends describe your personality?",
        options: [
            "Reliable and dependable",
            "Potato",
            "Versatile and adaptable",
            "Annoying and Insufferable"
        ]
    },
    {
        question: "What's your approach to life's challenges?",
        options: [
            "Take them on with steady determination",
            "Address them with care and compassion",
            "Cry and run away",
            "Adapt and find multiple solutions"
        ]
    },
    {
        question: "Which would be your ideal vacation?",
        options: [
            "Laying in soil for an extended period of time",
            "A relaxing beach retreat or spa getaway",
            "Getting sliced up and laid out on a pan, then seasoned with salt, pepper, and rosemary. And a drizzle of olive oil. Then cooked until crisp and buttery.",
            "Playing video games all days and eating a bunch of snacks"
        ]
    }
];

// All potatotypes
const potatoTypes = [
    {   // 1
        name: "Baked Potato",
        description: "You're simple and easy to please. You are very malleable and probably leech off a lot of traits from the people around you. Might be a microtrend demon.",
        image: "../images/potatos/Bakedpotato.jpg"
    },
    {   // 2
        name: "Kawaii Potato",
        description: "You're kawaii af and awesome and everyone loves you. You like to put -chan at the end of everyones names and you are borderline a weeaboo. ",
        image: "../images/week9_cover/Kawaii_potato.png"
    },
    {   // 3
        name: "Tater Tot",
        description: "You have a naturally golden personality that brightens any room. But sometimes you can become evil and really soggy. Don't be soggy.",
        image: "../images/potatos/Tatertot.jpg"
    },
    {   // 4
        name: "Standard French Fry",
        description: "You're normal and basic but well loved. Even better with truffle mayo.",
        image: "../images/potatos/Frenchfry.jpg"
    },
    {   // 5
        name: "Hashbrown",
        description: "Perfect, amazing, well-seasoned. Greatness all around. No haters.",
        image: "../images/potatos/Hashbrown.jpg"
    },
    {   // 6
        name: "Million Layer Potato",
        description: "You're obnoxious and always doing too much. You put in a lot of effort and work very hard but it surmounts to mediocrity. People regret investing time into getting to know you.",
        image: "../images/potatos/Layerpotato.jpg"
    },
    {   // 7
        name: "Loaded Baked Potato",
        description: "You're a pretty likeable person but only to some. Other may find you a bit annoying and not to their taste. Overrated even.",
        image: "../images/potatos/Loadedpotato.jpg"
    },
    {   // 8
        name: "Mashed Potato",
        description: "Really awesome and you are well loved and appreciated. Not a lot of people can complain.",
        image: "../images/potatos/Mashedpotato.avif"
    },
    {   // 9
        name: "Potato au Gratin",
        description: "Refined and sophisticated, but still warm and welcoming to all. You are a labor of love with guaranteed great results, and can be amazing even standing alone. You are your own dish, not just a side.",
        image: "../images/potatos/Potatogratin.jpg"
    },
    {   // 10
        name: "Potato Salad",
        description: "You are either liked by little kids our really old people. No in between. Often unpredictable, you can be a hit or miss.",
        image: "../images/potatos/Potatosalad.jpg"
    },
    {   // 11
        name: "Potato Soup",
        description: "Maybe a good person to hang with on certain days but you can be a bit overbearing and too much.",
        image: "../images/potatos/Potatosoup.jpg"
    },
    {   // 12
        name: "Wedge Potato Fries",
        description: "Terrible. You may look pleasing at first but the second someone starts talking to you they tap out of the conversation cause you're bland and lame.",
        image: "../images/potatos/Potatowedge.jpg"
    },
    {   // 13
        name: "Raw Potato",
        description: "You are great. Your possibilities are vast and you have a bright, delicious future.",
        image: "../images/potatos/Rawpotato.jpeg"
    },
    {   // 14
        name: "Oven-roasted Potatoes",
        description: "Pretty awesome and customizable. Yummy.",
        image: "../images/potatos/Roastedpotato.jpg"
    },
    {   // 15
        name: "Spiral Potato on a stick",
        description: "You are really keen on trends and are unable to form your own opinion. Good but you get boring fast.",
        image: "../images/potatos/Spiralpotato.jpg"
    },
];

// DOM elements
const startScreen = document.querySelector('.start-screen');
const questionContainer = document.querySelector('.question-container');
const resultContainer = document.querySelector('.result-container');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.querySelector('.progress-bar');
const resultTitle = document.getElementById('result-title');
const resultDescription = document.getElementById('result-description');
const resultImg = document.getElementById('result-img');
const restartBtn = document.getElementById('restart-btn');

let currentQuestion = 0;
let scores = [0, 0, 0, 0]; // Score for each potato type

// Start the quiz on click
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    startScreen.style.display = 'none';
    questionContainer.style.display = 'flex';
    showQuestion(currentQuestion);
}

function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    questionText.textContent = question.question;
    
    // Clear previous questions so to show new ones
    optionsContainer.innerHTML = '';
    
    // Add new options
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Update progress bar when person inputs answer
    const progress = ((questionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function selectOption(optionIndex) {
    // Record the answer (increase score for that potato type)
    scores[optionIndex]++;
    
    // Move to next question or show results
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    } else {
        showResult();
    }
}

function showResult() {
    questionContainer.style.display = 'none';

    resultContainer.style.display = 'flex';
    
    const maxScore = Math.max(...scores);
    const potatoIndex = scores.indexOf(maxScore);
    
    // Display result of score
    const potatoResult = potatoTypes[potatoIndex];
    resultTitle.textContent = `You are a ${potatoResult.name}!`;
    resultDescription.textContent = potatoResult.description;
    resultImg.src = potatoResult.image;
    resultImg.alt = potatoResult.name;
}

function restartQuiz() {
    // To restart the quiz duh
    currentQuestion = 0;
    scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
    // Show start screen again
    resultContainer.style.display = 'none';
    startScreen.style.display = 'flex';
}