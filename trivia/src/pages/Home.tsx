import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

export const Home = observer(() => {

    const navigate = useNavigate();
    const startClickHandler = () => {
        navigate('./trivia');
    }

    return (
        <div className="p-16 flex flex-col items-center h-screen">
            <div className="text-center mb-4 my-2">
                <p className="text-sky-500 font-sriracha text-2xl">Press the button below to start the trivia</p>
            </div>
            <div className="flex justify-center w-full my-5 mt-auto">
                <button
                    onClick={startClickHandler}
                    className="w-1/3 max-w-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Start
                </button>
            </div>

        </div>
    );
});