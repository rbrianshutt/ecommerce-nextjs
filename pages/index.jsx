import FooterBanner from '../components/FooterBanner';
import HeroBanner from '../components/HeroBanner';
import Product from '../components/Product';
import { client } from '../lib/client';

export default function Home({ products, bannerData }) {
	return (
		<div>
			
			<HeroBanner heroBanner={bannerData.length && bannerData[0]} />
			{console.log(bannerData)};
			<div className='products-heading'>
				<h2>Best Selling Products</h2>
				<p>All types of speakers</p>
			</div>
			<div className='products-container'>{products?.map((product) => <Product key={product._id} product={product}/> )}</div>
			<FooterBanner footerBanner={bannerData && bannerData[0]}/>
		</div>
	);
}

export const getServerSideProps = async () => {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);
	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	return {
		props: {
			products,
			bannerData,
		},
	};
};
