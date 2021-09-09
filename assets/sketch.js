/// <reference path="p5.global-mode.d.ts" />

let values = [];

let I, J, div;
let num;
let mode = 0;
let IPF; //iterations per frame
let minBars = 500,
    maxBars = 800;
let stop = false;

function init() {
    I = 0;
    J = 0;
    num = floor(random(minBars, maxBars));
    IPF = floor(0.85 * num);
    values = new Array(num);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
        // values[i] = noise(i / 100.0) * height;
    }

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    init();
    div = createDiv('').position(25, 20);
    div.style('font-size', '24px');
    // div.style('color', '#FFFFFF');
    div.html('Bubble Sort');
}

function keyPressed() {
    if (keyCode === ENTER && mode == 3) {
        mode = 0;
        init();
        print("Restarting...");
        div.html('Bubble Sort');
        document.title = "Bubble Sort";
        stop = false;
        loop();
    }
}

// Lets make different modes for different sorts
// 0. Bubble sort
// 1. Insertion sort
// 2. Selection sort

function draw() {
    background(0);
    /** Bubble sort */
    if (mode == 0) {
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
                print("Finished Bubble sort");
                wait(500);
                mode = 1;
                init();
                div.html('Insertion Sort');
                document.title = "Insertion Sort";
            }
        }
    }
    /** Insertion Sort */
    else if (mode == 1) {
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
            print("Finished Insertion sort");
            wait(500);
            mode = 2; // So loop between both sorts
            init();
            div.html('Selection Sort');
            document.title = "Selection Sort";
        }
    }
    /** Selection Sort */
    else if (mode == 2) {
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
            fill(255, 0, 0);
            stroke(255);
            strokeWeight(2);
            div.html('FINISHED<br>Press "ENTER" to restart...');
            stop = true;
            print("Finished Selection sort");
            mode = 3;
            // mode = 0; // So loop between all sorts
            // init();
            // div.html('Bubble Sort');
        }
        I++;
    }

    /** Drawing the rectangles */
    for (let i = 0; i < values.length; i++) {
        stroke(255);
        // fill(245, 222, 179);
        if (stop) stroke(255, 0, 0);
        rectMode(CORNER);
        rect(i * width / num, values[i], width / num, height - values[i]);
    }
    if (stop) noLoop();
}

function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}


function wait(time) {
    start = millis()
    do {
        current = millis();
    } while (current < start + time)
}