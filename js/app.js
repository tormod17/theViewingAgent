$(document).ready(function() {
   
var AveragePrice;
var totalPrice;
var averageComm;
var totalComm;
var bedrooms;
var listings;

    $('.lettingsProperty').submit( function(event){
        $('.results').html('');
        $('.hsAgentComm').html('');
        $('.ourPrice').html('');
        $('.nestoriaLink').html('');

        
        event.preventDefault();

          var location = $(this).find("input[name='location']").val();
          var bedroom_max= $(this).find("input[name='no_bedrooms']").val();
          getListings(location, bedroom_max);
          
    });

    $('.vaBtn').click(function(){
      $("#vaModal").modal('show');

    });

     $('.olBtn').click(function(){
      $("#olModal").modal('show');

    });

     $('.aaBtn').click(function(){
      $("#aaModal").modal('show');

    });


});      


    
function getListings (location,bedroom_max) { 
            
            var request = {  
              area: location,            
              api_key: 'aejnbvt9axw4b5upkb2ccwnk'
            } 

            var response = $.ajax({
            
            url: "http://api.zoopla.co.uk/api/v1/property_listings.json",
            data: request,
            dataType: "jsonp",
            type: "GET",
            
            })
           

            .done(function(response){
                var nestoriaLink= response.response.link_to_url;
                console.log('>>>>>>>>>>>>',nestoriaLink, response)
    
                var listings = response.response.listings;
                var No_of_listings = listings.length;
                console.log(listings);
                        
                        var totalPrice=0;
                        var totalComm=0;
                        var agentComm=0;
                        var averagePrice=0;
                        var averageComm=0;

                  $.each(listings, function(i, item) {
                      
                        var listingPrice = item.price;
                            totalPrice+=listingPrice;
                            agentComm = parseInt((listingPrice * 52) * 0.07);
                            totalComm += agentComm;
                            averageComm = parseInt(totalComm / No_of_listings);
                            averagePrice =parseInt(totalPrice /No_of_listings);                      

                  })     

            $('.nestoriaLink').append('<p>' + '<a href =' + nestoriaLink+ '>' +'Click here to see the full list of properties in the selected area.</a></p>');
            $('.results').append('<p>  Number of bedrooms:' + ' ' + bedroom_max +' '+ 'Average weekley rent: £' + averagePrice );
            $('.hsAgentComm').append('<p> Average agent commisson :' +' ' + '£'+ averageComm  +' </p>');
            $('.ourPrice').append('<p> The viewing agent will cost you £400 </p>');
                  console.log(parseInt(averagePrice));
                  console.log(parseInt(averageComm));        
            })
            
            .fail(function(jqXHR, error, errorThrown){
            var errorElem = showError(error);
            $('.search-results').append(errorElem);
             });


};        

 


 