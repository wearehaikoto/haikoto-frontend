import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { withAuth } from "../../utils";
import { organisationService } from "../../services";
import { LoadingComponent, CardCancelButton } from "../../components";

function manageOrganisation() {
    const router = useRouter();

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [organisations, setOrganisations] = React.useState([]);

    React.useEffect(async () => {
        const getOrganisations = await organisationService.getAll();

        if (getOrganisations.success) {
            setOrganisations(getOrganisations.data);
            setLoadingState({ show: false, text: "" });
        } else {
            setLoadingState({
                show: true,
                text: `Error: ${getOrganisations.message}.`,
                description: "Redirecting..."
            });

            setTimeout(() => {
                router.push("/user");
            }, 2000);
        }
    }, []);

    async function handleDeleteOrganisation(organisationId) {
        if (confirm("Are you sure you want to delete this organisation?")) {
            const deleteOrganisation =
                await organisationService.deleteOrganisation(organisationId);

            if (deleteOrganisation.success) {
                setOrganisations(
                    organisations.filter((c) => c._id !== organisationId)
                );
            } else {
                alert(deleteOrganisation.message);
            }
        }
    }

    return (
        <>
            <Head>
                <title>All Organisations - Haikoto</title>
            </Head>

            {!loadingState.show ? (
                <div className="items-center justify-center min-h-screen py-2">
                    <div className="m-10 md:mx-44">
                        <div className="mb-4">
                            <h1 className="text-center text-xl md:text-3xl">
                                All Organisations
                            </h1>
                        </div>

                        <div className="mb-10">
                            <div className="p-4 overflow-x-auto">
                                {/* Add New Button */}
                                <div className="flex flex-row text-center justify-center">
                                    <Link href="/organisations/new">
                                        <a className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 my-2 min-w-max w-2/4 rounded-full">
                                            + Add New Organisation
                                        </a>
                                    </Link>
                                </div>

                                <table className="table-auto w-full">
                                    <thead className="bg-blue-600">
                                        <tr>
                                            <th className="px-4 py-2 text-xs text-white text-left">
                                                URL
                                            </th>
                                            <th className="px-4 py-2 text-xs text-white text-left">
                                                ORG Name
                                            </th>
                                            <th className="px-4 py-2 text-xs text-white text-left" />
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {organisations.map((organisation) => {
                                            const url =
                                                window.location.origin +
                                                "/" +
                                                organisation.url_slug;
                                            return (
                                                <tr key={organisation._id}>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        <a
                                                            target="_blank"
                                                            href={url}
                                                        >
                                                            {url}
                                                        </a>
                                                    </td>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        {organisation.name}
                                                    </td>
                                                    <td className="border px-4 py-2 text-yellow-600 border-blue-500 font-medium">
                                                        <div className="divide-x-2 divide-neutral-900 divide-double">
                                                            {/* <Link
                                                                href={`/organisations/${organisation._id}`}
                                                            >
                                                                <a className="px-2">
                                                                    View
                                                                </a>
                                                            </Link> */}
                                                            <Link
                                                                href={`/organisations/edit/${organisation._id}`}
                                                            >
                                                                <a className="px-2">
                                                                    Edit
                                                                </a>
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteOrganisation(
                                                                        organisation._id
                                                                    )
                                                                }
                                                                className="px-2"
                                                            >
                                                                <a className="text-red-600">
                                                                    Delete
                                                                </a>
                                                            </button>
                                                        </div>
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

export default withAuth(manageOrganisation);
