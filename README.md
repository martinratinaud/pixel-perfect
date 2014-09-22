#MAIN PURPOSE
A small utility that helps you overlay a jpg design on top of your html pages to ease HTML integration. It supports different size of images in case of a responsive integration.

##Requirements
This script works with jquery, so include it too !

##INSTALLATION
#####1. Include script in your html layout
```html
<script type="text/javascript" src="/vendor/pixel-perfect/js/pixel-perfect.js"></script>
```
#####2. Init script
```javascript
$(function() {
    //init pixel perfect
    var pixelPerfect = new PixelPerfect();
});
```
#####3. Create directory
PUT your design in your web directory in a new directory named ```pixel-perfect-layers```
```
mkdir web/pixel-perfect-layers
```

*Those design should be jpg images exactly named with   the route of your html file*

Exemple: for a file named ```/pages/index.html```, you   should create three jpg files named
* ```/pixel-perfect-layers/pages/index.jpg```
* ```/pixel-perfect-layers/pages/index-tablet.jpg```
* ```/pixel-perfect-layers/pages/index-mobile.jpg```

#####4. RELOAD
Once you are all set, reload the page and you will notice a tiny square on top left of your page in order to toggle the opacity fo the layer
#####5. Contribute !
#####6. <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MBGZL9LTRPMWJ" target="_blank">Or buy me a beer :-)</a>


#PRO TIPS
If you do not want to use the built in parameters, you can pass your own directly through constructor

```javascript
var PixelPerfect = function(path,bpMobile,bpTablet,template, ext);
    path       "/pixel-perfect-layers"                //path for screenshots
    bpMobile   767                                    //breakpoint for mobile devices
    bpTablet   1023                                   //breakpoint for tablets
    template   "/vendor/pixel-perfect/template.html"  //the html template to inject
    ext        ".jpg"                                 //extension of image layers
```

You can also move the layer using ```Shift+Arrow``` keys


And finally, you should use bower to install this script

```
bower install pixel-perfect
```

#TODOS
Refactor
Add more control over layout
Add example file


#CREDITS
http://ejohn.org/blog/javascript-micro-templating/ thanks for the micro templating engine