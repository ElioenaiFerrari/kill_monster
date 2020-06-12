new Vue({
  el: "#app",
  data: {
    isRunning: false,
    playerLife: 100,
    monsterLife: 100,
    logs: [],
  },
  computed: {
    hasResult() {
      return this.playerLife == 0 || this.monsterLife == 0;
    },
  },
  methods: {
    start() {
      this.isRunning = true;
      this.playerLife = 100;
      this.monsterLife = 100;
      this.logs = [];
    },
    attack(isSpecial) {
      this.hurt("monsterLife", 5, 10, isSpecial, "Player", "Monster", "player");
      if (this.monsterLife > 0) {
        this.hurt("playerLife", 7, 12, false, "Monster", "Player", "monster");
      }
    },
    hurt(param, min, max, isSpecial, source, target, cls) {
      const plus = isSpecial ? 5 : 0;
      const hurt = this.getRandom(min + plus, max + plus);
      this[param] = Math.max(this[param] - hurt, 0);
      this.registerLog(
        `The ${source} hit the ${target} with ${hurt} strength`,
        cls
      );
    },
    heal() {
      const value = Math.round(Math.random() * (12 - 7) + 7);
      this.hurt("playerLife", 7, 12, false, "Monster", "Player", "monster");
      this.playerLife = Math.min(this.playerLife + value, 100);
      this.registerLog(`The player recovered ${value} health`, "player");
    },
    getRandom(min, max) {
      const value = Math.random() * (max - min) + min;
      return Math.round(value);
    },
    registerLog(text, cls) {
      this.logs.unshift({ text, cls });
    },
  },
  watch: {
    hasResult(value) {
      if (value) {
        this.isRunning = false;
      }
    },
  },
});
