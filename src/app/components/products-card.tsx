import { Product } from "@/data/products";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col h-full">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <h3 className="text-lg font-semibold mb-1 text-gray-800">
        {product.name}
      </h3>
      <p className="text-sm text-gray-600 mb-2 flex-grow">
        {product.description.substring(0, 80)}...
      </p>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-sm text-gray-500">{product.category}</span>
      </div>
      <div className="flex items-center text-sm text-gray-700">
        <span className="mr-1">⭐</span> {product.rating.toFixed(1)} / 5
      </div>
    </div>
  );
}
