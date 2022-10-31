import { NextApiRequest, NextApiResponse } from "next";
import { TApiAllCategoriesResp, TApiErrorResp } from "../../../types";
import { prisma } from '../../../lib/prisma';
import nc from "next-connect";


const getCategories = async (
    _req: NextApiRequest,
    res: NextApiResponse<TApiAllCategoriesResp | TApiErrorResp>
) => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
                products: {
                    orderBy: {
                        createdAt: "desc"
                    },
                    take: 8,
                    select: {
                        title: true,
                        description: true,
                        image: true,
                        price: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return res.status(200).json({categories});
    }
    catch(error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

const handler = nc({ attachParams: true }).get( getCategories );

export default handler;