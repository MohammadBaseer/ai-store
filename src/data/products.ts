export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Noise-Cancelling Headphones",
    description:
      "Immersive sound experience with active noise cancellation for travel and daily commute.",
    price: 199.99,
    category: "Electronics",
    rating: 4.7,
    image: "/images/1.png",
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    description:
      "Designed for maximum comfort and support during long working hours, with adjustable lumbar support.",
    price: 349.0,
    category: "Home & Office",
    rating: 4.5,
    image: "/images/2.webp",
  },
  {
    id: "3",
    name: "Smartwatch with Health Tracker",
    description:
      "Monitor your heart rate, steps, and sleep patterns with this sleek and feature-rich smartwatch.",
    price: 129.5,
    category: "Electronics",
    rating: 4.2,
    image: "/images/3.webp",
  },
  {
    id: "4",
    name: "Organic Cotton T-Shirt",
    description:
      "Soft and breathable t-shirt made from 100% organic cotton, perfect for everyday wear.",
    price: 25.0,
    category: "Apparel",
    rating: 4.8,
    image: "/images/4.webp",
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    description:
      "Compact and powerful speaker with rich bass and clear highs, ideal for outdoor adventures.",
    price: 79.99,
    category: "Electronics",
    rating: 4.0,
    image: "/images/5.jpg",
  },
  {
    id: "6",
    name: "Stainless Steel Water Bottle",
    description:
      "Keep your drinks cold for 24 hours or hot for 12 hours with this durable and stylish bottle.",
    price: 18.75,
    category: "Kitchen & Dining",
    rating: 4.6,
    image: "/images/6.jpg",
  },
  {
    id: "7",
    name: "Beginner Acoustic Guitar Kit",
    description:
      "Everything you need to start playing guitar, including a full-size acoustic guitar, picks, and strap.",
    price: 149.0,
    category: "Musical Instruments",
    rating: 4.3,
    image: "/images/7.jpeg",
  },
  {
    id: "8",
    name: "High-Performance Running Shoes",
    description:
      "Lightweight and responsive running shoes designed for speed and comfort on long distances.",
    price: 110.0,
    category: "Footwear",
    rating: 4.9,
    image: "/images/8.jpg",
  },
  {
    id: "9",
    name: "Digital Drawing Tablet",
    description:
      "Unleash your creativity with this pressure-sensitive drawing tablet, perfect for digital artists.",
    price: 89.99,
    category: "Electronics",
    rating: 4.1,
    image: "/images/9.jpg",
  },
  {
    id: "10",
    name: "Gourmet Coffee Bean Sampler",
    description:
      "A selection of premium, ethically sourced coffee beans from around the world.",
    price: 35.0,
    category: "Food & Beverage",
    rating: 4.4,
    image: "/images/10.jpg",
  },
  {
    id: "11",
    name: "Yoga Mat with Carrying Strap",
    description:
      "Non-slip, eco-friendly yoga mat providing excellent grip and cushioning for all poses.",
    price: 45.0,
    category: "Sports & Outdoors",
    rating: 4.7,
    image: "/images/11.jpeg",
  },
  {
    id: "12",
    name: "Classic Leather Wallet",
    description:
      "Handcrafted from genuine leather, this wallet offers durability and timeless style with multiple card slots.",
    price: 55.0,
    category: "Accessories",
    rating: 4.5,
    image: "/images/12.webp",
  },
];
