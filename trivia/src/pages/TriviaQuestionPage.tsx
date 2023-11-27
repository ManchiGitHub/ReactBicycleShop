import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useRootStore } from "../store/common/RootStoreConext";
import { reaction } from "mobx";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { MockEncouragements } from "../api/APIUtils";
import { TriviaPageLayout } from "../components/TriviaPageLayout";
import { LoadingSpinner } from "../atoms/LoadingSpinner";

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

    useEffect(() => {

        const dispose = reaction(
            () => questions.length,
            length => {
                if (length < 0) {
                    toast.warning("Oops, something went wrong");
                }
                setIsLoading(false);
            }
        );

        return () => dispose();
    }, []);

    useEffect(() => {

        if (!currentQuestion || !currentQuestion.userAnswer) {
            return;
        }

        showFeedbackToast();

        const timeoutId = setTimeout(() => {
            setSelectedAnswer('');
            nextQuestion();
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [selectedAnswer]);

    useEffect(() => {
        startTrivia();
    }, [questions]);

    const showFeedbackToast = () => {
        const toastMessage = getToastMessage();
        const toastFunction = currentQuestion!.isAnsweredCorrectly ? toast.success : toast.error;
        toastFunction(toastMessage);
    };

    const getToastMessage = () => {
        return currentQuestion!.isAnsweredCorrectly
            ? MockEncouragements.getRandomEncouragements()
            : MockEncouragements.getRandomNegativeEncouragements();
    };

    const handleAnswersClick = (answer: string) => {
        setSelectedAnswer(answer);
        currentQuestion?.setAnswer(answer);
    };

    return (
        <div className="flex flex-col h-screen">
            {!currentQuestion && <LoadingSpinner />}
            {currentQuestion && <TriviaPageLayout
                isLoading={isLoading}
                currentQuestion={currentQuestion}
                currentScore={currentScore}
                currentIndex={currentIndex}
                questions={questions}
                selectedAnswer={selectedAnswer}
                handleAnswersClick={handleAnswersClick}
            />}
            <ToastContainer
                hideProgressBar
                theme={'colored'}
                position="top-center"
                autoClose={1000}
                draggable={true}
            />
        </div>
    );
});
