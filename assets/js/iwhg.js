document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Back to Top Logic
    (function () {
        const mybutton = document.getElementById("myBtn");

        if (mybutton) {
            window.onscroll = function () {
                // Show button after scrolling 500px
                if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
                    mybutton.style.display = "block";
                } else {
                    mybutton.style.display = "none";
                }
            };

            mybutton.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    })();

    // 2. Set current year in footer
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // 3. Gallery Initialization
    const grid = document.querySelector('.gallery-grid');
if (grid) {
    imagesLoaded(grid, function() {
        // Initialize Masonry
        new Masonry(grid, {
            itemSelector: '.gallery-item',
            columnWidth: '.gallery-item',
            percentPosition: true,
            gutter: 20
        });

    });
}

    // 4. Announcement banner
    // Settings live in announcement-config.js (the ANNOUNCEMENT object). This code only
    // decides whether to show the banner and builds it. Building it here means the markup
    // exists in one place instead of being copied into every HTML page.
    (function () {
        // If the config file failed to load, do nothing rather than throw an error.
        // typeof is used because reading an undefined variable directly would throw.
        if (typeof ANNOUNCEMENT === 'undefined') {
            return;
        }

        const config = ANNOUNCEMENT;
        const pageWrapper = document.getElementById('page-wrapper');
        if (!pageWrapper || !config.message) {
            return;
        }

        // Preview mode: adding ?announcement=preview to the page address shows the banner
        // regardless of the enabled flag and dates, so the layout can be checked in advance.
        const isPreview = new URLSearchParams(window.location.search).get('announcement') === 'preview';

        if (!isPreview) {
            if (config.enabled !== true) {
                return;
            }

            // Dates must look like YYYY-MM-DD. Because that format is year first, plain
            // string comparison also puts dates in the correct order ("2027-02-27" > "2027-01-16").
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!datePattern.test(config.start) || !datePattern.test(config.end)) {
                console.warn('Announcement banner: start and end must be in YYYY-MM-DD format.');
                return;
            }

            // Work out today's date in UK time, not the visitor's time zone, so the banner
            // changes over at UK midnight for everyone. formatToParts gives us the year, month
            // and day separately, which we join back into YYYY-MM-DD.
            const parts = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Europe/London',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).formatToParts(new Date());
            const lookup = {};
            parts.forEach(function (part) { lookup[part.type] = part.value; });
            const today = lookup.year + '-' + lookup.month + '-' + lookup.day;

            // Inclusive on both ends: shows on the start day and on the end day.
            if (today < config.start || today > config.end) {
                return;
            }
        }

        // Build the banner. textContent (rather than innerHTML) treats the message as plain
        // text, so characters such as < or & in the config cannot break the page.
        const banner = document.createElement('div');
        banner.id = 'announcement';
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-label', 'Announcement');
        if (isPreview) {
            banner.classList.add('is-preview');
        }

        const paragraph = document.createElement('p');
        const text = document.createElement('span');
        text.className = 'announcement-text';
        text.textContent = config.message;
        paragraph.appendChild(text);

        if (config.linkText && config.linkUrl) {
            // linkUrl is written relative to the site root. Pages in /competition/ sit one
            // folder deeper, so resolve it against the location of the config file
            // (assets/js/), going up two levels to reach the root. Full web addresses
            // (https://...) pass through this unchanged.
            const configScript = document.querySelector('script[src$="announcement-config.js"]');
            const siteRoot = configScript ? new URL('../../', configScript.src) : new URL('./', window.location.href);
            const linkTarget = new URL(config.linkUrl, siteRoot);

            // Only allow ordinary link types (guards against a mistyped or unsafe "javascript:" link).
            if (['http:', 'https:', 'mailto:', 'tel:'].indexOf(linkTarget.protocol) !== -1) {
                const link = document.createElement('a');
                link.className = 'announcement-link';
                link.href = linkTarget.href;
                link.textContent = config.linkText;
                paragraph.appendChild(link);
            }
        }

        banner.appendChild(paragraph);

        // First child of the page wrapper = top of the page. On mobile the theme's fixed
        // title bar is outside the wrapper and the wrapper already has padding to clear it,
        // so the banner sits directly beneath the title bar.
        pageWrapper.insertBefore(banner, pageWrapper.firstChild);
    })();
});
 