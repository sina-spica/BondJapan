function getJGB() {

  //現在の日時を取得
  let now = new Date();
  let hours = now.getHours();
  
  Logger.log(hours)

  // GAS が1時間おきに起動するので、10時～11時の間のときだけ実行
//  if (  hours  > 9  &&  hours < 11) {
 
   // CSVファイルのURLを指定します
    let url = "https://www.mof.go.jp/jgbs/reference/interest_rate/jgbcm.csv";

    // URLからテキストデータを取得します
    let text2 = UrlFetchApp.fetch(url).getBlob();

    //  テキストデータがSJISなのでUTF-8に変更
    let text = text2.getDataAsString("Shift-JIS");

    // テキストデータをCSV形式としてパースします
    let csvData = Utilities.parseCsv(text);
  
    // 動作確認：10年国債の利率
    Logger.log(csvData[1][0] +":"+ csvData[csvData.length-1][0] )
    Logger.log(csvData[1][10] +":"+ csvData[csvData.length-1][10])

    //--------------
    // スプレッドシートを取得します
    let book = SpreadsheetApp.getActiveSpreadsheet();
  
    // データを書き込むシートを指定します
    let sheet1Data = book.getSheetByName("シート1");
  
    //Google Sheet1の2行目に行を挿入する
    sheet1Data.insertRows(2,1);
    
    //　2行目1列目のセルに日時を入力する
    let val_time = Utilities.formatDate(now, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss');
    sheet1Data.getRange(2,1).setValue(val_time);


    //　2行目に入力する
    for (let i = 1; i < csvData[csvData.length-1].length+1 ; i++) {
      sheet1Data.getRange(2, i+1).setValue(csvData[csvData.length-1][i-1]);
    }

//  }
  SendMessage( csvData[1][0] +":"+ csvData[csvData.length-1][0] + "　　10年国債表面利率:"+ csvData[csvData.length-1][10] )

}






