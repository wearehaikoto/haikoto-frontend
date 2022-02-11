import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { withAuth } from "../../utils";
import { organisationService } from "../../services";
import {
    LoadingComponent,
    CardCancelButton,
    NavigationBarComponent
} from "../../components";

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
                router.push("/dashboard");
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

            <div className="relative min-h-screen md:flex">
                <NavigationBarComponent />

                <div className="flex-1 p-10 text-2xl font-bold max-h-screen overflow-y-auto">
                    {loadingState.show && (
                        <LoadingComponent {...loadingState} />
                    )}

                    {!loadingState.show && (
                        <div className="items-center justify-center py-2">
                            <section className="my-4 w-full p-5 rounded bg-gray-200 bg-opacity-90">
                                All Organisations
                            </section>

                            <div className="mb-10">
                                <div className="overflow-x-auto">
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
                                            {organisations.map(
                                                (organisation) => {
                                                    const url =
                                                        window.location.origin +
                                                        "/" +
                                                        organisation.url_slug;
                                                    return (
                                                        <tr
                                                            key={
                                                                organisation._id
                                                            }
                                                        >
                                                            <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                                <a
                                                                    target="_blank"
                                                                    href={url}
                                                                >
                                                                    {url}
                                                                </a>
                                                            </td>
                                                            <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                                {
                                                                    organisation.name
                                                                }
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
                                                }
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default withAuth(manageOrganisation);
