async function quickSort(arr, start, end) {
    if (start >= end) return;
    let index = await partition(arr, start, end); //always end point -> pivot
    states[index] = -1; //disappear later after sort done

    //! waits for both of them to finish
    await Promise.all([
        quickSort(arr, start, index - 1),
        quickSort(arr, index + 1, end)
    ]);
    // await quickSort(arr, start, index - 1);
    // await quickSort(arr, index + 1, end); //<- asynchronous so not simultaneous
}

async function partition(arr, start, end) {
    for (let i = start; i < end; ++i) {
        states[i] = 1;
    }

    let pivotIndex = start;
    let pivotValue = arr[end];
    states[pivotIndex] = 0;
    for (let i = start; i < end; ++i) {
        if (arr[i] > pivotValue) {
            await Sswap(arr, i, pivotIndex);

            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }
    await Sswap(arr, pivotIndex, end);

    for (let i = start; i < end; ++i) {
        if (i != pivotIndex)
            states[i] = -1;
    }

    return pivotIndex;
}

// added time delay so draw() can simulate the sort
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to Swap
async function Sswap(arr, a, b) {
    await sleep(3);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}