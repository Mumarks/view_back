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


    var renderTable = function () {
        layer.load(2);
        treetable.render({
            elem: '#security_organization',
            url : "/organization/queryOrganizationList",
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
                {field: 'describes', minWidth: 200, title: '描述'},
                {field: 'level', width: 80, align: 'center', title: '层级'},
                {field: 'modifier', width: 80, align: 'center', title: '修改人'},
                {field: 'alterDate', width: 200, align: 'center', title: '修改时间'},
                {field: 'handle', title: '操作', align: 'center', width: '30%',templet: '#security_organization_handle'},
            ]]
        });
    };

    renderTable();

    //监听工具条
    table.on('tool(security_organization)', function(obj) {
        var data = obj.data;
        switch (obj.event){
            case "del":
                del(data);
                break;
            case "edit":
                edit(data);
                break;
            case "add":
                add(data);
                break;
        }
    });

    function del(data){
        layer.confirm('确定删除吗？', function(index) {
            qCommon.ajax({
                url: "/organization/deleteOrganization",
                data: {
                    organizationCode: data.organizationCode
                },
                done: function(res) {
                    layer.msg('已删除');
                    renderTable();
                    layer.msg("删除成功");
                }
            });
        });
    }

    function edit(data){
        var organizationCode = data.organizationCode;
        layer.open({
            type: 2,
            title: '编辑组织机构',
            content: 'editOrganization.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_organization");
                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_organization)', function(data) {
                    var field = data.field; //获取提交的字段
                    field.organizationCode = organizationCode;
                    qCommon.ajax({
                        url: "/organization/editOrganization",
                        data: field,
                        done: function(res) {
                            layer.close(index); //关闭弹层
                            renderTable();
                            layer.msg("修改成功");
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

    function add(data){
        var organizationCode = data.organizationCode;
        var level = data.level;
        layer.open({
            type: 2,
            title: '添加组织机构',
            content: 'addOrganization.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_organization");

                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_organization)', function(data) {
                    var field = data.field; //获取提交的字段
                    field.parentId = organizationCode;
                    field.level = level;
                    qCommon.ajax({
                        url: "/organization/addOrganizationChild",
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

    //事件
    var active = {
        add: function() {
            layer.open({
                type: 2,
                title: '添加组织机构',
                content: 'addOrganization.html',
                area: ['500px', '480px'],
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index],
                        submit = layero.find('iframe').contents().find("#security_submit_organization");

                    //监听提交
                    iframeWindow.layui.form.on('submit(security_submit_organization)', function(data) {
                        var field = data.field; //获取提交的字段
                        qCommon.ajax({
                            url: "/organization/addOrganization",
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

    $('.security_btn_org').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
    });
});