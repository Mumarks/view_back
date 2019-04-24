layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index', //主入口模块
    iconPicker : 'iconPicker/iconPicker' //icon图标选择器
}).use(['index',  'qCommon', 'form', 'iconPicker'], function() {
    var $ = layui.$,
        setter = layui.setter,
        qCommon = layui.qCommon,
        iconPicker = layui.iconPicker,
        form = layui.form;

    // 初始化选择图标
    iconPicker.render({
        // 选择器，推荐使用input
        elem: '#icon',
        // 数据类型：fontClass/unicode，推荐使用fontClass
        type: 'fontClass',
        // 是否开启搜索：true/false
        search: false,
        // 是否开启分页
        page: true,
        // 每页显示数量，默认12
        limit: 12,
        // 点击回调
        click: function (data) {
            $("#icon").val(data.icon);
        }
    });
    iconPicker.checkIcon('iconPicker', $("#iconHidden").val());
})