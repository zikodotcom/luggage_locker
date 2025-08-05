import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CreativeLoader({ isLoading, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    "Searching locations...",
    "Finding best prices...",
    "Checking availability...",
    "Almost ready!",
  ];

  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900"
        >
          {/* Background animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: Math.random() * 100 + 20,
                  height: Math.random() * 100 + 20,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`luggage-${i}`}
                className="absolute text-white/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ x: [0, 100, 0], rotate: [0, 360] }}
                transition={{
                  duration: Math.random() * 8 + 5,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2h3c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h3zm2-2v2h4V4h-4zm-5 4v10h14V8H5zm2 2h10v6H7v-6z" />
                </svg>
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 text-center">
            {/* Logo animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
              className="mb-8"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-white/30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 120, height: 120 }}
                />
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2h3c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h3zm2-2v2h4V4h-4zm-5 4v10h14V8H5zm2 2h10v6H7v-6z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-4xl font-bold text-white mb-2"
            >
              LuggageLock
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-white/80 text-lg mb-8"
            >
              Store Smart, Travel Free
            </motion.p>

            {/* Conveyor belt */}
            <div className="mb-8">
              <div className="relative w-80 h-16 mx-auto bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: [-400, 400] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 transform -translate-y-1/2 text-white/60"
                    animate={{ x: [-60, 340] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 1,
                      ease: "linear",
                    }}
                  >
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2h3c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2h3zm2-2v2h4V4h-4z" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-80 mx-auto mb-6">
              <div className="flex justify-between text-white/60 text-sm mb-2">
                <span>Loading</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Steps */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-white/80 text-lg"
            >
              {loadingSteps[currentStep]}
            </motion.div>

            {/* Dots */}
            <div className="flex justify-center space-x-1 mt-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white/60 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>

            {/* Fun fact */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm"
            >
              💡 Did you know? The average traveler carries 23kg of luggage
            </motion.div> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
