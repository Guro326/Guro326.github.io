
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="ref_tag.js"></script>


## ウィキペディア編集イベント向け | 出典タグを生成する


<div id="type">
<p>
<input type="radio" name="type" onClick="type_change('#ref_book')" id="book" value="#ref_book" checked><label for="book">書籍</label><br/>
	
<input type="radio" name="type" onClick="type_change('#ref_web')" id="web" value="#ref_web"><label for="web">Web出典</label><br/>
	
<input type="radio" name="type" onClick="type_change('#ref_archive')" id="archive" value="#ref_archive"><label for="archive">Archive(web.archive.org)を含める場合</label><br/>
	
<input type="radio" name="type" onClick="type_change('#ref_pdf')" id="pdf" value="#ref_pdf"><label for="pdf">PDF出典</label><br/>
	
<input type="radio" name="type" onClick="type_change('#ref_newspaper')" id="newspaper" value="#ref_newspaper"><label for="newspaper">新聞</label><br/>
	
<input type="radio" name="type" onClick="type_change('#ref_journal')" id="journal" value="#ref_journal"><label for="journal">学術雑誌の論文</label><br/>
	
<input type="radio" name="type" onClick="type_change('#ref_tweet')" id="tweet" value="#ref_tweet" class="opiton_hide" disabled><label for="tweet" class="opiton_hide">Twitter</label><br/>
	
</p>

なるべく欄は埋めましょう。特に、<span class="need">※</span>のある欄は必ず入力してください。

</div>

<div id="ref_book" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">書籍（Cite book| 和書）<br/>
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_book" target="_new">Cite book</a>&#x7d;&#x7d;</th>
</tr>
<tr>
    <td class="first_input">著者名 author</td>
    <td><input type="text" name="author"></td>
</tr>
<tr>
    <td>著者名リンク authorlink<br/>※著者名に[[リンク]]するときにはこちらに<u>も</u>記入</td>
    <td><input type="text" name="author_link" placeholder="[[]]は不要"></td>
</tr>
<tr>
    <td>編者 editor<br/></td>
    <td><input type="text" name="editor" placeholder="末尾に「編」「編集」はつけない。リンクは[[]]を用いる"></td>
</tr>
<tr>
    <td>『書名』 title</td>
    <td><input type="text" name="title"><span class="need title">※</span></td>
</tr>
<tr>
    <td>版 edition</td>
    <td><input type="text" name="edition" placeholder="初版、第2版など"></td>
</tr>
<tr>
    <td>「節・章」 chapter</td>
    <td><input type="text" name="chapter" placeholder="必要なければ空欄"></td>
</tr>
<tr>
    <td>発行者 publisher</td>
    <td><input type="text" name="publisher" placeholder="出版社名、団体名など"><span class="need publisher">※</span></td>
</tr>
<tr>
    <td>発行年月日 date
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
</tr>
<tr>
    <td>ページ番号 pages</td>
    <td><input type="text" name="page" onchange="page_replace()" placeholder="記入例：12、12-13"></td>
</tr>
<tr>
    <td>ISBN</td>
    <td><input type="text" name="isbn" placeholder="ハイフンは省略可" onchange="isbn_replace()"></td>
</tr>
<tr>
   <td colspan="2" class="button"><input type="button" value="入力完了" onClick="ref_book()"><input type="reset" value="入力内容を消す"></td>
</tr>
</table>
</form>
</div>


<div id="ref_web" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">Web出典（Cite web）<br/>
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_web" target="_new">Cite web</a>&#x7d;&#x7d;</th>
</tr>
<tr>
</tr>
<tr>
<td class="first_input">アドレス</td><td><input type="text" name="url"><span class="need address">※</span></td>
</tr>
<tr>
<td>タイトル</td><td><input type="text" name="title"><span class="need title">※</span></td>
</tr>
<tr>
<td>発行者</td><td><input type="text" name="publisher" placeholder="企業・団体名など"></td>
</tr>
<tr>
<td>日付</td><td><input type="date" name="date"></td>
</tr>
<tr>
<td colspan="2" class="button"><input type="button" value="入力完了" onClick="ref_web()"><input type="reset" value="入力内容を消す"></td>
</tr>
</table>
</form>
</div>


