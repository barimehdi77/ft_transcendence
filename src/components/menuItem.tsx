const MenuItem = (props: any) => {
	return (
		<li className="text-white text-xl font-semibold ml-12 hidden hover:text-cyan-300 lg:inline">
			<a href={props.path}>{props.path}</a>
		</li>
	);
};

export default MenuItem;
