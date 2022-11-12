const MissionUtils = require("@woowacourse/mission-utils");
const { Console, Random } = MissionUtils;
const Lotto = require("./Lotto.js");
class App {
  constructor() {
    this.numberOfPurchase = 0;
    this.lottos = [];
    this.winningNumber = [];
    this.bonusNumber = [];
    this.correctNumber = [];
    this.correctBonusNumber = [];
    this.yield = 0;
    this.ranks = Array(5).fill(0);
    this.rewards = [2000000000,30000000,1500000,50000,5000];
  }

  printMessage(message) {
    Console.print(message);
  }

  printLotto(lotto) {
      let str = "[";
      lotto.getNumbers().forEach((ball, index)=>{
        str += index !== 5 ? ball+", " : ball+"]";
      })
      this.printMessage(str);
  }

  printLottos() {
    this.lottos.map((lotto) => {
     this.printLotto(lotto);
    });
  }

  validationAmount(money) {
    if (money % 1000 !== 0) {
      throw new Error("[ERROR] 로또 구매 금액의 단위는 1000원입니다.");
    }
    return money / 1000;
  }

  drawLotto() {
    while (this.lottos.length < this.numberOfPurchase) {
      let lotto = new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6));
      lotto.sortNumbers();
      this.lottos.push(lotto);
    }
  }

  getWinningNumber() {
    Console.readLine("당첨 번호를 입력해 주세요.\n", (answer) => {
      this.winningNumber = new Lotto(answer.split(","));
      this.getBonusNumber();
    });
  }

  checkCorrectNumbers(lotto) {
    let correctBalls = 0;
    lotto.getNumbers().map((ball, index) => {
      if (this.winningNumber.getNumbers().includes(ball.toString()))
        correctBalls += 1;
    });
    return correctBalls;
  }

  checkResult() {
    this.lottos.map((lotto, index) => {
      this.correctNumber.push(this.checkCorrectNumbers(lotto));
      this.correctBonusNumber[index] = lotto
        .getNumbers()
        .includes(this.bonusNumber);
    });
  }

  checkAllResults() {
    this.correctNumber.map((number, index) => {
      if(number === 3) {
        this.ranks[4] += 1;
      } else if(number === 4) {
        this.ranks[3] += 1;
      } else if(number === 5) {
        this.correctBonusNumber[index] ? ( this.ranks[1] += 1) : ( this.ranks[2] += 1);
      } else if(number === 6) {
        this.ranks[0] += 1;
      }
    });
    this.printResult();
  }

  calcYield() {
    let totalReward = 0;
    this.ranks.map((rank, index) => {
      totalReward += rank * this.rewards[index];
    })
    return `총 수익률은 ${(
      (totalReward / (this.numberOfPurchase * 1000)) * 100
    ).toFixed(1)}%입니다.`;
  }

  printResult() {
    const fifthMessage = `3개 일치 (5,000원) - ${this.ranks[4]}개 \n`;
    const fourthMessage = `4개 일치 (50,000원) - ${this.ranks[3]}개 \n`;
    const thirdMessage = `5개 일치 (1,500,000원) - ${this.ranks[2]}개 \n`;
    const secondMessage = `5개 일치, 보너스 볼 일치 (30,000,000원) - ${this.ranks[1]}개 \n`;
    const firstMessage = `6개 일치 (2,000,000,000원) - ${this.ranks[0]}개 \n`;
    const yieldMessage = this.calcYield();
    this.printMessage( fifthMessage + fourthMessage + thirdMessage + secondMessage + firstMessage + yieldMessage);
    Console.close();
  }

  getBonusNumber() {
    Console.readLine("보너스 번호를 입력해 주세요.\n", (answer) => {
      this.bonusNumber = answer;
      this.checkResult();
      this.checkAllResults();
      this.printResult();
    });
  }

  purchase() {
    Console.readLine("구입금액을 입력해 주세요.\n", (answer) => {
      this.numberOfPurchase = this.validationAmount(answer);
      this.printMessage(`${this.numberOfPurchase}개를 구매했습니다.`);
      this.drawLotto();
      this.printLottos();
      this.getWinningNumber();
    });
  }

  play() {
    this.purchase();
  }
}
const app = new App();
app.play();
module.exports = App;
