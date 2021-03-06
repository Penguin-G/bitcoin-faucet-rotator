$(function(){
    var currentFaucetId;
    var slug = $("#faucet_slug").attr('property');
    init();

    //Set iframe src to first faucet in array
    $('#first_faucet').click(function(event) {
        event.preventDefault();

        generateFaucet('/api/v1/payment_processors/' + slug + '/first_faucet', false);
    });

    $('#next_faucet').click(function(event){
        event.preventDefault();
        generateFaucet('/api/v1/payment_processors/'+slug+'/faucets/'+currentFaucetId+'/next', false);
    });

    $('#previous_faucet').click(function(event){
        event.preventDefault();
        generateFaucet('/api/v1/payment_processors/'+slug+'/faucets/'+currentFaucetId+'/previous',false);
    });

    $('#last_faucet').click(function(event) {
        event.preventDefault();
        generateFaucet('/api/v1/payment_processors/'+slug+'/last_faucet',false);
    });

    $('#reload_current').click(function(event) {
        event.preventDefault();
        generateFaucet('/api/v1/faucets/' + currentFaucetId, false);
    });

    $('#random').click(function(event){
        event.preventDefault();
        generateFaucet('/api/v1/payment_processors/'+slug+'/active_faucets', true);
    });

    function init(){
        slug = $("#faucet_slug").attr('property');
        generateFaucet('/api/v1/payment_processors/'+slug+'/first_faucet', false);
    }

    function generateFaucet(apiUrl, isRandom){
        var iframeUrl;
        var currentFaucetSlug;
        var numberOfFaucets;

        slug = $("#faucet_slug").attr('property');

        if(isRandom === true && apiUrl === '/api/v1/payment_processors/'+slug+'/active_faucets'){
            $.ajax(apiUrl, {
                success: function (data) {
                    numberOfFaucets = data.length;
                    var randomFaucetIndex = randomInt(0,numberOfFaucets - 1);
                    iframeUrl = data[randomFaucetIndex - 1].url;
                    currentFaucetSlug = '/faucets/' + data[randomFaucetIndex - 1].slug;
                    $('#rotator-iframe').attr('src', iframeUrl);
                    $('#current').attr('href', currentFaucetSlug);
                }
            });
        }else{
            $.ajax(apiUrl, {
                success: function (data) {
                    currentFaucetId = data.id;
                    iframeUrl = data.url;
                    currentFaucetSlug = '/faucets/' + data.slug;
                    $('#rotator-iframe').attr('src', iframeUrl);
                    $('#current').attr('href', currentFaucetSlug);
                }
            });
        }
    }
});

function randomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}
