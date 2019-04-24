layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index', //主入口模块
    treeselect: 'treeSelect/treeselect'
}).use(['index', 'treeselect', 'qCommon', 'form'], function() {
    var $ = layui.$,
        treeSelect = layui.treeselect,
        setter = layui.setter,
        qCommon = layui.qCommon,
        form = layui.form;
    qCommon.ajax({
        url : '/organization/queryOrganizationTree',
        done : function(res){
            var data = res.data;
            treeSelect.render({ // 选择器
                elem: '#organization', // 数据
                data: data, // 异步加载方式：get/post，默认get
                placeholder: '请选择机构',  // 是否开启搜索功能：true/false，默认false
                search: true, // 点击回调
                click: function(d){
                },  // 加载完成后的回调函数
                success: function (d) {
                }
            });
        }
    })


})