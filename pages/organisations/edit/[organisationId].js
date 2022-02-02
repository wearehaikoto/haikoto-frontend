import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import CreatableSelect from "react-select/creatable";

import { withAuth, uploadImage } from "../../../utils";
import { cardService, organisationService } from "../../../services";
import {
    LoadingComponent,
    CardCancelButton,
    AlertComponent
} from "../../../components";

function editOrganisation() {
    const router = useRouter();

    const { organisationId } = router.query;

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [organisation, setOrganisation] = React.useState(null);

    const [previewImage, setPreviewImage] = React.useState(null);
    const [cardsAsHashtags, setCardsAsHashtags] = React.useState([]);
    const [alertState, setAlertState] = React.useState({
        show: false,
        message: "",
        type: ""
    });
    const [formInput, setFormInput] = React.useState({
        logo: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png",
        name: "",
        url_slug: "",
        hashtags: ""
    });

    React.useEffect(async () => {
        if (organisationId) {
            const getOrganisation = await organisationService.getOrganisation(
                organisationId
            );
            const getAllCardsAsHashtag =
                await cardService.getAllCardsAsHashtag();

            if (getOrganisation.success && getAllCardsAsHashtag.success) {
                setOrganisation(getOrganisation.data);
                setCardsAsHashtags(getAllCardsAsHashtag.data);
                setFormInput({
                    logo: getOrganisation.data.logo,
                    name: getOrganisation.data.name,
                    url_slug: getOrganisation.data.url_slug,
                    hashtags: getOrganisation.data.hashtags.map((h) => h._id)
                });
                setLoadingState({ show: false, text: "" });
            } else {
                setLoadingState({
                    show: true,
                    text: `Error: ${
                        getOrganisation.message || getAllCardsAsHashtag.message
                    }.`,
                    description: "Redirecting..."
                });

                setTimeout(() => {
                    router.push("/user");
                }, 2000);
            }
        }
    }, [organisationId]);

    async function processUpdateOrganisation(e) {
        e.preventDefault();
        window.scrollTo(0, 0);

        // Set alert state to default
        setAlertState({ show: false, message: "", type: "" });

        // Extract formData from formInput state
        const { logo, name, url_slug } = formInput;

        if (!logo) {
            setAlertState({
                show: true,
                message: "Please upload an organisation logo",
                type: "error"
            });
            return;
        }
        if (!name) {
            setAlertState({
                show: true,
                message: "Please enter a name",
                type: "error"
            });
            return;
        }
        if (!url_slug) {
            setAlertState({
                show: true,
                message: `Please enter a url slug`,
                type: "error"
            });
            return;
        }

        // Edit organisation
        const updateOrganisation = await organisationService.update(organisationId, formInput);

        // Handle response
        if (updateOrganisation.success) {
            setAlertState({
                show: true,
                message: updateOrganisation.message,
                type: "success"
            });

            // Redirect to the user page
            setTimeout(() => {
                router.push(`/organisations/manage`);
            }, 2000);
        } else {
            setAlertState({
                show: true,
                message: updateOrganisation.message,
                type: "error"
            });
        }
    }

    return (
        <>
            <Head>
                <title>Edit Organisation - Haikoto</title>
            </Head>

            {!loadingState.show ? (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="m-7 md:mx-44">
                        <div className="mb-2">
                            <h1 className="text-center text-xl md:text-3xl">
                                Edit Organisation
                            </h1>
                        </div>
                        {alertState.show && <AlertComponent {...alertState} />}
                        <div className="mt-2 p-4 md:py-16 max-w-lg">
                            <form onSubmit={processUpdateOrganisation}>
                                <label htmlFor="upload-button">
                                    <div className="flex justify-center relative">
                                        <img
                                            src={
                                                previewImage ||
                                                organisation.logo
                                            }
                                            width={500}
                                            height={500}
                                        />
                                        {!previewImage && (
                                            <div className="absolute w-full py-2.5 bottom-1/3 bg-blue-600 opacity-0 text-white text-xs text-center leading-4 hover:opacity-70">
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

                                        const logo = await uploadImage(file);
                                        if (logo.success) {
                                            // Set the Form Input State
                                            setFormInput({
                                                ...formInput,
                                                logo: logo.url
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
                                        Edit Logo
                                    </h1>
                                    <h1 className="font-bold text-xl md:text-3xl text-center mt-4 md:mt-10">
                                        Organisation Name
                                    </h1>
                                    <input
                                        className="border-black border-2 my-2 w-full p-2"
                                        type="text"
                                        defaultValue={organisation.name}
                                        onChange={(e) => {
                                            setFormInput({
                                                ...formInput,
                                                name: e.target.value
                                            });
                                        }}
                                    />
                                    <h1 className="font-bold text-xl md:text-3xl text-center mt-4 md:mt-10">
                                        Organisation Url Slug
                                    </h1>
                                    <input
                                        className="border-black border-2 my-2 w-full p-2"
                                        type="text"
                                        defaultValue={organisation.url_slug}
                                        placeholder={
                                            window.location.origin +
                                            "/:url_slug:"
                                        }
                                        onChange={(e) => {
                                            setFormInput({
                                                ...formInput,
                                                url_slug: e.target.value
                                            });
                                        }}
                                    />
                                    <h1 className="font-bold text-xl md:text-3xl text-center mt-4 md:mt-10">
                                        Hashtags (Parent Cards)
                                    </h1>
                                    <CreatableSelect
                                        className="border-black border-2 my-2 w-full"
                                        isMulti
                                        defaultValue={organisation.hashtags.map(
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

export default withAuth(editOrganisation);
