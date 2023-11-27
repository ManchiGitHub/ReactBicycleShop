import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useRootStore } from "../store/common/RootStoreConext";
import { autorun } from "mobx";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MockEncouragements } from "../api/APIUtils";
import { AnswerButton } from "../atoms/AnswerButton";

export const TriviaQuestionPage = observer(() => {

    const {
        currentQuestion,
        questions,
        currentIndex,
        currentScore,
        nextQuestion,
        startTrivia } = useRootStore();

    const [isLoading, setIsLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleAnswersClick = (answer: string) => {
        currentQuestion?.setAnswer(answer);
        setSelectedAnswer(answer);
    }

    useEffect(() => {
        autorun(() => {
            if (questions.length < 0) {
                toast.warning("did not get some questions!");
            }
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {

        if (!currentQuestion || !currentQuestion.userAnswer) {
            return;
        }

        const toastMessage = currentQuestion.isAnsweredCorrectly
            ? MockEncouragements.getRandomEncouragements()
            : MockEncouragements.getRandomNegativeEncouragements();

        const toastFunction = currentQuestion.isAnsweredCorrectly ? toast.success : toast.error;
        toastFunction(toastMessage);

        // Set timeout for moving to the next question
        const timeoutId = setTimeout(() => {
            setSelectedAnswer('');
            nextQuestion();
        }, 1000);

    }, [selectedAnswer])

    useEffect(() => {
        startTrivia();
    }, [questions]);

    return (
        <div >
            {isLoading && (
                <div className="flex flex-col justify-center items-center h-screen">
                    <div
                        className="text-success inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        ></span>
                    </div>
                </div>
            )}
            <ToastContainer
                hideProgressBar
                theme={'colored'}
                position="top-center"
                autoClose={1000}
                draggable={true}
            />
            <div className="flex flex-col h-screen">
                <div className="flex flex-row h-1/2">
                    <div className="flex-1 flex justify-center items-center bg-blue-100">
                        {/* Math question */}
                        <p className="text-3xl font-sriracha">
                            {currentQuestion?.query}
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center bg-blue-200">
                        {/* Info */}
                        <p className="text-3xl font-sriracha">score: {currentScore}</p>
                        <p className="text-lg font-sriracha">
                            {currentIndex + 1} / {questions.length}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center h-1/2 bg-blue-300"> {/* Container 3 */}
                    <div className="flex flex-wrap justify-center">
                        {currentQuestion?.answersInRandomOrder.map((answer, index) => (
                            <AnswerButton
                                key={index}
                                answer={answer}
                                isCorrect={currentQuestion!.isAnsweredCorrectly}
                                isSelected={answer === selectedAnswer}
                                handleAnswersClick={() => handleAnswersClick(answer)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});
