/**
 * Created by Kervin on 5/24/17.
 */

function setQuote(data, quoteContainer, authorContainer) {
    quoteContainer = (typeof quoteContainer !== 'undefined') ?  quoteContainer : ".quote1"; // default quote
    authorContainer = (typeof authorContainer !== 'undefined') ?  authorContainer : ".movie1"; // default number of quotes
    $(quoteContainer).html(data.quote);
    $(authorContainer).html(data.author);
}

function setBackground(url){
    console.log(url);
    $("body").css("background-image","url("+url+")");
}



function getBackdrop(name) {
    //var url = "https://api.themoviedb.org/3/search/movie?api_key=ce668d9d2acd4840d5452f31c1c21e86&language=en-US&query=Titanic&page=1&include_adult=true"
    //https://image.tmdb.org/t/p/original//imageurl
    var baseImageUrl = "https://image.tmdb.org/t/p/original//";
    $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie', // The URL to the API. You can get this in the API page of the API you intend to consume
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {
            "api_key" : "ce668d9d2acd4840d5452f31c1c21e86",
            "language" : "en-US",
            "query": name,
            "page": "1",
            "include_adult": "true"
        }, // Additional parameters here
        dataType: 'json',
        success: function(data){
            if (data.results.length > 0) {
                //setBackground(baseImageUrl += data.results[0]["backdrop_path"]);
                setBackground(baseImageUrl += data.results[0]["backdrop_path"]);
            } else {
                console.log("No result");
            }
        },
        error: function(err) { console.log(err); }
    });
}

function generateQuote(number) {
    number = (typeof number !== 'undefined') ?  number : 1; // default number of quotes
    $.ajax({
        url: 'https://andruxnet-random-famous-quotes.p.mashape.com/', // The URL to the API. You can get this in the API page of the API you intend to consume
        type: 'POST', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {
            "cat" : "movies",
            "count" : number
        }, // Additional parameters here
        dataType: 'json',
        success: function(data){
            setQuote(data);
            getBackdrop(data.author);
        },
        error: function(err) { console.log(err); },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-Mashape-Key", "VGK2RyCOv7mshi5fFjlenbMiJwbpp1wbi47jsnXF6gGuKcVNwQ");
        }
    });
}




$(document).ready(function(){
    $("#get-quote-btn").click(function () {
      generateQuote();
    });

});


