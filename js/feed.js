$(document).ready(function() {

    // WOW JS & TOOLTIP
    new WOW().init();
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    /* API KEYS*/
    // SEARCH API KEY & URL
    "use strict";
    var searchAPI = "4634ebb67ff1f2c505246874edd505ed%3A7%3A74061741";
    var searchURL = "";

    // MOST POPULAR ARTICLES API KEY & URL
    var popularAPI = "4cbdf26656996c15cd99d80fbcfe9b99%3A18%3A74061741";
    var popularURL = "http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/30.json?api-key=" + popularAPI;

    // TOP STORIES API KEY & URL
    var topStoriesAPI = "dbedf6c902da5f3bcd66b13a15d45689%3A2%3A74061741";
    var topStoriesURL = "http://api.nytimes.com/svc/topstories/v2/home.json?api-key=" + topStoriesAPI;

    "use strict";
    var d = document;
    var mainDivToAppendTo = d.getElementById("feed");
    var cardTitle = d.getElementById("card-title");
    var postedBy = d.getElementById("post-by");
    var numberOfPosts = d.getElementById("result-num");
    var viewing = d.getElementById("view-type");
    var loadMessage = d.getElementById("load-message");
    var input = d.getElementById("input");
    var link = "";
    var imgSource  = "";

    // GETTING THE BUTTON ELEMENTS
    var hotNews = d.getElementById("hot");
    var topNews = d.getElementById("top");
    var techNews = d.getElementById("tech");
    var businessNews = d.getElementById("business");
    var politicsNews = d.getElementById("politics");
    var worldNews = d.getElementById("world");
    var sportsNews = d.getElementById("sports");
    var travelNews = d.getElementById("travel");

    // DISPLAYING RANDOM LOAD MESSAGE
    loadMessage.innerHTML = randomLoadMessage();

    // HIDING THE INTRO DIV IN 4.6 SECONDS
    var hideDiv = setTimeout(hideIntro, 3400);
    function hideIntro() {
        $(".intro").addClass("hideDiv");
    }

    // SHOWS THE TOP AND TRENDING NEWS ON CLICK
    function mainButtonClick(url, id, name) {
        extractData(url);
        $(".options").removeClass("top-select");
        $(".options").removeClass("select");
        $(id).addClass("top-select");
        viewing.innerHTML = name;
    }

    // SHOWS THE INDIVIDUAL CATEGORY RESULTS ON THE SIDBAR BUTTON CLICK
    function categoryButtonClick(category, id, name) {
        var link = storyByCategory(category);
        extractData(link);
        $(".options").removeClass("top-select");
        $(".options").removeClass("select");
        $(id).addClass("select");
        viewing.innerHTML = name;
    }

    // DISPLAYS MOST POPULAR NEWS
    hotNews.onclick = function() {
        mainButtonClick(popularURL, "#hot", "Most Popular");
    }

    // DISPLAYS TOP STORIES FROM NYT
    topNews.onclick = function() {
        mainButtonClick(topStoriesURL, "#top", "Top Stories");
    }

    // DISPLAYS TOP TECH NEWS
    techNews.onclick = function() {
        categoryButtonClick("technology", "#tech", "Techonology");
    }

    // DISPLAYS TOP BUSINESS NEWS
    businessNews.onclick = function() {
        categoryButtonClick("business", "#business", "Business");
    }

    // DISPLAYS TOP POLITICS NEWS
    politicsNews.onclick = function() {
        categoryButtonClick("politics", "#politics", "Politics");
    }

    // DISPLAYS TOP WORLD NEWS
    worldNews.onclick = function() {
        categoryButtonClick("world", "#world", "World");
    }

    // DISPLAYS TOP SPORTS NEWS
    sportsNews.onclick = function() {
        categoryButtonClick("sports", "#sports", "Sports");
    }

    // DISPLAYS TOP TRAVEL NEWS
    travelNews.onclick = function() {
        categoryButtonClick("travel", "#travel", "Travel");
    }

    function storyByCategory(category) {
        // TOP STORIES FROM CATEGORIES
        return "http://api.nytimes.com/svc/topstories/v2/" + category + ".json?api-key=" + topStoriesAPI;
    }

    // CREATES BASIC CARD STUCTURE TO SHOW THE NEWS
    function createCardElements() {
        "use strict";
        var outerDiv = d.createElement("div"); //give this class col-md-3
        var innerDiv = d.createElement("div"); //give this class col-md-12 card
        var postLink = d.createElement("a"); //link to post, get target _blank
        var image = d.createElement("img");
        var title = d.createElement("p"); //give id of #card-title
        var author = d.createElement("p"); //give id of #post-by
        setAttributes(outerDiv, innerDiv, postLink, image, title, author);
        generateCard(outerDiv, innerDiv, postLink, image, title, author);
    }

    // SETS THE APPROPRIATE ATTRIBUTES TO THE HTML ELEMENTS
    function setAttributes(outerDiv, innerDiv, postLink, image, title, author) {
        
        // SETS CLASS NAMES TO DIVS
        outerDiv.className = "col-md-4";
        innerDiv.className = "col-md-12 card wow fadeInUp";
        innerDiv.setAttribute("data-wow-delay", "0.2s");  

        // SETS ATTRIBUTES TO LINK
        postLink.setAttribute("href", link);
        postLink.setAttribute("target", "_blank");

        // TO THUMBNAIL, TITLE, AND AUTHOR
        image.className = "img-responsive";
        image.setAttribute("id", "img-card");
        image.setAttribute("src", "img-nyt.png");

        title.setAttribute("id", "card-title");
        title.innerHTML = cardTitle;

        author.setAttribute("id", "post-by");
        author.innerHTML = postedBy;
    }

    // GENERATE THE ENTIRE CARD WITH ORDER
    function generateCard(outerDiv, innerDiv, postLink, image, title, author) {

        // APPENDS IMAGE, TITLE, AUTHOR TO LINK
        postLink.appendChild(image);
        postLink.appendChild(title);
        postLink.appendChild(author);

        // APPENDS THE LINK TO THE CARD
        innerDiv.appendChild(postLink);

        // APPENDS THE MAIN CARD TO OUTER DIV
        outerDiv.appendChild(innerDiv);

        // APPENDS THE CARD TO MAIN DIV
        mainDivToAppendTo.appendChild(outerDiv);
    }

    // FIRST TIME
    var first = true;
    firstTime(popularURL);

    // FIRST TIME
    function firstTime(url) {
        if(first){
            first = false;
            extractData(url);
        }
    }

    //MOST POPULAR IS SELECTED AND TOGGLED DEFAULTLY
    function extractData(url) {
        if(!first) {
            mainDivToAppendTo.innerHTML = null;
            $.getJSON(url, function(api) {
                numberOfPosts.innerHTML = api["num_results"] + " Results";
                api.results.forEach(function(data) {
                    link = data.url;
                    cardTitle = data.title.length > 48 ? data.title.substring(0, 48) + ".." : data.title;
                    postedBy = data.byline == "" ? data.source : (data.byline.length > 46)? data.byline.substring(0,46) + " .." : data.byline;
                    // if(url == popularURL) { imgSource = data.media[0]["media-metadata"][0].url; }
                    // else { 
                    //     imgSource = data.multimedia[0].url; 
                    //     if(!imgSource || imgSource == undefined) { imgSource = "no-img.png"; }
                    // }
                    createCardElements();
                });
            });
        }
    }

    // SHOWS SEARCH RESULTS WHEN THE USER PRESSES ENTER
    $("#input").keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            $(".options").removeClass("top-select");
            $(".options").removeClass("select");
            searchArticles(this.value);
            $("#input").val("");
        }
    });

    // MAKES THE REQUEST AND DISPLAYS THE NEWS BASED ON RESULTS
    function searchArticles(term) {
        viewing.innerHTML = term;
        term = term.replace(/ /g, "+");
        searchURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + term + "&api-key=" + searchAPI;
        console.log(searchURL);
        mainDivToAppendTo.innerHTML = null;
        $.getJSON(searchURL, function(api) {
            var i = 0;
            api.response.docs.forEach(function(data) {
                link = data.web_url;
                // imgSource = "http:\/\/static01.nyt.com\/" + data.multimedia[2].url;
                // if(!imgSource) { imgSource = "no-img.png"; }
                // console.log(imgSource);
                cardTitle = (data.headline.main.length > 45) ? data.headline.main.substring(0, 45) + " .." : data.headline.main;
                postedBy = "In " + data["section_name"];
                i++;
                createCardElements();
            });
            numberOfPosts.innerHTML = i + " results";
        });
    }

    // DISPLAYS FUNNY/RANDOM MESSAGES IN LOAD
    function randomLoadMessage() {
        var arr = ["Shovelling coal into the server ..", "At least you're not on hold ..", "I'm testing your patience ..", "A few bits tried to escape, but we caught them ..", "The bits are flowing slowly today ..", "The architects are still drafting ..", "The bits are still breeding ..", "And dream of faster computers ..", "Would you like fries with that? ..", "The server is powered by a lemon and two electrodes ..", "Waiting for satellite moves into position .."];
        return arr[Math.floor(Math.random() * arr.length)];
    }
});