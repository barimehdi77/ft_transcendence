
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Getname.module.css'

export default function GetName() {
    // const [data, setData]=useState({name : ""});
    const [data, setData]=useState({name : ""});
    return (
        <form className={`w-full  ${styles.container}`}>
            <div className="flex items-center border-b border-teal-500 py-2">
                <input id='uname' value={data.name} onChange={(e) => setData({name : e.target.value})}  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Write your name" aria-label="Full name"/>
                    <Link href={{
                        pathname : "game",
                        query : data
                    }} >
                        <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                            Confirme
                        </button>
                    </Link>
            </div>
        </form>
    );
}

function send(){
    const uname = document.getElementById('uname');
    console.log(uname?.ariaValueText);
}