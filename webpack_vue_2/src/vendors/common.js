//全局公用操作库 by Dragon 2015-12-29
// DT.alert 提示窗
// DT.dialog 提示确认窗
// DT.loading 加载提示[true显示,false隐藏]
// DT.cookie cookie操作(set写入，get读取)
// DT.getUrlParam //获得url上的参数(Key=获取参数值，为空获取所有)
// DT.supportCss3 //验证是否支持CSS3属性
// DT.isMobileBrowser //是否是移动端浏览器
// DT.clickEvent //点击事件,会自动转换成tap事件
// DT.validate  //验证集合
// DT.alert 提示层


var DT = (function($, window) {


    //请求地址
    var _requestUrl = {
        account: {
            queryAccountInfo: "/licai/queryAccount",
            queryAccountBySource: "/xfd/queryAccount",
            queryFinanceInfo: "/licai/queryYestProfit",
            queryVipProfit: "/mobile/insurance/detail",
            queryVipBox: "/licai/queryFundInfo",
            queryIncomeProfit:"/licai/queryFundIncomeAndProfitInfo",
            queryPromotion:"/licai/queryFundPromotionInfo",
            queryTotalAmount:"/licai/queryFundTotalAmount",
            queryVipBaoTotalBalance : "/licai/queryTotalBalance",
            queryAmountAndProfit : "/licai/assets/queryAmountAndProfit",
            queryVCoinProfitInfo :"/licai/assets/queryVCoinProfitInfo",
            queryBottomDisplayModule : "/queryBottomDisplayModule"
        }
    };

    //请求状态
    var _result = {
        success: 1,
        false: 0
    }

    // var debugUrl = {
    //     account: {
    //         queryAccountInfo: "mockData/account.json",
    //         queryAccountBySource: "mockData/queryAccountBySource.json"
    //     }
    // }

    // $.extend(_requestUrl, debugUrl);



    //是否是移动端浏览器
    var _isMobileBrowser = function() {
        var hash = window.location.hash,
            result = false;
        if (!hash.match("fromapp")) {
            result = navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
        }
        return result;
    }();

    var _clickEvent = _isMobileBrowser ? 'tap' : 'click';

    function getUrlParam(key) {

        var value = "",
            itemarr = [],
            urlstr = window.location.href.split("?");

        if (urlstr[1]) {

            var item = urlstr[1].split("&"),
                rst = {};

            for (i = 0; i < item.length; i++) {

                itemarr = item[i].split("=");

                rst[itemarr[0]] = itemarr[1];

            }
        } else {

            return null;
        }

        if (key) {

            return rst[key] ? decodeURIComponent(rst[key]) : '';

        } else {

            return rst ? decodeURIComponent(rst) : '';
        }
    }

    function isExists(o, type) {
        return o != undefined && o !== null && (type ? o.constructor == type : true);
    }

    return {
        debug: false, //(getUrlParam('debug')==='true'),
        account: '',
        getUrl: function(path) {
            var href = location.href;
            return href.substring(0, href.lastIndexOf("/")) + (path || '/');
        },
        alertShare: function(title, explain) {
            var shareHtml = new StringBuilder();
            shareHtml.append("<div class=\"share-tip\">");
            shareHtml.append("<div class=\"share-arrows\"><img src=\"../images/common/nh-share-arrow.png\"  ></div>");
            if (title) {
                shareHtml.appendFormat("<div class=\"share-title\">{0}</div>", title);
            }
            if (explain) {
                shareHtml.appendFormat("<div class=\"share-explain\">{0}</div>", explain);
            }
            shareHtml.append("</div>");
            $('body').append(shareHtml.toString());
            $('.share-tip').bind(DT.clickEvent, function() {
                $(this).remove();
            });
        },
        pageLoadComplate: function(callback) {

            var img_count = $('img').length,
                cur_count = 0;

            var imgLoad = imagesLoaded($('img'), function() {

                $('#loading').hide();
                callback();
            });

            imgLoad.on('progress', function(instance, image) {

                var result = image.isLoaded ? 'loaded' : 'broken';

                if (image.isLoaded) {
                    cur_count++;
                }

                $('.loadprogress').width(~~(cur_count / img_count * 100));

                $('.numprogress').html(~~(cur_count / img_count * 100) + '%');
            });
        },
        toPage: function(url, params) {
            location.href = url + (params ? "?" + params : "");

        },
        ajax: function(url, params, success, error) {
            var self = this,
                _params = {
                    openid: self.getUrlParam('storeId') || "6",
                    storeId: DT.cookie.get("keyStoreId") || "", //基础门店ID
                    req: ""
                };
            _params = $.extend(_params, params);
            if (_params.req) {
                _params.req = JSON.stringify(_params.req);
            };
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'post',
                data: _params,
                beforeSend: function() {
                    DT.loading(1);
                },
                success: function(data) {
                    DT.loading(0);
                    if (self.isFunction(success)) {
                        success(data);
                    };
                },
                error: function() {
                    DT.loading(0);
                    if (self.isFunction(error)) {
                        error();
                    };
                }
            });
        },
        isFunction: function(v) {
            return toString.apply(v) === '[object Function]';
        },
        alert: function(message, callback) {
            DT.dialog({
                'content': message,
                'type': 'Alert',
                'CallBackOk': function() {
                    DT.dialog('CLOSE');
                    if (DT.isFunction(callback)) {
                        callback();
                    };
                }
            });

        },
        dialog: function(cfg) {

            if (cfg == 'CLOSE') {

                var panel = $('.jit-ui-panel');

                if (panel) {

                    (panel.parent()).remove();
                }

            } else {

                cfg.LabelOk = cfg.LabelOk ? cfg.LabelOk : '确定';

                cfg.LabelCancel = cfg.LabelOk ? cfg.LabelCancel : '取消';

                var panel, btnstr;

                if (cfg.type == 'Alert' || cfg.type == 'Confirm') {

                    btnstr = (cfg.type == 'Alert') ? '<a id="jit_btn_ok" style="margin:0 auto">' + cfg.LabelOk + '</a>' : '<a id="jit_btn_cancel">' + cfg.LabelCancel + '</a><a id="jit_btn_ok">' + cfg.LabelOk + '</a>';

                    panel = $('<div id="dialog_div"><div class="jit-ui-panel"></div><div name="jitdialog" style="margin-top:120px" class="popup br-5">' + '<p class="ac f14 white" id="dialog__content">' + cfg.content + '</p><div class="popup_btn">' + btnstr + '</div></div></div>');

                } else if (cfg.type == 'Dialog') {
                    if (cfg.isAppend) { //追加内容
                        if ($("#dialog__content").length) {
                            $("#dialog__content").append("<br/>" + cfg.content);
                        } else {
                            panel = $('<div id="dialog_div"><div class="jit-ui-panel"></div><div style="margin-top:120px" class="popup br-5"><p class="ac f14 white" id="dialog__content">' + cfg.content + '</p></div></div>');
                        }
                    } else {
                        panel = $('<div id="dialog_div"><div class="jit-ui-panel"></div><div style="margin-top:120px" class="popup br-5"><p class="ac f14 white" id="dialog__content">' + cfg.content + '</p></div></div>');
                    }
                    if (cfg.times) {
                        setTimeout(function() {
                            $("#dialog_div").hide();
                        }, cfg.times);
                    }
                }

                if (panel) {
                    panel.css({
                        'position': 'fixed',
                        'left': '0',
                        'right': '0',
                        'top': '0',
                        'bottom': '0',
                        'z-index': '99999'
                    });
                    if ($("#dialog_div").length) {
                        $("#dialog_div").remove();
                    }
                    panel.appendTo($('body'));
                    (function(panel, cfg) {

                        setTimeout(function() {

                            if (cfg.CallBackOk) {

                                $(panel.find('#jit_btn_ok')).bind(DT.clickEvent, cfg.CallBackOk);
                            }
                            if (cfg.CallBackCancel) {

                                $(panel.find('#jit_btn_cancel')).bind(DT.clickEvent, cfg.CallBackCancel);

                            } else {

                                $(panel.find('#jit_btn_cancel')).bind(DT.clickEvent, function() {
                                    DT.dialog('CLOSE');
                                });
                            }
                        }, 16);

                    })(panel, cfg);
                }

            }

        },
        loading: function(display, msg) {
            if (display || arguments.length == 0) {

                msg = msg || '正在加载...';

                var _html = '<div id="wxloading" class="wx_loading">' + '<div class="wx_loading_inner">' + '<i class="wx_loading_icon"></i>' + '<span>' + msg + '</span>' + '</div>' + '</div>'

                $('body').append(_html);

            } else {

                $('#wxloading').remove();
            }

        },
        cookie: {
            set: function(name, value, expires, path) {
                var expdate = new Date();
                expires = expires || 1;

                expdate.setTime(expdate.getTime() + (expires * 1000));

                document.cookie = name + "=" + escape(value) + ";expires=" + expdate.toGMTString() + (path ? ";path=" + path : "");
            },
            get: function(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

                if (arr = document.cookie.match(reg))

                    return unescape(arr[2]);
                else
                    return null;
            }

        }, //获得url上的参数

        /*
         * 按版本号缓存数据
         * @method setStoreResult
         * @param cacheKey
         * @return <object> {version,content}
         */
        setStoreResult: function(cacheKey, version, content) {
            this.store(cacheKey, {
                version: version || 0,
                content: content
            });
        },

        /*
         * 根据key获取version版本的数据
         * @method getStoreResult
         * @param cacheKey
         * @return <object> {version,content}
         */
        getStoreResult: function(cacheKey, version) {

            var result = this.store(cacheKey);

            //如果没有版本号,直接返回缓存中的数据
            if (!isExists(version)) {
                return result;
            }

            //取指定版本的缓存数据,如果数据格式不规范,则为空
            if ($.isEmptyObject(result) || !('version' in result) || !('content' in result)) {
                return null;
            }

            //版本号为0,取最新的缓存; 版本匹配,命中缓存
            if (0 == version || result.version == version) {
                return result.content;
            }

            return null;
        },

        /**
         * [store 本地缓存]
         * @param  name
         * @param  value  null,删除此值
         * @param  options
         * @param  options.prefix  [自定义前缀,不加此参数,生成系统前缀的Key]
         */
        store: function(name, value, options) {
            if (!options) {
                name = ('SHOW_' + name).toUpperCase();
            } else if ('prefix' in options) {
                name = (options.prefix ? options.prefix + '_' : '') + name;
            }
            if ('undefined' != typeof value) {
                if (value == null) {
                    localStorage.removeItem(name);
                } else {
                    return localStorage.setItem(name, JSON.stringify(value));
                }
            } else {
                var val = localStorage.getItem(name);
                if (isExists(val)) {
                    return JSON.parse(val);
                } else {
                    return val;
                }
            }
        },

        getUrlParam: getUrlParam,
        supportCss3: function(style) { //验证是否支持Css3属性
            var prefix = ['webkit', 'Moz', 'ms', 'o'],
                i,
                humpString = [],
                htmlStyle = document.documentElement.style,
                _toHumb = function(string) {
                    return string.replace(/-(\w)/g, function($0, $1) {
                        return $1.toUpperCase();
                    });
                };

            for (i in prefix)
                humpString.push(_toHumb(prefix[i] + '-' + style));

            humpString.push(_toHumb(style));

            for (i in humpString)
                if (humpString[i] in htmlStyle) return true;

            return false;
        },
        validate: {
            isEmail: function(v) { //邮箱
                return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v);
            },
            isPhone: function(v) { //电话
                return /^([0\+]\d{2,3}-?)?(0\d{2,3}-?)?(\d{7,8})([- ]+\d{1,6})?$/.test(v);
            },
            isMobile: function(v) { //手机
                return /^([0\+]\d{2,3})?(0?1[3458]\d{9})$/.test(v);
            },
            isPostCode: function(v) { //邮政编码
                return /^\d{6}$/.test(v);
            },
            isIdCard: function(v) { //身份证
                //15位数身份证正则表达式
                var regShort = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
                //18位数身份证正则表达式
                var regLong = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[A-Z])$/;
                if (str.match(regShort) == null && str.match(regLong) == null) {
                    return false;
                } else {
                    return true;
                }
                return regLong.test(v) || regShort.test(v);
            },
            isUrl: function(v) { //Url地址
                return /(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/.test(v);
            },
            isInteger: function(v) { //整数
                return /^[-]{0,1}[0-9]{1,}$/.test(v);
            },
            isDecimal: function(v) { //验证整数及浮点数
                if (this.isInteger(v)) return true;
                var re = /^[-]{0,1}(\d+)[\.]+(\d+)$/;
                if (re.test(v)) {
                    if (RegExp.$1 == 0 && RegExp.$2 == 0) return false;
                    return true;
                } else {
                    return false;
                }
            },
            isDate: function(date, fmt) { //验证日期格式
                if (fmt == null) fmt = "yyyyMMdd";
                var yIndex = fmt.indexOf("yyyy");
                if (yIndex == -1) return false;
                var year = date.substring(yIndex, yIndex + 4);
                var mIndex = fmt.indexOf("MM");
                if (mIndex == -1) return false;
                var month = date.substring(mIndex, mIndex + 2);
                var dIndex = fmt.indexOf("dd");
                if (dIndex == -1) return false;
                var day = date.substring(dIndex, dIndex + 2);
                if (!isNumber(year) || year > "2100" || year < "1900") return false;
                if (!isNumber(month) || month > "12" || month < "01") return false;
                if (day > getMaxDay(year, month) || day < "01") return false;

                function getMaxDay(year, month) {
                    if (month == 4 || month == 6 || month == 9 || month == 11)
                        return "30";
                    if (month == 2)
                        if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
                            return "29";
                        else
                            return "28";
                    return "31";
                }

                return true;
            }
        },
        addMarSead: function(marsSeadName) {
            //手动添加埋点
            var aHtml = $("<a id='btnMarsSeadHelpButton' href='javascript:;' mars_sead='" + marsSeadName + "' style='display:none;'></a>");
            var aTag = $("#btnMarsSeadHelpButton");
            aTag && aTag.length == 1 ? (function() {
                //console.log('存在的情况');
                aTag.attr("mars_sead", marsSeadName).click();
            })() : (function() {
                //console.log('创建a标签并且追加到body中');
                aHtml.appendTo("body");
                $("#btnMarsSeadHelpButton").attr("mars_sead", marsSeadName).click();

            })();
        },
        isMobileBrowser: _isMobileBrowser,
        clickEvent: _clickEvent,
        url: _requestUrl,
        result: _result,
        host:window.serverHost||'',
        staticDomainUrl:window.staticDomainUrl||'',
        version:window.currentSysTemVersion||'',
        checkLogin:~~(window.checkUserLogin)
    }
})(jQuery, window);



