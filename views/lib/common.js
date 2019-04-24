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