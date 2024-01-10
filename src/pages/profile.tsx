import ProductListItem from "@/components/ProductListItem";
import Layout from "@/components/layout/Layout";
import Section from "@/components/layout/Section";
import { IState } from "@/lib/redux";
import { useSelector } from "react-redux";

export default function ProfilePage() {

    const favorites = useSelector((state: IState) => state.favorites)

    return (
        <Layout>
            <Section className="py-24">
                <div className="container">
                    <h1 className="mb-12">Profile</h1>
                    <div className="p-12 bg-gray-50 rounded-2xl">
                        <h2 className="text-4xl mb-6">Your Favorites</h2>
                        <div className="flex flex-col gap-4">
                            {/* pull favorites list from store and map over it */}
                            {
                                favorites.length ? favorites.map(favorite => (
                                    <ProductListItem key={favorite.id} product={favorite} />
                                )) : <p>You have no favorites yet.</p>
                            }
                        </div>


                    </div>
                </div>
                
            </Section>
        </Layout>
    )
}
