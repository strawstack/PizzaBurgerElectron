// HTML view is dynamically populated once at beginning
// Dom links are creaed
// Events cause view to change
// Animations occur automatically
//

function main() {

    let grid = [ // true = pizza, false = burger
        [true, true, true],
        [true, true, true],
        [true, true, true]];

    let ref = [
        [document.querySelector(".c0>i"), document.querySelector(".c1>i"), document.querySelector(".c2>i")],
        [document.querySelector(".c3>i"), document.querySelector(".c4>i"), document.querySelector(".c5>i")],
        [document.querySelector(".c6>i"), document.querySelector(".c7>i"), document.querySelector(".c8>i")]];

    let getRowCol = function(number) {
        // Translate number to [row, col]
        return {
            "r": Math.floor(number / 3),
            "c": number % 3
        }
    }

    let toggle = function(r, c) {
        // Toggle [r, c] target
        if (grid[r][c]) {
            grid[r][c] = false;
            ref[r][c].className = "fas fa-hamburger";
        } else {
            grid[r][c] = true;
            ref[r][c].className = "fas fa-pizza-slice";
        }
    };

    let flip = function(r, c) {
        // Flip [r, c] target and neighbour cells
        let offset = [[-1, 0], [0, 1], [1, 0], [0, -1], [0, 0]];
        for (let o of offset) {
            let or = o[0];
            let oc = o[1];
            let nr = r + or;
            let nc = c + oc;
            if (nr >= 0 && nr < 3 && nc >= 0 && nc < 3) {
                // If [nr, nc] is in bounds
                toggle(nr, nc);
            }
        }
    };

    let randomizeBoard = function() {
        // Place the board in a random state
        let count = Math.random() * 10 + 10;
        while (count > 0) {
            let r = Math.floor(Math.random() * 3);
            let c = Math.floor(Math.random() * 3);
            flip(r, c);
            count -= 1;
        }
    };

    // Set up click handlers
    document.querySelectorAll(".cell").forEach(e => {
        e.addEventListener("click", e => {
            let n = parseInt(e.target.getAttribute("data-number"));
            let coord = getRowCol(n);
            let r = coord.r;
            let c = coord.c;
            flip(r, c);
        })
    });

    randomizeBoard();

    document.querySelector(".reset-btn").addEventListener("click", e => {
        randomizeBoard();
    });
}

window.onload = main;
