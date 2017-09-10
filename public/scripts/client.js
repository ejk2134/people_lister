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
            name: $('#inputName').val(),
            fact: $('#inputFact').val()
        },
        success: function(res){
            $('#inputName').val('');
            $('#inputFact').val('');
        }
    })
}