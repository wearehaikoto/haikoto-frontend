import React from "react";
import Head from "next/head";

import { currentUser, withAuth } from "../../app/utils";
import { CardCancelButton } from "../../app/components";

function createCard() {
    const user = currentUser().userData;

    return (
        <>
            <Head>
                <title>About {user.codeName} - Haikoto</title>
            </Head>

            <div className="items-center justify-center min-h-screen py-2">
                <div className="m-10 md:mx-44 h-screen">
                    <div className="border-black border-2 border-dashed mb-4 p-2">
                        <h1 className="text-center text-xl md:text-3xl">
                            About Me
                        </h1>
                    </div>

                    {/* <div className="border-black border-2 border-dashed mb-10 p-4 py-16 h-full">
                        <div className="grid grid-cols-6 justify-items-stretch items-end gap-3 h-2/3 md:px-16">
                            <div className="bg-pink-500 h-[70%]" />
                            <div className="bg-purple-500 h-[80%]" />
                            <div className="bg-green-500 h-[50%]" />
                            <div className="bg-yellow-500 h-[100%]" />
                            <div className="bg-blue-500 h-[30%]" />
                            <div className="bg-indigo-500 h-[60%]" />
                        </div>

                        <div className="text-center mt-5 tracking-wider">
                            <h1 className="text-lg">
                                <strong className="text-3xl">humble,</strong>{" "}
                                smart,
                            </h1>
                            <h1 className="text-lg">
                                happy,{" "}
                                <strong className="text-3xl">confident,</strong>
                            </h1>
                            <h1 className="text-lg">
                                <strong className="text-3xl">
                                    problem solver
                                </strong>
                            </h1>
                        </div>
                    </div> */}

                    <CardCancelButton />
                </div>
            </div>
        </>
    );
}

export default withAuth(createCard);
