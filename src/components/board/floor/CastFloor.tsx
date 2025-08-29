import { PropsWithChildren } from "react";
interface CastFloorProps {
    className: string;
}
export default function CastFloor({
    className,
    children,
}: PropsWithChildren<CastFloorProps>) {
    return <div className={`grid grid-cols-2 ${className}`}>{children}</div>;
}
