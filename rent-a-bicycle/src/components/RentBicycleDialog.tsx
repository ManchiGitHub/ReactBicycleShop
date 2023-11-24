import { useEffect, useState } from 'react';
import {
    Modal,
    Ripple,
    initTE,
} from "tw-elements";
import { IBicycle } from '../store/models/Bicycle';

interface RentBicycleDialogProps {
    bicycles: IBicycle[],
    onRent: (bicycle: IBicycle) => void;
}

export const RentBicycleDialog: React.FC<RentBicycleDialogProps> = ({ bicycles, onRent }) => {
    console.log("bicycles:", bicycles.length);
    useEffect(() => {
        initTE({ Modal, Ripple });
    }, [])

    const handleItemClick = (bicycle: IBicycle) => {
        const modalTrigger = document.getElementById('rentBicycleTrigger');
        if (modalTrigger) {
            onRent(bicycle);
            // modalTrigger.click();
        } else {
            console.error('Modal trigger not found');
        }
    }

    return (
        <div
            data-te-modal-init
            className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="rentBicycleModel"
            tabIndex={-1}
            aria-labelledby="exampleModalScrollableLabel"
            aria-hidden="true">
            <div
                data-te-modal-dialog-ref
                className="pointer-events-none relative h-[calc(100%-1rem)] w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
                <div
                    className="pointer-events-auto relative flex max-h-[100%] w-full flex-col overflow-hidden rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                        <h5
                            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                            id="exampleModalScrollableLabel">
                            Select a bicycle
                        </h5>
                        <button
                            type="button"
                            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                            data-te-modal-dismiss
                            aria-label="Close">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="relative overflow-y-auto">
                        <ul>
                            {bicycles.map(bicycle => (
                                <li
                                    key={bicycle.id}
                                    onClick={() => handleItemClick(bicycle)}
                                    className='p-4 mx-1 hover:bg-sky-100 cursor-pointer w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50'>
                                    {bicycle.id} - {bicycle.location}
                                </li>
                            ))}
                        </ul>
                        <div id="rentBicycleTrigger" data-te-toggle="modal" data-te-target="#rentBicycleModel" style={{ display: 'none' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}