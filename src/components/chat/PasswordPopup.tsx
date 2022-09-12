import React from "react";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  checkPassword: (password: string) => void;
  loading: boolean;
}

const PasswordPopup = ({
  isOpen,
  setIsOpen,
  checkPassword,
  loading,
}: Props) => {
  const [password, setPassword] = React.useState("");

  const handleCheckPass = (e:any) => {
    e.preventDefault();
    checkPassword(password);
    setPassword("");
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
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>

            <h3 className="text-xl font-bold py-4 ">
              Enter the room password:
            </h3>
            <form onSubmit={handleCheckPass}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                className="w-full block outline-none py-3 px-3 bg-gray-100 border-1 border-gray-100 rounded-lg"
                placeholder="Enter the password"
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
              {loading ? "Checking..." : "Open"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordPopup;
