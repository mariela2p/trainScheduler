var config = {
    apiKey: "AIzaSyCx9C0XZ7g3qvhT8GS7qrwCWQ0Or-UpA3s",
    authDomain: "trai-c35a9.firebaseapp.com",
    databaseURL: "https://trai-c35a9.firebaseio.com",
    projectId: "trai-c35a9",
    storageBucket: "",
    messagingSenderId: "880227855259"
  };
  firebase.initializeApp(config);

  //initial variables
  var name = "";
  var destination = "";
  var time = "";
  var frequency = 0;
  var nextTrain = "";
  var minAway = 0;

// set the on click function for the submit button
$("#add-train").on("click", function(event){ 
	
	// prevents the form default 
	event.preventDefault();

	//Take the values from the input
	name = $("#nameInput").val().trim();
	destination = $("#destinationInput").val().trim();
	time = $("#timeInput").val().trim();
	frequency = $("#frequencyInput").val().trim();

	
	//push values to Firebase
	firebase.database().ref().push({
		name: name,
		destination: destination,
		time: time,
		frequency: frequency
		//dateAdded: firebase.database.ServerValue.TIMESTAMP

	});
	//Clear text from the input form
	 $("#nameInput").val("");
	 $("#destinationInput").val("");
	 $("#timeInput").val("");
	 $("#frequencyInput").val("");
});

firebase.database().ref().on("child_added", function(childSnapshot){

//Print first train time to the console	
console.log("FIRST TRAIN TIME: " + childSnapshot.val().time); 


// First Time
var firstTimeConverted = moment(time, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var remainder = diffTime % frequency;
    console.log("TIME REMAINING " + remainder);

    // Minute Until Train
    var minAway = frequency - remainder;
    console.log("MINUTES TILL TRAIN: " + minAway);

    // Next Train
    var nextTrain = moment().add(minAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


// Append train info to the tbody
$("tbody").append("<tr>" + 	"<td>" + name + "</td>" +
							"<td>" + destination + "</td>" +
	    					"<td>" + frequency + "</td>" + 
	    					"<td>" + nextTrain + "</td>" +
	    					"<td>" + minAway + "</td>" + "</tr>");
}, function(errorObject) {

  console.log("ERRORS: " + errorObject.code);

});

