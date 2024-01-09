export const moveItem = <T>(Array: T[], from: number, to: number): T[] => {
    const startIndex = to < 0 ? Array.length + to : to;
    const item = Array.splice(from, 1)[0];
    Array.splice(startIndex, 0, item);
    return Array;
}

