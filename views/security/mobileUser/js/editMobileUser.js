layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index', //主入口模块
    formSelects: 'formSelect/formSelects-v4.min'
}).use(['index', 'form', 'formSelects', 'qCommon', 'layedit'], function() {
    var $ = layui.$,
        form = layui.form;


    form.verify({ //验证用户输入
        username: [/^[\u4E00-\u9FA5]{1,8}$/, "请输入正确的名称"],
        mobile:[/^[1]((3[0-9])|(4[0-9])|(5[0-9])|(6[0-9])|(7[0-9])|(8[0-9])|(9[0-9]))\d{8}$/,'请输入正确的手机号'],
    });


});