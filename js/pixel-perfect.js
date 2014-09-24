var PixelPerfect = function(path,bpMobile,bpTablet,template, ext)
{
    this.path       = path      == undefined ? "/pixel-perfect-layers"                    : path;     //path for screenshots
    this.bpMobile   = bpMobile  == undefined ? 767                                          : bpMobile; //breakpoint for mobile devices
    this.bpTablet   = bpTablet  == undefined ? 1023                                         : bpTablet; //breakpoint for tablets
    this.template   = template  == undefined ? "/vendor/pixel-perfect/template.html"      : template; //the html template to inject
    this.ext        = ext       == undefined ? ".jpg"                                        : ext;      //extension of image layers

    //Get background images
    var imagePath  = this.path+window.location.pathname.replace(/\.[^/.]+$/, "");
    this.bg         = doesFileExist(imagePath+this.ext)             ? imagePath+this.ext            : "";
    this.bgMobile   = doesFileExist(imagePath+"-mobile"+this.ext)   ? imagePath+"-mobile"+this.ext  : "";
    this.bgTablet   = doesFileExist(imagePath+"-tablet"+this.ext)   ? imagePath+"-tablet"+this.ext  : "";

    //DOM elements
    this.wrapperId      = "pixel-perfect-wrapper";
    this.templateId     = "pixel_perfect_template";
    this.wrapper        = null;
    this.containerClass = "pixel-perfect-container";
    this.container      = null;

    this.init();
};

PixelPerfect.prototype.init = function()
{
    var me = this;

    //append responsive mask container to body
    $("body").prepend("<div id='"+this.wrapperId+"'></div>");

    me.wrapper = $("#"+this.wrapperId);

    //Load template inside this container
    me.wrapper.load(this.template, {},function() {

        //pass object to template to replace tokens
        $(this).html(tmpl(me.templateId, me));

        me.container = $("."+me.containerClass);

        //enable click action to show/hide responsive mask
        me.wrapper.find("button").click(function() {
            val = $(this).data("value");
            if(val == "kill") {
                me.wrapper.remove();
            } else {
                me.container.css("opacity",$(this).data("value"));
            }
            //TODO save visibility to cookies ?
        });

        //enable moving of layer with arrows
        document.onkeydown = function(e) {
            if(e.shiftKey) {
                switch (e.keyCode) {
                    case 37: me.moveLayer("left");break;
                    case 38: me.moveLayer("up");break;
                    case 39: me.moveLayer("right");break;
                    case 40: me.moveLayer("down");break;
                }
            }
        };
    });
};

PixelPerfect.prototype.moveLayer = function(direction) {
    var me = this;
    var property = "";
    switch(direction) {
        case "up" :    property = "top";break;
        case "down" :   property = "top";break;
        case "left" :   property = "left";break;
        case "right" :  property = "left";break;
    }
    var t = me.container.css(property).replace("px","");
    if(t == "auto") {
        var value = 0;
    } else {
        var value = parseInt(me.container.css(property).replace("px",""));
    }
    switch(direction) {
        case "up" :    me.container.css(property, value-1);break;
        case "down" :   me.container.css(property, value+1);break;
        case "left" :   me.container.css(property, value-1);break;
        case "right" :  me.container.css(property, value+1);break;
    }
    //TODO save position to cookies ?
}



/**
 *
 * @param urlToFile
 * @returns {boolean}
 */
function doesFileExist(urlToFile)
{
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}


// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
    var cache = {};

    this.tmpl = function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                    str
                        .replace(/[\r\t\n]/g, " ")
                        .split("<%").join("\t")
                        .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                        .replace(/\t=(.*?)%>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'")
                    + "');}return p.join('');");

        // Provide some basic currying to the user
        return data ? fn( data ) : fn;
    };
})();

