$(function () {
    // 显示弹窗
    function showModal(ele) {
        $('.mask').fadeIn();
        $(ele).fadeIn();
    }
    // 关闭弹窗
    function hideModal(ele) {
        $('.mask').fadeOut();
        $(ele).fadeOut();
    }

    // 点击关闭和确定按钮关闭弹窗
    $('.modal-close').on('touchend', function () {
        var $modal = $(this).parents('.modal');
        hideModal($modal);
    });
    
    // tab切换
    $('.tab-btns').on('touchend', 'li', function (event) {
        var $this = $(this);
        var index = $this.index();
        var $content = $('.tab-content');
        var $thisContent = $content.eq(index);
        $('.tab-btns li').removeClass('act');
        $this.addClass('act');
        $content.hide();
        $thisContent.show();
    });

    // 单选按钮
    $('.form-group-radio').on('touchend', function (event) {
        var $radio = $(this).find('input[type="radio"]');
        var thisName = $radio.attr('name');
        var $radios = $('input[name="'+ thisName +'"]');
        $radios.css('background-position', 'right top');
        $radio.css('background-position', 'left top');

        if ($radio.hasClass('validateMessage')) {
            $('.get-num-group').show();
            $('.password-group').hide();
        } else {
            $('.get-num-group').hide();
            $('.password-group').show();
        }

    });


    // 获取验证码倒计时
    (function () {
        var flag = true;
        var now = 60;
        var timer = null;
        function numCountdown(ele) {
            if (flag == true) {
                flag = false;
                $(ele).addClass('disabled');
                $(ele).html('<i>60</i>s后重新发送');
                timer = setInterval(function () {
                    if (now>1) {
                        now -= 1;
                        $(ele).html('<i>'+ now +'</i>s后重新发送');
                    }
                }, 1000);
                setTimeout(function () {
                    $(ele).removeClass('disabled');
                    $(ele).html('获取验证码');
                    flag = true;
                    timer = null;
                },60000);
            } else {
                return false;
            }
        }

        $('.getNumBtn').on('touchend', function () {
            numCountdown(this);
        });
    })();

    $('.open-btn').on('touchend', function () {
        var flag = $('.wx-tip-content').data('isopen');
        if (flag) {
            $('.wx-tip-content').css('-webkit-line-clamp', '3');
            $('.wx-tip-content').data('isopen',false);
            $(this).text('展开 +');
        } else {
            $('.wx-tip-content').css('-webkit-line-clamp', '1000');
            $('.wx-tip-content').data('isopen',true);
            $(this).text('收起 -');
        }
    });

    // 日期插件
    (function () {
        var currYear = (new Date()).getFullYear();
        var opt={};
        opt.date = {preset : 'date'};
        opt.datetime = {preset : 'datetime'};
        opt.time = {preset : 'time'};
        opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'bottom', //显示方式
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 10, //开始年份
        endYear: currYear + 100, //结束年份
        // minDate: new Date()
        };

        $(".dataStart").mobiscroll($.extend(opt['date'], opt['default']));
        $(".dataEnd").mobiscroll($.extend(opt['date'], opt['default']));
    })();


    // 弹窗验证码
    (function () {
        var code; //在全局定义验证码       
        function createCode() {  
            code = "";  
            var codeLength = 4; //验证码的长度     
            var $checkCode = $('.modal-num');
            var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R','S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数     
            for(var i = 0; i < codeLength; i++) { //循环操作     
                var charIndex = Math.floor(Math.random() * 36); //取得随机数的索引     
                code += random[charIndex]; //根据索引取得随机数加到code上     
            }  
            $checkCode.text(code);//把code值赋给验证码
        }  
        createCode();
        $('.modal-submit').on('touchend', function () {
            var $modal = $(this).parents('.modal');
            var inputCode = $('.modal-num-input').val().toUpperCase(); //取得输入的验证码并转化为大写           
            if(inputCode != code) { //若输入的验证码与产生的验证码不一致时
                $('.modal-num-tip').show();
                createCode(); //刷新验证码
                return false;
            } 
            hideModal($modal);
        });
        $('.modal-num-change').on('touchend', function () {
            createCode();
        });
    })();

    
});