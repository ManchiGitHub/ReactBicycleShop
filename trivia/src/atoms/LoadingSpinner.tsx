import { observer } from "mobx-react-lite";

export const LoadingSpinner = observer(() => {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-success inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
            </div>
        </div>
    );
});