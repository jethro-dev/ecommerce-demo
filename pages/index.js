import { client } from "../lib/client";
import { FooterBanner, HeroBanner, Product } from "../components";

export default function Home({ products, bannerData }) {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
}

export async function getServerSideProps(context) {
  const productQuery = '*[_type == "product"]';
  const products = await client.fetch(productQuery);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);
  return {
    props: { products, bannerData }, // will be passed to the page component as props
  };
}
