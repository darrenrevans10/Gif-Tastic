
var animals = ["Whale", "Kangaroo", "Dog", "Parrot", "Horse", 
				"Fox", "Alligator", "Seal", "Zebra", "Cat", "Snake",
				"Sloth", "Lion", "Penguin", "Giraffe", "Crab", "Panther", 
				"Flamingo", "Bear", "Shark", "Panda", "Tree Frog", "Chipmunk", "Hamster"];



	function displayAnimalGif() {

		  $("#animals-view").empty();	
	      var animal = $(this).attr("data-name");
	      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        animal + "&api_key=dc6zaTOxFJmzC&limit=9";

	      $.ajax({
	      	url: queryURL,
	      	method: "GET"
	      }).done(function(response) {
			var results = response.data

			for (var i = 0; i < results.length; i++) {

				var rating = "<div class='ratings'> Rating: " + (results[i].rating) + " </div>";
        		var image = rating + "<img src=" + results[i].images.fixed_height_still.url +
            	" data-still=" + results[i].images.fixed_height_still.url +
            	" data-animate=" + results[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        		image = '<div class="col-md-4">' + image + "</div>";

				$("#animals-view").prepend(image);
			}
	      	
	      });
	}

	function renderButtons() {

		$("#buttons-view").empty();

		for (var i = 0; i < animals.length; i++) {
			
			var a = $("<button>");
			a.addClass("animal");
			a.attr("data-name", animals[i]);
			a.text(animals[i]);

			$("#buttons-view").append(a);
		}
	}

	$("#add-animal").on("click", function(event) {
		event.preventDefault();

		var animal = $("#animal-input").val().trim();

		animals.push(animal);

		renderButtons();
	});

	$("body").on("click", "img", function() {
		var state = $(this).attr('data-state');
        
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }
	});


	$(document).on("click", ".animal" , displayAnimalGif);


	renderButtons();

