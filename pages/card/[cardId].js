import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { cardService } from "../../app/services";
import { currentUser, withAuth } from "../../app/utils";
import {
    LoadingComponent,
    SingleCard,
    CardCancelButton
} from "../../app/components";

function getCard() {
    const user = currentUser().userData;
    const router = useRouter();

    const { cardId } = router.query;

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [card, setCard] = React.useState(null);

    React.useEffect(async () => {
        if (cardId) {
            const getCard = await cardService.getCard(cardId);

            if (getCard.success) {
                setCard(getCard.data);
                setLoadingState({ show: false, text: "" });
            } else {
                setLoadingState({
                    show: true,
                    text: `Error: ${getCard.message}.`,
                    description: "Redirecting..."
                });

                setTimeout(() => {
                    router.push("/user");
                }, 2000);
            }
        }
    }, [cardId]);

    return (
        <>
            <Head>
                <title>Card - Haikoto</title>
            </Head>

            {!loadingState.show ? (
                <div className="items-center justify-center min-h-screen py-2">
                    <div className="m-10 md:mx-44 h-screen">
                        {/* <div className="border-black border-2 border-dashed mb-4 p-2"> */}
                        <div className="mb-4 p-2">
                            <h1 className="text-center text-xl md:text-3xl">
                                {card.cardTitle}
                            </h1>
                        </div>

                        <SingleCard
                            cardId={card._id}
                            cardImage={card.cardImage}
                            cardTitle={card.cardTitle}
                            cardCategory={card.cardCategory}
                        />

                        <CardCancelButton />
                    </div>
                </div>
            ) : (
                <LoadingComponent {...loadingState} />
            )}
        </>
    );
}

export default withAuth(getCard);
