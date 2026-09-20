const MM_PER_INCH = 25.4

export function toDisplayValue(mm: number, unit: 'mm' | 'in') {
    if (unit === 'mm') return mm
        return Math.round((mm / MM_PER_INCH) * 100) / 100
}

export function toMillimeters(value: number, unit: 'mm' | 'in') {
    if (unit === 'mm') return value
        return Math.round(value * MM_PER_INCH)
}