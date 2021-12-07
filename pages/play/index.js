import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useKeyPressEvent } from "react-use";
import { useSwipeable } from "react-swipeable";

import { gameService } from "../../app/services";
import { useMergeState, currentUser, withAuth } from "../../app/utils";
import { SingleCard, VoteCard, HashtagCard } from "../../app/components";
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
    rightSwipedCards: [],
    leftSwipedCards: [],

    // Vote
    voteMode: false,
    hashTagSwipeMode: true,
    finalHashTagSwipeMode: false,

    // Gameplay
    currentCard: 0,
    lastCardVote: false,
  });

  const { loading_show, loading_text, loading_description, gameId, allCards, rightSwipedCards, leftSwipedCards, voteMode, hashTagSwipeMode, finalHashTagSwipeMode, currentCard, lastCardVote } = playState;

  const handleAnswerClick = async (cardId, answer) => {
    // Scroll to top (good UX)
    window.scrollTo(0, 0);

    // Show loading screen for api callss to process
    setPlayState({ loading_show: true });

    // Get the Card Data
    const card = allCards.find((card) => card._id === cardId);

    // If answer is true add to rightSwipedCards bucket
    if (answer) {

      rightSwipedCards.unshift(card);
      // Add rightSwiped Card to the Game - Commented  (Do not rank the cards yet)
      // await gameService.addRightSwipedCard(gameId, { cardId });
    } else {

      leftSwipedCards.unshift(card);
      // Add No Card to the Game 
      await gameService.addLeftSwipedCard(gameId, { cardId });
    }

    setPlayState({
      // Close the loading screen, api calls would be done now
      loading_show: false,

      // Cards
      rightSwipedCards,
      leftSwipedCards,
    });

    // If the answer is true and number of cards in rightSwipedCards bucket is greater than 2
    if (answer && rightSwipedCards.length >= 2) {
      // Enter Vote mode to rank rightSwipedCards
      setPlayState({ voteMode: true });
    }

    // Get new Card based on yes/leftSwiped Cards from the Database / Check if the game is over
    const newCards = await gameService.newCard(gameId);
    if (newCards.success) {
      // Add the new Cards to the allCards bucket
      // Update the current Card Number +1 and continue game
      setPlayState({
        allCards: [...allCards, ...newCards.data.newCard],
        currentCard: currentCard + 1,
      });
      return;
    } else {
      // Out of Cards for the Hashtag, Enter hashTagSwipeMode
      setPlayState({
        hashTagSwipeMode: true,
      });
    }

    // Last Card Vote
    if (allCards.length === currentCard && rightSwipedCards.length >= 2 && answer) {
      // If the current Card is equal to number of Cards and answer is true
      // Enter Vote mode to rank rightSwipedCards
      setPlayState({ voteMode: true, lastCardVote: true });
      return;
    }

    if (!finalHashTagSwipeMode) return;

    // Call finish Game Function
    finishGame();
  };

  const finishGame = async () => {
    // Update Loading State
    setPlayState({ loading_show: true, loading_text: "Generating result..." });

    // Take a while before redirecting to result
    // setTimeout(() => {
    router.push(`/play/${gameId}`);
    // }, 1500)
  };

  React.useEffect(async () => {
    // Create a new Game
    const createGame = await gameService.create();

    if (createGame.success) {
      // Check if we're continuing a game
      if (!createGame.data.continue) {
        // Set GameId and continue play flow
        setPlayState({
          loading_show: false,
          gameId: createGame.data._id,
        });
      } else {
        setPlayState({
          loading_show: false,
          gameId: createGame.data._id,
          // Cards
          allCards: createGame.data.cards,
          rightSwipedCards: createGame.data.rightSwipedCards,
          leftSwipedCards: createGame.data.leftSwipedCards,
          currentCard: createGame.data.cards.length,

          hashTagSwipeMode: false,
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
    if (hashTagSwipeMode !== true) {
      // Get new Card based on yes/leftSwiped Hashtags from the Database / Check if the game is over
      const newCards = await gameService.newCard(gameId);

      if (newCards.success) {
        // Add the new Cards to the allCards bucket
        // Update the current Card Number +1 and continue game
        setPlayState({
          allCards: [...allCards, ...newCards.data.newCard],
          currentCard: currentCard + 1,
          loading_show: false,
        });
      } else {
        // Out of Cards for the Hashtag, Enter hashTagSwipeMode
        setPlayState({
          loading_show: false,
          hashTagSwipeMode: true,
        });
      }
    }
  }, [hashTagSwipeMode]);

  // Key Press Event Handlers
  useKeyPressEvent("ArrowRight", () => {
    if (voteMode || loading_show || hashTagSwipeMode) return;
    handleAnswerClick(allCards[currentCard - 1]._id, true);
  });
  useKeyPressEvent("ArrowLeft", () => {
    if (voteMode || loading_show || hashTagSwipeMode) return;
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
        <>
          {hashTagSwipeMode && !voteMode ? (
            <HashtagCard playState={playState} setPlayState={setPlayState} />
          ) : (
            <div
              {...reactSwipeableHandler}
              className="flex flex-col items-center mt-[10vh]"
            >
              {voteMode ? (
                <VoteCard
                  gameId={gameId}
                  rightSwipedCards={rightSwipedCards}
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
          )}
        </>
      ) : (
        <LoadingComponent text={loading_text} description={loading_description} />
      )}
    </>
  );
}

export default withAuth(playCards);
