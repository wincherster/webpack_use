// function count(str) {
//   var res = {},
//       arr = str.split("");
//   for(var i = 0; i< arr.length; i++) {
//       console.log(arr[i]);
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
// count('hello world');

// 2020-07-14 webpack 3-2
import avatar from './avatar.jpg';
import './index.css';
import style from './avatar.scss';

import createAvatar from './createAvatar'
createAvatar();




var img = new Image();
img.src = avatar;
img.classList.add(style.avatar);

var root = document.getElementById('root');
root.append(img);

var nums1 = [1,2,3], m = 3, nums2 = [2,5,6], n = 3;

var merge = function(nums1, m, nums2, n) {
  var len1 = m,
      len2 = n,
      len = m + n -1;
      // 实现方式1： 直接合并数组，排序
  var newArr = nums1.concat(nums2).sort((a, b) => a-b);


  // 网上的实现方式，错误的
  // while(len2 >=0) {
  //     if(len1 < 0) {
  //         nums1[len--] = nums2[len2--];
  //         continue;
  //     }
  //     nums1[len--] = nums1[len1] >= nums2[len2] ? nums1[len1--] : nums2[len2--];
  // }

  return newArr;
};




console.log('Result ', merge(nums1, m, nums2, n))