import React from "react";
import Link from "next/link";

export default function Home() {
    const [isMobileNavExpanded, setIsMobileNavExpanded] = React.useState(false);

    return (
        <>
            <main className="">
                <nav className="container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
                    <div className="flex items-center justify-between">
                        <div>
                            <Link href="/">
                                <a className="text-2xl font-black text-blue-600 lg:text-3xl">
                                    Haikoto
                                </a>
                            </Link>
                        </div>

                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="text-black focus:outline-none"
                                onClick={() =>
                                    setIsMobileNavExpanded(!isMobileNavExpanded)
                                }
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6 fill-current"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div
                        className={[
                            "flex flex-col mt-4 space-y-2 lg:mt-0 lg:flex-row lg:-mx-6 lg:space-y-0 lg:block lg:space-x-10",
                            isMobileNavExpanded ? "block" : "hidden"
                        ].join(" ")}
                    >
                        <Link href="/">
                            <a className="text-black hover:text-blue-600">
                                Home
                            </a>
                        </Link>
                        <a
                            className="text-black hover:text-blue-600"
                            href="mailto:z@mypd.io"
                        >
                            Contact us
                        </a>
                    </div>

                    <Link href="/loginOrSignup">
                        <a
                            className={[
                                "bg-blue-600 hover:bg-blue-700 block text-white font-bold h-10 px-5 py-2 mt-4 text-sm text-center capitalize transition-colors duration-200 transform border rounded lg:mt-0 lg:w-auto lg:block",
                                isMobileNavExpanded ? "block" : "hidden"
                            ].join(" ")}
                        >
                            Get Started
                        </a>
                    </Link>
                </nav>

                <section className="bg-gray-100">
                    <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col  mb-5 sm:mb-10">
                            <h1 className="lg:text-6xl text-4xl font-black leading-10 text-center text-gray-800">
                                <span className="text-blue-600">SWIPE</span> to
                                find the right person for the{" "}
                                <span className="text-blue-600">JOB</span>
                            </h1>
                            <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-center text-sm sm:text-lg">
                                We are creating a unique workspace culture! We
                                help you to find the perfect job! The only thing
                                You have to do is <b>SWIPE</b>!
                            </p>
                        </div>
                        <div className="flex justify-center items-center">
                            <Link href="/loginOrSignup">
                                <a className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 bg-blue-600 transition duration-150 ease-in-out hover:bg-blue-500 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-blue-600 py-2 sm:py-4 text-sm">
                                    Get Started
                                </a>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="mx-auto container py-20" id="#howitworks">
                    <div className="flex justify-center items-center flex-col">
                        <div className="lg:text-6xl text-4xl font-black leading-10 text-center text-gray-800">
                            <h1>How it Works</h1>
                        </div>
                        <div className="pt-24 grid lg:grid-cols-3 md:grid-cols-2 justify-center items-center xl:gap-y-16 gap-y-20 gap-x-16 lg:gap-x-20 lg:px-10 xl:px-0">
                            <div className="cursor-pointer shadow-lg py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col p-2">
                                <div className="text-gray-800 text-2xl font-semibold text-center">
                                    <h2>Create an Account</h2>
                                </div>
                                <div className="text-gray-600 mt-2 text-lg text-center ">
                                    <p>
                                        Click{" "}
                                        <Link href="/loginOrSignup">
                                            <a className="text-blue-600">
                                                get started
                                            </a>
                                        </Link>{" "}
                                        to create an account by simply choosing
                                        a codeName
                                    </p>
                                </div>
                            </div>
                            <div className="cursor-pointer shadow-lg py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col p-2">
                                <div className="text-gray-800 text-2xl font-semibold text-center">
                                    <h2>Play Cards</h2>
                                </div>
                                <div className="text-gray-600 mt-2 text-lg text-center">
                                    <p>
                                        After you get logged in, you can play
                                        cards. Simply Swipe left or right
                                        according to your preference.
                                    </p>
                                </div>
                            </div>
                            <div className="cursor-pointer shadow-lg py-6 xl:px-4 rounded xl:w-96 w-60 flex justify-center items-center flex-col p-2">
                                <div className="text-gray-800 text-2xl font-semibold text-center">
                                    <h2>View Results</h2>
                                </div>
                                <div className="text-gray-600 mt-2 text-lg text-center">
                                    <p>
                                        View Results after you have played
                                        cards, using a complex algorithm we rank
                                        your matches.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-8">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center mt-6">
                            <p className="text-base leading-4 text-gray-800">
                                {new Date().getFullYear()} &copy;{" "}
                                <span className="font-semibold text-blue-600">
                                    Haikoto
                                </span>
                            </p>
                            <div className="border-l border-gray-800 pl-2 ml-2">
                                <p className="text-base leading-4 text-gray-800">
                                    All rights reserved
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </>
    );
}
