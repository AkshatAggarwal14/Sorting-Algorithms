function Bubble() {
    for (let n = 0; n < IPF; n++) { //100 swaps per draw else very slow
        /* code for one iteration */
        let a = values[J];
        let b = values[J + 1];
        if (a < b) swap(values, J, J + 1);

        if (I < values.length) {
            J++;
            if (J >= values.length - I - 1) {
                J = 0;
                I++;
            }
        } else {
            setNext("Bubble Sort", "Insertion Sort");
        }
    }
}