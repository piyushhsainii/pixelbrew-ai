
const Loader = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-black">
            <svg className="animate-spin h-24 w-24" viewBox="0 0 24 24">
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#4B0082"
                    strokeWidth="4"
                ></circle>
                <circle
                    className="opacity-75"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#8A2BE2"
                    strokeWidth="2"
                    strokeDasharray="30 60"
                    fill="none"
                ></circle>
            </svg>
        </div>
    );
};

export default Loader;