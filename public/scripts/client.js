console.log('js sourced');

$(document).ready(onReady);

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
            $('ul').children().remove();
            for (var i = 0; i <res.peopleArray.length; i++){
                //create list item for added person and append it to DOM
                var $personItem = $('<li>').text(res.peopleArray[i].name + ": " + res.peopleArray[i].fact);
                $('ul').append($personItem);
            }
        }
    })
}