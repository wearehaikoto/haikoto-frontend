import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useKeyPressEvent } from "react-use";
import { useSwipeable } from "react-swipeable";

import { gameService } from "../../services";
import { LoadingImagePlacepholder } from "../../assets";
import { CardYesButton, CardNoButton } from "../../components";

function HashtagCard({ playState, setPlayState }) {
    const router = useRouter();

    const [hashtag, setHashtag] = React.useState(null);

    React.useEffect(() => {
        // All hashtags exhausted flag detected
        if (playState.finalHashTagSwipeMode === true) {
            // Update Loading State
            setPlayState({
                loading_show: true,
                loading_text: "Generating result..."
            });

            // Take a while before redirecting to result
            setTimeout(() => {
                router.push(`/play/${playState.gameId}`);
            }, 1500);
        }
    }, []);

    React.useEffect(async () => {
        if (!hashtag && !playState.finalHashTagSwipeMode) {
            const newHashtags = await gameService.newHashtag(playState.gameId);

            if (newHashtags.success) {
                setHashtag(newHashtags.data.newHashtag);
            } else {
                setPlayState({
                    gameMode: "swipe",
                    finalHashTagSwipeMode: true
                });
            }
        }
    }, [hashtag]);

    const handleHashtagClick = async (answer) => {
        if (answer) {
            await gameService.addRightSwipedHashtag(playState.gameId, {
                hashtagId: hashtag._id
            });
            setPlayState({ loading_show: true, gameMode: "swipe" });
        }

        if (!answer) {
            await gameService.addLeftSwipedHashtag(playState.gameId, {
                hashtagId: hashtag._id
            });
            setHashtag(null);
        }
    };

    // Key Press Event Handlers
    useKeyPressEvent("ArrowRight", () => {
        handleHashtagClick(true);
    });
    useKeyPressEvent("ArrowLeft", () => {
        handleHashtagClick(false);
    });

    // Swipe Event Handlers
    const reactSwipeableHandler = useSwipeable({
        onSwipedLeft: () => {
            handleHashtagClick(false);
        },
        onSwipedRight: () => {
            handleHashtagClick(true);
        }
    });

    return (
        <>
            {hashtag && (
                <div {...reactSwipeableHandler}>
                    {/* Potrait */}
                    <div className="mt-2 mb-5 p-4 hidden portrait:block">
                        <div className="h-52 w-52 lg:h-80 lg:w-80 relative mx-auto">
                            <Image
                                src={hashtag.image}
                                layout="fill"
                                objectFit="cover"
                                placeholder="blur"
                                blurDataURL={LoadingImagePlacepholder}
                            />
                        </div>

                        <div className="mt-4 mb-8">
                            <h1 className="font-bold md:max-w-xs text-[5vh] mx-auto text-center">
                                {hashtag.title}
                            </h1>
                        </div>

                        {setPlayState && (
                            <div className="flex justify-center mb-4">
                                <CardNoButton
                                    onClickHandler={() =>
                                        handleHashtagClick(false)
                                    }
                                />
                                <CardYesButton
                                    onClickHandler={(e) =>
                                        handleHashtagClick(true)
                                    }
                                />
                            </div>
                        )}
                    </div>

                    {/* Landscape View */}
                    <div className="p-4 hidden landscape:block">
                        <div className="grid grid-cols-4">
                            {setPlayState && (
                                <div className="flex justify-center my-auto">
                                    <CardNoButton
                                        onClickHandler={() =>
                                            handleHashtagClick(false)
                                        }
                                    />
                                </div>
                            )}
                            <div
                                className={
                                    setPlayState
                                        ? "col-span-2"
                                        : "col-span-full"
                                }
                            >
                                <div className="h-52 w-52 lg:h-80 lg:w-80 relative mx-auto">
                                    <Image
                                        src={hashtag.image}
                                        layout="fill"
                                        objectFit="cover"
                                        placeholder="blur"
                                        blurDataURL={LoadingImagePlacepholder}
                                    />
                                </div>

                                <div className="mt-4 w-full">
                                    <h1 className="font-bold md:max-w-xs text-[5vh] mx-auto text-center">
                                        {hashtag.title}
                                    </h1>
                                </div>
                            </div>
                            {setPlayState && (
                                <div className="flex justify-center my-auto">
                                    <CardYesButton
                                        onClickHandler={(e) =>
                                            handleHashtagClick(true)
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default HashtagCard;
