import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSwipeable } from "react-swipeable";

import { SingleCard, VoteCard } from "../../app/components";
import { gameService } from "../../app/services";
import { currentUser, withAuth } from "../../app/utils";
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
  const [cards, setCards] = React.useState([]);
  const [voteCards, setVoteCards] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [currentCard, setCurrentCard] = React.useState(1);

  const handleAnswerClick = async (cardId, answer) => {
    // Push user Answer and save to answer state
    // answers.push({ card: currentCard, _id: cardId, answer });
    answers.push(answer);
    setAnswers(answers);

    // Scroll to top so they can see
    window.scrollTo(0, 0);

    // Get the result of the game
    const result = await gameService.addAnswer(gameId, { answer });

    if (result.success) {

      // If answer is true add to voteCards bucket
      if (answer) {
        const card = cards.find(card => card._id === cardId);
        voteCards.push(card);
        setVoteCards(voteCards);
      }

      // Check if current Card is equal to number of Cards
      if (cards.length > currentCard) {
        // Update the current Card Number +1 and continue game
        setCurrentCard(currentCard + 1);
        return;
      }

      // Update Loading State
      setLoadingState({ show: true, text: "Generating result..." });

      setTimeout(() => {
        router.push(`/play/${gameId}`);
      }, 2000);
    }
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
      setCards(createGame.data.cards);
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

  const reactSwipeableHandler = useSwipeable({
    onSwipedLeft: () => {
      if (voteCards.length === 2) return;
      handleAnswerClick(cards[currentCard - 1]._id, false);
    },
    onSwipedRight: () => {
      if (voteCards.length === 2) return;
      handleAnswerClick(cards[currentCard - 1]._id, true);
    }
  });

  console.log(voteCards);

  return (
    <>
      <Head>
        <title>Play Cards - Haikoto</title>
      </Head>

      {!loadingState.show ? (
        <div
          {...reactSwipeableHandler}
          className="flex flex-col items-center justify-center min-h-screen py-2"
        >
          <div className="m-8 md:mx-44">

            {voteCards.length == 2 ? (
              <VoteCard voteCards={voteCards} setVoteCards={setVoteCards} />
            ) : (
              <SingleCard
                card={cards[currentCard - 1]}
                handleAnswerClick={handleAnswerClick}
              />
            )}

            <CardCancelButton />
          </div>
        </div>
      ) : (
        <LoadingComponent {...loadingState} />
      )}
    </>
  );
}

export default withAuth(playCards);
