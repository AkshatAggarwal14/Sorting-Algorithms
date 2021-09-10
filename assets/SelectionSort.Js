function SSelection() {
    if (I < values.length - 1) {
        let small = values[I];
        let pos = I;
        for (J = I + 1; J < values.length; J++) {
            if (values[J] > small) {
                small = values[J];
                pos = J;
            }
        }
        swap(values, I, pos);
    } else {
        // endSorts("Selection Sort");
        setNext("Selection Sort", "Quick Sort");
    }
    I++;
}