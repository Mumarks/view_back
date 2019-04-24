layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'qCommon', 'table', 'upload'], function() {
    var $ = layui.$,
        form = layui.form,
        table = layui.table,
        upload = layui.upload,
        qCommon = layui.qCommon;

    //普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'
        ,url: '/upload/'
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }
        ,done: function(res){
            //如果上传失败
            if(res.code > 0){
                return layer.msg('上传失败');
            }
            //上传成功
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });

    qCommon.table({
        elem: '#security_gongkan',
        url: layui.setter.domian + '/icon/queryIconList',
        toolbar : "#toolbar",
        cols: [
            [
                {type: 'checkbox',fixed: 'left'},
                {field: 'iconName',title: 'icon名称'},
                {field: 'iconClass',title: 'icon类名'},
                {field: 'iconType',title: 'icon类型',templet:'#iconType'},
                {field: 'addPerson',title: '添加人',hide: 'true'},
                {field: 'editPerson',title: '修改人',hide: 'true'},
                {field: 'addTime',title: '添加时间',hide: 'true'},
                {field: 'editTime',title: '修改时间',hide: 'true'},
                {title: '操作',width:300,align: 'center',fixed: 'right',toolbar: '#security_gongkan_handle'}
            ]
        ],
    });

    //搜索
    form.on('submit(security_gongkan_btn_query)', function(data) {
        //执行重载
        table.reload('security_gongkan', {
            where: data.field
        });
    });

    //监听工具条
    table.on('tool(security_gongkan)', function(obj) {
        var data = obj.data;
        var iconCode = data.iconCode;
        switch (obj.event){
            case "del":
                del(data, iconCode);
                break;
            case "edit":
                edit(data, iconCode);
                break;
        }
    });

    function del(data, iconCode){
        layer.confirm('确定删除此图标？', function(index) {
            qCommon.ajax({
                url: "/icon/deleteIcon",
                data: {
                    iconCode: iconCode
                },
                //成功进入用done,失败进入用success
                done: function(res) {
                    if(res.data==="该数据不存在，可能已被删除"){
                        layer.msg(res.data,function(){
                            table.reload('security_gongkan');
                        });
                    }else{
                        table.reload('security_gongkan');
                        layer.msg(res.data);
                    }
                }
            });
            layer.close(index);
        });
    }

    function edit(data, iconCode){
        layer.open({
            type: 2,
            title: '编辑账号',
            content: 'editIcon.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_gongkan");
                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_gongkan)', function(data) {
                    var field = data.field; //获取提交的字段
                    field.iconCode = iconCode;
                    qCommon.ajax({
                        url: "/icon/editIcon",
                        data: field,
                        done: function(res) {
                            table.reload('security_gongkan');
                            layer.close(index); //关闭弹层
                        }
                    })
                });

                submit.trigger('click');
            },
            success: function(layero, index) {
                var body = layer.getChildFrame('body',index);
                // sessionStorage["dddddd"] = JSON.stringify(data);
                // 赋初始值
                body.find("input[name='iconName']").val(data.iconName);
                body.find("input[name='iconClass']").val(data.iconClass);
                body.find("select[name='iconType']").val(data.iconType);
            }
        })
    }
    
    table.on('toolbar(security_gongkan)', function(obj) {
        var data = obj.data;
        switch (obj.event){
            case "batchdel":
                batchdel();
                break;
            case "add":
                add();
                break;
            case "icon":
                icon();
                break;
        }
    });

    function batchdel(){
        var checkStatus = table.checkStatus('security_gongkan'),
            checkData = checkStatus.data; //得到选中的数据

        if(checkData.length === 0) {
            return layer.msg('请选择数据');
        }

        var code = [];
        for(var i=0;i<checkData.length;i++){
            code[i] = checkData[i].iconCode;

        }
        layer.confirm('确定删除吗？', function(index) {
            qCommon.ajax({
                url: "/icon/deleteIcon",
                data: {
                    iconCode: code.join(",")
                },
                done: function(res) {
                    if(res.data==="该数据不存在，可能已被删除"){
                        layer.msg(res.data,function(){
                            table.reload('security_gongkan');
                        });
                    }else{
                        table.reload('security_gongkan');
                        layer.msg(res.data);
                    }
                }
            });
        });
    }

    function add(){
        layer.open({
            type: 2,
            title: '添加新账号',
            content: 'addIcon.html',
            area: ['500px', '480px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_gongkan");

                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_gongkan)', function(data) {
                    var field = data.field; //获取提交的字段
                    qCommon.ajax({
                        url: "/icon/addIcon",
                        data: field,
                        done: function(res) {
                            table.reload('security_gongkan');
                            layer.close(index); //关闭弹层
                        }
                    })
                });
                submit.trigger('click');
            }
        });
    }

    function icon(){
        layer.open({
            type: 2,
            title: '图标展示',
            content: 'iconShow.html',
            area: ['100%', '100%'],
            btn: ['关闭'],
            yes: function(index, layero) {
                layer.close(index);
            }
        });
    }


});