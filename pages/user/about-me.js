import React from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { AlertComponent } from "../../app/components";
import { currentUser, withAuth, uploadImage } from "../../app/utils";
import { createCardUploadGreyImage } from "../../app/assets";

function createCard() {
    const user = currentUser().userData;

    return (
        <>
            <Head>
                <title>{user.codeName.toUpperCase()} - Haikoto</title>
            </Head>

            <div className="items-center justify-center min-h-screen py-2">
                <div className="m-10 md:mx-44 h-screen">
                    <div className="border-black border-2 border-dashed mb-4 p-2">
                        <h1 className="text-center text-xl md:text-3xl">
                            About Me
                        </h1>
                    </div>

                    <div className="border-black border-2 border-dashed mb-10 p-4 py-16 h-full">
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
                    </div>

                    <Link href="/user">
                        <a>
                            <div className="flex justify-around mt-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-20"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default withAuth(createCard);
