"use client";

import {
  Footprints,
  Glasses,
  Briefcase,
  Shirt,
  ShoppingBasket,
  Hand,
  Venus,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "All",
    icon: <ShoppingBasket className='w-4 h-4' />,
    slug: "all",
  },
  {
    name: "T-shirts",
    icon: <Shirt className='w-4 h-4' />,
    slug: "t-shirts",
  },
  {
    name: "Shoes",
    icon: <Footprints className='w-4 h-4' />,
    slug: "shoes",
  },
  {
    name: "Accessories",
    icon: <Glasses className='w-4 h-4' />,
    slug: "accessories",
  },
  {
    name: "Bags",
    icon: <Briefcase className='w-4 h-4' />,
    slug: "bags",
  },
  {
    name: "Dresses",
    icon: <Venus className='w-4 h-4' />,
    slug: "dresses",
  },
  {
    name: "Jackets",
    icon: <Shirt className='w-4 h-4' />,
    slug: "jackets",
  },
  {
    name: "Gloves",
    icon: <Hand className='w-4 h-4' />,
    slug: "gloves",
  },
];

const Categories = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const router = useRouter();
  const pathName = usePathname();

  const handdlChange = (value: string | null) => {
    const params = new URLSearchParams();
    params.set("category", value || "all");
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };
  return (
    <div className='mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-200 mb-4 text-sm'>
      {categories.map((category) => (
        <div
          className={`flex items-center justify-items-center px-2 cursor-pointer py-3 hover:bg-gray-300 transition-colors rounded-md gap-2 ${
            category.slug === selectedCategory
              ? "bg-gray-400 font-bold"
              : "text-gray-700"
          }`}
          key={category.name}
          onClick={() => handdlChange(category.slug)}
        >
          {category.icon}
          {category.name}
        </div>
      ))}
    </div>
  );
};

export default Categories;
