function buildTraits(address) {
    if (address.length === 42) address = address.slice(2)
    const displacement = parseInt(address.substring(36, 40), 16)
    const traits = []
    traits.push("#"+address.substring(0, 6))
    for(let i = 6; i < 36; i+=5) {
        let trait
        if(i === 6) {
            trait = (parseInt(address.substring(6, 11), 16) + displacement) % 10
        } else if (i === 16) {
            trait = (parseInt(address.substring(16, 21), 16) + displacement) % 12
        } else {
            trait = (parseInt(address.substring(i, i+5), 16) + displacement) % 30
        }
        traits.push(trait)
    }
    return traits
}

function renderFromTraits(traits) {
    const ctx = document.getElementById('canvas').getContext('2d');

    function drawBackground() {
        let color = traits[0];
        if (color === undefined) {
            color = "#FFFFFF";
        }
        ctx.fillStyle = color;
        ctx.rect(0, 0, 32, 32);
        ctx.fill();
    }

    function drawTrait(layer, item) {
        ctx.drawImage(img,
            item*32, layer*32, 32, 32,
            0, 0, 32, 32);
    }

    const img = new Image();
    img.onload = () => {
        drawBackground()
        for (let i = 0; i <= 5; i++) {
            drawTrait(i, traits[i+1]) // 0 is Background
        }
    };
    img.src = 'img/HexHeads.png';
}

function render(address) {
    // 0x3A205E'Cf286'bBe11'46063'8aCe4'7D501'A53fB'91C0
    const traits =  buildTraits(address)
    renderFromTraits(traits)
}
