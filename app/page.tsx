import { Hero } from "@/components/hero"
import { WhyChooseUs } from "@/components/why-choose-us"
import { SpeedComparison } from "@/components/speed-comparison"
import { AboutUs } from "@/components/about-us"
import { Partners } from "@/components/partners"
import { Testimonials } from "@/components/testimonials"
import { FaqPreview } from "@/components/faq-preview"
import { ContactCta } from "@/components/contact-cta"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhyChooseUs />
      <SpeedComparison />
      <AboutUs />
      <Partners />
      <Testimonials />
      <FaqPreview />
      <ContactCta />
    </main>
  )
}
