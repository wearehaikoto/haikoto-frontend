import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { cardService } from "../../app/services";
import { currentUser, withAuth } from "../../app/utils";
import { LoadingComponent, CardCancelButton } from "../../app/components";

function createCard() {
    const user = currentUser().userData;
    const router = useRouter();

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [cards, setCards] = React.useState([]);

    React.useEffect(async () => {
        const getMyCards = await cardService.getAllByMe();

        if (getMyCards.success) {
            setCards(getMyCards.data);
            setLoadingState({ show: false, text: "" });
        } else {
            setLoadingState({
                show: true,
                text: `Error: ${getMyCards.message}.`,
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
                <title>My Cards - Haikoto</title>
            </Head>

            {!loadingState.show ? (
                <div className="items-center justify-center min-h-screen py-2">
                    <div className="m-10 md:mx-44 h-screen">
                        {/*  <div className="border-black border-2 border-dashed mb-10 p-4 py-16"> */}
                        <div className="mb-4 p-2">
                            <h1 className="text-center text-xl md:text-3xl">
                                My Cards
                            </h1>
                        </div>

                        <div className="mb-10 p-4 py-16">
                            <div className="p-4 overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="bg-blue-600">
                                        <tr>
                                            <th className="px-4 py-2 text-xs text-white text-left">
                                                Card ID
                                            </th>
                                            <th className="px-4 py-2 text-xs text-white text-left">
                                                Card Title
                                            </th>
                                            <th className="px-4 py-2 text-xs text-white text-left" />
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {cards.map((card) => {
                                            return (
                                                <tr key={card._id}>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        {card._id}
                                                    </td>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        {card.cardTitle}
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

export default withAuth(createCard);
