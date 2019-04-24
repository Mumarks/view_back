layui.config({
    base: '../../../layuiadmin/' //静态资源所在路径
}).extend({
    index: 'lib/index' //主入口模块
}).use(['index', 'qCommon', 'table'], function() {
    var $ = layui.$,
        form = layui.form,
        table = layui.table,
        qCommon = layui.qCommon;

    qCommon.ajax({
        url:"icon/iconShow",
        type:"get",
        done:function(res){
            var data = res.data;
            var iconfont =	"";
            var layui = "";
            var k=0;
            for(var i=0;i<data.length;i++){
                if(data[i].iconType==0){
                    for(var j=k;j<data.length;j++){
                        iconfont += '<li>'+
                            '<i class="layui-icon '+data[j].iconClass+'"></i>'+
                            '<div class="doc-icon-name">'+data[j].iconName+'</div>'+
                            '<div class="doc-icon-fontclass">'+data[j].iconClass+'</div>'+
                            '</li>'
                        k++;
                        break;
                    }
                    $("ul[name='iconfont']").html(iconfont);
                    form.render();
                }else if(data[i].iconType==1){
                    for(var j=k;j<data.length;j++){
                        layui += '<li>'+
                            '<i class="layui-icon '+data[j].iconClass+'"></i>'+
                            '<div class="doc-icon-name">'+data[j].iconName+'</div>'+
                            '<div class="doc-icon-fontclass">'+data[j].iconClass+'</div>'+
                            '</li>'
                        k++;
                        break;
                    }
                    $("ul[name='layui']").html(layui);
                    form.render();
                }
            }
        }
    })
});