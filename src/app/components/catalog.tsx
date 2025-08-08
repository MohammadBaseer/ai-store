"use client";

import { useState, useEffect, useMemo } from "react";
import { Product, products as allProducts } from "@/data/products";
import {
  parseNaturalLanguageQuery,
  filterProducts,
  ParsedQuery,
} from "@/lib/nlp";
import ProductCard from "./products-card";

export default function Catalog() {
  const [activeTab, setActiveTab] = useState<"ai" | "classic">("ai");
  const [aiSearchQuery, setAiSearchQuery] = useState("");
  const [parsedAiQuery, setParsedAiQuery] = useState<ParsedQuery | null>(null);

  const [classicCategory, setClassicCategory] = useState("");
  const [classicMinPrice, setClassicMinPrice] = useState(0);
  const [classicMaxPrice, setClassicMaxPrice] = useState(Infinity);
  const [classicMinRating, setClassicMinRating] = useState(0);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(allProducts.map((p) => p.category));
    return Array.from(uniqueCategories).sort();
  }, []);

  useEffect(() => {
    if (aiSearchQuery.trim()) {
      setParsedAiQuery(parseNaturalLanguageQuery(aiSearchQuery));
    } else {
      setParsedAiQuery(null);
    }
  }, [aiSearchQuery]);

  const filteredProducts = useMemo(() => {
    if (activeTab === "ai" && parsedAiQuery) {
      return filterProducts(
        allProducts,
        parsedAiQuery,
        "", // No classic category when AI is active
        0,
        Infinity,
        0
      );
    } else if (activeTab === "classic") {
      return filterProducts(
        allProducts,
        { keywords: [], originalQuery: "" }, // No NLP query when classic is active
        classicCategory,
        classicMinPrice,
        classicMaxPrice,
        classicMinRating
      );
    }
    return allProducts;
  }, [
    activeTab,
    parsedAiQuery,
    classicCategory,
    classicMinPrice,
    classicMaxPrice,
    classicMinRating,
  ]);

  const handleAiSearchReset = () => {
    setAiSearchQuery("");
    setParsedAiQuery(null);
  };

  const handleClassicFilterReset = () => {
    setClassicCategory("");
    setClassicMinPrice(0);
    setClassicMaxPrice(Infinity);
    setClassicMinRating(0);
  };

  const handleExamplePrompt = (prompt: string) => {
    setActiveTab("ai");
    setAiSearchQuery(prompt);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-900">
        Products Catalog
      </h1>

      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-3 rounded-l-lg font-medium transition-colors duration-200 ${
            activeTab === "ai"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("ai")}
        >
          AI Search
        </button>
        <button
          className={`px-6 py-3 rounded-r-lg font-medium transition-colors duration-200 ${
            activeTab === "classic"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("classic")}
        >
          Classic Filters
        </button>
      </div>

      {activeTab === "ai" && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Smart Product Search (NLP)
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <input
              type="text"
              placeholder="e.g., Show me running shoes under $100 with good reviews"
              className="flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={aiSearchQuery}
              onChange={(e) => setAiSearchQuery(e.target.value)}
              aria-label="AI Search Query"
            />
            <button
              className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 font-medium"
              onClick={handleAiSearchReset}
            >
              Reset
            </button>
          </div>

          <div className="mb-4">
            <span className="text-gray-700 font-medium mr-2">
              Try these examples:
            </span>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() =>
                  handleExamplePrompt("Show me electronics under $150")
                }
              >
                Electronics under $150
              </button>
              <button
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() => handleExamplePrompt("Top rated shoes")}
              >
                Top rated shoes
              </button>
              <button
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() =>
                  handleExamplePrompt("Coffee beans with good reviews")
                }
              >
                Coffee beans with good reviews
              </button>
              <button
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() =>
                  handleExamplePrompt("Office chairs between $200 and $400")
                }
              >
                Office chairs between $200 and $400
              </button>
              <button
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                onClick={() =>
                  handleExamplePrompt(
                    "Electronics under $150 with good reviews"
                  )
                }
              >
                Electronics under $150 with good reviews
              </button>
            </div>
          </div>

          {parsedAiQuery && (
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                AI Understanding:
              </h3>
              <p className="text-blue-700">
                {parsedAiQuery.category &&
                  `Category: ${parsedAiQuery.category}. `}
                {parsedAiQuery.minPrice !== undefined &&
                  `Min Price: $${parsedAiQuery.minPrice.toFixed(2)}. `}
                {parsedAiQuery.maxPrice !== undefined &&
                  `Max Price: $${parsedAiQuery.maxPrice.toFixed(2)}. `}
                {parsedAiQuery.minRating !== undefined &&
                  `Min Rating: ${parsedAiQuery.minRating.toFixed(1)} stars. `}
                {parsedAiQuery.keywords.length > 0 &&
                  `Keywords: ${parsedAiQuery.keywords.join(", ")}. `}
                {!parsedAiQuery.category &&
                  parsedAiQuery.minPrice === undefined &&
                  parsedAiQuery.maxPrice === undefined &&
                  parsedAiQuery.minRating === undefined &&
                  parsedAiQuery.keywords.length === 0 &&
                  "No specific filters detected. Showing results based on keywords."}
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "classic" && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Classic Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={classicCategory}
                onChange={(e) => setClassicCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="minPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                placeholder="0"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={classicMinPrice === 0 ? "" : classicMinPrice}
                onChange={(e) =>
                  setClassicMinPrice(parseFloat(e.target.value) || 0)
                }
                min="0"
              />
            </div>
            <div>
              <label
                htmlFor="maxPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                placeholder="Any"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={classicMaxPrice === Infinity ? "" : classicMaxPrice}
                onChange={(e) =>
                  setClassicMaxPrice(parseFloat(e.target.value) || Infinity)
                }
                min="0"
              />
            </div>
            <div>
              <label
                htmlFor="minRating"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Min Rating
              </label>
              <select
                id="minRating"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={classicMinRating}
                onChange={(e) =>
                  setClassicMinRating(parseFloat(e.target.value))
                }
              >
                <option value="0">Any Rating</option>
                <option value="4.5">4.5 Stars & Up</option>
                <option value="4.0">4.0 Stars & Up</option>
                <option value="3.0">3.0 Stars & Up</option>
              </select>
            </div>
          </div>
          <button
            className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 font-medium w-full"
            onClick={handleClassicFilterReset}
          >
            Reset Filters
          </button>
        </div>
      )}

      <div className="mb-6 text-lg font-medium text-gray-700">
        Showing {filteredProducts.length} of {allProducts.length} products
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-600 text-xl py-10">
          No products found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
