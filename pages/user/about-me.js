import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { gameService } from "../../services";
import { currentUser, withAuth } from "../../utils";
import { CardCancelButton, LoadingComponent } from "../../components";

function AboutMe() {
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

    return (
        <>
            <Head>
                <title>About @{user.codeName} - Haikoto</title>
            </Head>

            {!loadingState.show ? (
                <div className="items-center justify-center min-h-screen py-2">
                    <div className="m-10 md:mx-44">
                        <div className="mb-4">
                            <h1 className="text-center text-xl md:text-3xl">
                                About Me
                            </h1>
                        </div>

                        {allGamesByMe.map((game) => {

                            const allCards = game.rightSwipedCards.concat(game.leftSwipedCards);
                            const allHashtags = game.rightSwipedHashtags.concat(game.leftSwipedHashtags);

                            return (
                                <div key={game._id}>
                                    <div className="p-4 overflow-x-auto">
                                        <h3 className="text-xl">
                                            Game ID: {game._id}
                                        </h3>
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
                                                {allHashtags.map(
                                                    (hashtag, id) => {
                                                        return (
                                                            <React.Fragment key={id}>
                                                                <h1 className="text-2xl font-bold my-3">
                                                                    {hashtag.title} - {
                                                                        game.rightSwipedHashtags.map((hashtag) => hashtag._id).includes(hashtag._id) ? "✅" : "❌"
                                                                    }
                                                                </h1>

                                                                {allCards.filter((card) => card.hashtags.includes(hashtag._id)).map((card, index) => {
                                                                    return (
                                                                        <tr key={card._id}>
                                                                            <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                                                {index + 1}
                                                                            </td>
                                                                            <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                                                {card.title}
                                                                            </td>
                                                                            <td className="border px-4 py-2 border-blue-500 text-center font-medium">
                                                                                {game.rightSwipedCards.map((card) => card._id).includes(card._id) ? "✅" : "❌"}
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
                                                                })}
                                                            </React.Fragment>
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

export default withAuth(AboutMe);
