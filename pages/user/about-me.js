import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { gameService } from "../../app/services";
import { currentUser, withAuth } from "../../app/utils";
import { CardCancelButton, LoadingComponent } from "../../app/components";

function createCard() {
    const user = currentUser().userData;
    const router = useRouter();

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [allGamesByMe, setAllGamesByMe] = React.useState(null);

    React.useEffect(async () => {
        const getAllGamesByMe = await gameService.getAllByMe();

        if (getAllGamesByMe.success) {
            setAllGamesByMe(getAllGamesByMe.data);
            setLoadingState({ show: false, text: "" });
        } else {
            setLoadingState({
                show: true,
                text: `Error: ${getAllGamesByMe.message}.`,
                description: "Redirecting..."
            });

            setTimeout(() => {
                router.push("/user");
            }, 2000);
        }
    }, []);

    console.log(allGamesByMe);

    return (
        <>
            <Head>
                <title>About {user.codeName} - Haikoto</title>
            </Head>

            {!loadingState.show ? (
                <div className="items-center justify-center min-h-screen py-2">
                    <div className="m-10 md:mx-44 h-screen">
                        <div className="mb-4 p-2">
                            <h1 className="text-center text-xl md:text-3xl">
                                About Me
                            </h1>
                        </div>

                        {/* <div className="mb-10 p-4 py-16 h-full">
                            <div className="grid grid-cols-6 justify-items-stretch items-end gap-3 h-2/3 md:px-16">
                                <div className="bg-pink-500 h-[70%]" />
                                <div className="bg-purple-500 h-[80%]" />
                                <div className="bg-green-500 h-[50%]" />
                                <div className="bg-yellow-500 h-[100%]" />
                                <div className="bg-blue-500 h-[30%]" />
                                <div className="bg-indigo-500 h-[60%]" />
                            </div>

                            <div className="text-center mt-5 tracking-wider">
                                <h1 className="text-lg">
                                    <strong className="text-3xl">humble,</strong>{" "}
                                    smart,
                                </h1>
                                <h1 className="text-lg">
                                    happy,{" "}
                                    <strong className="text-3xl">confident,</strong>
                                </h1>
                                <h1 className="text-lg">
                                    <strong className="text-3xl">
                                        problem solver
                                    </strong>
                                </h1>
                            </div>
                        </div> */}

                        {allGamesByMe.map((game) => {
                            return (
                                <div
                                    key={game._id}
                                    className="mb-10 p-4 py-16"
                                >
                                    {/* Game Id */}
                                    <div className="p-4 overflow-x-auto">
                                        <h3 className="text-xl">Game ID: {game._id}</h3>
                                        <table className="table-auto w-full">
                                            <thead className="bg-blue-600">
                                                <tr>
                                                    <th className="px-4 py-2 text-xs text-white text-left">
                                                        Card ID
                                                    </th>
                                                    <th className="px-4 py-2 text-xs text-white text-left">
                                                        Title
                                                    </th>
                                                    <th className="px-4 py-2 text-xs text-white text-left">
                                                        Your Answer
                                                    </th>
                                                    <th className="px-4 py-2 text-xs text-white text-left" />
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {game.cards.map(
                                                    (card, index) => {
                                                        return (
                                                            <tr key={card._id}>
                                                                <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                                    {card._id}
                                                                </td>
                                                                <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                                    {
                                                                        card.cardTitle
                                                                    }
                                                                </td>
                                                                <td className="border px-4 py-2 border-blue-500 font-medium">
                                                                    {game
                                                                        .answers[
                                                                        index
                                                                    ] ? (
                                                                        <span className="text-green-500">
                                                                            {" "}
                                                                            True{" "}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-red-500">
                                                                            {" "}
                                                                            False{" "}
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="border px-4 py-2 text-yellow-600 border-blue-500 font-medium">
                                                                    <Link
                                                                        href={`/card/${card._id}`}
                                                                    >
                                                                        <a>
                                                                            View
                                                                            Card
                                                                        </a>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            );
                        })}

                        <CardCancelButton />
                    </div>
                </div>
            ) : (
                <LoadingComponent {...loadingState} />
            )}
        </>
    );
}

export default withAuth(createCard);
