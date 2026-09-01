/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", isOpen);

    });

}


/* =========================================
   CLOSE MOBILE MENU
========================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("section[id]");

const updateActiveLink = () => {

    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.nav-link[href="#${sectionId}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

};

window.addEventListener("scroll", updateActiveLink);


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


/* =========================================
   SIMPLE SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-grid, .skill-card, .project-card, .timeline-item, .contact-container"
);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.1
    }
);

revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =========================================
    COOKIE CONSENT
========================================= */

const COOKIE_CONSENT_KEY = "cookieConsent";

const getCookieConsent = () => {
    try {
        return localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch (e) {
        return null;
    }
};

const setCookieConsent = (value) => {
    try {
        localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch (e) {
        // localStorage not available
    }

    applyFontPreference();
};

// Apply (or un-apply) the Google Fonts stylesheet based on the stored consent
const applyFontPreference = () => {
    const fontLink = document.getElementById("googleFontsStylesheet");

    if (!fontLink) {
        return;
    }

    if (getCookieConsent() === "rejected") {
        fontLink.disabled = true;
    } else {
        fontLink.disabled = false;
    }
};

const showCookieBanner = () => {
    const banner = document.getElementById("cookieBanner");
    if (banner) {
        banner.classList.add("visible");
        banner.setAttribute("aria-hidden", "false");
    }
};

const hideCookieBanner = () => {
    const banner = document.getElementById("cookieBanner");
    if (banner) {
        banner.classList.remove("visible");
        banner.setAttribute("aria-hidden", "true");
    }
};

let lastFocusedElement = null;

const showCookieModal = () => {
    const overlay = document.getElementById("cookieModalOverlay");
    if (overlay) {
        // Remember the trigger so focus can be restored when the modal closes
        lastFocusedElement = document.activeElement;

        overlay.classList.add("visible");
        overlay.setAttribute("aria-hidden", "false");

        // Focus the modal for accessibility
        const modal = overlay.querySelector(".cookie-modal");
        if (modal) {
            modal.focus();
        }
    }
};

const hideCookieModal = () => {
    const overlay = document.getElementById("cookieModalOverlay");
    if (overlay) {
        overlay.classList.remove("visible");
        overlay.setAttribute("aria-hidden", "true");

        // Return focus to the element that opened the modal
        if (lastFocusedElement && document.contains(lastFocusedElement)) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }
};

// Initialize cookie consent
const initCookieConsent = () => {
    const consent = getCookieConsent();
    const toggleExternal = document.getElementById("toggleExternalResources");

    // Sync toggle with current consent state (read fresh so it always reflects the latest choice)
    const syncToggleWithConsent = () => {
        if (toggleExternal) {
            toggleExternal.checked = (getCookieConsent() === "accepted");
        }
    };

    // Apply any previously stored font preference as early as possible
    applyFontPreference();

    // Sync the settings toggle with the stored decision
    syncToggleWithConsent();

    // Only show banner if no decision has been made
    if (!consent) {
        // Small delay so the banner doesn't appear immediately on page load
        setTimeout(showCookieBanner, 1000);
    }

    // Accept button
    const acceptBtn = document.getElementById("cookieAccept");
    if (acceptBtn) {
        acceptBtn.addEventListener("click", () => {
            setCookieConsent("accepted");
            hideCookieBanner();
        });
    }

    // Reject button
    const rejectBtn = document.getElementById("cookieReject");
    if (rejectBtn) {
        rejectBtn.addEventListener("click", () => {
            setCookieConsent("rejected");
            hideCookieBanner();
        });
    }

    // Footer cookie settings button
    const footerSettingsBtn = document.getElementById("footerCookieSettings");
    if (footerSettingsBtn) {
        footerSettingsBtn.addEventListener("click", () => {
            syncToggleWithConsent();
            showCookieModal();
        });
    }

    // Cookie settings link in banner
    const cookieSettingsLink = document.getElementById("cookieSettingsLink");
    if (cookieSettingsLink) {
        cookieSettingsLink.addEventListener("click", (e) => {
            e.preventDefault();
            hideCookieBanner();
            syncToggleWithConsent();
            showCookieModal();
        });
    }

    // Modal accept all button
    const modalAcceptBtn = document.getElementById("cookieModalAccept");
    if (modalAcceptBtn) {
        modalAcceptBtn.addEventListener("click", () => {
            setCookieConsent("accepted");
            if (toggleExternal) {
                toggleExternal.checked = true;
            }
            hideCookieModal();
            hideCookieBanner();
        });
    }

    // Modal reject all button
    const modalRejectBtn = document.getElementById("cookieModalReject");
    if (modalRejectBtn) {
        modalRejectBtn.addEventListener("click", () => {
            setCookieConsent("rejected");
            if (toggleExternal) {
                toggleExternal.checked = false;
            }
            hideCookieModal();
            hideCookieBanner();
        });
    }

    // Toggle external resources change
    if (toggleExternal) {
        toggleExternal.addEventListener("change", () => {
            if (toggleExternal.checked) {
                setCookieConsent("accepted");
            } else {
                setCookieConsent("rejected");
            }
        });
    }

    // Close modal on overlay click
    const modalOverlay = document.getElementById("cookieModalOverlay");
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                hideCookieModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            const overlay = document.getElementById("cookieModalOverlay");
            if (overlay && overlay.classList.contains("visible")) {
                hideCookieModal();
            }
        }
    });
};

// Run on DOM ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCookieConsent);
} else {
    initCookieConsent();
}
