import prisma from "../lib/db";

export async function postFoodTocart (foodId: string, userId: string, sum: number ) {
    const existingUser = await prisma.user.findUnique({
        where: { id : userId }
    });

    const food = await prisma.food.findUnique({
        where: { id: foodId }
    });

    if (!existingUser) throw new Error("You're not authorize fir this content, please login first!")
    if (!food) throw new Error("Product not found!");

    const existingCart = await prisma.cart.findFirst({
        where: { userId: existingUser.id },
        select: { id: true }
    });

    if (!existingCart) {
        throw new Error("User cart is null")
    }

    const cartId = existingCart.id;

    const existingFoodInCart = await prisma.cart.findFirst({
        where: {
            id: cartId,
            userId: existingUser.id,
            items: {
                some: {
                    foodId: food.id
                }
            }
        },
        select: {
            userId: true,
            items: {
                select: {
                    id: true,
                    quantity: true,
                    foodId: true,
                    cartId: true
                }
            }
        }
    });

    if (!existingFoodInCart) {
        // post food to cartItem
        const foodtToCartItem = await prisma.cartItem.create({
            data: {
                foodId: food.id,
                cartId: cartId,
                quantity: sum
            },
            select: {
                food: {
                    select: { name: true }
                },
                quantity: true
            }
        });

        return {
            message: "Success add product to cart",
            productName: foodtToCartItem.food.name,
            quantity: foodtToCartItem.quantity
        };
    }


    const updateFoodQuantity = await prisma.cartItem.update({
        data: {
            quantity: sum + existingFoodInCart.items[0].quantity
        },
        where: { id: existingFoodInCart.items[0].id },
        select: {
            food: {
                select: { name: true }
            },
            quantity: true
        }
    });

    return {
        message: "Success update quantity product to cart",
        productName: updateFoodQuantity.food.name,
        quantity: updateFoodQuantity.quantity
    };
 
};

export const getUserCart = async (userId: string) => {
    //check user for layer check
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if(!user) {
        throw new Error("User not found!")
    };

    // get all cart include cartItem
    const cart = await prisma.cart.findFirst({
        where: { userId },
        include: {
            items: {
                include: {
                    food: {
                        include: {
                            items: true
                        }
                    }
                }
            }
        }
    });

    const totalPrice = cart?.items.reduce((totalItem: number, currentItem) => {
        const price = Number(currentItem?.food?.price) || 0; // Convert to number to avoid type issues
        const quantity = Number(currentItem?.quantity) || 0; // Convert to number
        return totalItem + price * quantity;
    }, 0) ?? 0; // Ensure it defaults to 0 if cart is undefined

    return {
        totalPrice,
        ...cart
    };
};


export const deleteCartItem = async (cartItemId: string, slug: string) => {
    const product = await prisma.food.findFirst({
        where: { slug }
    });

    if(!product) {
        throw new Error("Product not found");
    };

    const deletedProductInCartItem = await prisma.cartItem.delete({
        where: { id: cartItemId },
        select: {
            food: {
                select: { name: true }
            }
        }
    });

    return {
        message: "Success delete product",
        productName: deletedProductInCartItem.food.name
    };
};