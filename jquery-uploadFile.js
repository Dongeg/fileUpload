var fileUpload = {
    FileList:[], // 待上传文件列表,删除待上传文件可以操作这个数据
    formData:new FormData(), // 上传时提交的参数
    // 预览
    preview:function (obj) {
        var that = this;
        var maxSize = obj.maxSzie || 99999;  // 文件最大容量
        maxSize = maxSize * 1000;  // 将单位转化成 B
        var type = obj.type;  //规定的文件的类型

        var fileList = $(obj.id).get(0).files;    // 获取上传的文件对象
        console.log(fileList)
        if(!fileList[0]){
            return
        }
        for(var i=0; i< fileList.length; i++){   //判断上传的文件是否符合需求，然后将文件也放入formData对象中
            if (fileList[i].size > maxSize){
                layer.msg('文件大小不可以超过20MB',{icon:7})
                return
            }
            // if (fileList[i].name.length > obj.nameMaxLen){
            //     layer.msg('上传文件名不得超过'+obj.nameMaxLen+'个字符！',{icon:0})
            //     return
            // }
            if (type){
                var fileName = fileList[i].name.lastIndexOf(".");//取到文件名开始到最后一个点的长度
                var fileNameLength = fileList[i].name.length;//取到文件名长度
                var fileFormat = fileList[i].name.substring(fileName + 1, fileNameLength);
                var result = new RegExp(fileFormat).test(type)
                if (!result){
                    layer.msg('只能上传excel格式的文件',{icon:7})
                    return
                }
            }
            // this.formData.append("file", fileList[i] );
            this.FileList.push(fileList[i]);

        }
        obj.showFileMsg(this.FileList)

    },
    // 上传
    upload:function (obj) {
        var that = this
        for(var k in obj.data){   // 将附带参数放入formData对象中
            this.formData.append(k,obj.data[k]);
        }
        for(var i = 0;i< this.FileList.length;i++){
            this.formData.append("file",this.FileList[i]);
        }
        // 上传数据
        $.ajax({
            type:'post',
            dataType:'json',
            url:obj.url,
            data:that.formData,
            contentType: false,
            processData: false,
            xhr: function(){ // 获取原生的xhr对象
                var xhr = jQuery.ajaxSettings.xhr();
                xhr.addEventListener("error", uploadFailed, false);    // 监听上传失败
                return xhr;
            },
            success: function (data) {
                obj.success(data);
            },
        });

        function uploadFailed(evt) {
            obj.error()
        }
    }
}