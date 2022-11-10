const MissionUtils = require('@woowacourse/mission-utils');
const {Console, Random} = MissionUtils;
const Lotto = require('./Lotto.js');
class App {
  
  constructor() {
    this.lotto;
    this.numberOfPurchase=0;
    this.lottos = [];
    this.winningNumber = [];
    this.bonusNumber = [];
    this.correctNumber = [];
    this.correctBonusNumber = [];
    this.yield;
  }

  printMessage(message) {
    Console.print(message);
  }

  printLottos() {
    this.lottos.map((lotto) => {
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
    while(this.lottos.length < this.numberOfPurchase) {
      let lotto = new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6));
      lotto.sortNumbers();
      this.lottos.push(lotto);
    }
  }

  getWinningNumber() {
    Console.readLine('당첨 번호를 입력해 주세요.\n',(answer) => {
      this.winningNumber = new Lotto(answer.split(','));
      this.getBonusNumber();
    })
  }

  checkCorrectNumbers(lotto) {
    let correctBalls = 0;
    lotto.getNumbers().map((ball,index) => {
      if(this.winningNumber.getNumbers().includes(ball.toString())) correctBalls += 1;
    });
    return correctBalls;
  }

  checkResult() {
    this.lottos.map((lotto,index) => {
      this.correctNumber.push(this.checkCorrectNumbers(lotto));
      this.correctBonusNumber[index] = lotto.getNumbers().includes(this.bonusNumber);
    })
  }

  calcYield() {
    let reward = 0;
    this.correctNumber.map((number,index) => {
      switch(number)
      {
        case 3:
          reward += 5000;
          break;
        case 4:
          reward += 50000;
          break;
        case 5:
          this.correctBonusNumber[index] ? reward += 30000000 : reward += 11500000;
          break;
        case 6:
          reward += 2000000000;
          break;
      }
    });
    this.yield=Math.round(reward/(this.numberOfPurchase*1000)*100).toFixed(2);
  }

  getBonusNumber() {
    Console.readLine('보너스 번호를 입력해 주세요.\n',(answer) => {
      this.bonusNumber = answer;
      this.checkResult();
      this.calcYield();
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
