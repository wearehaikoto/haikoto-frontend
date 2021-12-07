import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { hashtagService } from "../../app/services";
import { currentUser, withAuth } from "../../app/utils";
import { LoadingComponent, CardCancelButton } from "../../app/components";

function manageHashtag() {
    const user = currentUser().userData;
    const router = useRouter();

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [hashtags, setHashtags] = React.useState([]);

    React.useEffect(async () => {
        const getAllHashtags = await hashtagService.getAll();

        if (getAllHashtags.success) {
            setHashtags(getAllHashtags.data);
            setLoadingState({ show: false, text: "" });
        } else {
            setLoadingState({
                show: true,
                text: `Error: ${getAllHashtags.message}.`,
                description: "Redirecting..."
            });

            setTimeout(() => {
                router.push("/user");
            }, 2000);
        }
    }, []);

    async function handleDeleteHashtag(hashtagId) {
        if (confirm("Are you sure you want to delete this hashtag?")) {
            const deleteHashtag = await hashtagService.deleteHashtag(hashtagId);

            if (deleteHashtag.success) {
                setHashtags(hashtags.filter((c) => c._id !== hashtagId));
            } else {
                alert(deleteHashtag.message);
            }
        }
    }

    return (
        <>
            <Head>
                <title>All Hashtags - Haikoto</title>
            </Head>

            {!loadingState.show ? (
                <div className="items-center justify-center min-h-screen py-2">
                    <div className="m-10 md:mx-44">
                        <div className="mb-4">
                            <h1 className="text-center text-xl md:text-3xl">
                                All Hashtags
                            </h1>
                        </div>

                        <div className="mb-10">
                            <div className="p-4 overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="bg-blue-600">
                                        <tr>
                                            <th className="px-4 py-2 text-xs text-white text-left">
                                                Hashtag ID
                                            </th>
                                            <th className="px-4 py-2 text-xs text-white text-left">
                                                Name
                                            </th>
                                            <th className="px-4 py-2 text-xs text-white text-left" />
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {hashtags.map((hashtag) => {
                                            return (
                                                <tr key={hashtag._id}>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        {hashtag._id}
                                                    </td>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        {hashtag.name}
                                                    </td>
                                                    <td className="border px-4 py-2 text-yellow-600 border-blue-500 font-medium">
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteHashtag(
                                                                    hashtag._id
                                                                )
                                                            }
                                                        >
                                                            <a className="text-red-600">
                                                                Delete
                                                            </a>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
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

export default withAuth(manageHashtag);
