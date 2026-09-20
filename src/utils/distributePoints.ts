export function distributeAlongAxis(count: number, from: number, to: number) {
    if (count <= 0) return []
    if (count === 1) return [(from + to) / 2]

    const step = (to - from) / (count - 1)
    return Array.from({ length: count }, (_, i) => from + step * i)
}