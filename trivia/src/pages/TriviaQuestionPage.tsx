import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useRootStore } from "../store/common/RootStoreConext";
import { autorun } from "mobx";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MockEncouragements } from "../api/APIUtils";
import { AnswerButton } from "../atoms/AnswerButton";

export const TriviaQuestionPage = observer(() => {

    const store = useRootStore();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleAnswersClick = (answer: string) => {
        store.currentQuestion?.setAnswer(answer);
        setSelectedAnswer(answer);
    }

    useEffect(() => {
        autorun(() => {
            if (store.questions.length < 0) {
                toast.warning("did not get some questions!");
            }
            setIsLoading(false);
        })
    }, []);

    useEffect(() => {
        if (store.currentQuestion?.isAnsweredCorrectly) {
            const randomIndex = MockEncouragements.getRandomEncouragements();
            toast.success(randomIndex);
        } else {
            if (store.currentQuestion?.userAnswer) {
                toast.error("Nope, try again :)");
            }
        }

        if (store.currentQuestion?.userAnswer) {
            const timeoutId = setTimeout(() => {
                setSelectedAnswer('');
                store.nextQuestion();
            }, 1000);

            return () => clearTimeout(timeoutId);
        }

    }, [selectedAnswer])

    useEffect(() => {
        store.startTrivia();
    }, [store.questions]);

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
                            {store.currentQuestion?.query}
                        </p>
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center bg-blue-200">
                        {/* Info */}
                        <p className="text-3xl font-sriracha">score: {store.currentScore}</p>
                        <p className="text-lg font-sriracha">
                            {store.currentIndex + 1} / {store.questions.length}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center h-1/2 bg-blue-300"> {/* Container 3 */}
                    <div className="flex flex-wrap justify-center">
                        {store.currentQuestion?.answersInRandomOrder.map((answer, index) => (
                            <AnswerButton
                                key={index}
                                answer={answer}
                                isCorrect={store.currentQuestion!.isAnsweredCorrectly}
                                isSelected={answer === selectedAnswer}
                                handleAnswersClick={() => handleAnswersClick(answer)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});
