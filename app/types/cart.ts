type CartItem = {
    id: string,
    quantity: number,
    foodId: string,
    cartId: string,
    food: {
        id: string,
        name: string,
        slug: string,
        price: number,
        description: string,
        imageUrl: string,
    }
}

export type Cart = {
    totalPrice: number,
    id: string,
    userId: string,
    items: CartItem[]
}