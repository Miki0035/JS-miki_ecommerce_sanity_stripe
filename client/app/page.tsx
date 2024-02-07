import React from "react";
import { Product, HeroBanner, FooterBanner } from "@/components";
import { client } from "@/utils/client";
import { ProductInfo } from "@/types";

const getAllProducts = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  return products;
};

const getAllBanners = async () => {
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return bannerData;
};

const page = async () => {
  const products = await getAllProducts();
  const banners = await getAllBanners();
  return (
    <>
      <HeroBanner heroBanner={banners.length && banners[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product: ProductInfo) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={banners && banners[0]} />
    </>
  );
};

export default page;
