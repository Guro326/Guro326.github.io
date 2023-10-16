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

// 2022-09-23 @Guro326
//            適宜カスタマイズ
//            書籍 日付入力のカレンダーはやめる
//            journal でも、学術論文と一般雑誌にわける

// 2023-07-21 @Guro326
//            リセットボタンで出力textareaもクリアする
//            書籍bookの「巻」を復活
//            新聞に和書を追加・webでもpagesを入れる（紙と共に）・版もついか

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

// フォームのリセット、とともに、テキストエリアのクリア
function reset_form() {
          //  $("#DemoForm").trigger("reset");
	document.forms[0].reset();
	$('#result').val('');
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
	else if($field === undefined) {
		$check = 1;
	}
	else {
		$check = 0;
	}
	return $check;
}


// 項目の空白判定と、タグ化
// 入力した場合のみタグをおこす
function $tagged($tagname, $fieldvalue) {
	if($fieldvalue === undefined) {
		return "";
	}
	else if($fieldvalue === "") {
		return "";
	}
	else {
		return " |" + $tagname + "=" + $fieldvalue;
	}
}


// 入力した場合のみ page タグをおこす
// 「-」と「,」があるときだけ、pages にするか
function $pagestag($fieldvalue) {
	if($fieldvalue === undefined) {
		return "";
	}
	else if($fieldvalue === "") {
		return "";
	}
	else if ($fieldvalue.match(/[\-,]/g) == null) {
		return " |page=" + $fieldvalue;
	}
	else  {
		return " |pages=" + $fieldvalue;
	}
}




// ■■ Web出典 ■■
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
		"<ref>{{Cite web|和書",
		"|url=" + $url,
		" |title=" + $title,
		" |publisher =" + $("#ref_web>form>table>tbody>tr>td>input[name='publisher']").val(),
		$date,
		" |accessdate=" + $accessdate,
	$tagged("ref",        $("#ref_web>form>table>tbody>tr>td>input[name='ref']").val()),
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}



// ■■ PDF出典 ■■
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
		"<ref>{{Cite web|和書",
		"|url="    + $("#ref_pdf>form>table>tbody>tr>td>input[name='url']").val(),
		" |title=" + $("#ref_pdf>form>table>tbody>tr>td>input[name='title']").val(),
		" |format=PDF",
		" |publisher =" + $("#ref_pdf>form>table>tbody>tr>td>input[name='publisher']").val(),
		$date,
		" |accessdate=" + $accessdate,
	$tagged("ref",        $("#ref_pdf>form>table>tbody>tr>td>input[name='ref']").val()),
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}




// ■■ アーカイブ ■■
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
		"<ref>{{Cite web|和書",
		"|url=" + $url,
		" |title=" + $title,
		" |publisher=" + $("#ref_archive>form>table>tbody>tr>td>input[name='publisher']").val(),
		" |archiveurl=" +  $archiveUrl,
		" |archivedate=" + $archiveDate,
		" |accessdate=" + $accessdate,
	$tagged("ref",       $("#ref_archive>form>table>tbody>tr>td>input[name='ref']").val()),
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}




