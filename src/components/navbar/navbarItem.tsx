import Link from 'next/link';

const MenuItem = ({ path, pagename }: any) => {
	return (
		<li className='text-white text-xl capitalize font-semibold ml-12 hover:text-[#D3FAD6]'>
			<Link href={path}>{pagename}</Link>
		</li>
	);
};

export default MenuItem;
