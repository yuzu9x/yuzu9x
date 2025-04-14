// more quesiton options now
const questions = [
    {   
        question: "How do you prefer to spend your free time?",
        options: [
            "Relaxing at home with a good book or movie", // Baked Potato
            "Since when did potatoes have free time to spend?", // Raw Potato
            "Peeing and Pooping", // Potato Salad
            "Thinking about the sins I have committed", // Potato Soup
            "Being the center of attention at social gatherings", // Loaded Baked Potato
            "Trying new and exotic experiences", // Spiral Potato
            "Creating something beautiful or delicious", // Potato au Gratin
            "Spending time with loved ones", // Mashed Potato
            "Exercising and staying active", // Hashbrown
            "Learning something new and challenging", // Million Layer Potato
            "Helping others and volunteering", // Kawaii Potato
            "Just going with the flow, whatever happens", // Standard French Fry
            "Video games and tech gadgets", // Tater Tot
            "Contemplating life while staring at walls", // Wedge Potato Fries
            "Getting crispy under the sun", // Oven-roasted Potatoes
        ]
    },
    {
        question: "How would friends describe your personality?",
        options: [
            "Reliable and dependable", // Baked Potato
            "Potato", // Raw Potato
            "Versatile and adaptable", // Mashed Potato
            "Annoying and Insufferable", // Wedge Potato Fries
            "Warm and comforting", // Potato Soup
            "Complex and layered", // Million Layer Potato
            "Fun and indulgent", // Loaded Baked Potato
            "Sophisticated and refined", // Potato au Gratin
            "Energetic and crispy", // Hashbrown
            "Cute and lovable", // Kawaii Potato
            "Straightforward and no-nonsense", // Standard French Fry
            "Quirky and unconventional", // Spiral Potato
            "Playful and fun-sized", // Tater Tot
            "Hearty and traditional", // Potato Salad
            "Golden and well-seasoned", // Oven-roasted Potatoes
        ]
    },
    {
        question: "What's your approach to life's challenges?",
        options: [
            "Take them on with steady determination", // Baked Potato
            "Address them with care and compassion", // Kawaii Potato
            "Cry and run away", // Potato Salad
            "Adapt and find multiple solutions", // Mashed Potato
            "Add more cheese and bacon", // Loaded Baked Potato
            "Layer different approaches until something works", // Million Layer Potato 
            "Face them head-on with heat and pressure", // Hashbrown
            "Blend in with others facing similar challenges", // Standard French Fry
            "Approach them with sophistication and style", // Potato au Gratin
            "Go in circles and make repeat mistakes", // Spiral Potato
            "Wait until I'm ready to deal with them", // Raw Potato
            "Simmer slowly until the solution becomes clear", // Potato Soup
            "Jump right in with enthusiasm", // Tater Tot
            "Try to work it out but ultimately disappoint", // Wedge Potato Fries
            "Get roasted but come out stronger", // Oven-roasted Potatoes
        ]
    },
    {
        question: "Which would be your ideal vacation?",
        options: [
            "Laying in soil for an extended period of time", // Raw Potato
            "A relaxing beach retreat or spa getaway", // Baked Potato
            "Getting sliced up and laid out on a pan, then seasoned with salt, pepper, and rosemary. And a drizzle of olive oil. Then cooked until crisp and buttery.", // Oven-roasted Potatoes
            "Playing video games all days and eating a bunch of snacks", // Tater Tot
            "A fancy culinary tour with gourmet experiences", // Potato au Gratin
            "A cozy cabin with comfort food and warm drinks", // Potato Soup
            "An adventure park with thrilling rides and attractions", // Spiral Potato
            "An expensive dinner at an expensive restaurant", // Million Layer Potato
            "A music festival or concert series", // Loaded Baked Potato
            "Go to an anime convention", // Kawaii Potato
            "Going wherever friends are going", // Standard French Fry
            "A wellness retreat focused on health and fitness", // Hashbrown
            "A family reunion with traditional activities", // Potato Salad
            "Anywhere as long as it's cheap and easy", // Wedge Potato Fries
            "A cozy gathering with closest friends", // Mashed Potato
        ]
    },
    {
        question: "What's your biggest weakness?",
        options: [
            "Being too plain and predictable", // Baked Potato
            "Potential but no direction", // Raw Potato
            "Being too childish", // Tater Tot
            "People find me bland without condiments", // Standard French Fry
            "I'm perfect in every way", // Hashbrown
            "Being better than everyone", // Million Layer Potato
            "Needing too much validation", // Loaded Baked Potato
            "Sometimes too overwhelming", // Mashed Potato
            "Being intimidatingly sophisticated", // Potato au Gratin
            "Getting cold too quickly", // Potato Soup
            "Being evil and not a good person", // Potato Salad
            "Following trends blindly", // Spiral Potato
            "Being overly emotional and sensitive", // Kawaii Potato
            "Disappointing peoples expectations'", // Wedge Potato Fries
            "Getting too stressed when under pressure", // Oven-roasted Potatoes
        ]
    },
    {
        question: "What's your favorite type of potato?",
        options: [
            "Your mom", // Raw Potato
            "YOUR MOM", // Baked Potato
            "I really like oven-roasted potatoes!", // Oven-roasted Potatoes
            "Tater tots", // Tater Tot
            "Chicken Alfredo Pasta", // Potato au Gratin
            "I like the color green", // Potato Soup
            "The spiral potatoes you get on a stick at a festival or carnival", // Spiral Potato
            "A potato completely covered in gold leaf and garnished with caviar", // Million Layer Potato
            "Loaded Baked Potato", // Loaded Baked Potato
            "Kawaii Potato :3", // Kawaii Potato
            "French fries...?", // Standard French Fry
            "Have you guys ever tried a hashbrown with creme fraiche and caviar on it? It's so fire. Like you gotta believe me", // Hashbrown
            "Potato Salad", // Potato Salad
            "Guys wedge fries are actually so good trust me I swear", // Wedge Potato Fries
            "Mashed Potato :D", // Mashed Potato
        ]
    },
    {
        question: "What would your enemies say about you behind your back?",
        options: [
            "So boring I forgot they existed", // Baked Potato
            "Literally just sits there doing nothing", // Raw Potato
            "Acts like a child but thinks they're adorable", // Tater Tot
            "Bland and forgettable, like unsalted fries", // Standard French Fry
            "Has a superiority complex that makes me sick", // Hashbrown
            "Tries WAY too hard to be impressive", // Million Layer Potato
            "Attention-seeking drama queen", // Loaded Baked Potato
            "Clings to people like mashed potato on a spoon", // Mashed Potato
            "Thinks they're fancy but they're just a potato", // Potato au Gratin
            "Too emotional and always playing the victim", // Potato Soup
            "Disgusting mix of random traits with no identity", // Potato Salad
            "Mindless trend-follower with zero originality", // Spiral Potato
            "That anime obsession is seriously concerning", // Kawaii Potato
            "All appearance, zero substance", // Wedge Potato Fries
            "Gets crusty under pressure", // Oven-roasted Potatoes
        ]
    },
    {
        question: "How do you respond to criticism?",
        options: [
            "Just sit there and take it", // Baked Potato
            "I'll deal with it later (never)", // Raw Potato
            "Throw a tantrum like a literal child", // Tater Tot
            "Accept it without question like the basic fucking idiot potato I am", // Standard French Fry
            "What's criticism?", // Hashbrown
            "Overcompensate with excessive effort that misses the point", // Million Layer Potato
            "Add more toppings to distract from my flaws", // Loaded Baked Potato
            "Disintegrate", // Mashed Potato
            "Respond with snobbish disdain", // Potato au Gratin
            "Simmer with resentment for days", // Potato Soup
            "Unpredictably swing between rage and indifference", // Potato Salad
            "Quickly change my entire personality to match what they want", // Spiral Potato
            "Cry and run away again", // Kawaii Potato
            "Promise to change but never actually do", // Wedge Potato Fries
            "Get heated but ultimately become a better person", // Oven-roasted Potatoes
        ]
    },
    {
        question: "What's your toxic trait?",
        options: [
            "Being completely forgettable", // Baked Potato
            "Unlimited potential but zero follow-through", // Raw Potato
            "I'm basically a child in an adult's body", // Tater Tot
            "I have the personality of cardboard", // Standard French Fry
            "I'm insufferably smug about my accomplishments", // Hashbrown
            "I waste people's time with unnecessary complexity", // Million Layer Potato
            "I make everything about me and my problems", // Loaded Baked Potato
            "I'm clingy and emotionally overwhelming", // Mashed Potato
            "I'm a pretentious snob with expensive taste", // Potato au Gratin
            "I guilt-trip people into taking care of me", // Potato Soup
            "I'm completely unpredictable and inconsistent", // Potato Salad
            "I have zero original thoughts or opinions", // Spiral Potato
            "I use cuteness to manipulate people", // Kawaii Potato
            "I consistently disappoint everyone", // Wedge Potato Fries
            "I burn under pressure when people need me", // Oven-roasted Potatoes
        ]
    },
    {
        question: "What would cause your downfall?",
        options: [
            "Being boring", // Baked Potato
            "Never actualizing my potential", // Raw Potato
            "Being crushed by the reality of adulthood", // Tater Tot
            "Realizing I'm just like everyone else", // Standard French Fry
            "Saying a slur on tiktok live", // Hashbrown
            "Collapsing under the weight of my own complexity", // Million Layer Potato
            "When people get tired of my drama", // Loaded Baked Potato
            "Taking shrooms and experiencing ego death", // Mashed Potato
            "Discovering I'm just a potato with fancy cheese", // Potato au Gratin
            "Getting too cold and overbearing", // Potato Soup
            "My inconsistent work ethic", // Potato Salad
            "The next trend making me completely irrelevant", // Spiral Potato
            ":3 ermm...", // Kawaii Potato
            "People finally giving up on me entirely", // Wedge Potato Fries
            "Getting burnt to a crisp under pressure", // Oven-roasted Potatoes
        ]
    },
    {
        question: "What's your dating red flag?",
        options: [
            "I have the personality of an actual potato", // Baked Potato
            "I'm completely undeveloped as a person", // Raw Potato
            "I collect blindbox toys", // Tater Tot
            "I'm exactly like every other person you've dated", // Standard French Fry
            "I never shut up about how amazing I am", // Hashbrown
            "I make everything needlessly complicated", // Million Layer Potato
            "I need constant validation and attention", // Loaded Baked Potato
            "I'll emotionally smother you", // Mashed Potato
            "I'll judge your 'unsophistication", // Potato au Gratin
            "I use my problems to manipulate you", // Potato Soup
            "You'll never know which version of me you'll get", // Potato Salad
            "I have no personality besides current trends", // Spiral Potato
            "I am too cute and awesome and amazing", // Kawaii Potato
            "I look better in pictures than in real life", // Wedge Potato Fries
            "I fall apart when things get hot", // Oven-roasted Potatoes
        ]
    },
    {
        question: "What's your spirit animal?",
        options: [
            "A baked potato", // Baked Potato
            "An unhatched egg", // Raw Potato
            "A really awesome 10 year old", // Tater Tot
            "A beige wall", // Standard French Fry
            "A peacock", // Hashbrown
            "An octopus", // Million Layer Potato
            "A massive tiger, keyword massive", // Loaded Baked Potato
            "A koala", // Mashed Potato
            "A really slender black cat that is a little evil", // Potato au Gratin
            "A sad turtle", // Potato Soup
            "A pug", // Potato Salad
            "A fat sheep", // Spiral Potato
            "A kawaii potato", // Kawaii Potato
            "A goldfish", // Wedge Potato Fries
            "What", // Oven-roasted Potatoes
        ]
    }
];

