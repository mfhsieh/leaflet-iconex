Leaflet.IconEx
=

A Leaflet plugin that creates a DivIcon with three customizable layers (as shown in the image). Tested on desktop and mobile versions of Chrome, Edge, Firefox, and Safari.

* Demo Page: [demo](https://mfhsieh.github.io/leaflet-iconex/) (Randomly combined icons.)
* Current Version: v1.0.0

<p align="center">
  <img src="https://github.com/mfhsieh/leaflet-iconex/blob/main/images/icon_exploded_view.svg" title="exploed icon" alt="exploed icon" />
</p>


# Usage

Simply include the [JS](https://github.com/mfhsieh/leaflet-iconex/blob/main/src/leaflet-iconex.js) and [CSS](https://github.com/mfhsieh/leaflet-iconex/blob/main/examples/demo.css) in the head.

```
<head>
    ...
    <script src="leaflet-iconex.js"></script>
    <link rel="stylesheet" href="demo.css" />
    ...
</head>
```

And add the control to the map.

```
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


| Option               | Type   | Default                                                                                     | Description                                                                                   |
| -------------------- | ------ | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| iconScale            | Nymber | 1                                                                                           | The scale factor of the icon                                                                  |
| iconHtml             | String | [icon_round.svg](https://github.com/mfhsieh/leaflet-iconex/blob/main/images/icon_round.svg) | The HTML content of the icon layer.                                                           |
| iconHtmlSize         | Point  |                                                                                             | The size of the icon layer in pixels.                                                         |
| iconHtmlAnchor       | Point  |                                                                                             | The coordinates of the "tip" of the icon layer. (relative to its top left corner)             |
| iconHtmlPopupAnchor  | Point  |                                                                                             | The coordinates of the point from which popups will open, relative to the anchor.             |
| iconFill             | String |                                                                                             | The fill color of the icon layer.                                                             |
| iconOpacity          | Number |                                                                                             | The opacity of the icon layer.                                                                |
| iconStroke           | String |                                                                                             | The stroke color of the icon layer.                                                           |
| iconStrokeOpacity    | Number |                                                                                             | The stroke opacity of the icon layer.                                                         |
| backgroundHtml       | String | [icon_round.svg](https://github.com/mfhsieh/leaflet-iconex/blob/main/images/icon_round.svg) | The HTML content of the background layer.                                                     |
| backgroundHtmlSize   | Point  |                                                                                             | The size of the background layer in pixels.                                                   |
| backgroundHtmlAnchor | Point  |                                                                                             | The center point of the background layer, relative to the upper left point of the icon layer. |
| backgroundFill       | String |                                                                                             | The fill color of the background layer.                                                       |
| backgroundOpacity    | Number |                                                                                             | The opacity of the background layer.                                                          |
| contentHtml          | String |                                                                                             | The HTML content of the content layer.                                                        |
| contentHtmlSize      | Point  |                                                                                             | The size of the content layer in pixels.                                                      |
| contentHtmlAnchor    | Point  |                                                                                             | The center point of the content layer, relative to the upper left point of the icon layer.    |
| contentColor         | String |                                                                                             | The color of the content layer.                                                               |
| contentFontSize      | Number | 18                                                                                          | The font size (in pixels) of the content layer.                                               |


# Where

* Source Code: [Github](https://github.com/mfhsieh/leaflet-iconex)


# Author

* email: mfhsieh at gmail.com
* Github: [Github](https://github.com/mfhsieh/)
