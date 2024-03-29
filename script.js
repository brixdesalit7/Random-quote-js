let quotesData;
var currentQuote = '',
currentAuthor = '';

const getQuotes = () => {
return $.ajax({
    headers: {
    Accept: 'application/JSON'
    },
    url : 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function(jsonQuotes) {
    if(typeof jsonQuotes === 'string') {
    quotesData = JSON.parse(jsonQuotes);
    }
    }
});
}
const getRandomQuote = () => {   
    return quotesData.quotes[ Math.floor(Math.random() * quotesData.quotes.length)];
}

const getQuote = () => {
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

    $('#tweet-quote').attr (
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    $('.quote-text').animate({opacity: 0}, 500, function() {
        $(this).animate({ opacity: 1}, 500);
        $('#text').html(randomQuote.quote);
    });

    $('.quote-author').animate({opacity: 0}, 500, function() {
        $(this).animate({ opacity: 1}, 500);
        $('#author').html(randomQuote.author);
    });

    $('.button').animate({opacity: 0}, 500, function() {
        $(this).animate({ opacity: 1}, 500);
    });
}

$(document).ready(function () {
    getQuotes().then(() => {
        getQuote();
    });
    
    $('#new-quote').on('click', getQuote);
});

setTimeout(() => {
    getQuotes().then(() => {
        getQuote();
    });
},5000);
    