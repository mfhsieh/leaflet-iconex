Leaflet.IconEx
=

A Leaflet plugin that creates a DivIcon with three customizable layers (as shown in the image). Tested on desktop and mobile versions of Chrome, Edge, Firefox, and Safari.

* Demo Page: [demo](https://mfhsieh.github.io/leaflet-iconex/) (randomly combined icons)
* Current Version: v1.0.0

<p align="center">
  <img src="https://github.com/mfhsieh/leaflet-iconex/blob/main/images/icon_exploded_view.svg" title="exploed icon" alt="exploed icon" />
</p>


# Usage

Simply include the [JS](https://github.com/mfhsieh/leaflet-iconex/blob/main/dist/leaflet-iconex.min.js) and [CSS](https://github.com/mfhsieh/leaflet-iconex/blob/main/examples/demo.css) in the head.

```html
<head>
    ...
    <script src="dist/leaflet-iconex.min.js"></script>
    <link rel="stylesheet" href="demo.css" />
    ...
</head>
```

And add the control to the map.

```js
const icon = new L.Control.IconEx({
    contentHtml: `<i class="fas fa-house-user"></i>`,
    iconFill: "#00c",
    contentColor: "#00c",
});
L.marker(latlng, { icon: icon }).addTo(map);
```

For more examples, refer to this [demo](https://mfhsieh.github.io/leaflet-iconex/) (code: [index.html](https://github.com/mfhsieh/leaflet-iconex/blob/main/index.html), [demo.css](https://github.com/mfhsieh/leaflet-iconex/blob/main/examples/demo.css)).


# Options

The IconEx has three layers: the bottom is the icon layer, the middle is the background layer, and the top is the content layer.


| Option               | Type   | Default                                                                                              | Description                                                                                  |
| -------------------- | ------ | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| iconScale            | Number | 1                                                                                                    | the scale factor of the icon                                                                 |
| iconHtml             | String | refer to [icon_round.svg](https://github.com/mfhsieh/leaflet-iconex/blob/main/images/icon_round.svg) | the HTML content of the icon layer                                                           |
| iconHtmlSize         | Point  | [32, 40]                                                                                             | the size (in pixels) of the icon layer                                                       |
| iconHtmlAnchor       | Point  | [16, 40]                                                                                             | the coordinates of the "tip" of the icon layer (relative to its top left corner)             |
| iconHtmlPopupAnchor  | Point  | [0, -24]                                                                                             | The coordinates of the point from which popups will open (relative to the anchor)            |
| iconFill             | String | "#0d6efd"                                                                                            | the fill color of the icon layer                                                             |
| iconOpacity          | Number | 1                                                                                                    | the opacity of the icon layer                                                                |
| iconStroke           | String | "#ffffff"                                                                                            | the stroke color of the icon layer                                                           |
| iconStrokeOpacity    | Number | 1                                                                                                    | the stroke opacity of the icon layer                                                         |
| backgroundHtml       | String | refer to [icon_round.svg](https://github.com/mfhsieh/leaflet-iconex/blob/main/images/icon_round.svg) | the HTML content of the background layer                                                     |
| backgroundHtmlSize   | Point  | [24, 24]                                                                                             | the size (in pixels) of the background layer                                                 |
| backgroundHtmlAnchor | Point  | [16, 16]                                                                                             | the center point of the background layer (relative to the top left corner of the icon layer) |
| backgroundFill       | String | "#ffffff"                                                                                            | the fill color of the background layer                                                       |
| backgroundOpacity    | Number | 1                                                                                                    | the opacity of the background layer                                                          |
| contentHtml          | String | ""                                                                                                   | the HTML content of the content layer                                                        |
| contentHtmlSize      | Point  | null                                                                                                 | the size (in pixels) of the content layer                                                    |
| contentHtmlAnchor    | Point  | [16, 16]                                                                                             | the center point of the content layer (relative to the top left corner of the icon layer)    |
| contentColor         | String | null                                                                                                 | the color of the content layer                                                               |
| contentFontSize      | Number | 16                                                                                                   | the font size (in pixels) of the content layer                                               |


# Where

* Source Code: [Github](https://github.com/mfhsieh/leaflet-iconex)


# Author

* email: mfhsieh at gmail.com
* Github: [Github](https://github.com/mfhsieh/)
