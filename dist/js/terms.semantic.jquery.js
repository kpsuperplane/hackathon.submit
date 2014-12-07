$.terms('addTheme', 'semantic', function(settings){
    this.modal = $('<div class="ui modal">'+
                    '<div class="header">'+settings.title+'</div>'+
                    '<div class="content" style="padding-top:10px;">'+
                        '<div class="body" style="margin-bottom:10px;"></div>'+
                        '<div class="'+settings.prefix+'-note"><small>By clicking "I Agree", you accept our terms outlined at <a href="'+settings.full+'">'+settings.full+'</a>. The text shown above is only a summary, and is not legally binding.</small></div>'+
                    '</div>'+
                    '<div class="actions"></div>'+
                    '<div class="ui active inverted dimmer"><div class="ui loader"></div></div>'+
                  '</div>');
    this.title = this.modal.find('.header');
    this.footer = this.modal.find('.actions');
    this.body = this.modal.find('.body');
    this.translate = $('<select class="ui dropdown" name="language-selection" style="margin-left:5px;"></select>');
    this.loader = this.modal.find('.dimmer');
    this.loader.hide();
    this.agreeBtn = $('<div class="ui button primary">I Agree</div>');
    this.rejectBtn = $('<div class="ui button">Cancel</div>');
    this.playBtn = $('<div class="ui button"><i class="fa fa-volume-up fa-fw"></i></div>');
    this.notice = $('<div class="'+settings.prefix+'-yandex">Powered by <a href="http://translate.yandex.com/">Yandex.Translate</a></div>');
    this.footer.append(this.playBtn).append(this.rejectBtn).append(this.agreeBtn); 
    var parent = this;
    this.render = function(data){
        parent.body.html('');
        if($.isArray(data)){
            var wrapper = $('<div class="ui fluid accordion"></div>');
            $.each(data, function(idx, val){
                if(!(val.cat in settings.types)){
                    val.cat = 'misc'; 
                }
                var entry = $('<div class="title"><i class="'+settings.types[val.cat].class+'" style="color:'+settings.types[val.cat].color+'"></i>&nbsp;'+val.title+'</div>');
                wrapper.append(entry);
                if('desc' in val){
                    entry.prepend('<i class="dropdown icon"></i>').after('<div class="content" style="padding-left:22px;"><p>'+val.desc+'</p></div>');
                }
            });
            parent.body.append(wrapper);
            wrapper.accordion('setting','exclusive',false).accordion();
        }
    }
    this.renderTranslate = function(){
        parent.translate.dropdown();
        parent.title.find('.ui.dropdown').css('padding', '0.5em').css('font-size','0.6em').css('margin-left','10px');
    };
    this.modal.appendTo('body'); 
    this.in = function(){
        this.modal.modal({
            duration: settings.animLen,
            closable: false,
            selector: {
                close: '.actions.button',
                approve: ' ',
                deny: ' '
            },
            onHidden: function(){
                parent.modal.remove();   
            }
        }).modal('show');
        setTimeout(function(){
            parent.agreeBtn.focus();
        }, settings.animLen);
    };
    this.out = function(){
        this.modal.modal('hide');
    };
});
$.terms('set','theme','semantic');