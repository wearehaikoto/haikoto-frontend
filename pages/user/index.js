import React from "react";

import { withAuth } from "../../app/utils";

function Index() {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        setUser(localStorage.getItem("auth-token"));
    }, []);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-1 lg:px-20 text-center">
                    {/* Reduc text size mobile */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        Welcome to <b className="text-blue-600">{user}</b>
                    </h1>
                </main>
            </div>
        </>
    );
}

export default withAuth(Index);
