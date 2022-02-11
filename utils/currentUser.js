import React from "react";
import jwtDecode from "jwt-decode";

export default function currentUser() {
    const [authToken, setAuthToken] = React.useState(null);

    React.useEffect(() => {
        // Get the token from localStorage
        setAuthToken(localStorage.getItem("auth-token"));
    }, []);

    // If there is no token, return null
    if (!authToken) {
        return {
            userData: {},
            token: {}
        };
    }

    // Decode the token and return the user
    const userData = jwtDecode(authToken);

    return {
        userData,
        token: authToken
    };
}
