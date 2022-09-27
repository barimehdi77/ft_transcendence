import React from "react";
import Link from "next/link";
import Head from "next/head";
import Button from "../components/chat/Button";

const chat = () => {
  return (
		<div className='flex space-x-4 items-center justify-center align-middle h-screen'>
			<Head>
				<title>Chat</title>
			</Head>
			<Link href='/rooms'>
				<a>
					<Button text='Rooms' />
				</a>
			</Link>
			<Link href='/dms'>
				<a>
					<Button text='Direct messages' />
				</a>
			</Link>
		</div>
	);
};

export default chat;
