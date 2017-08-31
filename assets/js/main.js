

var url ="https://train-scheduler-5743f.firebaseio.com/";
var dataRef = new Firebase(url);
var name ='';
var destination = '';
var firstTime = '';
var frequency = '';
var minutesAway = '';
var minutesTillTrain = '';
var holder = '';
var getId = '';
var nextTrain = '';
var nextTrainTime = '';
var firstTimeChanged = '';
var currentTime = '';
var timeDifference = '';
var timeRemainder = '';



$(document).ready(function() {

     $("#add-train").on("click", function() {
     	
     	name = $('#name-input').val().trim();
     	destination = $('#destination-input').val().trim();
     	firstTime = $('#firstTime-input').val().trim();
     	frequency = $('#frequency-input').val().trim();
          firstTimeChanged = moment(firstTime, "hh:mm").subtract(1, "years");
          currentTime = moment();
          timeDifference = moment().diff(moment(firstTimeChanged), "minutes");
          timeRemainder = timeDifference % frequency;
          minutesAway = frequency - timeRemainder;
          nextTrain = moment().add(minutesAway, "minutes");
          nextTrainTime = moment(nextTrain).format("hh:mm");

     	
     	holder = dataRef.push({
     		name: name,
     		destination: destination,
     		firstTime: firstTime,  
     		frequency: frequency,
               nextTrainTime: nextTrainTime,
               minutesAway: minutesAway
     	});
          
          $('#name-input').val('');
     	$('#destination-input').val('');
     	$('#firstTime-input').val('');
     	$('#frequency-input').val('');

     	return false;
     });
         
     dataRef.on("child_added", function(childSnapshot) {
	

		$('.train').append("<tr class='table-row' id=" + "'" + childSnapshot.key() + "'" + ">" +
               "<td class='col-xs-3'>" + childSnapshot.val().name +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().destination +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().frequency +
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().nextTrainTime + 
               "</td>" +
               "<td class='col-xs-2'>" + childSnapshot.val().minutesAway + 
               "</td>" +
               "<td class='col-xs-1'>" + "<input type='submit' value='remove train' class='remove-train btn btn-primary btn-sm'>" + "</td>" +
          "</tr>");

}, function(errorObject){
	
});

$("body").on("click", ".remove-train", function(){
     $(this).closest ('tr').remove();
     getId = $(this).parent().parent().attr('id');
     dataRef.child(getKey).remove();
});

});
