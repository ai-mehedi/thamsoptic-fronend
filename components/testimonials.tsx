import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Manchester",
    rating: 5,
    text: "Switched to Thamesoptic 6 months ago and couldn't be happier. The speed is consistently fast and customer service is excellent.",
    avatar: "/profile.png",
  },
  {
    name: "Mike Chen",
    location: "London",
    rating: 5,
    text: "As someone who works from home, reliable internet is crucial. Great Value delivers on their promises with no downtime in 8 months.",
    avatar: "/profile.png",
  },
  {
    name: "Emma Williams",
    location: "Birmingham",
    rating: 5,
    text: "The installation was quick and professional. The speeds are exactly as advertised and the price hasn't changed since I signed up.",
    avatar: "/profile.png",
  },
  {
    name: "David Thompson",
    location: "Leeds",
    rating: 5,
    text: "Gaming performance is outstanding with no lag. The customer support team helped me optimize my setup for the best experience.",
    avatar: "/profile.png",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-gold fill-current" : "text-gray-300"}`} />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">What Our Customers Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've made the switch to Thamesoptic
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-royal-blue">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>

                <StarRating rating={testimonial.rating} />

                <p className="text-gray-700 mt-4 leading-relaxed">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
