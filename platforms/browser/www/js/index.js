var NAV_HEIGHT = 65;
var HOME_PAGE = "http://wiki.kspu.kr.ua/index.php/%D0%90%D1%83%D0%B4%D0%B8%D1%82%D0%BE%D1%80%D1%96%D1%83%D0%BC";

var SAVED_LINKS = [];

function loading() {
    $("#loading").fadeIn().delay(1000).fadeOut();
}

function loading(str) {
    if (str == "stop") {
        $("#loading").stop();
        $("#loading").fadeOut();
    }
}

$(".menuPageLi").click(function () {

    $(this).animate({
        opacity: 0.7
    }, 200, function () {
        $(this).animate({
            opacity: 1
        }, 200)
    })

});

$(".nav_item").click(function () {
    console.log("nav_item clicked");


    $(this).animate({
        opacity: 0.7
    }, 100, function () {
        $(this).animate({
            opacity: 1
        }, 200)
    })

});

$(".sliItem").click(function () {

    $(this).animate({
        "background-color": "#c28804"
    }, 100, function () {
        $(this).animate({
            "background-color": "#f4c63f"
        }, 200)
    })

});


var isMenuPageShown = 1;
$("#nav_menu").click(function () {

    $("#savedLinks").fadeOut();

    if (isMenuPageShown) {
        $("#menuPage").fadeOut();
        isMenuPageShown = 0;
    } else {
        $("#menuPage").fadeIn();
        isMenuPageShown = 1;
    }
});

$("#nav_reload").click(function () {
    reloadCurrentPage()
});

$("#nav_back").click(function () {
    pageHistory("back");
});

$("#nav_forward").click(function () {
    pageHistory("forward");
});

$("#nav_favourite").click(function () {
    saveCurrentLink();
});

function saveCurrentLink() {

    var currentLink = $('#innerBrowser').contents().get(0).location.href;
    var currentLinkIndex = SAVED_LINKS.indexOf(currentLink);
    if (currentLinkIndex == -1) {
        SAVED_LINKS.push(currentLink);
    } else {
        SAVED_LINKS.splice(currentLinkIndex, 1);
    }
    checkPageFavourite();

}

$('#innerBrowser').load(function () {
    $('#innerBrowser').contents().find("a").click(function () {
        var curHref = $('#innerBrowser').contents().get(0).location.href;
        userHistory.push(curHref);
    });
});


var userHistory = ["http://wiki.kspu.kr.ua/index.php/%D0%90%D1%83%D0%B4%D0%B8%D1%82%D0%BE%D1%80%D1%96%D1%83%D0%BC"];
function pageHistory(direction) {
    console.log("history is:" + userHistory);

    if (direction == "back") {
        console.log("-=- pageHistory + " + direction + " | size = " + userHistory.length + "-=-");
        if (userHistory.length != 1) {
            var lastLink = userHistory.pop();
            $("#innerBrowser").attr('src', lastLink);
            reloadCurrentPage();
        }
    }
}

$("#homePageLoadButton").click(function () {
    function showHomePage() {
        if ( $("#innerBrowser").attr('src') != HOME_PAGE) {
            $("#innerBrowser").attr('src', HOME_PAGE);
        }
        clearPage();

        $("#nav_menu").trigger('click');
        //console.log(' $("#menuPage").fadeOut(); ');
    }

    showHomePage();
});

