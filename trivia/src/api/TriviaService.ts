import { MathQuestionDTO, TriviaResponse } from "../models/Models";
import { Network } from "./APIUtils";

const fetchMatchTrivia = async (isShuffle:boolean) => {
    try {
        const response = await fetch(Network.MathQuestions);
        if (!response.ok) {
            throw new Error(`bad response, server returned ${response.status}`)
        }
        const body: TriviaResponse = await response.json();
        return extractMathQuestions(body, isShuffle);
    } catch (error) {
        console.log("error fetching meth questions", error);
    }
};

const extractMathQuestions = (response: TriviaResponse, isShuffle: boolean): MathQuestionDTO[] => {
    const questions: MathQuestionDTO[] = [];
    response.trainingSet.forEach(trainingSet => {
        const question: MathQuestionDTO = {
            id: trainingSet._id,
            query: trainingSet.displaySet[0].text,
            correctAnswer: trainingSet.matchSet[0].text,
            wrongAnswers: trainingSet.negativeSet.map(negative => negative.text)
        }
        questions.push(question);
    })

    if (isShuffle) {

        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
    }

    return questions;
};

const triviaService = {
    fetchMatchTrivia
};

export default triviaService;
export type { TriviaResponse };