chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.type) {
        case "colors-div":
            var divs = document.querySelectorAll("div");
            if (divs.length === 0) {
                alert("There are no any divs in the page.");
            } else {
                for (var i = 0; i < divs.length; i++) {
                    divs[i].style.backgroundColor = message.color;
                }
            }
            break;
        case "clear-body-style":
            // $("body").removeAttr("style");
            // var childsDiv = $("body>div");
            // for (var i = 0; i < childsDiv.length; i++) {
            //     $(childsDiv[i]).removeAttr("style");
            // }
            var location = window.parent.location.host;
            if (location.indexOf('pantip') >= 0) {
                var $head = $("head");
                var $headlinklast = $head.find("link[rel='stylesheet']:last");
                var linkElement = 
                '<link type="text/css" rel="stylesheet" href="/css/version/1473668260/style.css">';
                if ($headlinklast.length) {
                    $headlinklast.after(linkElement);
                } else {
                    $head.append(linkElement);
                }
            }

            break;
    }
});
