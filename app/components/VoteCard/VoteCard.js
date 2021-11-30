import React from "react";
import Image from "next/image";
import { useKeyPressEvent } from "react-use";

import { gameService } from "../../services";
import { useMergeState, ArrayMethods, EloRatingAlgorithm } from "../../utils";
import { LoadingImagePlacepholder } from "../../assets";

function VoteCard({ gameId, yesCards, setPlayState }) {
    const [voteCardState, setVoteCardState] = useMergeState({
        tempYesCards: yesCards.slice(1),
        newYesCard: yesCards[0],
        voteRandomIndex: ArrayMethods.getRandomIndex(yesCards.slice(1))
    });

    const { tempYesCards, newYesCard, voteRandomIndex } = voteCardState;

    const handleCardClick = async (cardId) => {
        // End Game Logic Check first
        if (tempYesCards.length <= 1) {
            terminateVote(cardId);
            return;
        }

        // If picked cardID is newYesCard, set tempYesCards to upper half of voteRandomIndex in yesCards
        let functionTempYesCards;
        if (cardId === newYesCard._id) {
            functionTempYesCards = tempYesCards.slice(0, voteRandomIndex);
        } else {
            functionTempYesCards = tempYesCards.slice(voteRandomIndex + 1);
        }

        // Set the new Card in appropriate order, if no card is available in lower/higher of tempYesCards
        if (functionTempYesCards.length <= 1) {
            terminateVote(cardId);
            return;
        }

        setVoteCardState({
            tempYesCards: functionTempYesCards,
            voteRandomIndex: ArrayMethods.getRandomIndex(functionTempYesCards)
        });
    };

    const terminateVote = async (cardId) => {
        // const newYesCardIndexInYesCards = yesCards.findIndex(card => card._id === newYesCard._id);
        const voteRandomIndexCardInYesCards = yesCards.findIndex(
            (card) => card._id === yesCards[voteRandomIndex]._id
        );

        let newlyGeneratedYesCards;

        if (cardId === newYesCard._id) {
            // Insert newYesCard before the index of voteRandomIndex
            newlyGeneratedYesCards = ArrayMethods.insertItem(
                yesCards.slice(1),
                voteRandomIndexCardInYesCards - 1,
                newYesCard
            );
        } else {
            // Insert newYesCard after the index of voteRandomIndex
            newlyGeneratedYesCards = ArrayMethods.insertItem(
                yesCards.slice(1),
                voteRandomIndexCardInYesCards,
                newYesCard
            );
        }

        await gameService.updateYesCards(gameId, {
            cardIds: newlyGeneratedYesCards.map((card) => card._id),
            eloScores: newlyGeneratedYesCards.map((card) => card.eloRating)
        });

        setPlayState({ yesCards: newlyGeneratedYesCards, voteMode: false });
    };

    useKeyPressEvent("ArrowRight", () => {
        handleCardClick(tempYesCards[voteRandomIndex]._id);
    });

    useKeyPressEvent("ArrowLeft", () => {
        handleCardClick(newYesCard._id);
    });

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
                <div
                    className="cursor-pointer"
                    onClick={() => handleCardClick(newYesCard._id)}
                >
                    <div className="h-52 w-52 md:h-[30vw] md:w-[30vw] relative mx-auto">
                        <Image
                            src={newYesCard.cardImage}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={LoadingImagePlacepholder}
                        />
                    </div>
                    <h1 className="font-bold max-w-xs text-[4vh] mx-auto text-center mt-3">
                        {newYesCard.cardTitle}
                    </h1>
                    <p className="text-center text-[4vh]">
                        {newYesCard.cardHashtags.map((hashtag) => (
                            <span
                                key={hashtag}
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-2"
                            >
                                #{hashtag}
                            </span>
                        ))}
                    </p>
                </div>
                <div
                    className="cursor-pointer"
                    onClick={() =>
                        handleCardClick(tempYesCards[voteRandomIndex]._id)
                    }
                >
                    <div className="h-52 w-52 md:h-[30vw] md:w-[30vw] relative mx-auto">
                        <Image
                            src={tempYesCards[voteRandomIndex].cardImage}
                            layout="fill"
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL={LoadingImagePlacepholder}
                        />
                    </div>
                    <h1 className="font-bold max-w-xs text-[4vh] mx-auto text-center mt-3">
                        {tempYesCards[voteRandomIndex].cardTitle}
                        <p className="text-center text-[4vh]">
                            {tempYesCards[voteRandomIndex].cardHashtags.map(
                                (hashtag) => (
                                    <span
                                        key={hashtag}
                                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 my-2"
                                    >
                                        #{hashtag}
                                    </span>
                                )
                            )}
                        </p>
                    </h1>
                </div>
            </div>
        </>
    );
}

export default VoteCard;
