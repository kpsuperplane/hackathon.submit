$.terms('set', 'define', false);
var sampleData = [{
    title: "We Use Cookies To Enhance Your Experience",
    desc: "Put some text here indicating why cookies are very very important",
    cat: "cookies"
},{
    title: "We Do Not Share Your Info With Others",
    desc: "Put some other text here indicating why you don't share information with others.",
    cat: "privacy"
},{
    title: "Your Content Belongs To You",
    desc: "Indicate the user's right to the content they post on your site!",
    cat: "rights"
},{
    title: "We Process Payments Through XYZ",
    desc: "Make sure you agree to their Terms as well :)",
    cat: "monetary"
},{
    title: "We Will Not Be Liable For Your Problems",
    desc: "To the maximum extent in which the law in whatever country you live in allows.",
    cat: "law"
},{
    title: "You Must Love Koding To Register",
    desc: "No affiliation here of course.",
    cat: "info"
}];
$(function(){
    $('a.anchor').click(function(e){
        e.preventDefault();
        $('document,body').animate({scrollTop: $($(this).attr('href')).offset().top - $('#nav').height() - 50}, 500); 
    });
    SyntaxHighlighter.all();
    $('.tabGroup').each(function(){
        var that = $(this);
        $(this).find('.menu .item').tab({
            context: that
        });
    });
    $('#basicExampleBtn').click(function(){
        $.terms({
            data: sampleData,
            full: 'http://example.com/terms',
            audio: false
        }, function () {
            $('#basicExampleSuccess').show();
            $('#basicExampleError').hide();
        }, function () {
            $('#basicExampleError').show();
            $('#basicExampleSuccess').hide();
        });
    });
    $('#dictionaryExampleBtn').click(function(){
        $.terms({
            data: sampleData,
            full: 'http://example.com/terms',
            audio: false,
            define: true
        }, function () {
            $('#dictionaryExampleSuccess').show();
            $('#dictionaryExampleError').hide();
        }, function () {
            $('#dictionaryExampleError').show();
            $('#dictionaryExampleSuccess').hide();
        });
    });
    $('#translateExampleBtn').click(function(){
        $.terms({
            data: sampleData,
            full: 'http://example.com/terms',
            audio: false,
            yandexKey: 'trnsl.1.1.20141206T164830Z.f00aa34c53f7ec2e.3408b1f36fcb1411a049ea62f83442c724c6c400'
        }, function () {
            $('#translateExampleSuccess').show();
            $('#translateExampleError').hide();
        }, function () {
            $('#translateExampleError').show();
            $('#translateExampleSuccess').hide();
        });
    });
    $('#bootstrapExampleBtn').click(function(e){
        e.preventDefault();
        $.terms({
            data: sampleData,
            full: 'http://example.com/terms', 
            audio: false,
            theme: 'bootstrap'
        }, function () {}, function () {});
    });
    $('#semanticExampleBtn').click(function(e){
        e.preventDefault();
        $.terms({
            data: sampleData,
            full: 'http://example.com/terms',
            audio: false,
            theme: 'semantic'
        }, function () {}, function () {});
    });
    $('#dictationTTSBtn, #dictationRSSBtn').click(function(){
        var service = 'free';
        if($(this).attr('id') == 'dictationRSSBtn'){
            service = './';
        }
        $.terms({
            data: sampleData,
            full: 'http://example.com/terms',
            audio: service
        }, function () {}, function () {});
    });
    $('#ajaxExampleBtn').click(function(){
        $.terms({
            data: 'tos.php',
            full: 'http://example.com/terms',
            audio: false
        }, function () {
            $('#ajaxExampleSuccess').show();
            $('#ajaxExampleError').hide();
        }, function () {
            $('#ajaxExampleError').show();
            $('#ajaxExampleSuccess').hide();
        });
    });
    $('#doc-menu').sticky({
        context: '#doc-content',
        offset: $('#nav').outerHeight() + 20
    });
}); 
function basicSetupOptions(){
    var options = {
        data: [{
            title: "We Use Cookies To Enhance Your Experience",
            desc: "Put some text here indicating why cookies are very very important",
            cat: "cookies"
        }]
    };
    $.terms(options);   
}
function headerExample() {
    $.terms({
        data: sampleData,
        full: 'http://example.com/terms',
        audio: 'free',
        yandexKey: 'trnsl.1.1.20141206T164830Z.f00aa34c53f7ec2e.3408b1f36fcb1411a049ea62f83442c724c6c400',
        theme: 'default',
        define: 'glosbe'
    }, function () {
        alert('You agreed to our terms! Thanks!');
    }, function () {
        alert('We\'re sorry to hear that.. guess there\'s always next time!');
    });
}