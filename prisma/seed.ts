import prisma from "../src/lib/db";
import { foods } from "./data/foods";

async function main() {
    for (const food of foods) {
        const foodData = {
            name: food.name,
            description: food.description,
            slug: food.slug,
            price: food.price,
            imageUrl: food.imageUrl
        }

        const newFoodResult = await prisma.food.upsert({
            where: { name: foodData.name },
            create: foodData,
            update: foodData
        });

        console.log(`🆕 Product: ${newFoodResult.name}`)
    }
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });