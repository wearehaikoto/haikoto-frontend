import React from "react";
import Image from "next/image";

import { gameService } from "../../services";
import { ArrayMethods, EloRatingAlgorithm } from "../../utils";
import { LoadingImagePlacepholder } from "../../assets";

function VoteCard({ gameId, yesCards, setYesCards, setVoteMode }) {

  const yesCardsRef = React.useRef(yesCards);

  const [currentVote, setCurrentVote] = React.useState(1);
  const [newYesCard, setNewYesCard] = React.useState(yesCards[0]);

  const handleCardClick = async (cardId) => {
    // Scroll to top (good UX)
    window.scrollTo(0, 0);

    let breakVoteLoop = false;

    // Get Index of newyescard from yesCardsRef.current
    const newYesCardIndexInRef = yesCardsRef.current.findIndex(card => card._id === newYesCard._id);

    // Check if picked ID is not newYesCard, Swap positions
    if (cardId === yesCardsRef.current[currentVote]._id) {
      // Calculate new eloRatings of winner card and loser card and add it to the yesCardsRef.current
      yesCardsRef.current[currentVote].eloRating = EloRatingAlgorithm.getNewRating(yesCardsRef.current[currentVote].eloRating, yesCardsRef.current[newYesCardIndexInRef].eloRating, 1);
      yesCardsRef.current[newYesCardIndexInRef].eloRating = EloRatingAlgorithm.getNewRating(yesCardsRef.current[newYesCardIndexInRef].eloRating, yesCardsRef.current[currentVote].eloRating, 0);

      yesCardsRef.current = ArrayMethods.swapArrayValues(yesCardsRef.current, newYesCardIndexInRef, currentVote);
      setNewYesCard(yesCardsRef.current[currentVote]);
    }

    // Check if picked ID is newYesCard
    if (cardId === newYesCard._id) {
      // Calculate new eloRatings of winner card and loser card and add it to the yesCardsRef.current 
      yesCardsRef.current[newYesCardIndexInRef].eloRating = EloRatingAlgorithm.getNewRating(yesCardsRef.current[newYesCardIndexInRef].eloRating, yesCardsRef.current[currentVote].eloRating, 1);
      yesCardsRef.current[currentVote].eloRating = EloRatingAlgorithm.getNewRating(yesCardsRef.current[currentVote].eloRating, yesCardsRef.current[newYesCardIndexInRef].eloRating, 0);

      breakVoteLoop = true;
    }

    // Update Yes Cards in the Backend
    await gameService.updateYesCards(gameId, { cardIds: yesCardsRef.current.map(card => card._id), eloScores: yesCardsRef.current.map(card => card.eloRating) });

    // Update Yes Cards in Parent Component
    setYesCards(yesCardsRef.current);

    // If breakVoteLoop is true, set voteMode to false
    if (breakVoteLoop) setVoteMode(false);

    // Check if current Vote Card is equal to number of Cards
    if (yesCardsRef.current.length > (currentVote + 1)) {
      // Update the current Vote Card Number + 1 and continue vote
      setCurrentVote(currentVote + 1);
      return;
    }

    setVoteMode(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
        <div className="cursor-pointer" onClick={() => handleCardClick(newYesCard._id)} >
          <div className="h-52 w-52 md:h-[30vw] md:w-[30vw] relative mx-auto">
            <Image
              src={newYesCard.cardImage}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={LoadingImagePlacepholder}
            />
          </div>
          <h1 className="font-bold text-2xl md:text-4xl text-center m-4 md:m-3">
            {newYesCard.cardTitle}
          </h1>
        </div>
        <div className="cursor-pointer" onClick={() => handleCardClick(yesCards[currentVote]._id)} >
          <div className="h-52 w-52 md:h-[30vw] md:w-[30vw] relative mx-auto">
            <Image
              src={yesCards[currentVote].cardImage}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              blurDataURL={LoadingImagePlacepholder}
            />
          </div>
          <h1 className="font-bold text-2xl md:text-4xl text-center m-4 md:m-3">
            {yesCards[currentVote].cardTitle}
          </h1>
        </div>
      </div>

    </>
  );
}

export default VoteCard;
