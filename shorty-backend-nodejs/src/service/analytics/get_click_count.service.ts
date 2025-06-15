import { prisma } from "@/infrastructure/prisma/prisma";

export const getClickCount = async (urlId: string) => {
    try {

        const clickInfo = await prisma.userClicks.count({
            where: {
                urlId
            }
        })

        console.log("User click", clickInfo);
        
        return clickInfo;

    } catch (error) {
        throw error;
    }
};
