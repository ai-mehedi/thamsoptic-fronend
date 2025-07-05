import { Card, CardContent } from "@/components/ui/card";
import { Users, Award, MapPin, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "50,000+",
    label: "Happy Customers",
  },
  {
    icon: Award,
    number: "15+",
    label: "Years Experience",
  },
  {
    icon: MapPin,
    number: "200+",
    label: "Areas Covered",
  },
  {
    icon: TrendingUp,
    number: "99.9%",
    label: "Uptime Guarantee",
  },
];

export function AboutUs() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-royal-blue mb-4">
                  About Thamesoptic
                </h2>
                <div className="w-24 h-1 gold mb-6"></div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                Since 2008, we've been revolutionizing internet connectivity
                across the UK. Our mission is simple: deliver exceptional
                broadband speeds at prices that don't break the bank.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                With cutting-edge fiber infrastructure and a customer-first
                approach, we've earned the trust of thousands of homes and
                businesses nationwide.
              </p>

              <div className="grid grid-cols-2 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-white rounded-2xl shadow-card hover:shadow-hover transition-all duration-300"
                  >
                    <div className="w-12 h-12 mx-auto mb-3 royal-blue rounded-xl flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-royal-blue">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="relative">
              <Card className="shadow-2xl overflow-hidden rounded-3xl">
                <CardContent className="p-0">
                  <img
                    src="/images/thamsopticabout.jpg"
                    alt="Thamesoptic team"
                    className="w-full h-96 object-cover"
                  />
                </CardContent>
              </Card>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 royal-blue rounded-full opacity-10"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 gold rounded-full opacity-20"></div>
              <div className="absolute top-1/2 -left-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-royal-blue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
