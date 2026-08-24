/* =========================================================
   SUHITA ROY - PORTFOLIO JAVASCRIPT
   =========================================================

   FEATURES INCLUDED:

   1. Dark / Light mode
   2. Mobile navigation menu
   3. Smooth navigation
   4. Active navigation link while scrolling
   5. Scroll reveal animations
   6. Skill progress bar animations
   7. Scroll progress bar
   8. Formspree contact form
   9. Button loading / success / error states

   ========================================================= */


/* =========================================================
   1. SELECT IMPORTANT HTML ELEMENTS
   ========================================================= */


/*
 * Get the main body element.
 */
const body = document.body;


/*
 * Get the theme toggle button.
 */
const themeToggle =
    document.getElementById("themeToggle");


/*
 * Get the mobile menu button.
 */
const menuBtn =
    document.getElementById("menuBtn");


/*
 * Get the navigation menu.
 */
const navLinks =
    document.getElementById("navLinks");


/*
 * Get all navigation links.
 */
const navigationLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


/*
 * Get all portfolio sections.
 */
const sections =
    document.querySelectorAll(
        "section[id]"
    );


/*
 * Get the scroll progress bar.
 */
const scrollProgress =
    document.getElementById(
        "scrollProgress"
    );


/*
 * Get the contact form.
 */
const contactForm =
    document.getElementById(
        "contactForm"
    );



/* =========================================================
   2. DARK MODE / LIGHT MODE
   ========================================================= */


/*
 * Check whether the visitor has previously
 * selected a theme.
 *
 * localStorage allows the website to remember
 * the visitor's preference even after refreshing.
 */
const savedTheme =
    localStorage.getItem("theme");


/*
 * If the visitor previously selected light mode,
 * activate light mode.
 */
if (savedTheme === "light") {

    body.classList.add(
        "light-mode"
    );

}


/*
 * Update the icon inside the theme button.
 */
function updateThemeIcon() {

    /*
     * Make sure the button exists.
     */
    if (!themeToggle) return;


    /*
     * Check whether light mode is currently active.
     */
    const isLightMode =
        body.classList.contains(
            "light-mode"
        );


    /*
     * Change the icon.
     *
     * Light mode -> moon
     * Dark mode  -> sun
     */
    themeToggle.textContent =
        isLightMode
            ? "🌙"
            : "☀️";


    /*
     * Update accessibility information.
     */
    themeToggle.setAttribute(
        "aria-label",
        isLightMode
            ? "Switch to dark mode"
            : "Switch to light mode"
    );

}


/*
 * Set the correct icon when
 * the website first loads.
 */
updateThemeIcon();


/*
 * Listen for theme button clicks.
 */
if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            /*
             * Toggle the light-mode class.
             */
            body.classList.toggle(
                "light-mode"
            );


            /*
             * Check the current mode.
             */
            const isLightMode =
                body.classList.contains(
                    "light-mode"
                );


            /*
             * Save the visitor's choice.
             */
            localStorage.setItem(
                "theme",
                isLightMode
                    ? "light"
                    : "dark"
            );


            /*
             * Update the icon.
             */
            updateThemeIcon();

        }
    );

}



/* =========================================================
   3. MOBILE NAVIGATION
   ========================================================= */


/*
 * Open / close the mobile navigation menu.
 */
if (menuBtn && navLinks) {

    menuBtn.addEventListener(
        "click",
        () => {

            /*
             * Toggle the open class.
             */
            navLinks.classList.toggle(
                "open"
            );


            /*
             * Check whether menu is open.
             */
            const isOpen =
                navLinks.classList.contains(
                    "open"
                );


            /*
             * Change hamburger icon.
             */
            menuBtn.textContent =
                isOpen
                    ? "✕"
                    : "☰";


            /*
             * Accessibility state.
             */
            menuBtn.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );

}


/*
 * Close the mobile navigation
 * when a navigation link is clicked.
 */
navigationLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                /*
                 * Close menu.
                 */
                if (navLinks) {

                    navLinks.classList.remove(
                        "open"
                    );

                }


                /*
                 * Reset hamburger icon.
                 */
                if (menuBtn) {

                    menuBtn.textContent =
                        "☰";

                    menuBtn.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    }
);



/* =========================================================
   4. ACTIVE NAVIGATION LINK
   ========================================================= */


/*
 * This function checks which section
 * is currently visible on the screen.
 */
