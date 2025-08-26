export enum School {
    Fizzle = "Fizzle",
    None = "None",
    Fire = "Fire",
    Ice = "Ice",
    Life = "Life",
    Death = "Death",
}
export interface SchoolKey {
    nounCount: number;
    adjCount: number;
    verbCount: number;
    advCount: number;
}
export function isNone({
    nounCount,
    adjCount,
    verbCount,
    advCount,
}: SchoolKey) {
    return (
        nounCount === 1 && adjCount === 0 && verbCount === 1 && advCount === 0
    );
}
export function isFire({
    nounCount,
    adjCount,
    verbCount,
    advCount,
}: SchoolKey) {
    return (
        nounCount === 0 &&
        adjCount === 0 &&
        verbCount === advCount &&
        verbCount !== 0
    );
}
export function isIce({ nounCount, adjCount, verbCount, advCount }: SchoolKey) {
    return nounCount === 1 && adjCount > 0 && verbCount > 0 && advCount === 0;
}
export function isLife({
    nounCount,
    adjCount,
    verbCount,
    advCount,
}: SchoolKey) {
    return (
        nounCount === 1 && adjCount === 1 && verbCount === 1 && advCount === 1
    );
}
export function isDeath({
    nounCount,
    adjCount,
    verbCount,
    advCount,
}: SchoolKey) {
    return (
        nounCount === 0 && adjCount === 1 && verbCount === 0 && advCount === 1
    );
}
