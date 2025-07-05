import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin } from "lucide-react"
import Link from "next/link"

export function ContactCta() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-6xl mx-auto shadow-2xl border-0 overflow-hidden rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
            {/* Left Side - Green Background */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-12 flex flex-col justify-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Ready to start?
                <br />
                <span className="text-green-100">Locate our coverage area</span>
              </h2>

              <p className="text-xl text-green-100 mb-8 leading-relaxed max-w-md">
                Thamesoptic is spread almost everywhere in the UK. Check the availability of all coverage
                areas nationwide.
              </p>

              <div>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-green-700 hover:bg-green-50 font-semibold px-8 py-4 rounded-xl btn-3d"
                >
                  <Link href="/coverage" className="inline-flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Coverage Area
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Side - City Background */}
            <div
              className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center p-12"
              style={{
                backgroundImage: ` url('/banner.jpg')`,
              }}
            >
              
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
