import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { TApiAllCategoriesResp } from "../types";
import NextLink from "next/link";
import NextImage from "next/image";
import { AiOutlineRight } from "react-icons/ai";

interface IProductGrid extends TApiAllCategoriesResp {
    showLink: boolean;
    hasMore?: boolean;
    loadMoreFun?: Function;
}

const ProductGrid = (props: IProductGrid) => {
    const { categories, showLink, loadMoreFun, hasMore } = props;
    const { ref, inView } = useInView();
    useEffect( () => {
        if(inView) {
            if ( loadMoreFun ) loadMoreFun();
        }
    }, [inView, loadMoreFun]);

    return (
        <div className="bg-white">
            { categories.map( (category) => (
                <div className="mt-12 p-6" key={category.name}>
                    <div className="flex flex-row justify-between">

                        <span className="inline-flex items-center rounded-md bg-sky-800 px-8 py-2 text-md font-medium text-white">
                            {category.name}
                        </span>

                        {showLink && (
                            <NextLink href={`/category/${category.id}`}>
                                <p className="flex flex-row gap-2 undeline hover:cursor-pointer items-center">
                                    View More <AiOutlineRight />
                                </p>
                            </NextLink>
                        )}

                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 xl:gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
                        { category?.products.map( (product) => (
                            <div className="p-6 group rounded-lg border border-gray-200 bg-neutral-200" key={product.title}>
                                <div className="min-h-80 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">

                                    <NextImage
                                        priority={true}
                                        layout="responsive"
                                        width="25"
                                        height="25"
                                        src={`${product.image}`}
                                        alt={product.title}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                        />

                                    <div className="relative mt-2">
                                        
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {product.title}
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {product.price}
                                        </p>

                                        <div className="mt-6">
                                            <NextLink ></NextLink>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>

    );
};

export default ProductGrid;