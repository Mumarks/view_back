layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index', //主入口模块
    transfer: 'transfer/transfer'
}).use(['index', 'qCommon', 'form', 'transfer'], function() {
    var $ = layui.$,
        treeSelect = layui.treeselect,
        setter = layui.setter,
        qCommon = layui.qCommon,
        table = layui.table,
        laytpl = layui.laytpl,
        element = layui.element,
        transfer = layui.transfer,
        form = layui.form;


    qCommon.ajax({
        url: "/role/getPermissionMenuTree",
        data: {
            roleCode: $("#roleCodePower").val()
        },
        done: function(res) {
            var menuList = res.data;
            var tempMenu = [];
            for(var menu in menuList){
                tempMenu[tempMenu.length] = {
                    "name" : menu,
                    "menuList" : menuList[menu]
                }
            }
            // 组装模板所需菜单
            var data = {"list" : tempMenu}
            // 获取模板
            var getTpl = document.getElementById("permission-menu").innerHTML;
            var view = document.getElementById("menuView")
            laytpl(getTpl).render(data, function(html){
                view.innerHTML = html;
                layui.element.render('nav');
            });
        }
    })

    layui.element.on('nav(menuNav)', function(elem){
        var headName = elem.children(".name").text();
        var code = elem.children(".code").val();
        $('#headName').text(headName);


        // 渲染穿梭框

        var tableDataTrue = [];
        var tableDataFalse = [];

        // 获取左边数据
        qCommon.ajax({
            url: "/role/getPermissionTableTrue",
            data: {
                roleCode: $("#roleCodePower").val(),
                menuCode: code
            },
            async: false,
            done: function(res) {
                tableDataTrue = res.data
            }
        });

        // 获取右边数据
        qCommon.ajax({
            url: "/role/getPermissionTableFalse",
            data: {
                roleCode: $("#roleCodePower").val(),
                menuCode: code
            },
            async: false,
            done: function(res) {
                tableDataFalse = res.data;
            }
        });

        //表格列
        var cols = [{type: 'checkbox', fixed: 'left'},{field: 'nameCn', title: '权限名'}]
        //表格配置文件
        var tabConfig = {'page':false,'limits':[100000],'limit':Number.MAX_VALUE, 'height':"full-160"}
        var tb1 = transfer.render({
            elem: "#root", //指定元素
            cols: cols, //表格列  支持layui数据表格所有配置
            data: [tableDataTrue, tableDataFalse], //[左表数据,右表数据[非必填]]
            tabConfig: tabConfig, //表格配置项 支持layui数据表格所有配置
        });

        $("#powerBtn").remove();

        var btnHtml = '<div class="layui-card" id="powerBtn">'
        btnHtml+= '<div class="layui-card-body">'
        btnHtml+= '<button style="margin-left: 48%;" class="layui-btn" id="addPower">确定</button>'
        btnHtml+= '</div>'
        btnHtml+= '</div>';

        $("#powerBody").append(btnHtml);


        $("#addPower").off('click').on('click', function(){
            var data = transfer.get(tb1,'r', 'permissionCode');
            qCommon.ajax({
                url: "/role/addRolePermission",
                data: {
                    roleCode : $("#roleCodePower").val(),
                    menuCode : code,
                    permissions : data
                },
                done: function(res) {
                    var len = (data instanceof Array ? 0 : data.split(",").length);
                    elem.children(".count").text(len);
                    layer.msg('分配成功');
                }
            })
        });
    });

})