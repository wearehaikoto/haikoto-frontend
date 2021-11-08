import { useRouter } from "next/router";

const withoutAuth = (WrappedComponent) => {
    return (props) => {
        // checks whether we are on client / browser or server.
        if (typeof window !== "undefined") {
            const Router = useRouter();

            // Check if access token is in local storage
            const accessToken = localStorage.getItem("auth-token");

            // If this is no accessToken we just render the component that was passed with all its props
            if (!accessToken) {
                return <WrappedComponent {...props} />;
            }

            // If there is access token we redirect to "/user" page.
            Router.replace("/user");
            return null;
        }

        // If we are on server, return null
        return null;
    };
};

export default withoutAuth;