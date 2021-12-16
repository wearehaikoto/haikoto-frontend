import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
    SingleCard,
    VoteCard,
    HashtagCard,
    CardCancelButton,
    LoadingComponent
} from "../../components";
import { gameService } from "../../services";
import { useMergeState, withAuth } from "../../utils";

function playCards() {
    const router = useRouter();

    const [playState, setPlayState] = useMergeState({
        // UI State
        loading_show: true,
        loading_text: "Loading...",
        loading_description: "",

        // Game
        gameId: null,
        allCards: [],
        rightSwipedCards: [],
        leftSwipedCards: [],
        currentCard: 0,
        finalHashTagSwipeMode: false,

        // Mode
        gameMode: "hashtag"
    });

    const {
        loading_show,
        loading_text,
        loading_description,
        gameId,
        allCards,
        rightSwipedCards,
        currentCard,
        gameMode
    } = playState;

    // Create a Game or Continue a game
    React.useEffect(async () => {
        // Create a new Game
        const createGame = await gameService.create();

        if (createGame.success) {
            // Check if we're continuing a game
            if (!createGame.data.continue) {
                // Set GameId and continue play flow
                setPlayState({
                    loading_show: false,
                    gameId: createGame.data._id
                });
            } else {
                setPlayState({
                    loading_show: false,
                    gameId: createGame.data._id,
                    allCards: createGame.data.cards,
                    rightSwipedCards: createGame.data.rightSwipedCards,
                    leftSwipedCards: createGame.data.leftSwipedCards,
                    currentCard: createGame.data.cards.length,
                    gameMode:
                        createGame.data.cards.length > 0 ? "swipe" : "hashtag"
                });
            }
        } else {
            setPlayState({
                loading_show: true,
                loading_text: `Error: ${createGame.message}.`,
                loading_description: "Redirecting..."
            });

            setTimeout(() => {
                router.push("/user");
            }, 2000);
        }
    }, []);

    React.useEffect(async () => {
        if (gameMode === "swipe") {
            // Get new Card based on yes/leftSwiped Hashtags from the Database / Check if the game is over
            const newCards = await gameService.newCard(gameId);

            if (newCards.success) {
                // Add the new Cards to the allCards bucket
                // Update the current Card Number +1 and continue game
                setPlayState({
                    allCards: [...allCards, ...newCards.data.newCard],
                    currentCard: currentCard + 1,
                    loading_show: false
                });
            } else {
                // Out of Cards for the Hashtag, Enter hashTagSwipeMode
                setPlayState({
                    loading_show: false,
                    gameMode: "hashtag"
                });
            }
        }
    }, [gameMode]);

    return (
        <>
            <Head>
                <title>Play Cards - Haikoto</title>
            </Head>

            {!loading_show ? (
                <>
                    {gameMode === "swipe" && typeof allCards[currentCard - 1] !== "undefined" && (
                        <SingleCard
                            card={allCards[currentCard - 1]}
                            playState={playState}
                            setPlayState={setPlayState}
                        />
                    )}
                    {gameMode === "vote" && (
                        <VoteCard
                            gameId={gameId}
                            rightSwipedCards={rightSwipedCards}
                            setPlayState={setPlayState}
                        />
                    )}
                    {gameMode === "hashtag" && (
                        <HashtagCard
                            playState={playState}
                            setPlayState={setPlayState}
                        />
                    )}
                </>
            ) : (
                <LoadingComponent
                    text={loading_text}
                    description={loading_description}
                />
            )}
        </>
    );
}

export default withAuth(playCards);
