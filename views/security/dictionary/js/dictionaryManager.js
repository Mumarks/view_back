layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'qCommon', 'table'], function() {
    var $ = layui.$,
        form = layui.form,
        table = layui.table,
        qCommon = layui.qCommon;

    table.render({
        elem: '#dictionaryType',
        toolbar: "#dictionaryTypeBtn",
        defaultToolbar: [],
        url: layui.setter.domian + "/dictionary/queryDictionaryTypeList",
        where:{
            token : localStorage.getItem("token")
        },
        cols: [[
            {type:'radio'},
            {field: 'typeName',title: '类型名称'}
        ]],
        parseData: function(res){
            return {
                "code": 0, //解析接口状态
                "msg": res.message, //解析提示文本
                "count": res.total, //解析数据长度
                "data": res.data //解析数据列表
            };
        }
    });

    // 单元格单击事件
    table.on('row(dictionaryType)', function(obj){
        $("#typeHidden").val(obj.data.typeCode);
        table.reload('dictionaryItem', {
            where : {typeCode: obj.data.typeCode}
        });

        // 单击行选中radio
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');//选中行样式
        obj.tr.find('input[lay-type="layTableRadio"]').prop("checked",true);
        var index = obj.tr.data('index')
        var thisData = table.cache.dictionaryType;//tableName 表名
        console.log(thisData);
        //重置数据单选属性
        layui.each(thisData, function(i, item){
            console.log(i);
            console.log(item);
            if(index === i){
                item.LAY_CHECKED = true;
            } else {
                delete item.LAY_CHECKED;
            }
        });
        form.render('radio');
    });

    table.on('toolbar(dictionaryType)', function(obj) {
        switch (obj.event){
            case "addDictionaryType":
                addDictionaryType();
                break;
            case "editDictionaryType":
                editDictionaryType();
                break;
            case "deleteDictionaryType":
                deleteDictionaryType();
                break;
        }
    });

    function addDictionaryType(){
        layer.open({
            type: 2,
            title: '添加字典类型',
            content: 'addDictionaryType.html',
            area: ['500px', '280px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_dictionaryType");

                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_dictionaryType)', function(data) {
                    var field = data.field; //获取提交的字段

                    qCommon.ajax({
                        url: "/dictionary/addDictionaryType",
                        data: field,
                        done: function(res) {
                            table.reload('dictionaryType');
                            layer.close(index); //关闭弹层
                            layer.msg("添加成功");
                        }
                    })
                });

                submit.trigger('click');
            }
        });
    }

    function editDictionaryType(){
        var checkStatus = table.checkStatus(obj.config.id);
        if(checkStatus.data.length == 0){
            qCommon.warn('未选择修改的字典类型');
            return;
        }
        var typeCode = checkStatus.data[0].typeCode;
        var typeName = checkStatus.data[0].typeName;

        layer.open({
            type: 2,
            title: '修改字典类型',
            content: 'editDictionaryType.html',
            area: ['500px', '280px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_dictionaryType");

                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_dictionaryType)', function(data) {
                    var field = data.field; //获取提交的字段
                    field.typeCode = typeCode;
                    qCommon.ajax({
                        url: "/dictionary/editDictionaryType",
                        data: field,
                        done: function(res) {
                            table.reload('dictionaryType');
                            layer.close(index); //关闭弹层
                            layer.msg("添加成功");
                        }
                    })
                });

                submit.trigger('click');
            },
            success: function(layero, index) {
                var body = layer.getChildFrame('body',index);
                body.find("input[name='typeName']").val(typeName);
            }
        });
    }

    function deleteDictionaryType(){
        var checkStatus = table.checkStatus(obj.config.id),
            checkData = checkStatus.data; //得到选中的数据

        if(checkData.length === 0) {
            return layer.msg('请选择数据');
        }

        layer.confirm('确定删除吗？', function(index) {
            qCommon.ajax({
                url: "/dictionary/deleteDictionaryType",
                data: {
                    typeCode: checkData[0].typeCode
                },
                done: function(res) {
                    table.reload('dictionaryType');
                    $("#typeHidden").val(""); //删除时，清空typeCode的值
                    layer.msg('已删除');
                }
            });
        });
    }

    qCommon.table({
        elem: '#dictionaryItem',
        url: layui.setter.domian + '/dictionary/queryDictionaryItemList',
        toolbar: "#dictionaryItemBtn",
        cols: [
            [
                {type: 'checkbox',fixed: 'left'},
                {field: 'itemCode',title: '标识'},
                {field: 'itemName',title: '名称'},
                {field: 'itemValue',title: '值'},
                {field: 'sort',title: '排序',},
                {field: 'isEnable', title: '启用', templet: '#itemEnable', fixed: 'right', width:110, unresize: true},
                {title: '操作',width:150,align: 'center',fixed: 'right', unresize: true, toolbar: '#itemEdit'}
            ]
        ],
    });

    table.on('toolbar(dictionaryItem)', function(obj) {
        if(obj.event === 'addDictionaryItem'){
            addDictionaryItem();
        }
    });

    function addDictionaryItem(){
        var typeCode = $("#typeHidden").val();
        if(qCommon.isNull(typeCode)){
            qCommon.warn("请先选择类型");
            return;
        }

        layer.open({
            type: 2,
            title: '添加字典',
            content: 'addDictionaryItem.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_dictionaryItem");

                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_dictionaryItem)', function(data) {
                    var field = data.field; //获取提交的字段
                    field.typeCode = typeCode;
                    qCommon.ajax({
                        url: "/dictionary/addDictionaryItem",
                        data: field,
                        done: function(res) {
                            table.reload('dictionaryItem', {
                                where : {typeCode: typeCode}
                            });
                            layer.close(index); //关闭弹层
                            layer.msg("添加成功");
                        }
                    })
                });

                submit.trigger('click');
            }
        });
    }

    //监听启用操作
    form.on('checkbox(isEnable)', function(obj){
        var typeCode = $("#typeHidden").val();
        qCommon.ajax({
            url: "/dictionary/editDictionaryItemByEnable",
            data: {
                typeCode : typeCode,
                itemCode : this.value
            }
        })
    });

    table.on('tool(dictionaryItem)', function(obj) {
        var data = obj.data;
        switch (obj.event) {
            case "editDictionaryItem":
                editDictionaryItem(data);
                break;
            case "deleteDictionaryItem":
                deleteDictionaryItem(data);
                break;
        }
    });

    function editDictionaryItem(data){
        var typeCode = $("#typeHidden").val();
        var itemCode = data.itemCode;
        layer.open({
            type: 2,
            title: '修改字典',
            content: 'editDictionaryItem.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_dictionaryItem");

                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_dictionaryItem)', function(data) {
                    var field = data.field; //获取提交的字段
                    field.typeCode = typeCode;
                    field.itemCode = itemCode;
                    qCommon.ajax({
                        url: "/dictionary/editDictionaryItem",
                        data: field,
                        done: function(res) {
                            table.reload('dictionaryItem', {
                                where : {typeCode: typeCode}
                            });
                            layer.close(index); //关闭弹层
                            layer.msg("添加成功");
                        }
                    })
                });

                submit.trigger('click');
            },
            success: function(layero, index) {
                var body = layer.getChildFrame('body',index);
                body.find("input[name='itemName']").val(data.itemName);
                body.find("input[name='itemValue']").val(data.itemValue);
                body.find("input[name='sort']").val(data.sort);
            }
        });
    }

    function deleteDictionaryItem(data){
        layer.confirm('确定删除吗？', function(index) {
            var typeCode = $("#typeHidden").val();
            qCommon.ajax({
                url: "/dictionary/deleteDictionItem",
                data: {
                    typeCode: typeCode,
                    itemCode: data.itemCode
                },
                done: function(res) {
                    table.reload('dictionaryItem', {
                        where : {typeCode: typeCode}
                    });
                    layer.msg('已删除');
                }
            });
        });
    }

});