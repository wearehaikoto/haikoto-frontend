import Image from "next/image";
import { LoadingImagePlacepholder } from "../../assets";

import { cardService } from "../../services";

function VoteCard({ voteCards, setVoteCards }) {

  async function handleCardClick(position) {

    let winner, loser;
    if (position === 0) winner = voteCards[0]; loser = voteCards[1];
    if (position === 1) winner = voteCards[1]; loser = voteCards[0];

    // Build the payload with the winner and loser card ids
    const data = { winner: winner._id, loser: loser._id }

    // Call the API to vote for the card
    const updateEloRating = cardService.updateEloRating(data);
    
    // Update the votecards array to continue game
    setVoteCards([loser]);
  }

  return (
    <>
      <div className="mt-2 p-4 md:py-16">
        {voteCards.map((card, index) => {
          return (
            <div key={card._id} onClick={() => handleCardClick(index)} >
              <div className="flex justify-center">
                <Image
                  src={card.cardImage}
                  width={300}
                  height={300}
                  placeholder="blur"
                  blurDataURL={LoadingImagePlacepholder}
                />
              </div>
              <div className="mt-4 mb-8">
                <h1 className="font-bold text-2xl md:text-4xl text-center m-4 md:m-10">{card.cardTitle}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default VoteCard;
