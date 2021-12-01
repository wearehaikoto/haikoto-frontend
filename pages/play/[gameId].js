import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { gameService } from "../../app/services";
import { currentUser, withAuth } from "../../app/utils";
import { CardCancelButton, LoadingComponent } from "../../app/components";

function getGame() {
    const user = currentUser().userData;

    const router = useRouter();
    const { gameId } = router.query;

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [game, setGame] = React.useState(null);

    React.useEffect(async () => {
        if (gameId) {
            const getGame = await gameService.getGame(gameId);

            if (getGame.success) {
                setGame(getGame.data);
                setLoadingState({ show: false, text: "" });
            } else {
                setLoadingState({
                    show: true,
                    text: `Error: ${getGame.message}.`,
                    description: "Redirecting..."
                });

                setTimeout(() => {
                    router.push("/user");
                }, 2000);
            }
        }
    }, [gameId]);

    return (
        <>
            <Head>
                <title>Play Cards Result - Haikoto</title>
            </Head>

            {!loadingState.show ? (
                <div className="items-center justify-center min-h-screen">
                    <div className="m-10 md:mx-44">
                        <div className="mb-4">
                            <h1 className="text-center text-xl md:text-3xl">
                                Game Result - {game._id}
                            </h1>
                        </div>

                        <div className="mb-10">
                            <div className="p-4 overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="bg-blue-600">
                                        <tr>
                                            <th className="px-4 py-2 text-xs text-white text-left">
                                                RankID
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
                                        {game.yesCards.map((card, index) => {
                                            return (
                                                <tr key={card._id}>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        {index + 1}
                                                    </td>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        {card.title}
                                                    </td>
                                                    <td className="border px-4 py-2 border-blue-500 font-medium">
                                                        <span className="text-green-500"> True </span>
                                                    </td>
                                                    <td className="border px-4 py-2 text-yellow-600 border-blue-500 font-medium">
                                                        <Link href={`/card/${card._id}`}><a>View Card</a></Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {game.noCards.map((card, index) => {
                                            return (
                                                <tr key={card._id}>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        {/* {card._id} */}
                                                        {index + 1}
                                                    </td>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        {card.title}
                                                    </td>
                                                    <td className="border px-4 py-2 border-blue-500 font-medium">
                                                        <span className="text-red-500"> False </span>
                                                    </td>
                                                    <td className="border px-4 py-2 text-yellow-600 border-blue-500 font-medium">
                                                        <Link href={`/card/${card._id}`}><a>View Card</a></Link>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <CardCancelButton />
                    </div>
                </div>
            ) : (
                <LoadingComponent {...loadingState} />
            )}
        </>
    );
}

export default withAuth(getGame);
