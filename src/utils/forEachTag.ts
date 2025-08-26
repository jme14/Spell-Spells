export default function forEachTag<T extends Record<string, string>>(
    tagEnum: T,
    func: (value: T[keyof T]) => void
) {
    Object.values(tagEnum)
        .filter((tag) => typeof tag === "string")
        .forEach((tag) => func(tag as T[keyof T]));
}
