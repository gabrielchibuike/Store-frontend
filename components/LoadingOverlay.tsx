// components/LoadingOverlay.tsx
import { ShoppingCartIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

interface LoadingOverlayProps {
  title: string;
  description: string;
}

export const LoadingOverlay = ({ title, description }: LoadingOverlayProps) => {
  // Framer Motion Variants for the Icon Pulse (replacing Animated.loop/sequence)
  const iconPulseVariants: Variants = {
    animate: {
      scale: [1, 1.3, 1, 1.15, 1], // The "heartbeat" sequence
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        times: [0, 0.3, 0.6, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0.5, // The 500ms delay at the end
      },
    },
  };

  // Framer Motion Variants for the Glow/Scale (replacing subtle glow pulse)
  const glowScaleVariants: Variants = {
    animate: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  // Framer Motion Variants for the overall Modal Fade (replacing fadeValue)
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // The custom shape from the original SVG is replaced with a more web-standard blob/radial gradient for simplicity,
  // but the original SVG Path is retained for maximal fidelity if you need it.
  const customPath =
    "M31.5,-57.9C38.1,-50.7,38.9,-36.8,37.7,-26C36.4,-15.3,33.2,-7.6,40.3,4.1C47.5,15.8,64.9,31.7,60.8,33.4C56.8,35.1,31.3,22.6,17.6,31.3C3.9,39.9,2,69.7,-4.5,77.6C-11,85.5,-22.1,71.4,-31.8,60.4C-41.6,49.5,-50,41.6,-47.3,32.1C-44.6,22.5,-30.7,11.3,-33,-1.3C-35.4,-13.9,-53.9,-27.9,-56.1,-36.6C-58.4,-45.4,-44.4,-49.1,-32.3,-53.1C-20.3,-57.1,-10.1,-61.4,1.2,-63.4C12.4,-65.4,24.9,-65,31.5,-57.9Z";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-5"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="flex flex-col items-center">
        {/* Loading Card */}
        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-green-100 shadow-xl shadow-green-500/20">
          {/* SVG Container (Blob/Background shape) */}
          <div className="pointer-events-none absolute -right-3 top-[30px] z-0 opacity-30">
            <svg width={150} height={150} viewBox="0 0 200 200">
              <path
                fill="#1ab65c"
                d={customPath}
                transform="translate(100 10)"
              />
            </svg>
          </div>

          {/* Animated Icon Container (Pulse) */}
          <motion.div
            className="z-10 flex h-10 w-10 items-center justify-center rounded-full bg-secondary shadow-md shadow-secondary/50"
            variants={iconPulseVariants}
            animate="animate"
          >
            {/* Inner Icon (Glow Scale) */}
            <motion.div
              className="flex items-center justify-center"
              variants={glowScaleVariants}
              animate="animate"
            >
              <ShoppingCartIcon size={20} color="#ffffff" />
            </motion.div>
          </motion.div>
        </div>

        {/* Text Area */}
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-white">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-gray-300">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
