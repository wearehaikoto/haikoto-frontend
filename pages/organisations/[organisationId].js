import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { withAuth } from "../../utils";
import { organisationService } from "../../services";
import { LoadingComponent, CardCancelButton } from "../../components";

function getOrganisation() {
    const router = useRouter();

    const { organisationId } = router.query;

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [organisation, setOrganisation] = React.useState(null);

    React.useEffect(async () => {
        if (organisationId) {
            const getOrganisation = await organisationService.getOrganisation(
                organisationId
            );

            if (getOrganisation.success) {
                setOrganisation(getOrganisation.data);
                setLoadingState({ show: false, text: "" });
            } else {
                setLoadingState({
                    show: true,
                    text: `Error: ${getOrganisation.message}.`,
                    description: "Redirecting..."
                });

                setTimeout(() => {
                    router.push("/user");
                }, 2000);
            }
        }
    }, [organisationId]);

    return (
        <>
            <Head>
                <title>Single Organisation - Haikoto</title>
            </Head>

            {!loadingState.show ? (
                <div className="items-center justify-center min-h-screen py-2">
                    <div className="m-10 md:mx-44">
                        <div className="mb-4">
                            <h1 className="text-center text-xl md:text-3xl">
                                {organisation.title}
                            </h1>
                        </div>

                        {/* <SingleOrganisation organisation={organisation} /> */}

                        <CardCancelButton />
                    </div>
                </div>
            ) : (
                <LoadingComponent {...loadingState} />
            )}
        </>
    );
}

export default withAuth(getOrganisation);
