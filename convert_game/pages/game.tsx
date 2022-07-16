import Link from "next/link";
import { useRouter } from "next/router"

export default function game() {
    const router = useRouter();
    const query = router.query;
    const name = query.name;
    return (
        <div>
            <h1>{name} </h1>
            <Link href={'getName'}>Go Home</Link>
        </div>
    )
}