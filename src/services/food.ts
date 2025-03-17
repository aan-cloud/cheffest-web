import prisma from "../lib/db";

export const getAllFoods = async (slug?: string) => {
    const foods = await prisma.food.findMany({
        where: slug ? { slug: { contains: slug, mode: "insensitive" } } : undefined
    });

    return foods;
};