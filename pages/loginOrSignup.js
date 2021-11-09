import React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Lottie from "react-lottie-player";

import { authService } from "../app/services";
import { withoutAuth } from "../app/utils";
import { AlertComponent } from "../app/components";
import { LottieLoginAnimationData } from "../app/assets";

function loginOrSignup() {
    const router = useRouter();

    const [codeName, setCodeName] = React.useState("");
    const [alertState, setAlertState] = React.useState({
        show: false,
        message: "",
        type: ""
    });

    const processLoginOrSignup = async (e) => {
        // Clear the alert state
        setAlertState({ show: false, message: "", type: "" });

        e.preventDefault();

        if (codeName.length < 1) {
            setAlertState({
                show: true,
                message: "Please enter a code name.",
                type: "error"
            });
            return;
        }

        const tryRegister = await authService.loginOrSignup(codeName);

        if (tryRegister.success) {
            setAlertState({
                show: true,
                message: tryRegister.message,
                type: "success"
            });

            // Redirect to the user page
            setTimeout(() => {
                router.push("/user");
                router.reload();
            }, 2000);
        } else {
            setAlertState({
                show: true,
                message: tryRegister.message,
                type: "error"
            });
        }
    };

    return (
        <>
            <Head>
                <title>Login | Signup - Haikoto</title>
            </Head>

            <div className="w-full flex flex-wrap">
                {/* Signup Section */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                        <Link href="/">
                            <a className="bg-blue-600 text-white font-bold text-xl p-4">
                                Haikoto
                            </a>
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-3xl">Login | Signup</p>
                        <form
                            className="flex flex-col pt-3 md:pt-8"
                            onSubmit={processLoginOrSignup}
                        >
                            {alertState.show && (
                                <AlertComponent {...alertState} />
                            )}
                            <div className="flex flex-col pt-4">
                                <label className="text-lg">Code Name</label>
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    value={codeName}
                                    onChange={(e) =>
                                        setCodeName(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 p-2 mt-8"
                            >
                                Proceed
                            </button>
                        </form>
                    </div>
                </div>

                <div className="w-1/2 shadow-2xl">
                    <Lottie
                        className="object-cover w-full h-screen hidden md:block"
                        animationData={LottieLoginAnimationData}
                        loop={true}
                        play={true}
                    />
                </div>
            </div>
        </>
    );
}

export default withoutAuth(loginOrSignup);
