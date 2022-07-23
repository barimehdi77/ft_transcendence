const Label = (props: any) => {
	const capitalizedName = props.name.charAt(0).toUpperCase() + props.name.slice(1);
	return (
		<label htmlFor={props.name} className='text-xl font-bold my-1'>
			{capitalizedName}
		</label>
	);
};

export default Label;
