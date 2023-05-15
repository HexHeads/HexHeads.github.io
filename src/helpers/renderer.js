import metadata from '@/models/traits';

let total = 1;
for (let i = 0; i < metadata.length; i++) {
    total += (total * metadata[i].length);
}

function generateAddress() {
    let address = "0x";
    for (let i = 0; i < 40; i++) {
        address += Math.floor(Math.random() * 16).toString(16);
    }
    return address
}

function generateTraits(idHex) {
    const traits = [];
    idHex = idHex.slice(2);
    for (let i = 0; i < metadata.length; i++) { // TODO Change when adding a new layer
        traits.push(Number("0x" + idHex.slice(i * 4, i * 4 + 4)) % metadata[i].length);
    }
    console.log(traits)
    return traits;
}

function generate(idHex) {
    if (idHex === undefined) {
        idHex = generateAddress();
    }
    const traits = generateTraits(idHex);
    drawFromTraits(traits);
}

//// DRAWING ////

function drawFromTraits(traits) {
    const ctx = document.getElementById('canvas').getContext('2d');
    drawBackground(ctx, traits[0]);
    drawDecoration(ctx, traits);
}

function drawBackground(ctx, id) {
    let background = metadata[0][id];
    if (background === undefined) {
        background = "#FFFFFF";
    }
    ctx.fillStyle = background;
    ctx.rect(0, 0, 32, 32);
    ctx.fill();
}

function drawDecoration(ctx, traits) {
    const id = traits[1];
    const color_id = traits[2];
    const color = metadata[2][color_id];

    if (id !== undefined && color !== undefined) {

        let source = new Image();
        source.src = require('@/assets/images/hexheads/1.png');

        const row = Math.floor(id / 16);
        const col = id % 16;
        source.onload = () => {
            ctx.drawImage(source,
                col * 32, row * 32, 32, 32,
                0, 0, 32, 32);

            const imageData = ctx.getImageData(0, 0, 32, 32);
            const data = imageData.data

            for (let i = 0; i < data.length; i += 4) {
                if (data[i] === 0 && data[i + 1] === 0 && data[i + 2] === 0) {
                    data[i] = Number("0x" + color.slice(1, 3));       // R
                    data[i + 1] = Number("0x" + color.slice(3, 5));   // G
                    data[i + 2] = Number("0x" + color.slice(5, 7));   // B
                }
            }
            ctx.putImageData(imageData, 0, 0);
            drawTrait(ctx, 3, traits);
        }
    } else {
        drawTrait(ctx, 3, traits);
    }
}

function drawTrait(ctx, layer, traits) {
    if (layer >= metadata.length) return;

    const trait = traits[layer];

    if (trait !== undefined) {
        let source = new Image();
        source.src = require(`@/assets/images/hexheads/${ layer }.png`);
        const row = Math.floor(trait / 16);
        const col = trait % 16;
        source.onload = () => {
            ctx.drawImage(source,
                col * 32, row * 32, 32, 32,
                0, 0, 32, 32);
            drawTrait(ctx, layer + 1, traits);
        }
    } else {
        drawTrait(ctx, layer + 1, traits);
    }
}

export {
    generateTraits,
    generate,
    drawFromTraits
}