//汉字及字母长度一致获取字符长度
String.prototype.len = function() {
    var l = 0;
    var a = this.split("");
    for (var i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < 299) {
            l++;
        } else {
            l += 2;
        }
    }
    return l;
};
//汉字及字母长度一致截断字符
String.prototype.cut = function(len, substr) {
    if (this.len() <= len) return this;
    sl = substr.len();
    var sb = new StringBuilder();
    var l = 0;
    var a = this.split("");
    for (var i = 0; i < a.length; i++) {
        if (l >= len - sl) break;
        if (a[i].charCodeAt(0) < 299) {
            l++;
        } else {
            l += 2;
        }
        if (l > len) sb.append(" ");
        else sb.append(a[i]);
    }
    sb.append(substr);
    return sb.toString();
};

//拼接字符串格式化
function StringBuilder() {
    this.strList = [];
    this.append = function(v) {
        if (v) {
            this.strList.push(v);
        };
    };
    this.appendFormat = function(v) {
        if (v) {
            if (arguments.length > 1) {
                for (var i = 1; i < arguments.length; i++) {
                    var Rep = new RegExp("\\{" + (i - 1) + "\\}", "gi");
                    v = v.replace(Rep, arguments[i]);
                };
            }
            this.strList.push(v);
        };
    };
    this.toString = function() {
        return this.strList.join('');
    };
}



