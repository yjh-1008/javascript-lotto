const MissionUtils = require('@woowacourse/mission-utils');
const {Console, Random} = MissionUtils;
const Lotto = require('./Lotto.js');
class App {
  
  constructor() {
    this.lotto = new Lotto();
  }
  play() {

  }
}
const app = new App();
app.play();
module.exports = App;
