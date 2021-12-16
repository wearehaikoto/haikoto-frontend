import Image from "next/image";
import { LoadingImagePlacepholder } from "../../assets";
import { CardYesButton, CardNoButton } from "../../components";

function SingleCard({ card, handleAnswerClick }) {
    return (
        <>
            {/* Potrait */}
            <div className="mt-2 mb-5 p-4 hidden portrait:block">
                <div className="h-52 w-52 lg:h-80 lg:w-80 relative mx-auto">
                    <Image
                        src={card.image}
                        layout="fill"
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL={LoadingImagePlacepholder}
                    />
                </div>

                <div className="mt-4 mb-8">
                    <h1 className="font-bold md:max-w-xs text-[5vh] mx-auto text-center">
                        {card.title}
                    </h1>
                    <p className="text-center text-[4vh]">
                        {card.hashtags.map((hashtag) => (
                            <span
                                key={hashtag._id}
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                            >
                                #{hashtag.title}
                            </span>
                        ))}
                    </p>
                </div>

                {handleAnswerClick && (
                    <div className="flex justify-center mb-4">
                        <CardNoButton
                            onClickHandler={() =>
                                handleAnswerClick(card._id, false)
                            }
                        />
                        <CardYesButton
                            onClickHandler={(e) =>
                                handleAnswerClick(card._id, true)
                            }
                        />
                    </div>
                )}
            </div>

            {/* Landscape View */}
            <div className="p-4 hidden landscape:block">
                <div className="grid grid-cols-4">
                    {handleAnswerClick && (
                        <div className="flex justify-center my-auto">
                            <CardNoButton
                                onClickHandler={() =>
                                    handleAnswerClick(card._id, false)
                                }
                            />
                        </div>
                    )}
                    <div
                        className={
                            handleAnswerClick ? "col-span-2" : "col-span-full"
                        }
                    >
                        <div className="h-52 w-52 lg:h-80 lg:w-80 relative mx-auto">
                            <Image
                                src={card.image}
                                layout="fill"
                                objectFit="cover"
                                placeholder="blur"
                                blurDataURL={LoadingImagePlacepholder}
                            />
                        </div>

                        <div className="mt-4 w-full">
                            <h1 className="font-bold md:max-w-xs text-[5vh] mx-auto text-center">
                                {card.title}
                            </h1>
                            <p className="text-center text-[4vh]">
                                {card.hashtags.map((hashtag) => (
                                    <span
                                        key={hashtag._id}
                                        className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                                    >
                                        #{hashtag.title}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                    {handleAnswerClick && (
                        <div className="flex justify-center my-auto">
                            <CardYesButton
                                onClickHandler={(e) =>
                                    handleAnswerClick(card._id, true)
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default SingleCard;
