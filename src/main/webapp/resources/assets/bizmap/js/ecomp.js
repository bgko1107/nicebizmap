
/******************************
 * 에코마케팅 스크립트
 ******************************/
var EchoID = "bizmap";
var EchoGoodNm = "";
var EchoAmount = "";
var EchoUIP = "";
var EchoTarget = "";
var EchoLogSend = "Y";
var EchoCV = "";
var EchoPN = "";


var ELogLevel = {
    ERROR   : 40,
    WARNING : 30,
    INFO    : 20,
    TEST    : 10,
    DEBUG   : 1,
    ALL     : 999
};

var ELog = function(level, outter) {
    var _level = level || ELogLevel.DEBUG,
        _outter = outter || 'alert';

    var elog = {
        write : function(msg, level) {
            level = (typeof level == 'undefined') ? ELogLevel.ALL : level;
            if(_level <= level) {
                if(_outter == 'alert') alert(msg);
                else _outter.innerHTML += msg;
            }
        },

        writeln : function(msg, level) {
            level = (typeof level == 'undefined') ? ELogLevel.ALL : level;
            if(_level <= level) {
                if(_outter == 'alert') alert(msg);
                else _outter.innerHTML += msg + '<br>';
            }
        }
    };

    return elog;
};

var PageNavi = function(conf) {
    if(!conf.totRowCount) return;
    conf.pageRowCount = conf.pageRowCount || 10;
    conf.groupPerCount = conf.groupPerCount || 10;

    var pageCnt = parseInt(conf.totRowCount/conf.pageRowCount) + ((conf.totRowCount%conf.pageRowCount > 0) ? 1 : 0),
        pageNo = ((conf.pageNo <= 0) ? 1 : (conf.pageNo > pageCnt) ? pageCnt : conf.pageNo),
        grpCnt = parseInt(pageCnt/conf.groupPerCount) + ((pageCnt%conf.groupPerCount > 0) ? 1 : 0),
        curGrp = parseInt(pageNo/conf.groupPerCount) + ((pageNo%conf.groupPerCount > 0) ? 1 : 0),
        sPage = conf.groupPerCount * (curGrp-1) + 1,
        ePage = sPage + pageCnt%conf.groupPerCount - 1,
        navi = $(conf.navi);

    if(curGrp < grpCnt) {
        sPage = sPage + parseInt((pageNo - sPage)/2) - (curGrp > 1 && (parseInt((pageNo - sPage)/2) == 0 && sPage >= conf.groupPerCount) ? parseInt(conf.groupPerCount/2):0);
        ePage = sPage + ((pageCnt < curGrp*conf.groupPerCount) ? pageCnt%conf.groupPerCount : conf.groupPerCount) - 1;
    } else if(curGrp > 1) {
        ePage = sPage + pageCnt%conf.groupPerCount - 1;
        sPage = ePage - conf.groupPerCount;
    }

    var goPage = function(no) {
        conf.form.page_no.value = no;
        conf.form.submit();
    };

    $(conf.form).find('[name=page_row_count]').bind('change', function() {
        conf.form.page_no.value = 1;
        conf.form.submit();
    });

    if(pageNo == 1) {
        $('<span class="e-pagenavi-first"><img src="../images/icon/list_first.gif" style="vertical-align:middle;"></span>').appendTo(navi).css({
            filter : 'alpha(opacity=40)',
            opacity : 0.4
        });
        navi.append('&nbsp;');

        $('<span class="e-pagenavi-prev"><img src="../images/icon/list_prev.gif" style="vertical-align:middle;"></span>').appendTo(navi).css({
            filter : 'alpha(opacity=40)',
            opacity : 0.4
        });
        navi.append('&nbsp;');
    } else {
        $(' <span class="e-pagenavi-first"><img src="../images/icon/list_first.gif" style="vertical-align:middle;"></span> ').appendTo(navi).bind('click', function() {
            goPage(1)
        }).css({
            cursor:'hand'
        });
        navi.append('&nbsp;');

        $(' <span class="e-pagenavi-prev"><img src="../images/icon/list_prev.gif" style="vertical-align:middle;"></span> ').appendTo(navi).bind('click', function() {
            goPage(pageNo - 1)
        }).css({
            cursor:'hand'
        });
        navi.append('&nbsp;');
    }

    for(var i = sPage; i <= ePage; i++) {
        if(i > sPage) navi.append(' / ');

        if(pageNo == i) {
            $('<span class="e-pagenavi-page">' + i + '</span>').appendTo(navi).css({
                fontColor : 'red',
                filter : 'alpha(opacity=40)',
                opacity : 0.4
            });
        } else {
            $('<span pageNo="' + i + '" class="e-pagenavi-page">' + i + '</span>').appendTo(navi).bind('click', function() {
                goPage($(this).attr('pageNo'));
            }).css({
                cursor:'hand'
            });
        }
    }

    if(curGrp >= grpCnt && pageNo == ePage) {
        navi.append('&nbsp;');
        $('<span class="e-pagenavi-next"><img src="../images/icon/list_next.gif" style="vertical-align:middle;"></span>').appendTo(navi).css({
            filter : 'alpha(opacity=40)',
            opacity : 0.4
        });
    } else {
        navi.append('&nbsp;');
        $('<span class="e-pagenavi-next"><img src="../images/icon/list_next.gif" style="vertical-align:middle;"></span>').appendTo(navi).bind('click', function() {
            goPage(pageNo + 1)
        }).css({
            cursor:'hand'
        });
    }

    if(pageNo == pageCnt) {
        navi.append('&nbsp;');
        $('<span class="e-pagenavi-last"><img src="../images/icon/list_last.gif" style="vertical-align:middle;"></span>').appendTo(navi).css({
            filter : 'alpha(opacity=40)',
            opacity : 0.4
        });
    } else {
        navi.append('&nbsp;');
        $('<span class="e-pagenavi-last"><img src="../images/icon/list_last.gif" style="vertical-align:middle;"></span>').appendTo(navi).bind('click', function() {
            goPage(pageCnt)
        }).css({
            cursor:'hand'
        });
    }
};

var OrderBy = function(conf) {
    var tokens = conf.orderby.split(' ');
    $(conf.expr).each(function() {
        var oby = $(this).attr('orderby');
        if(!oby) return;

        //var obyTkn = oby.split(' ');
        if(oby == tokens[0]) {
            if(tokens[1] == 'asc') $(this).addClass('e-orderby-asc');
            else if(tokens[1] == 'desc') $(this).addClass('e-orderby-desc');
            oby = oby + ((tokens[1] == 'asc') ? ' desc' : ' asc');
        } else {
            $(this).removeClass('e-orderby-asc e-orderby-desc');
            oby = oby + ' ' + tokens[1];
        }

        $(this).bind('click', function() {
            conf.form.orderby.value = oby;
            conf.form.submit();
        }).css('cursor','hand');
    });
};

