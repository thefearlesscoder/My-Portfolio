import React , {useEffect, useState} from "react";
import {Button} from "../components/ui/button"
import { logout } from "@/store/slices/userSlices";
import {useDispatch, useSelector} from 'react-redux';
// import { error } from "console";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FolderGit, History, Home, LayoutGrid, LogOut, MessageCircle, Package, PersonStandingIcon, User2Icon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

const HomePage = () => {
    const [active, setActive] = useState("");
    const { isAuthenticated, error, user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged Out Successfully");
    }

    const navigateTo = useNavigate();

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        console.log(isAuthenticated);
        
        if (isAuthenticated) {
            navigateTo("/login");
        }
    }, [isAuthenticated])

    return(
        <>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background
                    sm:flex z-50 ">
                    <nav className="flex-col items-center gap-4 px-2 sm:py-5">
                        <Link className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full ">
                            <Package className="h-4 w-4 transition-all group-hover:scale-110" />
                            <span className="sr-only"> Dashboard </span>
                        </Link>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link className={`flex h-9 w-9 items-center justify-center rounded-lg 
                                        ${active === "Dasboard"
                                         ? "text-accent-foreground bg-accent"
                                          : "text-muted-foreground"
                                        } transition-colors hover:text-foreground md:h-8 md:w-8`}  
                                        onClick={() => setActive("Dashboard")}
                                    >
                                        <Home className="w-5 h-5" />
                                        <span className="sr-only text-red-400">Dashboard</span>
                                    </Link>
                                    
                                </TooltipTrigger>
                                <TooltipContent side="right">Dashboard</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link className={`flex h-9 w-9 items-center justify-center rounded-lg 
                                        ${active === "Add Project"
                                         ? "text-accent-foreground bg-accent"
                                          : "text-muted-foreground"
                                        } transition-colors hover:text-foreground md:h-8 md:w-8`} 
                                        onClick={() => setActive("Add Project")}
                                    >
                                        <FolderGit className="w-5 h-5" />
                                        <span className="sr-only">Add Project</span>
                                    </Link>
                                    
                                </TooltipTrigger>
                                <TooltipContent side="right">Add Project</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link className={`flex h-9 w-9 items-center justify-center rounded-lg 
                                        ${active === "Add Skills"
                                         ? "text-accent-foreground bg-accent"
                                          : "text-muted-foreground"
                                        } transition-colors hover:text-foreground md:h-8 md:w-8`} 
                                        onClick={() => setActive("Add Skills")}
                                    >
                                        <FolderGit className="w-5 h-5" />
                                        <span className="sr-only">Add Skills</span>
                                    </Link>
                                    
                                </TooltipTrigger>
                                <TooltipContent side="right">Add Skills</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link className={`flex h-9 w-9 items-center justify-center rounded-lg 
                                        ${active === "Add Applications"
                                         ? "text-accent-foreground bg-accent"
                                          : "text-muted-foreground"
                                        } transition-colors hover:text-foreground md:h-8 md:w-8`} 
                                        onClick={() => setActive("Add Applications")}
                                    >
                                        <LayoutGrid className="w-5 h-5" />
                                        <span className="sr-only">Add Applications</span>
                                    </Link>
                                    
                                </TooltipTrigger>
                                <TooltipContent side="right">Add Applications</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link className={`flex h-9 w-9 items-center justify-center rounded-lg 
                                        ${active === "Add Timeline"
                                         ? "text-accent-foreground bg-accent"
                                          : "text-muted-foreground"
                                        } transition-colors hover:text-foreground md:h-8 md:w-8`} 
                                        onClick={() => setActive("Add Timeline")}
                                    >
                                        <History className="w-5 h-5" />
                                        <span className="sr-only">Add Timeline</span>
                                    </Link>
                                    
                                </TooltipTrigger>
                                <TooltipContent side="right">Add Timeline</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link className={`flex h-9 w-9 items-center justify-center rounded-lg 
                                        ${active === "Messages"
                                         ? "text-accent-foreground bg-accent"
                                          : "text-muted-foreground"
                                        } transition-colors hover:text-foreground md:h-8 md:w-8`} 
                                        onClick={() => setActive("Messages")}
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        <span className="sr-only">Messages</span>
                                    </Link>
                                    
                                </TooltipTrigger>
                                <TooltipContent side="right">Messages</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link className={`flex h-9 w-9 items-center justify-center rounded-lg 
                                        ${active === "Account"
                                         ? "text-accent-foreground bg-accent"
                                          : "text-muted-foreground"
                                        } transition-colors hover:text-foreground md:h-8 md:w-8`} 
                                        onClick={() => setActive("Account")}
                                    >
                                        <User2Icon className="w-5 h-5" />
                                        <span className="sr-only">Account</span>
                                    </Link>
                                    
                                </TooltipTrigger>
                                <TooltipContent side="right">Account</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </nav>

                    <nav className="mt-auto flex-col items-center justify-center gap-4 px-2 py-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link className={`flex h-9 w-9 items-center justify-center rounded-lg 
                                        ${active === "Logout"
                                         ? "text-accent-foreground bg-accent"
                                          : "text-muted-foreground"
                                        } transition-colors hover:text-foreground md:h-8 md:w-8`} 
                                         onClick={handleLogout}
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span className="sr-only">Logout</span>
                                    </Link>
                                    
                                </TooltipTrigger>
                                <TooltipContent side="right">Logout</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </nav>
                    </aside>
        </div>
            <header className="sticky top-0 left-0 hidden w-14 flex-col border-r bg-background px-4
        sm:static s:h-auto sm:border-0">
                

        </header>    
        


           
        </>
    )
}

export default HomePage;