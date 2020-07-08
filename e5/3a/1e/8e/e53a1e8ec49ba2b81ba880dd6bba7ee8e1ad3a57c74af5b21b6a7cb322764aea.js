'use-strict';

(() => {
    const makeUrl = ver => `https://cdn.jsdelivr.net/npm/4a0ca042@${ver}/loadBackground/imageList.json`;
    const versions = ['0.0.1', '0.0.2', '0.0.3', '0.0.4', '0.0.6', '0.0.7'];

    const dataDiv = document.createElement('div');
    dataDiv.id = 'list';
    dataDiv.innerText = 'Loaded jsDelivr URL';

    const makeDiv = (divId, text) => {
        const div = document.createElement('div');
        div.id = divId;
        if (text) {
            const textNode = document.createTextNode(text);
            div.appendChild(textNode);
        } else {
            div.hidden = true;
        }
        return div;
    }

    let previousDiv = makeDiv(Date.now());
    dataDiv.appendChild(previousDiv);
    let childCount = 0;

    const appendData = text => {
        const latestDiv = makeDiv(Date.now(), text);
        if (childCount >= 100) {
            dataDiv.innerText = 'Loaded jsDelivr URL';
            childCount = 0;
            console.log('Div cleared. ');
            previousDiv = makeDiv(Date.now());
            dataDiv.appendChild(previousDiv);
        }
        dataDiv.insertBefore(latestDiv, previousDiv);
        ++childCount;
        previousDiv = latestDiv;
    }
    const handleList = json => {
        const rec = json => {
            if (typeof json === 'object') {
                const values = Object.values(json);
                for (const val of values) {
                    if (typeof val === 'string') {
                        if (val.startsWith('https://cdn.jsdelivr.net/')) {
                            fetch(val, { cache: 'no-store' })
                                .then(() => appendData(val))
                                .catch(() => console.warn(`File ${val} load failed. `));
                        }
                    } else if (typeof val === 'object') {
                        rec(val);
                    } else {
                        console.warn(`What's this? \n${val}`);
                    }
                }
            }
        };
        rec(json);
    };
    const main = () => {
        for (const ver of versions) {
            fetch(makeUrl(ver), { cache: 'no-store' })
                .then(res => res.json())
                .then(json => handleList(json))
                .catch(() => console.warn(`List ${url} load failed. `));
        };
        setTimeout(main, 60 * 1000);
    };

    window.addEventListener('load', () => {
        document.body.appendChild(dataDiv);
        main();
    });
})();