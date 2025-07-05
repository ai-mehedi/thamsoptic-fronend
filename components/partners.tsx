import { Card, CardContent } from "@/components/ui/card";

const partners = [
  { name: "Openreach", logo: "/logo/logo1.png" },
  { name: "CityFibre", logo: "/logo/logo3.png" },
  { name: "Hyperoptic", logo: "/logo/logo2.png" },
  { name: "Virgin Media", logo: "/logo/logo4.png" },
  { name: "Gigaclear", logo: "/logo/logo1.png" },
  { name: "Community Fibre", logo: "/logo/logo2.png" },
];

export function Partners() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-royal-blue mb-4">
            Trusted Network Partners
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We work with the UK's leading infrastructure providers to deliver
            the best possible service
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-card transition-all duration-300 group"
            >
              <CardContent className="p-6 flex items-center justify-center">
                <img
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  className="h-18 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
