import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useRef } from "react";
import CanvasPage from "../components/game/canvas";

export default function game() {
    const router = useRouter();
    const query = router.query;
    const name = query.name;

    return (
        <div>
            <h1>  {name} </h1>
            <CanvasPage/>
            <Link href={'getName'}>
                Go Home
            </Link>
        </div>
    )
}
