import { Link } from "react-router";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function HomePage() {
    return (
        <div className="flex flex-col gap-28 bg-[#0D0D0D] pb-20">
            <HeroSection />
            <Statistics />
            <Ratings />
        </div>
    );
}

function HeroSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[url(/app/assets/Background.svg)] h-[calc(100vh-60px)] bg-cover bg-center"
        >
            <div id="description" className="p-4 sm:p-24 flex justify-start flex-col gap-2">
                <h1 className="font-sans font-black text-7xl text-white">Welcome!</h1>
                <h1 className="font-sans font-black text-7xl text-white">We make delicious</h1>
                <h1 className="font-sans font-black text-7xl text-white">Food for you</h1>
                <p className="text-white w-[40%]">
                    We have delicious burgers with extra toppings and high-quality ingredients, 
                    imported from New Zealand.
                </p>
                <Link to={"/foods"} className="w-fit font-medium bg-white rounded-2xl text-black mt-5 p-3 px-5">
                    Explore our menu
                </Link>
            </div>
        </motion.section>
    );
}

function Statistics() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-12 px-4 sm:px-24"
        >
            <h1 className="text-4xl font-bold font-sans text-white text-center">
                We believe in making quality food
            </h1>
            <div className="flex justify-evenly items-center">
                {[
                    { number: "2M+", label: "Happy Customers" },
                    { number: "98%", label: "Customer Satisfaction" },
                    { number: "20+", label: "Branches" },
                    { number: "100+", label: "Total Employees" },
                ].map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <h1 className="text-4xl font-black text-white">{item.number}</h1>
                        <small className="text-gray-300">{item.label}</small>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}

function Ratings() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="px-4 sm:px-24 flex flex-col gap-12"
        >
            <h1 className="text-4xl font-bold text-center text-white">What Our Clients Are Saying</h1>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-10">
                {Array.from({ length: 6 }, (_, i) => (
                    <CardRating key={i} />
                ))}
            </div>
        </motion.section>
    );
}

function CardRating() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#191919] p-7 flex flex-col gap-6 rounded-2xl"
        >
            <div className="flex items-start gap-5">
                <img
                    src="https://ucarecdn.com/0c9ed8c2-c775-4910-98a2-475161a5b19f/Avater.png"
                    alt="Avatar"
                />
                <div className="flex flex-col gap-1.5">
                    <h1 className="font-bold text-lg text-white">Aleena White</h1>
                    <small className="font-extralight text-white">Accountant of Ozone</small>
                    <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-4 fill-yellow-500"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>
            <p className="text-white">
                There are many variations of passages of Lorem Ipsum available, but the majority 
                have suffered alteration in some form.
            </p>
        </motion.div>
    );
}