import { Network } from "./APIUtils";

interface TriviaResponse {
    chapter: string,
    trainingSet: TrainingSet[]
};

interface TrainingSet {
    _id: string,
    title: string,
    matchSet: MatchSet[],
    displaySet: DisplaySet[],
    negativeSet: NegativeSet[]
};

interface MatchSet {
    _id: string,
    text: string
};

interface DisplaySet {
    _id: string,
    text: string
};

interface NegativeSet {
    _id: string,
    text: string
};

export interface MathQuestionDTO {
    id: string
    query: string,
    correctAnswer: string,
    wrongAnswers: string[]
};

const fetchMatchTrivia = async () => {
    try {
        const response = await fetch(Network.MathQuestions);
        if (!response.ok) {
            throw new Error(`bad response, server returned ${response.status}`)
        }
        const body: TriviaResponse = await response.json();
        return extractMathQuestions(body);
    } catch (error) {
        console.log("error fetching meth questions", error);
    }
};

const extractMathQuestions = (response: TriviaResponse): MathQuestionDTO[] => {
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

    return questions;
};

const triviaService = {
    fetchMatchTrivia
};

export default triviaService;
export type { TriviaResponse };