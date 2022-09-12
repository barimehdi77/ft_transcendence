import React from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  banUserHandler: (duration: string) => void;
  loading: boolean;
}

const BanUserPopUp = ({
  isOpen,
  setIsOpen,
  banUserHandler,
  loading,
}: Props) => {
  const [duration, setDuration] = React.useState("1");

  const handleCheckPass = (e: any) => {
    e.preventDefault();
    banUserHandler(duration);
    setDuration("1");
  };
  return (
    <div
      className={`${
        !isOpen ? "hidden" : ""
      } min-w-screen bg-gray-400 bg-opacity-10 h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover`}
      id="modal-id"
    >
      <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
      <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
        <div className="">
          <div className="text-center p-5 pt-2 flex-auto justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 h-16 flex items-center text-sky-800 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>

            <h3 className="text-xl font-bold py-4 ">
              Enter the duration of the ban(minutes)
            </h3>
            <form onSubmit={handleCheckPass}>
              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                type="number"
                name="duration"
                className="w-full block outline-none py-3 px-3 bg-gray-100 border-1 border-gray-100 rounded-lg"
                autoFocus
              />
            </form>
          </div>

          <div className="p-3  mt-2 text-center space-x-4 md:block">
            <button
              disabled={loading}
              onClick={() => setIsOpen(false)}
              className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleCheckPass}
              className={`mb-2 md:mb-0 bg-sky-800 border border-sky-800 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-sky-900`}
            >
              {loading ? "Waiting..." : "Ban"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BanUserPopUp;
