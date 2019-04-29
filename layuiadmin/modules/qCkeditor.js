layui.define(['jquery', "qCommon"], function(exports){
    var $ = layui.$,
        qCommon = layui.qCommon;


    var qCkeditor = {};

    // 初始配置
    if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
        CKEDITOR.tools.enableHtml5Elements( document );

    /*
     * 编辑自动增长功能
     */
    CKEDITOR.config.extraPlugins = '';
    CKEDITOR.config.autoGrow_minHeight = 300;
    CKEDITOR.config.autoGrow_maxHeight = 600;
    CKEDITOR.config.autoGrow_bottomSpace = 50;


    CKEDITOR.config.width = 'auto';
    CKEDITOR.config.language = "zh-cn";

    CKEDITOR.config.extraPlugins = 'autogrow,image2,uploadimage';

    CKEDITOR.editorConfig = function (config) {
        //...其他设置
        config.removePlugins = 'easyimage,cloudservices';//添加该行代码关闭easyimage、cloudservices插件即可
    };

    var ckeditor = function(id){
        console.log(CKEDITOR);
        return CKEDITOR.replace(id,{
            filebrowserBrowseUrl: '../../lib/ckeditor/upload.html',
            filebrowserWindowWidth:300,
            filebrowserWindowHeight:300
        });
    }

    /**
     * 初始化ckeditor
     * @param data
     */
    qCkeditor.init = function(id){
        ckeditor(id);
    }

    /**
     * 获取数据
     * @param Id
     * @returns {HTMLElement | null}
     */
    qCkeditor.getData = function(){
        return CKEDITOR.instances.editor.getData();
    }


    /**
     * 赋值
     * @param value
     * @returns {*}
     */
    qCkeditor.setData = function(value){
        return CKEDITOR.instances.editor.setData(value);
    }

    exports('qCkeditor', qCkeditor)
});