import { Shield, Clock, Zap, HeadphonesIcon } from "lucide-react"

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Up to 1Gbps fiber speeds with consistent performance",
  },
  {
    icon: Shield,
    title: "Price Guarantee",
    description: "Lock in your price for 24 months with no surprises",
  },
  {
    icon: Clock,
    title: "Free Installation",
    description: "Professional setup at no extra cost within 2 weeks",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "UK-based customer support team always available",
  },
]

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">Why Choose Thamesoptic?</h2>
          <div className="w-24 h-1 gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the difference with our commitment to speed, reliability, and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-hover transition-all duration-300 hover:-translate-y-2"
            >
              <div className="w-20 h-20 mx-auto mb-6 royal-blue rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-royal-blue mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
