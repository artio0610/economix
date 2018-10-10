// JavaScript Document//var iE6 = $.browser.msie && $.browser.version == 6; // anton
var iE6 = false;

function Placeholder(I) {
    H = 'placeholder';
    if (!I || (I.placeholder && H in document.createElement('input'))) return;
    o = '';
    var P = I.getAttribute(H);
    I = $(I).bind('focus submit', function() { if (I.val() == P) { I.val(o); } }).bind('blur', function() { if (I.val() === o) { I.val(P); } });
    if (I.val() === o || I.val() == P) { I.val(P); }
}


//-------------- convert String value to Number -
$.fn.valInt = function(C) { return parseInt($(this).val()); }
    //--------------- ĐľŃĐťĐ¸ Đ°ŃŃŃĐ¸ĐąŃŃ ĐžŃŃŃŃŃŃĐ˛ŃĐľŃ ŃĐž ŃĐžĐˇĐ´Đ°ĐľĐź ĐľĐłĐž Ń Đ˝ĐľĐşĐžŃĐžŃŃĐź ĐˇĐ˝Đ°ŃĐľĐ˝Đ¸ĐľĐź
$.fn.attrExist = function(attrName, newVal) { var T = $(this); if (!T.attr(attrName)) { T.attr(attrName, newVal); } return T; }
    //-------- ĐŃŃ Đ˝Đ°Ń, ŃĐžĐťŃĐşĐž ŃĐ¸ŃĐťĐ°. ---------------------------------------
$.fn.toRealInt = function() {
        var reg = /^[0-9]+$/;
        var T = $(this);
        var V = parseInt(T.attr('maxdigit'));

        if (!reg.test(T.val())) { T.val(0); }
        if (T.valInt() > V) { T.val(V); }

        return T;
    }
    //---------- Đ˘ŃĐ´Đ° \ ŃŃĐ´Đ° -------------------------
$.fn.digitChange = function(C) {

        var T = $(this);
        var i = T.toRealInt().valInt();

        if (C && i < parseInt(T.attr('maxdigit'))) { T.val(i + 1); } //up
        if (!C && i > 0) { T.val(i - 1); } //down

        return C;
    }
    //-----------------------------------------------
$.fn.digitInput = function() {

    var T = $(this);
    var V = parseInt(T.attr('maxdigit'));

    var UP = $('<a class="edit_send_point up" href="#">&nbsp;</a>').insertBefore(T);
    var DOWN = $('<a class="edit_send_point down" href="#">&nbsp;</a>').insertAfter(T);
    UP.add(DOWN).click(function() { T.digitChange($(this).hasClass('up')); return false; });


    return T.attrExist('maxlength', T.attr('maxdigit').length).attrExist('size', T.attr('maxdigit').length).
    blur(function() { T.toRealInt(); }).
    keydown(function(e) {

        var k = e.keyCode;
        isDigits1 = (k >= 48 && k <= 57);
        isDigits2 = (k >= 96 && k <= 105); //ĐĐ°ĐťŃĐşŃĐťŃŃĐžŃ
        isDigits = isDigits1 || isDigits2;
        isArrows = (k >= 37 && k <= 39);
        isBackSpace = k == 8;
        isDel = k == 46;

        _1 = T.val().length == 1;
        CHAR = String.fromCharCode(k);

        if (k == 38) { T.digitChange(true); }
        if (k == 40) { T.digitChange(false); }

        if ((isBackSpace || k == isDel) && _1) {
            return T.digitChange(false);
            //return false;
        }

        if (isDigits1 || isDigits2 || isArrows || isBackSpace) {
            //ĐľŃĐťĐ¸ Đ˛ ŃĐžŃĐźĐľ ŃĐśĐľ ĐľŃŃŃ Đ˝ĐžĐťŃ, ŃĐž ĐźĐľĐ˝ŃĐľĐź ĐľĐłĐž Đ˝Đ° Đ˝ĐžĐ˛ĐžĐľ ĐˇĐ˝Đ°ŃĐľĐ˝Đ¸Đľ.
            if (_1 && T.val() == '0' && isDigits) { T.val(''); }
            return true;
        }

        return false;

    }).keyup(function() { if (parseInt($(this).val()) > V) { $(this).val(V); } });

};


