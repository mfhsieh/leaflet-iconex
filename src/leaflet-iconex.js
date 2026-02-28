/*
 * Leaflet.IconEx v1.1.2 - 2026-02-28
 *
 * Copyright 2026 mfhsieh
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
    if (typeof define === "function" && define.amd) {
        // AMD module
        define(["leaflet"], factory);

    } else if (typeof exports === "object") {
        // CommonJS module
        module.exports = factory(require("leaflet"));

    } else if (typeof window !== "undefined") {
        // Browser globals
        if (typeof window.L === "undefined") throw "Leaflet must be loaded first.";
        window.L.IconEx = factory(window.L);
    }
})(function (L) {
    "use strict";

    /**
     * @typedef {Object} IconExOptions
     * @description Configuration options for the IconEx plugin.
     * 
     * @property {number} [iconScale=1] - The scale factor for the entire icon.
     * 
     * @property {string} [iconHtml] - The SVG/HTML for the bottom (icon) layer.
     * @property {number[]} [iconHtmlSize=[32, 40]] - The [width, height] of the icon layer in pixels.
     * @property {number[]} [iconHtmlAnchor=[16, 40]] - The [x, y] anchor point for the icon layer (relative to top-left).
     * @property {number[]} [iconHtmlPopupAnchor=[0, -24]] - The [x, y] popup anchor point (relative to the icon anchor).
     * @property {string} [iconFill="#0d6efd"] - The CSS fill color for the icon layer.
     * @property {number} [iconOpacity=1] - The opacity (0 to 1) for the icon layer.
     * @property {string} [iconStroke="#ffffff"] - The CSS stroke color for the icon layer.
     * @property {number} [iconStrokeOpacity=1] - The stroke opacity (0 to 1) for the icon layer.
     * 
     * @property {string} [backgroundHtml] - The SVG/HTML for the middle (background) layer.
     * @property {number[]} [backgroundHtmlSize=[24, 24]] - The [width, height] of the background layer in pixels.
     * @property {number[]} [backgroundHtmlAnchor=[16, 16]] - The [x, y] center point for the background layer.
     * @property {string} [backgroundFill="#ffffff"] - The CSS fill color for the background layer.
     * @property {number} [backgroundOpacity=1] - The opacity (0 to 1) for the background layer.
     * 
     * @property {string} [contentHtml=""] - The SVG/HTML for the top (content) layer.
     * @property {number[]} [contentHtmlSize=null] - The [width, height] of the content layer in pixels. If null, uses the background size.
     * @property {number[]} [contentHtmlAnchor=[16, 16]] - The [x, y] center point for the content layer.
     * @property {string} [contentColor=null] - The CSS text/fill color for the content layer.
     * @property {number|string} [contentFontSize=16] - The font size for the content layer. Supports number (px) or string (e.g., "1.2rem").
     */

    /**
     * @class IconEx
     * @extends L.DivIcon
     * @classdesc A Leaflet plugin that extends L.DivIcon to create custom icons with SVG and HTML content.
     * @param {IconExOptions} [options] - Configuration options for the icon.
     */
    const IconEx = L.DivIcon.extend({
        /**
         * @type {IconExOptions}
         * @description Default options for the icon.
         */
        options: {
            iconScale: 1,

            iconHtml: `
<svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
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
<svg width="24" height="24" viewBox="-12 -12 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
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

        /**
         * @function initialize
         * @memberof IconEx.prototype
         * @description Processes and applies the provided options to the icon instance, calculating dimensions and generating final HTML.
         * @param {IconExOptions} options - The merged configuration options.
         */
        initialize: function (options) {
            L.Util.setOptions(this, options);

            const iconScale = this.options.iconScale ?? 1;
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
                if (this.options.contentFontSize) {
                    const fontSize = this.options.contentFontSize;
                    const fontSizeWithUnit = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
                    contentStyles.push(`font-size: ${fontSizeWithUnit}`);
                }
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

    /**
     * @function iconEx
     * @memberof L
     * @description Creates a new IconEx instance.
     * @param {IconExOptions} [options] - Configuration options for the icon.
     * @returns {IconEx} A new IconEx instance.
     */
    L.iconEx = function (options) {
        return new IconEx(options);
    };

    return IconEx;
});
