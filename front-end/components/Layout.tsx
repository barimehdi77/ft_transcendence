import Navbar from "./navbar";

const Layout = ({ children }: any) => {
	return (
		<div className='bg-hero-pattern bg-cover bg-center'>
			<Navbar />
			<>{children}</>
		</div>
	);
};

export default Layout;
