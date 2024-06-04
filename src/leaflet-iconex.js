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
            iconSize: [32, 40],
            iconAnchor: [16, 40],
            popupAnchor: [0, -24],
            iconFill: "#0d6efd",
            iconOpacity: 1,
            iconStroke: "#ffffff",
            iconStrokeOpacity: .5,

            htmlBack: `
<svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
	<circle stroke-width="0" cx="16" cy="16" r="13" />
</svg>`,
            backSize: [32, 40],
            backAnchor: [0, 0],
            backFill: "#ffffff",
            backOpacity: 1,

            contentSize: null,
            contentAnchor: [16, 16],
        },

        initialize: function (options) {
            L.Util.setOptions(this, options);

            const iconStyles = [];
            iconStyles.push(`position: absolute`);
            if (this.options.iconSize) iconStyles.push(`width: ${this.options.iconSize[0]}px; height: ${this.options.iconSize[1]}px`);
            if (this.options.iconFill) iconStyles.push(`fill: ${this.options.iconFill}`);
            if (this.options.iconOpacity) iconStyles.push(`opacity: ${this.options.iconOpacity}`);
            if (this.options.iconStroke) iconStyles.push(`stroke: ${this.options.iconStroke}`);
            if (this.options.iconStrokeOpacity) iconStyles.push(`stroke-opacity: ${this.options.iconStrokeOpacity}`);

            const backStyles = [];
            backStyles.push(`position: absolute`);
            if (this.options.backSize) backStyles.push(`width: ${this.options.backSize[0]}px; height: ${this.options.backSize[1]}px`);
            if (this.options.backAnchor) backStyles.push(`left: ${this.options.backAnchor[0]}px; top: ${this.options.backAnchor[1]}px`);
            if (this.options.backFill) backStyles.push(`fill: ${this.options.backFill}`);
            if (this.options.backOpacity) backStyles.push(`opacity: ${this.options.backOpacity}`);

            const contentStyles = [];
            contentStyles.push(`position: absolute`);
            if (this.options.contentAnchor) contentStyles.push(`left: ${this.options.contentAnchor[0]}px; top: ${this.options.contentAnchor[1]}px`);
            contentStyles.push(`transform: translate(-50%, -50%)`);

            const spanStyles = [];
            spanStyles.push("display: flex");
            spanStyles.push("align-items: center");
            spanStyles.push("justify-content: center");
            if (this.options.contentSize) spanStyles.push(`width: ${this.options.contentSize[0]}px; height: ${this.options.contentSize[1]}px`);

            const divs = [];
            divs.push(`<div style="${iconStyles.join("; ")};">${this.options.htmlIcon}</div>`);
            divs.push(`<div style="${backStyles.join("; ")};">${this.options.htmlBack}</div>`);
            divs.push(`<div style="${contentStyles.join("; ")};"><span style="${spanStyles.join("; ")}">${this.options.htmlContent}</span></div>`);

            this.options.html = `<div class="leaflet-iconex position-relative">${divs.join("")}</div>`;
        },
    });

    return icon;
});