//
// JavaScriptのコードが雑なのは仕様です！
//
// 文句ある奴は自分でもっとスマートなコードを書きやがれ！( ‘д‘⊂彡☆))Д´) ﾊﾟｰﾝ
//
// Twitter: @marineblue1223
//
// 2017-10-09 ふくちのちの反省を元に作成
// 2017-10-10 新聞出典を追加（らの助言）
// 2017-10-15 archivedateパラメータの欠落を修正（Kkairriの報告）
// 2019-07-04 アーカイブ日付の手入力に対応、Twitterを隠しオプションで追加
// 2019-11-29 書籍出典の出力パラメータをyearからdateに変更
// 2021-07-09 必須入力の警告、書式不備の警告、日付入力をカレンダーに、日付手入力を半角に強制変換

// ページ読み込み時に非選択フォームを非表示にする
jQuery(document).ready(function($){
	$(".ref_type").css('display', 'none');
	
	newid = $('input[name=type]:checked').val();
	$(newid).css('display', 'block');
}
);

// ラジオボタンクリック時にフォームを切り替える
function type_change(rtype){
	$(".ref_type").css('display', 'none');
	$(rtype).css('display', 'block');
}

// 文字列の切り出し処理、アーカイブのところで使用
function insertStr(str, index, insert) {
    return str.slice(0, index) + insert + str.slice(index, str.length);
}

// assessdate の取得
var day = new Date();
var y = day.getFullYear();
var m = day.getMonth() + 1;
var d = day.getDate();
var mm = ('0' + m).slice(-2);
var dd = ('0' + d).slice(-2);
var $accessdate = y + "-" + mm + "-" + dd;

// 必須入力項目の空白チェック
function $checkEmpty($field) {
	if($field === "") {
		$check = 1;
	}
	else {
		$check = 0;
	}
	return $check;
}

