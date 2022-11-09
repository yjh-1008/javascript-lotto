const MissionUtils = require('@woowacourse/mission-utils');
const {Console, Random} = MissionUtils;
const Lotto = require('./Lotto.js');
class App {
  
  constructor() {
  }

  pinrtMessage(message) {
    Console.print(message);
  }



  purchase() {
    Console.readLine('구입금액을 입력해 주세요.\n',(answer) => {
      console.log(answer);
    })
  }

  play() {
    this.purchase();
  }
}
const app = new App();
app.play();
module.exports = App;
