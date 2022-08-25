// Temporary

/**
 * Get Current cursor position from any events types
 *
 * @see StackOverflow 😛     https://stackoverflow.com/a/61732450/10858781
 */
function getCurrentCursorPosition(e) {
    let x;
    let y;

    if (
        e.type === "touchstart" ||
        e.type === "touchmove" ||
        e.type === "touchend" ||
        e.type === "touchcancel"
    ) {
        const evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
        const touch = evt.touches[0] || evt.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;
    } else if (
        e.type === "mousedown" ||
        e.type === "mouseup" ||
        e.type === "mousemove" ||
        e.type === "mouseover" ||
        e.type === "mouseout" ||
        e.type === "mouseenter" ||
        e.type === "mouseleave"
    ) {
        x = e.clientX;
        y = e.clientY;
    }

    return { x, y };
}

/**
 * Get if the current device is touch supported.
 *
 * @see StackOverflow 😛    https://stackoverflow.com/a/34146257/10858781
 */
function getIsTouchSupported() {
    return (
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch) ||
        navigator.maxTouchPoints > 0 ||
        window.navigator.msMaxTouchPoints > 0
    );
}

/**
 * Wrap the target element with a div deeply.
 */
function wrapAll(target, wrapper = document.createElement("div")) {
    [...target.childNodes].forEach(child => wrapper.appendChild(child));
    target.appendChild(wrapper);

    return wrapper;
}

/**
 * Create an element with its class.
 */
function createElement(classname) {
    const element = document.createElement("div");
    element.classList.add(classname);

    return element;
}


function $q(selector, scope = document) {
    return scope.querySelector(selector);
}

function $id(selector, scope = document) {
    return scope.getElementById(selector);
}

function $$q(selector, scope = document) {
    return Array.from(scope.querySelectorAll(selector));
}

function listen(type, selector, callback) {
    document.addEventListener(type, event => {
        const target = event.target.closest(selector);

        if (target) {
            callback(event, target);
        }
    });
}

function localScroll(callback) {
    window.addEventListener(
        "scroll",
        callback,
        passiveIsSupported ? { passive: true } : false,
    );
}

/**
 * See if passive is supported by the browsers to improve the performance.
 *
 * @see MDN 😍    https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 */
function passiveIsSupported() {
    let isPassiveSupported = false;

    try {
        const options = {
            get passive() {
                isPassiveSupported = true;
                return false;
            },
        };

        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
    } catch (error) {
        isPassiveSupported = false;
    }

    return isPassiveSupported;
}

function getNodeObj(selector, querySelector = $q) {
    return { selector, node: querySelector(selector) };
}

const FOCUSABLE_ELEMENTS_QUERY = [
    "a[href]",
    "area[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "details",
    "summary",
    "iframe",
    "object",
    "embed",
    "[contenteditable]",
].join(",");

function focusOnFirstElement(elm) {
    const focusable = elm.querySelectorAll(FOCUSABLE_ELEMENTS_QUERY);
    const firstFocusable = focusable[0];
    window.setTimeout(() => firstFocusable.focus());
}

function trapFocus(elm, event) {
    let focusableNodes = elm.querySelectorAll(FOCUSABLE_ELEMENTS_QUERY);

    // no focusable nodes
    if (focusableNodes.length === 0) return;

    /**
     * Filters nodes which are hidden to prevent
     * focus leak outside modal
     */
    focusableNodes = [...focusableNodes].filter(node => {
        return node.offsetParent !== null;
    });

    // if disableFocus is true
    if (!elm.contains(document.activeElement)) {
        focusableNodes[0].focus();
    } else {
        const focusedItemIndex = focusableNodes.indexOf(document.activeElement);

        if (event.shiftKey && focusedItemIndex === 0) {
            focusableNodes[focusableNodes.length - 1].focus();
            event.preventDefault();
        }

        if (!event.shiftKey &&
            focusableNodes.length > 0 &&
            focusedItemIndex === focusableNodes.length - 1
        ) {
            focusableNodes[0].focus();
            event.preventDefault();
        }
    }
}


