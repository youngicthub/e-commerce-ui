import { ProductsType } from "@/type";
import React from "react";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";

const ProductList = ({ category }: { category: string }) => {
  const products: ProductsType = [
    {
      id: 1,
      name: "Adidas CoreFit T-Shirt",
      shortDescription:
        "Lightweight performance tee designed for comfort, breathability, and everyday athletic wear.",
      description:
        "The Adidas CoreFit T-Shirt is crafted from moisture-wicking fabric that keeps you dry and comfortable during workouts or casual activities. Its breathable design and soft feel make it perfect for training sessions, jogs, or daily wear. Designed with a modern athletic fit, it pairs easily with joggers, shorts, or denim.",
      price: 39.9,
      sizes: ["s", "m", "l", "xl", "xxl"],
      colors: ["gray", "purple", "green"],
      images: {
        gray: "/products/1g.png",
        purple: "/products/1p.png",
        green: "/products/1gr.png",
      },
    },
    {
      id: 2,
      name: "Puma Ultra Warm Zip",
      shortDescription:
        "A soft mid-layer zip jacket built to keep you warm while maintaining a sporty, lightweight feel.",
      description:
        "The Puma Ultra Warm Zip jacket offers exceptional warmth without the bulk. Made with soft fleece lining and a breathable outer layer, it ensures comfort in cool weather. The sleek zip-up design makes it great for outdoor walks, gym warm-ups, or casual daily styling.",
      price: 59.9,
      sizes: ["s", "m", "l", "xl"],
      colors: ["gray", "green"],
      images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    },
    {
      id: 3,
      name: "Nike Air Essentials Pullover",
      shortDescription:
        "Premium lightweight pullover with a relaxed fit for all-day comfort and layering.",
      description:
        "The Nike Air Essentials Pullover blends comfort and performance with its soft brushed fabric and relaxed silhouette. Ideal for cool mornings, workouts, or everyday wear, it delivers a stylish fit while keeping you warm. The smooth finish and minimalist design give it a clean, modern look.",
      price: 69.9,
      sizes: ["s", "m", "l"],
      colors: ["green", "blue", "black"],
      images: {
        green: "/products/3gr.png",
        blue: "/products/3b.png",
        black: "/products/3bl.png",
      },
    },
    {
      id: 4,
      name: "Nike Dri Flex T-Shirt",
      shortDescription:
        "A breathable stretch tee built with Dri-FIT technology for maximum movement and airflow.",
      description:
        "Stay dry and flexible during intense training with the Nike Dri Flex T-Shirt. Its Dri-FIT fabric helps wick sweat away, while the stretch material allows full freedom of movement. Lightweight, comfortable, and stylish — perfect for gym workouts or everyday wear.",
      price: 29.9,
      sizes: ["s", "m", "l"],
      colors: ["white", "pink"],
      images: { white: "/products/4w.png", pink: "/products/4p.png" },
    },
    {
      id: 5,
      name: "Under Armour StormFleece",
      shortDescription:
        "Water-resistant fleece jacket designed for warmth, durability, and outdoor performance.",
      description:
        "Under Armour’s StormFleece combines lightweight insulation with a water-resistant finish, making it ideal for outdoor training and cool-weather adventures. The soft interior provides warmth, while the durable exterior protects against wind and light rain.",
      price: 49.9,
      sizes: ["s", "m", "l"],
      colors: ["red", "orange", "black"],
      images: {
        red: "/products/5r.png",
        orange: "/products/5o.png",
        black: "/products/5bl.png",
      },
    },
    {
      id: 6,
      name: "Nike Air Max 270",
      shortDescription:
        "Iconic lifestyle sneakers featuring a large Air unit for maximum comfort and style.",
      description:
        "The Nike Air Max 270 delivers bold style and all-day cushioning. Featuring Nike’s tallest heel Air unit, it offers exceptional comfort with every step. Perfect for casual wear, city walks, or pairing with modern streetwear fits.",
      price: 59.9,
      sizes: ["40", "42", "43", "44"],
      colors: ["gray", "white"],
      images: { gray: "/products/6g.png", white: "/products/6w.png" },
    },
    {
      id: 7,
      name: "Nike Ultraboost Pulse",
      shortDescription:
        "High-energy running shoes built for stability, cushioning, and responsive performance.",
      description:
        "The Nike Ultraboost Pulse features responsive cushioning that adapts to your stride, delivering comfort during runs and daily activities. Its flexible outsole and breathable upper make it ideal for athletes and casual users seeking premium comfort.",
      price: 69.9,
      sizes: ["40", "42", "43"],
      colors: ["gray", "pink"],
      images: { gray: "/products/7g.png", pink: "/products/7p.png" },
    },
    {
      id: 8,
      name: "Levi’s Classic Denim",
      shortDescription:
        "Timeless denim jeans crafted for durability, comfort, and everyday style.",
      description:
        "Levi’s Classic Denim jeans are built with high-quality cotton and a perfected straight-fit design. They offer long-lasting durability while maintaining comfort throughout the day. Ideal for casual outings, workdays, or pairing with tees and jackets.",
      price: 59.9,
      sizes: ["s", "m", "l"],
      colors: ["blue", "green"],
      images: { blue: "/products/8b.png", green: "/products/8gr.png" },
    },
  ];

  return (
    <div className='w-full'>
      <Categories />

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={category ? `/products/?category?=${category}` : "/products"}
        className='flex justify-end underline mt-6 text-gray-600'
      >
        {" "}
        View all Products
      </Link>
    </div>
  );
};

export default ProductList;
