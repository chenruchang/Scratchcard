# H5 Scratchcard
H5刮刮卡插件，刮刮卡图层和隐藏图层用两张图片实现，支持PC端，详细参数见以下说明。

  $('#scratchcard01').scratchcard({
            width: 300,//刮刮卡宽度
            height: 150,//刮刮卡高度
            lineWidth: 20,//橡皮檫像素，越大擦除越快
            clearRate:0.3,//擦除比率，当被擦除区域的比例超过30%时，直接全部擦除
            sourceImage: 'img/source01.jpg',//刮刮卡图层
            destinationImage: 'img/destination01.jpg'//刮刮卡隐藏图层，就是刮开之后的图片
        });
        
 ![Scratchcard](https://github.com/chenruchang/Scratchcard/blob/master/img/demo.png)
