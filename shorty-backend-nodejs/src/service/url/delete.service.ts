import { Prisma } from "@prisma/client";
import { prisma } from "@/infrastructure/prisma/prisma";

export const deleteUrlService = async (id: string, userId: string) => {
    try {
        const url = await prisma.url.findUnique({
            where: { id },
        });

        if (!url || url.userId !== userId) {
            throw new Error(`URL with ID ${id} not found or unauthorized`);
        }

        await prisma.url.delete({ where: { id } });

    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new Error(`URL with ID ${id} not found`);
        }
        throw error;
    }
};
