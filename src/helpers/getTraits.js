import traits from '@/models/traits';

function getTraits() {
    return {
        bubbleColor: {
            title: 'Bubble Color',
            items: traits[0]
        },
        bubble: {
            title: 'Bubble',
            items: traits[1],
            sprite: 1
        },
        accessory: {
            title: 'Accessory',
            items: traits[3],
            sprite: 1
        },
        head: {
            title: 'Head',
            items: traits[2],
            sprite: 3
        },
        mouth: {
            title: 'Mouth',
            items: traits[5],
            sprite: 4
        },
        eyes: {
            title: 'Eyes',
            items: traits[4],
            sprite: 5
        },
    }
}

function getTraitsForForm() {
    const traits = getTraits();
    const result = {};

    for (let key in traits) {
        result[key] = {
            ...traits[key],
            items: traits[key].items.map((item, index) => ({ id: index, title: item }))
        }
    }

    return result;
}

function getTraitsByIndexex(_traitsIndexes) {
    const indexes = [..._traitsIndexes];
    const color = indexes.shift();
    const traits = getTraits();
    let index = 0;
    const result = {
        background: {
            title: 'Background',
            value: color
        }
    };

    for (let key in traits) {
        result[key] = {
            ...traits[key],
            value: traits[key].items.find((item, _index) => indexes[index] === _index)
        }
        index += 1;
    }

    return result;
}

export {
    getTraits,
    getTraitsForForm,
    getTraitsByIndexex
};
