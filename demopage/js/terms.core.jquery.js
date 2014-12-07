(function ($){
    var opts = {
        data: [],
        types: {
            cookies: {
                color: '#F29830', //orange 
                class: 'fa fa-cloud fa-fw',
                text: '#FFF'
            },
            rights: {
                color: '#D63636', //red
                class: 'fa fa-flag fa-fw',
                text: '#FFF'
            },
            monetary: {  
                color: '#CDD618', //yellow
                class: 'fa fa-usd fa-fw',
                text: '#FFF'
            },
            misc: {
                color: '#A6A6A6', //grey 
                class: 'fa fa-info fa-fw',
                text: '#FFF'
            },
            privacy: {
                color: '#25B33B', //green
                class: 'fa fa-lock fa-fw',
                text: '#FFF'
            },
            law: {
                color: '#2686D4', //blue
                class: 'fa fa-university fa-fw',
                text: '#FFF'
            }

        },
        title: 'Do You Accept Our Terms?',
        prefix: 'terms',
        animLen: 500,
        full: '',
        define: true,
        lang: 'en',
        audio: 'free',
        langs: [
            {
                code: 'en',
                name: 'English',
                voiceCode: 'us'
            },{
                code: 'fr',
                name: 'Fran&#231;ais',
                voiceCode: 'fr'
            },{
                code: 'it',
                name: 'Italiano',
                voiceCode: 'it'
            },{
                code: 'de',
                name: 'Deutsch',
                voiceCode: 'de'
            },{
                code: 'es',
                name: 'Espa&#241;ol',
                voiceCode: 'es'
            },{
                code: 'ru',
                name: 'P&#1091;&#1089;&#1089;&#1082;&#1080;&#1081;',
                voiceCode: 'ru'
            }
        ],
        theme: 'default',
        yandexKey: false
    };
    var themes = {
        default:function(settings){
            this.overlay = $('<div class="jq-'+settings.prefix+' '+settings.prefix+'-bg out"></div>');
            this.modal = $('<div class="jq-'+settings.prefix+' '+settings.prefix+'-wrapper out">'+
                            '<div class="jq-'+settings.prefix+' '+settings.prefix+'-modal">'+
                                '<div class="'+settings.prefix+'-title">'+settings.title+'</div>'+
                                '<div class="'+settings.prefix+'-body body"></div>'+
                                '<div class="'+settings.prefix+'-note"><small>By clicking "I Agree", you accept our terms outlined at <a href="'+settings.full+'">'+settings.full+'</a>. The text shown above is only a summary, and is not legally binding.</small></div>'+
                                '<div class="'+settings.prefix+'-footer"></div>'+
                                '<div class="'+settings.prefix+'-loader"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'+
                            '</div>'+
                          '</div>');
            this.title = this.modal.find('.'+settings.prefix+'-title');
            this.footer = this.modal.find('.'+settings.prefix+'-footer');
            this.body = this.modal.find('.'+settings.prefix+'-body');
            this.translate = $('<select style="margin-left:5px;font-size:0.7em;"></select>');
            this.loader = this.modal.find('.'+settings.prefix+'-loader');
            this.agreeBtn = $('<button class="'+settings.prefix+'-button highlight">I Agree</button>');
            this.rejectBtn = $('<button class="'+settings.prefix+'-button">Cancel</button>');
            this.playBtn = $('<button class="'+settings.prefix+'-button"><i class="fa fa-volume-up fa-fw"></i></button>');
            this.notice = $('<div class="'+settings.prefix+'-yandex">Powered by <a href="http://translate.yandex.com/">Yandex.Translate</a></div>');
            this.footer.append(this.playBtn).append(this.rejectBtn).append(this.agreeBtn); 
            
            var parent = this;
            this.render = function(data){
                parent.body.html('');
                if($.isArray(data)){
                    $.each(data, function(idx, val){
                        if(!(val.cat in settings.types)){
                            val.cat = 'misc'; 
                        }
                        var entry = $('<div class="'+settings.prefix+'-entry"><div class="'+settings.prefix+'-entry-icon '+settings.types[val.cat].class+'" style="background-color:'+settings.types[val.cat].color+';color:'+settings.types[val.cat].text+'"></div>'+val.title+'</div>');
                        if('desc' in val){
                            var desc = $('<div class="'+settings.prefix+'-desc">'+val.desc+'</div>');
                            entry.append(desc).append('<div class="fa-chevron-down fa fa-fw '+settings.prefix+'-chevron"></div>').addClass('expand').click(function(e){
                                if($(e.target).hasClass(settings.prefix+'-desc')){
                                    return;   
                                }
                                entry.toggleClass('open');
                                desc.stop().slideToggle(settings.animLen/2, function(){
                                    resize();
                                });
                            });
                        }
                        parent.body.append(entry);
                    });
                }
                resize();
            }
            this.modal.appendTo('body'); 
            this.overlay.appendTo('body');
            this.in = function(){ 
                parent.modal.removeClass('out').addClass('in');    
                parent.overlay.removeClass('out').addClass('in');
                setTimeout(function(){
                    parent.agreeBtn.focus();
                }, settings.animLen);
            };
            this.out = function(){
                parent.modal.removeClass('in').addClass('out');    
                parent.overlay.removeClass('in').addClass('out');    
                setTimeout(function(){
                    parent.modal.remove();
                    parent.overlay.remove();
                }, settings.animLen);
            };
            function resize(){
                var calc = $(window).height()/2 - parent.modal.height()/2;
                parent.modal.css('top', calc < 0 ? 0 : calc);
            } 
            $(window).resize(function(){
                resize();
            });
            resize();
        }
    };
    $.terms = function(options, success, fail) {
        
        //--- OPTIONS ---//
        
        if(options == 'set'){
            opts[success] = fail;
            return;
        }
        if(options == 'addTheme'){
            themes[success] = fail;
            return;
        }
        var curOpts = $.extend([], opts);
        var settings = $.extend(curOpts, options);
        
        //--- INIT ---//
        
        var curLang = settings.lang;
        var Theme = themes[settings.theme];
        var termsObj = new Theme(settings);
        var title = termsObj.title;
        var loader = termsObj.loader;
        var body = termsObj.body;
        var footer = termsObj.footer;
        var agreeBtn = termsObj.agreeBtn;
        var rejectBtn = termsObj.rejectBtn;
        var tempSettings = settings.data;
        if(settings.yandexKey){
            var translate = termsObj.translate;
            var notice = termsObj.notice;
            title.append(translate);
            $.each(settings.langs, function(idx, val){
                translate.append('<option value="'+val.code+'"'+(val.code==settings.lang?' selected':'')+'>'+val.name+'</option>');
            });
            if('renderTranslate' in termsObj){
                termsObj.renderTranslate();
            }
            translate.change(function(){
                notice.remove();
                curLang = translate.val();
                if(translate.val() == settings.lang){
                    termsObj.render(settings.data);
                    return;
                }
                body.after(notice);
                var tempData = [];
                $.extend(true, tempData, settings.data);
                var text = '';
                $.each(tempData, function(idx, val){
                    text+= encodeURI("&text="+val.title);
                    if('desc' in val){
                        text+= encodeURI("&text="+val.desc);
                    }
                });
                loader.show();
                $.ajax({
                    url: 'https://translate.yandex.net/api/v1.5/tr.json/translate?key='+settings.yandexKey+'&lang='+settings.lang+'-'+translate.val()+text,
                    jsonp: "callback",
                    dataType: "jsonp",
                    success: function(translateData) {
                        var i = 0;
                        $.each(tempData, function(idx, val){
                            tempData[idx].title = translateData.text[i];
                            i++;
                            if('desc' in val){
                                tempData[idx].desc = translateData.text[i];
                                i++;
                            }
                        });
                        tempSettings = tempData;
                        termsObj.render(tempData);
                        loader.hide();
                    }
                });
            });
        }
        
        //--- DATA ---//
        
        if($.isArray(settings.data)){
            termsObj.render(settings.data);
        }else{
            termsObj.loader.show();
            $.getJSON(settings.data, function(data){
                settings.data = data;
                termsObj.loader.hide();
                termsObj.render(settings.data);
                tempSettings = data;
            });
        }
        
        //--- ANIMATION & ACTIONS ---//
        
        var audioDetect = document.createElement('audio');
        if(!!(audioDetect.canPlayType && audioDetect.canPlayType('audio/mpeg;').replace(/no/, '')) && settings.audio){
            var audioPlayer = null;
            termsObj.playBtn.click(function(e){
                e.preventDefault();
                var output = "";
                var i = 1;
                $.each(tempSettings, function(idx, val){
                    output += i+", "+val.title+", ,";
                    i++;
                });
                termsObj.playBtn.find('i').removeClass('fa-volume-up').addClass('fa-refresh fa-spin');
                if(settings.audio == 'free'){
                    audioPlayer = new Audio('http://tts-api.com/tts.mp3?q='+encodeURI(output));
                }else{
                    var curLangAudio = 'us';
                    for(var i = 0; i < settings.langs.length; i++){
                        if(settings.langs[i].code == curLang){
                            curLangAudio = settings.langs[i].voiceCode;
                            break;
                        }
                    }
                    audioPlayer = new Audio(settings.audio+'voicerrs.php?lang='+curLang+'-'+curLangAudio+'&text='+encodeURI(output));
                }
                audioPlayer.addEventListener('canplaythrough', function() { 
                    audioPlayer.play();
                    termsObj.playBtn.find('i').addClass('fa-volume-up').removeClass('fa-refresh fa-spin');
                }, false);
            });
        }else{
            termsObj.playBtn.remove();
        }
        //Selection code by @Tim Down from http://stackoverflow.com/questions/4712310/javascript-how-to-detect-if-a-word-is-highlighted and http://stackoverflow.com/questions/6846230/coordinates-of-selected-text-in-browser-page
        function getSelectionCoords() {
            var sel = document.selection, range, rects, rect;
            var x = 0, y = 0;
            if (sel) {
                if (sel.type != "Control") {
                    range = sel.createRange();
                    range.collapse(true);
                    x = range.boundingLeft;
                    y = range.boundingTop;
                }
            } else if (window.getSelection) {
                sel = window.getSelection();
                if (sel.rangeCount) {
                    range = sel.getRangeAt(0).cloneRange();
                    if (range.getClientRects) {
                        range.collapse(true);
                        rects = range.getClientRects();
                        if (rects.length > 0) {
                            rect = range.getClientRects()[0];
                        }
                        x = rect.left;
                        y = rect.top;
                    }
                    // Fall back to inserting a temporary element
                    if (x == 0 && y == 0) {
                        var span = document.createElement("span");
                        if (span.getClientRects) {
                            // Ensure span has dimensions and position by
                            // adding a zero-width space character
                            span.appendChild( document.createTextNode("\u200b") );
                            range.insertNode(span);
                            rect = span.getClientRects()[0];
                            x = rect.left;
                            y = rect.top;
                            var spanParent = span.parentNode;
                            spanParent.removeChild(span);

                            // Glue any broken text nodes back together
                            spanParent.normalize();
                        }
                    }
                }
            }
            return { x: x, y: y };
        }
        if(settings.define){
            $(document).on('mouseup', function(e){
                if(!$(e.target).hasClass(settings.prefix+'-tooltip') && $(e.target).closest('.'+settings.prefix+'-tooltip').length == 0){
                    $('.'+settings.prefix+'-tooltip').remove(); 
                }
            });
            termsObj.modal.on('mouseup', '.body', function(){
                var text = "";
                if (window.getSelection) {
                    text = window.getSelection().toString();
                } else if (document.selection && document.selection.type != "Control") {
                    text = document.selection.createRange().text;
                }
                text = $.trim(text);
                if(text != ''){
                    setTimeout(function(){
                        var location = getSelectionCoords();
                        var tooltip = $('<div class="'+settings.prefix+'-tooltip">Loading...</div>');
                        $('body').append(tooltip);
                        tooltip.css('top', location.y + 25).css('left', location.x - 5);
                        if(settings.define == 'wikipedia'){
                            $.ajax({
                                url: 'http://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles='+encodeURI(text),
                                jsonp: "callback",
                                dataType: "jsonp",
                                success: function(definedData) {
                                    tooltip.text('');
                                    $('.'+settings.prefix+'-tooltip').not(tooltip).remove(); 
                                    var i = 1;
                                    $.each(definedData.query.pages, function(idx, val){
                                        console.log(val);
                                        tooltip.append('<p>'+val.extract+'</p>');
                                        i++;
                                        return false;
                                    });
                                    if(i == 1){
                                        tooltip.text("N/A");
                                    }
                                    tooltip.append('<div><em>Definition by <a href="https://wikipedia.com" target="_blank">Wikipedia</a></em></div>');
                                }
                            });
                        }else{
                            $.ajax({
                                url: 'https://glosbe.com/gapi/translate?from='+curLang+'&dest='+curLang+'&format=json&phrase='+encodeURI(text),
                                jsonp: "callback",
                                dataType: "jsonp",
                                success: function(definedData) {
                                    tooltip.text('');
                                    $('.'+settings.prefix+'-tooltip').not(tooltip).remove(); 
                                    var i = 1;
                                    if('tuc' in definedData){
                                        var ddx = -1;
                                        for(var x = 0; x < definedData.tuc.length; x++){
                                            if('meanings' in definedData.tuc[x]){
                                                ddx = x;
                                                break;    
                                            }
                                        }
                                        if(ddx != -1){
                                            var exists = {};
                                            $.each(definedData.tuc[ddx].meanings, function(idx, val){
                                                if(!(val.text in exists)){
                                                    tooltip.append('<p><strong>'+i+'. </strong>'+val.text+'</p>');
                                                    i++;
                                                    exists[val.text] = true;
                                                    if(i > 4){
                                                        return false;   
                                                    }
                                                }
                                            });
                                        }
                                    }
                                    if(i == 1){
                                        tooltip.text("N/A");
                                    }
                                    tooltip.append('<div><em>Definition by <a href="https://glosbe.com" target="_blank">Globse</a></em></div>');
                                }
                            });
                        }
                    }, 1);
                }
            });
        }
        setTimeout(function(){
            termsObj.in();
        }, 1);
        agreeBtn.click(function(){
            if(typeof success == 'function'){
                success();   
                termsObj.out();
            }
        });
        rejectBtn.click(function(){
            if(typeof fail == 'function'){
                fail();   
                termsObj.out();
            }
        });
        agreeBtn.add(rejectBtn).click(function(){
            termsObj.out();
        });
        return true;
    };
}(jQuery));