
var config = {
    apiKey: "AIzaSyANBhr-MarmPOZocqD1sAlg0xkD4HYABYQ",
    authDomain: "ullrtheglorioushw.firebaseapp.com",
    databaseURL: "https://ullrtheglorioushw.firebaseio.com",
    projectId: "ullrtheglorioushw",
    storageBucket: "ullrtheglorioushw.appspot.com",
    messagingSenderId: "1010214756377"
};
firebase.initializeApp(config);
var database = firebase.database();



$("#addTrain").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#TrainNameInput").val().trim();
    var trainDestination = $("#destinationInput").val().trim();
    var trainStart = moment($("#TrainStartInput").val().trim(),"HH:mm").format("HH:mm");
    console.log(trainStart);
    var trainFrequency = $("#FrequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        start: trainStart,
        frequency: trainFrequency
    };
    database.ref().push(newTrain);
    $("#TrainNameInput").val("");
    $("#destinationInput").val("");
    $("#TrainStartInput").val("");
    $("#FrequencyInput").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().frequency;
    var currentTime = moment();
    var timeConvert = moment(trainStart, ":mm")
    var diffTime = moment().diff(moment(timeConvert), "minutes");
    var remainder = diffTime % trainFrequency;
    var minutesAway = trainFrequency - remainder;
    var nextTrain = moment().add(minutesAway, "minutes");
    var arrivalTime = moment(nextTrain).format("hh:mm");
    
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        trainFrequency + "</td><td>" + arrivalTime + "</td><td>" + minutesAway);
});

