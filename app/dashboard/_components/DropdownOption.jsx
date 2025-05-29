import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiOutlineTrash } from "react-icons/hi2";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function DropdownOption({ children, handleOnDelete }) {
    const [openAlert, setOpenAlert] = useState(false);

    return (
        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 rounded-md transition-all duration-200">
                    {children}
                </DropdownMenuTrigger>
                
                <DropdownMenuContent 
                    className="w-48 sm:w-52 md:w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-1"
                    align="end"
                    sideOffset={5}
                >
                    <DropdownMenuItem 
                        onClick={() => setOpenAlert(true)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-300 rounded-md cursor-pointer transition-colors duration-200 focus:bg-red-50 dark:focus:bg-red-900/20 focus:outline-none"
                    >
                        <HiOutlineTrash className="w-4 h-4 flex-shrink-0" />
                        <span className="font-medium">Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent className="w-[90vw] max-w-md sm:max-w-lg mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
                    <AlertDialogHeader className="space-y-3 p-6 pb-4">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full">
                            <HiOutlineTrash className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        
                        <AlertDialogTitle className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        
                        <AlertDialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                            This action cannot be undone. This will permanently delete your course and remove all associated data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    
                    <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 p-6 pt-4">
                        <AlertDialogCancel 
                            onClick={() => setOpenAlert(false)}
                            className="w-full sm:w-auto order-2 sm:order-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
                        >
                            Cancel
                        </AlertDialogCancel>
                        
                        <AlertDialogAction 
                            onClick={() => {
                                handleOnDelete();
                                setOpenAlert(false);
                            }}
                            className="w-full sm:w-auto order-1 sm:order-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 shadow-sm"
                        >
                            Delete Course
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default DropdownOption