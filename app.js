//part A: defining global functions variables and objects
//Step 2: with that input make api call
function displayError(message) {
    $("#messageBox span").html(message);
    $("#messageBox").fadeIn();
    $("#messageBox").fadeOut(10000);
};

function getShowsFromApi(userInput) {
    //    console.log('hey');
    let result = $.ajax({
            /* update API end point */
            url: "https://api.tvmaze.com/search/shows?q=" + userInput,
            //  data: params,
            dataType: "json",
            /*set the call type GET / POST*/
            type: "GET"
        })

        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            console.log(result);
            if (result.length == 0) {
                displayError('No results found')
            } else {
                showResultsFromApi(result);
            }

        })



}
//Step 3: with api results display them to the user
function showResultsFromApi(result) {

    //create an empty variable to store one LI for each one the results
    let buildTheHtmlOutput = "";

    $.each(result, function (resultKey, resultValue) {
        //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
        buildTheHtmlOutput += '<article role="listbox" class="one-half">';
        buildTheHtmlOutput += '<h3>' + resultValue.show.name + '</h3>';

        if (resultValue.show.rating.average == null) {
            buildTheHtmlOutput += '<h4>' + 'Ratings not found' + '</h4>';
        } else {
            buildTheHtmlOutput += '<h4>' + 'Rating ' + resultValue.show.rating.average + '</h4>';
        }

        if (resultValue.show.image == null) {
            buildTheHtmlOutput += '<img src="no-img.png" alt="Television show poster">';
        } else {
            buildTheHtmlOutput += '<img src="' + resultValue.show.image.original + '" alt="Television show poster">';
        }

        buildTheHtmlOutput += '<p>' + resultValue.show.summary + '</p>';
        buildTheHtmlOutput += '</article>';
    });
    //use the HTML output to show it in the index.html
    $(".result-section").html(buildTheHtmlOutput);
    $('.result-section').show();
}

//part B: using global functions variables and objects(triggers)
//when you load the page ...
$(document).ready(function () {
    $("#messageBox").hide();
    $('.result-section').hide();
});

//Step 1: get input from user
//form trigger
$(document).on('submit', '.search-show', function (event) {
    event.preventDefault();
    //    console.log("form submitted");
    //    get the user input from the form
    let userInput = $(".show-name").val();
    //    console.log(userInput);
    //    validate the input
    if (userInput == "") {
        displayError('Please search for show name')
    } else {
        getShowsFromApi(userInput);
        $(".show-name").val('');

    }
});
