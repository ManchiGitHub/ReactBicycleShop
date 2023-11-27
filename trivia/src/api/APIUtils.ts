const baseURL = 'https://api.npoint.io/'; 
const MathQuestions = `${baseURL}/eddef1e4d9af278a43a0`;

export const Network = {
    MathQuestions
}

 const encouragements: string[] = [
    "Great, next question 🥳", 
    "Wow, so easy 🤩",
    "Great job! 😁",
    "Well done! 😻",
    "You're a pro! 👌",
    "Amazing, keep going! 👍",
    "So smart! 🥳",
    "You're a genius! 🧑‍🎓"
]

const negativeAnswerEncouragements: string[] = [
    "What? 🤦", 
    "Stop, what are you doing? 🤦‍♀️",
    "Almost.. ",
    "Nope.. 🤦",
    "Go back to study ",
    "Keep trying, don't give up!",
    "Ummm.. no "
]

const getRandomEncouragements = () =>{
    const randomIndex = Math.floor(Math.random() * encouragements.length);
    return encouragements[randomIndex];
};

const getRandomNegativeEncouragements = () =>{
    const randomIndex = Math.floor(Math.random() * negativeAnswerEncouragements.length);
    return negativeAnswerEncouragements[randomIndex];
};


export const MockEncouragements = {
    getRandomEncouragements, getRandomNegativeEncouragements
}