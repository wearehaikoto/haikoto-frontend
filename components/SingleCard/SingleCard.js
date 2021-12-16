import React from "react";
import Image from "next/image";
import { useKeyPressEvent } from "react-use";
import { useSwipeable } from "react-swipeable";

import { gameService } from "../../services";
import { LoadingImagePlacepholder } from "../../assets";
import { CardYesButton, CardNoButton } from "../../components";

function SingleCard({ card, playState, setPlayState }) {
    // If setPlayState, i.e Component is used from a Game, activate swipe and keyboard handlers
    if (setPlayState) {
        // Key Press Event Handlers
        useKeyPressEvent("ArrowRight", () => {
            handleAnswerClick(card._id, true);
        });
        useKeyPressEvent("ArrowLeft", () => {
            handleAnswerClick(card._id, false);
        });

        // Swipe Event Handlers
        const reactSwipeableHandler = useSwipeable({
            onSwipedLeft: () => {
                handleAnswerClick(card._id, false);
            },
            onSwipedRight: () => {
                handleAnswerClick(card._id, true);
            }
        });
    }

    const handleAnswerClick = async (cardId, answer) => {
        // Show loading screen for api callss to process
        setPlayState({ loading_show: true });

        // Get the Card Data
        const card = playState.allCards.find((card) => card._id === cardId);

        // If answer is true add to rightSwipedCards bucket
        if (answer) {
            playState.rightSwipedCards.unshift(card);
        } else {
            playState.leftSwipedCards.unshift(card);
            // Add new No Card to DB
            await gameService.addLeftSwipedCard(playState.gameId, { cardId });
        }

        setPlayState({
            // Close the loading screen, api calls would be done now
            loading_show: false,

            // Cards
            rightSwipedCards: playState.rightSwipedCards,
            leftSwipedCards: playState.leftSwipedCards
        });

        // If the answer is true and number of cards in rightSwipedCards bucket is greater than 2
        if (answer && playState.rightSwipedCards.length >= 2) {
            // Enter Vote mode to rank rightSwipedCards
            setPlayState({ gameMode: "vote" });
        }

        // Get new Card based on yes/leftSwiped Cards from the Database / Check if the game is over
        const newCards = await gameService.newCard(playState.gameId);
        if (newCards.success) {
            // Add the new Cards to the allCards bucket
            // Update the current Card Number +1 and continue game
            setPlayState({
                allCards: [...playState.allCards, ...newCards.data.newCard],
                currentCard: playState.currentCard + 1
            });
            return;
        }

        // Last Card Vote
        if (
            playState.allCards.length === playState.currentCard &&
            playState.rightSwipedCards.length >= 2 &&
            answer
        ) {
            // If the current Card is equal to number of Cards and answer is true
            // Enter Vote mode to rank rightSwipedCards
            setPlayState({ gameMode: "vote" });
            return;
        }

        if (!newCards.success) {
            // Out of Cards for the Hashtag, Enter hashTagSwipeMode
            setPlayState({ gameMode: "hashtag" });
            return;
        }
    };

    return (
        <div {...reactSwipeableHandler}>
            {/* Potrait */}
            <div className="mt-2 mb-5 p-4 hidden portrait:block">
                <div className="h-52 w-52 lg:h-80 lg:w-80 relative mx-auto">
                    <Image
                        src={card.image}
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={LoadingImagePlacepholder}
                    />
                </div>

                <div className="mt-4 mb-8">
                    <h1 className="font-bold md:max-w-xs text-[5vh] mx-auto text-center">
                        {card.title}
                    </h1>
                    <p className="text-center text-[4vh]">
                        {card.hashtags.map((hashtag) => (
                            <span
                                key={hashtag._id}
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                            >
                                #{hashtag.title}
                            </span>
                        ))}
                    </p>
                </div>

                {setPlayState && (
                    <div className="flex justify-center mb-4">
                        <CardNoButton
                            onClickHandler={() =>
                                handleAnswerClick(card._id, false)
                            }
                        />
                        <CardYesButton
                            onClickHandler={(e) =>
                                handleAnswerClick(card._id, true)
                            }
                        />
                    </div>
                )}
            </div>

            {/* Landscape View */}
            <div className="p-4 hidden landscape:block">
                <div className="grid grid-cols-4">
                    {setPlayState && (
                        <div className="flex justify-center my-auto">
                            <CardNoButton
                                onClickHandler={() =>
                                    handleAnswerClick(card._id, false)
                                }
                            />
                        </div>
                    )}
                    <div
                        className={
                            handleAnswerClick ? "col-span-2" : "col-span-full"
                        }
                    >
                        <div className="h-52 w-52 lg:h-80 lg:w-80 relative mx-auto">
                            <Image
                                src={card.image}
                                layout="fill"
                                objectFit="cover"
                                placeholder="blur"
                                blurDataURL={LoadingImagePlacepholder}
                            />
                        </div>

                        <div className="mt-4 w-full">
                            <h1 className="font-bold md:max-w-xs text-[5vh] mx-auto text-center">
                                {card.title}
                            </h1>
                            <p className="text-center text-[4vh]">
                                {card.hashtags.map((hashtag) => (
                                    <span
                                        key={hashtag._id}
                                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                                    >
                                        #{hashtag.title}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                    {setPlayState && (
                        <div className="flex justify-center my-auto">
                            <CardYesButton
                                onClickHandler={(e) =>
                                    handleAnswerClick(card._id, true)
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SingleCard;
