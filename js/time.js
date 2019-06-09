$(function(){
  const quizList = [
    {
      quizNumber: 1,
      quizTitle: "Q,HTMLを発明した人は誰でしょう？",
      quizCurrent: "C",
      quizDescript: "ティム・バーナーズ＝リーです。",
      quizChoice: [
        {
          choiceNumber: "A",
          choiceTitle: "ヴィントン・サーフ",
        },
        {
          choiceNumber: "B",
          choiceTitle: "ロバート・カイリュー",
        },
        {
          choiceNumber: "C",
          choiceTitle: "ティム・バーナーズ＝リー",
        }
      ]
    },
    {
      quizNumber: 2,
      quizTitle: "Q,次のうち、最も黄色に近い色はどれでしょう？",
      quizCurrent: "B",
      quizDescript: "刈安色(かりやすいろ)です。",
      quizChoice: [
        {
          choiceNumber: "A",
          choiceTitle: "宍色(ししいろ)",
        },
        {
          choiceNumber: "B",
          choiceTitle: "刈安色(かりやすいろ)",
        },
        {
          choiceNumber: "C",
          choiceTitle: "淡萌黄(うすもえぎ)",
        }
      ]
    },
    {
      quizNumber: 3,
      quizTitle: "Q,HTMLでは見出しとして「H1」タグを使用しますが、<br>「H〜」タグはいくつまであるでしょう？",
      quizCurrent: "B",
      quizDescript: "H7タグなんてありません。",
      quizChoice: [
        {
          choiceNumber: "A",
          choiceTitle: "H5まで",
        },
        {
          choiceNumber: "B",
          choiceTitle: "H6まで",
        },
        {
          choiceNumber: "C",
          choiceTitle: "H7まで",
        }
      ]
    },
    {
      quizNumber: 4,
      quizTitle: "Q,アルファベット３文字で表記される色の三原色の数値が、<br>それぞれ「 168・0・255 」だった場合、何色になりますか？",
      quizCurrent: "A",
      quizDescript: "「 R(赤)・G(緑)・B(青) 」なので、赤と青を混ぜた紫色になります",
      quizChoice: [
        {
          choiceNumber: "A",
          choiceTitle: "紫色",
        },
        {
          choiceNumber: "B",
          choiceTitle: "オレンジ色",
        },
        {
          choiceNumber: "C",
          choiceTitle: "緑色",
        }
      ]
    }
  ];

  const resultArea = $(".result-area");
  const resultText = $(".result-text");
  const correctAnswer = $(".correct-answer");
  const correctDescript = $(".correct-descript");
  const quizArea = $(".quiz-area");
  const btnNext = $(".btn-next-quiz");
  const btnFinish = $(".btn-finish-quiz");

  let timerCountDown = "";
  const meter = $(".meter");

  let quizLength = quizList.length;
  let point = 0;

  // カウントダウンする関数
  function remainTimeCount(remainMinute,quiz) {
    meter.addClass("anime");
    timerCountDown = setInterval(function () {
      remainMinute--;
      remeinTime.text(remainMinute);
      if (remainMinute == 0) {
        clearInterval(timerCountDown);

        resultText.text("時間切れ！")
        correctAnswer.text(`正解は${quiz.quizCurrent}`);
        correctDescript.text(quiz.quizDescript);
        resultArea.addClass("ng");

        // もう選べないように
        $(".select-answer").addClass("end");
      }
    }, 1000)
  }

  // 正解・不正解を判断する関数
  function checkAnswer(selectAnswer,quiz) {
    // タイマー削除
    clearInterval(timerCountDown);
    // アニメーション止める
    meter.addClass("pause");
    // 一回答えたら選びなおしはできないように
    $(".select-answer").addClass("end");
    // 判定
    let selectNumber = selectAnswer.attr("id").split("-")[1];
    correctAnswer.text(`正解は${quiz.quizCurrent}`);
    correctDescript.text(quiz.quizDescript);

    if (selectNumber == quiz.quizCurrent) {
      resultText.text("正解！")
      resultArea.addClass("ok");
      point ++;
      // ポイント表示
      $(".point-area").text(point);
    }
    else {
      resultText.text("不正解！")
      resultArea.addClass("ng");
    }

    // 最終問題だった場合
    if (quizLength-1 == quizCount){
      btnNext.css("display", "none");
      btnFinish.css("display","block");
    }
    
  }

  // クイズを表示する関数
  function displayQuiz(quiz) {
    let item = `
    <div class="quiz-box">
      <h3>${quiz.quizTitle}</h3>
      <p class="select-list">
      </p>
    </div>
  `;
    quizArea.append(item);
    let selectList = $(".select-list");
    $.each(quiz.quizChoice, function (i, e) {
      let item = `
      <input id="quiz-${e.choiceNumber}" type="radio" name="quiz" value="${i}">
      <label for="quiz-${e.choiceNumber}" class="select-answer"><span>${e.choiceNumber}</span>${e.choiceTitle}</label>
    `;
      selectList.append(item);
    })
  }




  // 制限時間
  let remainMinute = 10;
  const remeinTime = $(".remain-time");
  meter.css("animation-duration", remainMinute + "s");
  remeinTime.text(remainMinute);


  let quizCount = 0;
  // 次へボタン押されたら次のクイズを出す
  btnNext.on("click",function(){
    

    $(".quiz-box").remove();
    resultArea.removeClass("ok ng");
    meter.removeClass("pause");
    meter.removeClass("anime");
    
    quizCount++;

    setTimeout(function(){
      // クイズを表示する
      let quiz = quizList[quizCount];
      displayQuiz(quiz);
      // カウントダウン
      remainTimeCount(remainMinute, quiz);
    },100)
  })

  
  $(".btn-start").on("click",function(){
    $(this).addClass("end");

    // クイズを表示する
    let quiz = quizList[quizCount];
    displayQuiz(quiz);
    // カウントダウン
    remainTimeCount(remainMinute, quiz);

    // 正解不正解の判定
    $(document).on("change", "input[name='quiz']", function (e) {
      let quiz = quizList[quizCount];
      checkAnswer($(e.target), quiz)
    })
  })
  


  btnFinish.on("click",function(){
    // phpファイルにデータを送る処理

    alert("あなたのポイントは"+point+"ポイント")
  })
});