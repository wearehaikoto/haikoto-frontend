import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>Haikoto - Creating a unique workplace culture</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-1 lg:px-20 text-center">
                    {/* Reduc text size mobile */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        Welcome to <b className="text-blue-600">Haikoto</b>
                    </h1>

                    <div className="my-5" />

                    {/* Login | Signup Buttons */}
                    <div className="flex items-center justify-center w-full">
                        <Link href="auth/login">
                            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                Login
                            </a>
                        </Link>
                        <span className="mx-2"></span>
                        <Link href="auth/signup">
                            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                                Signup
                            </a>
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
}
