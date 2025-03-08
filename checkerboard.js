const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const rows = 30;
const cols = 50;
const tileSize = canvas.width / cols;
const colors = ["#D7263D", "#F46036", "#2E294E", "#1B998B","#C5D86D"];

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let colorIndex = (row + col) % colors.length; // Cycle through colors
        ctx.fillStyle = colors[colorIndex];
        ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
    }
}
