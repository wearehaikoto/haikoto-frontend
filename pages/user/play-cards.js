import React from "react";
import Image from "next/image";
import Head from "next/head";
import { useSwipeable } from "react-swipeable";

import { LoadingImagePlacepholder } from "../../app/assets";
import { cardService } from "../../app/services";
import { currentUser, withAuth } from "../../app/utils";
import {
    CardYesButton,
    CardNoButton,
    CardCancelButton,
    LoadingComponent
} from "../../app/components";

function playCards() {
    const user = currentUser();

    const [gameData, setGameData] = React.useState({
        cards: [],
        currentCard: 0
    });

    async function fetchCards() {
        const Mycards = await cardService.getAll();
        setGameData({
            ...gameData,
            cards: Mycards.data
        });
    }

    React.useEffect(() => {
        fetchCards();
    }, []);

    const reactSwipeableHandler = useSwipeable({
        onSwipedLeft: (eventData) => {
            console.log("User swiped left!", eventData);
        },
        onSwipedRight: (eventData) => {
            console.log("User swiped right!", eventData);
        }
        // trackMouse: true,
    });

    return (
        <>
            <Head>
                <title>Play Cards - Haikoto</title>
            </Head>

            <div
                {...reactSwipeableHandler}
                className="flex flex-col items-center justify-center min-h-screen py-2"
            >
                {gameData.cards.length > 0 ? (
                    <div className="m-8 md:mx-44">
                        <div className="border-black border-2 border-dashed mb-4 p-2">
                            <h1 className="text-center text-xl md:text-3xl">
                                Play Cards
                            </h1>
                        </div>

                        {gameData.cards.map((card, index) => {
                            return (
                                <div key={card._id} className="">
                                    <div className="border-black border-2 border-dashed mt-2 mb-10 p-4 md:py-16">
                                        <div className="flex justify-center">
                                            <Image
                                                src={card.cardImage}
                                                width={500}
                                                height={500}
                                                placeholder="blur"
                                                blurDataURL={LoadingImagePlacepholder}
                                            />
                                        </div>

                                        <div className="mt-4 mb-8">
                                            <h1 className="font-bold text-2xl md:text-5xl text-center">
                                                {/* {card.cardTitle} */}
                                            </h1>
                                            <p className="text-center md:text-4xl">
                                                {/* {card.cardCategory} */}
                                            </p>
                                        </div>

                                        <div className="flex justify-around mb-4">
                                            <CardNoButton
                                                onClickHandler={(e) =>
                                                    console.log(e)
                                                }
                                            />
                                            <CardYesButton
                                                onClickHandler={(e) =>
                                                    console.log(e)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="border-black border-2 border-dashed p-3 mb-10">
                                        <div className="flex justify-around text-3xl">
                                            <h1>NO</h1>
                                            <h1>YES</h1>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <CardCancelButton />
                    </div>
                ) : (
                    <LoadingComponent text="Loading your cards..." />
                )}
            </div>
        </>
    );
}

export default withAuth(playCards);
