layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'qCommon', 'table'], function() {
    var $ = layui.$,
        form = layui.form,
        table = layui.table,
        qCommon = layui.qCommon;

    console.log(layui);

    qCommon.table({
        elem: '#security_user',
        url: layui.setter.domian + '/account/queryAccountList',
        toolbar : "#toolbar",
        cols: [
            [{type: 'checkbox',fixed: 'left'},
                {field: 'username',title: '账号'},
                {field: 'nickName',title: '昵称'},
                {field: 'isAvailable',title: '启用',templet: '#isAvailable',align: "center"},
                {field: 'addDate',title: '添加时间'},
                {field: 'alterDate',title: '修改时间'},
                {field: 'creater',title: '添加人'},
                {field: 'modifier',title: '修改人'},
                {title: '操作',width:300,align: 'center',fixed: 'right',toolbar: '#security_user_handle'}]
        ],
    });

    //搜索
    form.on('submit(security_user_btn_query)', function(data) {
        //执行重载
        table.reload('security_user', {
            where: data.field
        });
    });

    //监听工具条
    table.on('tool(security_user)', function(obj) {
        var data = obj.data;

        switch (obj.event){
            case 'del':
                del(data);
                break;
            case 'edit':
                edit(data);
                break;
            case 'editPassword':
                editPassword(data);
                break;
        }
    });

    table.on('toolbar(security_user)', function(obj) {
        var data = obj.data;
        switch (obj.event) {
            case 'batchdel':
                batchdel();
                break;
            case 'add':
                add();
                break;
        }
    });

    function add(){
        layer.open({
            type: 2,
            title: '添加新账号',
            content: 'addAccount.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_user");

                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_user)', function(data) {
                    var field = data.field; //获取提交的字段

                    qCommon.ajax({
                        url: "/account/addAccount",
                        data: field,
                        done: function(res) {
                            table.reload('security_user');
                            layer.close(index); //关闭弹层
                        }
                    })
                });

                submit.trigger('click');
            }
        });
    }

    function batchdel(){
        var checkStatus = table.checkStatus('security_user'),
            checkData = checkStatus.data; //得到选中的数据

        if(checkData.length === 0) {
            return layer.msg('请选择数据');
        }

        layer.confirm('确定删除吗？', function(index) {
            qCommon.ajax({
                url: "/account/deleteAccount",
                data: {
                    username: checkData[0].username
                },
                done: function(res) {
                    table.reload('security_user');
                    layer.msg('已删除');
                }
            });
        });
    }

    function del(data){
        layer.confirm('确定删除此角色？', function(index) {
            qCommon.ajax({
                url: "/account/deleteAccount",
                data: {
                    username: data.username
                },
                done: function(res) {
                    table.reload('security_user');
                    layer.msg('已删除');
                }
            });
            layer.close(index);
        });
    }

    function editPassword(data){
        var username = data.username;
        layer.open({
            type: 2,
            title: '编辑账号',
            content: 'editPassword.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_user");
                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_user)', function(data) {
                    var field = data.field; //获取提交的字段

                    if(!(field.password === field.repeatPassword)){
                        layer.msg("两次密码输入不一致");
                        return;
                    }

                    field.password = hex_md5(field.password).substring(0,12);

                    qCommon.ajax({
                        url: "/account/editPassword",
                        data: {
                            username : username,
                            password : field.password
                        },
                        done: function(res) {
                            table.reload('security_user');
                            layer.close(index); //关闭弹层
                        }
                    })
                });

                submit.trigger('click');
            },
        })
    }

    function edit(data){
        layer.open({
            type: 2,
            title: '编辑账号(修改信息)',
            content: 'editUser.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_user");
                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_user)', function(data) {
                    var field = data.field; //获取提交的字段
                    qCommon.ajax({
                        url: "/account/editAccount",
                        data: field,
                        done: function(res) {
                            table.reload('security_user');
                            layer.close(index); //关闭弹层
                        }
                    })
                });

                submit.trigger('click');
            },
            success: function(layero, index) {
                var body = layer.getChildFrame('body',index);
                // 赋初始值
                body.find("input[name='username']").val(data.username);
                body.find("input[name='nickName']").val(data.nickName);
                body.find("#roles").val(data.roles);
                body.find("[name='isAvailable']").each(function(i,item){
                    if($(item).val()==data.isAvailable){
                        $(item).prop('checked',true);
                    }
                });
            }
        })
    }

});