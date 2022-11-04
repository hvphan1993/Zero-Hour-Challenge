const grid1 = [
    ['f', 'f', 'f', 'f'],
    ['t', 't', 'f', 't'],
    ['f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f']
];

const grid2 = [
    ['f', 'f', 'f', 'f', 'f'],
    ['t', 't', 'f', 't', 'f'],
    ['f', 'f', 'f', 'f', 'f'],
    ['f', 't', 'f', 'f', 'f']
];

const grid3 = [
    ['t', 'f', 't', 't', 't'],
    ['f', 'f', 't', 't', 't'],
    ['f', 't', 'f', 'f', 'f'],
    ['f', 'f', 'f', 't', 'f'],
    ['t', 't', 't', 'f', 'f'],
    ['t', 't', 't', 'f', 't']
];

const grid4 = [
    ['t', 't', 't', 't', 'f'],
    ['f', 'f', 'f', 't', 'f'],
    ['f', 't', 'f', 't', 'f'],
    ['f', 't', 'f', 't', 'f'],
    ['f', 't', 'f', 'f', 'f'],
    ['f', 't', 't', 't', 't']
];

const grid5 = [
    ['t', 'f', 't', 't', 't'],
    ['t', 'f', 'f', 'f', 'f'],
    ['t', 't', 't', 't', 'f'],
    ['f', 'f', 'f', 't', 'f'],
    ['f', 't', 'f', 'f', 'f'],
    ['f', 't', 't', 't', 't']
];

// will hold the current selected grid
cGrid = [];

// render rows and columns for displaying a grid
function displayGrid(grid, title){

    let resultsHTML = "";
    cGrid = grid;
    document.getElementById("gridTitle").innerHTML = title;
    if (title.includes("void")) {
        document.getElementById("gridTitle").setAttribute("colorValue", "void");
    } else if (title.includes("arc")) {
        document.getElementById("gridTitle").setAttribute("colorValue", "arc");
    } else if (title.includes("solar")) {
        document.getElementById("gridTitle").setAttribute("colorValue", "solar");
    } else {
        document.getElementById("gridTitle").setAttribute("colorValue", "default");
    }

    for ()
}