// ■■ 書籍 ■■
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
	$str = $("#ref_book>form>table>tbody>tr>td>input[name='pages']").val();
	$str = $str.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }).replace(/―|—|－|–|－|ー/g,'-').replace(/[^0-9\-]/g, '');
	$("#ref_book>form>table>tbody>tr>td>input[name='pages']").val($str);
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
	
	/* 選択されていた形式の入力フォームからのみ値を取得する
	if($('input[name=yearInput]:checked').val() === "#directInput") {
		$date = $("#ref_book>form>table>tbody>tr>td>input[name='yearDirect']").val();
	}
	else if($('input[name=yearInput]:checked').val() === "#calenderInput") {
		$date = $("#ref_book>form>table>tbody>tr>td>input[name='yearCalender']").val();
	}
	*/
	var $date = $("#ref_book>form>table>tbody>tr>td>input[name='yearDirect']").val();
	if ($date.length === 4) {
		$date = " |year=" + $date;
	} else {
		$date = " |date=" + $date;
	}
	
	var $jpno  = $("#ref_book>form>table>tbody>tr>td>input[name='jpno']").val();
	if($checkEmpty($jpno) === 1) {
		$jpno = "";
	} else {
		$jpno = "{{全国書誌番号|" + $jpno + "}} ";
	}
	var $ndljp = $("#ref_book>form>table>tbody>tr>td>input[name='ndljp']").val();
	if($checkEmpty($ndljp) === 1) {
		$ndljp = "";
	} else {
		$ndljp = "{{NDLJP|" + $ndljp + "}} ";
	}
	var $idtag = "";
	if($checkEmpty($jpno) === 0 || $checkEmpty($ndljp) === 0){
		$idtag = " |ID=" + $jpno + $ndljp;
	}
	
	var $reftag = [
		"<ref>{{Cite book|和書|",
		"author=" + $("#ref_book>form>table>tbody>tr>td>input[name='author']").val(),
	$tagged("authorlink",  $("#ref_book>form>table>tbody>tr>td>input[name='author_link']").val()),
	$tagged("editor",  $("#ref_book>form>table>tbody>tr>td>input[name='editor']").val()),
		" |title=" +   $("#ref_book>form>table>tbody>tr>td>input[name='title']").val(),
	$tagged("edition", $("#ref_book>form>table>tbody>tr>td>input[name='edition']").val()),
	$tagged("series",  $("#ref_book>form>table>tbody>tr>td>input[name='series']").val()),
	$tagged("volume",  $("#ref_book>form>table>tbody>tr>td>input[name='volume']").val()),
		           $date,
		" |publisher=" + $("#ref_book>form>table>tbody>tr>td>input[name='publisher']").val(),
	$pagestag(          $("#ref_book>form>table>tbody>tr>td>input[name='pages']").val()),
		" |isbn=" +    $("#ref_book>form>table>tbody>tr>td>input[name='isbn']").val(),
	$tagged("NCID",    $("#ref_book>form>table>tbody>tr>td>input[name='ncid']").val()),
		$idtag,
	$tagged("ref",     $("#ref_book>form>table>tbody>tr>td>input[name='ref']").val()),
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}




// ■■ 新聞・ニュースサイト ■■
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

	var $news_source = "";
	
	//Web媒体で入力された場合にのみ、アーカイブを記載
	$archiveUrl  = $("#ref_newspaper>form>table>tbody>tr>td>input[name='archiveurl']").val();
	$archiveDate = $("#ref＿newspaper>form>table>tbody>tr>td>input[name='archivedate']").val();
	
	if($checkEmpty($archiveUrl) === 0){
		// Internet Archive の場合は自動で日時を取得
		if($archiveUrl.indexOf("web.archive.org") != -1) {
			$archiveDate = $archiveUrl.match(/\/web\/[0-9]+\.?[0-9]*/g);
			$archiveDate = $archiveDate[0].slice(5,13);
			
			$archiveDate = insertStr($archiveDate, 4, "-");
			$archiveDate = insertStr($archiveDate, 7, "-");
		}
		// それ以外は任意で入力
		else {
			$archiveDate = $("#ref_newspaper>form>table>tbody>tr>td>input[name='archivedate']").val();
		}
		
		$news_source = " |archive-url=" + $archiveUrl +
		               " |archive-date=" + $archiveDate;
	}
	
	
	// Web媒体と紙媒体で処理分け
	if($("#ref_newspaper>form>table>tbody>tr>td>input[name='url']").val() != "") {
		$news_source = " |url=" + $("#ref_newspaper>form>table>tbody>tr>td>input[name='url']").val() +
		               " |accessdate=" + $accessdate + 
		               $news_source;
	}
	//else {
	//	$news_source = $pagestag( $("#ref_newspaper>form>table>tbody>tr>td>input[name='pages']").val() );
	//}
	$news_source = $pagestag( $("#ref_newspaper>form>table>tbody>tr>td>input[name='pages']").val() ) +
			$news_source;
	
	var $date = $("#ref_newspaper>form>table>tbody>tr>td>input[name='date']").val();
	if($date !== "") {
		$date = " |date=" + $date;
	}
	
	var $reftag = [
		"<ref>{{Cite news|和書|",
		"title=" +      $("#ref_newspaper>form>table>tbody>tr>td>input[name='title']").val(),
		" |newspaper=" + $("#ref_newspaper>form>table>tbody>tr>td>input[name='newspaper']").val(),
	$tagged("author",    $("#ref_newspaper>form>table>tbody>tr>td>input[name='author']").val()),
		$date,
	$tagged("edition",   $("#ref_newspaper>form>table>tbody>tr>td>input[name='edition']").val()),
		$news_source,
	$tagged("ref",       $("#ref_newspaper>form>table>tbody>tr>td>input[name='ref']").val()),
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}




