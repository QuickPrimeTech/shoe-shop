import AllProducts from "@/sections/all-products";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="py-10">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Find Your Perfect <span className="text-orange-600">Shoes</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover premium footwear that combines style, comfort, and
              quality for every occasion.
            </p>
          </div>
          <AllProducts />
        </div>
      </div>
    </main>
  );
}
