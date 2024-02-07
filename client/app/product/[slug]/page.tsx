import React from "react";
import { client } from "@/utils/client";

import { ProductDetail } from "@/components";
import { Product } from "@/types";

const getProductDetail = async (slug: string ) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = `*[_type =="product"]`;
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return { product, products };
};

const getProductPaths = async () => {
  const query = `*[_type == "product"] { 
    slug { 
      current 
    } 
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product: Product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return paths;
};

const ProductDetailPage = async ({ params: { slug } }: { params: { slug: string }} ) => {
  const { product, products } = await getProductDetail(slug);
  const paths = await getProductPaths();
  return <ProductDetail product={product} products={products} />;
};

export default ProductDetailPage;