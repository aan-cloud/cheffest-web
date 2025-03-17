import { Instagram, Twitter, Linkedin } from "lucide-react"

export function Footer () {
    return (
        <section className="px-4 sm:px-24 py-4 sm:py-20 bg-[#191919] flex flex-col">
            <div className="flex justify-between items-start border-b pb-10">
                <ol>
                    <li className="text-lg font-bold text-white mb-2">Our Products</li>
                    <li className="font-light text-white">Our Menus</li>
                    <li className="font-light text-white">Our burgers</li>
                    <li className="font-light text-white">Our sandwiches</li>
                </ol>
                <ol>
                    <li className="text-lg font-bold text-white mb-2">Legal Information</li>
                    <li className="font-light text-white">Legal Notice</li>
                    <li className="font-light text-white">About</li>
                </ol>
                <ol>
                    <li className="text-lg font-bold text-white mb-2">Contact Us</li>
                    <li className="font-light text-white">cheffest@mail.com</li>
                </ol>
                <ol>
                    <li className="text-lg font-bold text-white mb-2">We accept</li>
                    <li className="mb-1.5">
                        <img className="h-5" src="https://ucarecdn.com/e590d652-d479-40d1-b800-c2dfc11d316b/Visa.svg" alt="" />
                    </li>
                    <li className="mb-1.5">
                        <img className="h-5" src="https://ucarecdn.com/dcc7c22a-a1b8-4fd3-b44c-20fc9d3acbe4/Mastercard.svg" alt="" />
                    </li>
                </ol>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div className="flex gap-2.5">
                    <Instagram className="fill-white font-light"/>
                    <Twitter className="fill-white font-light"/>
                    <Linkedin className="fill-white font-light"/>
                </div>
                <p className="text-white font-extralight">© 2024 Cheffest All rights reserved.</p>
            </div>
        </section>
    )
}