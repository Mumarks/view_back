/**
 * 封装组件和Ajax
 */
layui.define(['table', 'form','upload'], function(exports) {
	var $ = layui.$,
		table = layui.table,
		setter = layui.setter,
		admin = layui.admin,
		form = layui.form,
		upload = layui.upload;
	
	var qCommon = {};
	/*图片上传
	 * tiple：是否多张上传
	 * operId:操作按钮id
	 * previewId：预览id
	 * tipsId: 提示id
	 * */
	qCommon.uoloads=function(data,callBack,num){
		uploadInst = upload.render({
		    elem: ""+data.operId+""
		    ,multiple: (data.tiple ? true : false)//是否多文件上传
		    ,url:layui.setter.uoloadUrl
		    ,before: function(obj){
		    	var appPlay=this;
//		    	console.log(appPlay);
		      //预读本地文件示例，不支持ie8
		      obj.preview(function(index, file, result){
		      	/*文件*/
		      	if(appPlay.accept=="file" && (data.previewId ? true : false) ){
		      		
		      		
		      		//'<img src="'+ result +'" alt="'+ file.name +'" title="'+ file.name +'">'
					$(''+data.previewId+'').append(`<div class="ghImgWrap">	
		      			<img src="${result}" alt="${file.name} title="${file.name}" >
		      			<i class="layui-icon">&#x1007;</i>   
		      		 </div>
		      		`)
		      	}
		      });
		    }
		    ,done: function(res){
		    	/*返回值回调*/
		    	callBack(res,layui.setter.urlfile,num);
		      	/*视频*/
		      	if(this.accept=="video" && (data.previewId ? true : false)){
		      		$(''+data.previewId+'').append('<video autoplay loop src="'+layui.setter.urlfile+ res.data.src +'" controls="controls" style="width:300px; height:300px;margin: 0 10px 10px 0;"></video>')
		        }
		      	/*音频*/
		      	else if(this.accept=="audio"  && (data.previewId ? true : false)){
		      		$(''+data.previewId+'').append('<audio autoplay controls src="'+layui.setter.urlfile+ res.data.src +'" loop style="margin: 0 10px 10px 0;"></audio>')
		        }
		    }
		    ,error: function(){
		      //演示失败状态，并实现重传
		      if((data.tipsId ? true : false)){
			      var demoText = $(''+data.tipsId+'');
			      demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
			      demoText.find('.demo-reload').on('click', function(){
			        uploadInst.upload();
			      });
		      }
		    }
		});
	}
	
	
	
	// 判断是否为空
	qCommon.isNull = function(str) {
		if(!str) {
			return true;
		}
		return false;
	}

	// ajax请求
	qCommon.ajax = function(data) {
		var url = qCommon.isNull(data.url) ? "" : data.url;
		admin.req({
			url: url.indexOf("http") > 0 ? url : layui.setter.domian + url,
			type: (qCommon.isNull(data.type) ? "get" : data.type),
			data: qCommon.isNull(data.data) ? {} : data.data,
			async: data.async == undefined ? true : data.async,
			done: qCommon.isNull(data.done) ? function(){} : data.done,
			success: qCommon.isNull(data.success) ? function(){} : data.success,
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			}

		});
	}

	// table 表格
	qCommon.table = function(data) {

		let tokenName = setter.request.tokenName;
		let tokenValue = layui.data(setter.tableName)[setter.request.tokenName];

		if(!data.where) {
			data.where = {};
			data.where[tokenName] = tokenValue;
		}

		if(!data.headers) {
			data.headers = {};
			data.headers[tokenName] = tokenValue;
		}

		for(var i = 0; i < data.cols.length; i++) {
			for(var j = 0; j < data.cols[i].length; j++) {
				data.cols[i][j].align = "center";
			}
		}

		table.render({
			elem: data.elem,
			url: data.url,
			where: data.where,
			loading: true,
			headers: data.headers,
			toolbar: qCommon.isNull(data.toolbar) ? "default" : data.toolbar, 
			defaultToolbar: ['filter', 'print', 'exports'],
			page: true, //开启分页
			limit: 10,
			limits: [10, 15, 20, 25, 30],
			cols: data.cols,
			text: {none: '暂无数据！'},
//			text: '对不起，加载出现异常！',
			request: {
				pageName: "page",
				limitName: "size"
			}
		})
	}
	
	// 时间戳转yyyy-MM-dd hh:mm:ss
	qCommon.formatDateTime = function(inputTime) {  
	    var date = new Date(inputTime);
	    var y = date.getFullYear();  
	    var m = date.getMonth() + 1;  
	    m = m < 10 ? ('0' + m) : m;  
	    var d = date.getDate();  
	    d = d < 10 ? ('0' + d) : d;  
	    var h = date.getHours();
	    h = h < 10 ? ('0' + h) : h;
	    var minute = date.getMinutes();
	    var second = date.getSeconds();
	    minute = minute < 10 ? ('0' + minute) : minute;  
	    second = second < 10 ? ('0' + second) : second; 
	    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
	};
	
	/**
	 * 切割片区选择的方法
	 * @param {Object} area 需要切割的字段
	 */
	qCommon.cutAddress = function(area){
		var result = {
			province : "",
			city : "",
			county : "",
			street : "",
			community : ""
		};
		if(qCommon.isNull(area)){
			return result;
		}
		var areaList = area.split("/");
		if(areaList.length == 0){
			return result;
		}
		
		for(var i = 0; i < areaList.length; i++){
			if(i == 0){
				result.province = areaList[i];
			} else if(i == 1){
				result.city = areaList[i];
			} else if(i == 2){
				result.county = areaList[i];
			} else if(i == 3){
				result.street = areaList[i];
			} else if(i == 4){
				result.community = areaList[i];
			}
		}
		return result;
	}
	
	// 提示框
	qCommon.warn = function(message){
		layer.alert(message, {
		    skin: 'layui-layer-molv'
		    ,icon: 0	
		    ,title:'提示'
		    ,closeBtn: 0
		    ,anim: 1 //动画类型
		});
	}
	
	qCommon.success = function(message){
		layer.alert(message, {
		    skin: 'layui-layer-molv'
		    ,icon: 1	
		    ,title:'提示'
		    ,closeBtn: 0
		    ,anim: 1 //动画类型
		});
	}
	
	qCommon.error = function(message){
		layer.alert(message, {
		    skin: 'layui-layer-molv'
		    ,icon: 2	
		    ,title:'提示'
		    ,closeBtn: 0
		    ,anim: 1 //动画类型
		});
	}
	
	exports('qCommon', qCommon);
	
	
});