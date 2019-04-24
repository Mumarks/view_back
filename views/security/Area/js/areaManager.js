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
        query="",
        qCommon = layui.qCommon;

    layer.load(2);
    //主页面
    var renderTable = function () {
        treetable.render({
            elem: '#security_area',
            url : "AddressM/queryAddressList",
            where:{
                "name":query
            },
            treeColIndex : 1, // 树形图标显示在第几列
            treeSpid : 1,
            treeIdName : 'zipCode', // id字段的名称
            treePidName : 'parentId', //pid字段的名称
            treeDefaultClose : true, //是否默认折叠
            treeLinkage : false, //父级展开时是否自动展开所有子级
            done : function(res){
                var data=res.data;
                for(var i=0;i<data.length;i++){
                    data[i].addDate=qwe(data[i].addDate);
                    data[i].alterDate=qwe(data[i].alterDate);
                }
                layer.closeAll('loading');
            },
            cols: [[
                {type: 'numbers'},
                {field: 'name', minWidth: 200, title: '地区名称'},
                {field: 'level', width: 100, align: 'center', title: '类型', templet: function (d) {
                        if (d.level == 1) {
                            return '<span>省/直辖市</span>';
                        } else if (d.level == 2) {
                            return '<span>地级市</span>';
                        } else if (d.level == 3) {
                            return '<span>区县</span>';
                        } else if (d.level == 4) {
                            return '<span>镇/街道</span>';
                        } else if (d.level == 5) {
                            return '<span>社区</span>';
                        }
                    }
                },
                {field: 'handle', title: '操作', align: 'center', width: '35%', toolbar: '#security_Area'},
            ]]

        })
    };

    renderTable();

    table.on('tool(security_area)', function(obj) { //tool 立面写的是 table表格的id名
        var data = obj.data;//行对象
        switch (obj.event) {
            case "addChildArea":
                addChildArea(data);
                break;
            case "edit":
                edit(data);
                break;
            case "delete":
                del(data);
                break;
            case "link":
                link(data);
                break;
        }
    });


    //搜索
    form.on('submit(security_area_btn)', function(data) {
        //执行重载
        query=data.field.name;
        renderTable();
    });

    function qwe(time){
        var date = new Date(time);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y+M+D;
    }

    //事件
    var active = {
        add: function() {
            layer.open({
                type: 2,
                title: '添加(省/直辖市)',
                content: 'addArea.html',
                area: ['500px', '600px'],
                btn: ['确定', '取消'],
                yes: function(index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index],
                        submit = layero.find('iframe').contents().find("#security_submit_area");
                    //监听提交
                    iframeWindow.layui.form.on('submit(security_submit_area)', function(data) {
                        var field = data.field,
                            zipCode = field.zipCode,
                            name = field.name,
                            shortName = field.shortName,
                            sort  = field.sort,
                            introduce = field.introduce, //简介
                            areaPicture = field.areaPicture, //地区图片地址
                            lonlatArr = field.lonlat.split(',')//经纬度拼接
                        delete field.lonlat;
                        var	longitude = lonlatArr[0]
                        var latitude = lonlatArr[1]
                        qCommon.ajax({
                            url: "AddressM/addNewAddressInfo",
                            data: {
                                level: 1,
                                parentId: 1,
                                zipCode:zipCode,
                                name:name,
                                shortName:shortName,
                                longitude:longitude,
                                latitude:latitude,
                                sort:sort,
                                introduce: introduce,
                                areaPicture: areaPicture
                            },
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
    $('.security_btn_area').on('click', function() {
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';

    });

    function addChildArea(data){
        layer.open({
            type: 2,
            title: '添加子级地区',
            content: 'addArea.html',
            area: ['500px', '600px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_area");
                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_area)', function(data) {
                    var field = data.field,
                        zipCode = field.zipCode,
                        name = field.name,
                        shortName = field.shortName,
                        sort  = field.sort,
                        introduce = field.introduce, //简介
                        areaPicture = field.areaPicture, //地区图片地址
                        lonlatArr = field.lonlat.split(',')
                    delete field.lonlat;
                    var	longitude = lonlatArr[0]
                    var latitude = lonlatArr[1]

                    qCommon.ajax({
                        url: "AddressM/addNewAddressInfo",
                        data: {
                            level: field.level,
                            parentId: field.parentId,
                            zipCode:zipCode,
                            name:name,
                            shortName:shortName,
                            longitude:longitude,
                            latitude:latitude,
                            sort:sort,
                            introduce: introduce,
                            areaPicture: areaPicture
                        },
                        done: function(res) {
                            layer.close(index); //关闭弹层
                            renderTable();
                            layer.msg("添加成功");
                        }
                    })
                });
                submit.trigger('click');
            },
            success: function(layero, index) {
                var body = layer.getChildFrame('body',index);
                body.find("input[name='parentId']").attr("value",data.zipCode);
                body.find("input[name='level']").attr("value",(data.level +1));
                body.find("input[name='longitude']").attr("value",data.longitude);
                body.find("input[name='latitude']").attr("value",data.latitude);
                body.find("img[name='areaPicture']").val(data.areaPicture);


                if(data.level==3 || data.level==4){
                    body.find("div[id='zipCodeDiv']").hide();
                    body.find("input[name='zipCode']").attr("value",data.zipCode);
                    body.find("input[name='zipCode']").attr("readonly","readonly");

                }
            }
        })
    }

    function edit(data){
        layer.open({
            type: 2,
            title: '(编辑地区)',
            content: 'editArea.html',
            area: ['600px', '600px'],
            btn: ['确定', '取消'],
            yes: function(index, layero) {
                var iframeWindow = window['layui-layer-iframe' + index],
                    submit = layero.find('iframe').contents().find("#security_submit_area");
                //监听提交
                iframeWindow.layui.form.on('submit(security_submit_area)', function(data) {
                    var field = data.field,
                        zipCode = field.zipCode,
                        name = field.name,
                        shortName = field.shortName,
                        sort  = field.sort,
                        introduce = field.introduce, //简介
                        areaPicture = field.areaPicture, //地区图片地址
                        lonlatArr = field.lonlat.split(',')
                    delete field.lonlat;
                    var	longitude = lonlatArr[0]
                    var latitude = lonlatArr[1]
                    qCommon.ajax({
                        url: "AddressM/updateAddressInfo",
                        data: {
                            level: field.level,
                            parentId: field.parentId,
                            zipCode:zipCode,
                            name:name,
                            shortName:shortName,
                            longitude:longitude,
                            latitude:latitude,
                            sort:sort,
                            introduce: introduce,
                            areaPicture: areaPicture
                        },
                        done: function(res) {
                            renderTable();
                            layer.close(index); //关闭弹层
                        }
                    })
                });

                submit.trigger('click');
            },
            success: function(layero, index) {
                var body = layer.getChildFrame('body',index);
                // 赋初始值
                body.find("input[name='name']").val(data.name);
                body.find("input[name='level']").attr("value",(data.level));
                body.find("input[name='shortName']").val(data.shortName);
                body.find("input[name='zipCode']").val(data.zipCode);
                body.find("div[id='zipCodeDiv']").hide(); //隐藏编辑页面id = zipCodeDiv 的 div
                body.find("input[name='sort']").val(data.sort);
                var lonlat = data.longitude + ',' + data.latitude;
                body.find("input[name='lonlat']").val(lonlat);
                body.find("input[name='height']").val(data.height);
//								body.find("textarea[name='introduce']").attr('value',data.introduce);
                body.find("textarea[name='introduce']").val(data.introduce);
//								body.find("img[name='areaPicture']").val(data.areaPicture);
                body.find("img[name='areaPicture']").attr("src", data.areaPicture); //把img上的src赋值

            }
        })
    }

    function del(data){
        qCommon.ajax({
            url: "AddressM/deleteAddressInfo",
            data: {
                "zipCode":data.zipCode  //table行对象
            },
            done: function(res) {
                renderTable();
            }
        })
    };

    function link(data){
        layer.prompt(function(val,index){
            qCommon.ajax({
                url: "AddressM/setPMUassignment",
                data: {
                    "photographyMapUrl":val,
                    "zipCode":data.zipCode
                },
                done: function(res) {
                    layer.close(index);
                    renderTable();
                }
            })
        })
    }

});