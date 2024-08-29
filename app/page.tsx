export default function Home() {
    return (
        <main className="bg-gray-300 h-screen flex items-center justify-center p-5 ">
            <div
                className="bg-white w-full max-w-screen-sm shadow-lg p-5 rounded-3xl
            flex flex-col gap-2 justify-between"
            >
                <input type="text" placeholder="Search here..." className="w-full bg-gray-200 h-10 rounded-full pl-5" />
                <button
                    className="bg-blue-500 text-white rounded-xl py-1.5 
                active:scale-95 active:bg-blue-600 transition-transform font-semibold"
                >
                    Search
                </button>
            </div>
        </main>
    );
}
