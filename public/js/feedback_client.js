$(document).ready(() => {
    let baseUrl = '';
    $('.helpful-button').on('click', function(event) {
        event.preventDefault();
        let feedback = {
            helpful: $(this).data('helpful'),
            comment: '',
            inaccurate: false,
            outdated: false,
            badSearchResult: false,
            unclear: false,
            url: document.documentURI,
            pageTitle: document.title
        };
        if ($(this).data('helpful') === true) {
            $.ajax(baseUrl + '/api/create', {
                method: 'POST',
                contentType: 'application/json',
                crossDomain: true,
                data: JSON.stringify(feedback)
            }).done(() => {
                submitted();
            }).fail((jqXhr, statusText, err) => {
                console.log(jqXhr);
                console.log(statusText);
                console.log(err);
            });
        }
        else if ($(this).data('helpful') === false) {
            $('form').slideDown();
            $('input[type="checkbox"]').prop('disabled', false);
            $('textarea').prop('disabled', false);
            $('html').animate({
                scrollTop: ($('#submitFeedback').offset().top)
            }, 500);
        }
        else {
            console.log('Error. "Helpful" was neither T or F');
        }
    });
    $('#submitFeedback').on('click', function(event) {
        event.preventDefault();
        let feedback = {
            helpful: false,
            comment: $('textarea').val(),
            inaccurate: $('#inaccurate').is(':checked'),
            outdated: $('#outdated').is(':checked'),
            badSearchResult: $('#badSearch').is(':checked'),
            unclear: $('#unclear').is(':checked'),
            url: document.documentURI,
            pageTitle: document.title
        };
        $.ajax(baseUrl + '/api/create', {
            method: 'POST',
            contentType: 'application/json',
            crossDomain: true,
            data: JSON.stringify(feedback)
        }).done(() => {
            submitted();
        }).fail((jqXhr, statusText, err) => {
            console.log(jqXhr);
            console.log(statusText);
            console.log(err);
        });
    });
});

var submitted = function() {
    $('form').slideUp().empty();
    $('#feedbackArea').empty();
    $('#feedbackArea')
    .append('<button class="btn btn-success">Submitted</button>')
    .fadeOut(3000);
};