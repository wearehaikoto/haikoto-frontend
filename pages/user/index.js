import React from "react";
import Head from "next/head";
import Link from "next/link";

import { gameService } from "../../services";
import { currentUser, withAuth } from "../../utils";

function Index() {
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
            <Head>
                <title>{user.codeName.toUpperCase()} - Haikoto</title>
            </Head>

            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-1 lg:px-20 text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        Hello <b className="text-blue-600">{user.codeName}</b>
                    </h1>

                    <p className="text-lg md:text-xl lg:text-2xl">
                        You are logged in!
                    </p>

                    <div className="my-5 landscape:my-0 landscape:lg:my-5" />

                    {/* Login | Signup Buttons */}
                    <div className="flex flex-col items-center justify-center w-full">
                        {showPlayButton ? (
                            <Link href="/play">
                                <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 my-2 min-w-max w-2/4 rounded-full">
                                    Play Cards
                                </a>
                            </Link>
                        ) : (
                            <a className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 my-2 min-w-max w-2/4 rounded-full cursor-not-allowed">
                                No new Card
                            </a>
                        )}
                        <Link href="/user/about-me">
                            <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 my-2 min-w-max w-2/4 rounded-full">
                                About Me
                            </a>
                        </Link>
                        {user.role === "admin" && (
                            <>
                                <Link href="/card/new">
                                    <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 my-2 min-w-max w-2/4 rounded-full">
                                        Create Card
                                    </a>
                                </Link>
                                <Link href={`/card/all`}>
                                    <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 my-2 min-w-max w-2/4 rounded-full">
                                        Manage Cards
                                    </a>
                                </Link>
                                <Link href={`/users/manage`}>
                                    <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 my-2 min-w-max w-2/4 rounded-full">
                                        Manage Users
                                    </a>
                                </Link>
                            </>
                        )}
                        <a
                            href="https://hexa-mypd.herokuapp.com/app.html"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 my-2 min-w-max w-2/4 rounded-full"
                        >
                            Use &mdash; Hexa
                        </a>
                        {user.role === "admin" && (
                            <a
                                href="https://hexa-mypd.herokuapp.com/train.html"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 my-2 min-w-max w-2/4 rounded-full"
                            >
                                Train &mdash; Hexa
                            </a>
                        )}
                        <Link href="/logout">
                            <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 my-2 min-w-max w-2/4 rounded-full">
                                Logout
                            </a>
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}

export default withAuth(Index);