var EFormMsg = {
    alert : function(msg) {
        alert(msg);
    },

    out : function(msg) {
        var token = msg.match(/\$[^{}\s]+|\{[^}]+\}/g);

        if(!token) {
            var argNo = 1, text = msg;
            while(EFormMsg.out.arguments.length > argNo) {
                if(text.search(/#@/) >= 0) {
                    text = text.replace(/#@/, EFormMsg.out.arguments[argNo]);
                }
                argNo++;
            }
            alert(text);
        } else {
            if(token.length >= 2) {
                var expr = (token[0].charAt(0) == '$') ? token[1].replace(/[{}]/g,'') : token[0].replace(/[{}]/g,''),
                    key = (token[0].charAt(0) == '$') ? token[0].substring(1) : token[1].substring(1),
                    argNo = 1,
                    text = this.getMsg(key);

                while(EFormMsg.out.arguments.length > argNo) {
                    if(text.search(/#@/) >= 0) {
                        text = text.replace(/#@/, EFormMsg.out.arguments[argNo]);
                    }
                    argNo++;
                }

                $(expr).html(text);
            } else {
                alert(EFormMsg.out.arguments[0] + ':' + EFormMsg.out.arguments[1] + ':' + token[0]);
                if(token[0].charAt(0) == '$') {
                    var argNo = 1,
                        text = this.getMsg(token[0].substring(1));
                    alert(token[0].substring(1));
                    while(EFormMsg.out.arguments.length > argNo) {
                        if(text.search(/#@/) >= 0) {
                            text = text.replace(/#@/, EFormMsg.out.arguments[argNo]);
                        }
                        argNo++;
                    }
                    alert(text);
                } else {
                    var expr = token[0].replace(/[{}]/g,''),
                        text = msg.replace(/\{[^}]+\}/g,'');

                    $(expr).html(text);
                }
            }
        }
    },

    getMsg : function(key) {
        if(typeof this.messages == 'undefined') return '';
        return this.messages[key];
    },

    putMsg : function(key, value) {
        if(typeof this.messages == 'undefined')
            this.messages = {};

        this.messages[key] = value;
    },

    RequiredMsg : '값을 입력하세요.',

    NumberMsg : '숫자만 입력하세요.',

    AlphaMsg : '영문자만 사용가능 합니다.',

    HanMsg : '한글만 사용가능 합니다.',

    MinMsg : '최소 #@자이상 입력하셔야 합니다.',

    MaxMsg : '최대 #@자이하 입력하셔야 합니다.',

    LengthMsg : '#@자리로 입력하셔야 합니다.'
};

var EComp = function() {
    var _q = [], // 큐
        _b = {}, // 버퍼
        _c = {}, // component
        _d = {}, // json data
        _id = 0, // id
        _init = false,
        ing = false;

    var makeId = function() {
        return 'e' + (++_id);
    };

    var checkName = function(name) {
        return typeof name == 'string' && name.length > 0;
    };

    var jQuering = function(expr) {
        // position 속성으로 위치지정.
        $(expr).find('[position]').poser();

        $(expr).find('form').form().each(function() {
            if(_d.form_init && typeof _d.form_init[this.name] != 'undefined') {
                this.setInit(_d.form_init[this.name]);
            }
        });

        $(expr).find('[event]').eEvent();

        $(expr).find('[actexpr]').acting();

        if($.draggable)
            $(expr).find('[common*=draggable]').draggable();
    };

    var load = function(sync) {
        if(_q.length == 0) return;

        if(ing) return;
        ing = true;

        var d = _q.shift();

        // key는 반드시 입력되어야 한다. 그리고 1번만 load되도록 한다.
        if(checkName(d.key) && typeof _b[d.key] == 'undefined') {
            switch(d.type) {
                case 'css' :
                    ing = false;
                    $('<link rel="stylesheet" type="text/css" href="' + d.url + '">').appendTo(document.body);
                    _b[d.key] = d;
                    load(sync);
                break;

                case 'script' :
                    $.getScript('/xga/util/ecompScript.jsp?host=' + location.host + '&url=' + d.url, function(data, status) {
                        ing = false;
                        if(sync && ($.trim(data).length == 0 || status != 'success')) {
                            _q = [];
                            return;
                        }

                        _b[d.key] = d;
                        load(sync);
                    });
                break;

                case 'url' :
                    $(d.selector).load(d.url, d.data, function(res, status) {
                        ing = false;
                        if(sync && ($.trim(res).length == 0 || status != 'success')) {
                            _q = [];
                            return;
                        }

                        try {
                            jQuering(d.selector);
                        } catch(e) {
                            EComp.log.writeln(e.message, ELogLevel.WARNING);
                        }

                        _b[d.key] = d;
                        load(sync);
                    });
                break;

                default :
                    d.data = d.data || {};
                    d.data.host = location.host;
                    d.data.url = d.url;

                    switch(d.type) {
                        case 'html' :
                            $(d.selector).load('/xga/util/ecompHTML.jsp', d.data, function(res, status) {
                                ing = false;
                                if(sync && ($.trim(res).length == 0 || status != 'success')) {
                                    _q = [];
                                    return;
                                }

                                try {
                                    jQuering(d.selector);
                                } catch(e) {
                                    EComp.log.writeln(e.message, ELogLevel.WARNING);
                                }

                                _b[d.key] = d;
                                load(sync);
                            });
                        break;

                        case 'json' :
                            $.getJSON('/xga/util/ecompJSON.jsp', d.data, function(value, status) {
                                ing = false;
                                if(status == 'success') {
                                    _d[d.key] = value;
                                    _b[d.key] = d;
                                } else if(sync) {
                                    _q = [];
                                    return;
                                }

                                load(sync);
                            });
                        break;

                        case 'template' :
                            $.getJSON('/xga/util/ecompJSON.jsp', d.data, function(value, status) {
                                ing = false;
                                if(status == 'success') {
                                    for(var v in value)
                                        $(v).replaceWith(value[v]);

                                    $('form').each(function() {
                                        if(_d.form_init && typeof _d.form_init[this.name] != 'undefined') {
                                            this.set(_d.form_init[this.name]);
                                        }
                                    });
                                } else if(sync) {
                                    _q = [];
                                    return;
                                }

                                load(sync);
                            });
                        break;
                    }
                break;
            }
        } else ing = false;
    };

    var exec = function() {
        if(_q.length == 0) return;

        if(ing) return;
        ing = true;

        var d = _q.shift();

        try {
            switch(d.type) {
                case 'jdom' :
                    if(checkName(d.name)) {
                        d.id = makeId();
                        _d[d.key][d.name].apply(this, [d]);
                    }
                break;
            }
        } catch(e) {
            EComp.log.writeln(e.message, ELogLevel.ERROR);
        }

        ing = false;
        exec();
    };

    var ec = {
        log : ELog(ELogLevel.DEBUG),

        load : function(data, sync) {
            sync = sync || false;
            _q.push(data);
            load(sync);
            return this;
        },

        exec : function(data) {
            _q.push(data);
            exec();
            return this;
        },

        call : function(cmd) {
            if(_d.command)
                _d.command[cmd].call();
        },

        clear : function(key) {
            delete _b[key];
            return this;
        },

        get : function(key, cmd) {
            return _d[key][cmd];
        },

        put : function(key, cmd, func) {
            if(_d[key]) {
                _d[key][cmd] = func;
            } else {
                _d[key] = {};
                _d[key][cmd] = func;
            }
            return this;
        },

        init : function(conf) {
            if(!_init) {
                conf = (typeof conf == 'string') ? { compExpr : conf } : conf;
                if(conf) {
                    if(conf.type == 'list') {
                        if(conf.orderbyExpr) {
                            new OrderBy({
                                expr : conf.orderbyExpr,
                                form : conf.form,
                                orderby : conf.orderby
                            });
                        }

                        if(conf.naviExpr) {
                            new PageNavi({
                                navi : conf.naviExpr,
                                form : conf.form,
                                totRowCount : conf.totRowCount,
                                pageNo : conf.pageNo,
                                pageRowCount : conf.pageRowCount
                            });
                        }
                    }

                    conf.compExpr = conf.compExpr || 'body';
                } else conf = { compExpr : 'body' };

                jQuering(conf.compExpr);

                if(typeof conf.submit == 'function') {
                    conf.form.addFunc(function() {
                        if(conf.submit(conf.form)) return true;
                        return false;
                    });
                }

                _init = true;
            }

            return this;
        }
    };

    return ec;
}();

jQuery.extend({
    className: {
        // internal only, use addClass("class")
        add: function( elem, classNames ) {
            jQuery.each((classNames || "").split(/\s+/), function(i, className){
                if ( elem.nodeType == 1 && !jQuery.className.has( elem.className, className ) )
                    elem.className += (elem.className ? " " : "") + className;
            });
        },

        // internal only, use removeClass("class")
        remove: function( elem, classNames ) {
            if (elem.nodeType == 1)
                elem.className = classNames != undefined ?
                    jQuery.grep(elem.className.split(/\s+/), function(className){
                        return !jQuery.className.has( classNames, className );
                    }).join(" ") :
                    "";
        },

        // internal only, use is(".class")
        has: function( elem, className ) {
            return jQuery.inArray( className, (elem.className || elem).toString().split(/\s+/) ) > -1;
        }
    },

    // A method for quickly swapping in/out CSS properties to get correct calculations
    swapCss: function( elem, options, callback ) {
        var old = {};
        // Remember the old values, and insert the new ones
        for ( var name in options ) {
            old[ name ] = elem.style[ name ];
            elem.style[ name ] = options[ name ];
        }

        callback.call( elem );

        // Revert the old values
        for ( var name in options )
            elem.style[ name ] = old[ name ];
    }
});

$.extend($.fn, {
    swapClass: function(c1, c2) {
        return this.each(function() {
            var $this = $(this);
            if ( $.className.has(this, c1) )
                $this.removeClass(c1).addClass(c2);
            else if ( $.className.has(this, c2) )
                $this.removeClass(c2).addClass(c1);
        });
    },

    replaceClass: function(c1, c2) {
        return this.each(function() {
            if ( $.className.has(this, c1) )
                $(this).removeClass(c1).addClass(c2);
        });
    }
});

(function($) {
    $.fn.form = function(command) {
        var validTag = 'input,textarea,select,img,a',
            checkFunc = {},
            procBox = undefined,
            addCheckFunc = function(name, func) {
                if(typeof checkFunc[name] == 'undefined')
                    checkFunc[name] = [];
                checkFunc[name][checkFunc[name].length] = func;
            };

        this.each(function() {
            var self = $(this),
                formDom = this;

            this.set = function(name, value) {
                var _setParam = function(_name, _value) {
                    var child = self.find('[name=' + _name + ']');
                    if(child.length > 0) child.val(_value);
                    else formDom.add(_name, _value);
                };

                if(typeof value == 'undefined' && typeof name == 'object') {
                    for(var n in name)
                        _setParam(n, name[n]);
                } else _setParam(name, value);
            };

            this.add = function(name, value) {
                self.append('<input type="hidden" name="' + name + '" value="' + value + '">');
            };

            this.remove = function(name, excluder) {
                if(typeof name == 'undefined')
                    self.empty();
                else {
                    if (typeof excluder != 'undefined')
                        self.find('[name=' + name + ']').not(excluder).remove();
                    else self.find('[name=' + name + ']').remove();
                }
            };

            this.procBox = function(expr) {
                if(typeof expr == 'undefined')
                    return procBox;
                procBox = $(expr);
            };

            this.addFunc = function(func) {
                var name = self.attr('name');
                if(typeof checkFunc[name] == 'undefined')
                    checkFunc[name] = [];

                checkFunc[name][checkFunc[name].length] = func;
            };

            this.setInit = function(params) {
                for(var p in params) {
                    self.find('[name=' + p + ']').each(function(index) {
                        switch(this.tagName.toLowerCase()) {
                            case 'input' :
                                switch(this.type.toLowerCase()) {
                                    case 'checkbox' :
                                    case 'radio' :
                                        var vs = params[p].split(',');
                                        for(var i = 0; i < vs.length; i++) {
                                            if(this.value == $.trim(vs[i])) {
                                                this.checked = true;
                                                return;
                                            }
                                        }
                                    break;
                                    case 'text' :
                                        this.value = params[p];
                                    break;
                                }
                            break;
                            case 'select' :
                                if($.isArray(params[p])) {
                                    for(var i = 0; i < this.options.length; i++) {
                                        for(var j = 0; j < params[p].length; j++) {
                                            if(this.options[i].value == params[p][j]) {
                                                this.options[i].selected = true;
                                                break;
                                            }
                                        }
                                    }
                                } else {
                                    this.value = params[p];
                                }
                            break;
                        }
                    });
                }
            };

            self.submit(function() {
                if(typeof checkFunc[this.name] != 'undefined') {
                    for(var i = 0; i < checkFunc[this.name].length; i++)
                        if(!checkFunc[this.name][i].call()) return false;
                }
                var r = true;
                if(typeof command == 'function')
                    r = command.call();
                if(r && procBox) procBox.show();
                return r;
            });

            self.find(validTag).each(function() {
                var element = $(this),
                    dom = this,
                    form = element.parents('form'),
                    fName = form.length ? form.get(0).name : '',
                    cond = element.attr('cond');

                if(cond) {
                    cond = cond.split(';');
                    $(cond).each(function() {
                        var tokens = this.split(':');

                        switch(tokens[0]) {
                            case 'req' :
                                element.addClass('e-input-required');
                                addCheckFunc(fName, function() {
                                    if(element.val().length == 0) {
                                        EFormMsg.out(tokens[1] || EFormMsg.RequiredMsg);
                                        element.focus();
                                        return false;
                                    }

                                    return true;
                                });
                            break;

                            case 'num' :
                                addCheckFunc(fName, function() {
                                    if(element.val().length > 0) {
                                        if(isNaN(element.val())) {
                                            EFormMsg.out(tokens[1] || EFormMsg.NumberMsg);
                                            element.focus();
                                            return false;
                                        }
                                    }

                                    return true;
                                });

                                element.bind('keyup', function(event) {
                                    if (element.val().length > 0 && isNaN(element.val())) {
                                        EFormMsg.out(tokens[1] || EFormMsg.NumberMsg);
                                        element.val(element.val().replace(/[^0-9.]/g,''));
                                    }
                                });
                            break;

                            case 'alpha' :
                                addCheckFunc(fName, function() {
                                    if(element.val().length > 0) {
                                        if(element.val().search(/[^a-zA-Z]/) >= 0) {
                                            EFormMsg.out(tokens[1] || EFormMsg.AlphaMsg);
                                            element.focus();
                                            return false;
                                        }
                                    }

                                    return true;
                                });

                                element.bind('keydown', function(event) {
                                    if ("8,9,16,17,18,27".indexOf(event.keyCode) != -1) {
                                        return;
                                    } else if (event.keyCode < 65 || event.keyCode > 90) {
                                        //event.preventDefault();
                                        //event.stopPropagation();
                                        element.val(element.val().replace(/[^a-zA-Z]/g,''));
                                        EFormMsg.out(tokens[1] || EFormMsg.AlphaMsg);
                                    }
                                }).bind('keyup', function(event) {
                                    element.val(element.val().replace(/[^a-zA-Z]/g,''));
                                });
                            break;

                            case 'han' :
                                element.bind('keydown', function(event) {
                                    if ("8,9,16,17,18,27".indexOf(event.keyCode) != -1) {
                                        return;
                                    } else if (event.keyCode != 229) {
                                        //event.preventDefault();
                                        //event.stopPropagation();
                                        EFormMsg.out(tokens[1] || EFormMsg.HanMsg);
                                    }
                                });
                            break;

                            case 'notHan' :
                                element.bind('keydown', function(event) {
                                    if ("8,9,16,17,18,27".indexOf(event.keyCode) != -1) {
                                        return;
                                    } else if(event.keyCode == 229) {
                                        //event.preventDefault();
                                        //event.stopPropagation();
                                        EFormMsg.alert('영문/숫자와 일부특수문자[!@#$%^&*()_+=-]만 허용됩니다');
                                    }
                                }).bind('keyup', function(event) {
                                    element.val(element.val().replace(/[^!@#$%\^&*()_+=\-0-9a-zA-Z]/g,''));
                                });
                            break;

                            case 'submit' :
                                var eNm = 'click';
                                if(dom.tagName.search(/select/i) != -1)
                                    eNm = 'change';

                                if(tokens[1]) procBox = $(tokens[1]);

                                element.bind(eNm, function() {
                                    form.trigger('submit');
                                });
                            break;

                            case 'reset' :
                                element.bind('click', function() {
                                    form.get(0).reset();
                                });
                            break;

                            case 'ref' :
                                addCheckFunc(fName, function() {
                                    var ref = element.parents('form').find('[name=' + tokens[1] + ']');
                                    if(element.val().length == 0 && ref.val().length > 0) {
                                        EFormMsg.out(tokens[2] || EFormMsg.RequiredMsg);
                                        element.focus();
                                        return false;
                                    }

                                    return true;
                                });
                            break;

                            default :
                                if(tokens[0].indexOf('min[') == 0) {
                                    addCheckFunc(fName, function() {
                                        var len = tokens[0].replace(/[^0-9]/g,'');
                                        if(element.val().length < len) {
                                            EFormMsg.out(tokens[1] || EFormMsg.MinMsg, len);
                                            element.focus();
                                            return false;
                                        }
                                        return true;
                                    });
                                } else if(tokens[0].indexOf('max[') == 0) {
                                    var len = tokens[0].replace(/[^0-9]/g,'');
                                    element.attr('maxlength',len);
                                    addCheckFunc(fName, function() {
                                        if(element.val().length > len) {
                                            EFormMsg.out(tokens[1] || EFormMsg.MaxMsg, len);
                                            element.focus();
                                            return false;
                                        }
                                        return true;
                                    });
                                } else if(tokens[0].indexOf('len[') == 0) {
                                    var len = tokens[0].replace(/[^0-9]/g,'');
                                    element.attr('maxlength',len);
                                    addCheckFunc(fName, function() {
                                        if(element.val().length > 0 && element.val().length != len) {
                                            EFormMsg.out(tokens[1] || EFormMsg.LengthMsg, len);
                                            element.focus();
                                            return false;
                                        }
                                        return true;
                                    });
                                };
                            break;
                        }
                    });
                }
            });
        });

        if(typeof command == 'string') {
            if(EComp) {
                var tokens = command.split(':'),
                    expr = tokens[1].split('.'),
                    func = EComp.get(expr[0], expr[1]);

                if(typeof func == 'function') {
                    EComp.put(expr[0], expr[1], function() {
                        for(var i = 0; i < checkFunc.length; i++)
                            if(!checkFunc[i].call()) return;

                        func.call();
                    });
                }
            }
        }

        return this;
    };

    $.fn.poser = function(expr, px, py, resized) {
        var self = $(this);

        if(self.attr('position')) {
            pos = self.attr('position').split(',');
            expr = expr || pos[0];
            px = px || pos[1];
            py = py || pos[2];
            resized = resized || pos[3];
        }

        if(!expr) return;

        var parent = (expr == 'window') ? {
            offset : function() { return { top : $('html').scrollTop(), left : $('html').scrollLeft() }; },
            innerWidth : function() { return $('html').width() },
            innerHeight : function() { return $('html').height() }
        } : $(expr);

        var posing = function() {
            var so = self.offset(),
                sw = self.innerWidth(),
                sh = self.innerHeight(),
                display = self.css('display'),
                left = 0,
                top = 0;
                po = parent.offset(),
                pw = parent.innerWidth(),
                ph = parent.innerHeight(),

            self.css('display','none');

            var x = ((typeof px == 'undefined') ? 'right:0' : ((typeof px != 'string') ? 'right:'+px : px)).split(':');
            if(x.length == 1 && typeof x[0] == 'string') x[1] = 0;
            if(x.length > 1) {
                var xin = (x.length > 2) ? true : false,
                    d = parseInt((x.length == 2) ? x[1] : x[2],10);

                if(x[0] == 'center')
                    left = po.left + parseInt((pw - sw)/2 + d,10);
                else if(x[0] == 'right')
                    left = po.left + pw + ((xin) ? -1*(sw+d) : d);
                else if(x[0] == 'left')
                    left = po.left + ((xin) ? d : -1*(sw+d));
            } else {
                left = x[0];
            }

            var y = ((typeof py == 'undefined') ? 'bottom:0' : ((typeof py != 'string') ? 'bottom:'+py : py)).split(':');
            if(y.length == 1 && typeof y[0] == 'string') y[1] = 0;
            if(y.length > 1) {
                var yin = (y.length > 2) ? true : false,
                    d = parseInt((y.length == 2) ? y[1] : y[2],10);

                if(y[0] == 'center')
                    top = po.top + parseInt((ph - sh)/2 + d,10);
                else if(y[0] == 'top')
                    top = po.top + ((yin) ? -1*(sh+d) : d);
                else if(y[0] == 'bottom')
                    top = po.top + ph + ((yin) ? -1*(sh+d) : d);
            } else {
                top = y[0];
            }

            self.css({
                position : 'absolute',
                left : left,
                top : top,
                display : display
            });
        }

        if(resized) {
            $(window).resize(function() {
                posing();
            });

            posing();
            return this;
        } else {
            posing();
            return this;
        }
    };

    $.fn.acting = function(actExpr) {
        var self = $(this),
            actExpr = actExpr || self.attr('actexpr');

        if(!actExpr) return;

        actExpr = actExpr.split(';');
        if(actExpr.length > 0) {
            self.bind('click', function() {
                var exprs = actExpr[0].split('|');
                $(exprs).each(function() {
                    var expr = this + '';
                    if(expr.length > 0)
                        $(expr).show();
                });

                if(actExpr.length >= 2) {
                    exprs = actExpr[1].split('|');
                    $(exprs).each(function() {
                        var expr = this + '';
                        if(expr.length > 0)
                            $(expr).hide();
                    });

                    if(actExpr.length >= 3) {
                        exprs = actExpr[2].split('|');
                        $(exprs).each(function() {
                            var expr = this + '';
                            if(expr.length > 0)
                                $(expr).toggle();
                        });
                    }
                }
            });
        }
    };

    $.fn.eEvent = function() {
        var self = $(this),
            e = self.attr('event');

        if(!e) return;

        $(e.split(';')).each(function() {
            var tokens = this.split(':');

            if(tokens.length > 1) {
                var expr = tokens[1].split('.');

                self.bind(tokens[0], function() {
                    _d[expr[0]][expr[1]].call();
                });
            }
        });
    };

    $.fn.barchart = function(option) {
        var cnf = {'selector':'.odd', 'type':'horizontal', 'size':'10', 'color':{'child':'#33CCFF','last':'#FF8533'}, 'click':true};
        var sum = parseFloat(this.parents('table').attr('sum')),
            option = option || {};

        for (var k in cnf)
            option[k] = (typeof option[k] == 'undefined') ? cnf[k] : option[k];

        this.find(option.selector).each(function() {
            var child = $(this),
                value = parseFloat(child.html()),
                title = value + '(' + parseInt(value/sum*100, 10) + '%)',
                width = (option.type == 'vertical') ?
                    ((!!option.size) ? option.size : parseInt(child.width()/2, 10)) :
                    parseInt(value/sum*child.width(),10),
                height = (option.type == 'vertical') ?
                    ((sum == 0) ? 0 : parseInt(value/sum*child.height(),10)) :
                    ((!!option.size) ? option.size : parseInt(child.height()/2, 10));

            child.html('<span class="e-barchart-value">' + title + '</span>').children().css('display','none');

            var align = (option.type == 'vertical') ? 'center' : 'left';
            $('<hr noshade class="e-barchart-bar" align=' + align + '>').appendTo(child)
                .attr('title', title)
                .css({'width':width,'height':height, 'text-align':(option.type == 'vertical') ? 'center' : 'left', color:option.color.child});

            if (!!option.color.last) {
                if ($(this).parent().find('td:last').get(0) == this && option.type == 'vertical') {
                    child.find('hr').css({color : option.color.last});
                } else if ($(this).parent().parent().find('td:last').get(0) == this && option.type == 'horizontal') {
                    child.find('hr').css({color : option.color.last});
                }
            }
        });

        if (option['click']) {
            this.parents('table').bind('click', function() {
                $(this).find('.e-barchart-bar').toggle();
                $(this).find('.e-barchart-value').toggle();
            });
        }

        return this;
    };

    $.fn.eLink = function() {
        var link = this.attr('elink');

        if(link) {
            this.bind('click', function() {
                switch(typeof link) {
                    case 'string' :
                        location.href = link;
                    break;
                }
            });
        }
    };

    $.fn.excel = function (func) {
        var body   = $(this).parents('body'),
            frm    = $('form[name=excelForm]'),
            iframe = $('iframe[name=excelIframe]'),
            html   = frm.find('textarea[name=html]');

        if (frm.length < 1) {
            body = $('body');
            frm = $('<form name=excelForm></form>')
                    .attr({
                        'target':'excelIframe',
                        'method':'post',
                        'action':'/util/excelDown.jsp'
                    }).appendTo(body);
            iframe = $('<iframe name=excelIframe></iframe>')
                    .attr({
                        'width'      :0,
                        'height'     :0,
                        'frameborder':0
                    }).appendTo(body);
        } else {
            frm.form().get(0).remove();
        }

        this.each(function() {
            this.setUrl = function(cUrl) {
                frm.attr({'action':cUrl});
            };

            this.set = function(name, value) {
                frm.form().get(0).set(name, value);
            };

            this.remove = function(name, excluder) {
                frm.form().get(0).remove(name, excluder);
            };

            this.setHtml = function(dataExpr) {
                var clone = $(dataExpr).clone();

                $(':checkbox',clone).remove();
                $('img',clone).remove();
                $('a',clone).removeAttr('href');

                if (html.length < 1) {
                    $('<textarea name=html></textarea>')
                        .text(encodeURIComponent(clone.html()))
                        .css('display','none')
                        .appendTo(frm);
                } else {
                    html.text(encodeURIComponent(clone.html()));
                }
            };
        });

        $.extend(this, {
            submit : function() {
                frm.form().submit();
                frm.form().remove();
            }
        });

        return this;
    };

    $.fn.franExtra_excel = function (func) {
        var body   = $(this).parents('body'),
            frm    = $('form[name=excelForm]'),
            iframe = $('iframe[name=excelIframe]'),
            html   = frm.find('textarea[name=html]');

        if (frm.length < 1) {
            body = $('body');
            frm = $('<form name=excelForm></form>')
                    .attr({
                        'target':'excelIframe',
                        'method':'post',
                        'action':'/util/excelDown_franExtra.jsp'
                    }).appendTo(body);
            iframe = $('<iframe name=excelIframe></iframe>')
                    .attr({
                        'width'      :0,
                        'height'     :0,
                        'frameborder':0
                    }).appendTo(body);
        } else {
            frm.form().get(0).remove();
        }

        this.each(function() {
            this.setUrl = function(cUrl) {
                frm.attr({'action':cUrl});
            };

            this.set = function(name, value) {
                frm.form().get(0).set(name, value);
            };

            this.remove = function(name, excluder) {
                frm.form().get(0).remove(name, excluder);
            };

            this.setHtml = function(dataExpr) {
                var clone = $(dataExpr).clone();

                $(':checkbox',clone).remove();
                $('img',clone).remove();
                $('a',clone).removeAttr('href');

                if (html.length < 1) {
                    $('<textarea name=html></textarea>')
                        .text(encodeURIComponent(clone.html()))
                        .css('display','none')
                        .appendTo(frm);
                } else {
                    html.text(encodeURIComponent(clone.html()));
                }
            };
        });

        $.extend(this, {
            submit : function() {
                frm.form().submit();
                frm.form().remove();
            }
        });

        return this;
    };

    $.fn.excelExtract = function (func) {
        var body   = $(this).parents('body'),
            frm    = $('form[name=excelForm]'),
            iframe = $('iframe[name=excelIframe]'),
            html   = frm.find('textarea[name=html]');

        if (frm.length < 1) {
            body = $('body');
            frm = $('<form name=excelForm></form>')
                    .attr({
                        'target':'excelIframe',
                        'method':'post',
                        'action':'/util/excelDown_NswerG.jsp'
                    }).appendTo(body);
            iframe = $('<iframe name=excelIframe></iframe>')
                    .attr({
                        'width'      :0,
                        'height'     :0,
                        'frameborder':0
                    }).appendTo(body);
        } else {
            frm.form().get(0).remove();
        }

        this.each(function() {
            this.setUrl = function(cUrl) {
                frm.attr({'action':cUrl});
            };

            this.set = function(name, value) {
                frm.form().get(0).set(name, value);
            };

            this.remove = function(name, excluder) {
                frm.form().get(0).remove(name, excluder);
            };

            this.setHtml = function(dataExpr) {
                var clone = $(dataExpr).clone();

                $(':checkbox',clone).remove();
                $('img',clone).remove();
                $('a',clone).removeAttr('href');

                if (html.length < 1) {
                    $('<textarea name=html></textarea>')
                        .text(encodeURIComponent(clone.html()))
                        .css('display','none')
                        .appendTo(frm);
                } else {
                    html.text(encodeURIComponent(clone.html()));
                }
            };
        });

        $.extend(this, {
            submit : function() {
                frm.form().submit();
                frm.form().remove();
            }
        });

        return this;
    };

    $.fn.excelwhocomes = function (func) {
        var body   = $(this).parents('body'),
            frm    = $('form[name=excelForm]'),
            iframe = $('iframe[name=excelIframe]'),
            html   = frm.find('textarea[name=html]');

        if (frm.length < 1) {
            body = $('body');
            frm = $('<form name=excelForm></form>')
                    .attr({
                        'target':'excelIframe',
                        'method':'post',
                        'action':'/util/excelDown_whocomes.jsp'
                    }).appendTo(body);
            iframe = $('<iframe name=excelIframe></iframe>')
                    .attr({
                        'width'      :0,
                        'height'     :0,
                        'frameborder':0
                    }).appendTo(body);
        } else {
            frm.form().get(0).remove();
        }

        this.each(function() {
            this.setUrl = function(cUrl) {
                frm.attr({'action':cUrl});
            };

            this.set = function(name, value) {
                frm.form().get(0).set(name, value);
            };

            this.remove = function(name, excluder) {
                frm.form().get(0).remove(name, excluder);
            };

            this.setHtml = function(dataExpr) {
                var clone = $(dataExpr).clone();

                $(':checkbox',clone).remove();
                $('img',clone).remove();
                $('a',clone).removeAttr('href');

                if (html.length < 1) {
                    $('<textarea name=html></textarea>')
                        .text(encodeURIComponent(clone.html()))
                        .css('display','none')
                        .appendTo(frm);
                } else {
                    html.text(encodeURIComponent(clone.html()));
                }
            };
        });

        $.extend(this, {
            submit : function() {
                frm.form().submit();
                frm.form().remove();
            }
        });

        return this;
    };

    $.fn.texts = function () {
        var body   = $(this).parents('body'),
            frm    = $('form[name=textForm]'),
            iframe = $('iframe[name=textsIframe]'),
            html   = frm.find('textarea[name=html]');
        if (frm.length < 1) {
            frm = $('<form name=textForm></form>')
                    .attr({
                        'target':'textIframe',
                        'method':'post',
                        'action':'../util/textDown.jsp'
                    }).appendTo(body);
            $('<iframe name=textIframe></iframe>')
                    .attr({
                        'height'     :100,
                        'frameborder':0
                    }).appendTo(body);
        } else {
            frm.form().get(0).remove();
        }
        this.each(function() {
            this.setUrl = function(cUrl) {
                frm.attr({'action':cUrl});
            };

            this.set = function(name, value) {
                frm.form().get(0).set(name, value);
            };

            this.remove = function(name, excluder) {
                frm.form().get(0).remove(name, excluder);
            };

            this.setHtml = function(dataExpr) {
                var clone = $(dataExpr).clone();

                $(':checkbox',clone).remove();
                $('img',clone).remove();
                $('a',clone).removeAttr('href');

                if (html.length < 1) {
                    $('<textarea name=html></textarea>')
                        .text(encodeURIComponent(clone.html()))
                        .css('display','none')
                        .appendTo(frm);
                } else {
                    html.text(encodeURIComponent(clone.html()));
                }
            };

            $(this).submit(function() {
                frm.form().submit();
            });
        });

        return this;
    };

    $.fn.combo = function (conf) {
        var tagName = this.attr('tagName') == undefined ? this.prop('tagName') : this.attr('tagName'),
            node = this.get(0);

        conf.preProc = conf.preProc || function() { return true; };
        conf.params = conf.params || '';

        if (tagName.search(RegExp('select','i')) == -1) return false;

        function add(text, value, clss, centerX, centerY, branch_cd, zone_cd, gil_main_no, gil_atch_no ,index) {
            var opt = document.createElement('option');
            opt.text = text;
            opt.value = value;
            if(typeof clss != 'undefined' && clss != 'undefined') opt.clss = clss;
            if(typeof centerX != 'undefined' && centerX != 'undefined') opt.centerX = centerX;
            if(typeof centerY != 'undefined' && centerY != 'undefined') opt.centerY = centerY;
            if(typeof branch_cd != 'undefined' && branch_cd != 'undefined') opt.branch_cd = branch_cd;
            if(typeof zone_cd != 'undefined') opt.zone_cd = zone_cd;
            if(typeof gil_main_no != 'undefined' && gil_main_no != 'undefined') opt.gil_main_no = gil_main_no;
            if(typeof gil_atch_no != 'undefined' && gil_atch_no != 'undefined') opt.gil_atch_no = gil_atch_no;
            node.options.add(opt, (typeof index == 'undefined') ? 0 : index);

        }

        function delByValue(value, isBreak) {
            isBreak = (typeof isBreak == 'undefined') ? false : isBreak;
            for (var i = node.options.length - 1; i >= 0; i--) {
                if (node.options[i].value == value) {
                    node.options.remove(i);
                    if (isBreak) break;
                }
            }
        }

        function delByText(text, isBreak) {
            isBreak = (typeof isBreak == 'undefined') ? false : isBreak;
            for (var i = node.options.length - 1; i >= 0; i--) {
                if (node.options[i].text == text) {
                    node.options.remove(i);
                    if (isBreak) break;
                }
            }
        }

        function select(value) {
            for (var i = 0; i < node.options.length; i++) {
                if (node.options[i].value == value) {
                    node.selectedIndex = i;
                    this.change();
                    break;
                }
            }
        }

        function initSet() {
            if (!!conf.firstOption)
                add(conf.firstOption[0], conf.firstOption[1], 0);

            if (typeof conf.initValue != 'undefined') {
                $(node).children().each(function(idx) {
                    if ($(this).val() == conf.initValue) {
                        $(this).parent().get(0).selectedIndex = idx;
                        $(this).trigger('change');
                    }
                });
            } else node.selectedIndex = 0;
        }

        this.change(function() {
            if (!conf.preProc(node)) return;
            if (!conf.nextExpr) return;
           
            var prevName = $(this).attr('name'),
                prevValue = $(this).val(),
                index = $(this).get(0).selectedIndex,
                index2 = $(this).selectedIndex,
                prevName_2 = 'zone_cd',
                prevValue_2 = $(this).get(0).options[index].zone_cd;
            
            if(prevName == '') {
            	prevName = $(this).attr('id');
            }
            
            $(conf.nextExpr).each(function() {
                this.conf.prevValue = prevValue;
                this.setParam(prevName, prevValue);
                if (typeof prevValue_2 != 'undefined') {
                	this.setParam(prevName_2, prevValue_2);
                }
                this.init();
            });
        });

        this.each(function() {
            var obj = this;
            this.conf = conf;

            this.init = function(conf) {
                conf = conf || this.conf;

                $(this).children().remove();

                if (conf.prevValue == '')
                    initSet();
                else if (!!conf.url) {
                    $.post(conf.url, conf.params,
                    function(data, status) {
                        if (status != 'success') return;

                        obj.xml = data;

                        var xPath = conf.xPath.split('/').join(' ');
                        $(xPath,data).each(function(i) {
                            var text      = $(this).attr('text'),
                                value     = $(this).attr('value'),
                                clss	  = $(this).attr('clss'),
                                centerX	  = $(this).attr('centerX'),
                                centerY	  = $(this).attr('centerY'),
                                branch_cd = $(this).attr('branch_cd'),
                                zone_cd	  = $(this).attr('zone_cd'),
                                gil_main_no  = $(this).attr('gil_main_no'),
                                gil_atch_no  = $(this).attr('gil_atch_no');

                            
                            if (!!conf.column) {

                                text      = (!!conf.column.text) ? decodeURIComponent($(this).attr(conf.column.text)) : decodeURIComponent($(this).attr('text'));
                                value     = (!!conf.column.value) ? decodeURIComponent($(this).attr(conf.column.value)) : decodeURIComponent($(this).attr('value'));
                                clss      = (!!conf.column.clss) ? decodeURIComponent($(this).attr(conf.column.clss)) : decodeURIComponent($(this).attr('clss'));
                                centerX   = (!!conf.column.centerX) ? decodeURIComponent($(this).attr(conf.column.centerX)) : decodeURIComponent($(this).attr('centerX'));
                                centerY   = (!!conf.column.centerY) ? decodeURIComponent($(this).attr(conf.column.centerY)) : decodeURIComponent($(this).attr('centerY'));
                                branch_cd = (!!conf.column.branch_cd) ? decodeURIComponent($(this).attr(conf.column.branch_cd)) : decodeURIComponent($(this).attr('branch_cd'));
                                zone_cd   = (!!conf.column.zone_cd) ? decodeURIComponent($(this).attr(conf.column.zone_cd)) : decodeURIComponent($(this).attr('zone_cd'));
                                gil_main_no   = (!!conf.column.gil_main_no) ? decodeURIComponent($(this).attr(conf.column.gil_main_no)) : decodeURIComponent($(this).attr('gil_main_no'));
                                gil_atch_no   = (!!conf.column.gil_atch_no) ? decodeURIComponent($(this).attr(conf.column.gil_atch_no)) : decodeURIComponent($(this).attr('gil_atch_no'));
                            }

                            add(text, value, clss, centerX, centerY, branch_cd, zone_cd, gil_main_no, gil_atch_no, i);
                        });
                        initSet();
                    }, 'xml');
                } else if (!!conf.data) {
                    for (var i = 0; i < conf.data.length; i++)
                        add(conf.data[i][0], conf.data[i][1], i);

                    initSet();
                }
            };

            this.setParam = function(name, value) {
                var conf = conf || this.conf;

                if (typeof name == 'string')
                    conf.params[name] = value;
                else {
                    for (var k in name)
                        conf.params[k] = name[k];
                }
                this.conf = conf;
            };

            this.delParam = function(name) {
                var conf = conf || this.conf;

                if (typeof name == 'string')
                    delete conf.params[name];
                else if (!!name.length) {
                    for (var i = 0; i < name.length; i++)
                        delete conf.params[name[i]];
                }
                this.conf = conf;
            };

            this.delByValue = function(value, isBreak) {
                delByValue(value, isBreak);
            };

            this.delByText = function(text, isBreak) {
                delByText(text, isBreak);
            };

            this.select = function(value) {
                select(value);
            };
        });

        if (!!conf.load) {
            this.get(0).init(conf);
        }

        return this;
    };

    $.fn.read = function(conf) {
        if (!!!window['__read'])
            window['__read'] = [];

        var self = $(this),
            tar = window['__read'],
            cnf = {
                index   : 0,
                cUrl    : '',
                cParam  : {},
                cPath   : '',
                cType   : 'html',
                before  : function() {},
                after   : function(data) { return data; }
            };

        conf['before']();

        if (typeof conf['index'] != 'undefined' && conf['index'] < tar.length) {
            var obj = tar[conf.index];
            if (!!!conf.skip && typeof obj != 'undefined' && $.param(obj.param) == $.param(conf['cParam'])) {
                var data = conf['after'](obj.data);

                if (data.length > 0)
                    self.html(data);

                if(!!conf.afterFunc) conf.afterFunc();
                return;
            }
        }

        if (conf['cUrl'].length < 1)
            return;

        for (var k in cnf)
            conf[k] = (typeof conf[k] != 'undefined') ? conf[k] : cnf[k];

        this.each(function() {
            this.conf = conf;

            var tObj = this;

            this.setParam = function(name, value) {
                conf.cParam[name] = value;
                this.conf = conf;
            };

            $(this).ajaxError(function(event, XMLHttpRequest, ajaxOptions, thrownError) {
                if (!!window._debug_)
                    alert('read()\n\nstatus number : ' + XMLHttpRequest.status + '\n\n' + XMLHttpRequest.responseText);
            });

            $.post(conf['cUrl'], conf['cParam'],
            function(data, status) {
                if (status != 'success') return;

                tar[conf.index] = {
                    param   : $.extend({}, conf['cParam']),
                    data    : data
                };

                var rData = conf['after'](data);
                if (rData.length > 0)
                    self.html(rData);

                if(!!conf.afterFunc) conf.afterFunc();
            }, conf['cType']);
        });

        return this;
    };

    $.fn.tree = function(conf) {
        var isRun = false;

        var cnf = {
            'root'      : {'code':0,'name':'Root Text'},
            'color'     : ['#DDDDDD','#EEEEEE',''], // click, mouseover, mouseout
            'init'      : {'code':['28','2826','28260575']}, // column name : value1,value2,value3...
            'text'      : 'name', // text로 표시할 column name
            'endlevel'  : 3, // 마지막 표시 level
            'url'       : 'http://xgs2.openmate.co.kr/xga/service/util/readData.jsp', // call url
            'click'     : function() { // click event
                var info = this.parentInfo();
                for (var i = 0; i < info.length; i++) {
                    var obj = info[i], tmp = [];
                    for (var k in obj)
                        tmp.push(k + ' : ' + obj[k]);
                    alert(tmp.join('\n'));
                }
            },
            'params'    : {'readType':'json','LF':'xga.base','LID':'bTree','SID':'rTree'} // call url params
        };

        var Icon = {
            root        : '../images/tree/base.gif',
            empty       : '../images/tree/empty.gif',
            line        : '../images/tree/line.gif',
            cross       : '../images/tree/cross.gif',
            end         : '../images/tree/end.gif',
            minus       : '../images/tree/minus.gif',
            plus        : '../images/tree/plus.gif',
            rootMinus   : '../images/tree/end-minus-nl.gif',
            rootPlus    : '../images/tree/end-plus-nl.gif',
            endMinus    : '../images/tree/end-minus.gif',
            endPlus     : '../images/tree/end-plus.gif',
            ing         : '../images/tree/ing.gif'
        };

        if (typeof conf.icon != 'undefined') {
            for (var k in Icon)
                Icon[k] = conf.icon[k] || Icon[k];
        }

        var treeInit = function(obj) {
            if (isRun) {
                setTimeout(function() {treeInit(obj);}, 10);
                return;
            }

            isRun = true;
            var conf = obj.conf,
                init = conf.init,
                param = obj.conf.params,
                level = $(obj).attr('level'),
                load = parseInt($(obj).attr('load'));

            if (load == 1) return;

            // attributes 를 모두 값으로 보냄
            for (var i = 0; i < obj.attributes.length; i++) {
                var nm = obj.attributes[i].nodeName,
                    vl = obj.attributes[i].nodeValue;

                if (typeof vl == 'string' && vl.length > 0)
                    param[nm] = vl;
            }

            if (typeof level == 'undefined') {
                param.level = 1;
                $(obj).attr({'root':'1'}); // 하위에서 부모 구분을 위한것
            } else param.level = parseInt(level) + 1;

            // 보여지는 레벨 지정된 것까지만
            if (param.level > conf.endlevel) return;

            if (!!window.debug)
                alert($.param(param).replace(/&/g, '\n'));

            if (!!conf.url) {
                // 로딩 이미지 변경
                var img = $(obj).children('img[plus]');
                imgIng(img, 1);

                $.post(conf.url, param,
                function(data, status) {
                    var sid = param.SID;

                    if (!!data.error) {
                        alert(data.error);
                        return;
                    }

                    if (param.level == 1) $(obj).empty();

                    // 로드와 확장 지정
                    $(obj).attr({'load':'1','expand':'1'});

                    // 루트 데이터 지정
                    if (conf.root && param.level == 1) {
                        addRoot(obj, conf);
                    }

                    // 서브 데이터 지정
                    for (var i = 0; i < data[sid].length; i++) {
                        var isEnd = (param.level == conf.endlevel) ? 1 : 0,
                            isLeaf = (i == data[sid].length - 1) ? 1 : 0,
                            attrChk = data[sid][i];

                        if (!!attrChk.end && attrChk.end == 1)
                            isEnd = 1;

                        addSub(obj, conf.text, data[sid][i], param.level, isEnd, isLeaf);
                    }

                    // 초기화 값 로드
                    if (typeof init != 'undefined' && typeof init == 'object' && param.level == 1) {
                        setInit(obj, init);
                    }

                    // 포커스 이동
                    setFocus(obj);

                    isRun = false;

                    // 로딩 이미지 변경
                    imgIng(img);

                    // 만약 서브가 없을 경우 이미지 변경
                    if (data[sid].length == 0)
                        imgEndChange(img);

                    // 처음 로딩때 데이터가 없을 경우
                    if (data[sid].length == 0 && param.level == 1)
                        alert('검색된 데이터가 없습니다.');
                }, 'json');
            }
        };

        // 루트 데이터 추가
        var addRoot = function(obj, conf) {
            var div = $('<div></div>')
                .css({margin:0})
                .attr(conf.root).each(function() {
                    this.conf = obj.conf;
                }).appendTo($(obj));

            $('<img src=' + Icon.root + ' align=absmiddle>')
                .each(function() {
                    this.parentInfo = function() { return []; };

                    $(this).bind('click', function() {
                        conf.click.apply(this);
                    });
                }).appendTo(div);

            var txt = conf.root[conf.text],
                root = $(obj).parents().find('[root=1]'),
                rootObj = root.get(0);
            $('<a href=# style="font-size:12px;">' + txt + '</a>')
                .bind('mouseover', function() {
                    if (rootObj.selectObj != this)
                        $(this).css({'background':conf.color[1] + ' none repeat scroll 0 0'});
                }).bind('mouseout', function() {
                    if (rootObj.selectObj != this)
                        $(this).css({'background':conf.color[2]});
                }).click(function() {
                    $(this).prev('img').click();

                    $(this).css({'background':conf.color[0] + ' none repeat scroll 0 0'});
                    $(rootObj.selectObj).css({'background':''});
                    rootObj.selectObj = this;
                }).appendTo(div);
        };

        // 서브 데이터 추가
        var addSub = function(obj, text, value, level, isEnd, isLeaf) {
            var conf = obj.conf,
                param = obj.conf.params,
                txt = value[text];

            value.load = '0';
            value.level = level;
            var div = $('<div leaf=' + isLeaf + ' expand=0></div>')
                .css({margin:0})
                .attr(value).each(function() {
                    this.conf = obj.conf;
                }).each(function() {
                    // 자신 포함 부모정보 가져오기
                    this.parentInfo = function() {
                        var level = $(this).attr('level'),
                            par = $(this).parent(),
                            self = this;

                        var info = [];
                        while (true) {
                            var param = {};

                            for (var i = 0; i < self.attributes.length; i++) {
                                var nm = self.attributes[i].nodeName,
                                    vl = self.attributes[i].nodeValue;

                                if (typeof vl == 'string' && vl.length > 0)
                                    param[nm] = vl;
                            }

                            info.push(param);

                            if (level == 1) break;

                            level = par.attr('level');
                            self = par.get(0);

                            par = par.parent();
                        }

                        return info.reverse();
                    };
                }).appendTo($(obj));

            var isNext = $(obj).next().length, st = {};
            if (level > 1) {
                var par, leaf = parseInt($(obj).attr('leaf')), lvl = parseInt($(obj).attr('level'));

                for (var i = lvl; i > 0; i--) {
                    st[lvl] = leaf;

                    par = (par || $(obj)).parent(),
                    leaf = parseInt(par.attr('leaf'));
                    lvl = parseInt(par.attr('level'));

                    if (isNaN(lvl)) lvl = 0;
                }
            }

            for (var i = 1; i < level; i++) {
                div.append($('<img src=' + ((st[i] == 1) ? Icon.empty : Icon.line) + ' align=absmiddle>'));
            }

            var icon = isEnd ? (isLeaf ? 'end' : 'cross') : (isLeaf ? 'endPlus' : 'plus');
            $('<img src=' + Icon[icon] + ' plus=1 leaf=' + isLeaf + ' end=' + isEnd + ' align=absmiddle>')
                .css('cursor','pointer')
                .click(function() {
                    var sub = $(this).parent().children('div'),
                        isPlus = parseInt($(this).attr('plus')),
                        isLeaf = parseInt($(this).attr('leaf')),
                        isEnd = parseInt($(this).attr('end')),
                        isExpand = parseInt($(this).parent().attr('expand'));

                    var obj = $(this).parent().get(0);
                    conf.click.apply(obj);

                    if (isEnd) return;

                    $(this).attr('plus', isPlus ? 0 : 1);
                    $(this).parent().attr('expand', isExpand ? 0 : 1);

                    if (isPlus) {
                        this.src = Icon[isLeaf ? 'endMinus' : 'minus'];
                        sub.show();
                    } else {
                        this.src = Icon[isLeaf ? 'endPlus' : 'plus'];
                        sub.hide();
                    }

                    if (sub.length) return;

                    treeInit(obj);
                }).appendTo(div);

            var root = $(obj).parents().find('[root=1]'),
                rootObj = root.get(0);
            $('<a href=# style="font-size:12px;">' + txt + '</a>')
                .bind('mouseover', function() {
                    if (rootObj.selectObj != this)
                        $(this).css({'background':conf.color[1] + ' none repeat scroll 0 0'});
                }).bind('mouseout', function() {
                    if (rootObj.selectObj != this)
                        $(this).css({'background':conf.color[2]});
                }).click(function() {
                    $(this).prev('img').click();

                    $(this).css({'background':conf.color[0] + ' none repeat scroll 0 0'});
                    $(rootObj.selectObj).css({'background':''});
                    rootObj.selectObj = this;
                }).appendTo(div);
        };

        // 초기화일경우 재귀 함수
        var setInit = function(obj, init) {
            if (init.length == 0)
                return;

            if (!!isRun) { // 로드 대기
                setTimeout(function() { setInit(obj, init); }, 10);
                return;
            }

            var column = [];
            for (var col in init) {
                if (typeof init[col].length == 'undefined') {
                    alert('초기화 값이 배열이 아닙니다.');
                    break;
                }

                column.push(col);
            }

            var root = $(obj).parents().find('[root=1]');
            for (var i = 0; i < column.length; i++) {
                var col = column[i],
                    val = init[col];

                for (var j = 0; j < val.length; j++) {
                    var div = root.find('div[load=0][' + col + '=' + val[j] + ']'),
                        img = div.children('img[plus]').click();

                    init[col] = val.slice(j + 1);
                    if (val.length > 0) {
                        setInit(obj, init);
                    }
                    break;
                }
            }

            return;
        };

        // 트리 확장, 축소
        var expand = function(obj, collapse) {
            var root = $(obj).parents().find('[root=1][id=' + obj.id + ']'),
                div = root.find('div[load=1][expand=' + collapse + ']'),
                img = div.children('img[plus]').click();
        };

        // 선택된 트리 a link focus
        var setFocus = function(obj) {
            var root = $(obj).parents().find('[root=1][id=' + obj.id + ']'),
                rootObj = root.get(0);

            try {
                if (root.length)
                    rootObj.scrollTop = obj.offsetTop - 10
            } catch(e) {}
        };

        // 선택된 트리 div object 반환
        var getSelectedObject = function(obj) {
            var root = $(obj).parents().find('[root=1][id=' + obj.id + ']'),
                rootObj = root.get(0);

            return (root.length) ?
                (typeof rootObj.selectObj != 'undefined') ? $(rootObj.selectObj).parent().get(0) : obj
                : obj;
        };

        // 로딩 이미지 변경
        var imgIng = function(img, isIng) {
            if (img.length == 0) return;

            if (!!isIng) img.attr({'src':Icon.ing});
            else {
                var isLeaf = parseInt(img.attr('leaf'))
                img.attr({'src': isLeaf ? Icon.endMinus : Icon.minus});
            }
        };

        // 로딩후 서브 데이터가 없을 경우 이미지 변경
        var imgEndChange = function(img) {
            if (img.length == 0) return;

            var isLeaf = parseInt(img.attr('leaf'))

            img.attr({'end':'1','src': isLeaf ? Icon.end : Icon.cross});
        };

        // 특정 값 트리 리로딩
        var reloadByValue = function(obj, name, value) {
            var root = $(obj).parents().find('[root=1][id=' + obj.id + ']'),
                findDiv = root.find('div[' + name + '=' + value + ']'),
                findImg = findDiv.children('img[end]'),
                isLeaf = parseInt(findImg.attr('leaf'));

            if (findDiv.length == 0 || findImg.length == 0)
                return false;

            findDiv.attr({'load':'0'});
            findImg.attr({'end':'0','plus':'0','src': isLeaf ? Icon.endPlus : Icon.plus});
            findImg.nextAll('div').remove();

            findImg.click();

            return true;
        };

        this.each(function() {
            var self = this;

            this.conf = conf;

            this.collapse = function() {
                expand(self, 1);
            };

            this.expand = function() {
                expand(self, 0);
            };

            this.getSelected = function() {
                return getSelectedObject(self);
            };

            this.reloadByValue = function(name, value) {
                return reloadByValue(self, name, value);
            };

            treeInit(self);
        });

        return this;
    };

    $.fn.tab = function(conf) {
        var imgEndName = conf.imgEndName || ['on','off','over'],
            imgExt = conf.imgExt || 'gif',
            imgPath = conf.imgPath + '/' || '',
            size = conf.size || [0,0],
            item = conf.item || [],
            self = this;

        self.children().remove();
        var table = $('<table width="100%" cellspacing="0" cellpadding="0"><tr></tr></table>'),
            target = table.children().find('tr');

        var tabEvent = {
            click : function() {
                var idx = $(this).attr('idx'),
                    src = $(this).attr('src'),
                    onImg = $('img[click=1][idx]');

                if (parseInt(onImg.attr('click'))) {
                    var onImgSrc = onImg.attr('src');

                    onImgSrc = onImgSrc.replace(/_on./ig, '_off.');
                    onImg.attr({'click':0,'src':onImgSrc});
                    onImg.parent().removeClass('tab_on').addClass('tab_off');
                }

                src = src.replace(/_off.|_over./ig, '_on.');

                $(this).attr({'click':1,'src':src});
                $(this).parent().removeClass('tab_off').addClass('tab_on');
                conf.item[idx].click();
            },

            over : function() {
                var idx = $(this).attr('idx'),
                    src = $(this).attr('src'),
                    flag = parseInt($(this).attr('click'));

                if (!flag) {
                    src = src.replace(/_off./ig, '_over.');
                    $(this).attr({'src':src});
                }
            },

            out : function() {
                var idx = $(this).attr('idx'),
                    src = $(this).attr('src'),
                    flag = parseInt($(this).attr('click'));

                if (!flag) {
                    src = src.replace(/_over./ig, '_off.');
                    $(this).attr({'src':src});
                }
            }
        };

        for (var i = 0, src = '', tab = ''; i < conf.item.length; i++) {
            src = imgPath + conf.item[i].src + (i == 0 ? conf.imgEndName[0] : conf.imgEndName[1]) + '.' + conf.imgExt;
            tab = $('<td width="' + size[0] + '" height="' + size[1] + '" align="center" valign="center"><img src=' + src + '></td>').addClass('tab_off');

            tab.children().css({'cursor':'pointer'}).attr({'idx':i})
                .click(tabEvent.click)
                .bind('mouseover',tabEvent.over)
                .bind('mouseout',tabEvent.out);

            target.append(tab);

            if (i == 0)
                tab.addClass('tab_left').children().trigger('click');

            if (i == conf.item.length -1) {
                tab = $('<td width="*">&nbsp;</td>').addClass('tab_off').addClass('tab_right');
                target.append(tab);
            }
        }

        self.append(table);

        $.extend(this, {
            active : function(idx) {
                var tabs = table.children().find('td'),
                    tab = $(tabs.get(idx));

                tab.trigger('click');
            }
        });

        return this;
    };

    $.fn.pageNavi = function(conf) {
        var cnf = {
            'goPage' : function(conf) {},
            'cPage' : 1, // 현재 페이지
            'gPage' : 7, // 페이지 표시 최대 개수
            'dRow' : 10, // 한화면당 표시 row
            'tRow' : 234 // 전체 row
        };

        var navi = this;

        var util = {
            calculation : function(conf) {

                conf.cPage = conf.cPage || 1;
                conf.gPage = conf.gPage || 10;
                conf.tRow  = conf.tRow || 1;
                conf.dRow  = conf.dRow || 10;

                var grpCnt = (conf.cPage > conf.dRow) ? parseInt(conf.cPage / conf.dRow) + 1 : 1;

                var ret = $.extend({}, conf, {

                    'tPage' : parseInt(conf.tRow / conf.dRow) + ((conf.tRow % conf.dRow > 0) ? 1 : 0),
                    'sPage' : parseInt(conf.cPage / conf.gPage),
                    'ePage' : 0
                })
                ret.sPage = parseInt(ret.cPage % ret.gPage) == 0 ? ((ret.sPage - 1) * ret.gPage) + 1 : (ret.sPage * ret.gPage) + 1;
                ret.ePage = ret.sPage + ret.gPage - 1;
                ret.ePage = (ret.ePage > ret.tPage) ? ret.tPage : ret.ePage;
                ret.ePage = ret.ePage == 0 ? 1 : ret.ePage;
                ret.tPage = ret.tPage == 0 ? 1 : ret.tPage;

                return ret;
            },

            goPage : function(cPage) {
                return conf.goPage({
                    'tRow' : conf.tRow,
                    'dRow' : conf.dRow,
                    'cPage' : cPage
                });
            }
        };

        var init = function(conf) {
            var pCnf = util.calculation(conf);

            var css_default = {'opacity':0.4,'verticalAlign':'middle','fontWeight':'bold','color':'#A7A7A7'},
                css_hand    = {'opacity':1,'cursor':'pointer','verticalAlign':'middle','fontWeight':'bold'},
                img_first   = $('<a href="javascript:;"><img name="first" src="/images/navi/ngn_left_02.gif" alt="처음페이지로이동"></a>').css(css_default),//130705
                img_prev    = $('<a href="javascript:;"><img name="prev" src="/images/navi/ngn_left_01.gif" alt="이전페이지로이동"></a>').css(css_default),//130705
                img_next    = $('<a href="javascript:;"><img name="next" src="/images/navi/ngn_right_01.gif" alt="다음페이지로이동"></a>').css(css_default),//130705
                img_last    = $('<a href="javascript:;"><img name="last" src="/images/navi/ngn_right_02.gif" alt="마지막페이지로이동"></a>').css(css_default);//130705

            navi.append(img_first).append('&nbsp;').append(img_prev).append('&nbsp;');

            if (pCnf.cPage != 1) {
                img_first.bind('click', function() { util.goPage(1); }).css(css_hand);//130705
                img_prev.bind('click', function() { util.goPage(parseInt(pCnf.cPage,10) - 1); }).css(css_hand);//130705
            }

            for (var i = pCnf.sPage; i <= pCnf.ePage; i++) {
                if (i > pCnf.sPage) navi.append(' <span class="pageNavi" style="color:#A7A7A7;font-size:10px;">|</span> ');

                if (pCnf.cPage == i)
                    $('<a href="#thisPage" class="pageNavi pageNaviOn">' + i + '</a>').appendTo(navi).css(css_default);
                else $('<a href="#oterPage" cPage="' + i + '" class="pageNavi">' + i + '</a>').appendTo(navi).bind('click', function() { util.goPage($(this).attr('cPage')); }).css(css_hand);
            }

            navi.append('&nbsp;').append(img_next).append('&nbsp;').append(img_last);

            if (pCnf.cPage != pCnf.tPage) {
                img_next.bind('click', function() { util.goPage(parseInt(pCnf.cPage,10) + 1); }).css(css_hand);//130705
                img_last.bind('click', function() { util.goPage(pCnf.tPage); }).css(css_hand);//130705
            }
        };

        $.extend(this, {
            reload : function(cnf) {
                for (var k in conf)
                    cnf[k] = cnf[k] ? cnf[k] : conf[k];

                navi.empty();
                init(cnf);
            }
        });

        init(conf);

        return this;
    };
})(jQuery);


window.KEYCODE = {
    NUM_LOCK: 144,
    BACKSPACE: 8,
    CAPS_LOCK: 20,
    COMMA: 188,
    CONTROL: 17,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    HOME: 36,
    INSERT: 45,
    LEFT: 37,
    NUMPAD_ADD: 107,
    NUMPAD_DECIMAL: 110,
    NUMPAD_DIVIDE: 111,
    NUMPAD_ENTER: 108,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_SUBTRACT: 109,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SHIFT: 16,
    SPACE: 32,
    TAB: 9,
    UP: 38,
    SHIFT : 16,
    ALT : 18
};

String.prototype.byteLen = function(len) {
    var tlen = 0, len = len || 0;
    for(var i=0, limit=this.length; i<limit; i++) {
        var oneChar = this.charAt(i);
        tlen += ( escape(oneChar).length > 4 ) ? 2 : 1;
    }
    return tlen;
};

String.prototype.printf = function() {
    try {
        var format = this,
            match = format.match(/%([a-z]+|[0-9]+)/ig);

        if (arguments.length != match.length)
            return 'function call error!';

        // %s, %d 같은 s, d 검색은 나중에 추가 해야됨.
        for (var i = 0; i < arguments.length; i++)
            format = format.replace(/%([a-z]+|[0-9]+)/, arguments[i]);

        return format;
    } catch(e) { alert(e.message); }
};

Array.prototype.remove = function(index) {
    var len = this.length;
    for(var i = len - 1; i >= 0; i--)
        if(index == i) {
            var r = this[i];
            for(var j = i; j < len - 1; j++)
                this[j] = this[j+1];

            this.length = len - 1;
            return r;
        }
};

Array.prototype.inArray = function(needle, haystack, strict) {
    var found = false, key, strict = !!strict;
    haystack = !!haystack ? haystack : this;

    for (key in haystack) {
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
            found = true;
            break;
        }
    }

    return found;
};

jQuery.extend({
    // 클립보드
    clipBoard : function (name, value) {
        switch (name) {
            case 'copy' :
                window.clipboardData.setData('Text', value);
            break;
            case 'get' :
                return window.clipboardData.getData('Text');
            break;
            case 'clear' :
                return window.clipboardData.clearData("Text");
            break;
            case 'select' :
                var doc = value || document;
                doc.selection.createRange().execCommand("copy");
            break;
        }
    },

    // 숫자 포멧
    numberFormat : function (num, limit) {
        var ret = [],
            arrNum = escape(num).split('.'),
            pNumber = !!arrNum[0] ? arrNum[0] : escape(num),
            decimal = !!arrNum[1] ? arrNum[1] : '',
            limit = (typeof limit != 'undefined') ? limit : -1,
            operator = isNaN(pNumber.slice(0,1)) ? pNumber.slice(0,1) : '';

        decimal = (decimal.length && limit == -1) ? decimal : decimal.substr(0, limit);

        if (!!operator.length) {
            pNumber = pNumber.slice(1);
        }

        if (decimal.length < limit) {
            var offset = limit - decimal.length;
            for (var i = 0; i < offset; i++)
                decimal = decimal + '0';
        }

        while (pNumber.length) {
            if (pNumber.length > 3 && pNumber.slice(0,1) != '-' && pNumber.slice(0,1) != '+') {
                ret.push(pNumber.slice(pNumber.length - 3));
                pNumber = pNumber.slice(0, pNumber.length - 3);
            } else {
                ret.push(pNumber);
                break;
            }
        }

        return decimal ? operator + ret.reverse().join(',') + '.' + decimal : operator + ret.reverse().join(',');
    },

    // 소숫점 표현 +  숫자포멧
    formatUtil : function(num, idx) {
        var num = isNaN(num) ? 0 : num,
            strNum = (num + ''),
            idx = ( typeof idx != 'undefined')? idx+1 : 0,
            comIdx = (strNum.indexOf(".") != -1 ) ? strNum.indexOf(".") : strNum.legnth;

            if(idx != 0){
                var floatNum;

                if( strNum.length >= (comIdx+idx) ){
                    floatNum = strNum.substring(0, (comIdx+idx));
                }else{
                    if(comIdx == strNum.length)    strNum += ".";

                    for(var i = comIdx ; i<=(comIdx+idx);i++){
                        strNum += "0";
                    }
                    floatNum = strNum;
                }

                 num = parseFloat(floatNum);
            }else{
                num = parseInt(strNum.substring(0, comIdx));
            }


        return $.numberFormat(num);
    },

    // 쿠키 지정
    setCookie : function (name, value, expiredays) {
        var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );
        document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';';
    },

    // 쿠키 가져오기
    getCookie : function (name) {
        var search = name + "=";
        var cookie = document.cookie;

        if ( cookie.length > 0 ) {
            startIndex = cookie.indexOf( name );
            if ( startIndex != -1 ) {
                startIndex += name.length;

                endIndex = cookie.indexOf( ";", startIndex );

                if ( endIndex == -1) endIndex = cookie.length;

                return unescape( cookie.substring( startIndex + 1, endIndex ) );
            } else {
                return '';
            }
        } else {
            return '';
        }
    },

    // 쿠키 삭제
    delCookie : function (name) {
        var expireDate = new Date();

        expireDate.setDate( expireDate.getDate() - 1 );
        document.cookie = name + "= " + "; expires=" + expireDate.toGMTString() + "; path=/";
    },

    // 즐겨찾기
    favorite : function(rUrl, rTitle) {
        try { window.external.AddFavorite(rUrl,rTitle); } catch(e) {}
    },

    // 마우스포인터가 객체 안에 머물고 있는지 확인
    mouseInRect : function(event, obj) {
        var inX = false, inY = false;
        try {
            var rect = obj.getBoundingClientRect();

            if (event.clientX >= rect.left && event.clientX <= rect.right)
                inX = true;

            if (event.clientY >= rect.top && event.clientY <= rect.bottom)
                inY = true;
        } catch (e) {}

        return inX && inY;
    },

    // 배열인지 확인
    isArray : function(mixed_var) {
        if (!!mixed_var && typeof mixed_var.inArray == "object")
            return true;

        return (mixed_var instanceof Array)
    },

    // 객체인지 확인
    isObject : function(mixed_var) {
        if (mixed_var instanceof Array) return false;
        else return (mixed_var !== null) && (typeof(mixed_var) == 'object');
    }
});

var json = {
    toJson : function(str) {
        return (typeof str == 'string' && str.search(/^[\(?.\)]/g) != -1) ? eval(str) : str;
    },

    toString : function(obj, stack) {
        var stack = stack || ['('];

        if ($.isObject(obj)) {
            stack.push('{');
            var i = 0;
            for (var k in obj) {
                if (i > 0) stack.push(',');
                i++;

                if (typeof obj[k] == 'number' || typeof obj[k] == 'boolean') {
                    stack.push('"' + k + '":' + obj[k]);
                } else if (typeof obj[k] == 'string') {
                    stack.push('"' + k + '":"' + obj[k] + '"');
                } else if (typeof obj[k] == 'function') {
                    stack.push('"' + k + '":"function()"');
                } else {
                    stack.push('"' + k + '":');
                    this.toString(obj[k], stack);
                }
            }
            stack.push('}');
        } else if ($.isArray(obj)) {
            stack.push('[');
            for (var i = 0; i < obj.length; i++) {
                if (i > 0) stack.push(',');

                if (typeof obj[k] == 'number' || typeof obj[k] == 'boolean') {
                    stack.push(obj[i]);
                } else if (typeof obj[i] == 'string') {
                    stack.push('"' + obj[i] + '"');
                } else if (typeof obj[i] == 'function') {
                    stack.push('"' + i + '":"function()"');
                } else {
                    this.toString(obj[i], stack);
                }
            }
            stack.push(']');
        }

        return stack.length ? stack.join('') + ')' : obj;
    },

    ord : function(char) {
        return char.charCodeAt(0);
    },

    htmlEntity : function(char) {
        return '&#' + this.ord(char) + ';';
    },

    encode : function(str, separator) {
        if (typeof str != 'string')
            str = this.toString(str);

        var ret = [], separator = separator || ';';

        for (var i = 0; i < str.length; i++) {
            ret.push(this.ord(str[i]) + separator);
        }

        return ret.join('');
    },

    decode : function(str, separator) {
        if (typeof str != 'string')
            return str;

        var ret = [], separator = separator || ';';
        var str = str.split(separator);   // /&#|;/g

        for (var i = 0; i < str.length; i++)
            ret.push(String.fromCharCode(str[i]));

        return ret.join('');
    }
};

var EWin = function(conf) {
    var cnf = {'id':'tWin','border':'solid 1px #8db2e3','resize':true,'dragg':true,'title':20,'text':'Title'};

    if (typeof conf.id == 'undefined') {
        alert('EWin에 입력된 구성설정정보에 id 속성이 정의되지 않았습니다.');
        return;
    }

    if (document.getElementById(conf.id))
        return document.getElementById(conf.id);

    var initWidth   = (typeof conf.width == 'undefined') ? 300 : conf.width;
    var initHeight  = (typeof conf.height == 'undefined') ? 200 : conf.height;
    var initLeft    = (typeof conf.left == 'undefined') ? (document.body.clientWidth - initWidth)/2 : conf.left;
    var initTop     = (typeof conf.top == 'undefined') ? (document.body.clientHeight - initHeight)/2 : conf.top;
    var isShow      = false;

    conf.text = (typeof conf.text == 'undefined') ? '' : conf.text;
    conf.dragg = (typeof conf.dragg == 'undefined') ? undefined : conf.dragg;
    conf.title = (typeof conf.title == 'undefined') ? undefined : conf.title;

    var divBorder = $('<div></div>')
        .attr({
            'id'         : conf.id + '_border',
            'name'       : conf.id + '_border'
        }).css({
            'border'     : 'solid 1px #8db2e3',
            'margin'     : 0,
            'padding'    : 0,
            'position'   : 'absolute',
            'left'       : initLeft,
            'top'        : initTop,
            'width'      : initWidth,
            'height'     : initHeight,
            'zIndex'     : conf.zIndex || 1,
            'background':'#fff' //130813 add style
        });

    var divTitle = $('<div>' + conf.text + '</div>')
        .attr({
            'id'         : conf.id + '_title',
            'name'       : conf.id + '_title'
        }).css({
            'background' : '#0D6AB2 url(/images/win/bg_lnb.gif) no-repeat scroll left top',
            'border'     : 0,
            'margin'     : 0,
            'padding'    : 0,
            'position'   : 'absolute',
            'left'       : 0,
            'top'        : 0,
            'width'      : '100%',
            'height'     : 0,
            'zIndex'     : conf.zIndex || 1,
            'cursor'     : 'pointer',
            'color'      : '#FFFFFF',
            'text-align' : 'center'
        });

	var iframe = $('<iframe frameborder="0" title="'+conf.title+'" name="' + conf.id + '"></iframe>') // allowTransparency=true // _acc 2013-05-16 OJS iframe태그 속성 수정, 추가
        .attr({
            'id'         : conf.id,
            'name'       : conf.id,
            'scrolling'  : conf.scrolling || 'no',
            'src'        : conf.src || 'about:blank'
        }).css({
            'opacity'    : 1,
            'position'   : 'absolute',
            'left'       : 0,
            'top'        : 0,
            'width'      : '100%',
            'height'     : '100%',
            'zIndex'     : (conf.zIndex || 1) + 1
        }).each(function() {
            var iframe = this;

            this.setSrc = function(src) {
                iframe.src = src;
            };

            this.setTop = function(top) {
                iframe.setRect(top, undefined, undefined, undefined);
            };

            this.setLeft = function(left) {
                iframe.setRect(undefined, left, undefined, undefined);
            };

            this.setWidth = function(width) {
                iframe.setRect(undefined, undefined, width, undefined);
            };

            this.setHeight = function(height) {
                iframe.setRect(undefined, undefined, undefined, height);
            };

            this.setPos = function(top, left) {
                iframe.setRect(top, left, undefined, undefined);
            };

            this.setSize = function(width, height) {
                iframe.setRect(undefined, undefined, width, height);
            };

            this.setRect = function(top, left, width, height) {
                divBorder.css({
                    'top'     : (typeof top != 'undefined') ? top : divBorder.css('top'),
                    'left'    : (typeof left != 'undefined') ? left : divBorder.css('left'),
                    'width'   : (typeof width != 'undefined') ? width : divBorder.css('width'),
                    'height'  : (typeof height != 'undefined') ? height : divBorder.css('height')
                });

//                var padding = $.browser.msie ? 0 : 0,
                //var padding = (!!navigator.userAgent.match(/Trident\/7\./)) ? 0 : 0,
                var padding = 0,
                    titleSize = (typeof conf.title != 'undefined') ? conf.title : 0;

                $(iframe).css({
                    'top'     : titleSize,
                    'width'   : (typeof width != 'undefined') ? width - padding : parseInt(divBorder.css('width')) - padding,
                    'height'  : (typeof height != 'undefined') ? height - padding - titleSize : parseInt(divBorder.css('height')) - padding - titleSize
                });

                divTitle.css({
                    'width'   : (typeof width != 'undefined') ? width - padding : parseInt(divBorder.css('width')) - padding,
                    'height'  : titleSize
                });
            };

            this.hide = function(spped, fn) {
                isShow = false;
                divBorder.hide(spped ? spped : undefined, fn ? fn : undefined);
                $(iframe).hide(spped ? spped : undefined, fn ? fn : undefined);
            };

            this.show = function(spped, fn) {
                isShow = true;
                divBorder.show(spped ? spped : undefined, fn ? fn : undefined);
                $(iframe).show(spped ? spped : undefined, fn ? fn : undefined);
            };

            this.isShow = function() {
                return isShow;
            };

            this.remove = function() {
                $(divBorder).remove();
                $(divTitle).remove();
                $(iframe).remove();
            };

            this.html = function(html) {
                setHtml(html);
            };

            this.getDocument = function() {
                return iframe.contentWindow.document;
            };

            this.getChildren = function() {
                return $(iframe.get(0).contentWindow.document).children();
            };
        });

    var setHtml = function(html) {
        var nDoc = iframe.get(0).contentWindow.document;

        if ($.browser.msie) {
        //if(!!navigator.userAgent.match(/Trident\/7\./)){
            nDoc.write('<body style="margin:0 0 0 0;padding:0 0 0 0;"></body>');
            var body = $(nDoc).find('body');

            body.css({'display':'','margin':0,'padding':0});
            body.html(html);
        } else {
//            alert('현 브라우저는 setHtml을 적용 할 수 없습니다.');
        }
    }

    var body = $(document.body);

    divBorder.css('border', (typeof conf.border == 'undefined') ? 0 : conf.border);

    if (typeof conf.dragg != 'undefined') {
        divTitle.appendTo(divBorder);

        divBorder.draggable({'EWin':[divBorder,iframe]});
        divBorder.css('cursor','pointer');
    }

    divBorder.appendTo(body);
    iframe.appendTo(divBorder);

    if (typeof conf.resize != 'undefined') {
        divBorder.resizable({'EWin':[divBorder,iframe]}).bind('resize',function() {
            var padding = (!!navigator.userAgent.match(/Trident\/7\./)) ? 0 : 0,
                titleSize = (typeof conf.title != 'undefined') ? conf.title : 0;

            iframe.css({
                'width'   : parseInt(divBorder.css('width')) - padding,
                'height'  : parseInt(divBorder.css('height')) - padding - titleSize
            });

            divTitle.css({
                'width'   : parseInt(divBorder.css('width')) - padding
            });
        });
    }

    return iframe.get(0);
};

var checkAll = function(nm) {
    var chk = $(':checkbox[name=' +nm + ']');

    chk.each(function(idx) {
        var checked = $(this).attr('checked');
        $(this).attr({'checked':checked ? '' : 'true'});
    });
};

// 현재 일자에 offset 일을 더한 일자를 보여준다.
var addDateToStr = function(offset) {
    var dateObj = new Date();

    var newDate = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        parseInt(dateObj.getDate(),10) + parseInt(offset,10),
        dateObj.getHours(),
        dateObj.getMinutes(),
        dateObj.getSeconds(),
        dateObj.getMilliseconds()
    );

    var strDate = {
        year : parseInt(newDate.getFullYear(),10),
        month : parseInt(newDate.getMonth(),10) + 1,
        date : parseInt(newDate.getDate(),10),
        hours : parseInt(newDate.getHours(),10),
        minutes : parseInt(newDate.getMinutes(),10),
        seconds : parseInt(newDate.getSeconds(),10)
    };

    return strDate.year
        + (strDate.month < 10 ? '0' + strDate.month : strDate.month)
        + (strDate.date < 10 ? '0' + strDate.date : strDate.date)
        + (strDate.hours < 10 ? '0' + strDate.hours : strDate.hours)
        + (strDate.minutes < 10 ? '0' + strDate.minutes : strDate.minutes)
        + (strDate.seconds < 10 ? '0' + strDate.seconds : strDate.seconds);
};

/*************************************************
* 공통 코드
*************************************************/
var PROD_TYPE_DATA = [['전체','00'],['단품','01'],['패키지','02'],['관리자쿠폰','03'],['쿠폰','04'],['전문가보고서','05'],['FRAN','06'],['선불이용권','08']];
var MEM_TYPE_DATA  = [['전체','0'],['예비창업자','1'],['점포운영자','2'],['업종전환희망자','3'],['컨설턴트','4']];
var GENDER_DATA    = [['전체','0'],['남자','1'],['여자','2']];
var AGE_GROUP_DATA = [['전체','0'],['10대이하','1'],['20대','2'],['30대','3'],['40대','4'],['50대','5'],['60대이상','6']];
var MONTH_DATA     = [['12','12'],['11','11'],['10','10'],['09','09'],['08','08'],['07','07'],['06','06'],['05','05'],['04','04'],['03','03'],['02','02'],['01','01']];
var TIME_DATA      = [['00','00'],['01','01'],['02','02'],['03','03'],['04','04'],['05','05'],['06','06'],['07','07'],['08','08'],['09','09'],['10','10'],['11','11']
                      ,['12','12'],['13','13'],['14','14'],['15','15'],['16','16'],['17','17'],['18','18'],['19','19'],['20','20'],['21','21'],['22','22'],['23','23']];


$(function(){
	$('object').attr('tabindex', '-1');
});