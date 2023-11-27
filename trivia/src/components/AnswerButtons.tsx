import { useMemo } from "react";
import { AnswerButton } from "../atoms/AnswerButton";
import { IQuestion } from "../store/Question";
import { observer } from "mobx-react-lite";
import { shuffleStringArray } from "../AppUtils";

export const AnswerButtons: React.FC<AnswerButtonsProps> = 
observer(({ currentQuestion, selectedAnswer, handleAnswersClick }) => {

    const shuffledAnswers = useMemo(() => {
        return shuffleStringArray(currentQuestion?.allAnswers || []);
    }, [currentQuestion]);

    return (
        <div className="flex flex-col items-center justify-center h-1/2 bg-blue-300">
            <div className="flex flex-wrap justify-center">
                {shuffledAnswers.map((answer, index) => (
                    <AnswerButton
                        key={index}
                        answer={answer}
                        isCorrect={currentQuestion.isAnsweredCorrectly}
                        isSelected={answer === selectedAnswer}
                        handleAnswersClick={() => handleAnswersClick(answer)}
                    />
                ))}
            </div>
        </div>
    );
});

interface AnswerButtonsProps {
    currentQuestion: IQuestion;
    selectedAnswer: string | null;
    handleAnswersClick: (answer: string) => void;
}