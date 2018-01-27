var countries = [
    {
        name: 'grecja',
        abbrev: 'gr'
    },
    {
        name: 'portugalia',
        abbrev: 'pt'
    },
    {
        name: 'hiszpania',
        abbrev: 'es'
    },
    {
        name: 'francja',
        abbrev: 'fr'
    },
    {
        name: 'belgia',
        abbrev: 'be'
    },
    {
        name: 'holandia',
        abbrev: 'nl'
    },
    {
        name: 'luksemburg',
        abbrev: 'lu'
    },
    {
        name: 'dania',
        abbrev: 'dk'
    },
    {
        name: 'niemcy',
        abbrev: 'de'
    },
    {
        name: 'islandia',
        abbrev: 'is'
    },
    {
        name: 'irlandia',
        abbrev: 'ie'
    },
    {
        name: 'wielka brytania',
        abbrev: 'gb'
    },
    {
        name: 'norwegia',
        abbrev: 'no'
    },
    {
        name: 'szwecja',
        abbrev: 'se'
    },
    {
        name: 'finlandia',
        abbrev: 'fi'
    },
    {
        name: 'wlochy',
        abbrev: 'it'
    },
    {
        name: 'szwajcaria',
        abbrev: 'ch'
    },
    {
        name: 'austria',
        abbrev: 'at'
    },
    {
        name: 'czechy',
        abbrev: 'cz'
    },
    {
        name: 'słowacja',
        abbrev: 'sk'
    },
    {
        name: 'węgry',
        abbrev: 'hu'
    },
    {
        name: 'rumunia',
        abbrev: 'ro'
    }, {
        name: 'bulgaria',
        abbrev: 'bg'
    },
    {
        name: 'albania',
        abbrev: 'al'
    },
    {
        name: 'slowenia',
        abbrev: 'si'
    },
    {
        name: 'chorwacja',
        abbrev: 'hr'
    },
    {
        name: 'bosnia i hercegowina',
        abbrev: 'ba'
    },
    {
        name: 'serbia',
        abbrev: 'rs'
    },
    {
        name: 'czarnogora',
        abbrev: 'me'
    },
    {
        name: 'macedonia',
        abbrev: 'mk'
    },
    {
        name: 'polska',
        abbrev: 'pl'
    },
    {
        name: 'estonia',
        abbrev: 'ee'
    },
    {
        name: 'lotwa',
        abbrev: 'lv'
    },
    {
        name: 'ukraina',
        abbrev: 'ua'
    },
    {
        name: 'bialorus',
        abbrev: 'by'
    },
    {
        name: 'moldawia',
        abbrev: 'md'
    },
    {
        name: 'rosja',
        abbrev: 'ru'
    },


];
// var dictionary = ['portugalia', 'hiszpania', 'francja', 'belgia', 'holandia', 'luksemburg', 'dania', 'niemcy',
//     'islandia', 'irlandia', 'wielka brytania', 'norwegia', 'szwecja', 'finlandia', 'wlochy', 'szwajcaria',
//     'austria', 'czechy', 'slowacja', 'wegry', 'rumunia', 'bulgaria', 'albania', 'grecja', 'slowenia', 'chorwacja',
//     'bosnia i hercegowina', 'serbia', 'czarnogora', 'macedonia', 'polska', 'estonia', 'lotwa', 'litwa', 'ukraina',
//     'bialorus', 'moldawia', 'rosja'];

var dictionary = countries.map(function (country) {
    return country.name;
});

function getAllSubsets(word) {
    var result = {};
    for (var startIndex = 0; startIndex < word.length; startIndex++) {
        for (var endIndex = word.length; endIndex > startIndex; endIndex--) {
            result[word.substring(startIndex, endIndex)] = true;
        }
    }
    return Object.keys(result);

}

var allFragmentMap = {};


dictionary.forEach(function (word) {
    var parts = getAllSubsets(word);
    parts.forEach(function (part) {
        allFragmentMap[part] = allFragmentMap[part] || [];
        allFragmentMap[part].push(word)
    })
});

function encode(phrase) {
    var subPhrases = [];
    var startIndex = 0;
    while (startIndex < phrase.length) {
        for (var i = phrase.length; i > startIndex; i--) {
            var subPhrase = phrase.substring(startIndex, i);
            if (allFragmentMap[subPhrase]) {
                subPhrases.push({subPhrase: subPhrase, countries: allFragmentMap[subPhrase]})
                startIndex += subPhrase.length;
                break;
            } else if (i === startIndex + 1) {
                throw new Error('Dictionary does not contain phrase: ' + subPhrase);
            }
        }
    }
    return subPhrases;
}

function getRandom(array) {
    var index = Math.floor((Math.random() * array.length));
    return array[index];
}

function findPlace(inputArray) {
    return inputArray.map(function (item) {
        var country = getRandom(item.countries);
        var startIndex = country.indexOf(item.subPhrase);
        return {
            country: country,
            abbrev: countries.find(function (c) {
                return c.name === country;
            }).abbrev,
            fragment: [startIndex + 1, startIndex + item.subPhrase.length]
        }
    })
}


function encodeMapAndPresent(value) {

    console.log('findPlace', findPlace(encode(value)));
    var places = findPlace(encode(value));
    output.innerHTML = '';
    places.forEach(function (place) {
        var divFragment = createElement('div', {class: 'fragment'}, '[' + place.fragment + ']');
        var spa = createElement('span', {class: 'flag-icon flag-icon-' + place.abbrev});
        var div = createElement('div', {class: 'flag-wrapper'}, spa, divFragment);
        output.append(div);

    });
}

function createElement(tagName, attribiutes) {
    var element = document.createElement(tagName);
    Object.keys(attribiutes).forEach(function (attributeName) {
        element.setAttribute(attributeName, attribiutes[attributeName])

    });

    for (var i = 2; i < arguments.length; i++) {
        element.append(arguments[i])

    }

    return element;
}

