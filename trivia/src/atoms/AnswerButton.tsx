import { observer } from "mobx-react-lite";

export interface RenderButtonProps {
    answer: string,
    isCorrect: boolean,
    isSelected: boolean,
    handleAnswersClick: (answer: string) => void
}

export const AnswerButton: React.FC<RenderButtonProps> = observer(({ answer, isCorrect, isSelected, handleAnswersClick }) => {

    let buttonClass = "font-sriracha m-3 text-2xl rounded-full px-12 py-3";

    if (isSelected) {
        buttonClass += isCorrect ? ` bg-green-500` : ` bg-red-500`;
    } else {
        buttonClass += ` bg-primary`;
    }

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
