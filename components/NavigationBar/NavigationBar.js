import React from "react";
import Link from "next/link";

import { currentUser } from "../../utils";
import { gameService } from "../../services";

const NavigationBar = () => {
    const [isMobileNavExpanded, setIsMobileNavExpanded] = React.useState(false);

    const user = currentUser().userData;

    const [showPlayButton, setShowPlayButton] = React.useState(false);

    React.useEffect(async () => {
        const checkIfNewCardForGame = await gameService.checkIfNewCardForGame();
        if (checkIfNewCardForGame.success) {
            setShowPlayButton(checkIfNewCardForGame.data);
        }
    }, []);

    return (
        <>
            <div className="bg-gray-800 text-white flex justify-between md:hidden">
                <img
                    src="/assets/images/logo-icon.svg"
                    className="w-8 h-8 m-3"
                    alt="Logo"
                />
                <Link href="/dashboard">
                    <a className="block p-4 text-white font-bold">Haikoto</a>
                </Link>
                <button
                    className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700"
                    onClick={() => setIsMobileNavExpanded(!isMobileNavExpanded)}
                >
                    <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            <div
                className={[
                    "sidebar bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out max-h-screen overflow-y-auto",
                    !isMobileNavExpanded && "-translate-x-full"
                ].join(" ")}
            >
                <Link href="/dashboard">
                    <a className="text-white flex items-center space-x-2 px-4">
                        <img
                            src="/assets/images/logo-icon.svg"
                            className="w-8 h-8"
                            alt="Logo"
                        />
                        <span className="text-2xl font-extrabold">Haikoto</span>
                    </a>
                </Link>

                <nav>
                    <Link href="/dashboard">
                        <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                            Dashboard
                        </a>
                    </Link>

                    {showPlayButton ? (
                        <Link href="/play">
                            <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                                Play Cards
                            </a>
                        </Link>
                    ) : (
                        <span className="block py-2.5 px-4 rounded transition duration-200 opacity-40 hover:text-white">
                            No new Card
                        </span>
                    )}

                    {!user.organisation && (
                        <Link href="/dashboard/about-me">
                            <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                                About Me
                            </a>
                        </Link>
                    )}

                    {user.role === "admin" && (
                        <>
                            <span className="block py-2.5 px-4 text-xs opacity-40 uppercase border-y-[0.5px] my-2">
                                Admin
                            </span>

                            <Link href="/card/new">
                                <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                                    Add Card
                                </a>
                            </Link>

                            <Link href="/card/all">
                                <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                                    Manage Cards
                                </a>
                            </Link>

                            <Link href="/users/manage">
                                <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                                    Manage Users
                                </a>
                            </Link>

                            <Link href="/organisations/new">
                                <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                                    Add Organisation
                                </a>
                            </Link>

                            <Link href="/organisations/manage">
                                <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                                    Manage Organisations
                                </a>
                            </Link>

                            <span className="block py-2.5 px-4 text-xs opacity-40 uppercase border-y-[0.5px] my-2">
                                In Preview
                            </span>

                            <a
                                href="https://hexa-mypd.herokuapp.com/app.html"
                                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                            >
                                Use Hexa
                            </a>

                            <a
                                href="https://hexa-mypd.herokuapp.com/train.html"
                                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
                            >
                                Train Hexa
                            </a>
                        </>
                    )}

                    <span className="block py-2.5 px-4 text-xs opacity-40 uppercase border-y-[0.5px] my-2" />

                    <Link href="/logout">
                        <a className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
                            Logout
                        </a>
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default NavigationBar;
