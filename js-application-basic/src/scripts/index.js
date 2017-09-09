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
  this.tweets = [];
  this.bindEvents();
  this.tweetTemplate = Handlebars.compile($("#js-tweet-template").html());
}

App.prototype.bindEvents = function() {
  $('#js-tweet-body').on('keydown', this.tweet.bind(this));
  //bindは関数オブジェクトに対して利用することが多い？
  //今回の場合はbind(this)とすることで、Appのtweetプロパティを明示的に表している。
  $('#js-tweets').on('click', '.js-destroy', this.destroy.bind(this));
};

var Tweet = function(body){
  //Tweetという関数オブジェクトにプロパティを追加していく。
//コンストラクタ関数には生成するオブジェクトにもたせたい情報をthis.[プロパティ名]として定義していく
//今回のもたせたい情報は[uuid,body,is favorited]の三つなのでそれぞれ
  this.uuid = utils.uuid();
  this.body = body;
  this.createdAt;
  this.isFaborited = false;
}

App.prototype.tweet = function (e) {
  //引数の”e”にはイベント情報が詰まっている。
  if(e.keyCode === 13){
    //e.keycodeとしてあげることで"e"のイベントが発生した時にタイプされていたキーを取得することができる。
    //keycode == 13 というのはenterが押された時のコード。
    e.preventDefault();
    //e.preventdefault(); この一文はそのイベントがもともともっている挙動を止める役割をしている。
    //エンターキーが押された時の挙動と言うのは”改行”であるが、今回の場合は改行をしないようにしているということになる。
    var $tweetBody = $("#js-tweet-body");
    var body = $tweetBody.val(); //投稿内容の変数格納
    if(body.length !== 0){
      var tweet = new Tweet(body);
      this.tweets.unshift(tweet);
      this.render();
      $tweetBody.val("");
    }
  }
};

//特定のuuidを持つtweetを配列から検索する関数
App.prototype.tweetIndexByUuid = function(uuid){
  var i = this.tweets.length;

  while (i--){
    if(this.tweets[i].uuid === uuid){
      return i;
    }
  }
};

//特定のuuidを持つtweetを配列から削除するメソッド
App.prototype.destroy = function(e){
  e.preventDefault();//aタグがほんらい持っている画面繊維をキャンセルする
  var uuid = $(e.target).closest('section').data('uuid');
  this.tweets.splice(this.tweetIndexByUuid(uuid),1);
  this.render();
};

App.prototype.render = function (){
  $('#js-tweets').html(this.tweetTemplate(this.tweets));
  console.log("rendered");
}

// applicationの起動
$(function() {
  new App()
})
