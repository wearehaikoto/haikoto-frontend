import React from "react";

import { currentUser, withAuth } from "../../app/utils";

function Index() {
    const [user, setUser] = React.useState(currentUser().userData);

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-1 lg:px-20 text-center">
                    <div className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            Hello{" "}
                            <b className="text-blue-600"> {user.codeName}</b>
                        </h1>
                        <div className="my-5" />
                        <p className="text-lg md:text-xl lg:text-2xl">
                            You are logged in!
                        </p>
                    </div>
                </main>
            </div>
        </>
    );
}

export default withAuth(Index);
