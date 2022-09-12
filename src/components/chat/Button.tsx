interface Props {
  text: String;
}

const Button = ({ text }: Props) => {
  return (
    <button className="bg-sky-800 px-12 py-4 text-xl text-white font-semibold uppercase rounded-full drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-sky-700 hover:scale-105">
      {text}
    </button>
  );
};

export default Button;
