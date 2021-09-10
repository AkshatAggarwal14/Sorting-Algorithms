function Insertion() {
    if (I == 0) I++;
    else if (I > 0 && I < values.length) {
        let currentValue = values[I]
        J = I - 1
        while (J >= 0 && values[J] < currentValue) {
            values[J + 1] = values[J]
            J--;
        }
        values[J + 1] = currentValue
        I++;
    } else {
        setNext("Insertion Sort", "Selection Sort");
    }
}