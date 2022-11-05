import NextLink from "next/link";

const Navbar = () => {
    return (
        <div className="relative bg-white mx-6">
            <div className="flex items-center justify-between pt-6 md:justify-start md:space-x-10">
                <div className="flex justify-start lg:w-0 lg:flex-1">
                    <h1 className="text-2xl">
                        <NextLink href="/" className="cursor-pointer">
                            Template for a e-commerce app
                            <div className="flex flex-col gap-2 mt-5 p-4 border-solid border-2 border-sky-800 rounded-lg" >
                                <div className="text-sm">PlanetScale database</div>
                                <div className="text-sm">Prisma library</div>
                                <div className="text-sm">Vercel deployed</div>
                                <div className="text-sm">Integration with Stripe payments</div>
                                <div className="text-sm">Tailwing CSS for page styling</div>
                                <div className="text-sm">NextJs</div>
                            </div>
                        </NextLink>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Navbar;