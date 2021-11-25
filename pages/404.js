import Head from "next/head";
import Link from "next/link";

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404 - Haikoto</title>
            </Head>

            <div className="flex items-center justify-center min-h-screen bg-blue-700">
                <div className="container">
                    <div className="text-white text-center">
                        <div className="relative ">
                            <h1 className="relative text-9xl font-sans font-bold">
                                <span>4</span>
                                <span>0</span>
                                <span>4</span>
                            </h1>
                        </div>
                        <h5 className="text-gray-300 font-semibold">
                            Page not found
                        </h5>
                        <p className="text-gray-100 mt-3">
                            We are sorry, but the page you requested was not
                            found
                        </p>
                        <Link href="/">
                            <button className="bg-gray-200 hover:bg-white mt-4 py-3 px-5 text-sm shadow-sm font-medium tracking-wider text-black rounded-full hover:shadow-lg">
                                Go Home
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
