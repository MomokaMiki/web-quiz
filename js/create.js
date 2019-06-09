$(function(){
  const btnCreateName = $(".btn-create-name");
  function separateName(material, parts) {
    let length = material.length;
    // 〜２文字 => 何もしない
    if (length <= 2) {
      // console.log("〜２")
      parts.push(material)
    }
    // ３文字 => 前の２文字 & 後ろの２文字
    if (length == 3) {
      // console.log("３")
      parts.push(material.slice(0, 2))
      parts.push(material.slice(-2))
    }
    // ４文字 => 前の２文字 & 後ろの２文字
    if (length == 4) {
      // console.log("４")
      parts.push(material.slice(0, 2))
      parts.push(material.slice(-2))
    }
    // ５文字 => 前の２文字 & 後ろの３文字
    if (length == 5) {
      // console.log("5")
      parts.push(material.slice(0, 2))
      parts.push(material.slice(-3))
    }
    // ６文字〜 => 前の２文字
    if (length >= 6) {
      // console.log("６〜")
      parts.push(material.slice(0, 2))
    }
  }

  btnCreateName.on("click",function(){
    let enMyoji = $(".memberEn input:first-child").val();
    let enNamae = $(".memberEn input:last-child").val();
    let deMyoji = $(".memberDe input:first-child").val();
    let deNamae = $(".memberDe input:last-child").val();
    let Enmaterials = [enMyoji, enNamae];
    let Dematerials = [deMyoji, deNamae];
    let Enparts = [];
    let Departs = [];
    $.each(Enmaterials, function (i, e) {
      separateName(e, Enparts);
    })
    $.each(Dematerials, function (i, e) {
      separateName(e, Departs);
    })
    let enRandomNum = Enparts.length-1;
    let deRandomNum = Departs.length - 1;

    let enPartNum = Math.round(Math.random() * enRandomNum);
    let enPart = Enparts[enPartNum];
    let dePartNum = Math.round(Math.random() * deRandomNum);
    let dePart = Departs[dePartNum];
    
    let add = ["組","ズ","ペア","チーム","コンビ"];
    let addRandomNum = add.length - 1;
    let addPartNum = Math.round(Math.random() * addRandomNum);
    let addPart = add[addPartNum];

    let teamName = enPart + dePart + addPart;
    $(".team-name span").text(teamName)
    console.log(teamName);
  })
})