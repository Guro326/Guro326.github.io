---
layout: page2
title: ウィキペディア編集イベント向け | 出典タグを生成する
---

# ウィキペディア編集イベント向け | 出典タグを生成する
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="ref_tag.js"></script>
<style type="text/css">
.book_date {
	height: 50px;
}

#direct,#calender {
	display: none;
}

label {
	cursor: pointer;
}

.ref_input {
	width: 700px;
	vertical-align: top;
}

.ref_type {
	##height: 550px;
	margin-top: 2em;
	margin-bottom: 2em;
}

.first_input {
	width: 15em;
}

.need {
	color: #F00;
	font-size: 90%;
	font-weight: bold;
	padding-left: 0.2em;
}

.np_yy {
	width: 4em;
	text-align: right;
}

.np_mmdd {
	width: 2.5em;
	text-align: right;
}

.button {
	text-align: center;
}

.opiton_hide {
	visibility: hidden;
}

.option_visible {
	visibility: visible;
}

input[type="text"]
:not(#voliss) {
	width: 15em;
}

.voliss {
	size: 2em;
	width: 2em;
	text-align: right;
}

</style>


[https://guro326.github.io/wikiref](https://guro326.github.io/wikiref))


<div id="type">
<p>
<input type="radio" name="type" onclick="type_change('#ref_book')" id="book" value="#ref_book" checked="" /><label for="book">書籍</label><br />
	
<input type="radio" name="type" onclick="type_change('#ref_magazine')" id="magazine" value="#ref_magazine" /><label for="magazine">雑誌の記事</label><br />
	
<input type="radio" name="type" onclick="type_change('#ref_journal')" id="journal" value="#ref_journal" /><label for="journal">学術雑誌の論文</label><br />
	
<input type="radio" name="type" onclick="type_change('#ref_web')" id="web" value="#ref_web" /><label for="web">Web出典</label><br />
	
<input type="radio" name="type" onclick="type_change('#ref_archive')" id="archive" value="#ref_archive" /><label for="archive">Archive(web.archive.org)を含める場合</label><br />
	
<input type="radio" name="type" onclick="type_change('#ref_pdf')" id="pdf" value="#ref_pdf" /><label for="pdf">PDF出典</label><br />
	
<input type="radio" name="type" onclick="type_change('#ref_newspaper')" id="newspaper" value="#ref_newspaper" /><label for="newspaper">新聞・ニュースサイト</label><br />
	
<input type="radio" name="type" onclick="type_change('#ref_tweet')" id="tweet" value="#ref_tweet" class="opiton_hide" disabled="" /><label for="tweet" class="opiton_hide">Twitter</label><br />

	
</p>

<span class="need">※</span>のある欄は必ず入力してください。

</div>

<div id="ref_book" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">書籍（Cite book| 和書）<br />
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_book" target="_new">Cite book</a>&#x7d;&#x7d;</th>
</tr>
<tr>
    <td class="first_input">著者名 author</td>
    <td><input type="text" name="author" /></td>
</tr>
<tr>
    <td>著者名リンク authorlink</td>
    <td><input type="text" name="author_link" placeholder="[[]]は不要" /><br />著者名に[[リンク]]するときにはこちらに<u>も</u>記入</td>
</tr>
<tr>
    <td>編者 editor<br /></td>
    <td><input type="text" name="editor" placeholder="｢編｣｢編集｣は不要 リンクは[[]]で" /></td>
</tr>
<tr>
    <td>『書名』 title</td>
    <td><input type="text" name="title" /><span class="need title">※</span></td>
</tr>
<tr>
    <td>（版） edition</td>
    <td><input type="text" name="edition" placeholder="初版、第2版など" /></td>
</tr>
<tr>
    <td>〈シリーズ〉 series</td>
    <td><input type="text" name="series" placeholder="○○新書なども" /></td>
</tr>
<!--tr>
    <td>巻 volume</td>
    <td><input type="text" name="volume" placeholder="1、下、など。文庫や新書はその番号。" /></td>
</tr-->
<tr>
    <td>出版者 publisher</td>
    <td><input type="text" name="publisher" placeholder="出版社名、団体名など" /><span class="need publisher">※</span></td>
</tr>
<!--tr>
    <td>発行年月日
    <input type="radio" name="yearInput" value="#directInput" id="direct" onclick="inputSelect('#directInput','#calenderInput','#directLabel','#calenderLabel')" class="yy_direct" checked="checked">
    <label for="direct" id="directLabel">日付を直接入力</label>
    </td>
    <td>
    <input type="radio" name="yearInput" value="#calenderInput" id="calender" onclick="inputSelect('#calenderInput','#directInput','#calenderLabel','#directLabel')" class="yy_calender">
    <label for="calender" id="calenderLabel">日付をカレンダーから入力</label>
    （どちらか選択）
    </td>
</tr>
<tr>
    <td class="book_date">&nbsp;</td>
    <td><input type="text" name="yearDirect" id="directInput" class="yearInput" onchange="date_replace()" placeholder="半角でyyyy-mm-dd"><span class="directInputNote">（月日は省略可）</span><input type="date" name="yearCalender" id="calenderInput" class="yearInput"></td>
</tr-->
<tr>
    <td>出版日付 date</td>
    <td><input type="text" name="yearDirect" onchange="date_replace()" placeholder="半角でYYYY-MM-DD"><br /><span class="directInputNote">（月･日は省略可）</span></td>
</tr>
<tr>
    <td>ページ番号 page(s)</td>
    <td><input type="text" name="pages" onchange="page_replace()" placeholder="記入例：12、12-13" /></td>
</tr>
<tr>
    <td>ISBN</td>
    <td><input type="text" name="isbn" placeholder="ハイフンは省略可" onchange="isbn_replace()" /></td>
</tr>
<tr>
    <td colspan="2">ISBNがない書籍は以下のいずれかを入力するとよい</td>
</tr>
<tr>
    <td>&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:NCID" target="_new">NCID</a>&#x7d;&#x7d;<br />
    <a href="https://ci.nii.ac.jp/books/" target="_new">CiNii</a>の書誌情報の番号</td>
    <td><input type="text" name="ncid" placeholder="例 BB28228345" /></td>
</tr>
<tr>
    <td>&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:%E5%85%A8%E5%9B%BD%E6%9B%B8%E8%AA%8C%E7%95%AA%E5%8F%B7" target="_new">全国書誌番号</a>&#x7d;&#x7d;<br />
    <a href="https://iss.ndl.go.jp/" target="_new">国立国会図書館サーチ</a>の全国書誌番号（JP番号）</td>
    <td><input type="text" name="jpno" placeholder="例 23539726" /></td>
</tr>
<tr>
    <td>&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:%E8%BF%91%E4%BB%A3%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%83%BC" target="_new">NDLJP</a>&#x7d;&#x7d;<br />
    <a href="https://dl.ndl.go.jp/" target="_new">国立国会図書館デジタルコレクション</a>URLに表記されている識別子/コマ番号</td>
    <td><input type="text" name="ndljp" placeholder="例 888725/3" /></td>
</tr>
<tr>
    <td colspan="2"></td>
</tr>
<tr>
    <td>ref</td>
    <td><input type="text" name="ref" placeholder="" /></td>
</tr>
<tr>
   <td colspan="2" class="button"><input type="button" value="入力完了" onclick="ref_book()" /><input type="reset" value="入力内容を消す" /></td>
</tr>
</table>
</form>
</div>




<div id="ref_web" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">Web出典（Cite web）<br />
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_web" target="_new">Cite web</a>&#x7d;&#x7d;</th>
</tr>
<tr>
</tr>
<tr>
    <td class="first_input">アドレス url</td>
    <td><input type="text" name="url" /><span class="need address">※</span></td>
</tr>
<tr>
    <td>タイトル title</td>
    <td><input type="text" name="title" /><span class="need title">※</span></td>
</tr>
<tr>
    <td>発行者 publisher</td>
    <td><input type="text" name="publisher" placeholder="企業・団体名など" /></td>
</tr>
<tr>
    <td>発行日付 date</td>
    <td><input type="date" name="date" /></td>
</tr>
<tr>
    <td>閲覧日 access-date</td>
    <td>（自動セット）</td>
</tr>
<tr>
    <td>ref</td>
    <td><input type="text" name="ref" placeholder="" /></td>
</tr>
<tr>
<td colspan="2" class="button"><input type="button" value="入力完了" onclick="ref_web()" /><input type="reset" value="入力内容を消す" /></td>
</tr>
</table>
</form>
</div>




<div id="ref_archive" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">Web出典（Archiveを含める場合）<br />
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_web#%E3%82%A2%E3%83%BC%E3%82%AB%E3%82%A4%E3%83%96%E3%81%95%E3%82%8C%E3%81%9F%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E5%A0%B4%E5%90%88" target="_new">Cite web</a>&#x7d;&#x7d;</th>
</tr>
<tr>
    <td class="first_input">アドレス url</td>
    <td><input type="text" name="url" /><span class="need address">※</span></td>
</tr>
<tr>
    <td>タイトル title</td>
    <td><input type="text" name="title" /><span class="need title">※</span></td>
</tr>
<tr>
    <td>発行者 publisher</td>
    <td><input type="text" name="publisher" placeholder="企業・団体名など" /></td>
</tr>
<tr>
    <td>アーカイブURL archiveurl</td>
    <td><input type="text" name="archive" /><span class="need arcurl">※</span></td>
</tr>
<tr>
    <td>アーカイブの日付 archivedate</td>
    <td><input type="date" name="archivedate" /><span class="need arcdate"></span><br />（web.archive.org 以外は手入力が必要）</td>
</tr>
<tr>
    <td>ref</td>
    <td><input type="text" name="ref" placeholder="" /></td>
</tr>
<tr>
    <td colspan="2" class="button"><input type="button" value="入力完了" onclick="ref_archive()" /><input type="reset" value="入力内容を消す" /></td>
</tr>
</table>
</form>
</div>




<div id="ref_pdf" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">pdf出典（Cite web format=PDF）<br />
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_web#PDF%E3%81%AE%E5%A0%B4%E5%90%88" target="_new">Cite web</a>&#x7d;&#x7d;</th>
</tr>
<tr>
</tr>
<tr>
    <td class="first_input">アドレス url</td>
    <td><input type="text" name="url" /><span class="need address">※</span></td>
</tr>
<tr>
    <td>タイトル title</td>
    <td><input type="text" name="title" /><span class="need title">※</span></td>
</tr>
<tr>
    <td>発行者 publisher</td>
    <td><input type="text" name="publisher" placeholder="企業・団体名など" /></td>
</tr>
<tr>
    <td>日付 date</td>
    <td><input type="date" name="date" /></td>
</tr>
<tr>
    <td colspan="2" class="button"><input type="button" value="入力完了" onclick="ref_pdf()" /><input type="reset" value="入力内容を消す" /></td>
</tr>
</table>
</form>
</div>



<div id="ref_newspaper" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">新聞・ニュースサイト（Cite news |和書）<br />
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_news" target="_new">Cite news</a>&#x7d;&#x7d;</th>
</tr>
<tr>
    <td class="first_input">記事の見出し title</td>
    <td><input type="text" name="title" /><span class="need title">※</span></td>
</tr>
<tr>
    <td>新聞社名 newspaper</td>
    <td><input type="text" name="newspaper" /><span class="need news">※</span></td>
</tr>
<tr>
    <td>記事の日付 date</td>
    <td><input type="date" name="date" /><span class="need date">※</span></td>
</tr>
<tr>
    <td>面(ページ番号) page(s)</td>
    <td><input type="text" name="pages" placeholder="紙媒体の場合こちら" /></td>
</tr>
<tr>
    <td>アドレス url</td>
    <td><input type="text" name="url" placeholder="ネット記事なら必須※" /></td>
</tr>
<tr>
    <td>閲覧日 access-date</td>
    <td>（自動セット）</td>
</tr>
<tr>
    <td>アーカイブURL archive-url</td>
    <td><input type="text" name="archiveurl" /></td>
</tr>
<tr>
    <td>アーカイブの日付 archive-date</td>
    <td><input type="date" name="archivedate" /><br />（web.archive.org 以外は手入力が必要）</td>
</tr>
<tr>
    <td>ref</td>
    <td><input type="text" name="ref" placeholder="" /></td>
</tr>
<tr>
    <td colspan="2" class="button"><input type="button" value="入力完了" onclick="ref_newspaper()" /><input type="reset" value="入力内容を消す" /></td>
</tr>
</table>
</form>
</div>



<div id="ref_magazine" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">雑誌の記事（Cite journal |和書）<br />
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_journal" target="_new">Cite journal</a>&#x7d;&#x7d;</th>
</tr>
<tr>
    <td>記事の著者 author</td>
    <td><input type="text" name="author" /></td>
</tr>
<tr>
    <td>「記事のタイトル」 title</td>
    <td><input type="text" name="title" /><span class="need title">※</span></td>
</tr>
<tr>
    <td class="first_input">『雑誌名』 journal</td>
    <td><input type="text" name="journal" /><span class="need journal">※</span></td>
</tr>
<tr>
    <td>出版社 publisher</td>
    <td><input type="text" name="publisher" /></td>
</tr>
<tr>
    <td>雑誌の発行年月日 date</td>
    <td><input type="text" name="date" onchange="mag_date_replace()" placeholder="半角でYYYY-MM-DD"><br /><span>（月･日は省略可）</span></td>
</tr>
<tr>
    <td>巻号 volume issue</td>
    <td>第<input type="text" name="volume" size="2em" id="voliss" />巻 第<input type="text" name="issue" size="2em" id="voliss" />号</td>
</tr>
<tr>
    <td>通巻 number</td>
    <td><input type="text" name="number" /></td>
</tr>
<tr>
    <td>ページ番号 page(s)</td>
    <td><input type="text" name="pages" onchange="mag_page_replace()" placeholder="記入例：12、12-13" /></td>
</tr>
<tr>
    <td><a href="https://ja.wikipedia.org/wiki/Template:ISSN" target="_new">ISSN</a></td>
    <td><input type="text" name="issn" placeholder="例 1881-7661" /></td>
</tr>
<tr>
    <td>&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:CRID" target="_new">CRID</a>&#x7d;&#x7d;<br />
    <a href="https://cir.nii.ac.jp/articles/" target="_new">CiNii Research</a>のCRID</td>
    <td><input type="text" name="crid" placeholder="例 1050010920565717888" /></td></tr>
<tr>
    <td>&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:OYALIB" target="_new">OYALIB</a>&#x7d;&#x7d;<br />
    <a href="https://oya-bunko.opac.jp/opac/Advanced_search" target="_new">大宅壮一文庫 蔵書検索</a>結果の登録番号のID</td>
    <td><input type="text" name="oyalib" placeholder="例 100069321" /></td>
</tr>
<tr>
<td colspan="2" ></td>
</tr>
<tr>
    <td>ref</td>
    <td><input type="text" name="ref" placeholder="" /></td>
</tr>
<tr>
<td colspan="2" class="button"><input type="button" value="入力完了" onclick="ref_magazine()" /><input type="reset" value="入力内容を消す" /></td>
</tr>
</table>
</form>
</div>




<div id="ref_journal" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">学術雑誌の論文（Cite journal |和書）<br />
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_journal" target="_new">Cite journal</a>&#x7d;&#x7d;</th>
</tr>
<tr>
    <td>著者 author</td>
    <td><input type="text" name="author" /></td>
</tr>
<tr>
    <td class="first_input">『誌名』 journal</td>
    <td><input type="text" name="journal" /><span class="need journal">※</span></td>
</tr>
<tr>
    <td>「論文名」 title</td>
    <td><input type="text" name="title" /></td>
</tr>
<tr>
    <td>論文リンク url</td>
    <td><input type="text" name="url" /></td>
</tr>
<tr>
    <td>刊行年月日 date</td>
    <td><input type="text" name="date" placeholder="半角でYYYY-MM-DD"><br /><span>（月･日は省略可）</span></td>
</tr>
<tr>
    <td>巻号 volume issue</td>
    <td>第<input type="text" name="volume" size="2em" id="voliss" />巻 第<input type="text" name="issue" size="2em" id="voliss" />号</td>
</tr>
<tr>
    <td>ページ番号 page(s)</td>
    <td><input type="text" name="pages" placeholder="記入例：12、12-13" /></td>
</tr>
<tr>
    <td>発行元 publisher</td>
    <td><input type="text" name="publisher" placeholder="学会名・団体名など" /></td>
</tr>
<tr>
    <td>doi</td>
    <td><input type="text" name="doi" placeholder="10.24506/jsda.5.s1_s122f" /></td>
</tr>
<tr>
    <td>&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:CRID" target="_new">CRID</a>&#x7d;&#x7d;<br />
    <a href="https://cir.nii.ac.jp/articles/" target="_new">CiNii Research</a>のCRID</td>
    <td><input type="text" name="crid" placeholder="例 1050010920565717888" /></td></tr>
<tr>
    <td colspan="2"></td>
</tr>
<tr>
    <td>ref</td>
    <td><input type="text" name="ref" placeholder="" /></td>
</tr>
<tr>
    <td colspan="2" class="button"><input type="button" value="入力完了" onclick="ref_journal()" /><input type="reset" value="入力内容を消す" /></td>
</tr>
</table>
</form>
</div>



<div id="ref_tweet" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">Twitter</th>
</tr>
<tr>
<td class="first_input">表示名</td><td><input type="text" name="twitter_name"></td>
</tr>
<tr>
<td>TwitterのID</td><td>@ <input type="text" name="twitter_id"></td>
</tr>
<tr>
<td>ツイートID</td><td><input type="text" name="tweet_id"></td>
</tr>
<tr>
<td>本文</td><td><textarea cols="50" rows="3" name="tweet"></textarea></td>
</tr>
<tr>
<td colspan="2" class="button"><span class="need">※</span>全部入力推奨<br><input type="button" value="入力完了" onClick="ref_tweet()"><input type="reset" value="入力内容を消す"></td>
</tr>
</table>
</form>
</div>

<p>
<textarea cols="70" rows="6" id="result" onfocus="this.select()"></textarea>
</p>

初版を作った人 special thanks to：[利用者:Marine-Blue](https://ja.wikipedia.org/wiki/%E5%88%A9%E7%94%A8%E8%80%85:Marine-Blue)　[original site](http://mb1223jawp.php.xdomain.jp/wptown/reference.html)

作った人 : [利用者:Latenscurtis](https://ja.wikipedia.org/wiki/%E5%88%A9%E7%94%A8%E8%80%85:Latenscurtis) 2022/09/24
