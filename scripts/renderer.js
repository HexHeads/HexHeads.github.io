function buildTraits(address) {
    if (address.length === 42) address = address.slice(2)
    const displacement = parseInt(address.substring(36, 40), 16)
    const traits = []
    const foil = bigInt(address, 16).mod(bigInt("100")).compare(0) === 0;

    if (foil) {
        traits.push("Foil");
        traits.push("Foil");
    } else {
        traits.push("#"+address.substring(0, 6));
        traits.push((parseInt(address.substring(6, 11), 16) + displacement) % 10);
    }

    for(let i = 11; i < 36; i+=5) {
        let trait
        if (i === 16) {
            trait = (parseInt(address.substring(16, 21), 16) + displacement) % 12
        } else {
            trait = (parseInt(address.substring(i, i+5), 16) + displacement) % 30
        }
        traits.push(trait)
    }
    console.log(traits)
    return traits
}

function renderFromTraits(traits) {
    const ctx = document.getElementById('canvas').getContext('2d');
    let color = traits[0];

    function drawBackground() {
        if(color === "Foil") {
            ctx.drawImage(img,
                0, 192, 32, 32,
                0, 0, 32, 32);
        } else {
            if (color === undefined) {
                color = "#FFFFFF";
            }
            ctx.fillStyle = color;
            ctx.rect(0, 0, 32, 32);
            ctx.fill();
        }
    }

    function drawTrait(layer, item) {
        if (item !== "Foil") {
            ctx.drawImage(img,
                item*32, layer*32, 32, 32,
                0, 0, 32, 32);
        }
    }

    const img = new Image();
    img.onload = () => {
        drawBackground()
        for (let i = 0; i <= 5; i++) {
            drawTrait(i, traits[i+1]) // 0 is Background
        }
    };
    img.src = 'img/HexHeadsFoil.png';
}

function render(address) {
    const traits =  buildTraits(address)
    renderFromTraits(traits)
}
