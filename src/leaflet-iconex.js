/*
 * Leaflet.IconEx v1.1.0 - 2024-06-15
 *
 * Copyright 2024 mfhsieh
 * mfhsieh@gmail.com
 *
 * Licensed under the MIT license.
 *
 * Demos:
 * https://mfhsieh.github.io/leaflet-iconex/
 *
 * Source:
 * git@github.com:mfhsieh/leaflet-iconex.git
 *
 */
(function (factory) {

    if (typeof define === 'function' && define.amd) {  // eslint-disable-line no-undef
        // define an AMD module that relies on 'leaflet'
        define(['leaflet'], factory);  // eslint-disable-line no-undef

    } else if (typeof exports === 'object') {
        // define a Common JS module that relies on 'leaflet'
        module.exports = factory(require('leaflet'));  // eslint-disable-line no-undef

    } else if (typeof window !== 'undefined') {
        // attach your plugin to the global 'L' variable
        if (typeof window.L === "undefined") throw "Leaflet must be loaded first.";
        window.L.IconEx = factory(window.L);
    }
})(function (L) {
    "use strict";

    const IconEx = L.DivIcon.extend({
        options: {
            iconScale: 1,

            iconHtml: `
<svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
	<path stroke-width="1" d="M 16,0.5 C 7.4396,0.5 0.5,7.4396 0.5,16 C 0.5,19.9768 1.7958,23.3692 4.4470,26.3333 L 16,39.25 27.5530,26.3333 C 30.2042,23.3692 31.5,19.9768 31.5,16 31.5,7.4396 24.5604,0.5 16,0.5 Z" />
</svg>`,
            iconHtmlSize: [32, 40],
            iconHtmlAnchor: [16, 40],
            iconHtmlPopupAnchor: [0, -24],
            iconFill: "#0d6efd",
            iconOpacity: 1,
            iconStroke: "#ffffff",
            iconStrokeOpacity: 1,

            backgroundHtml: `
<svg width="24" height="24" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg">
	<circle stroke-width="0" r="12" />
</svg>`,
            backgroundHtmlSize: [24, 24],
            backgroundHtmlAnchor: [16, 16],
            backgroundFill: "#ffffff",
            backgroundOpacity: 1,

            contentHtml: "",
            contentHtmlSize: null,
            contentHtmlAnchor: [16, 16],
            contentColor: null,
            contentFontSize: 16,
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);

            const iconScale = this.options.iconScale ? this.options.iconScale : 1;
            const divs = [];

            if (this.options.iconHtmlSize)
                this.options.iconSize = [this.options.iconHtmlSize[0] * iconScale, this.options.iconHtmlSize[1] * iconScale];
            if (this.options.iconHtmlAnchor)
                this.options.iconAnchor = [this.options.iconHtmlAnchor[0] * iconScale, this.options.iconHtmlAnchor[1] * iconScale];
            if (this.options.iconHtmlPopupAnchor)
                this.options.popupAnchor = [this.options.iconHtmlPopupAnchor[0] * iconScale, this.options.iconHtmlPopupAnchor[1] * iconScale];

            if (this.options.iconHtml) {
                const iconStyles = [];
                iconStyles.push(`position: absolute`);
                if (this.options.iconHtmlSize)
                    iconStyles.push(`width: ${this.options.iconHtmlSize[0]}px; height: ${this.options.iconHtmlSize[1]}px`);
                if (this.options.iconFill)
                    iconStyles.push(`fill: ${this.options.iconFill}`);
                if (this.options.iconOpacity)
                    iconStyles.push(`opacity: ${this.options.iconOpacity}`);
                if (this.options.iconStroke)
                    iconStyles.push(`stroke: ${this.options.iconStroke}`);
                if (this.options.iconStrokeOpacity)
                    iconStyles.push(`stroke-opacity: ${this.options.iconStrokeOpacity}`);
                iconStyles.push(`transform: translate(-50%, -50%) scale(${iconScale}) translate(${this.options.iconHtmlSize[0] / 2}px, ${this.options.iconHtmlSize[1] / 2}px)`);

                divs.push(`<div style="${iconStyles.join("; ")};">${this.options.iconHtml}</div>`);
            }

            if (this.options.backgroundHtml) {
                const backgroundStyles = [];
                backgroundStyles.push(`position: absolute`);
                if (this.options.backgroundHtmlSize)
                    backgroundStyles.push(`width: ${this.options.backgroundHtmlSize[0]}px; height: ${this.options.backgroundHtmlSize[1]}px`);
                if (this.options.backgroundHtmlAnchor)
                    backgroundStyles.push(`left: ${this.options.backgroundHtmlAnchor[0] * iconScale}px; top: ${this.options.backgroundHtmlAnchor[1] * iconScale}px`);
                if (this.options.backgroundFill)
                    backgroundStyles.push(`fill: ${this.options.backgroundFill}`);
                if (this.options.backgroundOpacity)
                    backgroundStyles.push(`opacity: ${this.options.backgroundOpacity}`);
                backgroundStyles.push(`transform: translate(-50%, -50%) scale(${iconScale})`);

                divs.push(`<div style="${backgroundStyles.join("; ")};">${this.options.backgroundHtml}</div>`);
            }


            if (this.options.contentHtml) {
                const contentStyles = [];
                contentStyles.push(`position: absolute`);
                if (this.options.contentHtmlSize)
                    contentStyles.push(`width: ${this.options.contentHtmlSize[0]}px; height: ${this.options.contentHtmlSize[1]}px`);
                if (this.options.contentHtmlAnchor)
                    contentStyles.push(`left: ${this.options.contentHtmlAnchor[0] * iconScale}px; top: ${this.options.contentHtmlAnchor[1] * iconScale}px`);
                if (this.options.contentColor)
                    contentStyles.push(`color: ${this.options.contentColor}`);
                if (this.options.contentFontSize)
                    contentStyles.push(`font-size: ${this.options.contentFontSize}px`);
                contentStyles.push(`transform: translate(-50%, -50%) scale(${iconScale})`);
                contentStyles.push("display: flex");
                contentStyles.push("align-items: center");
                contentStyles.push("justify-content: center");
                contentStyles.push("text-align: center");

                divs.push(`<div style="${contentStyles.join("; ")};">${this.options.contentHtml}</div>`);
            }

            const divsStyles = [];
            divsStyles.push(`position: relative`);
            divsStyles.push(`line-height: 0`);

            this.options.html = `<div class="leaflet-iconex" style="${divsStyles.join("; ")};">${divs.join("")}</div>`;
        },
    });

    L.iconEx = function (options) {
        return new IconEx(options);
    };

    return IconEx;
});
