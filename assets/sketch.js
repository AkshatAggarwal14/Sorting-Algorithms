/// <reference path="p5.global-mode.d.ts" />

let values = []; // The array of random values
let states = [];

let I, J, div, info;
let num; // Number of bars [minBars, maxBars]
let mode = 0; //for jumping between sorts
let IPF; //iterations per frame
let minBars = 300,
    maxBars = 650;
let finish = false;

// initialises the array to random values and sets I and J to 0
function init() {
    I = 0;
    J = 0;
    num = floor(random(minBars, maxBars));
    IPF = floor(0.85 * num);
    values = new Array(num);
    for (let i = 0; i < values.length; i++) {
        values[i] = random(height);
        states[i] = -1; //false
        // values[i] = noise(i / 100.0) * height;
    }
}

// SETUP
function setup() {
    createCanvas(windowWidth, windowHeight);
    init();
    div = createDiv('').position(25, 20);
    div.style('font-size', '24px');
    // div.style('color', '#FFFFFF'); div.center();
    div.html('Bubble Sort');
    info = createDiv('').position(25, 52);
    info.style('font-size', '13px');
}

// Restart Simulation on "ENTER"
function keyPressed() {
    if (keyCode === ENTER && mode == 3) {
        mode = 0;
        init();
        print("Restarting...");
        div.html('Bubble Sort');
        document.title = "Bubble Sort";
        cnt = 0;
        loop();
    }
}



// Function which allows the draw() function to wait 'time' ms
function wait(time) {
    start = millis()
    do {
        current = millis();
    } while (current < start + time)
}

// Function to Swap
function swap(arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

// Drawing the rectangles 
function show() {
    background(51);
    for (let i = 0; i < values.length; i++) {
        rectMode(CORNER);
        if (states[i] == 0) {
            fill('#ec6e6e');
            stroke('#ec6e6e');
        } else if (states[i] == 1) {
            fill('#a6f7bb');
            stroke('#a6f7bb');
        } else {
            fill(255);
            stroke(255);
        }
        rect(i * width / num, values[i], width / num, height - values[i]);
    }
}

let cnt = 0;
//!
// DRAW
function draw() {
    background(0);
    if (mode == 0) {
        info.html(' ');
        Bubble();
    } else if (mode == 1) {
        info.html(' ');
        Insertion();
    } else if (mode == 2) {
        info.html(' ');
        SSelection();
    } else if (mode == 3 && cnt == 0) {
        info.html('Press "ENTER" to restart simulation...');
        quickSort(values, 0, values.length - 1);
        cnt++;
    }
    show();
}

// Change the text when moving to next sort
function setNext(prev, next) {
    print("Finished", prev);
    wait(500);
    ++mode;
    init();
    div.html(next);
    document.title = next;
}

function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }
    return true;
}