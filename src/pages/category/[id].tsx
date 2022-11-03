import { useInfiniteQuery } from "@tanstack/react-query";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import ProductGrid from "../../components/productgrid";
import Skelton from "../../components/skelton";

const SingleCategory = () => {
    const router = useRouter();

    const getSingleCategory = async ({ pageParam = null}) => {
        try {
            let url = `/api/categories/${router.query.id}`;
            if ( pageParam ) {
                url += `?cursorId=${pageParam}`;
            }

            const respJSON = await fetch(url);
            const resp = await respJSON.json();
            return resp;
        }
        catch( error ) {
            throw error;
        }
        
    }

    const { isLoading, data, fetchNextPage, isError } = useInfiniteQuery( 
        [`singleCategory ${router.query.id as string}`],
        getSingleCategory,
        {
            enabled: !!router.query.id,
            getNextPageParam: (lastPage) => {
                const nextCursor = lastPage?.category?.products[lastPage?.category?.products?.length - 1]?.id;
                return nextCursor;
            }
        }
    );

    const allProductsWithCategory: any = {
        name: "",
        products: [],
        hasMore: true
    };

    data?.pages.map( (page) => {
        if ( page?.category ) {
            if ( page?.category?.name ) {
                allProductsWithCategory.name = page.category?.name;
            }

            if ( page.category?.products && page.category?.products.length > 0 ) {
                allProductsWithCategory.products.push( ...page.category?.products );
            };
        }
        return page?.category;
    });

    if ( data?.pages[data?.pages.length - 1]?.category?.products.length === 0 ) {
        allProductsWithCategory.hasMore = false;
    }

    return (
        <div>
            <Head>
                <title>
                    {isLoading ? "Loading..." : `All ${allProductsWithCategory?.name} Products`}
                </title>

                <meta name="description" content="Generated" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <main className="container mx-auto">
                <Navbar />
                
                {isLoading ? ( <Skelton />) : (

                    <>
                        { allProductsWithCategory && allProductsWithCategory.products.length > 0 && (

                            <ProductGrid
                                hasMore={allProductsWithCategory.hasMore} 
                                showLink={false} 
                                categories={[ allProductsWithCategory ]}                                
                                loadMoreFun={fetchNextPage} />

                        )}
                    </>

                )}
            </main>
        </div>

    );
};

export default SingleCategory;