const MissionUtils = require('@woowacourse/mission-utils');
const {Console, Random} = MissionUtils;
const Lotto = require('./Lotto.js');
class App {
  
  constructor() {
    this.lotto;
    this. numberOfPurchase=0;
    this.lotts = [];
    this.winningNumber;
    this.bonusNumber;
  }

  printMessage(message) {
    Console.print(message);
  }

  printLottos() {
    this.lotts.map((lotto) => {
      this.printMessage(`[${lotto.getNumbers()}]`);
    })
  }

  validationAmount(money) {
    if(money % 1000 !== 0 ){
      throw new Error("[ERROR] 로또 구매 금액의 단위는 1000원입니다.")
    }
    return money / 1000;
  }


  drawLotto() {
    while(this.lotts.length < this.numberOfPurchase) {
      let lotto = new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6));
      this.lotts.push(lotto);
    }
  }

  getWinningNumber() {
    Console.readLine('당첨 번호를 입력해 주세요.\n',(answer) => {
      this.winningNumber = new Lotto(answer.split(','));
      this.getBonusNumber();
    })
  }

  getBonusNumber() {
    Console.readLine('보너스 번호를 입력해 주세요.\n',(answer) => {
      this.bonusNumber = answer;
    })
  }

  purchase() {
    Console.readLine('구입금액을 입력해 주세요.\n',(answer) => {
      this.numberOfPurchase = this.validationAmount(answer);
      this.drawLotto();
      this.printLottos();
      this.getWinningNumber();
    })
  }

  play() {
    this.purchase();
  }
}
const app = new App();
app.play();
module.exports = App;
