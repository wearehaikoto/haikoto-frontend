import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import CreatableSelect from "react-select/creatable";

import { withAuth, uploadImage } from "../../../utils";
import { cardService } from "../../../services";
import {
    LoadingComponent,
    CardCancelButton,
    AlertComponent
} from "../../../components";

function editCard() {
    const router = useRouter();

    const { cardId } = router.query;

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [card, setCard] = React.useState(null);

    const [previewImage, setPreviewImage] = React.useState(null);
    const [cardsAsHashtags, setCardsAsHashtags] = React.useState([]);
    const [alertState, setAlertState] = React.useState({
        show: false,
        message: "",
        type: ""
    });
    const [formInput, setFormInput] = React.useState({
        image: "",
        title: "",
        hashtags: ""
    });

    React.useEffect(async () => {
        if (cardId) {
            const getCard = await cardService.getCard(cardId);
            const getAllCardsAsHashtag =
                await cardService.getAllCardsAsHashtag();

            if (getCard.success && getAllCardsAsHashtag.success) {
                setCard(getCard.data);
                setCardsAsHashtags(getAllCardsAsHashtag.data);
                setFormInput({
                    image: getCard.data.image,
                    title: getCard.data.title,
                    hashtags: getCard.data.hashtags.map((h) => h._id)
                });
                setLoadingState({ show: false, text: "" });
            } else {
                setLoadingState({
                    show: true,
                    text: `Error: ${
                        getCard.message || getAllCardsAsHashtag.message
                    }.`,
                    description: "Redirecting..."
                });

                setTimeout(() => {
                    router.push("/user");
                }, 2000);
            }
        }
    }, [cardId]);

    async function processUpdateCard(e) {
        e.preventDefault();
        window.scrollTo(0, 0);

        // Set alert state to default
        setAlertState({ show: false, message: "", type: "" });

        // Extract formData from formInput state
        const { image, title, hashtags } = formInput;

        if (!image) {
            setAlertState({
                show: true,
                message: "Please upload a card image",
                type: "error"
            });
            return;
        }
        if (!title) {
            setAlertState({
                show: true,
                message: "Please enter a title",
                type: "error"
            });
            return;
        }

        // Edit card
        const updateCard = await cardService.update(cardId, formInput);

        // Handle response
        if (updateCard.success) {
            setAlertState({
                show: true,
                message: updateCard.message,
                type: "success"
            });

            // Redirect to the user page
            setTimeout(() => {
                router.push(`/card/${cardId}`);
            }, 2000);
        } else {
            setAlertState({
                show: true,
                message: updateCard.message,
                type: "error"
            });
        }
    }

    return (
        <>
            <Head>
                <title>Edit Card - Haikoto</title>
            </Head>

            {!loadingState.show ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="m-7 md:mx-44">
                        <div className="mb-2">
                            <h1 className="text-center text-xl md:text-3xl">
                                Edit Card
                            </h1>
                        </div>
                        {alertState.show && <AlertComponent {...alertState} />}
                        <div className="mt-2 p-4 md:py-16 max-w-lg">
                            <form onSubmit={processUpdateCard}>
                                <label htmlFor="upload-button">
                                    <div className="flex justify-center relative">
                                        <Image
                                            src={previewImage || card.image}
                                            width={500}
                                            height={500}
                                        />
                                        {!previewImage && (
                                            <div className="absolute w-full py-2.5 bottom-1/3 bg-blue-600 opacity-50 text-white text-xs text-center leading-4">
                                                Click to upload new
                                            </div>
                                        )}
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="upload-button"
                                    style={{ display: "none" }}
                                    onChange={async (e) => {
                                        // Set the Preview Image
                                        const file = e.target.files[0];
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            setPreviewImage(e.target.result);
                                        };
                                        reader.readAsDataURL(file);

                                        const image = await uploadImage(file);
                                        if (image.success) {
                                            // Set the Form Input State
                                            setFormInput({
                                                ...formInput,
                                                image: image.url
                                            });
                                        } else {
                                            window.scrollTo(0, 0);
                                            setAlertState({
                                                show: true,
                                                message:
                                                    "Image Upload Failed. Please try again.",
                                                type: "error"
                                            });
                                            setPreviewImage(null);
                                        }
                                    }}
                                />

                                <div className="mt-4 mb-8">
                                    <h1 className="md:text-3xl text-center">
                                        Edit Image
                                    </h1>
                                    <h1 className="font-bold text-xl md:text-3xl text-center mt-4 md:mt-10">
                                        Title
                                    </h1>
                                    <input
                                        className="border-black border-2 my-2 w-full p-2"
                                        type="text"
                                        defaultValue={card.title}
                                        onChange={(e) => {
                                            setFormInput({
                                                ...formInput,
                                                title: e.target.value
                                            });
                                        }}
                                    />
                                    <h1 className="font-bold text-xl md:text-3xl text-center mt-4 md:mt-10">
                                        Hashtags (Parent Cards)
                                    </h1>
                                    <CreatableSelect
                                        className="border-black border-2 my-2 w-full"
                                        isMulti
                                        defaultValue={card.hashtags.map(
                                            (h) => ({
                                                value: h._id,
                                                label: h.title
                                            })
                                        )}
                                        onChange={(e) => {
                                            setFormInput({
                                                ...formInput,
                                                hashtags: e.map((e) =>
                                                    e.value.toLowerCase().trim()
                                                )
                                            });
                                        }}
                                        options={cardsAsHashtags.map(
                                            (hashtag) => {
                                                return {
                                                    value: hashtag._id,
                                                    label: hashtag.title
                                                };
                                            }
                                        )}
                                    />
                                    {/* Submit Button */}
                                    <div className="flex justify-center mt-8">
                                        <button
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                            type="submit"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <CardCancelButton />
                    </div>
                </div>
            ) : (
                <LoadingComponent {...loadingState} />
            )}
        </>
    );
}

export default withAuth(editCard);
