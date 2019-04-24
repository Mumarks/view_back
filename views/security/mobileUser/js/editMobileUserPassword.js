layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index', //主入口模块
    formSelects: 'formSelect/formSelects-v4.min'
}).use(['index', 'form', 'formSelects', 'qCommon', 'laytpl', 'layedit'], function() {
    var $ = layui.$,
        form = layui.form;

    form.verify({ //验证用户输入
        psd:[/^[a-zA-Z0-9]{6,10}$/,'密码只包含6-10位数字、字母'],
        psd1: function(value) {
            //获取密码
            var psd = $("#psd").val();
            if(!new RegExp(psd).test(value)) {
                return '两次输入的密码不一致';
            }
        }
    });


})