$("#savedLinksButton").click(function () {

    console.log("savedLinksButton CLICKED: 0");

    function showSavedLinks() {

        $("#nav_menu").trigger('click');

        var savedLinksArray = SAVED_LINKS;
        var sliHtml = "";

        console.log("savedLinksButton CLICKED: 1");

        if (savedLinksArray.length > 0) {

            console.log("savedLinksButton CLICKED: 2 ");

            for (var sli_i = 0; sli_i < savedLinksArray.length; sli_i++) {
                var link = "" + savedLinksArray[sli_i];
                var title = decodeURIComponent(link.substring(33));
                var id = "sli_item_" + sli_i;

                sliHtml += '<br>' + '<div id="' + id + '" class="sliItem" data-myurl="' + link + '">' + title + '</div>';
            }
        } else {
            console.log("savedLinksButton CLICKED: 3");
            sliHtml = '<br>' + '<div id="sli_item_0" class="sliItem sliItemEmpty"> Схоже у Вас ще немає закладок :с </div>';
            // sliHtml = 'Здається у Вас немає закладок :с <br> Скоріше збережіть щось!';
        }

        console.log("savedLinksButton CLICKED: 4");
        $("#savedLinks").html(sliHtml);
        console.log("savedLinksButton CLICKED: 5");
        $("#savedLinks").fadeIn();
        console.log("savedLinksButton CLICKED: 6");

        console.log(sliHtml);
        console.log("savedLinksButton CLICKED: 7");

    }

    showSavedLinks();

    console.log("savedLinksButton CLICKED: 8");
});


$(document).click(function(event) {
    if ($(event.target).hasClass("sliItem")) {
        var savedUrl = $(event.target).attr('data-myurl');
        $("#innerBrowser").attr('src', savedUrl);
        $("#savedLinks").fadeOut();
        $("#nav_menu").trigger('click');
    }

});


function clearPage() {
    var contentHtml = $("#innerBrowser").contents().find("div#content").html();
    $("#innerBrowser").contents().find("body").css({
        padding: '10px',
        //overflow: 'scroll'
    });
    $("#innerBrowser").contents().find("body").html(contentHtml);

    console.log("-=-=-=-=-=-=-=-=-=-=-=-=- clearPage -=-=-=-=-=-=-=-=-=-=-=-=-=-")
}


$("#browser").load(function () {
    console.log("iframe loaded successfully");
});

function iframeLoaded2() {
    $("#homePageLoadButton").html("На головну");
    clearPage();
    console.log("-=-=-=-=-=-=-=- IFRAME LOADED -=-=-=-=-=-=-=-");

    checkPageFavourite();
}

function checkPageFavourite() {
    var currentLink = $('#innerBrowser').contents().get(0).location.href;
    var currentLinkIndex = SAVED_LINKS.indexOf(currentLink);
    if (currentLinkIndex == -1) {
        // if dont exist
        $("#nav_favourite img").attr('src', "./img/fav_0.png")
    } else {
        // if exist
        $("#nav_favourite img").attr('src', "./img/fav_1.png")
    }
}

function launch() {

    //loading();

    function setTwoMainDivsHeight() {
        var contentHeight = $("body").height() - NAV_HEIGHT;
        $("#navigation").css({
            height: NAV_HEIGHT + 'px',
            "max-height": NAV_HEIGHT + 'px'
        });
        $(".contentDiv").css({
            height: contentHeight + 'px',
            "max-height": contentHeight + 'px'
        });
    }

    setTwoMainDivsHeight();
}

function reloadCurrentPage() {

    $("#innerBrowser").attr('src', function (i, val) {
        return val;
    });

}

function deviceIsOffline() {
    console.log("-=-=-=-=-=-=-=- deviceIsOffline -=-=-=-=-=-=-=-");
    // reloadCurrentPage();
    $("#badInternet").fadeIn();
}

function deviceIsOnline() {
    $("#badInternet").fadeOut();
    reloadCurrentPage();
    console.log("-=-=-=-=-=-=-=- deviceIsOnline -=-=-=-=-=-=-=-");
}


var app = {
    // Application Constructor
    initialize: function () {

        document.addEventListener("online", this.onOnline.bind(this), false);
        document.addEventListener("offline", this.onOffline.bind(this), false);
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        launch();
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        $("#savedLinks").fadeOut();
        $("#badInternet").fadeOut();
        $("#loading").fadeOut();
    },
    onOffline: function () {
        deviceIsOffline();
    },

    onOnline: function () {
        deviceIsOnline();
    }
};

app.initialize();