// All da potatotypes
const potatoTypes = [
    {   // 1
        name: "Baked Potato",
        description: "You're simple and easy to please. You are very malleable and probably leech off a lot of traits from the people around you. Might be a microtrend demon.",
        image: "../images/potatos/Bakedpotato.jpg"
    },
    {   // 2
        name: "Kawaii Potato",
        description: "You're kawaii af and awesome and everyone loves you. You like to put -chan at the end of everyones names and you are borderline a weeaboo. ",
        image: "../images/Kawaii_potato.png"
    },
    {   // 3
        name: "Tater Tot",
        description: "You have a naturally golden personality that brightens any room. But sometimes you can become evil and really soggy. Don't be soggy.",
        image: "../images/potatos/TaterTot.jpg"
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
        name: "Potato Wedges",
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
        image: "../images/potatos/Spiralpotato.png"
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
let scores = Array(15).fill(0); 

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
    // Record the answer
    scores[optionIndex]++;
    
    // Move to next question/show results
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
    const potatoIndices = scores.map((score, index) => score === maxScore ? index : -1).filter(index => index !== -1);
    
    // In case of a tie, choose randomly from the highest scoring potato types (lol)
    const potatoIndex = potatoIndices[Math.floor(Math.random() * potatoIndices.length)];
    
    // Display result of da score
    const potatoResult = potatoTypes[potatoIndex];
    resultTitle.textContent = `You are a ${potatoResult.name}!`;
    resultDescription.textContent = potatoResult.description;
    resultImg.src = potatoResult.image;
    resultImg.alt = potatoResult.name;
}

function restartQuiz() {
    // To restart the quiz duh
    currentQuestion = 0;
    scores = Array(15).fill(0);
    
    // Show start screen again
    resultContainer.style.display = 'none';
    startScreen.style.display = 'flex';
}