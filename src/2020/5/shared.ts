export const input = ``;

export type SeatRow = ('F'|'B')[];
export type SeatCol = ('L'|'R')[];
export type Seat = SeatRow | SeatCol;

export type BoardingPass = {
    row: number;
    column: number;
    seatId: number;
}

export const BoardingPass = {
    parse: (input: string): BoardingPass[] => {
        return input.split('\n')
            .map(seat => {
                const rowInput = seat.slice(0, 7) as unknown as SeatRow;
                const colInput = seat.slice(7) as unknown as SeatCol;

                const row = getRow(rowInput);
                const column = getColumn(colInput);
                const seatId = (row * 8) + column;

                console.log(`${seat}: row ${row}, column ${column}, seat ID ${seatId}`);

                return {row, column, seatId};
            });
    }
}

const getRow = (sequence: SeatRow): number => {
    return half(sequence, 0, 127);
}

const getColumn = (sequence: SeatCol): number => {
    return half(sequence, 0, 7);
}

const half = (sequence: Seat, min: number, max: number): number => {
    if (sequence.length === 1) {
        return (sequence[0] === 'F' || sequence[0] === 'L') ? min : max;
    }

    const rest = sequence.slice(1);
    const delta = Math.ceil((max - min) / 2);
    const {newMin, newMax} = (sequence[0] === 'F' || sequence[0] === 'L') ? {newMin: min, newMax: max - delta} : {newMin: min + delta, newMax: max};

    return half(rest, newMin, newMax);
}
