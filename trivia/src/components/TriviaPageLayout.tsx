import { observer } from "mobx-react-lite";
import { IQuestion } from "../store/Question";
import { LoadingSpinner } from "../atoms/LoadingSpinner";
import { ScoreAndQuestionDisplay } from "./ScoreAndQuestionDisplay";
import { AnswerButtons } from "./AnswerButtons";

interface TriviaPageLayoutProps {
    isLoading: boolean,
    currentQuestion: IQuestion,
    currentScore: number,
    currentIndex: number,
    questions: IQuestion[],
    selectedAnswer: string | null,
    handleAnswersClick: (answer: string) => void
};

export const TriviaPageLayout: React.FC<TriviaPageLayoutProps> = observer(({ isLoading, currentQuestion, currentScore, currentIndex, questions, selectedAnswer, handleAnswersClick }) => {
    return (
        <div className="flex flex-col h-screen">
            {isLoading && <LoadingSpinner />}
            <ScoreAndQuestionDisplay
                currentQuestion={currentQuestion}
                currentScore={currentScore}
                currentIndex={currentIndex}
                questions={questions}
            />
            <AnswerButtons
                currentQuestion={currentQuestion}
                selectedAnswer={selectedAnswer}
                handleAnswersClick={handleAnswersClick}
            />
        </div>
    );
});