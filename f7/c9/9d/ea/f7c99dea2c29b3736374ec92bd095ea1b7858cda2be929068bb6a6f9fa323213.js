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
        if (childCount >= 250) {
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
    const handleList = async url => {
        const json = await fetch(url, { cache: 'no-store' })
            .then(res => res.json());
        const rec = async data => {
            if (typeof data === 'object') {
                const values = Object.values(data);
                for (const val of values) {
                    rec(val);
                }
            } else if (typeof data === 'string') {
                if (data.startsWith('https://cdn.jsdelivr.net/')) {
                    await fetch(data, { cache: 'no-store' });
                    appendData(data);
                }
            } else {
                console.warn(`What's this? \n${rec}`);
            }
        }
        rec(json);
    };
    const main = () => {
        for (const ver of versions) {
            handleList(makeUrl(ver));
        };
        setTimeout(main, 60 * 1000);
    };

    window.addEventListener('load', () => {
        document.body.appendChild(dataDiv);
        main();
    });
})();