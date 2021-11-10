import React from "react";
import Image from "next/image";
import Head from "next/head";
import { useSwipeable } from "react-swipeable";

import { SingleCard } from "../../app/components";
import { cardService } from "../../app/services";
import { currentUser, withAuth } from "../../app/utils";
import { CardCancelButton, LoadingComponent } from "../../app/components";

function playCards() {
    const user = currentUser();

    const [cards, setCards] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [currentCard, setCurrentCard] = React.useState(1);

    const handleAnswerClick = (cardId, answer) => {
        // Push user Answer and save to answer state
        answers.push({ card: currentCard, _id: cardId, answer });
        setAnswers(answers);

        // Scroll to top so they can see
        window.scrollTo(0, 0);

        // Check if current Card is equal to number of Cards
        if (cards.length > currentCard) {
            // Update the current Card Number +1 and continue game
            setCurrentCard(currentCard + 1);
            return;
        }

        // Game End
        // Set Cards to empty
        setCards([]);
        console.log("GameOver Answers -", answers);
    };

    React.useEffect(async () => {
        // Get the cards for the user
        setCards((await cardService.getAllByMe()).data);
    }, []);

    const reactSwipeableHandler = useSwipeable({
        onSwipedLeft: () => {
            handleAnswerClick(cards[currentCard - 1]._id, false);
        },
        onSwipedRight: () => {
            handleAnswerClick(cards[currentCard - 1]._id, true);
        }
    });

    return (
        <>
            <Head>
                <title>Play Cards - Haikoto</title>
            </Head>

            <div
                {...reactSwipeableHandler}
                className="flex flex-col items-center justify-center min-h-screen py-2"
            >
                {cards.length > 0 ? (
                    <div className="m-8 md:mx-44">
                        <div className="border-black border-2 border-dashed mb-4 p-2">
                            <h1 className="text-center text-xl md:text-3xl">
                                Play Cards
                            </h1>
                        </div>

                        <SingleCard
                            cardId={cards[currentCard - 1]._id}
                            cardImage={cards[currentCard - 1].cardImage}
                            cardTitle={cards[currentCard - 1].cardTitle}
                            cardCategory={cards[currentCard - 1].cardCategory}
                            handleAnswerClick={handleAnswerClick}
                        />

                        <CardCancelButton />
                    </div>
                ) : (
                    <LoadingComponent />
                )}
            </div>
        </>
    );
}

export default withAuth(playCards);
