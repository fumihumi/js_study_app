// tweetに個別の識別番号を付与する為のロジック
var utils = {
  uuid: function () {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }

    return uuid;
  }
}

var App = function() {
}
var Tweet = function(body){
  //Tweetという関数オブジェクトにプロパティを追加していく。
//コンストラクタ関数には生成するオブジェクトにもたせたい情報をthis.[プロパティ名]として定義していく
//今回のもたせたい情報は[uuid,body,is favorited]の三つなのでそれぞれ
  this.uuid = utils.uuid()
  this.body = body
  this.isFaborited = false
}

// applicationの起動
$(function() {
  new App()
})
