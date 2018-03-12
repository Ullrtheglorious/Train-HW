
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
    var trainStart = moment($("#TrainStartInput").val().trim(), "DD/MM/YY").format("X");
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

    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
        trainFrequency);
});