import traits from '@/models/traits';

function getTraits() {
    return {
        backgroundColor: {
            title: 'Background Color',
            items: traits[0]
        },
        decorationColor: {
            title: 'Decoration Color',
            items: traits[1]
        },
        decoration: {
            title: 'Decoration',
            items: traits[2],
            sprite: 1
        },
        head: {
            title: 'Head',
            items: traits[3],
            sprite: 3
        },
        mouth: {
            title: 'Mouth',
            items: traits[4],
            sprite: 4
        },
        eyes: {
            title: 'Eyes',
            items: traits[5],
            sprite: 5
        },
        hair: {
            title: 'Hair',
            items: traits[6],
            sprite: 6
        },
        hat: {
            title: 'Hat',
            items: traits[7],
            sprite: 7
        },
        extra: {
            title: 'Extra',
            items: traits[8],
            sprite: 8
        }
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
    const traits = getTraits();
    let index = 0;
    const result = {
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
