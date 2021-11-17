import React from "react";
import Image from "next/image";

import { gameService } from "../../services";
import { ArrayMethods } from "../../utils";
import { LoadingImagePlacepholder } from "../../assets";

function VoteCard({ gameId, yesCards, setYesCards, setVoteMode }) {

  const [currentVote, setCurrentVote] = React.useState(1);
  const [newYesCard, setNewYesCard] = React.useState(null);
  const [breakVoteLoop, setBreakVoteLoop] = React.useState(false);

  const handleCardClick = async (cardId) => {
    // Scroll to top (good UX)
    window.scrollTo(0, 0);

    // Check if picked ID is not newYesCard, Swap positions
    if (cardId === yesCards[currentVote]._id) {
      setYesCards(ArrayMethods.swapArrayValues(yesCards, 0, currentVote));
    }

    // Check if picked ID is newYesCard
    if (cardId === newYesCard._id) {
      setBreakVoteLoop(true);
    }

    // Update Yes Cards in the Backend
    await gameService.updateYesCards(gameId, { cardIds: yesCards.map(card => card._id) });

    // If breakVoteLoop is true, set voteMode to false
    if (breakVoteLoop) setVoteMode(false);

    // Check if current Vote Card is equal to number of Cards
    if (yesCards.length > (currentVote + 1)) {
      // Update the current Vote Card Number + 1 and continue vote
      setCurrentVote(currentVote + 1);
      return;
    }

    setVoteMode(false);
  };

  React.useEffect(async () => {
    setNewYesCard(yesCards[0]);
  }, []);

  return (
    <>
      <div className="mt-2 p-4 md:py-16">

        {newYesCard && (
          <div onClick={() => handleCardClick(newYesCard._id)} >
            <div className="flex justify-center">
              <Image
                src={newYesCard.cardImage}
                width={300}
                height={300}
                placeholder="blur"
                blurDataURL={LoadingImagePlacepholder}
              />
            </div>
            <div className="mt-4 mb-8">
              <h1 className="font-bold text-2xl md:text-4xl text-center m-4 md:m-10">
                {newYesCard.cardTitle}
              </h1>
            </div>
          </div>
        )}

        <div onClick={() => handleCardClick(yesCards[currentVote]._id)} >
          <div className="flex justify-center">
            <Image
              src={yesCards[currentVote].cardImage}
              width={300}
              height={300}
              placeholder="blur"
              blurDataURL={LoadingImagePlacepholder}
            />
          </div>
          <div className="mt-4 mb-8">
            <h1 className="font-bold text-2xl md:text-4xl text-center m-4 md:m-10">
              {yesCards[currentVote].cardTitle}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default VoteCard;
