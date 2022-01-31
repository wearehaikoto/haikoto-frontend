import React from "react";
import Image from "next/image";
import { useKeyPressEvent } from "react-use";

import { gameService } from "../../services";
import { LoadingComponent } from "../../components";
import { LoadingImagePlacepholder } from "../../assets";
import { useMergeState, ArrayMethods } from "../../utils";

function VoteCard({ gameId, rightSwipedCards, setPlayState }) {
    const [isLoading, setIsLoading] = React.useState(false);

    const filteredCardsBySameHashtag = rightSwipedCards
        .slice(1)
        .filter((card) =>
            card.hashtags
                .map((h) => h._id)
                .every((hId) => {
                    return rightSwipedCards[0].hashtags
                        .map((h) => h._id)
                        .includes(hId);
                })
        );

    const [voteCardState, setVoteCardState] = useMergeState({
        tempRightSwipedCards: filteredCardsBySameHashtag,
        newRightSwipedCard: rightSwipedCards[0],
        voteRandomIndex: ArrayMethods.getRandomIndex(filteredCardsBySameHashtag)
    });

    const { tempRightSwipedCards, newRightSwipedCard, voteRandomIndex } =
        voteCardState;

    React.useEffect(() => {
        if (typeof tempRightSwipedCards[voteRandomIndex] === "undefined") {
            setPlayState({ gameMode: "swipe" });
        }
    });

    const handleCardClick = async (cardId) => {
        setIsLoading(true);

        // If picked cardID is newRightSwipedCard, set tempRightSwipedCards to upper half of voteRandomIndex in rightSwipedCards
        let functionTempRightSwipedCards;
        if (cardId === newRightSwipedCard._id) {
            functionTempRightSwipedCards = tempRightSwipedCards.slice(
                0,
                voteRandomIndex
            );
        } else {
            functionTempRightSwipedCards = tempRightSwipedCards.slice(
                voteRandomIndex + 1
            );
        }

        // Set the new Card in appropriate order, if leftSwiped card is available in lower/higher of tempRightSwipedCards
        if (functionTempRightSwipedCards.length <= 0) {
            await terminateVote(cardId);
            return;
        }

        setVoteCardState({
            tempRightSwipedCards: functionTempRightSwipedCards,
            voteRandomIndex: ArrayMethods.getRandomIndex(
                functionTempRightSwipedCards
            )
        });

        setIsLoading(false);
    };

    const terminateVote = async (cardId) => {
        // const newRightSwipedCardIndexInRightSwipedCards = rightSwipedCards.findIndex(card => card._id === newRightSwipedCard._id);
        const voteRandomIndexCardInRightSwipedCards = rightSwipedCards
            .slice(1)
            .findIndex(
                (card) => card._id === tempRightSwipedCards[voteRandomIndex]._id
            );

        let newlyGeneratedRightSwipedCards;

        if (cardId === newRightSwipedCard._id) {
            // Insert newRightSwipedCard before the index of voteRandomIndex
            newlyGeneratedRightSwipedCards = ArrayMethods.insertItem(
                rightSwipedCards.slice(1),
                voteRandomIndexCardInRightSwipedCards,
                newRightSwipedCard
            );
        } else {
            // Insert newRightSwipedCard after the index of voteRandomIndex
            newlyGeneratedRightSwipedCards = ArrayMethods.insertItem(
                rightSwipedCards.slice(1),
                voteRandomIndexCardInRightSwipedCards + 1,
                newRightSwipedCard
            );
        }

        await gameService.updateRightSwipedCards(gameId, {
            cardIds: newlyGeneratedRightSwipedCards.map((card) => card._id),
            eloScores: newlyGeneratedRightSwipedCards.map(
                (card) => card.eloRating
            )
        });

        setPlayState({
            rightSwipedCards: newlyGeneratedRightSwipedCards,
            gameMode: "swipe"
        });
    };

    useKeyPressEvent("ArrowRight", () => {
        !isLoading &&
            handleCardClick(tempRightSwipedCards[voteRandomIndex]._id);
    });

    useKeyPressEvent("ArrowLeft", () => {
        !isLoading && handleCardClick(newRightSwipedCard._id);
    });

    return (
        <>
            {!isLoading && filteredCardsBySameHashtag.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
                    <div
                        className="cursor-pointer"
                        onClick={() => handleCardClick(newRightSwipedCard._id)}
                    >
                        <div className="h-52 w-52 md:h-[30vw] md:w-[30vw] relative mx-auto">
                            <Image
                                src={newRightSwipedCard.image}
                                layout="fill"
                                objectFit="cover"
                                placeholder="blur"
                                blurDataURL={LoadingImagePlacepholder}
                            />
                        </div>
                        <h1 className="font-bold max-w-xs text-[4vh] mx-auto text-center mt-3">
                            {newRightSwipedCard.title}
                        </h1>
                        <p className="text-center text-[4vh]">
                            {newRightSwipedCard.hashtags.map((hashtag) => (
                                <span
                                    key={hashtag._id}
                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-2"
                                >
                                    #{hashtag.title}
                                </span>
                            ))}
                        </p>
                    </div>

                    <div
                        className="cursor-pointer"
                        onClick={() =>
                            handleCardClick(
                                tempRightSwipedCards[voteRandomIndex]._id
                            )
                        }
                    >
                        <div className="h-52 w-52 md:h-[30vw] md:w-[30vw] relative mx-auto">
                            <Image
                                src={
                                    tempRightSwipedCards[voteRandomIndex].image
                                }
                                layout="fill"
                                objectFit="cover"
                                placeholder="blur"
                                blurDataURL={LoadingImagePlacepholder}
                            />
                        </div>
                        <h1 className="font-bold max-w-xs text-[4vh] mx-auto text-center mt-3">
                            {tempRightSwipedCards[voteRandomIndex].title}
                            <p className="text-center text-[4vh]">
                                {tempRightSwipedCards[
                                    voteRandomIndex
                                ].hashtags.map((hashtag) => (
                                    <span
                                        key={hashtag._id}
                                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-2"
                                    >
                                        #{hashtag.title}
                                    </span>
                                ))}
                            </p>
                        </h1>
                    </div>
                </div>
            ) : (
                <LoadingComponent />
            )}
        </>
    );
}

export default VoteCard;
