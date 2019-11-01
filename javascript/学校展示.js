        //使用数组保存图片的地址
    var imgs=["../image/高校沙漠2.jpg","../image/高校沙漠3.jpg"];
    var index=0;
    function qiehuan(){
        document.getElementById("img").src=imgs[index];
        index++;
        if(index > 1){
            index=0;
        }
    }
    setInterval("qiehuan()",3000);

        var oBtn=getClass("btn");
        var oPicLi=getClass("pic")[0].getElementsByTagName("li");//获取div中的li标签
        var oTabLi=getClass("tab")[0].getElementsByTagName("li");//获取div中的li标签
        var oBtnA=oBtn[0].getElementsByTagName("a");//获取div中的a标签对象
        var index=0;
        for(var i=0;i<oTabLi.length;i++){//根据点击的tab去切换图片
            oTabLi[i].index=i;//这个地方需要注意，点击的tab要和图片index保持一致
            oTabLi[i].onclick=function(){//tab按钮点击事件
                index=this.index;
                for(var j=0;j<oTabLi.length;j++){//消除class样式
                    oTabLi[j].className="none";
                    //oPicLi[j].style.display="none";
                    if(j!=index){
                        fadeOut(oPicLi[j],1000);
                    }
                }
                this.className="on";//oTabLi[index].className="on";
                //oPicLi[index].style.display="block";
                fadeIn(oPicLi[index],1000);
            };
        }
        for(var i=0;i<oBtnA.length;i++){
            oBtnA[i].onclick=function(){//左右耳朵的点击事件
                if(this.id=="right"){//右耳朵点击事件
                    index++;
                    //oPicLi[(index-1)%5].style.display="none";
                    fadeOut(oPicLi[(index-1)%5],1000);
                    oTabLi[(index-1)%5].className="none";
                    oTabLi[index%5].className="on";
                    //oPicLi[index%5].style.display="block";
                    fadeIn(oPicLi[index%5],1000);
                }else {//左耳朵点击事件
                    if(index==0)index=5;
                    index--;
                    //oPicLi[(index+1)%5].style.display="none";
                    fadeOut(oPicLi[(index+1)%5],1000);
                    oTabLi[(index+1)%5].className="none";
                    oTabLi[index%5].className="on";
                    //oPicLi[index%5].style.display="block";
                    fadeIn(oPicLi[index%5],1000);
                }
            };
        }
        function fadeIn(obj,time){//淡入函数  实现time毫秒后显示，原理是根据透明度来完成的
            var startTime=new Date();
            obj.style.opacity=0;//设置下初始值透明度
            obj.style.display="block";
            var timer=setInterval(function(){
                var nowTime=new Date();
                var prop=(nowTime-startTime)/time;
                if(prop>=1){
                    prop=1;//设置最终系数值
                    clearInterval(timer);
                }
                obj.style.opacity=prop;//透明度公式： 初始值+系数*（结束值-初始值）
            },13);//每隔13ms执行一次function函数
        };

        function fadeOut(obj,time){
            var startTime=new Date();
            obj.style.opacity=1;//设置下初始值透明度
            obj.style.display="block";
            var timer=setInterval(function(){
                var nowTime=new Date();
                var prop=(nowTime-startTime)/time;
                if(prop>=1){
                    prop=1;//设置最终系数值
                    clearInterval(timer);
                }
                obj.style.opacity=1+prop*(0-1);//透明度公式： 初始值+系数*（结束值-初始值）
            },13);//每隔13ms执行一次function函数
        };

        function getClass(cName){//获取页面中所有class为cName的div对象
            if(document.getElementsByClassName){//如果浏览器支持这样获取一个class
                return document.getElementsByClassName(cName);
            }else {//如果浏览器不支持上述访问
                var allE=document.getElementsByTagName("*");//获取页面中所有的dom对象
                var reg=new RegExp("\\b"+cName+"\\b");
                var arr=[];
                for(var i=0;i<allE.length;i++){
                    if(reg.test(allE[i].className)){//如果匹配
                        arr.push(allE[i]);
                    }
                }
                return arr;//返回匹配的所有div对象，因为class不唯一，所以可能会返回多个div
            }
        };