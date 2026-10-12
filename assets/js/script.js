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

        // Apply selected theme.
        html.setAttribute("data-theme", theme);
        html.style.colorScheme = theme;

        // Remember the visitor's preference.
        localStorage.setItem("aj-theme", theme);

        // Determine which theme comes next.
        const nextTheme = theme === "dark" ? "light" : "dark";

        // Keep the theme button accessible.
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

    // Apply saved theme when the website loads.
    setTheme(initialTheme);

    // Switch between light and dark themes.
    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const currentTheme = html.getAttribute("data-theme");

            const newTheme =
                currentTheme === "dark" ? "light" : "dark";

            setTheme(newTheme);

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

    // Proceed only when all navigation elements exist.
    if (mobileMenuToggle && siteHeader && primaryNavigation) {

        /* =====================================
           MENU STATE
        ===================================== */

        function setMenuOpen(isOpen) {

            // Update header styling.
            siteHeader.classList.toggle("menu-open", isOpen);

            // Update accessibility state.
            mobileMenuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            // Update button description.
            mobileMenuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

            mobileMenuToggle.setAttribute(
                "title",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );

        }


        /* =====================================
           TOGGLE MENU ON BUTTON CLICK
        ===================================== */

        mobileMenuToggle.addEventListener("click", () => {

            const isOpen = siteHeader.classList.contains(
                "menu-open"
            );

            setMenuOpen(!isOpen);

        });


        /* =====================================
           CLOSE MENU AFTER NAVIGATION
        ===================================== */

        const navigationLinks = primaryNavigation.querySelectorAll(
            "a"
        );

        navigationLinks.forEach((link) => {

            link.addEventListener("click", () => {

                setMenuOpen(false);

            });

        });


        /* =====================================
           CLOSE MENU WHEN CLICKING OUTSIDE
        ===================================== */

        document.addEventListener("click", (event) => {

            const isOpen = siteHeader.classList.contains(
                "menu-open"
            );

            const clickedOutsideHeader = !siteHeader.contains(
                event.target
            );

            if (isOpen && clickedOutsideHeader) {

                setMenuOpen(false);

            }

        });


        /* =====================================
           CLOSE MENU WITH ESCAPE KEY
        ===================================== */

        document.addEventListener("keydown", (event) => {

            const isOpen = siteHeader.classList.contains(
                "menu-open"
            );

            if (event.key === "Escape" && isOpen) {

                setMenuOpen(false);

                // Return keyboard focus to the menu button.
                mobileMenuToggle.focus();

            }

        });


        /* =====================================
           RESET MENU ON DESKTOP RESIZE
        ===================================== */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 850) {

                setMenuOpen(false);

            }

        });

    }

});