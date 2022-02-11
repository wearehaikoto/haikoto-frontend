import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
    SingleCard,
    VoteCard,
    HashtagCard,
    LoadingComponent,
    NavigationBarComponent
} from "../../components";
import { gameService } from "../../services";
import { useMergeState, withAuth, ArrayMethods } from "../../utils";

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
                const allCards = createGame.data.leftSwipedCards.concat(
                    createGame.data.rightSwipedCards
                );

                setPlayState({
                    loading_show: false,
                    gameId: createGame.data._id,
                    allCards: allCards,
                    rightSwipedCards: createGame.data.rightSwipedCards,
                    leftSwipedCards: createGame.data.leftSwipedCards,
                    currentCard: allCards.length,
                    gameMode: allCards.length > 0 ? "swipe" : "hashtag"
                });
            }
        } else {
            setPlayState({
                loading_show: true,
                loading_text: `Error: ${createGame.message}.`,
                loading_description: "Redirecting..."
            });

            setTimeout(() => {
                router.push("/dashboard");
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
                const functionNewCards = ArrayMethods.getUnique(
                    [...allCards, ...newCards.data.newCard],
                    "_id"
                );
                setPlayState({
                    allCards: functionNewCards,
                    currentCard: functionNewCards.length,
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

            <div className="relative min-h-screen md:flex">
                <NavigationBarComponent />

                <div className="flex-1 p-10 text-2xl font-bold max-h-screen overflow-y-auto">
                    {loading_show && (
                        <LoadingComponent
                            text={loading_text}
                            description={loading_description}
                        />
                    )}

                    {!loading_show && (
                        <>
                            <section className="my-4 w-full p-5 rounded bg-gray-200 bg-opacity-90">
                                Play Cards
                            </section>

                            {gameMode === "swipe" &&
                                typeof allCards[currentCard - 1] !==
                                    "undefined" && (
                                    <SingleCard
                                        card={allCards[currentCard - 1]}
                                        playState={playState}
                                        setPlayState={setPlayState}
                                    />
                                )}
                            {gameMode === "vote" && (
                                <VoteCard
                                    gameId={gameId}
                                    setPlayState={setPlayState}
                                    rightSwipedCards={rightSwipedCards}
                                />
                            )}
                            {gameMode === "hashtag" && (
                                <HashtagCard
                                    playState={playState}
                                    setPlayState={setPlayState}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default withAuth(playCards);
