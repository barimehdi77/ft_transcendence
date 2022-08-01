const MenuItem = (props: any) => {
	return (
		<li className="text-white text-xl font-semibold ml-14">
			<a href={props.path}>{props.path}</a>
		</li>
	);
};

export default MenuItem;
