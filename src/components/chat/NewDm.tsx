import React from "react";
import Select, { SingleValue } from "react-select";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  startDM: (member: any) => void;
  loading: boolean;
  users: IOption[];
}

interface IOption {
  value: number;
  label: string;
}

const NewDm = ({ isOpen, setIsOpen, startDM, loading, users }: Props) => {
  const [member, setMember] = React.useState<SingleValue<IOption | null>>(null);

  const handleCheckPass = (e: any) => {
    e.preventDefault();
    if (member && member.value) {
      startDM(member.value);
      setMember(null);
    } else toast.error("Please select a user");
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
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>

            <h3 className="text-xl font-bold py-4 ">
              Start a new conversation
            </h3>
            <form onSubmit={handleCheckPass}>
              <Select
                instanceId={"usersNotInRoom"}
                name="usersNotInRoom"
                options={users}
                onChange={(value) => setMember(value)}
                value={member}
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
              {loading ? "Waiting..." : "Start"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewDm;
