$('.modal').imagesLoaded({
    background: true
  })
  .done(function () {
    // hide loader 隱藏登入
    $('.loader').addClass('is-loaded');
    // demo
    CSSPlugin.defaultForce3D = false

    // init variables  變數設定

    var parent = $(".modal"),
      child = $(".modal-inner"),
      monsterOpenClose = $(".monster-open-close"),
      monsterClose = $(".monster-close"),
      monsterSignup = $(".monster-signup"),
      // monsterSignupSecond = $(".monster-signup-2"),
      cross = $(".close"),
      button = $("#button"),
      formHolder = $('.form'),
      form = $('form'),
      name = $("#name"),
      submitBtn = $(".submit-btn"),
      thankYou = $('.thank-you-holder'),
      nameHasValue = false,
      invisible = function () {
        parent.addClass('invisible'), modalTimeline.reverse()
      },
      modalTimeline = new TimelineMax({
        paused: true,
        onReverseComplete: invisible
      }),
      closeTimeline = new TimelineMax({
        paused: true
      }),
      signupTimelineFirst = new TimelineMax({
        paused: true
      }),
      signupTimelineSecond = new TimelineMax({
        paused: true
      }),
      signupTimelineFinal = new TimelineMax({
        paused: true
      });


    // populate timeline - close (monster) 填滿時間-關閉
    closeTimeline
      .to(monsterClose, 0.35, {
        rotation: -60,
        xPercent: -60,
        ease: Expo.easeOut
      })
      .to(monsterClose.find('span'), 0.175, {
        autoAlpha: 1,
        x: -20,
        ease: Expo.easeOut
      }, '-=0.175')

    // populate timeline - modal 填充模組
    modalTimeline
      .to(child, 0.4, {
        css: {
          top: "50%"
        },
        ease: Expo.easeOut
      })
      .to(monsterOpenClose, 0.4, {
        css: {
          top: "7%"
        },
        ease: Expo.easeInOut
      }, '-=0.42')
      .to(monsterOpenClose, 0.8, {
        css: {
          top: "-50%"
        },
        ease: Expo.easeInOut
      }, '+=0.2')

    // populate timeline - sign up first step 註冊第一步
    signupTimelineFirst
      .to(monsterSignup.find('span'), 0.4, {
        yPercent: -45,
        ease: Back.easeOut.config(1)
      })

    // populate timeline - sign up first step 註冊第一步
    signupTimelineSecond
      .to(monsterSignup.find('span'), 0.4, {
        yPercent: -65,
        ease: Back.easeOut.config(1)
      })

    // populate timeline - sign up final 註冊完成
    signupTimelineFinal
      .to(form, 0.4, {
        autoAlpha: 0,
        y: -10,
        ease: Expo.easeOut
      })
      .to(thankYou, 0.4, {
        autoAlpha: 1,
        y: -10,
        ease: Expo.easeOut
      }, '-=0.4')
      .to(monsterSignup.find('span'), 0.4, {
        yPercent: 0,
        ease: Back.easeOut.config(1.7)
      }, '-=0.4')
      .to(monsterSignup.find('span'), 0.4, {
        autoAlpha: 0,
        ease: Expo.easeOut
      }, '-=0.4')
      .set(monsterSignup, {
        className: '+=submitted'
      })
      .set(monsterClose, {
        className: '+=submitted'
      })


    // click: reverse timeline - modal 按兩下反向時間模組
    cross.on('click', 'span', function () {
      modalTimeline.reverse()
      closeTimeline.reverse()
    })

    // click: play timeline - modal 按播放時間線模組
    button.on('click', function () {
      parent.removeClass('invisible')
      modalTimeline.play()

    })


    //*******************怪物設定*********************************************
    // hover: play/reverse timeline - close (monster) 
    //懸停 反向時間模組關閉
    cross.hover(
      function (e) {
        closeTimeline.play()
      },
      function (e) {
        closeTimeline.reverse()
      }
    );

    // hover: play/reverse timeline - signup first step (monster) 
    //懸停播放/反向時間線 - 註冊第一步(怪物)
    formHolder.hover(
      function (e) {
        signupTimelineFirst.play()
      },
      function (e) {
        signupTimelineFirst.reverse()
      }
    );

    // change, keyup, paste click: play/reverse timeline - signup (monster)
    // 變更、鍵上、貼按下：播放/反向時間線 - 註冊（怪物）
    name.on("change keyup paste click", function () {
      if ($(this).val()) {
        signupTimelineSecond.play();
        nameHasValue = true;


      } else {
        signupTimelineSecond.reverse();
        nameHasValue = false;
      }
    });

    // click: play timeline - signup (monster) final
    //點擊： 播放時程表 - 註冊 （怪物） 決賽
    //取消預設行為
    submitBtn.on('click', function (e) {
      e.preventDefault();
      signupTimelineFinal.play();
      modalTimeline.reverse().delay(1);

      var el = document.getElementById('thank');
      el.innerHTML = 'HIHI!　' + document.getElementById('name').value + '　馬上幫您導入預約診間~~!';

      // window.setTimeout("window.location='https://wws31qlkcf5u5y9oyr5o7g-on.drv.tw/W10/1111eso.html'",3000);
      window.setTimeout("location.href='1111eso.html'", 3000);

    })


    //input type="submit" class="submit-btn" value="Sign up" disabled="disabled"
    //span id="thank"


    //*******************怪物設定*********************************************


    // simple jquery validation only for demo purposes  簡單驗證
    validate();
    $('input').on('change keyup paste', validate);

    function validate() {
      var inputsWithValues = 0;
      // get all input fields except for type='submit' 獲取除類型以外的所有輸入欄位
      var myInputs = $("input:not([type='submit'])");

      myInputs.each(function (e) {
        // if it has a value, increment the counter 如果它有價值，增加計數器
        if ($(this).val()) {
          inputsWithValues += 1;
        }
      });

      if (inputsWithValues == myInputs.length) {
        $("input[type=submit]").prop("disabled", false);
      } else {
        $("input[type=submit]").prop("disabled", true);
      }
    }
  });

//存讀COOKIE