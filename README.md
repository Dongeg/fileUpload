# fileUpload
jq文件上传，带上传前预览

## how to use

```html
        <div>
            <!-- 点击显示待上传文件列表-->
            <input type="file" @change="preview()" id="upload-btn">
        </div>
        <div>

        </div>
        <div>
            <!-- 点击上传-->
            <button @click="upload()">确认</button>
        </div>
```

```js

var app = new Vue({
    el: '#app',
    data: {
        waitUplaodfile:[], // 待上文件传列表
        importUrl:'/educationWeb/api/importFile/download',
    },
    mounted: function () {
        this.$nextTick(function () {
        
        })
    },
    methods : {
        // 预览
        preview:function(type){
            var that = this;
            fileUpload.preview({
                id: '#upload-btn',  // 上传按钮id
                type: 'xls,xlsx',  // 上传文件类型
                maxSzie: 20 * 1024,       // 文件最大大小，单位KB
                nameMaxLen:80,    //名字最长字符数
                showFileMsg:function (msg) { // 获取待上传文件信息
                    console.log(msg)
                }
            })
        },
        // 上传
        upload:function(type){
            var that = this;
            fileUpload.upload({
                url: 'http://192.168.0.216:8080/AttachmentTool/minstone/attachment/uploadFileNormal',
                data: {   // 要带过去的参数

                },
                // 上传成功后执行
                success: function (data) {

                }
            });
        },
    }
})


```
