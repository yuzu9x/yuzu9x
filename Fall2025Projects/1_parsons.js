
let squares = [];
let draggedSquare = null;
let offset = { x: 0, y: 0 };

function setup() {
    let canvas = createCanvas(800, 700);
    canvas.parent('canvas1'); 
    
    
    // Placeholder squares for the shoes images
    const colors = [
        [255, 100, 100], 
        [100, 255, 100], 
        [100, 100, 255], 
        [255, 255, 100], 
        [255, 100, 255], 
        [100, 255, 255], 
        [255, 150, 100], 
        [150, 100, 255], 
        [255, 200, 200], 
        [200, 255, 200], 
        [200, 200, 255], 
        [255, 255, 200], 
    ];
    
    // Dragging loop 
    for (let i = 0; i < colors.length; i++) {
        squares.push({
            x: 50 + (i % 4) * 80,
            y: 50 + Math.floor(i / 4) * 80,
            size: 60,
            color: colors[i],
            isDragging: false
        });
    }
}

function draw() {
    background(255);
    
    // Draw all squares
    for (let square of squares) {
        fill(square.color[0], square.color[1], square.color[2]);
        stroke(0);
        strokeWeight(2);
        rect(square.x, square.y, square.size, square.size);
    }
    
   
}

function mousePressed() {
    // Check if mouse is over any square
    for (let i = squares.length - 1; i >= 0; i--) {
        let square = squares[i];
        if (mouseX >= square.x && mouseX <= square.x + square.size &&
            mouseY >= square.y && mouseY <= square.y + square.size) 
            {
            draggedSquare = square;
            square.isDragging = true;

            offset.x = mouseX - square.x;
            offset.y = mouseY - square.y;
    
            squares.splice(i, 1);
            squares.push(square);
            break;
        }
    }
}

function mouseDragged() {
    if (draggedSquare) {
        draggedSquare.x = mouseX - offset.x;
        draggedSquare.y = mouseY - offset.y;
        
        // Keep square within canvas bounds
        draggedSquare.x = constrain(draggedSquare.x, 0, width - draggedSquare.size);
        draggedSquare.y = constrain(draggedSquare.y, 0, height - draggedSquare.size);
    }
}

// Release the dragged square so it stays
function mouseReleased() {
    if (draggedSquare) {
        draggedSquare.isDragging = false;
        draggedSquare = null;
    }
}