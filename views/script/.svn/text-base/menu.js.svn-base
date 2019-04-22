$(document).ready(function() {
	
//	var ipconfig = 'http://183.230.252.112:32012/';
   	var ipconfig = 'http://192.168.1.156:8082/';
	
	$.ajax({
		type: "POST",
		url: ipconfig + "/menu/getmenus",
		async : false,
		data : {
			token : localStorage.getItem("token")
		},
		dataType:"json",
		xhrFields: {
	        withCredentials: true
	    },
		crossDomain: true,
		success: function(res) {
			var data = res.data;
			var menuHtml = '<ul class="layui-nav layui-nav-tree" lay-shrink="all" id="LAY-system-side-menu" lay-filter="layadmin-system-side-menu">';
			
			for(var i = 0; i < data.length; i++) {
				var menu = data[i];
				menuHtml += '<li data-name="' + menu.id + '" class="layui-nav-item">';
				// 一级目录
				menuHtml += '<a href="' + menu.path + '" lay-tips="' + menu.title + '" lay-direction="2">';
				menuHtml += '<i class="layui-icon ' + menu.icon + '"></i>';
				menuHtml += '<cite>' + menu.title + '</cite>';
				menuHtml += '</a>';
				// 如果存在二级目录
				if(menu.children.length > 0) {
					menuHtml += createMenuHtml(menu.children);
				}
				menuHtml += '</li>';
			}
			menuHtml += "</ul>";
			// 先清楚原有得菜单
			$(".layui-logo").nextAll().remove();
			$("#commonMenu").append(menuHtml);
		},
		error : function (XMLHttpRequest, textStatus, errorThrown) {
			if(XMLHttpRequest.responseJSON.message == '未登录或登录过期，请前往登录！'){
				window.location.href = '../views/user/login.html';
			}
		}
	});
});

// 拼装菜单html
function createMenuHtml(children) {
	var menuHtml = "";
	menuHtml += '<dl class="layui-nav-child">';
	for(var i = 0; i < children.length; i++) {
		var menu = children[i];
		menuHtml += '<dd data-name="' + menu.id + '">';
		menuHtml += '<i class="layui-icon ' + menu.icon + '"></i>';
		menuHtml += '<a lay-href="' + menu.path + '">' + menu.title + '</a>';
		// 三级目录
		if(menu.children.length > 0) {
			menuHtml += createMenuHtml(menu.children);
		}
		menuHtml += '</dd>';
	}
	menuHtml += '</dl>';
	return menuHtml;
}

