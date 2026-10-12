/* =========================================
   AJ PERSONAL WEBSITE
   GLOBAL JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       LIGHT & DARK THEME
    ========================================= */

    const themeToggle = document.getElementById("theme-toggle");
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("aj-theme");

    // Dark mode is the default for first-time visitors.
    const initialTheme =
        savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : "dark";

    function setTheme(theme) {
        html.setAttribute("data-theme", theme);
        html.style.colorScheme = theme;
        localStorage.setItem("aj-theme", theme);

        const nextTheme = theme === "dark" ? "light" : "dark";

        if (themeToggle) {
            themeToggle.setAttribute(
                "aria-label",
                `Switch to ${nextTheme} mode`
            );
            themeToggle.setAttribute(
                "title",
                `Switch to ${nextTheme} mode`
            );
            themeToggle.setAttribute(
                "aria-pressed",
                String(theme === "light")
            );
        }
    }

    setTheme(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-theme");
            setTheme(currentTheme === "dark" ? "light" : "dark");
        });
    }

    /* =========================================
       MOBILE NAVIGATION
    ========================================= */

    const mobileMenuToggle = document.getElementById(
        "mobile-menu-toggle"
    );
    const siteHeader = document.querySelector(".site-header");
    const primaryNavigation = document.getElementById(
        "primary-navigation"
    );

    if (mobileMenuToggle && siteHeader && primaryNavigation) {

        function setMenuOpen(isOpen) {
            siteHeader.classList.toggle("menu-open", isOpen);

            mobileMenuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
            mobileMenuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
            mobileMenuToggle.setAttribute(
                "title",
                isOpen ? "Close menu" : "Open menu"
            );
        }

        mobileMenuToggle.addEventListener("click", () => {
            const isOpen = siteHeader.classList.contains("menu-open");
            setMenuOpen(!isOpen);
        });

        primaryNavigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => setMenuOpen(false));
        });

        document.addEventListener("click", (event) => {
            if (
                siteHeader.classList.contains("menu-open") &&
                !siteHeader.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (
                event.key === "Escape" &&
                siteHeader.classList.contains("menu-open")
            ) {
                setMenuOpen(false);
                mobileMenuToggle.focus();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 850) {
                setMenuOpen(false);
            }
        });
    }
});

/* =====================================================
   CONSISTENT SVG ARROWS ACROSS ALL DEVICES
   Handles standalone icons and arrows within link text.
   Does not modify text, links, buttons, or nested markup.
===================================================== */

document.addEventListener("DOMContentLoaded", function () {
    const svgNS = "http://www.w3.org/2000/svg";
    const paths = {
        "↗": "M7 17 17 7 M7 7h10v10",
        "↖": "M17 17 7 7 M7 17V7h10",
        "↘": "M7 7 17 17 M17 7v10H7",
        "↙": "M17 7 7 17 M7 7v10h10",
        "→": "M5 12h14 M13 5l7 7-7 7",
        "←": "M19 12H5 M11 5l-7 7 7 7",
        "↓": "M12 5v14 M5 13l7 7 7-7",
        "↑": "M12 19V5 M5 11l7-7 7 7",
        "➡": "M5 12h14 M13 5l7 7-7 7",
        "⬅": "M19 12H5 M11 5l-7 7 7 7",
        "⬇": "M12 5v14 M5 13l7 7 7-7",
        "⬆": "M12 19V5 M5 11l7-7 7 7"
    };

    // Match arrows with or without emoji/text variation selectors.
    const arrowPattern = /([↗↖↘↙→←↓↑➡⬅⬇⬆][\uFE0E\uFE0F]?)/g;
    const arrowCheck = /[↗↖↘↙→←↓↑➡⬅⬇⬆]/;
    const excludedTags = new Set([
        "SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE", "SVG"
    ]);

    function createArrow(character) {
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("width", "1.1em");
        svg.setAttribute("height", "1.1em");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
        svg.setAttribute("class", "aj-vector-arrow");
        svg.style.display = "inline-block";
        svg.style.verticalAlign = "-0.15em";

        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("d", paths[character]);
        svg.appendChild(path);
        return svg;
    }

    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT
    );
    const targets = [];
    let node;

    while ((node = walker.nextNode())) {
        const parent = node.parentElement;
        if (!parent || !arrowCheck.test(node.nodeValue)) continue;
        if (excludedTags.has(parent.tagName)) continue;
        if (parent.closest("[contenteditable], script, style, noscript, textarea, code, pre, svg")) continue;
        targets.push(node);
    }

    targets.forEach(function (textNode) {
        const pieces = textNode.nodeValue.split(arrowPattern);
        const fragment = document.createDocumentFragment();

        pieces.forEach(function (piece) {
            if (!piece) return;
            const character = piece.replace(/[\uFE0E\uFE0F]/g, "");
            if (paths[character]) {
                fragment.appendChild(createArrow(character));
            } else {
                fragment.appendChild(document.createTextNode(piece));
            }
        });

        textNode.replaceWith(fragment);
    });
});

/* =====================================================
   HOMEPAGE PHOTO-FIRST ENTRANCE
   This runs on the homepage only. The remaining pages
   continue using the shared theme, menu, and SVG icons.
===================================================== */

(function () {
    const hero = document.querySelector(".hero");
    const photo = hero && hero.querySelector(".hero-image");

    if (!hero || !photo) return;

    const html = document.documentElement;
    html.classList.add("hero-sequenced");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        hero.classList.add("hero-photo-ready");
        return;
    }

    let started = false;

    function revealAfterPhoto() {
        if (started) return;
        started = true;

        // Show the photograph unobstructed first, then fade
        // in the overlay and introduce the homepage content.
        window.setTimeout(function () {
            window.requestAnimationFrame(function () {
                hero.classList.add("hero-photo-ready");
            });
        }, 950);
    }

    if (photo.complete) {
        revealAfterPhoto();
    } else {
        photo.addEventListener("load", revealAfterPhoto, { once: true });
        photo.addEventListener("error", revealAfterPhoto, { once: true });
    }

    // Do not leave the homepage hidden indefinitely when
    // an image cannot be fetched or the connection is slow.
    window.setTimeout(revealAfterPhoto, 4000);
})();
