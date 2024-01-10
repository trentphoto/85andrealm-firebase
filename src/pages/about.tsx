import ButtonLink from "@/components/ButtonLink";
import Layout from "@/components/layout/Layout";
import Section from "@/components/layout/Section";

export default function AboutPage() {
  return (
    <Layout>
        <Section className="py-20">
            <div className="container">
                <h1 className="h1 font-bold mb-4">About 85 + REALM</h1>
                <div className="text-gray-500">
                    <p className="">Welcome to 85 + REALM. This is where our passion for flowers meets your passion for flowers.</p>
                    <p>As a family-owned and operated business, we are entirely family-owned and operated.</p>
                    <p>We have been helping people&#39;s lives blossom with our stunning flower arrangements and handpicked bouquets since 1998. Our talented team of florists believes in the power of flowers to create an atmosphere of joy, elegance, and love, and we&#39;re excited to share that with you.</p>
                    <p>We use humans to write most of our content, including our About pages. You won&#39;t find any AI-generated blog posts on this site, unless you look really hard.</p>
                </div>
                <ButtonLink href="/shop" className="mt-12">View our Incredible Product Lineup</ButtonLink>
            </div>
        </Section>
    </Layout>
  )
}
