var config = {
    apiKey: "AIzaSyCx9C0XZ7g3qvhT8GS7qrwCWQ0Or-UpA3s",
    authDomain: "trai-c35a9.firebaseapp.com",
    databaseURL: "https://trai-c35a9.firebaseio.com",
    projectId: "trai-c35a9",
    storageBucket: "",
    messagingSenderId: "880227855259"
  };
  firebase.initializeApp(config);
  
  var name = "";
  var destination = "";
  var fTrainTime = "";
  var frequency = 0;

$("#add-user").on("click", function(event){ 
	event.preventDefault();

	name = $("#nameInput").val().trim();
	destination = $("#destinationInput").val().trim();
	time = $("#timeInput").val().trim();
	frequency = $("#frequencyInput").val().trim();

	

	firebase.database().ref().push({
		name: name,
		destination: destination,
		time: time,
		frequency: frequency

	});
});
firebase.database().ref().on("value", function(snapshot){
	$("nameDisplay").html(snapshot.val().name);
	$("destinationDisplay").html(snapshot.val().destination);
	$("timeDisplay").html(snapshot.val().time);
	$("frequencyDisplay").html(snapshot.val().frequency);

});
