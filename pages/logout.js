import React from "react";
import { useRouter } from "next/router";

import { withAuth } from "../utils";
import { LoadingComponent } from "../components";

// Clear localstorage and show loading page
function Logout() {
    const router = useRouter();

    React.useEffect(() => {
        // Clear localstorage
        localStorage.clear();

        // Redirect to login page
        setTimeout(() => {
            router.push("/loginOrSignup");
        }, 1500);
    }, []);

    return (
        <LoadingComponent
            text="Logging out.."
            description="You will be redirected to the homepage in a few seconds."
        />
    );
}

export default withAuth(Logout);