$(document).ready(function() {

    Placeholder(document.getElementById('loginmain'));
    Placeholder(document.getElementById('paswmain'));

    var mc = $('#mainContent');
    var __SELECTED = 'sel'
    var tabu = $('.tabu > li.sub');


    $('.ox-click').bind('mouseenter mouseleave', function(e) {
        var span = $(this).find('span');
        span = e.type == "mouseenter" ? span.show() : span.hide();
    });

    //pgtabs :-)
    if (iE6) {

        //show
        $('.tabu > li.sub > a').bind('mouseover', function(e) {

            var t = $(e.target);

            if (t.hasClass(__SELECTED)) return;

            tabu.find('a.' + __SELECTED).removeClass(__SELECTED).next().removeClass('db');
            t.addClass(__SELECTED).next().addClass('db');

        });
        //hide
        mc.bind('mouseover', function() { tabu.find('a.' + __SELECTED).removeClass(__SELECTED).next().removeClass('db'); });

    } else {

        tabu.bind('mouseenter mouseleave', function(e) {

            var over = e.type == 'mouseenter';
            var CUR = 0;
            /* anton
            if($.browser.msie){
            	if(e.target.tagName == "A"){
            		CUR = $(e.target).parents('li.sub');
            	} else {
            		CUR = $(e.target);
            	}	
            	
            	} else {
            		CUR = e.currentTarget;
            }
            */
            CUR = e.currentTarget;
            sub = $('.sub', CUR);
            if (over) { sub.addClass('db').prev().addClass(__SELECTED); } else { sub.removeClass('db').prev().removeClass(__SELECTED); }
        });

    }

    //eof pgtabs


    var divrea = $('.realmselect');

    $("#mainContent").mousemove(function() { divrea.hide(); });

    $(".olga").click(function() {

        var rea = $("#" + $(this).attr('rel'));


        divrea.not(rea).hide();

        if (rea.is(':hidden')) {
            rea.show();
        } else {
            rea.hide();
        }
        return false;

    });


    $('.button_130, .button_85').hover(function() {
            $("#s" + this.id).css({ display: "block", zIndex: "2" });
            $("#w" + this.id).css({ zIndex: "2" });
        },
        function() {
            $("#s" + this.id).css({ display: "none", zIndex: "1" });
            $("#w" + this.id).css({ zIndex: "1" });
        });



    //new menu
    var menutop = $('#menutop');
    var cur1 = 'cur1';
    var mto, mta;

    hidemenu = function() {
        mta = setTimeout(function() { $('li.cur1', menutop).removeClass(cur1); }, 400);
    }

    clearmto = function() {
        clearTimeout(mto);
        clearTimeout(mta);
    }

    menutopover = function() {
        clearmto();

        var t = $(this).parent('li');
        if (t.hasClass(cur1)) return;


        var c = $('li.cur1', menutop);

        mto = setTimeout(function() {
            $('li.cur1', menutop).removeClass(cur1);
            t.addClass(cur1);


        }, 0);
    }

    menutop.find('ul > li > a').mouseover(clearmto); //.mouseout(hidemenu);
    $('#menutop > li > span').mouseover(menutopover);

    //$('#mainContent').mouseover(hidemenu);


    var Helper = {};
    Helper.hi = $('#hint');

    if (Helper.hi.size() > 0) {

        Helper.all = $('div.hint-body', Helper.hi);
        Helper.mini = $('div.hint-hide', Helper.hi);
        Helper.ul = $('.hint-ul', Helper.all);

        Helper.show = $('.hint-show', Helper.mini);
        Helper.disable = $('.hint-disable', Helper.mini);

        Helper.prev = $('.hint-prev', Helper.all);
        Helper.next = $('.hint-next', Helper.all);
        Helper.hide = $('a.hint-hide', Helper.all);


        Helper.prevnext = function() {

            var t = $(this);
            var isNext = t.hasClass('hint-next');

            li = Helper.ul.find('li.active');

            newli = isNext ? li.next() : li.prev();

            newli = newli.size() == 1 ? newli : isNext ? Helper.ul.find(':first') : Helper.ul.find(':last');

            li.add(newli).toggleClass('active');

            return false;
        };

        Helper.remove = function() {
            if (confirm(TXT_HINT_USER_ENABLE)) {
                Helper.hi.stop().animate({ width: 0 });
                $.post(hide_hints_url);
            }
            return false;
        };

        Helper.toggle = function() {
            var t = $(this);
            var tp = t.parent();
            var is1 = t.hasClass('hint-show');

            Helper.hi.stop().animate({ width: 0 }, is1 ? 200 : 500, function() {

                if (is1) {

                    var o = Helper.all;
                    o.add(tp).toggle();

                } else {

                    var o = Helper.mini.removeAttr('style');
                    tp.hide();
                }

                Helper.hi.animate({ width: o.width() }, is1 ? 500 : 200);

            });

            return false;
        }

        Helper.show.add(Helper.hide).click(Helper.toggle);
        Helper.disable.click(Helper.remove);
        Helper.prev.add(Helper.next).click(Helper.prevnext);

        $(window).keydown(function(e) {

            e = e.keyCode || e.which;
            if (e == 27) {
                if (Helper.all.is(':visible')) {
                    Helper.hide.click();
                }

            };
        });

    }



    var selected = 'selected';
    var Z = '.u-z';

    $('.unit-list > tbody > tr').not('.u-th').bind('mouseenter mouseleave', function(e) {

        var t = $(this);
        var tn = t.next();
        var hasComment = t.hasClass('zz') || tn.hasClass(Z);

        if (t.hasClass(Z)) { t = t.add(t.prev()); }
        if (hasComment) { t = t.add(tn); }

        if (e.type == "mouseenter") { t.addClass(selected); } else { t.removeClass(selected); }
    });

    $('.unit-list-2014 > tbody > tr').bind('mouseenter mouseleave', function(e) {

        var t = $(this);
        if (!t.hasClass('no_selecting') && !t.hasClass('orderFormStyle')) {
            if (t.hasClass('unit_comment')) {
                if (e.type == "mouseenter") { t.addClass('selected_border'); } else { t.removeClass('selected_border'); }
                t = t.add(t.prev());
            } else if (!t.hasClass('wborder')) {
                if (t.next().hasClass('orderFormStyle')) {
                    if (e.type == "mouseenter") { t.next().next().addClass('selected_border'); } else { t.next().next().removeClass('selected_border'); }
                    t = t.add(t.next().next());
                } else {
                    if (e.type == "mouseenter") { t.next().addClass('selected_border'); } else { t.next().removeClass('selected_border'); }
                    t = t.add(t.next());
                }
            } else {
                if (e.type == "mouseenter") { t.addClass('selected_border'); } else { t.removeClass('selected_border'); }
            }
            if (!t.hasClass('ordered')) {
                if (e.type == "mouseenter") { t.addClass('selected_background'); } else { t.removeClass('selected_background'); }
            } else {
                if (t.prev().hasClass('orderFormStyle')) {
                    if (e.type == "mouseenter") { t.prev().prev().addClass('selected_background'); } else { t.prev().prev().removeClass('selected_background'); }
                } else {
                    if (e.type == "mouseenter") { t.prev().addClass('selected_background'); } else { t.prev().removeClass('selected_background'); }
                }
            }
        }
    });

});

