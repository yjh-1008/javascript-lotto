const MissionUtils = require('@woowacourse/mission-utils');
const {Console, Random} = MissionUtils;
const Lotto = require('./Lotto.js');
class App {
  
  constructor() {
  }

  pinrtMessage(message) {
    Console.print(message);
  }

  validationAmount(money) {
    if(money % 1000 !== 0 ){
      throw new Error("[ERROR] 로또 구매 금액의 단위는 1000원입니다.")
    }
    return money / 1000;
  }


  purchase() {
    Console.readLine('구입금액을 입력해 주세요.\n',(answer) => {
      let numberOfPurchase = this.validationAmount(answer);
      console.log(numberOfPurchase);
    })
  }

  play() {
    this.purchase();
  }
}
const app = new App();
app.play();
module.exports = App;
