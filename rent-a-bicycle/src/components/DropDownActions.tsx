import { observer } from "mobx-react-lite";

interface Action {
    label: string;
    action: () => void;
}

interface ActionDropDownProps {
    actions: Action[];
}

export const ActionDropDown: React.FC<ActionDropDownProps> = observer(({ actions }) => {
    return (
        <div className="relative mx-3" data-te-dropdown-ref>
            <button
                className="flex items-center whitespace-nowrap rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none"
                type="button"
                id="dropdownMenuSmallButton"
                data-te-dropdown-toggle-ref
                aria-expanded="false"
                data-te-ripple-init
                data-te-ripple-color="light">
                Actions
                <span className="ml-2 w-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd" />
                    </svg>
                </span>
            </button>
            <ul
                className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                aria-labelledby="dropdownMenuSmallButton"
                data-te-dropdown-menu-ref>
                {actions.map((action, index) => (
                    <li key={index}>
                        <button
                            onClick={action.action}
                            className="block w-full whitespace-nowrap bg-transparent px-10 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600">
                            {action.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
})

// < li >
// <button
//     onClick={turnLightsOn}
//     className="block w-full whitespace-nowrap bg-transparent px-10 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
// >Turn light on
// </button>
//             </li >
// <li>
//     <button
//         onClick={tunrLightsOff}
//         className="block w-full whitespace-nowrap bg-transparent px-10 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
//     >Turn light off
//     </button>
// </li>