var sortingFlag = 0;

function sortingClick(linkordering) {
    if (sortingFlag == 0) {
        window.location = linkordering;
        sortingFlag = 1;
        setTimeout('sortingClick_phase2()', 700);
        return true;
    } else {
        return false;
    }
}

function sortingClick_phase2() { sortingFlag = 0; }

var widget130 = function(iId, sImg, sHref, sName, sDes, sType, recomend) {
    document.write('<div id="w' + iId + '" class="widget_130" onclick="document.location=\'' + sHref + '\'">' +
        '<div id="' + iId + '" class="button_130 button_130_' + sType + '"><img src="' + sImg + '" /><div>' + sName + '</div></div>' +
        '<div id="s' + iId + '" class="slider_130"><h4>' + sName + '</h4>' + sDes + '</div> ' + (recomend ? '<div class="bantik">&nbsp;</div>' : '') + '</div>');
};

var widget85 = function(iId, sImg, sHref, sName, sDes, sType, sText) {
    document.write('<div id="w' + iId + '" class="widget_85" onclick="$(\'#param_' + iId + '\').removeAttr(\'disabled\'); document.forms[0].submit();">' +
        '<div id="' + iId + '" class="button_85 button_85_' + sType + '"><span class="text_top">' + sText + '</span><br /><img src="' + sImg + '" /><div>' + sName + '</div></div>' +
        '<div id="s' + iId + '" class="slider_85"><h4>' + sName + '</h4>' + sDes + '</div><input type="hidden" id="param_' + iId + '" name="' + sHref + '" value="1" disabled="1" /></div>');
};

