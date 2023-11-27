import { observer } from "mobx-react-lite";

export interface RenderButtonProps {
    answer: string,
    isCorrect: boolean,
    isSelected: boolean,
    handleAnswersClick: (answer: string) => void
}

export const AnswerButton: React.FC<RenderButtonProps> = observer(({ answer, isCorrect, isSelected, handleAnswersClick }) => {

    let buttonClass = "font-sriracha m-3 text-2xl rounded-full w-12";

    if (isSelected) {
        buttonClass += isCorrect ? ` bg-green-500` : ` bg-red-500`;
    } else {
        buttonClass += ` bg-primary`;
    }
    console.log("isCorrect", isCorrect);
    return (
        <button
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={() => handleAnswersClick(answer)}
            className={`${buttonClass}`}>
            {answer}
        </button>
    );
});
