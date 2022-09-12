import React from "react";
import Link from "next/link";
import Button from "../components/chat/Button";

const chat = () => {
  return (
    <div className="flex space-x-4 items-center justify-center align-middle h-screen">
      <Link href="/rooms/room-id">
        <a>
          <Button text="Rooms" />
        </a>
      </Link>
      <Link href="/dms/dm-id">
        <a>
          <Button text="Direct messages" />
        </a>
      </Link>
    </div>
  );
};

export default chat;
