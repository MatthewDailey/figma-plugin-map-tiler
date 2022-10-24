// Get selection and choose rectangle as the tile and image as the map to cover.
const selection = figma.currentPage.selection;

if (selection.length !== 2) {
  if (selection.length === 1) {
    
    const newRect = figma.createRectangle()
    newRect.resize(selection[0].width / 100, selection[0].width / 100)
    newRect.x = selection[0].x
    newRect.y = selection[0].y
    figma.closePlugin("Tile created, re-run selecting image and tile.")
  } else {
    figma.closePlugin("Please select an image to tile.")
  }
} else {
  // Select smallest node as the tile and larger as base.
  function getTileAndBase() {
    const tile = selection[0];
    const base = selection[1];
    if (tile.width * tile.height > base.width * base.height) {
      return [base, tile];
    }
    return [tile, base];
  }

  const [tile, base] = getTileAndBase();

  const numberOfTilesX = Math.ceil(base.width / tile.width);
  const numberOfTilesY = Math.ceil(base.height / tile.height);

  for (let i = 0; i < numberOfTilesX; i++) {
    for (let j = 0; j < numberOfTilesY; j++) {
      const tileClone = tile.clone();
      tileClone.x = base.x + tile.width * i;
      tileClone.y = base.y + tile.height * j;
    }
  }

  figma.closePlugin();
}
