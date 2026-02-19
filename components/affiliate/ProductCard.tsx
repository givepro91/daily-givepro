import Image from "next/image";
import { AffiliateProduct } from "@/lib/types";

const PLATFORM_LABELS: Record<string, string> = {
  coupang: "Coupang",
  amazon: "Amazon",
  other: "Buy",
};

function appendUtm(url: string, productName: string): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}utm_source=blog&utm_medium=affiliate&utm_campaign=${encodeURIComponent(productName)}`;
}

interface ProductCardProps {
  product: AffiliateProduct;
  variant?: "card" | "inline" | "banner";
}

export default function ProductCard({
  product,
  variant = "card",
}: ProductCardProps) {
  const label = PLATFORM_LABELS[product.platform] || "Buy";
  const trackedUrl = appendUtm(product.url, product.name);

  if (variant === "inline") {
    return (
      <a
        href={trackedUrl}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        className="my-2 flex items-center gap-2 rounded border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
      >
        <span className="font-medium">{product.name}</span>
        {product.price && (
          <span className="text-gray-500">({product.price})</span>
        )}
        <span className="ml-auto text-blue-600 dark:text-blue-400">
          {label} &rarr;
        </span>
      </a>
    );
  }

  if (variant === "banner") {
    return (
      <div className="flex flex-col items-center rounded-lg border border-gray-200 p-4 text-center dark:border-gray-700">
        {product.image && (
          <div className="relative mb-3 h-32 w-32">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        )}
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h4>
        {product.price && (
          <p className="mt-1 text-sm font-bold text-blue-600 dark:text-blue-400">
            {product.price}
          </p>
        )}
        <a
          href={trackedUrl}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="mt-2 inline-block rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
        >
          {label}
        </a>
      </div>
    );
  }

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row">
        {product.image && (
          <div className="relative h-48 w-full sm:h-auto sm:w-40">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {product.name}
            </h3>
            {product.price && (
              <p className="mt-1 text-lg font-bold text-blue-600 dark:text-blue-400">
                {product.price}
              </p>
            )}
          </div>
          <div className="mt-3">
            <a
              href={trackedUrl}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              {label}
            </a>
          </div>
        </div>
      </div>
      <p className="border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
        This post contains affiliate links. A small commission may be earned at
        no extra cost to you.
      </p>
    </div>
  );
}
