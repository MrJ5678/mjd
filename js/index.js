// 1. 倒计时
downTime();
headers();
news();
banner();

function downTime() {
  let spans = document.querySelectorAll(".time span:nth-child(odd)");
  // console.log(spans);

  let target = new Date("2020-01-28 21:31:00");
  let timer = setInterval(function() {
    let t = (target - new Date()) / 1000;
    let h = Math.floor(t / 3600);
    let m = Math.floor((t % 3600) / 60);
    let s = Math.floor(t % 60);

    if (t <= 0) {
      clearInterval(timer);
      return;
    }
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    // console.log(h, m, s);

    spans[0].innerHTML = h;
    spans[1].innerHTML = m;
    spans[2].innerHTML = s;
  }, 1000);
}

function headers() {
  window.onscroll = function() {
    let header = document.querySelectorAll(".jd-header");
    // console.log(header[0].style.backgroundColor);

    let move = window.pageYOffset;
    let value = move / 255;

    if (value >= 0.8) {
      value = 0.8;
    }
    // console.log(value);

    header[0].style.backgroundColor = "rgba(222, 24, 27, " + value + ")";
  };
}

function news() {
  let index = 0;

  let ul = document.querySelector(".cut ul");
  let lis = ul.querySelectorAll("li");
  // console.log(ul.style);

  setInterval(function() {
    index++;
    ul.style.transition = "transform .3s";
    let y = -index * 30;

    ul.style.transform = "translateY(" + y + "px)";
  }, 2000);

  ul.addEventListener("transitionend", function() {
    if (index >= lis.length - 1) {
      index = 0;
      ul.style.transition = "none";
      ul.style.transform = "translateY(0px)";
    }
  });
}

function banner() {
  //  1- 找对象
  //  2-定时器切换轮播图
  //   定义index记录当前切换的图片
  //   使用定时器改变index
  //   根据index值推算ul移动距离
  //   让ul移动，加过渡
  //   小圆点同步切换

  let index = 1; //默认显示第二张
  let banner = document.querySelector(".jd-banner");
  let ul = banner.querySelector("ul");
  let lis = ul.querySelectorAll("li");
  let points = banner.querySelectorAll("ol li");
  // console.log(lis);
  // console.log(points);
  let width = banner.offsetWidth;

  let timer = setInterval(function() {
    index++;
    let x = -index * width;
    // console.log(x);
    addTransition();
    setTranslateX(x);
  }, 1500);

  ul.addEventListener("transitionend", function() {
    if (index >= lis.length - 1) {
      index = 1;
      // removeTransition();
      // let x = -index * width;
      // setTranslateX(x);
    }
    if (index <= 0) {
      index = 8;
    }
    removeTransition();
    let x = -index * width;
    setTranslateX(x);
    setPoint(index - 1);
  });

  // 触屏滑动切换轮播图
  // 1.触屏开始
  // 清除定时器
  // 记录触屏起始位置

  // 2.触屏移动
  // 获取移动后的坐标值
  // 计算距离差值
  // ul跟随手指移动，距离为距离差

  // 3.触屏结束
  // 判断触屏滑动距离是否超过屏幕宽度的1/3
  //如果大于三分之一
  //判断左滑： 下一张 => index++
  //判断右滑： 上一张 => index--
  // 让轮播图进行切换
  // 如果小于三分之一  不切换

  // 数据重置
  // 开启定时器

  let startX = 0;
  let moveX = 0;
  let distanceX = 0;
  banner.ontouchstart = function(e) {
    clearInterval(timer);
    startX = e.targetTouches[0].clientX;
  };

  banner.ontouchmove = function(e) {
    moveX = e.targetTouches[0].clientX;
    distanceX = moveX - startX;
    console.log(distanceX);
    let x = -index * width + distanceX;
    setTranslateX(x);
  };

  banner.ontouchend = function(e) {
    if (Math.abs(distanceX) > width / 3) {
      if (distanceX > 0) {
        index--;
      } else {
        index++;
      }
    }
    addTransition();
    let x = -index * width;
    setTranslateX(x);

    startX = 0;
    moveX = 0;
    distanceX = 0;

    timer = setInterval(function() {
      index++;
      let x = -index * width;
      // console.log(x);
      addTransition();
      setTranslateX(x);
    }, 1500);
  };

  window.onresize = function() {
    width = banner.offsetWidth;
  }

  // 切换小圆点
  function setPoint(i) {
    points.forEach(function(v, i) {
      v.classList.remove("current");
    });
    points[i].classList.add("current");
  }

  function addTransition() {
    ul.style.transition = "transform .4s";
    ul.style.webkitTransition = "transform .4s";
  }

  function removeTransition() {
    ul.style.transition = "none";
    ul.style.webkitTransition = "none";
  }

  function setTranslateX(x) {
    ul.style.transform = "translateX(" + x + "px)";
    ul.style.webkitTransform = "translateX(" + x + "px)";
  }
}
