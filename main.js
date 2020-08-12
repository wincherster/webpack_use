


import 'normalize.css';

// 2020-07-14 webpack 3-2
import avatar from './avatar.jpg';

import style from './avatar.scss';
import './index.js';



// import createAvatar from './createAvatar'
// createAvatar();







// /^([\w\.])+@\w+\.\w+$/.test(sEmail);  

// 答案错误:您提交的程序没有通过所有的测试用例
// case通过率为85.71%






// var root = document.getElementById('root');

// var img = new Image();
// img.src = avatar;
// img.classList.add(style.avatar);

// root.append(img);

// var code = document.createElement("pre");
// code.innerHTML = rgb2hex;
// root.append(code);



// var nums1 = [1,2,3], m = 3, nums2 = [2,5,6], n = 3;

// var merge = function(nums1, m, nums2, n) {
//   var len1 = m,
//       len2 = n,
//       len = m + n -1;
//       // 实现方式1： 直接合并数组，排序
//   var newArr = nums1.concat(nums2).sort((a, b) => a-b);


//   // 网上的实现方式，错误的
//   // while(len2 >=0) {
//   //     if(len1 < 0) {
//   //         nums1[len--] = nums2[len2--];
//   //         continue;
//   //     }
//   //     nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
//   // }

//   return newArr;
// };

// console.log('Result ', merge(nums1, m, nums2, n))



// function count(str) {
//   var res = {},
//       // arr = str.split(" ");
//       newStr = str.replace(/\s/g, ""),
//       arr = newStr.split("");

//   for(var i = 0; i< arr.length; i++) {
//       if(arr[i] !== ''){
//           if(res.hasOwnProperty(arr[i])) {
//               res[arr[i]] += 1;
//           }else {
//               res[arr[i]] = 1;
//           }
//       }
//   }
//   console.log(res);
// }
// count('hello world     world');


// // 链接：https://www.nowcoder.com/questionTerminal/80b08802a833419f9c4ccc6e042c1cca
// // 来源：牛客网

// // 将 rgb 颜色字符串转换为十六进制的形式，如 rgb(255, 255, 255) 转为 #ffffff
// // 1. rgb 中每个 , 后面的空格数量不固定
// // 2. 十六进制表达式使用六位小写字母
// // 3. 如果输入不符合 rgb 格式，返回原始输入

// function rgb2hex (rgb) {
//   // var rgbRep = /^(rgb|RGB)\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/,
//   var rgbRep = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/,
//       ret = rgb.match(rgbRep);

//   if(!ret){
//     return rgb;
//   }else {

//     function hex(str) {
//       return str < 16 ? "0" + Number(str).toString(16) : Number(str).toString(16);
//     }
//     return rgb.replace(rgbRep, function(a, r, g, b){
//       console.log(r, g, b);
//       return "#" + hex(r) + hex(g) + hex(b);
//     })
//   }
// }

// var result = [];

//   result.push(rgb2hex("rgb(255, 255, 255)"));
//   result.push(rgb2hex("rgb(0, 5, 28)"));
//   result.push(rgb2hex("rgb(255, 255, 255)"));
// // var result = rgb2hex("RGB(0, 0, 0)");
// console.log(result, "result");

// var resultDom = document.createElement("div");
//     resultDom.innerHTML = result;  // 这里调用了 Array.toString 方法
// root.append(resultDom);


// var codeDom = document.createElement("code");
//     codeDom.innerHTML = result;  // 这里调用了 Array.toString 方法
// root.append(resultDom);


// 牛客网， 算法题
// 2020-07-28 剪绳子 算法题 【贪婪算法】
function cutRope(number)
{
    // if(number < 2) return 0;
    // if(number === 2) return 1;
    // if(number === 3) return 2;
    
    // // 长度大于等于 5 时，尽可能多 剪去长度为 3 的绳子段
    // let timesOf3 = Math.floor(length / 3);
    
    // 当绳子最后剩下的长度为 4 时，不能再剪去长度为 3 的绳子段
    // if(number - timesOf3 * 3 === 1) timesOf3 -= 1;
    
    // let timesOf2 = Math.floor((number - timesOf3 * 3) / 2 );
    
    // return Math.pow(3, timesOf3) * Math.pow(2, timesOf2);


    if(number===2) return 1;
    if(number===3) return 2;

    let a = Math.floor(number/3), b = number % 3;

    switch(b){
      case 0:return Math.pow(3,a);
      case 1:return Math.pow(3,a-1)*4;
      case 2:return Math.pow(3,a)*2;   
    }
    
}

console.log(cutRope(15), "用例: 15 ，对应输出应该为: 243");

console.log(abc)