// 添加jq touch 事件
(function($, window) {
    if (!$) {
        return false
    };
    var touch = {},
        touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
        longTapDelay = 750,
        gesture

    function swipeDirection(x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >=
        Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    }

    function longTap() {
        longTapTimeout = null
        if (touch.last) {
            touch.el.trigger('longTap')
            touch = {}
        }
    }

    function cancelLongTap() {
        if (longTapTimeout) clearTimeout(longTapTimeout)
        longTapTimeout = null
    }

    function cancelAll() {
        if (touchTimeout) clearTimeout(touchTimeout)
        if (tapTimeout) clearTimeout(tapTimeout)
        if (swipeTimeout) clearTimeout(swipeTimeout)
        if (longTapTimeout) clearTimeout(longTapTimeout)
        touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
        touch = {}
    }

    function isPrimaryTouch(event) {
        return (event.pointerType == 'touch' ||
            event.pointerType == event.MSPOINTER_TYPE_TOUCH) && event.isPrimary
    }

    function isPointerEventType(e, type) {
        return (e.type == 'pointer' + type ||
        e.type.toLowerCase() == 'mspointer' + type)
    }

    $(document).ready(function() {
        var now, delta, deltaX = 0,
            deltaY = 0,
            firstTouch, _isPointerType

        if ('MSGesture' in window) {
            gesture = new MSGesture()
            gesture.target = document.body
        }

        $(document)
            .bind('MSGestureEnd', function(e) {
                var swipeDirectionFromVelocity =
                    e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
                if (swipeDirectionFromVelocity) {
                    touch.el.trigger('swipe')
                    touch.el.trigger('swipe' + swipeDirectionFromVelocity)
                }
            })
            .on('touchstart MSPointerDown pointerdown', function(e) {
                e.touches = (e.touches ? e.touches : e.originalEvent.touches);
                if ((_isPointerType = isPointerEventType(e, 'down')) && !isPrimaryTouch(e)) return
                firstTouch = _isPointerType ? e : (e.touches ? e.touches[0] : e.originalEvent.touches[0])
                if ((e.touches) && (e.touches.length === 1) && touch.x2) {
                    // Clear out touch movement data if we have it sticking around
                    // This can occur if touchcancel doesn't fire due to preventDefault, etc.
                    touch.x2 = undefined
                    touch.y2 = undefined
                }
                now = Date.now()
                delta = now - (touch.last || now)
                touch.el = $('tagName' in firstTouch.target ?
                    firstTouch.target : firstTouch.target.parentNode)
                touchTimeout && clearTimeout(touchTimeout)
                touch.x1 = firstTouch.pageX
                touch.y1 = firstTouch.pageY
                if (delta > 0 && delta <= 250) touch.isDoubleTap = true
                touch.last = now
                longTapTimeout = setTimeout(longTap, longTapDelay)
                // adds the current touch contact for IE gesture recognition
                if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
            })
            .on('touchmove MSPointerMove pointermove', function(e) {
                if ((_isPointerType = isPointerEventType(e, 'move')) && !isPrimaryTouch(e)) return
                firstTouch = _isPointerType ? e : (e.touches ? e.touches[0] : e.originalEvent.touches[0])
                cancelLongTap()
                touch.x2 = firstTouch.pageX
                touch.y2 = firstTouch.pageY

                deltaX += Math.abs(touch.x1 - touch.x2)
                deltaY += Math.abs(touch.y1 - touch.y2)
            })
            .on('touchend MSPointerUp pointerup', function(e) {
                if ((_isPointerType = isPointerEventType(e, 'up')) && !isPrimaryTouch(e)) return
                cancelLongTap()

                // swipe
                if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
                    (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

                    swipeTimeout = setTimeout(function() {
                        touch.el.trigger('swipe')
                        touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
                        touch = {}
                    }, 0)

                else if ('last' in touch)
                    if (deltaX < 30 && deltaY < 30) {
                        // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
                        // ('tap' fires before 'scroll')
                        tapTimeout = setTimeout(function() {

                            // trigger universal 'tap' with the option to cancelTouch()
                            // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
                            var event = $.Event('tap')
                            event.cancelTouch = cancelAll
                            touch.el.trigger(event)

                            // trigger double tap immediately
                            if (touch.isDoubleTap) {
                                if (touch.el) touch.el.trigger('doubleTap')
                                touch = {}
                            }

                            // trigger single tap after 250ms of inactivity
                            else {
                                touchTimeout = setTimeout(function() {
                                    touchTimeout = null
                                    if (touch.el) touch.el.trigger('singleTap')
                                    touch = {}
                                }, 250)
                            }
                        }, 0)
                    } else {
                        touch = {}
                    }
                deltaX = deltaY = 0

            })
            .on('touchcancel MSPointerCancel pointercancel', cancelAll)
        $(window).on('scroll', cancelAll)
    })

    ;
    ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
        'doubleTap', 'tap', 'singleTap', 'longTap'
    ].forEach(function(eventName) {
            $.fn[eventName] = function(callback) {
                return this.on(eventName, callback)
            }
        })
})(jQuery, window);



