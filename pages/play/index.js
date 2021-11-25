import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useKeyPressEvent } from "react-use";
import { useSwipeable } from "react-swipeable";

import { gameService } from "../../app/services";
import { currentUser, withAuth } from "../../app/utils";
import { SingleCard, VoteCard } from "../../app/components";
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
  const [allCards, setAllCards] = React.useState([]);
  const [yesCards, setYesCards] = React.useState([]);
  const [noCards, setNoCards] = React.useState([]);
  const [voteMode, setVoteMode] = React.useState(false);
  const [currentCard, setCurrentCard] = React.useState(1);
  const [lastCardVote, setLastCardVote] = React.useState(false);

  const handleAnswerClick = async (cardId, answer) => {
    // Scroll to top (good UX)
    window.scrollTo(0, 0);

    // Show loading screen for api callss to process
    setLoadingState({ show: true });

    // Get the Card Data
    const card = allCards.find((card) => card._id === cardId);

    // If answer is true add to yesCards bucket
    if (answer) {

      yesCards.unshift(card);
      setYesCards(yesCards);

      // Add yes Card to the Game 
      await gameService.addYesCard(gameId, { cardId });
    } else {

      noCards.unshift(card);
      setNoCards(noCards);

      // Add No Card to the Game 
      await gameService.addNoCard(gameId, { cardId });
    }

    // Close the loading screen, api calls would be done now
    setLoadingState({ show: false });

    // If the answer is true and number of cards in yesCards bucket is greater than 2
    if (answer && yesCards.length >= 2) {
      // Enter Vote mode to rank yesCards
      setVoteMode(true);
    }

    // Check if current Card is equal to number of Cards
    if (allCards.length > currentCard) {
      // Update the current Card Number +1 and continue game
      setCurrentCard(currentCard + 1);
      return;
    }

    // Last Card Vote
    if (allCards.length === currentCard && answer) {
      // If the current Card is equal to number of Cards and answer is true
      // Enter Vote mode to rank yesCards
      setVoteMode(true);
      setLastCardVote(true);
      return;
    }

    // Call finish Game Function
    finishGame();
  };

  const finishGame = async () => {
    // Update Loading State
    setLoadingState({ show: true, text: "Generating result..." });

    // Take a while before redirecting to result
    setTimeout(() => {
      router.push(`/play/${gameId}`);
    }, 1500)
  };

  React.useEffect(async () => {
    // Get Numbers only from propmt
    // const number_of_cards_to_play = parseInt(
    //     prompt("How many cards do you want to play?", 3)
    // );
    const number_of_cards_to_play = 5;

    // Create a new Game
    const createGame = await gameService.create({
      numberOfCards: number_of_cards_to_play
    });

    if (createGame.success) {
      setGameId(createGame.data._id);
      setAllCards(createGame.data.cards);
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


  // Key Press Event Handlers
  useKeyPressEvent("ArrowRight", () => {
    if (voteMode) return;
    handleAnswerClick(allCards[currentCard - 1]._id, true);
  });
  useKeyPressEvent("ArrowLeft", () => {
    if (voteMode) return;
    handleAnswerClick(allCards[currentCard - 1]._id, false);
  });

  // Swipe Event Handlers
  const reactSwipeableHandler = useSwipeable({
    onSwipedLeft: () => {
      if (voteMode) return;
      handleAnswerClick(allCards[currentCard - 1]._id, false);
    },
    onSwipedRight: () => {
      if (voteMode) return;
      handleAnswerClick(allCards[currentCard - 1]._id, true);
    }
  });

  return (
    <>
      <Head>
        <title>Play Cards - Haikoto</title>
      </Head>

      {!loadingState.show ? (
        <div
          {...reactSwipeableHandler}
          className="flex flex-col items-center mt-[10vh]"
        >
          {voteMode ? (
            <VoteCard
              gameId={gameId}
              yesCards={yesCards}
              setYesCards={setYesCards}
              setVoteMode={setVoteMode}
            />
          ) : (
            lastCardVote ? finishGame() : (
              <SingleCard
                card={allCards[currentCard - 1]}
                handleAnswerClick={handleAnswerClick}
              />
            )
          )}

          <CardCancelButton />
        </div>
      ) : (
        <LoadingComponent {...loadingState} />
      )}
    </>
  );
}

export default withAuth(playCards);
