import Link from 'next/link';

const MenuItem = ({ path }: any) => {
	return (
		<li className='text-white text-xl capitalize font-semibold ml-12 hidden hover:text-[#D3FAD6] lg:inline'>
			<Link href={path}>{path}</Link>
		</li>
	);
};

export default MenuItem;
