const baseURL = 'https://api.npoint.io/'; 
const MathQuestions = `${baseURL}/eddef1e4d9af278a43a0`;

export const Network = {
    MathQuestions
}

 const encouragements: string[] = [
    "Great, next question :)", 
    "Wow, so easy",
    "Great job!",
    "Well done!",
    "You're a pro!",
    "Amazing, keep going!",
    "So smart!",
    "You're a genius!"
]

const getRandomEncouragements = () =>{
    const randomIndex = Math.floor(Math.random() * encouragements.length);
    return encouragements[randomIndex];
};




export const MockEncouragements = {
    getRandomEncouragements
}