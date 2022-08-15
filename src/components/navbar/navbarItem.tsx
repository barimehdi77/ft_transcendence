const MenuItem = ({ path }: any) => {
	return (
		<li className='text-white text-xl capitalize font-semibold ml-12 hidden hover:text-cyan-300 lg:inline'>
			<a href={path}>{path}</a>
		</li>
	);
};

export default MenuItem;
