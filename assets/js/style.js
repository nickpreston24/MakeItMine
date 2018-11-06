$(document).on('click', '#account-icon', function() {
    $('.menu').addClass('animate-menu-out').removeClass('animate-menu-in');
    $('.menu-container').css('display', 'initial');
    // alert('you clicked!')
});

$(document).on('click', '#close-menu', function() {
    $('.menu').addClass('animate-menu-in').removeClass('animate-menu-out');
    function hideMenu() {
        $('.menu-container').css('display', 'none');
    } 
    setTimeout(hideMenu, 300)
});

