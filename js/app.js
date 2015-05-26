

var location;

$(document).ready(function() {
   


    $('.lettingsProperty').submit( function(event){
        $('.results').html('');
        event.preventDefault();

          var location = $(this).find("input[name='location']").val();
          console.log(location);
          getListings(location);
       
    });

  
        
    function getListings (location) { 
            
            var request = {  

              country: "uk",  
              language : "en",  
              listing_type : "rent", 
              location : location,  
              num_res: "5",  
              offset : 0,  
              output : "json_xs",  
              page : 1,  
              pretty : "1",  
              product_type : "realestate",  
              property_type : "property",  
              size_type : "gross",  
              size_unit : "m2",  
              sort : "nestoria_rank",  
              action:"search_listings",
              encoding: "json",
            }
        
    

            var response = $.ajax({
            
            url: "http://api.nestoria.co.uk/api?",
            data: request,
            dataType: "jsonp",
            type: "GET",
            
            })

        .done(function(response){

            console.log(response);
            console.log(response.response.listings);
             
            $.each(response.response.listings, function(i, item) {
            var listingPrice = item.price;
            var bedrooms = item.bedroom_number;
            var hsAgentPrice = parseInt((listingPrice * 52) * 0.07);

            console.log(item.price);
          
            
            $('.results').append("<p>" + bedrooms + "  bedrooms " + " / " +  listingPrice + "GBP per week  /  High St Agent Comm:" + hsAgentPrice + " GBP </p>");
            console.log(location);
            });
        })

        .fail(function(jqXHR, error, errorThrown){
            var errorElem = showError(error);
            $('.search-results').append(errorElem);
        });
    
    }
            


});  