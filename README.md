


### 项目整体说明
- [目录结构说明](#目录结构说明)
- [开发说明](#开发说明)
    - [模块目录开发规范](#模块目录开发规范)
        - [目录结构](#目录结构)
        - [示例说明](#示例说明)
        - [html命名规范](#html命名规范)
        - [js命名规范](#js命名规范)
    - [模块功能开发规范](#模块功能开发规范)
        - [标准后台页面结构](#标准后台页面结构)
        - [查询功能](#查询功能)
        - [表格](#表格)
        - [表格头按钮](#表格头按钮)
        - [表格内按钮](#表格内按钮)
        - [弹窗通用模板](#弹窗通用模板)
        - [添加功能](#添加功能)
        - [修改功能](#修改功能)
        - [删除功能](#删除功能)
    - [全局设置说明](#全局设置说明)
        - [请求地址全局配置](#请求地址全局配置) 
        - [全局封装组件说明](#全局封装组件说明)
        - [三方组件使用说明](#三方组件使用说明)
        - [如何组件封装](#如何组件封装)
---

#### 目录结构说明

   非完整目录结构，以下只记录在代码开发中可能需要用到的目录结构说明


    ```
    ├─layuiadmin
    │  ├─lib                        --全局配置
    │  ├─modules                    --封装模块和组件(layui) 
    │  │  ├─eleTree
    │  │  ├─formSelect
    │  │  ├─iconPicker
    │  │  ├─transfer
    │  │  ├─treeSelect
    │  │  ├─treetable-lay
    │  │  └─yutons-mods
    └─views                         --业务代码存放处
        ├─css                       --业务全局样式
        ├─fonts                     --字体
        ├─home                      --后台主页和菜单
        ├─images                    --静态资源
        ├─lib                       --三方组件(非layui)
        ├─login                     --登录
        ├─map                       --gis地图
        ├─security                  --系统自带功能业务
        │  ├─account                --账号管理
        │  │  └─js
        │  ├─area                   --地区管理
        │  │  └─js
        │  ├─dictionary             --字典管理
        │  │  └─js
        │  ├─frontUser              --前端账户管理
        │  │  └─js
        │  ├─handleLog              --日志管理
        │  │  └─js
        │  ├─icon                   --图标管理
        │  │  └─js
        │  ├─menu                   --菜单管理
        │  │  └─js
        │  ├─mobileUser             --手机账号管理
        │  │  └─js
        │  ├─organization           --组织机构管理
        │  │  └─js
        │  ├─quartz                 --定时任务管理
        │  │  └─js
        │  └─role                   --角色管理
        │     └─js
        └─service                   --业务功能
    ```

#### 开发说明

 - ##### 模块目录开发规范

    > 新增功能文件存放文件全部放入<html><span style="color:red">service</span></html>文件里面，按<html><span style="color:red">功能</span></html>创建子目录，该功能所有<html><span style="color:red">代码</span></html>皆放入此目录中
    
    - ##### 目录结构

        ```
        ├─views
        │  ├─service
        │  │  ├─**
        │  │  │ └─js        --模块功能 js
        │  │  │ └─css       --模块功能 内部样式
        │  │  │ └─img       --模块功能 内部图片
        ```

    - ##### 示例说明

        ![image](https://img-blog.csdnimg.cn/20190425094247773.png)

    - ##### html命名规范
   
        模块主页面命名格式为<html><span style="color:red"> **Manager.html</span><br/></html>
        其他页面按功能自定义命名，常见命名格式:<br/>
     
        查看：<html><span style="color:red">infoXX.html</span><br/></html>
        添加：<html><span style="color:red">addXX.html</span><br/></html>
        修改主体：<html><span style="color:red">editXX.html</span><br/></html>
        修改某部分：<html><span style="color:red">editXXByXX.html</span><br/></html>
    
    - ##### js命名规范
     
        js命名规则与html命名规则一致，如html命名<span style = "color:red">**Manager.html</span>则对应js命名为<span style="color:red">**Manager.js</span>

- ##### 模块功能开发规范

    > 功能开发规范和功能示例
    
    - ##### 标准后台页面结构
        ```
        <div class="layui-fluid">
			<div class="layui-card">
				<!-- 查询条件所在位置 -->
				<div class="layui-form layui-card-header layuiadmin-card-header-auto">
					<div class="layui-form-item">
						<div class="layui-inline">
							<label class="layui-form-label">条件</label>
							<div class="layui-input-block">
								<input type="text" name="条件字段" placeholder="请输入条件" autocomplete="off" class="layui-input">
							</div>
						</div>
						<div class="layui-inline">
							<button class="layui-btn layuiadmin-btn-admin" lay-submit lay-filter="btn_query">
              					<i class="layui-icon layui-icon-search layuiadmin-button-btn"></i>
            				</button>
						</div>
					</div>
				</div>
				
				<!-- 表格 -->
				<div class="layui-card-body">
					<table id="表格ID" lay-filter="表格ID"></table>
				</div>
			</div>
		</div>
        ```
        
        > **注意：** |条件|条件字段|表格ID| 需要根据当前业务自己定义
        
    - ##### 查询功能
       - html代码
            ```
            <div class="layui-form layui-card-header layuiadmin-card-header-auto">
				<div class="layui-form-item">
					<div class="layui-inline">
						<label class="layui-form-label">条件</label>
						<div class="layui-input-block">
							<input type="text" name="条件字段" placeholder="请输入条件" autocomplete="off" class="layui-input">
						</div>
					</div>
					<div class="layui-inline">
						<button class="layui-btn layuiadmin-btn-admin" lay-submit lay-filter="btn_query">
          					<i class="layui-icon layui-icon-search layuiadmin-button-btn"></i>
        				</button>
					</div>
				</div>
			</div>
            ```
       - js代码
            ```
            form.on('submit(btn_query)', function(data) {
                //传入条件重载表格
                table.reload('表格id', {
                    where: data.field
                });
            });
            ```
    - ##### 表格
        - html代码
            ```
            <table id="表格ID" lay-filter="表格ID"></table>
            ```
        - js代码
            ```
            qCommon.table({
                elem: '#表格ID',
                url: layui.setter.domian + '接口地址',
                toolbar : "#toolbar",
                cols: [
                    [{type: 'checkbox',fixed: 'left'},
                     {field: 'username',title: '账号'},
                     {field: 'nickName',title: '昵称'}, 
                     {field: 'addDate',title: '添加时间'},
                     {field: 'alterDate',title: '修改时间'},
                     {field: 'creater',title: '添加人'},
                     {field: 'modifier',title: '修改人'},
                     {title: '操作',width:300,align: 'center',fixed: 'right',toolbar: '#security_user_handle'}]
                ],
            });
            ```
        > **注意：** ==*qCommon*== 为二次封装得layui插件，在后续中会进行解释
            
    - ##### 表格头按钮
        - html代码
            ```
            <script type="text/html" id="模板ID">
    			{{# if(validatePermission('/请求地址后一段')){ }}
    				<button class="layui-btn layui-btn-sm security_btn_user" lay-event="按钮lay-event"><i class="layui-icon layui-icon-add-1"></i>按钮名称</button>
    			{{# } }}
    		</script>
            ```
        - js代码
            ```
            qCommon.table({
                elem: '#security_user',
                url: layui.setter.domian + '请求接口',
                toolbar : "#模板ID",
            });
            
            //监听工具条
            table.on('toolbar(表格lay-filter)', function(obj) {
                var data = obj.data;
                switch (obj.event){
                    case '按钮lay-event':
                        // 按钮触发事件
                        break;
                }
            });
            ```
        > **注意：** ==*validatePermission*== 方法为权限颗粒化验证，用于控制按钮得显隐
        
    - ##### 表格内按钮
    
        - html代码
        
            ```
            <script type="text/html" id="模板ID">
				{{# if(validatePermission('/请求地址后一段')){ }}
					<a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="按钮lay-event"><i class="layui-icon layui-icon-edit"></i>按钮名称</a>
				{{# } }}
			</script>
            ```
        - js代码
            ```
            qCommon.table({
                elem: '#表格ID',
                url: layui.setter.domian + '/account/queryAccountList',
                cols: [
                    [{title: '操作',width:300,align: 'center',fixed: 'right',toolbar: '#模板ID'}]
                ],
            });
            
            //监听工具条
            table.on('tool(表格lay-filter)', function(obj) {
                var data = obj.data;
                switch (obj.event){
                    case '按钮lay-event':
                        // 按钮触发事件
                        break;
                }
            });
            ```
        > **注意：** ==*validatePermission*== 方法为权限颗粒化验证，用于控制按钮得显隐
            
    - ##### 弹窗通用模板
        - 新增一个页面
        - 主页面新增按钮
            ```
            <script type="text/html" id="模板ID">
				{{# if(validatePermission('/请求地址后一段')){ }}
					<a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit"><i class="layui-icon layui-icon-edit"></i>编辑</a>
				{{# } }}
			</script>
            ```
        - 绑定按钮事件
            ```
            table.on('tool(表格lay-filter)', function(obj) {
                var data = obj.data;
                switch (obj.event){
                    case '按钮lay-event':
                        // 按钮触发事件
                        方法名();
                        break;
                }
            });
            
            function 方法名(){
                layer.open({
                    type: 2,
                    title: '弹窗Title',
                    content: '新增得页面',
                    area: ['500px', '480px'],
                    btn: ['确定', '取消'],
                    yes: function(index, layero) {
                        // 弹窗确定按钮事件
                    }
                });
            }
            ```
    - ##### 添加功能
        - 新增一个页面
            ```
            <!DOCTYPE html>
            <html>
            	<head>
            		<meta charset="utf-8">
            		<title></title>
            		<meta name="renderer" content="webkit">
            		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
            		<link rel="stylesheet" href="../../../layuiadmin/layui/css/layui.css" media="all">
            		<link rel="stylesheet" href="../../../layuiadmin/modules/formSelect/formSelects-v4.css" media="all"/>
            	</head>
            
            	<body>
            		<div class="layui-form" lay-filter="security_form_user" id="security_form_user" style="padding: 20px 30px 0 0;">
            			<div class="layui-form-item">
            				<label class="layui-form-label">表单字段</label>
            				<div class="layui-input-block">
            					<input type="text" name="参数名" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
            				</div>
            			</div>
            			<div class="layui-form-item layui-hide">
            				<button class="layui-btn" lay-submit lay-filter="提交lay-filter" id="提交ID">提交</button>
            			</div>
            		</div>
            
            		<script src="../../../layuiadmin/layui/layui.js"></script>
            	</body>
            </html>
            ```
            
        > **注意：** <span style="color:red">|表单字段|参数名|提交lay-filter|提交ID|</span> 需替换为当前业务内容
            
        - 主页面新增按钮
            ```
            <script type="text/html" id="模板ID">
				{{# if(validatePermission('/请求地址后一段')){ }}
					<a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit"><i class="layui-icon layui-icon-edit"></i>编辑</a>
				{{# } }}
			</script>
            ```
        - 绑定按钮事件
            ```
            table.on('tool(表格lay-filter)', function(obj) {
                var data = obj.data;
                switch (obj.event){
                    case '按钮lay-event':
                        // 按钮触发事件
                        方法名();
                        break;
                }
            });
            
            function 方法名(){
                layer.open({
                    type: 2,
                    title: '弹窗Title',
                    content: '新增得页面',
                    area: ['500px', '480px'],
                    btn: ['确定', '取消'],
                    yes: function(index, layero) {
                        var iframeWindow = window['layui-layer-iframe' + index],
                        submit = layero.find('iframe').contents().find("#提交ID");
    
                        //监听提交
                        iframeWindow.layui.form.on('submit(提交lay-filter)', function(data) {
                            var field = data.field; //获取提交的字段
        
                            qCommon.ajax({
                                url: "新增请求地址",
                                data: field,
                                done: function(res) {
                                    table.reload('表格ID'); //刷新表格
                                    layer.close(index); //关闭弹层
                                }
                            })
                        });
        
                        submit.trigger('click');
                    }
                });
            }
            ```
    - ##### 修改功能
        - 新增一个页面
            ```
            <!DOCTYPE html>
            <html>
            	<head>
            		<meta charset="utf-8">
            		<title></title>
            		<meta name="renderer" content="webkit">
            		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            		<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
            		<link rel="stylesheet" href="../../../layuiadmin/layui/css/layui.css" media="all">
            		<link rel="stylesheet" href="../../../layuiadmin/modules/formSelect/formSelects-v4.css" media="all"/>
            	</head>
            
            	<body>
            		<div class="layui-form" lay-filter="security_form_user" id="security_form_user" style="padding: 20px 30px 0 0;">
            			<div class="layui-form-item">
            				<label class="layui-form-label">表单字段</label>
            				<div class="layui-input-block">
            					<input type="text" name="参数名" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input">
            				</div>
            			</div>
            			<div class="layui-form-item layui-hide">
            				<button class="layui-btn" lay-submit lay-filter="提交lay-filter" id="提交ID">提交</button>
            			</div>
            		</div>
            
            		<script src="../../../layuiadmin/layui/layui.js"></script>
            	</body>
            </html>
            ```
            
        > **注意：** <span style="color:red">|表单字段|参数名|提交lay-filter|提交ID|</span> 需替换为当前业务内容
            
        - 主页面新增按钮
            ```
            <script type="text/html" id="模板ID">
				{{# if(validatePermission('/请求地址后一段')){ }}
					<a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit"><i class="layui-icon layui-icon-edit"></i>编辑</a>
				{{# } }}
			</script>
            ```
        - 绑定按钮事件
            ```
            table.on('tool(表格lay-filter)', function(obj) {
                var data = obj.data;
                switch (obj.event){
                    case '按钮lay-event':
                        // 按钮触发事件
                        方法名(data);
                        break;
                }
            });
            
            function 方法名(data){
                layer.open({
                    type: 2,
                    title: '弹窗Title',
                    content: '新增得页面',
                    area: ['500px', '480px'],
                    btn: ['确定', '取消'],
                    yes: function(index, layero) {
                        var iframeWindow = window['layui-layer-iframe' + index],
                        submit = layero.find('iframe').contents().find("#提交ID");
    
                        //监听提交
                        iframeWindow.layui.form.on('submit(提交lay-filter)', function(data) {
                            var field = data.field; //获取提交的字段
        
                            qCommon.ajax({
                                url: "请求地址",
                                data: field,
                                done: function(res) {
                                    table.reload('表格ID'); //刷新表格
                                    layer.close(index); //关闭弹层
                                }
                            })
                        });
        
                        submit.trigger('click');
                    },
                    success: function(layero, index) {
                        var body = layer.getChildFrame('body',index);
                        // 赋初始值
                        body.find("input[name='参数名']").val(data.参数名);
                    }
                });
            }
            ```
    - ##### 删除功能
        - html代码
            ```
            <script type="text/html" id="模板ID">
				{{# if(validatePermission('/请求地址后一段')){ }}
					<a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit"><i class="layui-icon layui-icon-edit"></i>编辑</a>
			{{# } }}
            ```
        - js代码
    
            ```
            table.on('tool(表格lay-filter)', function(obj) {
                var data = obj.data;
                switch (obj.event){
                    case '按钮lay-event':
                        // 按钮触发事件
                        方法名(data);
                        break;
                }
            });
            
            function 方法名(data){
                layer.confirm('确定删除？', function(index) {
                    qCommon.ajax({
                        url: "请求地址",
                        data: {},
                        done: function(res) {
                            table.reload('表格ID');
                            layer.msg('已删除');
                        }
                    });
                    layer.close(index);
                });
            }
            ```
- ##### 全局设置说明
    - ##### 请求地址全局配置
    
        ![进入config](https://img-blog.csdnimg.cn/20190425143528533.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lpbl9QaXNjZXM=,size_16,color_FFFFFF,t_70)
        ![修改Ip](https://img-blog.csdnimg.cn/20190425143903916.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lpbl9QaXNjZXM=,size_16,color_FFFFFF,t_70)
        
        将Ip修改为对应地址
        
    - ##### 全局封装组件说明
    
        - 基础组件封装——qCommon
        
            | 方法 | 参数 | 返回值 | 描述 |
            | --- |--- | --- | --- |
            | qCommon.uoloads | Object function String| void | 基于layui上传组件进行的二次封装 |
            | qCommon.isNull | String | boolean | 判断字符串是否为空，空：true 非空：false |
            | qCommon.ajax | Object | void | 基于ajax的二次封装，主要实现token默认传递和未存在登录信息跳转登录页 |
            | qCommon.table | Object | void | 基于layui table的二次封装，参数传递参考layui table，实现token默认传递 |
            | qCommon.warn | String | void | 警告框提示 |
            | qCommon.success | String | void | 成功框提示 |
            | qCommon.error | String | void | 失败提示 |

        - 日期封装——qDate
        
            | 方法 | 参数 | 返回值 | 描述 |
            | --- |--- | --- | --- |
            | qDate.formatDateTime | String/Integer | String | 时间戳转yyyy-MM-dd hh:mm:ss |
            | qDate.getYearWeekRange | Integer Integer | Array | 参数为：年份和周数；获取当前年的第几周，以及周对应的日期范围（根据当前日期的时间）, 返回当前日期为[年，周数，周的范围start,周的范围end],按照周五到下周四为一周 |
            | qDate.getDateRange | String | Array | 参数：2019-04-25；获取周对应的日期范围(常规的一周为周一到周天为一周 |
            | qDate.isLeapYear | Integer | boolean | 参数：年；判断年份是否为润年 |
            | qDate.getMonthDays | Integer Integer | Integer | 参数：年份和月份；获取某一年份的某一月份的天数 |
            | qDate.getWeek | String | Integer | 参数：2019-04-25；获取时间所在周数 |
            | qDate.GetDateStr | Integer Date | String | 参数：天数和时间；获取当前指定的前几天的日期,往前推4天，GetDateStr(4)，后推4天GetDateStr(-4) |
            | qDate.getDayEveryDay | Integer Integer | Array | 传入年，周数，获取周数对应的所有日期 |
            | qDate.getYearWeek | Integer | Integer | 获取一年总周数 |
        
        > **注意：** 此封装为当前时间(2019-04-25)的封装，后续有新增封装时在添加

    - ##### 三方组件使用说明
    
        暂无
    
    - ##### 如何组件封装
        
         ```
        ├─layuiadmin
        │  ├─modules
        │  │  └─**.js        --新增的封装js
        ```
        js文件创建好之后,将以下代码复制到js文件中，剩下就是填充内容即可
        ```
        layui.define(function(exports){
            var $ = layui.$
            ,layer = layui.layer
            ,laytpl = layui.laytpl
            ,setter = layui.setter
            ,view = layui.view
            ,admin = layui.admin；
          
            var common = {};
        
          
            //对外暴露的接口
            exports('common', common);
        });
        ```