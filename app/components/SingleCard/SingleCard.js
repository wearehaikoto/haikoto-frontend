import Image from "next/image";
import { LoadingImagePlacepholder } from "../../assets";
import { CardYesButton, CardNoButton } from "../../components";

function SingleCard({
    cardId,
    cardImage,
    cardTitle,
    cardCategory,
    handleAnswerClick
}) {
    return (
        <div className="">
            <div className="border-black border-2 border-dashed mt-2 mb-10 p-4 md:py-16">
                <div className="flex justify-center">
                    <Image
                        src={cardImage}
                        width={500}
                        height={500}
                        placeholder="blur"
                        blurDataURL={LoadingImagePlacepholder}
                    />
                </div>

                <div className="mt-4 mb-8">
                    <h1 className="font-bold text-2xl md:text-5xl text-center">
                        {cardTitle}
                    </h1>
                    <p className="text-center md:text-4xl">{cardCategory}</p>
                </div>

                {handleAnswerClick && (
                    <div className="flex justify-around mb-4">
                        <CardNoButton
                            onClickHandler={() =>
                                handleAnswerClick(cardId, false)
                            }
                        />
                        <CardYesButton
                            onClickHandler={(e) =>
                                handleAnswerClick(cardId, true)
                            }
                        />
                    </div>
                )}
            </div>

            {handleAnswerClick && (
                <div className="border-black border-2 border-dashed p-3 mb-10">
                    <div className="flex justify-around text-3xl">
                        <h1>NO</h1>
                        <h1>YES</h1>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SingleCard;
