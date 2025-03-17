import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { LoadingScreen } from "~/components/ui/Loading"
import type { FoodToCart } from "~/types/foods"
import type { Food } from "~/types/foods"


export function Products ({ productList }: { productList: Food[]}) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 2400);
      return () => clearTimeout(timer);
    }, []);
    

    return (
        <section className="px-4 sm:px-24 flex flex-col gap-20 py-14 bg-[#0D0D0D]">
            { isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} /> }
            { !isLoading && (
                <section className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
                    {
                        productList.map(product => (
                            <ProductCard key={product.name} product={product}/>
                        ))
                    }
                </section>
            ) }
        </section>
    )
}

function ProductCard({ product }: { product: Food }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.3 }
        );
        
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
        
        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    async function addFoodToCart() {
        const token = document.cookie
            ?.split("; ")
            .find((row) => row.startsWith("jwt="))
            ?.split("=")[1];

        const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/${product.id}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ sum: 1 })
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const data: Promise<FoodToCart> = await res.json();

        toast(`${(await data).productName} added to cart.`);
    }

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="p-5 flex flex-col gap-4 bg-[#191919]"
        >
            <img className="h-48" src={product.imageUrl} alt={product.name} />
            <h1 className="font-bold text-lg text-white">{product.name}</h1>
            <small className="font-extralight text-white">{product.description}</small>
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl text-white">${product.price}</h1>
                <Button onClick={addFoodToCart} className="bg-transparent cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-white">
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                    </svg>
                </Button>
            </div>
        </motion.div>
    );
}