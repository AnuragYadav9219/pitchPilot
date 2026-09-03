const bars = [
    18, 32, 48, 27, 62, 40, 75,
    34, 58, 82, 44, 68, 30, 52,
    70, 38, 60, 28, 46, 72,
];

export function AnimatedVoiceWave() {
    return (
        <div
            className="
                flex
                h-16
                items-center
                justify-center
                gap-1
            "
        >
            {bars.map((height, index) => (
                <span
                    key={index}
                    className="
                        w-[3px]
                        rounded-full
                        bg-gradient-to-t
                        from-[var(--vm-terracotta)]
                        via-[var(--vm-coral)]
                        to-[var(--vm-orange)]
                        animate-[voice-wave_1.2s_ease-in-out_infinite]
                    "
                    style={{
                        height: `${height}%`,
                        animationDelay: `${
                            index * 60
                        }ms`,
                    }}
                />
            ))}
        </div>
    );
}