import React from "react";
import Head from "next/head";
import Router from "next/router";
import "tailwindcss/tailwind.css";
import TagManager from "react-gtm-module";

import { LoadingComponent } from "../components";

function MyApp({ Component, pageProps }) {
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        // Google Tag Manager Init
        TagManager.initialize({ gtmId: "GTM-K376DMR" });

        //Binding router events
        Router.events.on("routeChangeStart", () => setIsLoading(true));
        Router.events.on("routeChangeComplete", () => setIsLoading(false));
        Router.events.on("routeChangeError", () => setIsLoading(false));
    }, []);

    return (
        <>
            <Head>
                <title>Haikoto - Creating a unique workplace culture</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isLoading && (
                <LoadingComponent text="Getting things reading... 🙃" />
            )}

            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
