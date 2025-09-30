export default function LoginPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <h1 className="text-3xl font-extrabold mb-8 tracking-wide drop-shadow-md">
                Login
            </h1>

            <form
                className="w-full max-w-sm p-8 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-2xl transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
            >
                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="bg-white/5 border border-white/20 text-white placeholder-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="bg-white/5 border border-white/20 text-white placeholder-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                        Sign In
                    </button>
                </div>
            </form>
        </main>
    );
}
