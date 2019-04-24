layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'qCommon', 'table'], function() {
    var $ = layui.$,
        form = layui.form,
        table = layui.table,
        qCommon = layui.qCommon;
    qCommon.table({
        elem: '#security_quartz',
        url: layui.setter.domian + '/quartz/queryQuartzList',
        toolbar : "#toolbar",
        cols: [
            [
                {type: 'checkbox',fixed: 'left'},
                {field: 'jobName',title: '任务名称'},
                {field: 'jobGroup',title: '任务分组'},
                {field: 'description',title: '任务描述'},
                {field: 'jobClassName',title: '任务执行类'},
                {field: 'cronExpression',title: 'cron'},
                {field: 'triggerState',title: '任务状态',
                    templet: function(d){
                        if(d.triggerState == "PAUSED"){
                            return '<span class="layui-badge">暂停</span>';
                        } else if(d.triggerState == "ACQUIRED"){
                            return '<span class="layui-badge layui-bg-green">执行</span>';
                        }
                        return d.triggerState;
                    }
                },
                {field: 'nextTime',title: '下次时间',
                    templet: function(d){
                        return qCommon.formatDateTime(d.nextTime);
                    }
                },
                {field: 'prevTime',title: '上次时间',
                    templet: function(d){
                        return qCommon.formatDateTime(d.prevTime);
                    }
                },
                {title: '操作',width:400,align: 'center',fixed: 'right',toolbar: '#handle'}
            ]
        ],
    });

    table.on('tool(security_quartz)', function(obj) {
        var data = obj.data;
        switch (obj.event) {
            case "run":
                run(data);
                break;
            case "edit":
                edit(data);
                break;
            case "del":
                del(data);
                break;
            case "stop":
                stop(data);
                break;
            case "resume":
                resume(data);
                break;
        }
    });

    function run(data){
        qCommon.ajax({
            url: "/quartz/triggerQuartz",
            data: data,
            done: function(res) {
                table.reload('security_quartz');
                layer.msg('执行成功');
            }
        });
    }

    function edit(data){
        var oldJobName = data.jobName;
        var oldJobGroup = data.jobGroup;
        layer.open({
            type: 2,
            title: '修改任务',
            content: 'editQuartz.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_quartz");

                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_quartz)', function(data) {
                    var field = data.field; //获取提交的字段
                    field.oldJobName = oldJobName;
                    field.oldJobGroup = oldJobGroup;
                    qCommon.ajax({
                        url: "/quartz/saveQuartz",
                        data: field,
                        done: function(res) {
                            table.reload('security_quartz');
                            layer.close(index); //关闭弹层
                            layer.msg('修改成功');
                        }
                    })
                });

                submit.trigger('click');
            },
            success: function(layero, index) {
                var body = layer.getChildFrame('body',index);
                // 赋初始值
                body.find("input[name='jobName']").val(data.jobName);
                body.find("input[name='jobGroup']").val(data.jobGroup);
                body.find("input[name='description']").val(data.description);
                body.find("input[name='jobClassName']").val(data.jobClassName);
                body.find("input[name='cronExpression']").val(data.cronExpression);
            }
        });
    }

    function del(data){
        qCommon.ajax({
            url: "/quartz/removeQuartz",
            data: data,
            done: function(res) {
                table.reload('security_quartz');
                layer.msg('移除成功');
            }
        });
    }

    function stop(data){
        qCommon.ajax({
            url: "/quartz/pauseQuartz",
            data: data,
            done: function(res) {
                table.reload('security_quartz');
                layer.msg('停止成功');
            }
        });
    }

    function resume(data){
        qCommon.ajax({
            url: "/quartz/resumeQuartz",
            data: data,
            done: function(res) {
                table.reload('security_quartz');
                layer.msg('恢复成功');
            }
        });
    }

    //搜索
    form.on('submit(security_quartz_btn_query)', function(data) {
        //执行重载
        table.reload('security_quartz', {
            where: data.field
        });
    });

    table.on('toolbar(security_quartz)', function(obj) {
        var data = obj.data;
        if(obj.event === 'add'){
            layer.open({
                type: 2,
                title: '新增任务',
                content: 'addQuartz.html',
                area: ['500px', '480px'],
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index],
                        submit = layero.find('iframe').contents().find("#security_submit_quartz");

                    //监听提交
                    iframeWindow.layui.form.on('submit(security_submit_quartz)', function(data) {
                        var field = data.field; //获取提交的字段

                        qCommon.ajax({
                            url: "/quartz/saveQuartz",
                            data: field,
                            done: function(res) {
                                table.reload('security_quartz');
                                layer.close(index); //关闭弹层
                                layer.msg("新增任务");
                            }
                        })
                    });

                    submit.trigger('click');
                }
            });
        }

    });
});