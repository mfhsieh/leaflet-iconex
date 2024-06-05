/* 
 * Leaflet ControlIconEx v0.1 - 2024-06-02
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

    if (typeof define === 'function' && define.amd) {
        // define an AMD module that relies on 'leaflet'
        define(['leaflet'], factory);

    } else if (typeof exports === 'object') {
        // define a Common JS module that relies on 'leaflet'
        module.exports = factory(require('leaflet'));

    } else if (typeof window !== 'undefined') {
        // attach your plugin to the global 'L' variable
        if (typeof window.L === "undefined") throw "Leaflet must be loaded first.";
        window.L.Control.IconEx = factory(window.L);
    }
})(function (L) {
    "use strict";

    const icon = L.DivIcon.extend({
        options: {
            htmlIcon: `
<svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
	<path stroke-width="1" d="M 16,0.5 C 7.4396,0.5 0.5,7.4396 0.5,16 C 0.5,19.9768 1.7958,23.3692 4.4470,26.3333 L 16,39.25 27.5530,26.3333 C 30.2042,23.3692 31.5,19.9768 31.5,16 31.5,7.4396 24.5604,0.5 16,0.5 Z" />
</svg>`,
            iconHtmlSize: [32, 40],
            iconHtmlAnchor: [16, 40],  // the coordinates of the "tip" of the icon (relative to its top left corner)
            popupHtmlAnchor: [0, -24],  // the coordinates of the point from which popups will "open", relative to the icon anchor.
            iconScale: 1,
            iconFill: "#0d6efd",
            iconOpacity: 1,
            iconStroke: "#ffffff",
            iconStrokeOpacity: .5,

            htmlBack: `
<svg width="26" height="26" viewBox="-13 -13 26 26" xmlns="http://www.w3.org/2000/svg">
	<circle stroke-width="0" r="13" />
</svg>`,
            backHtmlSize: [26, 26],
            backHtmlAnchor: [16, 16],  // the center point of the background layer, relative to the upper left point of the icon
            backFill: "#ffffff",
            backOpacity: 1,

            contentAnchor: [16, 16],  // the center point of the content layer, relative to the upper left point of the icon
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);

            const iconScale = this.options.iconScale ? this.options.iconScale : 1;

            if (this.options.iconHtmlSize) this.options.iconSize = [this.options.iconHtmlSize[0] * iconScale, this.options.iconHtmlSize[1] * iconScale];
            if (this.options.iconHtmlAnchor) this.options.iconAnchor = [this.options.iconHtmlAnchor[0] * iconScale, this.options.iconHtmlAnchor[1] * iconScale];
            if (this.options.popupHtmlAnchor) this.options.popupAnchor = [this.options.popupHtmlAnchor[0] * iconScale, this.options.popupHtmlAnchor[1] * iconScale];

            const iconStyles = [];
            iconStyles.push(`position: absolute`);
            if (this.options.iconHtmlSize) iconStyles.push(`width: ${this.options.iconHtmlSize[0]}px; height: ${this.options.iconHtmlSize[1]}px`);
            if (this.options.iconFill) iconStyles.push(`fill: ${this.options.iconFill}`);
            if (this.options.iconOpacity) iconStyles.push(`opacity: ${this.options.iconOpacity}`);
            if (this.options.iconStroke) iconStyles.push(`stroke: ${this.options.iconStroke}`);
            if (this.options.iconStrokeOpacity) iconStyles.push(`stroke-opacity: ${this.options.iconStrokeOpacity}`);
            iconStyles.push(`transform: translate(-50%, -50%) scale(${iconScale}) translate(${this.options.iconHtmlSize[0] / 2}px, ${this.options.iconHtmlSize[1] / 2}px)`);

            const backStyles = [];
            backStyles.push(`position: absolute`);
            if (this.options.backHtmlSize) backStyles.push(`width: ${this.options.backHtmlSize[0]}px; height: ${this.options.backHtmlSize[1]}px`);
            if (this.options.backHtmlAnchor) backStyles.push(`left: ${this.options.backHtmlAnchor[0] * iconScale}px; top: ${this.options.backHtmlAnchor[1] * iconScale}px`);
            if (this.options.backFill) backStyles.push(`fill: ${this.options.backFill}`);
            if (this.options.backOpacity) backStyles.push(`opacity: ${this.options.backOpacity}`);
            backStyles.push(`transform: translate(-50%, -50%) scale(${iconScale})`);

            const contentStyles = [];
            contentStyles.push(`position: absolute`);
            if (this.options.contentAnchor) contentStyles.push(`left: ${this.options.contentAnchor[0] * iconScale}px; top: ${this.options.contentAnchor[1] * iconScale}px`);
            contentStyles.push("display: flex");
            contentStyles.push("align-items: center");
            contentStyles.push("justify-content: center");
            contentStyles.push(`transform: translate(-50%, -50%) scale(${iconScale})  translate(${this.options.contentAnchor[0]}px, ${this.options.contentAnchor[1]}px)`);
            contentStyles.push(`transform: translate(-50%, -50%) scale(${iconScale})`);

            const spanStyles = [];
            spanStyles.push("text-align: center");
            spanStyles.push("line-height: 1");

            const htmlStyles = [];
            htmlStyles.push(`position: relative`);

            const divs = [];
            divs.push(`<div style="${iconStyles.join("; ")};">${this.options.htmlIcon}</div>`);
            divs.push(`<div style="${backStyles.join("; ")};">${this.options.htmlBack}</div>`);
            divs.push(`<div style="${contentStyles.join("; ")};"><span style="${spanStyles.join("; ")}">${this.options.htmlContent}</span></div>`);

            this.options.html = `<div class="leaflet-iconex" style="${htmlStyles.join("; ")};">${divs.join("")}</div>`;
        },
    });

    return icon;
});