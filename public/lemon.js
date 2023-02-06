(function () {
    const LemonSqueezy = function () {
        let eventHandler = () => {};

        /**
         * Initial setup, should be called on page load
         */
        // eslint-disable-next-line no-unused-vars
        function setup(options) {
            if (typeof options !== "object" || options === null) {
                throw new Error(
                    "Setup options provided must be of type object"
                );
            }

            // Disabling this temporarily
            // if (!options.clientKey) {
            //     throw new Error(
            //         'No clientKey provided to initialise. You can generate a Publishable Key at https://app.lemonsqueezy.com/settings/api'
            //     );
            // }

            if (options.eventHandler) {
                eventHandler = options.eventHandler;
            }
        }

        function dumbSetup() {
            listenForButtons();

            window.addEventListener(
                "message",
                function (event) {
                    if (typeof event.data === "object" && event.data !== null) {
                        const payload = event.data;

                        // Check if "event" exists in the payload, if it does then we know it's an LS event
                        if (payload.event !== null) {
                            globalEventHandler(payload);
                        }
                    }

                    // Primative events
                    if (event.data === "mounted") {
                        hideLoader();
                    }
                    if (event.data === "close") {
                        close();
                    }
                }.bind(this),
                false
            );
        }

        /**
         * Handles all incoming LS iframe events
         * @param payload
         */
        function globalEventHandler(payload) {
            if (eventHandler) {
                eventHandler(payload);
            }
        }

        /**
         * Refresh should be called in cases where a buy button may not have existed on initial load
         * Such as in an SPA, this can be called when a component is mounted.
         */
        function refresh() {
            listenForButtons();
        }

        /**
         * Adds event handlers to all lemonsqueezy buttons
         */
        function listenForButtons() {
            const buttons = document.querySelectorAll(".lemonsqueezy-button");
            buttons.forEach(
                function (button) {
                    if (button.addEventListener) {
                        button.addEventListener(
                            "click",
                            handleClick.bind(this)
                        );
                    } else if (button.attachEvent) {
                        button.attachEvent("onclick", handleClick.bind(this));
                    }
                }.bind(this)
            );
        }

        /**
         * Handles the click event for the LS buttons, creates an iframe
         */
        function handleClick(e) {
            e.preventDefault();
            if (document.body.classList.contains("lemonsqueezy-open")) {
                return;
            }
            document.body.classList.add("lemonsqueezy-open");
            const isDark = new URL(e.currentTarget.href).searchParams.get(
                "dark"
            );
            const url = buildUrl(e.currentTarget.href);
            openUrl(url, isDark);
        }

        function openUrl(url, isDark = false) {
            // TODO: Validate URL is an LS url
            showLoader(isDark);
            createIframe(url);
        }

        function buildUrl(url) {
            url = new URL(url);
            url.searchParams.set("embed", 1);
            return url.toString();
        }

        function createIframe(url) {
            removeIframe();
            this.iframe = document.createElement("iframe");
            this.iframe.style =
                "z-index: 2147483647;display: block;background-color: transparent;border: 0px none transparent;overflow-x: hidden;overflow-y: auto;visibility: visible;margin: 0px;padding: 0px;-webkit-tap-highlight-color: transparent;position: fixed;left: 0px;top: 0px;width: 100%;height: 100%;";
            this.iframe.src = url;
            document.body.appendChild(this.iframe);
        }

        function removeIframe() {
            if (this.iframe) {
                this.iframe.remove();
                delete this.iframe;
                document.body.classList.remove("lemonsqueezy-open");
            }
        }

        function close() {
            removeIframe();
        }

        function showLoader(isDark) {
            const keyFrameStyle = document.createElement("style");
            const keyFrames =
                "@keyframes pulse { 0% { opacity: 1; transform: scale(0.1); } 100% { opacity: 0; transform: scale(1); } }";
            keyFrameStyle.innerHTML = keyFrames;
            document.head.appendChild(keyFrameStyle);
            const htmlLoader = document.createElement("div");
            htmlLoader.setAttribute(
                "style",
                "z-index:99998; display: block; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: 0px; padding: 0px;" +
                    (isDark
                        ? "background: rgba(0,0,0,0.9);"
                        : "background: rgba(255,255,255,0.9);")
            );
            htmlLoader.setAttribute("class", "lemonsqueezy-loader");
            const mainSpinnerWrapper = document.createElement("main");
            mainSpinnerWrapper.setAttribute(
                "style",
                "display: flex;align-items: center;justify-content: center;flex-direction: column;width: 100%;height: 100%;"
            );
            const spinner = document.createElement("div");
            spinner.setAttribute(
                "style",
                "width: 40px;height: 40px;border-radius: 40px;animation: pulse 1s ease-out infinite forwards;" +
                    (isDark
                        ? "background-color: #FFC233;"
                        : "background-color: #7047EB;")
            );
            mainSpinnerWrapper.appendChild(spinner);
            htmlLoader.appendChild(mainSpinnerWrapper);
            document.body.appendChild(htmlLoader);
            document.body.classList.add("lemonsqueezy-loading");
        }

        function hideLoader() {
            document
                .querySelectorAll(".lemonsqueezy-loader")
                .forEach((el) => el.remove());
            document.body.classList.remove("lemonsqueezy-loading");
        }

        return {
            DumbSetup: dumbSetup,

            Setup: setup,
            Refresh: refresh,

            Loader: {
                Show: showLoader,
                Hide: hideLoader,
            },

            Url: {
                Open: openUrl,
                Close: close,
            },
        };
    };

    const global = window || global;

    global.createLemonSqueezy = function () {
        if (global.LemonSqueezy) {
            global.LemonSqueezy.Refresh();
        } else {
            global.LemonSqueezy = new LemonSqueezy();
            global.LemonSqueezy.DumbSetup();
        }
    };
    global.createLemonSqueezyCheckout = createLemonSqueezy;
    global.addEventListener
        ? global.addEventListener("load", global.createLemonSqueezy)
        : global.attachEvent &&
          global.attachEvent("onload", window.createLemonSqueezy);
})(document);
