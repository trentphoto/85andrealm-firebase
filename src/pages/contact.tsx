import ButtonLink from "@/components/ButtonLink";
import ContactForm from "@/components/ContactForm";
import Layout from "@/components/layout/Layout";
import Section from "@/components/layout/Section";

export default function ContactPage() {
  return (
    <Layout>
        <Section className="py-20">
            <div className="container">
                <h1 className="h1 font-bold mb-4">Contact Us</h1>
                <div className="text-gray-500">
                    <p className="">We would love to hear from you!</p>
                    <p className="mb-8">Our customer service team is available to answer your questions and help you with your order.</p>
                </div>
                <ContactForm />
            </div>
        </Section>
    </Layout>
  )
}