/*添加jqueryCookie插件 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));


//     //账户操作
// var userHandle = {};
// userHandle.isLogin = (function() {


//     //验证用户是否在唯品会登陆

//     //模拟登陆
//     DT.cookie.set('triton','v85ce132064be2176068b006e8c55b084',360);
//     DT.cookie.set('saturn','BjNdPAhgUjVQOAA2BmdRNwE5XDkAMw',360);

//     var triton = DT.cookie.get('triton');
//     var saturn = DT.cookie.get('saturn');

//     // saturn = "v85ce132064be2176068b006e8c55b084";
//     // triton = "BjNdPAhgUjVQOAA2BmdRNwE5XDkAMw";


//     return triton && saturn?1:0
// })();
// userHandle.init = function(callback) {


//     if (!userHandle.isLogin) {
//         $.isFunction(callback) && callback();
//         return false;
//     }
//     //初始化用户信息
//     var self = this;
//     $.ajax({
//         type: 'post',
//         url: DT.url.account.queryAccountInfo,
//         data: {},
//         dataType: 'json',
//         success: function(res) {

//             if (res.code == DT.result.success) {
//                 res.data && $.extend(self, res.data);
//             } else {
//             }
//             $.isFunction(callback) && callback();
//             // 跳到合适的页面
//             // self.decidePage();
//         },
//         error: function() {
//             // TODO 请求出错
//         }
//     });

// };