// ■■ 学術雑誌の論文 ■■
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
	
	$url = $("#ref_journal>form>table>tbody>tr>td>input[name='url']").val();
	if($checkEmpty($url) === 1) {
		$url = "";
	}
	else if ($url.match(/\.pdf[ ]*$/ig) == null) {
		$url = " |url=" + $url;
	}
	else {
		$url = " |url=" + $url + " |format=PDF";
	}	
	
	var $crid  = $("#ref_journal>form>table>tbody>tr>td>input[name='crid']").val();
	if($checkEmpty($crid) === 1) {
		$crid = "";
	} else {
		$crid = "{{CRID|" + $crid + "}} ";
	}
	var $ndljp = $("#ref_journal>form>table>tbody>tr>td>input[name='ndljp']").val();
	if($checkEmpty($ndljp) === 1) {
		$ndljp = "";
	} else {
		$ndljp = "{{NDLJP|" + $ndljp + "}} ";
	}
	var $idtag = "";
	if($checkEmpty($crid) === 0 || $checkEmpty($ndljp) === 0){
		$idtag = " |ID=" + $crid + $ndljp;
	}
	
	var $reftag = [
		"<ref>{{Cite journal|和書|",
		"journal="  +   $("#ref_journal>form>table>tbody>tr>td>input[name='journal']").val(),
	$tagged("author",    $("#ref_journal>form>table>tbody>tr>td>input[name='author']").val()),
	$tagged("title",     $("#ref_journal>form>table>tbody>tr>td>input[name='title']").val()),
	$tagged("date",      $("#ref_journal>form>table>tbody>tr>td>input[name='date']").val()),
	$tagged("volume",    $("#ref_journal>form>table>tbody>tr>td>input[name='volume']").val()),
	$tagged("issue",     $("#ref_journal>form>table>tbody>tr>td>input[name='issue']").val()),
	$tagged("number",    $("#ref_journal>form>table>tbody>tr>td>input[name='number']").val()),
	$tagged("publisher", $("#ref_journal>form>table>tbody>tr>td>input[name='publisher']").val()),
	$pagestag(           $("#ref_journal>form>table>tbody>tr>td>input[name='pages']").val()),
		$url,
	$tagged("doi",       $("#ref_journal>form>table>tbody>tr>td>input[name='doi']").val()),
		$idtag,
	$tagged("ref",       $("#ref_journal>form>table>tbody>tr>td>input[name='ref']").val()),
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);
}


// ■■ 雑誌の記事 ■■

// 日付の書式整形
function mag_date_replace() {
	$str = $("#ref_magazine>form>table>tbody>tr>td>input[name='date']").val();
	$str = $str.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }).replace(/―|—|－|–|－|ー/g,'-').replace(/[^0-9\-]/g, '');
	$("#ref_magazine>form>table>tbody>tr>td>input[name='date']").val($str);
}

