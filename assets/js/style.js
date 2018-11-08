$(document).on('click', '#account-icon', function () {
    $('.menu').addClass('animate-menu-out').removeClass('animate-menu-in');
    $('.menu-container').css('display', 'initial');
})

$(document).on('click', '#close-menu', function () {
    $('.menu').addClass('animate-menu-in').removeClass('animate-menu-out');

    function hideMenu() {
        $('.menu-container').css('display', 'none');
    }
    setTimeout(hideMenu, 300)
});

$(document).on('click', "#login-link", function () {
    $('#login-form-div').removeClass('display-none');
})

$(document).on('click', "#signup-link", function () {
    $('#signup-form-div').removeClass('display-none');
})

$(document).on('click', '#back-arrow', function () {
    $("#recipe-info").show();
    $("#search-form").show();
    $("#recipe-view-div").hide();
    $('#back-arrow').addClass('color-none')
})


// bring up add notes modal
$(document).on('click', '#notes-btn', function() {
    var textArea = $('#recipe-view-list').children().text();
    console.log(textArea);
    $('#add-note-area').text(textArea);
    $('#text-area-div').show();
    $('#text-area-modal').addClass('animate-modal-out').removeClass('animate-modal-in')

})

// hide notes modal
$(document).on('click', '#confirm-note-button', function() {
    $('#text-area-modal').addClass('animate-modal-in').removeClass('animate-modal-out');
    setTimeout((function(){
        $('#text-area-div').hide();
    }), 250);
})

