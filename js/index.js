(function() {
  var AGENTIC, COMMUNAL, Home, SOCIAL_COMMUNAL, app, page;

  AGENTIC = {
    'go-getter': true,
    'risk-taker': true,
    'self-confident': true,
    active: true,
    adventurous: true,
    aggressive: true,
    ambitious: true,
    analyzing: true,
    assertive: true,
    athletic: true,
    authoritative: true,
    autonomous: true,
    boastful: true,
    bold: true,
    coarse: true,
    compentent: true,
    confident: true,
    courage: true,
    courageous: true,
    daring: true,
    decisive: true,
    determined: true,
    dominance: true,
    dominant: true,
    driver: true,
    entreneurial: true,
    forceful: true,
    headstrong: true,
    hierarchal: true,
    impulsive: true,
    independent: true,
    individual: true,
    individualistic: true,
    influencial: true,
    innovator: true,
    intellectual: true,
    leader: true,
    leadership: true,
    logic: true,
    logical: true,
    masuline: true,
    objective: true,
    opinionated: true,
    opinioned: true,
    outspoken: true,
    persist: true,
    persistant: true,
    principled: true,
    rational: true,
    strategic: true,
    strong: true,
    superior: true,
    thinker: true,
    tough: true
  };

  COMMUNAL = {
    affection: true,
    affectionate: true,
    agreeable: true,
    appreciative: true,
    cared: true,
    caring: true,
    cheer: true,
    cheerful: true,
    collaborate: true,
    collaborative: true,
    committed: true,
    communal: true,
    commune: true,
    compassion: true,
    compassionate: true,
    connective: true,
    considerate: true,
    cooperate: true,
    cooperative: true,
    dedicated: true,
    dependent: true,
    emotional: true,
    emotions: true,
    empathetic: true,
    empathy: true,
    feminine: true,
    friendly: true,
    gentle: true,
    gently: true,
    hardworking: true,
    helpful: true,
    helping: true,
    helps: true,
    honest: true,
    honestly: true,
    honesty: true,
    inclusive: true,
    interdependent: true,
    interpersonal: true,
    kind: true,
    kindness: true,
    loyal: true,
    loyalty: true,
    mild: true,
    modest: true,
    modesty: true,
    nice: true,
    nurture: true,
    nurtured: true,
    nurturing: true,
    nuturing: true,
    personable: true,
    pleasant: true,
    pleasantly: true,
    pleasure: true,
    polite: true,
    politely: true,
    quiet: true,
    quietly: true,
    responsible: true,
    responsive: true,
    sensitive: true,
    supportive: true,
    sweet: true,
    sweetest: true,
    sweetly: true,
    sympathetic: true,
    sympathy: true,
    tactical: true,
    thoughtful: true,
    warm: true,
    yielded: true,
    yielding: true
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
