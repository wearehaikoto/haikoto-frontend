import React from "react";
import Lottie from "react-lottie-player";

import { gameService } from "../../services";
import { LottiePickHashtagAnimationData } from "../../assets";
import { CardYesButton, CardNoButton } from "../../components";

function HashtagCard({ playState, setPlayState }) {

    const [hashtag, setHashtag] = React.useState(null);

    React.useEffect(async () => {
        if (!hashtag) {
            const newHashtags = await gameService.newHashtag(playState.gameId);

            if (newHashtags.success) {
                setHashtag(newHashtags.data.newHashtag);
            } else {
                setPlayState({
                    lastCardVote: true,
                    hashTagSwipeMode: false,
                    finalHashTagSwipeMode: true,
                });
            }
        }
    }, [hashtag]);

    const handleHashtagClick = async (answer) => {
        if (answer) {
            await gameService.addRightSwipedHashtag(playState.gameId, { hashtagId: hashtag._id });
            setPlayState({ loading_show: true, hashTagSwipeMode: false });
        }

        if (!answer) {
            await gameService.addLeftSwipedHashtag(playState.gameId, { hashtagId: hashtag._id });
            setHashtag(null);
        }
    }

    return (
        <>
            {hashtag && (
                <>
                    {/* Potrait */}
                    <div className="mt-2 mb-5 p-4 hidden portrait:block">
                        <div className="h-52 w-52 lg:h-80 lg:w-80 relative mx-auto">
                            <Lottie
                                className="w-full h-full md:block"
                                animationData={LottiePickHashtagAnimationData}
                                loop={true}
                                play={true}
                            />
                        </div>

                        <div className="mt-4 mb-8">
                            <h1 className="font-bold md:max-w-xs text-[5vh] mx-auto text-center">
                                {hashtag.name}
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
                                    setPlayState ? "col-span-2" : "col-span-full"
                                }
                            >
                                <div className="h-52 w-52 lg:h-80 lg:w-80 relative mx-auto">
                                    <Lottie
                                        className="w-full h-full md:block"
                                        animationData={LottiePickHashtagAnimationData}
                                        loop={true}
                                        play={true}
                                    />
                                </div>

                                <div className="mt-4 w-full">
                                    <h1 className="font-bold md:max-w-xs text-[5vh] mx-auto text-center">
                                        {hashtag.name}
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
                </>
            )}
        </>
    );
}

export default HashtagCard;
