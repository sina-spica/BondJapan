function SendMessage( data ) {
  // discord側で作成したボットのウェブフックURL
  const discordWebHookURL = PropertiesService.getScriptProperties().getProperty("discordWebHookURL");
  
  // 投稿するチャット内容と設定
  const message = {
  //  "content": "Hello!", // チャット本文
    "content": data , // チャット本文
    "tts": false  // ロボットによる読み上げ機能を無効化
  }

  const param = {
    "method": "POST",
    "headers": { 'Content-type': "application/json" },
    "payload": JSON.stringify(message)
  }

  UrlFetchApp.fetch(discordWebHookURL, param);
}