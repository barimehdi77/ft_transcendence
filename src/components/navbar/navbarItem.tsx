import Link from 'next/link';

const MenuItem = ({ path, pagename }: any) => {
	return (
		<li className='text-white text-xl capitalize font-semibold ml-12 hidden navbar:inline hover:text-[#D3FAD6] lg:inline'>
			<Link href={path}>{pagename}</Link>
		</li>
	);
};

export default MenuItem;