var widget85wFname = function(iId, sImg, sHref, sName, sDes, sType, sText, sFname) {
    document.write('<div id="w' + iId + '" class="widget_85" onclick="$(\'#param_' + iId + '\').removeAttr(\'disabled\'); $(\'#' + sFname + '\').submit();">' +
        '<div id="' + iId + '" class="button_85 button_85_' + sType + '"><span class="text_top">' + sText + '</span><br /><img src="' + sImg + '" /><div>' + sName + '</div></div>' +
        '<div id="s' + iId + '" class="slider_85"><h4>' + sName + '</h4>' + sDes + '</div><input type="hidden" id="param_' + iId + '" name="' + sHref + '" value="1" disabled="1" /></div>');
};

var _popup;

function popup(url, W, H) {
    W = W ? W : 760;
    H = H ? H : 450;
    _popup = window.open(url, "_popup", "width=" + W + ", height=" + H + ", top=20, left=20, scrollbars=1, resizable=1");
    _popup.focus();
    return _popup;
}

function doWindow(url, W, H) {
    popup(url, W, H);
    return false;
}

function closePopup() {
    if (opener) {
        window.close();
        return;
    }

    if (_popup) {
        _popup.close();
        return;
    }
}

function closeWindow() { closePopup(); }

function openerReload() {
    if (opener) { opener.location.href = opener.location.href; }
}


function Go(sUrl, target) {
    if (sUrl) {
        switch (target) {
            default: document.location.href = sUrl;
            break;
        }
    }
}

gObjectList = new Array();

function checkFirstTrRadio(oTr) {
    nodeWolk(oTr);
    for (index in gObjectList) {
        if (gObjectList[index].type && !gObjectList[index].disabled) {
            gObjectList[index].checked = true;
        }
    }
}

function checkFirstTrCheckbox(oTr) {
    nodeWolk(oTr);
    for (index in gObjectList) {
        if (gObjectList[index].type) {
            gObjectList[index].checked = !gObjectList[index].checked;
        }
    }
}

function nodeWolk(oParent) {
    for (index in oParent.childNodes) {
        if (typeof(oParent.childNodes[index]) == 'object' && oParent.childNodes[index].nodeName != '#text') {
            gObjectList[gObjectList.length] = oParent.childNodes[index];
        }
        if (oParent.childNodes[index].childNodes) {
            nodeWolk(oParent.childNodes[index]);
        }
    }
}

gaControlCheckbox = new Array();

