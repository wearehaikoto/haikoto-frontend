import Head from "next/head";

export default function Custom404() {
    return (
        <>
            <Head>
                <title>500 - Haikoto</title>
            </Head>

            <div className="flex items-center justify-center min-h-screen bg-blue-700">
                <div className="container">
                    <div className="text-white text-center">
                        <div className="relative ">
                            <h1 className="relative text-9xl font-sans font-bold">
                                <span>5</span>
                                <span>0</span>
                                <span>0</span>
                            </h1>
                        </div>
                        <h5 className="text-gray-300 font-semibold">
                            Internal Server Error.
                        </h5>
                    </div>
                </div>
            </div>
        </>
    );
}
