$.terms('addTheme', 'bootstrap', function(settings){
    this.modal = $('<div class="bs-modal fade"><div class="bs-modal-dialog"><div class="bs-modal-content">'+
                    '<div class="bs-modal-header"><h4 class="bs-modal-title">'+settings.title+'</h4></div>'+
                    '<div class="bs-modal-body" style="padding-top:10px;">'+
                        '<div class="body" style="margin-bottom:10px;"></div>'+
                        '<div class="'+settings.prefix+'-note"><small>By clicking "I Agree", you accept our terms outlined at <a href="'+settings.full+'">'+settings.full+'</a>. The text shown above is only a summary, and is not legally binding.</small></div>'+
                    '</div>'+
                    '<div class="bs-modal-footer"></div>'+
                    '<div class="'+settings.prefix+'-loader"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'+
                  '</div></div></div>');
    this.title = this.modal.find('.bs-modal-title');
    this.footer = this.modal.find('.bs-modal-footer');
    this.body = this.modal.find('.body');
    this.translate = $('<select style="margin-left:10px;font-size:0.7em;"></select>');
    this.loader = this.modal.find('.'+settings.prefix+'-loader');
    this.loader.hide();
    this.agreeBtn = $('<button class="btn btn-primary">I Agree</button>');
    this.rejectBtn = $('<button class="btn btn-default">Cancel</button>');
    this.playBtn = $('<button class="btn btn-default"><i class="fa fa-volume-up fa-fw"></i></button>');
    this.notice = $('<div class="'+settings.prefix+'-yandex">Powered by <a href="http://translate.yandex.com/">Yandex.Translate</a></div>');
    this.footer.append(this.playBtn).append(this.rejectBtn).append(this.agreeBtn); 
    var parent = this;
    this.render = function(data){
        parent.body.html('');
        if($.isArray(data)){
            var wrapper = $('<div class="panel-group" id="termsCollapse"></div>');
            var i = 0;
            $.each(data, function(idx, val){
                if(!(val.cat in settings.types)){
                    val.cat = 'misc'; 
                }
                var entry = $('<div class="panel panel-default"><div class="panel-heading" style="padding-left:7px;"><div class="panel-title"><i class="'+settings.types[val.cat].class+'" style="color:'+settings.types[val.cat].color+'"></i>&nbsp;'+val.title+'</div></div></div>');
                wrapper.append(entry);
                if('desc' in val){
                    entry.find('.panel-title').append('<i class="fa-chevron-down fa fa-fw pull-right" style="margin-top:3px;"></i>').wrapInner('<a data-toggle="collapse" style="display:block;text-decoration:none;" href="#termsCollapse'+i+'" aria-controls="termsCollapse'+i+'" class="collapsed nohover"></a>');
                    entry.append('<div class="panel-collapse collapse" id="termsCollapse'+i+'"><div class="panel-body"><p>'+val.desc+'</p></div></div>');
                }
                i++;
            });
            parent.body.append(wrapper);
            wrapper.collapse();
        }
    }
    this.modal.appendTo('body'); 
    this.in = function(){
        this.modal.bootstrapModal('show').on('shown.bs.modal', function (e) {
            parent.agreeBtn.focus();
        });;
    };
    this.out = function(){
        this.modal.bootstrapModal('hide').on('hidden.bs.modal', function (e) {
            parent.modal.remove();
        });
    };
});