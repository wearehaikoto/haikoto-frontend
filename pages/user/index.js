import React from "react";
import jwt_decode from "jwt-decode";

import { withAuth } from "../../app/utils";

function Index() {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        setUser(sessionStorage.getItem("auth-token"));
        console.log(jwt_decode(sessionStorage.getItem("auth-token")));
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-1 lg:px-20 text-center">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            Hello <b className="text-blue-600">User</b>
                        </h1>
                        <div className="my-5" />
                        <p className="text-lg md:text-xl lg:text-2xl">
                            You are logged in!
                            <br />
                            Token : {user}
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}

export default withAuth(Index);
