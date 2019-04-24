layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index', //主入口模块
    iconPicker : 'iconPicker/iconPicker', //icon图标选择器
    yutons_sug : 'yutons-mods/yutons_sug'
}).use(['index',  'qCommon', 'form', 'yutons_sug', 'iconPicker'], function() {
    var $ = layui.$,
        setter = layui.setter,
        qCommon = layui.qCommon,
        iconPicker = layui.iconPicker,
        yutons_sug = layui.yutons_sug,
        form = layui.form;
    var data = {};
    data.operId = "#test1"; //按钮id
    data.previewId = "#demo2"; //预览id
    data.tipsId = "#demoText"; //提示id
    //初始化分组输入提示框
    yutons_sug.render({
        id: "groupCn", //设置容器唯一id
        type: 'sug', //设置输入框提示类型：sug-下拉框，sugTable-下拉表格
        url: "AddressM/addNewAddressInfo?groupCn=" //设置异步数据接口,url为必填项
    });
    //获取经纬度/高度 的点击事件 弹出弹框
    function getLonLat(elem) {
        var $elem = $(elem);
        var $latlon = $elem.prev();
        var $lon = $elem.parent().prev().prev().find('input');
        parent.layer.open({
            type: 2,
            title: '添加位置信息',
            content: '../newOne/getLonAndLat.html',
            area: ['1000px', '600px'],
            btn: ['确定'],
            yes: function(index, layero) {
                //获取经纬度的值
                var str = layero.find('iframe').contents().find("#map-content")[0].dataset.s;
                var strArr = str.split(",");
                var strlongitude = parseFloat(strArr[0]).toFixed(6),
                    strlatitude = parseFloat(strArr[1]).toFixed(6);
                //赋值  security_form_user为form 的lay-filter
                var lonlat = strlongitude + ',' + strlatitude;
                $latlon.val(lonlat);
                //							$lat.val(strlatitude);
                //							$lon.val(strlongitude);
                parent.layer.close(index);
            }
        })
    }
    $("#getLocation").on("click", function() {
        var lon = "",lat = "";
        var yblonlat = $("input[name=lonlat]").val();
        if(yblonlat){
            lon = yblonlat.split(',')[0];
            lat = yblonlat.split(',')[1];
        }
        parent.layer.open({
            type: 2,
            title: '添加位置信息',
            content: '../../newOne/getLonAndLat.html',
            area: ['1000px', '600px'],
            btn: ['确定'],
            yes: function(index, layero) {
                //获取经纬度的值
                var str = layero.find('iframe').contents().find("#map-content")[0].dataset.s;
                var strArr = str.split(",");
                var strlongitude = parseFloat(strArr[0]).toFixed(6),
                    strlatitude = parseFloat(strArr[1]).toFixed(6),
                    strheight = parseFloat(strArr[2]).toFixed(2);
                var lonlat = strlongitude + ',' + strlatitude;
                //赋值  security_form_user为form 的lay-filter
                form.val("security_form_area", {
                    "lonlat": lonlat,
                    "height": strheight
                })
                parent.layer.close(index);
            }
        })
    });

    qCommon.uoloads(data, function(result, urls) {
        //赋值修改的图片
        $("#areaPicture").attr("src", urls + result.data.src);
        $("#Picture").attr("value",result.data.src);
    });

})