function checkUncheckFormCheckbox(oForm, status, oCheckbox, bNotRedefineOnclick) {
    if (status) {
        $('form[name=' + oForm.name + '] input[type=checkbox]').prop('checked', true);
    } else {
        $('form[name=' + oForm.name + '] input[type=checkbox]').prop('checked', false);
    }
    /*bSetOnclick = true;
    if (oCheckbox && oCheckbox.id && oForm.name && !gaControlCheckbox[oForm.name])
    {
    	gaControlCheckbox[oForm.name] = oCheckbox.id;
    }
    else
    {
    	bSetOnclick = false;
    }

    if (!gaControlCheckbox[oForm.name])
    {
    	bSetOnclick = false;
    }

    iFormLength = oForm.length;
    for (i = 0; i < iFormLength; i++)
    {
    	if (oForm[i].type == "checkbox")
    	{
    		oForm[i].checked = status;
    	
    		if (bSetOnclick && oForm[i].id != gaControlCheckbox[oForm.name] && !bNotRedefineOnclick)
    		{
    			oForm[i].onclick = function()
    			{
    				checkUncheckFormControlCheckbox(this);
    			}
    		}
    	}
    }*/
}

function checkUncheckFormControlCheckbox(oCheckbox) {
    oForm = oCheckbox.form;
    sIndex = oForm.name;
    if (gaControlCheckbox[sIndex] && document.getElementById(gaControlCheckbox[sIndex])) {
        iFormLength = oForm.elements.length;
        status = true;
        for (i = 0; i < iFormLength; i++) {
            if (oForm.elements[i].type == 'checkbox' && oForm.elements[i].id != gaControlCheckbox[sIndex] && !oForm.elements[i].checked) {
                status = false;
                break;
            }
        }
        document.getElementById(gaControlCheckbox[sIndex]).checked = status;
    }
}

function sayNumber(num) {
    if (num < 0) { return "-" + sayMoney(-num); }

    if (Math.round(num * 100) / 100 - Math.round(num)) {
        num = Math.round(num * 100) / 100;
    } else {
        num = Math.round(num);
    }

    s = num.toString();
    s1 = "";
    l = s.length;
    p = s.indexOf(".");
    if (p > -1) {
        s1 = s.substr(p);
        l = p;
    } else {
        p = s.indexOf(",");
        if (p > -1) {
            s1 = s.substr(p);
            l = p;
        }
    }
    p = l - 3;
    while (p >= 0) {
        s1 = ' ' + s.substr(p, 3) + s1;
        p -= 3;
    }
    if (p > -3) {
        s1 = s.substr(0, 3 + p) + s1;
    }
    if (s1.substr(0, 1) == " ") {
        s1 = s1.substr(1);
    }
    return s1;
}

function sayMoney(num, symbol) {
    result = sayNumber(num);
    if (symbol) {
        if (num < 0) result = '-' + symbol + sayNumber(Math.abs(num));
        else result = symbol + result;
    }
    return result;
}

function sayPercent(num) { return sayNumber(num) + '%'; }

function progressStaticBarOverflowBlink(sObjectId) {
    if (document.getElementById(sObjectId)) {
        if (document.getElementById(sObjectId).style.display != 'none') {
            document.getElementById(sObjectId).style.display = 'none';
        } else {
            document.getElementById(sObjectId).style.display = 'block';
        }
    }
    setTimeout("progressStaticBarOverflowBlink('" + sObjectId + "')", 1000);
}


function buttonDisabled(oButton) {
    if (!oButton.disabled) {
        sNewCssClassName = oButton.className.replace(/[^a-z]/ig, '') + 'Disabled' + oButton.className.replace(/[a-z]/ig, '');

        oButton.disabled = true;
        oButton.className = sNewCssClassName;
    }
}

function buttonEnabled(o) {
    if (o.disabled) {
        o.disabled = false;
        o.className = o.className.replace(/disabled/ig, '');
    }
}

function fieldDisabled(o) { o.disabled = true; }

function fieldEnabled(o) { o.disabled = false; }


function getFirstChildByNodeName(oNode, sNodeName) {
    if (oNode.childNodes != 'undefined') {
        index = 0;
        while (oNode.childNodes[index].nodeName != sNodeName) {
            index++;
        }

        return oNode.childNodes[index];
    }

    return null;
}


function pointsNeedToNextLevel(iLevel) {
    return Math.min(Math.floor(parseInt(iLevel) / 10) + 1, 10);
}


