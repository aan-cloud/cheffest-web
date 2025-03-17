import { useEffect } from "react";
import { motion } from "framer-motion";

export function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2400); // Sesuai dengan durasi animasi (1.2s * 2)
    return () => clearTimeout(timer); // Cleanup timer saat unmount
  }, [onFinish]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
      <div className="relative flex items-center justify-center w-24 h-24">
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.1,
              ease: "easeOut",
            }}
            className="absolute w-fit h-fit"
        >
          <img className="aspect-square w-[200px] h-[200px]" src="https://ucarecdn.com/ac5bf2eb-f9c8-4172-9cd8-f803c5ea17f2/Logo.svg" alt="" />
        </motion.div>
      </div> 
    </div>
  );
}