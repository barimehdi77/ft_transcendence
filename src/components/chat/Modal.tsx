import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => any;
  children: any;
}

export default function Modal({ open, onClose, children }: Props) {
  function escHandler({ key }: KeyboardEvent) {
    if (key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", escHandler);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", escHandler);
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`}>
      {/* backdrop */}
      <div
        className={`fixed inset-0 bg-black ${
          open ? "opacity-50" : "pointer-events-none opacity-0"
        } transition-opacity duration-300 ease-in-out`}
        onClick={onClose}
      />

      {/* content */}
      <div
        className={`fixed right-0 h-full bg-white shadow-lg w-full max-w-screen-sm p-4 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        } transition-opacity duration-300 ease-in-out`}
      >
        <div>
          <button
            className="bg-gray-100 w-10 h-10 rounded-full inline-block transition duration-100 hover:scale-110 hover:bg-gray-200 text-center"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-sky-800 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
