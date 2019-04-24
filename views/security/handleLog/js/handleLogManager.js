layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'qCommon', 'table'], function () {
    var $ = layui.$,
        form = layui.form,
        table = layui.table,
        qCommon = layui.qCommon;

    qCommon.table({
        elem: '#security_handle_log',
        url: layui.setter.domian + '/handleLog/queryHandleList',
        toolbar: "#toolbar",
        cols: [
            [{
                type: 'checkbox',
                fixed: 'left'
            },
                {
                    field: 'operation',
                    title: '操作'
                },
                {
                    field: 'username',
                    title: '账号'
                },
                {
                    field: 'hasException',
                    title: '异常',
                    templet: '#hasException',
                    align: 'center'
                },
                {
                    field: 'ip',
                    title: 'IP'
                },
                {
                    field: 'url',
                    title: '访问地址'
                },
                {
                    field: 'type',
                    title: '请求方式',
                    templet: '#type',
                    align: 'center'
                },
                {
                    field: 'way',
                    title: '类型'
                },
                {
                    field: 'methodName',
                    title: '方法'
                },
                {
                    field: 'classPath',
                    title: '类路径'
                },
                {
                    field: 'param',
                    title: '参数',
                    align: "center",
                    templet: function (d) {
                        return '<button class="layui-btn layui-btn-primary layui-btn-xs queryParam">查看</span>'
                    }
                },
                {
                    field: 'sessionId',
                    title: 'sessionID'
                },
                {
                    field: 'startDate',
                    title: '请求时间'
                },
                {
                    field: 'returnTime',
                    title: '完成时间'
                },
                {
                    field: 'finishTime',
                    title: '时间差(ms)'
                },
                {
                    field: 'returnData',
                    title: '返回值',
                    templet: function (d) {
                        return '<button class="layui-btn layui-btn-primary layui-btn-xs">查看</span>'
                    }
                },
            ]
        ],
    });

    $(".queryParam").on('click', function () {
        var html = '<pre class="layui-code" lay-title="JavaScript" lay-skin="notepad">//代码区域';
        html += 'Lay.fn.event = function(modName, events, params){';
        html += 'var that = this, result = null, filter = events.match(/\(.*\)$/)||[];';
        html += 'var set = (events = modName + "."+ events).replace(filter, "");';
        html += '};';
        html += '</pre>';
        layer.open({
            type: 1,
            content: html //这里content是一个普通的String
        });
    })

    //搜索
    form.on('submit(security_user_btn_query)', function (data) {
        //执行重载
        table.reload('security_user', {
            where: data.field
        });
    });

});