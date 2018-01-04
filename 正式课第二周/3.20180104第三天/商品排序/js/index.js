// 1. 获取数据  ajax
var  data;
var oUl = document.getElementById("oul");
var  as = document.getElementsByTagName("a");
// 1. 创建ajax对象
var xhr = new  XMLHttpRequest();
//2.打开路径
xhr.open("get","json/product.json",false);// 同步
// 3.监听数据
xhr.onreadystatechange = function () {
    if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
        data=utils.toJSON(xhr.responseText);
    }
};
// 4.发送请求
xhr.send(null);

// 2.绑定数据
var str = ``;
for(var i=0;i<data.length;i++){
    var  cur = data[i];
    str+=`<li data-time="${cur.time}" data-hot="${cur.hot}" data-price="${cur.price}">
            <img src="${cur.img}" alt="">
            <span>${cur.title}</span>
            <span>${cur.time}</span>
            <span>${cur.hot}</span>
            <span>${cur.price}</span>
          </li>`
};
oUl.innerHTML = str;

// 3. 循环绑定点击事件
 for(var i=0;i<as.length;i++){
     as[i].index = i;//0  1  2
     as[i].flag = 1;
     as[i].onclick = function () {
         // 点击时，传入当前点击a标签的索引
         //this  --> as[i]
         // 通过call 改变sortList 中的this指向；让其指向as[i]
         sortList.call(this)
     };
 };
 var oLis = document.getElementsByTagName("li");

 function sortList() {
     // 类数组转数组；
     // this---> as[i]
     // console.log(this.index);
     // 把this赋值给变量that，这样在回调函数中就可以调用当前this了；
     var that = this;
     var  ary = utils.toArray(oLis);
     // 自定义数组放了三个字符串
     var dataAry = ["data-time","data-hot","data-price"];
     ary.sort(function (a,b) {
         // getAttribute : 获取自定义属性的属性值
         // a,b  代表是当前数组中li的对象
              // 回调函数中this ---> window
              var  cur = a.getAttribute(dataAry[that.index]);
              var  nex = b.getAttribute(dataAry[that.index]);
              if(that.index===0){
              // 当获取的cur nex是时间时，去掉时间字符串中间的“-”，replace替换
              cur = cur.replace("-","").replace("-","");
              nex = nex.replace("-","").replace("-","");
          }
          return (cur - nex)*that.flag;

     });
     that.flag*=-1;
     // 数组ary中顺序已经排序，但是页面中并没有排好；所以需要重新添加到页面中；
     var frg = document.createDocumentFragment();
     for(var i=0;i<ary.length;i++){
         frg.appendChild(ary[i]);
     };
     oUl.appendChild(frg);
     frg=null;

 }





