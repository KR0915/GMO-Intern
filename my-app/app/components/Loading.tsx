import React from 'react';

const Loading = () => {
    const loadingText = "Loading";
    const segments = [...Array(8)];

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-white">
            <div className="flex justify-center items-center gap-6">
                <div className="relative w-16 h-16">
                    {segments.map((_, index) => (
                        <div
                            key={index}
                            className="absolute w-4 h-4 bg-sky-400 rounded-full"
                            style={{
                                transform: `rotate(${index * 45}deg) translate(0, -150%)`,
                                animation: `spin 1s linear infinite`,
                                animationDelay: `${index * 0.125}s`,
                                opacity: 0,
                                animationName: 'fade'
                            }}
                        ></div>
                    ))}
                </div>
                <div className="flex text-[30px] font-weight text-blue-500">
                    {loadingText.split("").map((char, index) => (
                        <span
                            key={index}
                            className="animate-bounce"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {char}
                        </span>
                    ))}
                </div>
            </div>
            <style jsx>{`
                @keyframes fade {
                    0% { opacity: 1; }
                    100% { opacity: 0; }
                }
            `}</style>
        </div>
    );
}

export default Loading;