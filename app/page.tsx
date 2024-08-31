export default function Home() {
    return (
        <main
            className="bg-gray-300 h-screen flex items-center justify-center p-5
        sm:bg-yellow-300 md:bg-yellow-400 lg:bg-yellow-500 xl:bg-yellow-700 2xl:bg-yellow-800"
        >
            <div
                className="bg-white w-full max-w-screen-sm shadow-lg p-5 rounded-3xl
            flex flex-col gap-2 justify-between md:flex-row"
            >
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-gray-200 h-10 rounded-full pl-5 ring-2 focus:ring-blue-200
                invalid:bg-red-100 invalid:focus:ring-red-500 outline-none peer"
                    required
                />
                <span className="text-red-500 text-sm hidden peer-invalid:block">Email is required.</span>
                <button
                    className="text-white rounded-xl py-1.5 
                active:scale-95 active:bg-blue-600 transition-transform font-semibold md:p-2
                bg-gradient-to-tr from-cyan-500 to-purple-300 peer-invalid:from-yellow-600 peer-invalid:to-red-400"
                >
                    Login
                </button>
            </div>
        </main>
    );
}
