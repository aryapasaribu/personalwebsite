$(document).ready(function() {

    //typing animation
    (function($) {
        $.fn.writeText = function(content) {
            var contentArray = content.split(""),
                current = 0,
                elem = this;
            setInterval(function() {
                if(current < contentArray.length) {
                    elem.text(elem.text() + contentArray[current++]);
                }
            }, 80);
        };
    })(jQuery);

    // input text for typing animation
    $("#holder").writeText("STRONG - DILIGENT - PASSIONATE - VIGILANT");

    // initialize wow.js
    new WOW().init();

    //push the body and the nav over by 285px over
    var main = function() {
        $('.fa-bars').click(function() {
            $('.nav-screen').animate({
                right: "0px"
            }, 200);

            $('body').animate({
                right: "-285px"
            }, 200);
        });

        //then push them back
        $('.fa-times').click(function() {
            $('.nav-screen').animate({
                right: "-285px"
            }, 200);

            $('body').animate({
                right: "0px"
            }, 500);
        });

        $('.nav-links a').click(function() {
            $('.nav-screen').animate({
                right: "-285px"
            }, 500);

            $('body').animate({
                right: "0px"
            }, 500);
        });
    };

    $(document).ready(main);

    // initiate full page scroll

    $('#fullpage').fullpage({
        scrollBar: true,
        responsiveWidth: 400,
        navigation: true,
        navigationTooltips: ['home', 'about', 'activity', 'contact', 'connect'],
        anchors:['home', 'about', 'activity', 'contact', 'connect'],
        menu: '#myMenu',
        fitToSection: false,
        
        afterLoad: function (anchorLink, index) {
            var loadedSection = $(this);

            //using index
            if(index==1) {
                /* add opacity to arrow */
                $('.fa-chevron-down').each(function() {
                    $(this).css('opacity','1')
                });
                $('.header-links a').each(function() {
                    $(this).css('color','white')
                });
            }

            else if(index!=1) {
                $('.header-links a').each(function() {
                    $(this).css('color','black')
                });
            }

            //using index
            if(index == 2) {

                /* animate skill bars */
                $('.skillbar').each(function() {
                    $(this).find('.skillbar-bar').animate({
                        width: jQuery(this).attr('data-percent')
                    }, 2500);
                });
            }
        }
    });

    // move section down one
    $(document).on('click', '#moveDown', function() {
        $.fn.fullpage.moveSectionDown();
    });

    // fullpage.js link navigation
    $(document).on('click', '#skills', function() {
        $.fn.fullpage.moveTo(2);
    });
    
    $(document).on('click', '#activity', function() {
        $.fn.fullpage.moveTo(3);
    });
    
    $(document).on('click', '#contact', function() {
        $.fn.fullpage.moveTo(4);
    });

    // smoot scrolling
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 700);
                    return false;
                }
            }
        });
    });

    // ajax form
    $(function() {

        // get the form
        var form = $('#ajax-contact');

        // get the message div
        var formMessages = $('#form-message');

        //set up an event listener for the contact form
        $(form).submit(function(e) {
            //stop the browser from submitting the form
            e.preventDefault();

            //serialize the form data
            var formData = $(form).serialize();

            //submit the form using AJAX
            $.ajax({
                type: 'POST',
                url: $(form).attr('action'),
                data: formData
            })
            .done(function(response) {
                // make sure that the formMessage div has the 'succes' class
                $(formMessages).removeClass('error');
                $(formMessages).addClass('success');

                //set the message text
                $(formMessages).text(response);

                //clear the form
                $('#name').val('');
                $('#email').val('');
                $('#message').val('');
            })
            .fail(function(data) {
                //make sure that the formMessages div has the 'error' class
                $(formMessages).removeClass('succes');
                $(formMessages).addClass('error');

                //set the message text
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent!');
                }
            });
        });
    });

});