// Web出典
function ref_web() {
	// 必須入力項目の確認
	$url         = $("#ref_web>form>table>tbody>tr>td>input[name='url']").val();
	$title       = $("#ref_web>form>table>tbody>tr>td>input[name='title']").val();

	// 未入力の警告
	if(($urlEmpty   = $checkEmpty($url)) === 1) {
		$("#ref_web>form>table>tbody>tr>td>span.address").text("※入力必須");
	}
	if(($titleEmpty = $checkEmpty($title)) === 1){
		$("#ref_web>form>table>tbody>tr>td>span.title").text("※入力必須");
	}

	// 未入力時に処理を抜ける、未入力がなければ警告を消す
	if($urlEmpty === 1 || $titleEmpty === 1){
		return;
	}
	else {
		$("#ref_web>form>table>tbody>tr>td>span.address").text("※");
		$("#ref_web>form>table>tbody>tr>td>span.title").text("※");
	}
	
	// 日付パラメータがなければ省略
	var $date = $("#ref_web>form>table>tbody>tr>td>input[name='date']").val();
	if($date !== "") {
		$date = " |date=" + $date;
	}
	
	var $reftag = [
		"<ref>{{Cite web ",
		"|url=" + $url,
		" |title=" + $title,
		" |publisher =" + $("#ref_web>form>table>tbody>tr>td>input[name='publisher']").val(),
		$date,
		" |accessdate=" + $accessdate,
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}

// PDF出典
function ref_pdf() {
	$url         = $("#ref_pdf>form>table>tbody>tr>td>input[name='url']").val();
	$title       = $("#ref_pdf>form>table>tbody>tr>td>input[name='title']").val();

	if(($urlEmpty   = $checkEmpty($url)) === 1) {
		$("#ref_pdf>form>table>tbody>tr>td>span.address").text("※入力必須");
	}
	if(($titleEmpty = $checkEmpty($title)) === 1){
		$("#ref_pdf>form>table>tbody>tr>td>span.title").text("※入力必須");
	}
	if($urlEmpty === 1 || $titleEmpty === 1){
		return;
	}
	else {
		$("#ref_pdf>form>table>tbody>tr>td>span.address").text("※");
		$("#ref_pdf>form>table>tbody>tr>td>span.title").text("※");
	}

	var $date = $("#ref_pdf>form>table>tbody>tr>td>input[name='date']").val();
	if($date !== "") {
		$date = " |date=" + $date;
	}
	
	var $reftag = [
		"<ref>{{Cite web",
		"|url=" + $("#ref_pdf>form>table>tbody>tr>td>input[name='url']").val(),
		" |title=" + $("#ref_pdf>form>table>tbody>tr>td>input[name='title']").val(),
		" |format=PDF |publisher =" + $("#ref_pdf>form>table>tbody>tr>td>input[name='publisher']").val(),
		$date,
		" |accessdate=" + $accessdate,
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}

// アーカイブ
function ref_archive() {
	// 必須入力項目の確認
	$url         = $("#ref_archive>form>table>tbody>tr>td>input[name='url']").val();
	$title       = $("#ref_archive>form>table>tbody>tr>td>input[name='title']").val();
	$archiveUrl  = $("#ref_archive>form>table>tbody>tr>td>input[name='archive']").val();
	$archiveDate = $("#ref_archive>form>table>tbody>tr>td>input[name='archivedate']").val();
	$archiveUrlEmpty  = 0;
	$archiveDateEmpty = 0;
	
	// 未入力の警告
	if(($urlEmpty   = $checkEmpty($url)) === 1) {
		$("#ref_archive>form>table>tbody>tr>td>span.address").text("※入力必須");
	}
	if(($titleEmpty = $checkEmpty($title)) === 1){
		$("#ref_archive>form>table>tbody>tr>td>span.title").text("※入力必須");
	}
	if(($archiveUrlEmpty = $checkEmpty($archiveUrl)) === 1){
		$("#ref_archive>form>table>tbody>tr>td>span.arcurl").text("※入力必須");
		$("#ref_archive>form>table>tbody>tr>td>span.arcdate").text("");
	}
	if($archiveUrl.indexOf("web.archive.org") != -1 && $archiveUrl.match(/\/web\/[0-9]+\.?[0-9]*/) == null) {
		$archiveUrlEmpty = 1;
		$("#ref_archive>form>table>tbody>tr>td>span.arcurl").text("※書式不備");
		$("#ref_archive>form>table>tbody>tr>td>span.arcdate").text("");
	}
	if($archiveUrl.indexOf("web.archive.org") == -1 && ($archiveDateEmpty = $checkEmpty($archiveDate)) === 1){
		$("#ref_archive>form>table>tbody>tr>td>span.arcurl").text("※入力必須");
		$("#ref_archive>form>table>tbody>tr>td>span.arcdate").text("※web.archive.org のとき以外は入力必須");
	}
	// 未入力時に処理を抜ける、未入力がなければ警告を消す
	if($urlEmpty === 1 || $titleEmpty === 1 || $archiveUrlEmpty === 1 || $archiveDateEmpty === 1){
		return;
	}
	else {
		$("#ref_archive>form>table>tbody>tr>td>span.address").text("※");
		$("#ref_archive>form>table>tbody>tr>td>span.title").text("※");
		$("#ref_archive>form>table>tbody>tr>td>span.arcurl").text("※");
		$("#ref_archive>form>table>tbody>tr>td>span.arcdate").text("");
	}
	
	// Internet Archive の場合は自動で日時を取得
	if($archiveUrl.indexOf("web.archive.org") != -1) {
		$archiveDate = $archiveUrl.match(/\/web\/[0-9]+\.?[0-9]*/g);
		$archiveDate = $archiveDate[0].slice(5,13);
		
		$archiveDate = insertStr($archiveDate, 4, "-");
		$archiveDate = insertStr($archiveDate, 7, "-");
	}
	// それ以外は任意で入力
	else {
		$archiveDate = $("#ref_archive>form>table>tbody>tr>td>input[name='archivedate']").val();
	}
	var $reftag = [
		"<ref>{{Cite web",
		"|url=" + $url,
		" |title=" + $title,
		" |publisher=" + $("#ref_archive>form>table>tbody>tr>td>input[name='publisher']").val(),
		" |archiveurl=" +  $archiveUrl,
		" |archivedate=" + $archiveDate,
		" |accessdate=" + $accessdate,
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}

// 書籍

// 日付入力の形式を直接入力とカレンダー入力で切り替え
function inputSelect($show,$hide,$active,$inactive) {
	$($hide).css('display', 'none');
	$($show).css('display', 'inline');
	$($active).css('background', '#ffc0c0');
	$($inactive).css('background', '#fff');

	if($show === "#directInput") {
		$(".directInputNote").css('display', 'inline');
	}
	else {
		$(".directInputNote").css('display', 'none');
	}
}

// ページ読み込み時に直接入力とカレンダー入力を表示/非表示
jQuery(document).ready(function($){
	$(".yearInput").css('display', 'none');
	$visible = $('input[name=yearInput]:checked').val();
	$($visible).css('display', 'inline');
	$visibleLabel = $visible.replace("Input", 'Label');
	$($visibleLabel).css('background', '#ffc0c0');

	if($visible === "#directInput") {
		$(".directInputNote").css('display', 'inline');
	}
	else {
		$(".directInputNote").css('display', 'none');
	}
});

// 日付の書式整形
function date_replace() {
	$str = $("#ref_book>form>table>tbody>tr>td>input[name='yearDirect']").val();
	$str = $str.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }).replace(/―|—|－|–|－|ー/g,'-').replace(/[^0-9\-]/g, '');
	$("#ref_book>form>table>tbody>tr>td>input[name='yearDirect']").val($str);
}

// ページの書式整形
function page_replace() {
	$str = $("#ref_book>form>table>tbody>tr>td>input[name='page']").val();
	$str = $str.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }).replace(/―|—|－|–|－|ー/g,'-').replace(/[^0-9\-]/g, '');
	$("#ref_book>form>table>tbody>tr>td>input[name='page']").val($str);
}

