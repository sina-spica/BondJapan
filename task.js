function task(){

  //現在の日時を取得
  let now = new Date();
  let hours = now.getHours();
  
  Logger.log(hours)

  switch(hours){

    case 7:
      getJGB2();
      break;

    case 9:  // GAS が1時間おきに起動するので、9時台のときだけ実行
      getJGB();
      break;
    



    default: //それ以外の時間は何もしない
    
  }
}




