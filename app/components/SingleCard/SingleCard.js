import Image from "next/image";
import { LoadingImagePlacepholder } from "../../assets";
import { CardYesButton, CardNoButton } from "../../components";

function SingleCard({ card, handleAnswerClick }) {
  return (
    <>
      <div className="mt-2 mb-5 p-4">
        <div className="h-60 w-60 lg:h-80 lg:w-80 relative mx-auto">
          <Image
            src={card.cardImage}
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            blurDataURL={LoadingImagePlacepholder}
          />
        </div>

        <div className="mt-4 mb-8">
          <h1 className="font-bold text-2xl md:text-5xl text-center">
            {card.cardTitle}
          </h1>
          <p className="text-center md:text-4xl">{card.cardCategory}</p>
        </div>

        {handleAnswerClick && (
          <div className="flex justify-center mb-4">
            <CardNoButton
              onClickHandler={() => handleAnswerClick(card._id, false)}
            />
            <CardYesButton
              onClickHandler={(e) => handleAnswerClick(card._id, true)}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default SingleCard;
