import Link from "next/link";
interface PlayButtonProps {
    className: string;
}
export default function PlayButton({ className }: PlayButtonProps) {
    return (
        <Link href="/waiting">
            <button
                className={`rounded bg-blue-600 text-white hover:bg-blue-700 ${className}`}
            >
                Play
            </button>
        </Link>
    );
}
