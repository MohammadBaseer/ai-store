import Image from "next/image";
import {
  ArrowRightIcon,
  SearchIcon,
  LightbulbIcon,
  ShoppingCartIcon,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      {" "}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="/images/banner.jpg"
            alt="Background Pattern"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="pointer-events-none"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            Your Smartest Shopping Experience Starts Here
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
            Leverage cutting-edge AI to find exactly what you need, discover new
            favorites, and shop smarter than ever before.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-700 text-lg font-semibold rounded-full shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Explore Products
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-full shadow-md hover:bg-white hover:text-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How Our AI Enhances Your Shopping
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 bg-blue-100 rounded-full mb-4">
                <SearchIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Smart Product Search
              </h3>
              <p className="text-gray-600">
                Use natural language to find products. "Show me running shoes
                under $100 with good reviews" – our AI understands!
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 bg-purple-100 rounded-full mb-4">
                <LightbulbIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Intelligent Recommendations
              </h3>
              <p className="text-gray-600">
                Our system learns your preferences to suggest products you'll
                love, making discovery effortless.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 bg-green-100 rounded-full mb-4">
                <ShoppingCartIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Optimized Shopping
              </h3>
              <p className="text-gray-600">
                From dynamic pricing insights to personalized deals, we help you
                make the best purchasing decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Experience the Future of Shopping?
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700 mb-10">
            Join thousands of satisfied customers who are already enjoying a
            smarter, more intuitive way to shop online.
          </p>
          <a
            href="/products"
            className="inline-flex items-center justify-center px-10 py-5 bg-blue-600 text-white text-xl font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Start Shopping Now
            <ArrowRightIcon className="ml-3 h-6 w-6" />
          </a>
        </div>
      </section>
    </div>
  );
}
