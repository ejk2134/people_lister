console.log('js sourced');

$(document).ready(onReady);

// global variables for navigating person carousel
var peopleList = [];
var displayIndex = 0;

function onReady(){
    //GET index
    $.ajax({
        method: 'GET',
        url: '/',
        success: function(res){
            console.log('connected to server');
        }
    })

    //listeners
    $('#submitPerson').on('click', onSubmit);
    $('#previous').on('click', previousPerson);
    $('#next').on('click', nextPerson);
}

function onSubmit(){
    $.ajax({
        method: 'POST',
        url: '/person',
        data: {
            // send values in input fields to server
            name: $('#inputName').val(),
            fact: $('#inputFact').val()
        },
        success: function(res){
            // clear input fields and run function for /person 'GET' route
            $('#inputName').val('');
            $('#inputFact').val('');
            getPerson();
        }
    })
}

function getPerson(){
    $.ajax({
        method: 'GET',
        url: '/person',
        success: function(res){
            console.log(res);
            peopleList = res.peopleArray;
            displayIndex = 0;
            nextPerson();
            $('div').show();
        }
    })
}

function nextPerson(){
    displayIndex++;
    displayIndex = displayIndex % peopleList.length;
    var person = peopleList[displayIndex];
    $('#displayed').text(person.name + ': ' + person.fact);
    $('#displayNumber').text((displayIndex + 1) + '/' + peopleList.length);
}

function previousPerson(){
    displayIndex += peopleList.length - 1;
    displayIndex = displayIndex % peopleList.length;
    var person = peopleList[displayIndex];
    $('#displayed').text(person.name + ': ' + person.fact);
    $('#displayNumber').text((displayIndex + 1) + '/' + peopleList.length);
}