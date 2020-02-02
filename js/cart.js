//点击删除按钮 
//   桶盖打开 - 加 open 类名
//   模态框以动画形式出现 - .win-box { display: bolck }
//                     - 加bounceInDown类名

let delBtns = document.querySelectorAll('.del');
let winBox = document.querySelector('.win-box');
let delBox = document.querySelector('.del-box');

let cancel = document.querySelector('.btn-cancel');

delBtns.forEach(function(v, i) {
    v.onclick = function() {
        this.classList.add('open');
        winBox.classList.add('show');
        delBox.classList.add('bounceInDown');
    }
});

// 点击取消按钮 
//      模态框隐藏  -   加 hide 类名
//      去掉删除盒子的类名  -   去掉bounceInDown
//      桶盖闭合    -   去掉 open 类名
cancel.onclick = function() {
    winBox.classList.remove('show');
    delBox.classList.remove('bounceInDown');
    document.querySelector('.open').classList.remove('open');
}
