$(document).ready(function() {

    var AveragePrice;
    var totalPrice;
    var averageComm;
    var totalComm;
    var bedrooms;
    var listings;

    $('.lettingsProperty').submit(function(event) {
        $('.results').html('');
        $('.hsAgentComm').html('');
        $('.ourPrice').html('');
        $('.nestoriaLink').html('');


        event.preventDefault();

        var location = $(this).find("input[name='location']").val();
        var bedroom_max = $(this).find("input[name='no_bedrooms']").val();
        getListings(location, bedroom_max);

    });

    $('.vaBtn').click(function() {
        $("#vaModal").modal('show');

    });

    $('.olBtn').click(function() {
        $("#olModal").modal('show');

    });

    $('.aaBtn').click(function() {
        $("#aaModal").modal('show');

    });


});



function getListings(location, bedroom_max) {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("demo").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", " http://api.zoopla.co.uk/api/v1/property_listings.json?area=putney&api_key=aejnbvt9axw4b5upkb2ccwnk", true);
    xhttp.send();
};