function equipmentQualityColorGet(quality, max_quality) {
    var numcol = 30;
    var color = parseInt(numcol * quality / max_quality);

    var int = 128;
    var gamma = parseInt(int / numcol);
    var correct = int - gamma;

    var r = parseInt((numcol - color) * gamma) + correct;
    var g = parseInt((numcol - Math.abs(numcol / 2 - color)) * gamma) + correct;
    var b = parseInt(color * gamma) + correct;

    color = 'rgb(' + r + ',' + g + ',' + b + ')';

    return color;
}


function formHiddenFieldValueSet(oForm, sFieldName, mFieldValue) {
    if (typeof(oForm) == 'undefined') {
        return -1;
    }

    if (typeof(oForm['sFieldName']) == 'undefined') {
        oField = document.createElement('input');
        oField.setAttribute('name', sFieldName);
        oField.setAttribute('type', 'hidden');
        oForm.appendChild(oField);
    } else {
        oField = oForm['sFieldName'];
    }
    oField.setAttribute('value', mFieldValue);
}


function setCookie(name, value, days) {
    createCookie(name, value, days);
}

function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    readCookie(name)
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function round(fVal, i) {
    i = i ? i : 10;
    return Math.round(fVal / i) * i;
}

function imposeMaxLength(Object, MaxLen, Event) {
    return (Object.value.length <= MaxLen ? true : (Event.keyCode == 8 || Event.keyCode == 46 ? true : false));
}

function messageRecipient(iUserId, sUserTitle) {
    if (!iUserId) {
        return false;
    }
    if (sUserTitle) {
        return '"' + sUserTitle + '"' + ' <#' + iUserId + '>';
    }
    return '#' + iUserId;
}


function VTimer(server_time, processing_time, countdown_view, time_view, callback) {
    this.countdown = new Date();
    this.diff = new Date();
    this.current_time = new Date();
    this.countdown_view = countdown_view;
    this.time_view = time_view;
    this.time_offset = 3 * 60 * 60 * 1000;

    this.callback = callback || null;

    this.server_time = new Date(1000 * server_time + this.time_offset);
    this.processing_time = new Date(1000 * processing_time + this.time_offset);
    this.diff.setTime(this.current_time.getTime() - this.server_time.getTime());
    this.countdown.setTime(this.processing_time.getTime() - this.server_time.getTime());

    this.now = Date.now || function() {
        // for IE
        return +new Date;
    }

    this.tick = function() {
        this.server_time.setTime(this.now() - this.diff.getTime())
        var time = this.processing_time.getTime() - this.server_time.getTime();
        time = time > 0 ? time : 0;
        this.countdown.setTime(time);
    }

    this.format = function(date) {
        var hh = date.getUTCHours();
        hh = hh < 10 ? ('0' + hh) : hh;
        var mm = date.getUTCMinutes();
        mm = mm < 10 ? ('0' + mm) : mm;
        var ss = date.getUTCSeconds();
        ss = ss < 10 ? ('0' + ss) : ss;
        return hh + ':' + mm + ':' + ss;
    }

    this.display = function() {
        this.countdown_view.text ? this.countdown_view.text(this.format(this.countdown)) : this.countdown_view.innerHTML = this.format(this.countdown);
        this.time_view.text ? this.time_view.text(this.format(this.server_time)) : this.time_view.innerHTML = this.format(this.server_time);
    }

    this.start = function() {
        var t = this;
        setTimeout(function() {
            t.tick();
            if (t.callback) t.callback(t);
            t.display();
            t.start();
        }, 1000);
    }
}

var confirmDlg = false;

