---
layout: page #xx_post
title: title_readme2
---

<script src="https://cdn.jsdelivr.net/npm/tify@0.27.0/dist/tify.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/list.js/2.3.1/list.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tify@0.27.0/dist/tify.css">

# Guro326.github.io
- チュートリアル
- すぐに公開された github pages のページ
- （README.md が表示される）

[Code4Lib JAPAN カンファレンス 2022 チュートリアル](https://github.com/nabeta/c4ljp2022-tutorial/wiki)

# おしらせ
## 今日のお知らせ
- 今日は9月3日です
- [横浜市電保存館の紹介](https://guro326.github.io/yokohama_shiden)

 
 [Google先生](https://www.google.co.jp/)
 
 https://www.google.co.jp/
 
 
 ## 新着図書情報
 
 <div id="books">
  <input class="search" placeholder="検索" />
  <button class="sort" data-sort="title">
    タイトルで並べ替え
  </button>
  <ul class="list">
    <!-- _data フォルダの books.csv からデータを取り出す -->
    {% for book in site.data.books %}
      <li>
        <!-- books.csv の title 列、 url 列をリンク先に設定 -->
        <p class="title"><a href="{{ book.url }}">{{ book.title }}</a> {{ book.title_yomi }}  {{ book.author }}</p>
      </li>
    {% endfor %}
  </ul>
</div>

---
 
<script>
var options = {
    valueNames: [ 'title' ]
};

var userList = new List('books', options);
</script>
