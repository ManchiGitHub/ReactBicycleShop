import { types } from "mobx-state-tree";
import { Instance } from "mobx-state-tree/dist/internal";

export const Question = types.model("Question", {
    id: types.string,
    query: types.string,
    correctAnswer: types.string,
    wrongAnswers: types.array(types.string),
    userAnswer: types.optional(types.string, '')
})
    .views(self => {

        return {
            get isAnsweredCorrectly(): boolean {
                return self.correctAnswer === self.userAnswer;
            },
            get answersInRandomOrder() {
                const allAnswers = [self.correctAnswer, ...self.wrongAnswers];
                // Fisher-Yates shuffle
                for (let i = allAnswers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
                }

                return allAnswers;
            }
        }
    })
    .actions(self => {

        return {
            setAnswer(userAnswer: string) {
                self.userAnswer = userAnswer;
            }
        }
    })

type IQuestion = Instance<typeof Question>;
export type { IQuestion };