function v_confirm(mess, buttons, callback, header) {
    if (confirmDlg === false) {
        $('body').append(
            '<div class="uni_popup" id="confirm-dialog">' +
            '<div class="uni_popup_hedaer"><div class="uni_popup_close">X</div><span>&nbsp;</span></div>' +
            '<div class="uni_popup_content"></div>' +
            '<div class="uni_popup_buttons">' +
            (buttons.no ? ('<button name="no" class="button_no">' + buttons.no + '</button>') : '') +
            (buttons.cancel ? ('<button name="cancel" class="button_cancel">' + buttons.cancel + '</button>') : '') +
            (buttons.ok ? ('<button name="ok" class="button_yes">' + buttons.ok + '</button>') : '') +
            '</div>' +
            '</div>'
        );

        confirmDlg = $('#confirm-dialog');
        confirmDlg.find('.uni_popup_close').bind('click', function() { $.unblockUI() });
        confirmDlg.find('button[name=cancel]').bind('click', function() { $.unblockUI() });
        confirmDlg.find('button[name=no]').bind('click', function() { $.unblockUI() });
    }
    confirmDlg.find('button[name=ok]').unbind('click');
    if (callback) confirmDlg.find('button[name=ok]').bind('click', callback);
    confirmDlg.find('button[name=ok]').bind('click', function() { $.unblockUI() });
    confirmDlg.find('.uni_popup_content').text(mess);
    if (header) confirmDlg.find('.uni_popup_hedaer span').text(header);
    $.blockUI({ message: confirmDlg });
}

function declension(lang, number, label_1, label_2, label_5) {
    number = 0 + number;

    var postfix = '';

    switch (lang) {
        case 'ru':
        case 'ua':
            var modulus = number % 10;
            var mod100 = number % 100;
            if (!number) postfix = 5;
            else if ((modulus == 1) && (mod100 != 11)) postfix = 1;
            else if ((modulus >= 2) && (modulus <= 4) && (mod100 < 10 || mod100 >= 20)) postfix = 2;
            else postfix = 5;
            break;
        case 'en':
        case 'cn':
        case 'fr':
        case 'es':
        case 'de':
            if (number) postfix = 2;
            else if (number == 1) postfix = 1;
            else postfix = 2;
            break;
    }

    return eval('label_' + postfix);
}

function ltranslate(from, to, selector) {

    $.ajax({
        url: 'http://www.transltr.org/api/translate',
        data: { from: from, to: to, text: $(selector).text() },
        dataType: 'json',
        success: function(data) {
            //console.log(data);
            $(selector).text(data.translationText);
        }
    });
}

// yandex
function ytranslate(from, to, selector) {
    $.ajax({
        url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
        data: {
            lang: from + '-' + to,
            format: 'html',
            text: ($(selector).html()),
            key: 'trnsl.1.1.20170601T105556Z.d25690642c0b8c90.f12a2323cb92b2d3d37b214f6c9de64cd6dffbef',
        },
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            $(selector).html((data.text[0])).attr('data-translated', 'yes');
        }
    });
}

// google throuth app 
function gtranslate(from, to, selector) {
    var t = $(selector);

    if (t.attr('data-translated')) {
        t.html(t.attr('data-src')).attr('data-translated', '');
        return;
    }

    var trsl = t.attr('translated-' + from + '-' + to);
    if (trsl) {
        t.html(trsl).attr('data-translated', 'yes');
        return;
    }

    t.addClass('updating');
    $.ajax({
        url: '/api/vera/main/service/translate?app=system',
        data: {
            from: from,
            to: to,
            text: t.html(),
        },
        type: 'POST',
        dataType: 'json',
        success: function(data) {
            t.attr('data-src', t.html());
            t.attr('translated-' + from + '-' + to, data);
            t.html(data).attr('data-translated', 'yes');
            t.removeClass('updating');
        }
    });
}

var Spinner = {
    spinner: null,
    show: function() {
        this.get().show();
    },
    hide: function() {
        this.get().hide();
    },
    get: function() {
        if (this.spinner) return this.spinner;
        $('body').append('<div id="app-spinner" class="spinner"></div>')
        return this.spinner = $('#app-spinner');
    }
}

// anton Đ´ĐžĐąĐ°Đ˛ĐťŃĐľĐź Đ˛ ĐźĐľĐ˝Ń ŃĐž, ŃĐľĐłĐž ŃĐ°Đź ĐąŃŃŃ Đ˝Đľ ĐźĐžĐśĐľŃ
// $(document).ready(function() {
//     $('.ico-presale-menu > a').append('<b class="data">+5<!-- ŃŃĐž Đ˛ all.js ĐśĐ¸Đ˛ŃŃ --></b>');
// });