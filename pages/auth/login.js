import Head from "next/head";
import Link from "next/link";
import Lottie from "react-lottie-player";
import LottieLoginAnimationData from "../../public/assets/78126-secure-login.json";

export default function Login() {
    return (
        <>
            <Head>
                <title>
                    Login | Haikoto - Creating a unique workplace culture
                </title>
            </Head>

            <div className="w-full flex flex-wrap">
                {/* Login Section */}
                <div className="w-full md:w-1/2 flex flex-col">
                    <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                        <Link href="/">
                            <a className="bg-black text-white font-bold text-xl p-4">
                                Haikoto
                            </a>
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p className="text-center text-3xl">
                            Sign in to Haikoto
                        </p>
                        <form
                            className="flex flex-col pt-3 md:pt-8"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <div className="flex flex-col pt-4">
                                <label htmlFor="email" className="text-lg">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
                            >
                                Log In
                            </button>
                        </form>
                        <div className="text-center pt-12 pb-12">
                            <p>
                                New to Haikoto?{" "}
                                <Link href="/auth/signup">
                                    <a className="underline font-semibold">
                                        Create an account.
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                {/* Image Section */}
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
