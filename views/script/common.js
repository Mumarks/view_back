function validatePermission(per) {
	var permissions = localStorage.getItem("permission");
	permissions = permissions.split(",");
	for(var i = 0; i < permissions.length; i++) {
		if(permissions[i] == per) {
			return true;
		}
	}
	return false;
}

function requireUrlData(strName) {
	var strHref = location.href;
	var intPos = strHref.indexOf("?");
	var strRight = strHref.substr(intPos + 1);
	var arrTmp = strRight.split("&");
	for(var i = 0; i < arrTmp.length; i++) {
		var arrTemp = arrTmp[i].split("=");
		if(arrTemp[0].toUpperCase() == strName.toUpperCase())
			return arrTemp[1];
	}
	return "";
}