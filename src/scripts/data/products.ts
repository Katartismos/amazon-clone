import formatCurrency from '../utils/money';
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface ProductDTO {
  id: string;
  image: string;
  name: string;
  rating: {
    stars: number;
    count: number
  };
  priceCents: number;
  keywords: string[];
  type?: string;
  sizeChartLink?: string;
}

export class Product {
  id: string;
  image: string;
  name: string;
  rating: {
    stars: number;
    count: number
  };
  priceCents: number;
  keywords: string[];
  type?: string;
  sizeChartLink?: string;

  constructor (
    id: string,
    image: string,
    name: string,
    rating: {
      stars: number,
      count: number
    },
    priceCents: number,
    keywords: string[],
    type?: string,
    sizeChartLink?: string
  ) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.rating = rating;
    this.priceCents = priceCents;
    this.keywords = keywords;
    this.type = type;
    this.sizeChartLink = sizeChartLink
  }

  getStarsUrl(): string {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice(): string {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return this.sizeChartLink ? this.sizeChartLink : '';
  }

  static fromJSON(obj: ProductDTO): Product {
    return new Product(
      obj.id,
      obj.image,
      obj.name,
      obj.rating,
      obj.priceCents,
      obj.keywords,
      obj.type,
      obj.sizeChartLink
    );
  }
}

const productsUrl = "https://amazon-clone-backend-8pbj.onrender.com/api/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts =  () => {
      axios.get<ProductDTO[]>(productsUrl)
      .then(response => {
        const converted = response.data.map(Product.fromJSON);
        setProducts(converted);
      })
      .catch(error => console.error(error));
    };

    fetchProducts();
  }, []);

  return { products };
}
