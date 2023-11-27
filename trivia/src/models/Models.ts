
/**
 * Server response 
 */
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

/**
 * Model for the incoming question from the server
 */
interface MathQuestionDTO {
    id: string
    query: string,
    correctAnswer: string,
    wrongAnswers: string[]
};

export type { TriviaResponse, MathQuestionDTO };