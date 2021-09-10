/// <reference path="p5.global-mode.d.ts" />

let values = []; // The array of random values

let I, J, div;
let num; // Number of bars [minBars, maxBars]
let mode = 0; //for jumping between sorts
let IPF; //iterations per frame
let minBars = 500,
    maxBars = 800;
let stop = false;

// initialises the array to random values and sets I and J to 0
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

// SETUP
function setup() {
    createCanvas(windowWidth, windowHeight);
    init();
    div = createDiv('').position(25, 20);
    div.style('font-size', '24px');
    // div.style('color', '#FFFFFF'); div.center();
    div.html('Bubble Sort');
}

// Restart Simulation on "ENTER"
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
    for (let i = 0; i < values.length; i++) {
        stroke(255);
        // fill(245, 222, 179);
        if (stop) stroke(255, 0, 0);
        rectMode(CORNER);
        rect(i * width / num, values[i], width / num, height - values[i]);
    }

    if (stop) noLoop();
}

//!
// DRAW
function draw() {
    background(0);
    if (mode == 0) {
        Bubble();
    } else if (mode == 1) {
        Insertion();
    } else if (mode == 2) {
        SSelection();
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

// Ending the simulation
function endSorts(s) {
    fill(255, 0, 0);
    stroke(255);
    strokeWeight(2);
    div.html('FINISHED<br>Press "ENTER" to restart...');
    stop = true;
    print("Finished", s);
    mode = 3;
}