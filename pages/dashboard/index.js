import Head from "next/head";
import Link from "next/link";
import { currentUser, withAuth } from "../../utils";
import { NavigationBarComponent } from "../../components";

function Dashboard() {
    const user = currentUser().userData;

    return (
        <>
            <Head>
                <title>@{user.codeName} - Haikoto</title>
            </Head>

            <div className="relative min-h-screen md:flex">
                <NavigationBarComponent />

                <div className="flex-1 p-10 text-2xl font-bold max-h-screen overflow-y-auto">
                    <section className="my-4 w-full p-5 rounded bg-blue-600">
                        <span className="text-white">
                            Hi there, <b>@{user.codeName}</b> 👋
                        </span>
                    </section>

                    <section className="my-4 w-full p-5 rounded bg-gray-200 bg-opacity-90">
                        <h2 className="text-2xl font-bold">
                            Nothing to much here yet
                        </h2>
                        <p className="text-lg">This is the dashboard :)</p>
                    </section>

                    <section className="my-4 w-full p-5 rounded bg-gray-200 bg-opacity-90">
                        <h2 className="text-2xl font-bold">Quick Links</h2>
                        <ul className="list-disc list-inside mt-5">
                            <li>
                                <Link href="/dashboard">
                                    <a className="text-blue-600 text-base lg:md:sm:text-lg">
                                        Dashboard
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/about-me">
                                    <a className="text-blue-600 text-base lg:md:sm:text-lg">
                                        About Me
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/logout">
                                    <a className="text-blue-600 text-base lg:md:sm:text-lg">
                                        Logout
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}

export default withAuth(Dashboard);
