const Layout = ({ children }: any) => {
	return (
		<div className='bg-hero-pattern bg-cover bg-center'>
			<>{children}</>
		</div>
	);
};

export default Layout;
