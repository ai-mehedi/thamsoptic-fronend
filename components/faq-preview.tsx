import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, HelpCircle } from "lucide-react"
import Link from "next/link"

const faqs = [
  {
    question: "How fast is the installation process?",
    answer:
      "Most installations are completed within 2 weeks of ordering, with professional engineers handling everything.",
  },
  {
    question: "Are there any hidden costs or setup fees?",
    answer: "No hidden costs! Installation is completely free, and your monthly price is locked for 24 months.",
  },
  {
    question: "What happens if I experience connection issues?",
    answer: "Our 24/7 UK-based support team is always available to help resolve any issues quickly.",
  },
  {
    question: "Can I upgrade my package later?",
    answer: "Yes, you can upgrade your package at any time through your online account or by calling our support team.",
  },
]

export function FaqPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Quick answers to common questions about our broadband services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="border-l-4 border-l-royal-blue hover:shadow-card transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-royal-blue flex items-start">
                  <HelpCircle className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed ml-8">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-royal-blue text-royal-blue hover:bg-royal-blue hover:text-white bg-transparent"
          >
            <Link href="/faq" className="inline-flex items-center">
              View All FAQs
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
