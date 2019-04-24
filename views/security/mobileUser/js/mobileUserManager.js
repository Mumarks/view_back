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
        elem: '#security_user',
        url: layui.setter.domian +'/mobileUser/queryMobileUser',
        toolbar: "#toolbar",
        cols: [
            [{
                type: 'checkbox',
                fixed: 'left'
            },
                {
                    field: 'username',
                    title: '姓名'
                },
                {
                    field: 'nickName',
                    title: '昵称'
                },
                {
                    field: 'mobile',
                    title: '手机号'
                },
                {
                    field: 'isAvailable',
                    title: '可用/不可用',
                    templet: '#isAvailable',
                    align: "center"
                },
                {
                    field: 'remark',
                    title: '备注',
                },
                {
                    title: '操作',
                    width: 300,
                    align: 'center',
                    fixed: 'right',
                    toolbar: '#security_user_handle'
                }
            ]
        ],
    });

    //监听工具条
    table.on('tool(security_user)', function(obj) {
        var data = obj.data;
        switch (obj.event){
            case "del":
                del(data);
                break;
            case "edit":
                edit(data);
                break;
            case "detailed":
                detailed(data);
                break;
            case "Password":
                Password(data);
                break;
        }
    });

    function del(data){
        layer.confirm('确定删除此人员？', function(index) {
            qCommon.ajax({
                url: '/mobileUser/deleteMobileUser',
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

    function edit(data){
        layer.open({
            type: 2,
            title: '编辑用户',
            content: 'editMobileUser.html',
            area: ['700px', '600px'],
            btn: ['确定', '取消'],
            resize: false,
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_user");
                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_user)', function(data) {
                    var field = data.field,
                        username = field.username,
                        nickName = field.nickName,
                        mobile = field.mobile,
                        remark = field.remark,
                        possessor = field.possessor
                    qCommon.ajax({
                        url: "mobileUser/editMobileUser",
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
                // 赋初始值
                var body = layer.getChildFrame('body', index);
                body.find("input[name='username']").val(data.username); //用户名
                body.find("input[name='nickName']").val(data.nickName);  // 昵称
                body.find("input[name='mobile']").val(data.mobile) //手机号
                body.find("input[name='remark']").val(data.remark);//备注
            }
        })
    }

    function detailed(data){
        layer.open({
            type: 2,
            title: '用户详情',
            content: 'detailsMobileUser.html',
            area: ['700px', '600px'],
            resize: false,
            success: function(layero, index) {
                var body = layer.getChildFrame('body', index);
                body.find("input[name='username']").val(data.username); //用户名
                body.find("input[name='nickName']").val(data.nickName);  // 昵称
                body.find("input[name='mobile']").val(data.mobile) //手机号
                body.find("input[name='remark']").val(data.remark);//备注
                body.find("input[name='password']").val(data.password); //密码

            }
        })
    }

    function Password(data){
        layer.open({
            type: 2,
            title: '修改用户密码',
            content: 'editMobileUserPassword.html',
            area: ['500px', '300px'],
            btn: ['确定', '取消'],
            resize: false,
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_user");
                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_user)', function(data) {
                    var field = data.field,
                        passwords = hex_md5(field.password).substring(0,12);
                    username = field.username
                    qCommon.ajax({
                        url: "mobileUser/editUserPassWord",
                        data: {
                            "username":field.username,
                            "password":passwords

                        },
                        done: function(res) {
                            table.reload('security_user');
                            layer.close(index); //关闭弹层
                        }
                    })
                });

                submit.trigger('click');
            },
            success: function(layero, index) {
                var body = layer.getChildFrame('body', index);
                body.find("input[name='username']").val(data.username); //用户名
            }
        });
    }

    // 开关按钮
    form.on('switch(isAvailable)', function(data){
        qCommon.ajax({
            url: "/role/editRoleByIsLock",
            data: {
                roleCode : data.elem.dataset.value,
                isAvailable : data.value
            },
            done: function(res) {
                table.reload('security_user');
            }
        });
    });


    //搜索
    form.on('submit(security_user_btn_query)', function(data) {
        //执行重载
        table.reload('security_user', {
            where: data.field
        });
    });

    table.on('toolbar(security_user)', function(obj) { //批量删除
        var data = obj.data;
        switch (obj.event){
            case "batchdel":
                batchdel();
                break;
            case "add":
                add();
                break;
        }
    });

    function batchdel(){
        var checkStatus = table.checkStatus('security_user'),
            checkData = checkStatus.data; //得到选中的数据

        //把选中的值push到数据中
        var romm = [];
        for(var ts = 0; ts < checkData.length; ts++) {
            romm.push(checkData[ts].username);
        }

        if(checkData.length === 0) {
            return layer.msg('请选择数据');
        }
        layer.confirm('确定删除吗？', function(index) {
            qCommon.ajax({
                url: '/mobileUser/deleteMobileUser',
                data: {
                    username: romm.join()
                },
                done: function(res) {
                    table.reload('security_user');
                    layer.msg('已删除');
                }
            });
        });
    }

    function add(){
        layer.open({
            type: 2,
            title: '添加用户',
            content: 'addMobileUser.html',
            area: ['700px', '600px'],
            btn: ['确定', '取消'],
            resize: false,
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_user");
                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_user)', function(data) {
                    var field = data.field,
                        userName = field.userName,
                        nickName = field.nickName,
                        mobile = field.mobile,
                        remark = field.remark,
                        possessor = field.possessor,
                        password = field.password
                    qCommon.ajax({
                        url: "mobileUser/addMobileUser",
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

});