function updateActiveNavigation() {

    /*
     * Current scroll position.
     */
    const scrollPosition =
        window.scrollY + 150;


    /*
     * Check every section.
     */
    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            const sectionId =
                section.getAttribute(
                    "id"
                );


            /*
             * Check whether the current
             * scroll position is inside
             * this section.
             */
            if (
                scrollPosition >= sectionTop &&
                scrollPosition <
                    sectionTop + sectionHeight
            ) {

                /*
                 * Remove active state
                 * from all navigation links.
                 */
                navigationLinks.forEach(
                    (link) => {

                        link.classList.remove(
                            "active"
                        );

                    }
                );


                /*
                 * Find the navigation link
                 * belonging to this section.
                 */
                const activeLink =
                    document.querySelector(
                        `.nav-links a[href="#${sectionId}"]`
                    );


                /*
                 * Add active class.
                 */
                if (activeLink) {

                    activeLink.classList.add(
                        "active"
                    );

                }

            }

        }
    );

}


/*
 * Update navigation when scrolling.
 */
window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/*
 * Run once when the page loads.
 */
updateActiveNavigation();



/* =========================================================
   5. SCROLL REVEAL ANIMATION
   ========================================================= */


/*
 * Find every element with the
 * "reveal" class.
 */
const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


/*
 * IntersectionObserver watches
 * when elements enter the screen.
 */
