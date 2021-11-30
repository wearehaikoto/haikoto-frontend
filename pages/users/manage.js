import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { userService } from "../../app/services";
import { currentUser, withAuth } from "../../app/utils";
import { LoadingComponent, CardCancelButton } from "../../app/components";

function manageUser() {
    const user = currentUser().userData;
    const router = useRouter();

    const [loadingState, setLoadingState] = React.useState({
        show: true,
        text: "Loading...",
        description: ""
    });
    const [users, setUsers] = React.useState([]);

    React.useEffect(async () => {
        const getMyUsers = await userService.getAll();

        if (getMyUsers.success) {
            setUsers(getMyUsers.data);
            setLoadingState({ show: false, text: "" });
        } else {
            setLoadingState({
                show: true,
                text: `Error: ${getMyUsers.message}.`,
                description: "Redirecting..."
            });

            setTimeout(() => {
                router.push("/user");
            }, 2000);
        }
    }, []);

    async function handleDeleteUser(userId) {
        if (confirm("Are you sure you want to delete this user?")) {
            const deleteUser = await userService.deleteUser(userId);

            if (deleteUser.success) {
                setUsers(users.filter((c) => c._id !== userId));
            } else {
                alert(deleteUser.message);
            }
        }
    }

    async function handleUpgradeUser(userId) {
        alert("still in progress 🙈");
        // if (confirm("Are you sure you want to make user admin?")) {
        //     // const deleteUser = await userService.deleteUser(userId);

        //     // if (deleteUser.success) {
        //     //     setUsers(users.filter((c) => c._id !== userId));
        //     // } else {
        //     //     alert(deleteUser.message);
        //     // }
        // }
    }

    return (
        <>
            <Head>
                <title>All Users - Haikoto</title>
            </Head>

            {!loadingState.show ? (
                <div className="items-center justify-center min-h-screen py-2">
                    <div className="m-10 md:mx-44">
                        {/*  <div className="border-black border-2 border-dashed mb-10 py-16"> */}
                        <div className="mb-4">
                            <h1 className="text-center text-xl md:text-3xl">
                                All Users
                            </h1>
                        </div>

                        <div className="mb-10">
                            <div className="p-4 overflow-x-auto">
                                <table className="table-auto w-full">
                                    <thead className="bg-blue-600">
                                        <tr>
                                            <th className="px-4 py-2 text-xs text-white text-left">
                                                User ID
                                            </th>
                                            <th className="px-4 py-2 text-xs text-white text-left">
                                                CodeName
                                            </th>
                                            <th className="px-4 py-2 text-xs text-white text-left" />
                                            <th className="px-4 py-2 text-xs text-white text-left" />
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {users.map((user) => {
                                            return (
                                                <tr key={user._id}>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        {user._id}
                                                    </td>
                                                    <td className="border px-4 py-2 text-blue-600 border-blue-500 font-medium">
                                                        {user.codeName}
                                                    </td>
                                                    <td className="border px-4 py-2 text-yellow-600 border-blue-500 font-medium">
                                                        <button
                                                            onClick={() =>
                                                                handleUpgradeUser(
                                                                    user._id
                                                                )
                                                            }
                                                        >
                                                            <a className="text-yellow-600">
                                                                Upgrade
                                                            </a>
                                                        </button>
                                                    </td>
                                                    <td className="border px-4 py-2 text-yellow-600 border-blue-500 font-medium">
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteUser(
                                                                    user._id
                                                                )
                                                            }
                                                        >
                                                            <a className="text-red-600">
                                                                Delete
                                                            </a>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <CardCancelButton />
                    </div>
                </div>
            ) : (
                <LoadingComponent {...loadingState} />
            )}
        </>
    );
}

export default withAuth(manageUser);
