import ReactLoading from 'react-loading';

const LoadingDots = (props: any) => (
	<ReactLoading type={props.type} color={props.color} height={200} width={200} />
);

export default LoadingDots;
