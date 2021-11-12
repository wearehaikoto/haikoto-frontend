import Image from "next/image";
import { LoadingImagePlacepholder } from "../../assets";
import { CardYesButton, CardNoButton } from "../../components";

function SingleCard({ card, handleAnswerClick }) {
  return (
    <>
      {/* <div className="border-black border-2 border-dashed mt-2 mb-10 p-4 md:py-16"> */}
      <div className="mt-2 mb-10 p-4 md:py-16">
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
            {card.cardTitle}
          </h1>
          <p className="text-center md:text-4xl">{card.cardCategory}</p>
        </div>

        {handleAnswerClick && (
          <div className="flex justify-around mb-4">
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
