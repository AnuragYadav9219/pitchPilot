export function formatScore(
    score: number | null,
) {
    return score == null ? "—" : score;
}

export function formatSessionType(
    type: string,
) {
    return type
        .toLowerCase()
        .replaceAll("_", " ")
        .replace(/\b\w/g, (char) =>
            char.toUpperCase(),
        );
}

export function formatDate(
    date: string | null,
) {
    if (!date) {
        return "Recently";
    }

    return new Intl.DateTimeFormat(
        undefined,
        {
            month: "short",
            day: "numeric",
        },
    ).format(new Date(date));
}