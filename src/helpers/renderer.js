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

function isFoil(idHex) {
    const id = BigInt(idHex);
    if (id % BigInt("1500000000") === 0n) {
        return true;
    }
    return false
}

function generateTraits(idHex) {
    const traits = [];
    idHex = idHex.slice(2);
    const seed = Number("0x"+idHex.slice(36, 40));
    for (let i = 0; i < metadata.length; i++) { // TODO Change when adding a new layer
        traits.push((Number("0x" + idHex.slice(i*4, i*4+4)) + seed) % metadata[i].length);
    }

    // 11% without hair
    if (seed % 9 === 0) {
        traits[6] = undefined
    }

    // 30% without hat
    if (seed % 3 === 0) {
        traits[7] = undefined
    }

    // 90% without extra
    if (seed % 10 !== 0) {
        traits[8] = undefined
    }

    return traits;
}

function generate(idHex, id) {
    if (idHex === undefined) {
        idHex = generateAddress();
    }
    const traits = generateTraits(idHex);
    drawFromTraits(traits, id);
}

//// DRAWING ////

function drawFromTraits(traits, id = '') {
    const ctx = document.getElementById('canvas' + (id ? '-' + id: '').trim()).getContext('2d');
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
    const id = traits[2];
    const color = metadata[1][traits[1]];

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
