import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";

import { SingleCard } from "../../app/components";
import { gameService } from "../../app/services";
import { currentUser, withAuth } from "../../app/utils";
import { CardCancelButton, LoadingComponent } from "../../app/components";

function playCards() {
    const user = currentUser();
    const router = useRouter();

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [gameId, setGameId] = React.useState(null);
    const [cards, setCards] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [currentCard, setCurrentCard] = React.useState(1);

    const handleAnswerClick = async (cardId, answer) => {
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

        // Update Loading State
        setLoadingState({ show: true, text: "Generating result..." });

        // Get the result of the game
        const result = await gameService.endGame(gameId, answers);

        console.log("GameOver", "gameId", gameId, "Answers", answers);
    };

    React.useEffect(async () => {
        // Create a new Game
        const createGame = await gameService.create({
            numberOfCards: 2
        });

        if (createGame.success) {
            setGameId(createGame.data._id);
            setCards(createGame.data.cards);
            setLoadingState({ show: false, text: "" });
        } else {
            setLoadingState({
                show: true,
                text: `Error: ${createGame.message}.`,
                description: "Redirecting..."
            });

            setTimeout(() => {
                router.push("/user");
            }, 2000);
        }
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
                {!loadingState.show ? (
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
                    <LoadingComponent {...loadingState} />
                )}
            </div>
        </>
    );
}

export default withAuth(playCards);
