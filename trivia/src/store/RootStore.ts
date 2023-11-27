import { Instance, applySnapshot, flow, types } from "mobx-state-tree";
import triviaService from "../api/TriviaService";
import { Question } from "./Question";

const RootStore = types.model("RootStore", {
    error: types.string,
    questions: types.array(Question),
    currentIndex: types.optional(types.number, 0)
})
    .views(self => {

        const QuestionScore = 50;

        return {
            get currentQuestion() {
                return self.questions.length > 0
                    && self.currentIndex < self.questions.length
                    ? self.questions[self.currentIndex]
                    : null;
            },
            get currentScore() {
                return self.questions.reduce((totalScore, question) => {
                    const scoreChange = question.isAnsweredCorrectly ? QuestionScore : (question.userAnswer ? -QuestionScore : 0);
                    return Math.max(0, totalScore + scoreChange); // minimum score is 0
                }, 0);
            },
        }
    })
    .actions(self => {

        const fetchAndApplyMathQuestions = async () => {
            const mathTrivia = await triviaService.fetchMatchTrivia();
            if (!mathTrivia) {
                self.error = "Problem with getting questions";
            }
            console.log("applying questions");
            applySnapshot(self.questions, mathTrivia);
        };

        const reset = () => {
            console.log("trivia reset")
            applySnapshot(self.questions, []);
            self.currentIndex = 0;
        };

        return {
            startTrivia: flow(function* () {
                reset();
                yield fetchAndApplyMathQuestions();
            }),
            nextQuestion: flow(function* () {
                if ((self.questions.length - 1) == self.currentIndex) {
                    reset();
                    yield fetchAndApplyMathQuestions();
                } else {
                    self.currentIndex += 1;
                }
            })
        }
    })

export interface IRootStore extends Instance<typeof RootStore> { };
export { RootStore };