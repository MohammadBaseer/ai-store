import { Product } from "@/data/products";

export interface ParsedQuery {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  keywords: string[];
  originalQuery: string;
}

const categorySynonyms: { [key: string]: string[] } = {
  electronics: ["electronics", "tech", "gadgets", "digital"],
  "home & office": ["home", "office", "furniture", "decor"],
  apparel: ["apparel", "clothing", "fashion", "clothes", "t-shirt", "shirt"],
  "kitchen & dining": ["kitchen", "dining", "cookware", "food prep"],
  "musical instruments": ["music", "instrument", "guitar", "piano"],
  footwear: ["footwear", "shoes", "boots", "sneakers", "running shoes"],
  "food & beverage": ["food", "beverage", "coffee", "tea", "drink"],
  "sports & outdoors": ["sports", "outdoor", "fitness", "yoga"],
  accessories: ["accessories", "wallet", "bag", "jewelry"],
};

export function parseNaturalLanguageQuery(query: string): ParsedQuery {
  const lowerQuery = query.toLowerCase();
  let parsed: ParsedQuery = { keywords: [], originalQuery: query };
  let remainingQuery = lowerQuery;

  // 1. Parse Category
  for (const category in categorySynonyms) {
    for (const synonym of categorySynonyms[category]) {
      if (lowerQuery.includes(synonym)) {
        parsed.category = category;
        remainingQuery = remainingQuery.replace(synonym, "").trim();
        break;
      }
    }
    if (parsed.category) break;
  }

  // 2. Parse Price
  const priceMatches = remainingQuery.match(
    /(under|below|less than|over|above|more than|between)\s?\$?(\d+(\.\d{1,2})?)\s?(and|to)?\s?\$?(\d+(\.\d{1,2})?)?/
  );
  if (priceMatches) {
    const operator = priceMatches[1];
    const value1 = parseFloat(priceMatches[2]);
    const value2 = priceMatches[5] ? parseFloat(priceMatches[5]) : undefined;

    if (operator && value1) {
      if (
        operator.includes("under") ||
        operator.includes("below") ||
        operator.includes("less than")
      ) {
        parsed.maxPrice = value1;
      } else if (
        operator.includes("over") ||
        operator.includes("above") ||
        operator.includes("more than")
      ) {
        parsed.minPrice = value1;
      } else if (operator.includes("between") && value2) {
        parsed.minPrice = Math.min(value1, value2);
        parsed.maxPrice = Math.max(value1, value2);
      } else if (!operator && !value2) {
        // Just a number, assume max price
        parsed.maxPrice = value1;
      }
    }
    remainingQuery = remainingQuery.replace(priceMatches[0], "").trim();
  } else {
    // Check for standalone dollar amounts, assume max price if no operator
    const standalonePriceMatch = remainingQuery.match(/\$?(\d+(\.\d{1,2})?)/);
    if (standalonePriceMatch) {
      const price = parseFloat(standalonePriceMatch[1]);
      if (!parsed.minPrice && !parsed.maxPrice) {
        // Only set if no range was found
        parsed.maxPrice = price;
      }
      remainingQuery = remainingQuery
        .replace(standalonePriceMatch[0], "")
        .trim();
    }
  }

  // 3. Parse Rating
  if (
    remainingQuery.includes("good reviews") ||
    remainingQuery.includes("high rating")
  ) {
    parsed.minRating = Math.max(parsed.minRating || 0, 4.0);
    remainingQuery = remainingQuery
      .replace(/good reviews|high rating/, "")
      .trim();
  }
  if (
    remainingQuery.includes("top rated") ||
    remainingQuery.includes("best reviews")
  ) {
    parsed.minRating = Math.max(parsed.minRating || 0, 4.5);
    remainingQuery = remainingQuery
      .replace(/top rated|best reviews/, "")
      .trim();
  }
  const starRatingMatch = remainingQuery.match(/(\d+(\.\d)?)\s?star(s)?/);
  if (starRatingMatch) {
    const rating = parseFloat(starRatingMatch[1]);
    parsed.minRating = Math.max(parsed.minRating || 0, rating);
    remainingQuery = remainingQuery.replace(starRatingMatch[0], "").trim();
  }

  // 4. Extract Keywords
  parsed.keywords = remainingQuery
    .split(/\s+/)
    .filter((word) => word.length > 2);

  return parsed;
}

export function filterProducts(
  products: Product[],
  parsedQuery: ParsedQuery,
  classicCategory: string,
  classicMinPrice: number,
  classicMaxPrice: number,
  classicMinRating: number
): Product[] {
  let filtered = products;

  // Apply NLP filters first (if present)
  if (parsedQuery.category) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === parsedQuery.category
    );
  }
  if (parsedQuery.minPrice !== undefined) {
    filtered = filtered.filter((p) => p.price >= parsedQuery.minPrice!);
  }
  if (parsedQuery.maxPrice !== undefined) {
    filtered = filtered.filter((p) => p.price <= parsedQuery.maxPrice!);
  }
  if (parsedQuery.minRating !== undefined) {
    filtered = filtered.filter((p) => p.rating >= parsedQuery.minRating!);
  }

  // Apply Classic filters (if NLP didn't cover them or if they are more specific)
  if (
    classicCategory &&
    (!parsedQuery.category ||
      classicCategory.toLowerCase() !== parsedQuery.category)
  ) {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === classicCategory.toLowerCase()
    );
  }
  if (
    classicMinPrice !== 0 &&
    (parsedQuery.minPrice === undefined ||
      classicMinPrice > parsedQuery.minPrice)
  ) {
    filtered = filtered.filter((p) => p.price >= classicMinPrice);
  }
  if (
    classicMaxPrice !== Infinity &&
    (parsedQuery.maxPrice === undefined ||
      classicMaxPrice < parsedQuery.maxPrice)
  ) {
    filtered = filtered.filter((p) => p.price <= classicMaxPrice);
  }
  if (
    classicMinRating !== 0 &&
    (parsedQuery.minRating === undefined ||
      classicMinRating > parsedQuery.minRating)
  ) {
    filtered = filtered.filter((p) => p.rating >= classicMinRating);
  }

  // Apply keyword filtering and ranking for remaining products
  if (parsedQuery.keywords.length > 0) {
    const keywordFiltered = filtered.filter((product) => {
      const productText =
        `${product.name} ${product.description} ${product.category}`.toLowerCase();
      return parsedQuery.keywords.some((keyword) =>
        productText.includes(keyword)
      );
    });

    // If keyword filtering yields no results, fall back to the broader filtered set
    // This prevents an empty list if keywords are too specific or misspelled
    if (keywordFiltered.length > 0) {
      filtered = keywordFiltered;
    }
  }

  return filtered;
}