// ページの書式整形
function mag_page_replace() {
	$str = $("#ref_magazine>form>table>tbody>tr>td>input[name='pages']").val();
	$str = $str.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }).replace(/―|—|－|–|－|ー/g,'-').replace(/[^0-9\-]/g, '');
	$("#ref_magazine>form>table>tbody>tr>td>input[name='pages']").val($str);
}

function ref_magazine() {
	// 必須入力項目の確認
	$title       = $("#ref_magazine>form>table>tbody>tr>td>input[name='title']").val();
	$journal     = $("#ref_magazine>form>table>tbody>tr>td>input[name='journal']").val();
	
	// 未入力の警告
	if(($titleEmpty     = $checkEmpty($title)) === 1) {
		$("#ref_magazine>form>table>tbody>tr>td>span.title").text("※入力必須");
	}
	if(($journalEmpty = $checkEmpty($journal)) === 1){
		$("#ref_magazine>form>table>tbody>tr>td>span.journal").text("※入力必須");
	}
	
	// 未入力時に処理を抜ける、未入力がなければ警告を消す
	if($titleEmpty === 1 || $journalEmpty === 1){
		return;
	}
	else {
		$("#ref_magazine>form>table>tbody>tr>td>span.title").text("※");
		$("#ref_magazine>form>table>tbody>tr>td>span.journal").text("※");
	}
	
	// 日付パラメータがなければ省略
	var $date = $("#ref_magazine>form>table>tbody>tr>td>input[name='date']").val();
	if($date !== "") {
		$date = " |date=" + $date;
	}
	
	var $crid  = $("#ref_magazine>form>table>tbody>tr>td>input[name='crid']").val();
	if($checkEmpty($crid) === 0) {
		$crid = "{{CRID|" + $crid + "}} ";
	}
	var $oyalib = $("#ref_magazine>form>table>tbody>tr>td>input[name='oyalib']").val();
	if($checkEmpty($oyalib) === 0) {
		$oyalib = "{{OYALIB|" + $oyalib + "}} ";
	}
	var $idtag = "";
	if($checkEmpty($crid) === 0 || $checkEmpty($oyalib) === 0){
		$idtag = " |ID=" + $crid + $oyalib;
	}
	
	var $reftag = [
		"<ref>{{Cite journal|和書",
	$tagged("author",  $("#ref_magazine>form>table>tbody>tr>td>input[name='author']").val()),
		" |title="  +  $("#ref_magazine>form>table>tbody>tr>td>input[name='title']").val(),
		" |journal=" + $("#ref_magazine>form>table>tbody>tr>td>input[name='journal']").val(),
	$tagged("volume" , $("#ref_magazine>form>table>tbody>tr>td>input[name='volume']").val()),
	$tagged("issue"  , $("#ref_magazine>form>table>tbody>tr>td>input[name='issue']").val()),
	$tagged("number",  $("#ref_magazine>form>table>tbody>tr>td>input[name='number']").val()),
	$tagged("publisher", $("#ref_magazine>form>table>tbody>tr>td>input[name='publisher']").val()),
		$date,
	$pagestag(         $("#ref_magazine>form>table>tbody>tr>td>input[name='pages']").val()),
	$tagged("issn",    $("#ref_magazine>form>table>tbody>tr>td>input[name='issn']").val()),
		$idtag,
	$tagged("ref",     $("#ref_magazine>form>table>tbody>tr>td>input[name='ref']").val()),
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
		"<ref>{{Cite tweet|和書",
		"|author=" + $("#ref_tweet>form>table>tbody>tr>td>input[name='twitter_name']").val(),
		" |user=" + $("#ref_tweet>form>table>tbody>tr>td>input[name='twitter_id']").val(),
		" |number=" + $("#ref_tweet>form>table>tbody>tr>td>input[name='tweet_id']").val(),
		" |title=" + $tweet,
		" |accessdate=" + $accessdate,
		"}}</ref>"
	].join("");
	
	$("#result").val($reftag);

}
