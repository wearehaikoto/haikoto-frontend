import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { cardService } from "../../services";
import { withAuth } from "../../utils";
import {
    SingleCard,
    LoadingComponent,
    CardCancelButton,
    NavigationBarComponent
} from "../../components";

function getCard() {
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
                    router.push("/dashboard");
                }, 2000);
            }
        }
    }, [cardId]);

    return (
        <>
            <Head>
                <title>Single Card - Haikoto</title>
            </Head>

            <div className="relative min-h-screen md:flex">
                <NavigationBarComponent />

                <div className="flex-1 p-10 text-2xl font-bold max-h-screen overflow-y-auto">
                    {loadingState.show && (
                        <LoadingComponent {...loadingState} />
                    )}

                    {!loadingState.show && (
                        <div className="items-center justify-center py-2">
                            <div className="mb-4">
                                <h1 className="text-center text-xl md:text-3xl">
                                    {card.title}
                                </h1>
                            </div>

                            <SingleCard card={card} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default withAuth(getCard);
