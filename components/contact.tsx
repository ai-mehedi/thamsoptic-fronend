import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageCircle } from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak to our UK-based team",
    action: "tel:0800-123-4567",
    actionText: "0800 123 4567",
    available: "24/7 Support",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Get help via email",
    action: "mailto:support@greatvaluebroadband.co.uk",
    actionText: "support@greatvaluebroadband.co.uk",
    available: "Response within 2 hours",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "#",
    actionText: "Start Live Chat",
    available: "Available 24/7",
  },
]

export function Contact() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Need help? Our friendly customer service team is here to assist you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300 text-center">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 royal-blue rounded-full flex items-center justify-center">
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl text-royal-blue">{method.title}</CardTitle>
                <p className="text-gray-600">{method.description}</p>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full gold text-royal-blue hover:bg-yellow-400 btn-3d">
                  <a href={method.action}>{method.actionText}</a>
                </Button>
                <p className="text-sm text-gray-500 mt-3">{method.available}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
