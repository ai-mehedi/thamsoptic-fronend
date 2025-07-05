import { PackageCards } from "@/components/package-cards"

export default function PackagesPage() {
  return (
    <main className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-royal-blue mb-4">Choose Your Perfect Package</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            All packages include unlimited data, unlimited calls, and free installation
          </p>
        </div>
        <PackageCards />
      </div>
    </main>
  )
}
