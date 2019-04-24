layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index', //主入口模块
    iconPicker : 'iconPicker/iconPicker', //icon图标选择器
    yutons_sug : 'yutons-mods/yutons_sug'
}).use(['index',  'qCommon', 'form', 'yutons_sug', 'iconPicker'], function() {
    var $ = layui.$,
        setter = layui.setter,
        qCommon = layui.qCommon,
        iconPicker = layui.iconPicker,
        yutons_sug = layui.yutons_sug,
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
        }
    });

    //初始化分组输入提示框
    yutons_sug.render({
        id: "groupCn", //设置容器唯一id
        type: 'sug', //设置输入框提示类型：sug-下拉框，sugTable-下拉表格
        url: "/menu/getMenuByGroupCn?groupCn=" //设置异步数据接口,url为必填项
    });
})