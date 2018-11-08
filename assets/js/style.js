$(document).on('click', '#account-icon', function() {
    $('.menu').addClass('animate-menu-out').removeClass('animate-menu-in');
    $('.menu-container').css('display', 'initial');

$(document).on('click', '#close-menu', function() {
    $('.menu').addClass('animate-menu-in').removeClass('animate-menu-out');
    function hideMenu() {
        $('.menu-container').css('display', 'none');
    } 
    setTimeout(hideMenu, 300)
});

$(document).on('click', "#login-link", function() {
    $('#login-form-div').removeClass('display-none');
})

$(document).on('click', "#signup-link", function() {
    $('#signup-form-div').removeClass('display-none');
})
