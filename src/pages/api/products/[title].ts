import { NextApiRequest, NextApiResponse } from "next";
import { TApiErrorResp, TApiSingleProductResp } from "../../../types";
import { prisma } from "../../../lib/prisma";
import nc from "next-connect";

const getSingleProduct = async (
    req: NextApiRequest,
    res: NextApiResponse<TApiSingleProductResp | TApiErrorResp >
) => {
    try {
        const title = req.query.title as string;
        const product = await prisma.product.findUnique({
            where: {
                title
            },
            select:{
                title: true,
                description: true,
                price: true,
                quantity: true,
                image: true
            }
        });

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({product});
    }
    catch (err) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

const handler = nc({ attachParams: true }).get(getSingleProduct);
export default handler;