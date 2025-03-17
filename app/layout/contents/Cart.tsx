import { toast } from "sonner";
import { Button } from "~/components/ui/button"
import type { Cart } from "~/types/cart"
import type { FoodToCart } from "~/types/foods";

export function UserCart ({cart} : { cart : Cart}) {

    async function removeFoodFromCart(slug: string, cartItemId: string) {
        try {
            const token = document.cookie
                ?.split("; ")
                .find((row) => row.startsWith("jwt="))
                ?.split("=")[1];

            const res = await fetch(`${import.meta.env.VITE_API_URL}/cart/${slug}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ cartItemId: cartItemId })
            });
    
            if (!res.ok) {
                throw new Error(`Error: ${res.statusText}`);
            }
    
            const data: Promise<FoodToCart> = await res.json();
    
            toast(`${(await data).productName} deleted from cart.`);

            window.location.reload();
        } catch (error: Error | any) {
            console.error(`Error at: ${error}`);
            toast(`Error at: ${error.message}`);
        }
    }
    return (
        <section className="px-4 sm:px-24 py-4 sm:py-10 flex flex-col justify-between gap-12 bg-[#0D0D0D]">
            <h1 className="text-2xl text-white font-black">MY CART</h1>
            <div className="flex justify-between">
                <div className="w-[60%] flex flex-col justify-between gap-5">
                    {
                        cart.items.length === 0 ? (
                            <h1 className="text-red-300 text-2xl text-center font-light">Cart is empty</h1>
                        ) : 
                        cart.items.map((item) => (
                            <div className="flex shadow-sm rounded-sm shadow-gray-200">
                                <img className="h-28" src={item.food.imageUrl} />
                                <div className="flex flex-col justify-between p-4" id="description">
                                    <h1 className="text-lg font-bold text-white">{item.food.name}</h1>
                                    <small className="text-white">Category: {"Default"}</small>
                                    <h1 className="text-white font-black text-xl">${item.food.price}</h1>
                                </div>
                                <div className="flex-grow h-full bg-transparent flex justify-end p-3">
                                    <svg onClick={() => removeFoodFromCart(item.food.slug, item.id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-red-500 cursor-pointer">
                                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="p-5 shadow-sm rounded-sm shadow-gray-200 w-[30%] h-fit">
                    <h1 className="text-lg font-bold text-white mb-2.5">Order Summary</h1>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between">
                            <small className="text-white">Subtotal</small>
                            <p className="text-white text-sm font-sans">{cart.totalPrice}</p>
                        </div>
                        <div className="flex justify-between">
                            <small className="text-red-500">Discount {`(${"0%"})`}</small>
                            <p className="text-sm font-sans text-red-500">-</p>
                        </div>
                        <div className="flex justify-between">
                            <small className="text-white">Total</small>
                            <p className="text-white text-sm font-sans">{cart.totalPrice}</p>
                        </div>
                    </div>
                    <Button className="mt-2.5 w-full bg-white hover:bg-gray-100 cursor-pointer text-black">Checkout</Button>
                </div>
            </div>
        </section>
    )
}