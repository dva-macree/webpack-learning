/**
 *  author : zhiyuan.jiang
 *  导航栏的头条新闻跑马灯效果
 *  options
 *
 *  marqueeObject : 跑马灯对象 ul,
 *  marqueeDelay : 跑马灯滚动延时,
 *  marqueeHeight : 跑马灯区域高度,
 *  marqueeWidth : 跑马灯区域宽度
 *  isRecursive : 跑马灯是否无线循环滚动
 */

    var _$marqueeObject,_$marqueeObjectList,
        _marqueeLength,_marqueeWidth,
        _options,_$marqueeId,
        _marqueeInterval1 = null,   //跑马灯延时效果的interval
        _marqueeInterval2 = null,   //跑马灯上下滚动的interval
        _currentIndex = 0,          //跑马灯当前展示的序号
        _previousScrollUp,

        _init = function(options){
            _options = $.extend({
                marqueeDelay : 3000,
                isRecursive : true
            },options || {});

            _$marqueeObject = _options.marqueeObject;
            _$marqueeObjectList = _$marqueeObject.find("li");
            _marqueeLength = _$marqueeObject.children().length;
            _marqueeWidth = _options.marqueeWidth;
            _options._marqueeHeight = _$marqueeObject.find("li").height();

            var firestItemchildrenWidth = _getItemChildrenWidth(_currentIndex);
            if(firestItemchildrenWidth > _marqueeWidth){
                var gap = firestItemchildrenWidth - _marqueeWidth
                _scrollSingleNews(_currentIndex);
            }else{
                _marqueeInterval1 = setInterval(_startMarquee,_options.marqueeDelay);
            }

        },
        _startMarquee = function(){
            clearInterval(_marqueeInterval2);
            if(_options.isRecursive){
                _marqueeInterval2 = setInterval(_scrollMarquee2,20);
            }else{
                _marqueeInterval2 = setInterval(_scrollMarquee,20);
            }

        },

        _scrollMarquee = function(){
            _previousScrollUp = _$marqueeObject.scrollTop();
            _$marqueeObject.scrollTop(_previousScrollUp+1);
//            console.log(_$marqueeObject.scrollTop()%_options._marqueeHeight);
//            console.log(_options._marqueeHeight - 1);

            if(_$marqueeObject.scrollTop()%_options._marqueeHeight==_options._marqueeHeight - 1 || _previousScrollUp == _$marqueeObject.scrollTop()){
                //console.log(_$marqueeObject.scrollTop());
                //console.log(_options._marqueeHeight - 1);
                //console.log("end--------");
                clearInterval(_marqueeInterval2);
                _currentIndex++;
                var previousItem = _$marqueeObjectList[_currentIndex  - 1];
                $(previousItem).css("margin-left","0px");

                if(_currentIndex == _marqueeLength){
                    console.log("start again--------");
                    //_$marqueeObject.animate({scrollTop: '0px'}, 800);
                    _$marqueeObject.scrollTop(0);
                    _currentIndex = 0;
                }
                _scrollSingleNews(_currentIndex)
            }
        },
        _scrollMarquee2 = function(){
            _previousScrollUp = _$marqueeObject.scrollTop();
            _$marqueeObject.scrollTop(_previousScrollUp+1);
            if(_$marqueeObject.scrollTop()%_options._marqueeHeight==_options._marqueeHeight - 1 || _previousScrollUp == _$marqueeObject.scrollTop()){
                clearInterval(_marqueeInterval2);
                _currentIndex++;
                var previousItem = _$marqueeObjectList[_currentIndex  - 1];
                $(previousItem).css("margin-left","0px");
                $(previousItem).remove();
                _$marqueeObject.append($(previousItem));


                var domNodes = Array.prototype.slice.call(_$marqueeObjectList);
                domNodes.push(domNodes.shift());
                _$marqueeObjectList = domNodes;
//                console.log(domNodes);
                _previousScrollUp = 0;
                _$marqueeObject.scrollTop(_previousScrollUp);
                _currentIndex--;
                _scrollSingleNews(_currentIndex);

            }
        },
        _scrollSingleNews = function(index){
            var topNewsItem = _$marqueeObjectList[index];
//            console.log(index);
//            console.log(topNewsItem);
            var childrenWidth = _getItemChildrenWidth(index);
            if(childrenWidth > _marqueeWidth){
//                console.log("out of range");
                var overflowWidth = childrenWidth - _marqueeWidth;
                clearInterval(_marqueeInterval1);
                $(topNewsItem).animate({"margin-left":overflowWidth * -1 + "px"},{ duration: 9000, queue: false, complete: function() { _marqueeInterval1 = setInterval(_startMarquee,_options.marqueeDelay);  } });
            }

        },
        _getItemChildrenWidth = function(index){
            var topNewsItem = _$marqueeObjectList[index];
            var chidrenWidth = 0;
            $.each(topNewsItem.children, function(index,value){
                chidrenWidth+= $(value).width();
            })
            return chidrenWidth;
        }

//    return {
//        init : function(options){
//            _init(options);
//        }
//    }
//}( window,jQuery));
    
    module.exports = {
        init : function(options){
            _init(options);
        }
    }