// Transition Enter / Transition Leave Animation
// https://sebastiandedeyne.com/javascript-framework-diet/enter-leave-transitions/
function nextFrame() {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            requestAnimationFrame(resolve);
        });
    });
}

function afterTransition(element) {
    return new Promise(resolve => {
        const duration =
            Number(getComputedStyle(element).transitionDuration.replace("s", "")) *
            1000;

        setTimeout(() => {
            resolve();
        }, duration);
    });
}

const enter = async(element, transition) => {
    element.classList.remove("hidden");

    element.classList.add(`${transition}-enter`);
    element.classList.add(`${transition}-enter-start`);

    await nextFrame();

    element.classList.remove(`${transition}-enter-start`);
    element.classList.add(`${transition}-enter-end`);

    await afterTransition(element);

    element.classList.remove(`${transition}-enter-end`);
    element.classList.remove(`${transition}-enter`);
};

async function leave(element, transition) {
    element.classList.add(`${transition}-leave`);
    element.classList.add(`${transition}-leave-start`);

    await nextFrame();

    element.classList.remove(`${transition}-leave-start`);
    element.classList.add(`${transition}-leave-end`);

    await afterTransition(element);

    element.classList.remove(`${transition}-leave-end`);
    element.classList.remove(`${transition}-leave`);
    element.classList.add("hidden");
}




// https://github.com/avdeev/vanilla-sharing

const SIZE = 570;
const LEFT = (window.screen.width - SIZE) / 2;
const TOP = (window.screen.height - SIZE) / 2;
const WIN_PARAMS = `scrollbars=0, resizable=1, menubar=0, left=${LEFT}, top=${TOP}, width=${SIZE}, height=${SIZE}, toolbar=0, status=0`;

function encodeParams(obj) {
    return Object.keys(obj)
        .filter(k => typeof obj[k] !== "undefined" && obj[k] !== "")
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
        .join("&");
}

function getEmailUrl(options = {}) {
    const { to, url, title, description, subject } = options;

    const params = encodeParams({
        subject,
        body: `${title || ""}\r\n${description || ""}\r\n${url || ""}`,
    });

    return `mailto:${to || ""}?${params}`;
}

function email(options = {}) {
    return window.open(getEmailUrl(options, "_blank"));
}

function getFbButtonUrl(options = {}) {
    const { url } = options;

    if (!url) {
        throw new Error("url is not defined");
    }

    const params = encodeParams({
        kid_directed_site: "0",
        sdk: "joey",
        u: url,
        display: "popup",
        ref: "plugin",
        src: "share_button",
    });

    return `https://www.facebook.com/sharer/sharer.php?${params}`;
}

function fbButton(options = {}) {
    return window.open(getFbButtonUrl(options), "_blank", WIN_PARAMS);
}

function getTwUrl(options = {}) {
    const { title, url, hashtags = [] } = options;

    const params = encodeParams({
        text: title,
        url,
        hashtags: hashtags.join(","),
    });

    return `https://twitter.com/intent/tweet?${params}`;
}

function tw(options = {}) {
    return window.open(getTwUrl(options), "_blank", WIN_PARAMS);
}

function linkedin(options = {}) {
    const { url } = options;

    const params = encodeParams({
        url,
    });
    return window.open(
        `https://www.linkedin.com/sharing/share-offsite/?${params}`,
        "_blank",
        WIN_PARAMS,
    );
}


function whatsapp(options = {}) {
    const { phone, title, url } = options;

    const params = encodeParams({
        text: [title, url].filter((item) => item).join(' '),
        phone,
    });

    return window.open(
        `https://api.whatsapp.com/send?${params}`,
        "_blank",
        WIN_PARAMS,
    );
}

function debounce(func, timeout = 300){
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}
