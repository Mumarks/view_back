layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'qCommon', 'table'], function() {
    var $ = layui.$,
        form = layui.form,
        table = layui.table,
        admin = layui.admin,
        element = layui.element,
        qCommon = layui.qCommon;

    qCommon.table({
        elem: '#security_role',
        url: layui.setter.domian + '/role/queryRole',
        toolbar : "#toolbar",
        cols: [
            [
                {type: 'checkbox',fixed: 'left'},
                {field: 'nameCn',title: '名称'},
                {field: 'organizationName', title: '组织机构'},
                {field: 'describes',title: '描述'},
                {field: 'isLock',title: '锁定',templet: '#isLock',align: "center"},
                {field: 'addDate',title: '添加时间',hide:true},
                {field: 'alterDate',title: '修改时间'},
                {field: 'creater',title: '添加人',hide:true},
                {field: 'modifier',title: '修改人'},
                {title: '操作',width: 250,align: 'center',fixed: 'right',toolbar: '#security_role_handle'}
            ]
        ],
    });

    //监听工具条
    table.on('tool(security_role)', function(obj) {
        var data = obj.data;

        switch (obj.event){
            case "del":
                del(data);
                break;
            case "edit":
                edit(data);
                break;
            case "power":
                power(data);
                break;
        }
    });

    function del(data){
        layer.confirm('确定删除吗？', function(index) {
            qCommon.ajax({
                url: "/role/deleteRole",
                data: {
                    roleCode: data.roleCode
                },
                done: function(res) {
                    table.reload('security_role');
                    layer.msg('已删除');
                }
            });
        });
    }

    function edit(data){
        layer.open({
            type: 2,
            title: '编辑角色',
            content: 'editRole.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_role");
                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_role)', function(data) {
                    var field = data.field; //获取提交的字段
                    qCommon.ajax({
                        url: "/role/editRole",
                        data: field,
                        done: function(res) {
                            table.reload('security_role');
                            layer.close(index); //关闭弹层
                        }
                    })
                });

                submit.trigger('click');
            },
            success: function(layero, index) {
                var body = layer.getChildFrame('body',index);
                // 赋初始值
                body.find("input[name='roleCode']").val(data.roleCode);
                body.find("input[name='nameCn']").val(data.nameCn);
                body.find("textarea[name='describes']").val(data.describes);
            }
        })
    }

    function power(data){
        var index = layer.open({
            type: 2,
            title: '权限管理',
            content: 'power.html',
            skin: 'layer_bg',
            area: ['500px', '480px'],
            btn: ['取消'],
            success: function(layero, index) {
                var roleCode = data.roleCode;
                var body = layer.getChildFrame('body',index);
                body.find("input[id='roleCodePower']").val(roleCode);
            }
        })
        layer.full(index);
    }

    // 开关按钮
    form.on('switch(isLock)', function(data){
        qCommon.ajax({
            url: "/role/editRoleByIsLock",
            data: {
                roleCode : data.elem.dataset.value,
                isLock : data.value
            },
            done: function(res) {
                table.reload('security_role');
            }
        });
    });

    table.on('toolbar(security_role)', function(obj) {
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
        var checkStatus = table.checkStatus('security_role'),
            checkData = checkStatus.data; //得到选中的数据

        if(checkData.length === 0) {

            return layer.msg('请选择数据');

        }
        layer.confirm('确定删除吗？', function(index) {
            qCommon.ajax({
                url: "/role/deleteRole",

                data: {
                    roleCode: checkData[0].roleCode
                },
                done: function(res) {
                    table.reload('security_role');
                    layer.msg('已删除');
                }
            });
        });
    }

    function add(){
        layer.open({
            type: 2,
            title: '添加新角色',
            content: 'addRole.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_role");

                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_role)', function(data) {
                    var field = data.field; //获取提交的字段
                    qCommon.ajax({
                        url: "/role/addRole",
                        data: field,
                        done: function(res) {
                            table.reload('security_role');
                            layer.close(index); //关闭弹层
                        }
                    })
                });

                submit.trigger('click');
            }
        });
    }

});