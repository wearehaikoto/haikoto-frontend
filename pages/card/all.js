import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { withAuth } from "../../utils";
import { cardService } from "../../services";
import {
    LoadingComponent,
    CardCancelButton,
    NavigationBarComponent
} from "../../components";

function createCard() {
    const router = useRouter();

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [cards, setCards] = React.useState([]);

    React.useEffect(async () => {
        const getMyCards = await cardService.getAll();

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
                router.push("/dashboard");
            }, 2000);
        }
    }, []);

    async function handleDeleteCard(cardId) {
        if (confirm("Are you sure you want to delete this card?")) {
            const deleteCard = await cardService.deleteCard(cardId);

            if (deleteCard.success) {
                setCards(cards.filter((c) => c._id !== cardId));
            } else {
                alert(deleteCard.message);
            }
        }
    }

    return (
        <>
            <Head>
                <title>All Cards - Haikoto</title>
            </Head>

            <div className="relative min-h-screen md:flex">
                <NavigationBarComponent />

                <div className="flex-1 p-10 text-2xl font-bold max-h-screen overflow-y-auto">
                    {loadingState.show && (
                        <LoadingComponent {...loadingState} />
                    )}

                    {!loadingState.show && (
                        <div className="items-center justify-center min-h-screen py-2">
                            <section className="my-4 w-full p-5 rounded bg-gray-200 bg-opacity-90">
                                All Cards
                            </section>

                            <div className="mb-10">
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        <thead className="bg-blue-600">
                                            <tr>
                                                <th className="px-4 py-2 text-xs text-white text-left">
                                                    Card ID
                                                </th>
                                                <th className="px-4 py-2 text-xs text-white text-left">
                                                    Parent
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
                                                            {card.hashtags
                                                                .length === 0
                                                                ? "-----"
                                                                : cards.find(
                                                                      (c) =>
                                                                          card.hashtags.includes(
                                                                              c._id
                                                                          )
                                                                  ).title}
                                                        </td>
                                                        <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                            {card.title}
                                                        </td>
                                                        <td className="border px-4 py-2 text-yellow-600 border-blue-500 font-medium">
                                                            <div className="divide-x-2 divide-neutral-900 divide-double">
                                                                <Link
                                                                    href={`/card/${card._id}`}
                                                                >
                                                                    <a className="px-2">
                                                                        View
                                                                    </a>
                                                                </Link>
                                                                <Link
                                                                    href={`/card/edit/${card._id}`}
                                                                >
                                                                    <a className="px-2">
                                                                        Edit
                                                                    </a>
                                                                </Link>
                                                                <button
                                                                    onClick={() =>
                                                                        handleDeleteCard(
                                                                            card._id
                                                                        )
                                                                    }
                                                                    className="px-2"
                                                                >
                                                                    <a className="text-red-600">
                                                                        Delete
                                                                    </a>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default withAuth(createCard);
