export default function Loading({ text, description }) {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="flex flex-col items-center justify-center w-full flex-1 px-1 lg:px-20 text-center">
                    <div class="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 " />
                    </div>
                    {text && (
                        <h1 className="text-3xl font-bold mt-4">{text}</h1>
                    )}
                    {description && (
                        <p className="text-lg font-light mt-4">{description}</p>
                    )}
                </main>
            </div>
        </>
    );
}
