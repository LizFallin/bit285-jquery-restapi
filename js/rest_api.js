$(document).ready(function(){
  //Replace with your own API if you have it functioning for Toys, Colors, and Users
  var baseURI = "http://toyauctionapi.azurewebsites.net/api/";
	// Create jQuery objects representing the UI elements
    var usernametext = $('input#user_name');
    var toynametext = $('input#toy_name');
    var toylegstext = $('input#legs');
    var colortext = $('input#toy_color');

	var colordropdown = $('select#toy_color');
	var userdropdown = $('select#toy_owner');
    var toydropdown = $('select#toy');
    // Populate the dropdown items using REST API
    getColors(colordropdown);
    getUsers(userdropdown);
    getToys(toydropdown);


    //// Add a Create User button click event handler using AJAX to create a new User
      $('#addUser').click(function(){
          $.ajax({
              url: baseURI + "users/",
              method: "POST",
              data: {
                  //Name: "TestAddName",
                  //Email: "asdf.asdf.com"
                   //TODO: start with static date to see it working,
                  // then use the jQuery .val() method to get the value of the username UI field
                  Name: $(usernametext).val()
              }

          }).done(function(result) {
                    // display a message that the user is added
                    $('<p></p>').html(result.Name + ' user added!').prependTo('section#user');
                    // TODO: refresh the user dropdown list
                    getUsers(userdropdown);
          });
    });

    // TODO: The only way to store a toy is to have the OwnerID and the ColorID

	// Add a Create Toy button click event handler using AJAX to create a new Toy
	$('#addToy').click(function(){
		$.ajax({
    			url: baseURI + "toys/",
				method: "POST",
				data: {

				    Name: "testtoy",

                    //// Need to get the userID based on the user name
				    //OwnerID: $.ajax({
				    //    //url: baseURI + "users?name='" + usernametext.val() + "'",
				    //    url: baseURI + "users?name=" + "Liz",
				    //    method: "GET"
				    //    }).UserID

                    // Need to get the colorID based on the color name



				        //"NumberLegs": 3,
				        //OwnerID: 9,
				        //ColorID: 4

				        // TODO: start with static date to see it working,
                        // then use the jQuery .val() method to get the value of each UI field
					    //"Name": toynametext.val()
					    //NumberLegs: toylegstext.val(),
					    //UserName: usernametext.val(),
					    //Color: colortext.val()
					   }
              }).done(function(result) {
                    // display a message that the toy is added
			        $('<p></p>').html(result.Name + ' toy added!').prependTo('section#toy');

			        getToys(toydropdown);

		});
	});

    // TODO: Add a  button click event handler using AJAX  to delete a Toy
    			//$('#deleteToy').click(function(){

    			//	});


    //// Add a Delete Toy button click event handler using AJAX to create a new User


    			$('#deleteToy').click(function () {
    			    $.ajax({
    			        url: baseURI + "toys/",
    			        method: "DELETE",
    			        data: {
    			            Name: "smileysnake"
    			            //TODO: start with static date to see it working,
    			            // then use the jQuery .val() method to get the value of the username UI field
    			            //Name: $(toynametext).val()
    			        }

    			    }).done(function (result) {
    			        // display a message that the user is added
    			        $('<p></p>').html(result.Name + ' toy deleted!').prependTo('section#toy');
    			        // TODO: refresh the user dropdown list
    			        getToys(toydropdown);
    			    });
    			});








/*
 *  Helper methods for getting REST API data for each dropdown
 */

  function getColors(dropdown){ //Add colors to the dropdown
		$.ajax({
            url: baseURI + "colors/",
            method: "GET"
            }).done(function(result) {
					console.log(result);  // Take a peek at the data
          $.each(result, function(k, v) {
              dropdown.append('<option value="' + v.ColorID + '">' + v.ColorName + '</option>');
          });
		});
  };
	function getUsers(dropdown){ // Add users to the dropdown
	    //TODO: write the AJAX method
	    $.ajax({
	        url: baseURI + "users/",
	        method: "GET"
	    }).done(function (result) {
	        console.log(result);
	        $.each(result, function (k, v) {
	            dropdown.append('<option value="' + v.UserID + '">' + v.Name + '</option')
	        });
	    });

   };
  // Add toys to the dropdown
    function getToys(dropdown){
        //TODO: write the AJAX method
        $.ajax({
            url: baseURI + "toys/",
            method: "GET"
        }).done(function (result) {
            console.log(result);
            $.each(result, function (k, v) {
                dropdown.append('<option value="' + v.ToyID + '">' + v.Name + '</option')
            });
        });
    };

});
