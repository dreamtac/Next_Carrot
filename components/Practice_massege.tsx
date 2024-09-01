export default function Message() {
    return (
        <main
            className="bg-gray-300 h-screen flex items-center justify-center p-5 flex-col
sm:bg-yellow-300 md:bg-yellow-400 lg:bg-yellow-500 xl:bg-yellow-700 2xl:bg-yellow-800"
        >
            <div
                className="bg-white w-full max-w-screen-sm shadow-lg p-5 rounded-3xl
    flex flex-col gap-3"
            >
                {['프리덤', '마르니', '달곰이', '끙혀'].map((user, index) => (
                    <div key={index} className="flex items-center group gap-5 hover:bg-gray-200 cursor-pointer">
                        <div className="bg-blue-400 size-10 rounded-full " />
                        <span className="text-lg font-medium group-hover:font-bold">{user}</span>
                        <div
                            className="bg-red-500 size-6 rounded-full text-white flex items-center justify-center
                animate-bounce"
                        >
                            <span>{index}</span>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