const revealObserver =
    new IntersectionObserver(
        (
            entries,
            observer
        ) => {

            entries.forEach(
                (entry) => {

                    /*
                     * If the element is visible,
                     * add the "show" class.
                     */
                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );


                        /*
                         * Stop observing this
                         * element after it appears.
                         */
                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            /*
             * Start the animation when
             * approximately 12% is visible.
             */
            threshold: 0.12
        }
    );


/*
 * Start observing every reveal element.
 */
revealElements.forEach(
    (element) => {

        revealObserver.observe(
            element
        );

    }
);



/* =========================================================
   6. SKILL BAR ANIMATION
   ========================================================= */


/*
 * Select all skill progress bars.
 */
const skillBars =
    document.querySelectorAll(
        ".bar span"
    );


/*
 * Observer for skill bars.
 */
const skillObserver =
    new IntersectionObserver(
        (
            entries,
            observer
        ) => {

            entries.forEach(
                (entry) => {

                    /*
                     * Check if skill bar
                     * has entered the screen.
                     */
                    if (
                        entry.isIntersecting
                    ) {

                        /*
                         * Get the original
                         * width stored in
                         * the data-width attribute.
                         */
                        const width =
                            entry.target.dataset.width;


                        /*
                         * Apply the width.
                         */
                        if (width) {

                            entry.target.style.width =
                                width;

                        }


                        /*
                         * Stop observing after
                         * the animation starts.
                         */
                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },
        {
            threshold: 0.5
        }
    );


/*
 * Start observing each skill bar.
 */
skillBars.forEach(
    (bar) => {

        skillObserver.observe(
            bar
        );

    }
);



/* =========================================================
   7. SCROLL PROGRESS BAR
   ========================================================= */


/*
 * Update the progress bar as
 * the visitor scrolls.
 */
function updateScrollProgress() {

    /*
     * If the progress bar does not
     * exist, stop here.
     */
    if (!scrollProgress) return;


    /*
     * How far the visitor has scrolled.
     */
    const scrollTop =
        window.scrollY;


    /*
     * Total scrollable height.
     */
    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;


    /*
     * Convert scroll position into
     * a percentage.
     */
    let progress = 0;


    /*
     * Prevent division by zero.
     */
    if (documentHeight > 0) {

        progress =
            (scrollTop / documentHeight) *
            100;

    }


    /*
     * Update the width of the bar.
     */
    scrollProgress.style.width =
        `${progress}%`;

}


/*
 * Update progress while scrolling.
 */
window.addEventListener(
    "scroll",
    updateScrollProgress,
    {
        passive: true
    }
);


/*
 * Run once when the page loads.
 */
updateScrollProgress();



/* =========================================================
   8. FORMSPREE CONTACT FORM
   ========================================================= */


/*
 * Your Formspree endpoint is already
 * specified in index.html:
 *
 * https://formspree.io/f/xdenragq
 *
 * The JavaScript sends the form data
 * to that endpoint.
 */


/*
 * Check whether the contact form exists.
 */
if (contactForm) {

    /*
     * Listen for form submission.
     */
    contactForm.addEventListener(
        "submit",
        async (event) => {

            /*
             * Prevent the browser from
             * reloading the page.
             */
            event.preventDefault();


            /*
             * Find the submit button.
             */
            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            /*
             * If there is no submit button,
             * stop the function.
             */
            if (!submitButton) return;


            /*
             * Store the original text.
             */
            const originalText =
                submitButton.textContent;


            /*
             * Show sending state.
             */
            submitButton.textContent =
                "Sending...";


            /*
             * Prevent multiple clicks
             * while the request is running.
             */
            submitButton.disabled =
                true;


            /*
             * Remove previous states.
             */
            submitButton.classList.remove(
                "success",
                "error"
            );


            try {

                /*
                 * Collect all form fields.
                 *
                 * This includes:
                 *
                 * name
                 * email
                 * message
                 * _subject
                 */
                const formData =
                    new FormData(
                        contactForm
                    );


                /*
                 * Send the information to
                 * the Formspree endpoint.
                 */
                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body: formData,

                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                /*
                 * Check whether Formspree
                 * successfully accepted the form.
                 */
                if (response.ok) {

                    /*
                     * Change button appearance.
                     */
                    submitButton.classList.add(
                        "success"
                    );


                    /*
                     * Show success message.
                     */
                    submitButton.textContent =
                        "Message Sent ✓";


                    /*
                     * Clear all input fields.
                     */
                    contactForm.reset();


                    /*
                     * Return the button
                     * to its original state.
                     */
                    setTimeout(
                        () => {

                            submitButton.textContent =
                                originalText;

                            submitButton.disabled =
                                false;

                            submitButton.classList.remove(
                                "success"
                            );

                        },
                        3000
                    );

                }


                /*
                 * If Formspree returns an error.
                 */
                else {

                    throw new Error(
                        "Form submission failed."
                    );

                }

            }


            /*
             * Catch network or server errors.
             */
            catch (error) {

                /*
                 * Show the error in
                 * the browser console.
                 */
                console.error(
                    "Formspree error:",
                    error
                );


                /*
                 * Add error styling.
                 */
                submitButton.classList.add(
                    "error"
                );


                /*
                 * Tell the visitor to
                 * try again.
                 */
                submitButton.textContent =
                    "Try Again";


                /*
                 * Allow another submission.
                 */
                submitButton.disabled =
                    false;


                /*
                 * Return the button to
                 * its original state.
                 */
                setTimeout(
                    () => {

                        submitButton.textContent =
                            originalText;

                        submitButton.classList.remove(
                            "error"
                        );

                    },
                    3000
                );

            }

        }
    );

}



/* =========================================================
   9. CLOSE MOBILE MENU WITH ESCAPE KEY
   ========================================================= */


/*
 * Allow the visitor to press Escape
 * to close the mobile menu.
 */
document.addEventListener(
    "keydown",
    (event) => {

        /*
         * Check if Escape was pressed.
         */
        if (
            event.key === "Escape"
        ) {

            /*
             * Close navigation.
             */
            if (navLinks) {

                navLinks.classList.remove(
                    "open"
                );

            }


            /*
             * Reset menu button.
             */
            if (menuBtn) {

                menuBtn.textContent =
                    "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);



/* =========================================================
   10. HANDLE WINDOW RESIZE
   ========================================================= */


/*
 * If the browser is resized from
 * mobile to desktop, make sure the
 * mobile menu is closed.
 */
window.addEventListener(
    "resize",
    () => {

        /*
         * If the screen becomes wider
         * than 850px...
         */
        if (
            window.innerWidth > 850
        ) {

            /*
             * Close mobile menu.
             */
            if (navLinks) {

                navLinks.classList.remove(
                    "open"
                );

            }


            /*
             * Reset hamburger icon.
             */
            if (menuBtn) {

                menuBtn.textContent =
                    "☰";

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }

    }
);



/* =========================================================
   11. PAGE LOAD
   ========================================================= */


/*
 * Run important functions once
 * the page has completely loaded.
 */
window.addEventListener(
    "load",
    () => {

        /*
         * Update theme icon.
         */
        updateThemeIcon();


        /*
         * Update navigation.
         */
        updateActiveNavigation();


        /*
         * Update scroll progress.
         */
        updateScrollProgress();

    }
);