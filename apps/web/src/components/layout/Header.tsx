// import { Menu } from "lucide-react";
// import { UserMenu } from "./UserMenu";

// interface HeaderProps {
//     onMenuClick: () => void;
// }

// export function Header({ onMenuClick }: HeaderProps) {
//     return (
//         <header className="sticky top-0 z-30 flex h-16 min-h-16 w-full shrink-0 items-center border-b border-(--vm-border) bg-(--vm-background)/90 px-4 sm:px-6 backdrop-blur-xl">
//             {/* Mobile menu */}
//             <button
//                 type="button"
//                 onClick={onMenuClick}
//                 aria-label="Open navigation"
//                 className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-(--vm-muted) transition-colors hover:bg-(--vm-surface-2) hover:text-(--vm-text) lg:hidden"
//             >
//                 <Menu size={21} strokeWidth={1.9} />
//             </button>

//             {/* Desktop context */}
//             <div className="hidden min-w-0 lg:block">
//                 <p className="truncate text-sm font-medium text-(--vm-muted)">
//                     Your mentoring workspace
//                 </p>
//             </div>

//             {/* Right actions */}
//             <div className="ml-auto flex h-16 min-h-16 shrink-0 items-center gap-1 sm:gap-2">

//                 {/* User menu */}
//                 <UserMenu />
//             </div>
//         </header>
//     );
// }




























import { Flame, Menu } from "lucide-react";
import { motion } from "framer-motion";

import { UserMenu } from "./UserMenu";

interface HeaderProps {
  onMenuClick: () => void;
  currentStreak?: number;
}

export function Header({
  onMenuClick,
  currentStreak = 0,
}: HeaderProps) {
  const hasStreak = currentStreak > 0;

  return (
    <header className="sticky top-0 z-30 flex h-16 min-h-16 w-full shrink-0 items-center border-b border-(--vm-border) bg-(--vm-background)/90 px-3 backdrop-blur-xl sm:px-5">
      {/* Mobile menu */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-(--vm-muted) transition-colors hover:bg-(--vm-surface-2) hover:text-(--vm-text) lg:hidden"
      >
        <Menu
          size={20}
          strokeWidth={1.9}
        />
      </button>

      {/* Desktop context */}
      <div className="hidden min-w-0 lg:block">
        <p className="truncate text-sm font-medium text-(--vm-muted)">
          Your mentoring workspace
        </p>
      </div>

      {/* Right actions */}
      <div className="ml-auto flex h-full shrink-0 items-center gap-1.5">
        {/* Compact streak */}
        <div className="group relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className={`relative flex h-9 items-center gap-0.5 rounded-lg px-2 transition-colors ${
              hasStreak
                ? "hover:bg-(--vm-orange)/8"
                : "hover:bg-(--vm-surface-2)"
            }`}
          >
            {/* Flame */}
            <motion.div
              animate={
                hasStreak
                  ? {
                      y: [0, -1, 0],
                      rotate: [0, -2, 2, 0],
                    }
                  : undefined
              }
              transition={
                hasStreak
                  ? {
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : undefined
              }
              className="relative flex items-center justify-center"
            >
              <Flame
                size={17}
                strokeWidth={2.2}
                className={
                  hasStreak
                    ? "text-(--vm-orange)"
                    : "text-(--vm-muted)"
                }
              />

              {/* Tiny ember */}
              {hasStreak && (
                <motion.span
                  aria-hidden="true"
                  className="absolute left-1/2 top-0 h-1 w-1 rounded-full bg-(--vm-accent)"
                  animate={{
                    opacity: [0, 1, 0],
                    y: [2, -4, -7],
                    scale: [0.6, 1, 0.3],
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
            </motion.div>

            {/* Number */}
            <motion.span
              key={currentStreak}
              initial={{
                opacity: 0,
                y: 3,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.2,
              }}
              className={`text-sm font-bold leading-none ${
                hasStreak
                  ? "text-(--vm-text)"
                  : "text-(--vm-muted)"
              }`}
            >
              {currentStreak}
            </motion.span>
          </motion.div>

          {/* Compact tooltip */}
          <div className="pointer-events-none absolute right-0 top-full z-50 mt-1.5 w-max rounded-md border border-(--vm-border) bg-(--vm-surface-solid) px-2.5 py-1.5 opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100">
            <p className="text-[11px] font-medium text-(--vm-text)">
              {hasStreak
                ? `🔥 ${currentStreak}-day streak`
                : "No active streak"}
            </p>
          </div>
        </div>

        {/* User menu */}
        <UserMenu />
      </div>
    </header>
  );
}