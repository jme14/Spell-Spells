import React, { PropsWithChildren } from "react";
interface CastFloorProps {
    className: string;
    rowReverse: boolean;
}
export default function CastFloor({
    className,
    children,
    rowReverse = false,
}: PropsWithChildren<CastFloorProps>) {
    const childrenAsArray = React.Children.toArray(children);
    const flippedChildren = rowReverse
        ? [...childrenAsArray.slice(2), ...childrenAsArray.slice(0, 2)]
        : childrenAsArray;
    return (
        <div className={`grid grid-cols-2 ${className}`}>{flippedChildren}</div>
    );
}
