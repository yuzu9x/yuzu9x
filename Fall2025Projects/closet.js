let draggedShoe = null;
let offset = { x: 0, y: 0 };
let spriteImage;
let shoeImages = [];

// My individual objects with prefixed positions
let shoe1 = { x: 0, y: 300, size: 140, isDragging: false }; //caroline hu adidas
let shoe2 = { x: 0, y: 380, size: 140, isDragging: false }; // black ballet
let shoe3 = { x: 110, y: 300, size: 140, isDragging: false }; //purple anna sui
let shoe4 = { x: 220, y: 380, size: 140, isDragging: false }; //white flats
let shoe5 = { x: 110, y: 380, size: 140, isDragging: false }; // rainboots
let shoe6 = { x: 320, y: 380, size: 140, isDragging: false }; //black heels
let shoe7 = { x: 320, y: 300, size: 140, isDragging: false }; //red heels
let shoe8 = { x: 420, y: 380, size: 140, isDragging: false }; //pink heels
let shoe9 = { x: 220, y: 300, size: 140, isDragging: false }; //brown heels
let shoe10 = { x: 430, y: 300, size: 140, isDragging: false }; // easter bunny 

let shoe11 = { x: 10, y: 190, size: 140, isDragging: false }; // white socks
let shoe12 = { x: 220, y: 190, size: 140, isDragging: false }; // light purple socks
let shoe13 = { x: 320, y: 190, size: 140, isDragging: false }; // white with pink bow
let shoe14 = { x: 50, y: 70, size: 140, isDragging: false };  // pink and blue dot socks
let shoe15 = { x: 110, y: 190, size: 140, isDragging: false }; // black polka dot socks
let shoe16 = { x: 270, y: 70, size: 140, isDragging: false }; // dark red socks
let shoe17 = { x: 150, y: 70, size: 140, isDragging: false }; // purple socks

// Array of all shoes 
let allShoes = [shoe1, shoe2, shoe3, shoe4, shoe5, shoe6, shoe7, shoe8, shoe9, shoe10, shoe11, shoe12, shoe13, shoe14, shoe15, shoe16, shoe17];

// Array to track drawing order (so shoes will be drawn in this order)
let drawOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

function preload() {
    // Sprite mannequin
    spriteImage = loadImage('../Fall2025Projects/Fall2025Images/Sprite-0005.png'); 
    
    // Loading all shoefiles
    const shoeImageFiles = [
        'Sprite-0007.png',
        'Sprite-0008.png',
        'Sprite-0009.png',
        'Sprite-0010.png',
        'Sprite-0011.png',
        'Sprite-0012.png',
        'Sprite-0013.png',
        'Sprite-0014.png',
        'Sprite-0015.png',
        'Sprite-0016.png',
        'Sprite-0017.png',
        'Sprite-0018.png',
        'Sprite-0019.png',
        'Sprite-0020.png',
        'Sprite-0021.png',
        'Sprite-0022.png',
        'Sprite-0023.png'
    ];
    
    for (let i = 0; i < shoeImageFiles.length; i++) {
        shoeImages.push(loadImage('../Fall2025Projects/Fall2025Images/' + shoeImageFiles[i]));
    }
}
 // Hosting p5 javascript canvas
function setup() {
    let canvas = createCanvas(800, 700);
    canvas.parent('canvas1'); 
}

function draw() {
    background(203, 247, 236);
    
    if (spriteImage) {
        let imgX = width - 350;
        let imgY = 10;
        image(spriteImage, imgX, imgY, 400, 505);
    }
    
    // Draw shoes in the order specified by drawOrder array (so clicked shoes appear on top)
    for (let i = 0; i < drawOrder.length; i++) {
        let shoeIndex = drawOrder[i];
        let shoe = allShoes[shoeIndex];
        if (shoeImages[shoeIndex]) {
            image(shoeImages[shoeIndex], shoe.x, shoe.y, shoe.size, shoe.size);
        }
    }
}

function mousePressed() {
    // Check for each of the shoes individlually
    for (let i = allShoes.length - 1; i >= 0; i--) {
        let shoe = allShoes[i];
        if (mouseX >= shoe.x && mouseX <= shoe.x + shoe.size &&
            mouseY >= shoe.y && mouseY <= shoe.y + shoe.size) 
            {
            draggedShoe = shoe;
            shoe.isDragging = true;

            offset.x = mouseX - shoe.x;
            offset.y = mouseY - shoe.y;
            
            // Bring clicked shoe or sock to the front
            let shoeIndex = allShoes.indexOf(shoe);
            let orderIndex = drawOrder.indexOf(shoeIndex);
            drawOrder.splice(orderIndex, 1); 
            drawOrder.push(shoeIndex);       
            
            break;
        }
    }
}

function mouseDragged() {
    if (draggedShoe) {
        draggedShoe.x = mouseX - offset.x;
        draggedShoe.y = mouseY - offset.y;
        
        // Keep shoes and socks within canvas 
        draggedShoe.x = constrain(draggedShoe.x, 0, width - draggedShoe.size);
        draggedShoe.y = constrain(draggedShoe.y, 0, height - draggedShoe.size);
    }
}

function mouseReleased() {
    if (draggedShoe) {
        draggedShoe.isDragging = false;
        draggedShoe = null;
    }
}