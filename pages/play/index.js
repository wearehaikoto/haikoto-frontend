import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useKeyPressEvent } from "react-use";
import { useSwipeable } from "react-swipeable";

import { gameService } from "../../app/services";
import { useMergeState, currentUser, withAuth } from "../../app/utils";
import { SingleCard, VoteCard } from "../../app/components";
import { CardCancelButton, LoadingComponent } from "../../app/components";

function playCards() {
  const user = currentUser();
  const router = useRouter();

  const [playState, setPlayState] = useMergeState({
    // UI State
    loading_show: true,
    loading_text: "Loading...",
    loading_description: "",

    // Game
    gameId: null,

    // Cards
    allCards: [],
    yesCards: [],
    noCards: [],

    // Vote
    voteMode: false,

    // Gameplay
    currentCard: 1,
    lastCardVote: false,
  });

  const { loading_show, loading_text, loading_description, gameId, allCards, yesCards, noCards, voteMode, currentCard, lastCardVote } = playState;

  const handleAnswerClick = async (cardId, answer) => {
    // Scroll to top (good UX)
    window.scrollTo(0, 0);

    // Show loading screen for api callss to process
    setPlayState({ loading_show: true });

    // Get the Card Data
    const card = allCards.find((card) => card._id === cardId);

    // If answer is true add to yesCards bucket
    if (answer) {

      yesCards.unshift(card);
      // Add yes Card to the Game 
      await gameService.addYesCard(gameId, { cardId });
    } else {

      noCards.unshift(card);
      // Add No Card to the Game 
      await gameService.addNoCard(gameId, { cardId });
    }

    setPlayState({
      // Close the loading screen, api calls would be done now
      loading_show: false,

      // Cards
      yesCards,
      noCards,
    });

    // If the answer is true and number of cards in yesCards bucket is greater than 2
    if (answer && yesCards.length >= 2) {
      // Enter Vote mode to rank yesCards
      setPlayState({ voteMode: true });
    }

    // Check if current Card is equal to number of Cards
    if (allCards.length > currentCard) {
      // Update the current Card Number +1 and continue game
      setPlayState({ currentCard: currentCard + 1 });
      return;
    }

    // Last Card Vote
    if (allCards.length === currentCard && answer) {
      // If the current Card is equal to number of Cards and answer is true
      // Enter Vote mode to rank yesCards
      setPlayState({ voteMode: true, lastCardVote: true });
      return;
    }

    // Call finish Game Function
    finishGame();
  };

  const finishGame = async () => {
    // Update Loading State
    setPlayState({ loading_show: true, loading_text: "Generating result..." });

    // Take a while before redirecting to result
    setTimeout(() => {
      router.push(`/play/${gameId}`);
    }, 1500)
  };

  React.useEffect(async () => {
    // Create a new Game
    const createGame = await gameService.create({
      numberOfCards: 5
    });

    if (createGame.success) {
      setPlayState({
        gameId: createGame.data._id,
        allCards: createGame.data.cards,
        loading_show: false,
      });
      // setGameId(createGame.data._id);
      // setAllCards(createGame.data.cards);
      // setLoadingState({ loading_show: false, loading_text: "" });
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

  // Key Press Event Handlers
  useKeyPressEvent("ArrowRight", () => {
    if (voteMode || loading_show) return;
    handleAnswerClick(allCards[currentCard - 1]._id, true);
  });
  useKeyPressEvent("ArrowLeft", () => {
    if (voteMode || loading_show) return;
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

      {!loading_show ? (
        <div
          {...reactSwipeableHandler}
          className="flex flex-col items-center mt-[10vh]"
        >
          {voteMode ? (
            <VoteCard
              gameId={gameId}
              yesCards={yesCards}
              setPlayState={setPlayState}
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
        <LoadingComponent text={loading_text} description={loading_description} />
      )}
    </>
  );
}

export default withAuth(playCards);
