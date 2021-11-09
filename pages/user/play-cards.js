import React from "react";
import Image from "next/image";
import Head from "next/head";

import { currentUser, withAuth } from "../../app/utils";
import { createCardUploadGreyImage } from "../../app/assets";
import {
    CardYesButton,
    CardNoButton,
    CardCancelButton
} from "../../app/components";

function playCards() {
    const user = currentUser();

    return (
        <>
            <Head>
                <title>Play Cards - Haikoto</title>
            </Head>

            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <div className="m-8 md:mx-44">
                    <div className="border-black border-2 border-dashed mb-4 p-2">
                        <h1 className="text-center text-xl md:text-3xl">
                            Play Cards
                        </h1>
                    </div>
                    <div className="">
                        <div className="border-black border-2 border-dashed mt-2 mb-10 p-4 md:py-16">
                            <div className="flex justify-center">
                                <Image
                                    src={createCardUploadGreyImage}
                                    width={500}
                                    height={500}
                                />
                            </div>

                            <div className="mt-4 mb-8">
                                <h1 className="font-bold text-2xl md:text-5xl text-center">
                                    GOSSIP
                                </h1>
                                <p className="text-center md:text-4xl">
                                    SOFT SKILL
                                </p>
                            </div>

                            <div className="flex justify-around mb-4">
                                <CardNoButton
                                    onClickHandler={(e) => console.log(e)}
                                />
                                <CardYesButton
                                    onClickHandler={(e) => console.log(e)}
                                />
                            </div>
                        </div>

                        <div className="border-black border-2 border-dashed p-3 mb-10">
                            <div className="flex justify-around text-3xl">
                                <h1>NO</h1>
                                <h1>YES</h1>
                            </div>
                        </div>
                    </div>

                    <CardCancelButton />
                </div>
            </div>
        </>
    );
}

export default withAuth(playCards);