// ISBNの書式整形
function isbn_replace() {
	$str = $("#ref_book>form>table>tbody>tr>td>input[name='isbn']").val();
	$str = $str.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }).replace(/―|—|－|–|－|ー/g,'-').replace(/[^0-9\-]/g, '');
	$("#ref_book>form>table>tbody>tr>td>input[name='isbn']").val($str);
}

function ref_book() {
	// 必須入力項目の確認
	$title       = $("#ref_book>form>table>tbody>tr>td>input[name='title']").val();
	$publisher   = $("#ref_book>form>table>tbody>tr>td>input[name='publisher']").val();
	
	// 未入力の警告
	if(($titleEmpty   = $checkEmpty($title)) === 1) {
		$("#ref_book>form>table>tbody>tr>td>span.title").text("※入力必須");
	}
	if(($publisherEmpty = $checkEmpty($publisher)) === 1){
		$("#ref_book>form>table>tbody>tr>td>span.publisher").text("※入力必須");
	}
	// 未入力時に処理を抜ける、未入力がなければ警告を消す
	if($titleEmpty === 1 || $publisherEmpty === 1){
		return;
	}
	else {
		$("#ref_book>form>table>tbody>tr>td>span.title").text("※");
		$("#ref_book>form>table>tbody>tr>td>span.publisher").text("※");
	}
	
	// 選択されていた形式の入力フォームからのみ値を取得する
	if($('input[name=yearInput]:checked').val() === "#directInput") {
		$date = $("#ref_book>form>table>tbody>tr>td>input[name='yearDirect']").val();
	}
	else if($('input[name=yearInput]:checked').val() === "#calenderInput") {
		$date = $("#ref_book>form>table>tbody>tr>td>input[name='yearCalender']").val();
	}
	
	var $reftag = [
		"<ref>{{Cite book|和書|",
		"author=" + $("#ref_book>form>table>tbody>tr>td>input[name='author']").val(),
		" |title=" + $("#ref_book>form>table>tbody>tr>td>input[name='title']").val(),
		" |publisher=" + $("#ref_book>form>table>tbody>tr>td>input[name='publisher']").val(),
		" |date=" + $date,
		" |page=" + $("#ref_book>form>table>tbody>tr>td>input[name='page']").val(),
		" |isbn=" + $("#ref_book>form>table>tbody>tr>td>input[name='isbn']").val(),
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}

// 新聞
function ref_newspaper() {
	// 必須入力項目の確認
	$title       = $("#ref_newspaper>form>table>tbody>tr>td>input[name='title']").val();
	$publisher   = $("#ref_newspaper>form>table>tbody>tr>td>input[name='newspaper']").val();
	$date        = $("#ref_newspaper>form>table>tbody>tr>td>input[name='date']").val();
	
	// 未入力の警告
	if(($titleEmpty     = $checkEmpty($title)) === 1) {
		$("#ref_newspaper>form>table>tbody>tr>td>span.title").text("※入力必須");
	}
	if(($publisherEmpty = $checkEmpty($publisher)) === 1){
		$("#ref_newspaper>form>table>tbody>tr>td>span.news").text("※入力必須");
	}
	if(($dateEmpty      = $checkEmpty($date)) === 1){
		$("#ref_newspaper>form>table>tbody>tr>td>span.date").text("※入力必須");
	}
	// 未入力時に処理を抜ける、未入力がなければ警告を消す
	if($titleEmpty === 1 || $publisherEmpty === 1 || $dateEmpty === 1){
		return;
	}
	else {
		$("#ref_newspaper>form>table>tbody>tr>td>span.title").text("※");
		$("#ref_newspaper>form>table>tbody>tr>td>span.news").text("※");
		$("#ref_newspaper>form>table>tbody>tr>td>span.date").text("※");
	}
	
	// Web媒体と紙媒体で処理分け
	if($("#ref_newspaper>form>table>tbody>tr>td>input[name='url']").val() != "") {
		$news_source = " |url=" + $("#ref_newspaper>form>table>tbody>tr>td>input[name='url']").val() + " |accessdate=" + $accessdate;
	}
	else {
		$news_source = " |page=" + $("#ref_newspaper>form>table>tbody>tr>td>input[name='page']").val();
	}
	
	var $date = $("#ref_newspaper>form>table>tbody>tr>td>input[name='date']").val();
	if($date !== "") {
		$date = " |date=" + $date;
	}
	
	var $reftag = [
		"<ref>{{Cite news",
		"|title=" + $("#ref_newspaper>form>table>tbody>tr>td>input[name='title']").val(),
		" |newspaper=" + $("#ref_newspaper>form>table>tbody>tr>td>input[name='newspaper']").val(),
		$news_source,
		$date,
		" |author=" + $("#ref_newspaper>form>table>tbody>tr>td>input[name='author']").val(),
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}

// 論文
function ref_journal() {
	// 必須入力項目の確認
	$title       = $("#ref_journal>form>table>tbody>tr>td>input[name='journal']").val();
	
	// 未入力の警告
	if(($titleEmpty     = $checkEmpty($title)) === 1) {
		$("#ref_journal>form>table>tbody>tr>td>span.journal").text("※入力必須");
	}
	// 未入力時に処理を抜ける、未入力がなければ警告を消す
	if($titleEmpty === 1){
		return;
	}
	else {
		$("#ref_journal>form>table>tbody>tr>td>span.journal").text("※");
	}
	
	var $reftag = [
		"<ref>{{Cite journal|和書",
		"|journal=" + $("#ref_journal>form>table>tbody>tr>td>input[name='journal']").val(),
		" |title=" + $("#ref_journal>form>table>tbody>tr>td>input[name='title']").val(),
		" |volume=" + $("#ref_journal>form>table>tbody>tr>td>input[name='volume']").val(),
		" |issue=" + $("#ref_journal>form>table>tbody>tr>td>input[name='issue']").val(),
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}

// Twitter

// 「Twitter」の文字を押したときのみラジオボタンを表示させる隠しオプション
function enable_option() {
	$("#tweet").removeAttr("disabled");
	$("#tweet").removeClass("opiton_hide");
	$("#tweet").addClass("opiton_visivle");
	$("label[for='tweet']").removeClass("opiton_hide");
	$("label[for='tweet']").addClass("opiton_visivle");
}

// 未入力の警告は行わない
function ref_tweet() {
	var $tweet = $("#ref_tweet>form>table>tbody>tr>td>textarea[name='tweet']").val();
	$tweet = $tweet.replace(/\r?\n/g, '<br>');
	var $reftag = [
		"<ref>{{Cite tweet",
		"|author=" + $("#ref_tweet>form>table>tbody>tr>td>input[name='twitter_name']").val(),
		" |user=" + $("#ref_tweet>form>table>tbody>tr>td>input[name='twitter_id']").val(),
		" |number=" + $("#ref_tweet>form>table>tbody>tr>td>input[name='tweet_id']").val(),
		" |title=" + $tweet,
		" |accessdate=" + $accessdate,
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);

}