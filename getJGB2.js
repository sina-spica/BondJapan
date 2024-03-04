function getJGB2() {
    
    //現在の日時を取得
    let now = new Date();
    let hours = now.getHours();
    Logger.log(hours)
  
  
    //---------------
    // URLを定義
    var url = "https://www.mof.go.jp/jgbs/individual/kojinmuke/recruitment/";
  
    // HTMLを取得
    var html = UrlFetchApp.fetch(url).getContentText("SHIFT-JIS");
  
    // Parserライブラリを使って表面利率を取得
    var html2 = Parser.data(html).from("表面利率<em>(年)(注2)</em><br><em>(税引き後)</em></th>").to("</tr>").build()
    
    Logger.log(html2);
  
  
    //  % が含まれてないときは　表面利率は発表されてないとする。
    if (html2.includes("%")){
      var rate1 = Parser.data(html2).from("<td class=\'col1\'>").to("%<em>").build()
      var rate2 = Parser.data(html2).from("<td class=\'col2\'>").to("%<em>").build()
      var rate3 = Parser.data(html2).from("<td class=\'col3\'>").to("%<em>").build()
  
    }else{
      var rate1 = Parser.data(html2).from("<td class=\'col1\'>").to("</td>").build()
      var rate2 = Parser.data(html2).from("<td class=\'col2\'>").to("</td>").build()
      var rate3 = Parser.data(html2).from("<td class=\'col3\'>").to("</td>").build()
  
    }
  
    // 表面利率をログに出力
    Logger.log(rate1);
    Logger.log(rate2);
    Logger.log(rate3);
  
  
    //--------------
    // スプレッドシートを取得します
    let book = SpreadsheetApp.getActiveSpreadsheet();
    
    // データを書き込むシートを指定します
    let sheet1Data = book.getSheetByName("個人向け国債");
    
    //Google Sheet1の2行目に行を挿入する
    sheet1Data.insertRows(2,1);
      
    //　2行目1列目のセルに日時を入力する
    let val_time = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
    sheet1Data.getRange(2,1).setValue(val_time);
  
  
    //　2行目に表面利率を入力する
    sheet1Data.getRange(2, 2).setValue(rate1);
    sheet1Data.getRange(2, 3).setValue(rate2);
    sheet1Data.getRange(2, 4).setValue(rate3);
  
  
    //  Discord webhook 
    SendMessage( "個人向け国債10年変動:"+ rate1 )
  
  
  
  
  
  }
  
  