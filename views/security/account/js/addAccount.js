layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index', //主入口模块
    formSelects: 'formSelect/formSelects-v4.min'
}).use(['index', 'form', 'formSelects'], function() {
    var $ = layui.$,
        form = layui.form,
        formSelects = layui.formSelects;

    layui.formSelects.data('roleSelect', 'server', {
        url: layui.setter.domian + '/account/getRoleByOrganization?token=' + localStorage.getItem("token"),
        beforeSuccess: function(id, url, searchVal, result){
            //我要把数据外层的code, msg, data去掉
            result = result.data;
            var data = [];
            for(var i = 0; i < result.length; i++){
                data[data.length] = {
                    name : result[i].nameCn,
                    value : result[i].roleCode
                }
            }
            //然后返回数据
            return data;
        }
    });
})