export default function Card() {
    return (
        <main
            className="bg-gray-300 h-screen flex items-center justify-center p-5 
        dark:bg-gray-800"
        >
            <div
                className="bg-white w-full max-w-screen-sm shadow-lg p-5 rounded-3xl
            dark:bg-gray-600"
            >
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-gray-500 font-semibold -mb-1.5 dark:text-gray-300">In transit</span>
                        <span className="text-4xl font-semibold dark:text-white">Coolblue</span>
                    </div>
                    <div className="flex flex-col text-center size-12 bg-orange-500 rounded-full text-slate-100 font-bold ">
                        <span className="pt-1 -mb-1">cool</span>
                        <span className="pb-1 -mt-1">blue</span>
                    </div>
                </div>
                <div className="my-2 flex gap-2 items-center">
                    <span
                        className="bg-green-400 text-white rounded-full py-1 px-3 text-sm font-medium
                     hover:bg-green-500 hover:scale-110 
                     transition cursor-pointer"
                    >
                        TODAY
                    </span>
                    <span className="font-semibold dark:text-gray-100">9:30-10:30</span>
                </div>
                <div>
                    <div className="relative">
                        <div className="bg-gray-200 w-full h-2 rounded-full absolute" />
                        <div className="bg-green-400 w-2/3 h-2 rounded-full absolute" />
                    </div>
                </div>
                <div className="flex justify-between mt-5 text-gray-600 dark:text-gray-50">
                    <span>Expected</span>
                    <span>Sorting center</span>
                    <span>In transit</span>
                    <span className="text-gray-300 dark:text-gray-400">Delivered</span>
                </div>
            </div>
        </main>
    );
}