<div id="ref_archive" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">Web出典（Archiveを含める場合）<br/>
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_web#%E3%82%A2%E3%83%BC%E3%82%AB%E3%82%A4%E3%83%96%E3%81%95%E3%82%8C%E3%81%9F%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E5%A0%B4%E5%90%88" target="_new">Cite web</a>&#x7d;&#x7d;</th>
</tr>
<tr>
<td class="first_input">アドレス</td><td><input type="text" name="url"><span class="need address">※</span></td>
</tr>
<tr>
<td>タイトル</td><td><input type="text" name="title"><span class="need title">※</span></td>
</tr>
<tr>
<td>発行者</td><td><input type="text" name="publisher" placeholder="企業・団体名など"></td>
</tr>
<tr>
<td>アーカイブURL</td><td><input type="text" name="archive"><span class="need arcurl">※</span></td>
</tr>
<tr>
<td>アーカイブの日付</td><td><input type="date" name="archivedate"><span class="need arcdate"></span><br>（web.archive.org 以外は手入力が必要）</td>
</tr>
<tr>
<td colspan="2" class="button"><input type="button" value="入力完了" onClick="ref_archive()"><input type="reset" value="入力内容を消す"></td>
</tr>
</table>
</form>
</div>


<div id="ref_pdf" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">pdf出典（Cite web format=PDF）<br/>
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_web#PDF%E3%81%AE%E5%A0%B4%E5%90%88" target="_new">Cite web</a>&#x7d;&#x7d;</th>
</tr>
<tr>
</tr>
<tr>
<td class="first_input">アドレス</td><td><input type="text" name="url"><span class="need address">※</span></td>
</tr>
<tr>
<td>タイトル</td><td><input type="text" name="title"><span class="need title">※</span></td>
</tr>
<tr>
<td>発行者</td><td><input type="text" name="publisher" placeholder="企業・団体名など"></td>
</tr>
<tr>
<td>日付</td><td><input type="date" name="date"></td>
</tr>
<tr>
<td colspan="2" class="button"><input type="button" value="入力完了" onClick="ref_pdf()"><input type="reset" value="入力内容を消す"></td>
</tr>
</table>
</form>
</div>


<div id="ref_newspaper" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">新聞（Cite news |和書）<br/>
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_news" target="_new">Cite news</a>&#x7d;&#x7d;</th>
</tr>
<tr>
<td class="first_input">記事題名</td><td><input type="text" name="title"><span class="need title">※</span></td>
</tr>
<tr>
<td>新聞社名</td><td><input type="text" name="newspaper"><span class="need news">※</span></td>
</tr>
<tr>
<td>著者名</td><td><input type="text" name="author"></td>
</tr>
<tr>
<td>アドレス</td><td><input type="text" name="url" placeholder="ネット記事なら必須※"></td>
</tr>
<tr>
<td>日付</td><td><input type="date" name="date"><span class="need date">※</span></td>
</tr>
<tr>
<td>ページ番号</td><td><input type="text" name="page" placeholder="紙媒体の場合こちら"></td>
</tr>
<tr>
<td colspan="2" class="button"><input type="button" value="入力完了" onClick="ref_newspaper()"><input type="reset" value="入力内容を消す"></td>
</tr>
</table>
</form>
</div>



<div id="ref_journal" class="ref_type">
<form>
<table class="ref_input">
<tr>
<th colspan="2">学術雑誌の論文（Cite journal |和書）<br/>
	&#x7b;&#x7b;<a href="https://ja.wikipedia.org/wiki/Template:Cite_journal" target="_new">Cite journal</a>&#x7d;&#x7d;</th>
</tr>
<tr>
<td class="first_input">誌名</td><td><input type="text" name="journal"><span class="need journal">※</span></td>
</tr>
<tr>
<td>論文名</td><td><input type="text" name="title"></td>
</tr>
<tr>
<td>巻</td><td><input type="text" name="volume"></td>
</tr>
<tr>
<td>号</td><td><input type="text" name="issue"></td>
</tr>
<tr>
<td colspan="2" class="button"><input type="button" value="入力完了" onClick="ref_journal()"><input type="reset" value="入力内容を消す"></td>
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
<textarea cols="50" rows="5" id="result" onfocus="this.select()"></textarea>
</p>

初版を作った人 special thanks to：[利用者:Marine-Blue](https://ja.wikipedia.org/wiki/%E5%88%A9%E7%94%A8%E8%80%85:Marine-Blue)

[original site](http://mb1223jawp.php.xdomain.jp/wptown/reference.html)

作った人 : [利用者:Latenscurtis](https://ja.wikipedia.org/wiki/%E5%88%A9%E7%94%A8%E8%80%85:Latenscurtis)
