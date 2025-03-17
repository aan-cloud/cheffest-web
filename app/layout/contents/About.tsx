import { LoadingScreen } from "~/components/ui/Loading"
import { useState } from "react"
import { motion } from "framer-motion";

export function About () {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="flex px-4 sm:px-24 py-14 flex-col gap-28 bg-[#0D0D0D] pb-20">
            { isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} /> }
            { !isLoading && (
                <motion.section 
                className="flex flex-col justify-between gap-6"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="text-center text-white text-6xl font-bold"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  We take pride in being more than just a fast-food provider
                </motion.h1>
                
                <motion.p 
                  className="text-center text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  We are passionate food artisans dedicated to delivering the highest quality meals with every bite. 🍔🌯🥪
                </motion.p>
                
                <motion.div 
                  className="flex mt-11 items-start justify-between"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <motion.p 
                    className="text-white w-1/2"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    With years of experience in the food industry, we understand that great food starts with great ingredients. That’s why we go the extra mile to source premium-quality meats, farm-fresh vegetables, and the best grains to create soft, flavorful breads and tortillas. Our dedication to quality extends beyond just ingredients—we continuously innovate, refine, and improve our cooking techniques to bring you mouthwatering dishes that satisfy every craving.
                    Whether you're looking for a quick and tasty meal on the go or a satisfying feast to enjoy with friends and family, we guarantee that every item on our menu is made with passion, care, and an unwavering commitment to quality. Experience the difference with every bite, and discover why we are the best in the business!
                    ✨ Fresh Ingredients | 🍞 Handcrafted Bread | 🍖 Premium Meats | 🌯 Perfectly Made Tortillas | 🍔 Unmatched Flavor ✨
                    <br /><br />
                    #QualityFastFood #MadeWithPassion #TasteTheDifference
                  </motion.p>
                  
                  <motion.img 
                    className="w-1/2 h-80" 
                    src="/app/assets/Video.svg" 
                    alt="Video mockup"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                  />
                </motion.div>
              </motion.section>
            )}
        </div>
    )
}