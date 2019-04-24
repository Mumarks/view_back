layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index', //主入口模块
    treetable : 'treetable-lay/treetable'
}).use(['index', 'qCommon', 'treetable', 'table'], function() {
    var $ = layui.$,
        form = layui.form,
        table = layui.table,
        treetable = layui.treetable,
        qCommon = layui.qCommon;

    layer.load(2);
    var renderTable = treetable.render({
        elem: '#security_menu',
        url : "/menu/getMenuList",
        treeColIndex : 1, // 树形图标显示在第几列
        treeSpid : 0,
        treeIdName : 'id', // id字段的名称
        treePidName : 'pid', //pid字段的名称
        treeDefaultClose : true, //是否默认折叠
        treeLinkage : false, //父级展开时是否自动展开所有子级
        done : function(res){
            layer.closeAll('loading');
        },
        cols: [[
            {type: 'numbers'},
            {field: 'nameCn', minWidth: 200, title: '名称'},
            {field: 'icon', width: 80, align: 'center', title: 'icon', templet: function (d) {
                    return '<i class="layui-icon '+d.icon+'"></i>';
                }
            },
            {field: 'isMenu', width: 80, align: 'center', title: '类型', templet: function (d) {
                    if (d.isMenu == 1) {
                        return '<span class="layui-badge layui-bg-orange">菜单</span>';
                    } else if (d.isMenu == 0) {
                        return '<span class="layui-badge layui-bg-blue">目录</span>';
                    } else {
                        return '<span class="layui-badge-rim">权限</span>';
                    }
                }
            },
            {field: 'menuCode', align: 'center', title: '菜单标识'},
            {field: 'priority', align: 'center', title: '序列'},
            {field: 'menuUrl', align: 'center', title: '菜单路径'},
            {field: 'permissionCode', align: 'center', title: '权限标识'},
            {field: 'permissionUrl', align: 'center', title: '权限路径'},
            {field: 'handle', title: '操作', align: 'center', width: '10%',templet: '#security_organization_handle'},
        ]]
    });

    //监听工具条
    table.on('tool(security_menu)', function(obj) {
        var data = obj.data;
        switch (obj.event) {
            case "edit":
                edit(data);
                break;
            case "editGroup":
                editGroup(data);
                break;
        }
    });

    function edit(data){
        var menuCode = data.menuCode;
        layer.open({
            type: 2,
            title: '编辑菜单',
            content: 'editMenu.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_menu");
                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_menu)', function(data) {
                    var field = data.field; //获取提交的字段
                    field.menuCode = menuCode;
                    qCommon.ajax({
                        url: "/menu/updateMenuByMenu",
                        data: field,
                        done: function(res) {
                            layer.close(index); //关闭弹层
                            layer.msg("编辑成功");
                            location.reload();
                        }
                    })
                });

                submit.trigger('click');
            },
            success: function(layero, index) {
                var body = layer.getChildFrame('body',index);
                // 赋初始值
                body.find("input[name='url']").val(data.menuUrl);
                body.find("input[name='menuCn']").val(data.nameCn);
                body.find("input[name='priority']").val(data.priority);
                body.find("input[name='icon']").val(data.icon);
                body.find("input[id='iconHidden']").val(data.icon);
            }
        })
    }

    function editGroup(data){
        var groupCn = data.nameCn;
        layer.open({
            type: 2,
            title: '编辑目录',
            content: 'editGroupMenu.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_menu");

                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_menu)', function(data) {
                    var field = data.field; //获取提交的字段
                    field.groupCn = groupCn;
                    qCommon.ajax({
                        url: "/menu/updateMenuByGroup",
                        data: field,
                        done: function(res) {
                            layer.close(index); //关闭弹层
                            location.reload();
                            layer.msg("修改成功");
                        }
                    })
                });

                submit.trigger('click');
            },
            success: function(layero, index) {
                var body = layer.getChildFrame('body',index);
                // 赋初始值
                body.find("input[name='updateCn']").val(data.nameCn);
                body.find("input[id='iconHidden']").val(data.icon);
                body.find("input[name='icon']").val(data.icon);
            }
        });
    }

    //事件
    var active = {
        add: function() {
            layer.open({
                type: 2,
                title: '添加菜单',
                content: 'addMenu.html',
                area: ['500px', '500px'],
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index],
                        submit = layero.find('iframe').contents().find("#security_submit_menu");

                    //监听提交
                    iframeWindow.layui.form.on('submit(security_submit_menu)', function(data) {
                        var field = data.field; //获取提交的字段
                        qCommon.ajax({
                            url: "/menu/saveMenu",
                            data: field,
                            done: function(res) {
                                layer.close(index); //关闭弹层
                                renderTable();
                                layer.msg("添加成功");
                            }
                        })
                    });

                    submit.trigger('click');
                }
            });
        }
    }

    $('.security_btn_menu').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});