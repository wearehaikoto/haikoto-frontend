import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { gameService } from "../../services";
import { currentUser, withAuth } from "../../utils";
import { LoadingComponent, NavigationBarComponent } from "../../components";

const AboutMe = () => {
    const router = useRouter();
    const user = currentUser().userData;

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [myGame, setMyGame] = React.useState(null);

    React.useEffect(async () => {
        const getAllGamesByMe = await gameService.getAllByMe();

        if (getAllGamesByMe.success) {
            setMyGame(getAllGamesByMe.data);
            setLoadingState({ show: false, text: "" });
        } else {
            setLoadingState({
                show: true,
                text: `Error: ${getAllGamesByMe.message}.`,
                description: "Redirecting..."
            });

            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);
        }
    }, []);

    return (
        <>
            <Head>
                <title>About @{user.codeName} - Haikoto</title>
            </Head>

            <div className="relative min-h-screen md:flex">
                <NavigationBarComponent />

                <div className="flex-1 p-10 text-2xl font-bold max-h-screen overflow-y-auto">
                    {loadingState.show && (
                        <LoadingComponent {...loadingState} />
                    )}

                    {!loadingState.show && (
                        <div className="items-center justify-center py-2">
                            <section className="my-4 w-full p-5 rounded bg-gray-200 bg-opacity-90">
                                About Me
                            </section>

                            {(() => {
                                const allCards = myGame.rightSwipedCards.concat(
                                    myGame.leftSwipedCards
                                );
                                const allHashtags =
                                    myGame.rightSwipedHashtags.concat(
                                        myGame.leftSwipedHashtags
                                    );

                                if (
                                    allCards.length == 0 &&
                                    allHashtags.length == 0
                                ) {
                                    return (
                                        <section className="my-4 w-full p-5 rounded bg-gray-200 bg-opacity-90">
                                            <h2 className="text-2xl font-bold">
                                                You haven't built up a rank yet
                                                :(
                                            </h2>
                                            <p className="text-lg">
                                                Go and play with some cards!
                                            </p>
                                        </section>
                                    );
                                }

                                return (
                                    <div className="overflow-x-auto">
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
                                                            <React.Fragment
                                                                key={id}
                                                            >
                                                                <h1 className="text-2xl font-bold my-3">
                                                                    {
                                                                        hashtag.title
                                                                    }{" "}
                                                                    -{" "}
                                                                    {myGame.rightSwipedHashtags
                                                                        .map(
                                                                            (
                                                                                hashtag
                                                                            ) =>
                                                                                hashtag._id
                                                                        )
                                                                        .includes(
                                                                            hashtag._id
                                                                        )
                                                                        ? "✅"
                                                                        : "❌"}
                                                                </h1>

                                                                {allCards
                                                                    .filter(
                                                                        (
                                                                            card
                                                                        ) =>
                                                                            card.hashtags
                                                                                .map(
                                                                                    (
                                                                                        h
                                                                                    ) =>
                                                                                        h._id
                                                                                )
                                                                                .includes(
                                                                                    hashtag._id
                                                                                )
                                                                    )
                                                                    .map(
                                                                        (
                                                                            card,
                                                                            index
                                                                        ) => (
                                                                            <tr
                                                                                key={
                                                                                    card._id
                                                                                }
                                                                            >
                                                                                <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                                                    {index +
                                                                                        1}
                                                                                </td>
                                                                                <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                                                    {
                                                                                        card.title
                                                                                    }
                                                                                </td>
                                                                                <td className="border px-4 py-2 border-blue-500 text-center font-medium">
                                                                                    {myGame.rightSwipedCards
                                                                                        .map(
                                                                                            (
                                                                                                card
                                                                                            ) =>
                                                                                                card._id
                                                                                        )
                                                                                        .includes(
                                                                                            card._id
                                                                                        )
                                                                                        ? "✅"
                                                                                        : "❌"}
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
                                                                        )
                                                                    )}
                                                            </React.Fragment>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default withAuth(AboutMe);
