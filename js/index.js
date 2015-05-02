(function() {
  var AGENTIC, COMMUNAL, Home, SOCIAL_COMMUNAL, app, page;

  AGENTIC = {
    'self-confident': true,
    active: true,
    aggressive: true,
    ambitious: true,
    assertive: true,
    authoritative: true,
    bold: true,
    coarse: true,
    confident: true,
    daring: true,
    decisive: true,
    dominant: true,
    driver: true,
    entreneurial: true,
    forceful: true,
    'go-getter': true,
    independent: true,
    influencial: true,
    innovator: true,
    intellectual: true,
    outspoken: true,
    rational: true,
    'risk-taker': true,
    strong: true,
    strategic: true,
    tough: true,
    thinker: true
  };

  COMMUNAL = {
    affectionate: true,
    agreeable: true,
    appreciative: true,
    caring: true,
    collaborative: true,
    committed: true,
    dependent: true,
    dedicated: true,
    emotional: true,
    friendly: true,
    hardworking: true,
    helpful: true,
    gentle: true,
    kind: true,
    mild: true,
    nice: true,
    nuturing: true,
    pleasant: true,
    tactical: true,
    thoughtful: true,
    sensitive: true,
    supportive: true,
    sympathetic: true,
    warm: true
  };

  SOCIAL_COMMUNAL = {
    hardworking: true,
    conscientious: true,
    dependeable: true,
    meticulous: true
  };

  app = derby.createApp();

  app.registerViews();

  Home = (function() {
    function Home() {}

    Home.prototype.init = function() {
      this.corpus = this.model.at('corpus');
      this.agenticAdjectives = this.model.at('agenticAdjectives');
      this.communalAdjectives = this.model.at('communalAdjectives');
      return this.score = this.model.at('score');
    };

    Home.prototype.create = function() {
      return this.corpus.on('change', (function(_this) {
        return function() {
          return _this.analyzeCorpus();
        };
      })(this));
    };

    Home.prototype.analyzeCorpus = function() {
      var aCount, agentic, cCount, communal, corpus, i, len, ref, word;
      corpus = this.corpus.get();
      if (!corpus) {
        return;
      }
      communal = {};
      agentic = {};
      aCount = 0;
      cCount = 0;
      ref = corpus.split(' ');
      for (i = 0, len = ref.length; i < len; i++) {
        word = ref[i];
        word = word.replace(',', '');
        if (AGENTIC[word] === true) {
          agentic[word] || (agentic[word] = 0);
          agentic[word] += 1;
          aCount++;
        } else if (COMMUNAL[word] === true) {
          communal[word] || (communal[word] = 0);
          communal[word] += 1;
          cCount++;
        }
      }
      this.agenticAdjectives.set(Object.keys(agentic));
      this.communalAdjectives.set(Object.keys(communal));
      return this.score.set(cCount - aCount);
    };

    return Home;

  })();

  app.component('home', Home);

  page = app.createPage();

  document.body.appendChild(page.getFragment('body'));

  app.model.set("_page.text", "hello world");

  app.model.add("testing", {
    x: 5,
    text: "hi"
  });

}).call(this);

//# sourceMappingURL=index.js.map
