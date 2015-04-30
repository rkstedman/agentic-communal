// Generated by CoffeeScript 1.7.1
(function() {
  var AGENTIC, COMMUNAL, Home, SOCIAL_COMMUNAL, app, page;

  AGENTIC = {
    daring: true,
    bold: true,
    confident: true,
    assertive: true,
    aggressive: true,
    ambitious: true,
    dominant: true,
    forceful: true,
    intellectual: true
  };

  COMMUNAL = {
    affectionate: true,
    helpful: true,
    kind: true,
    sympathetic: true,
    sensitive: true,
    nuturing: true,
    agreeable: true,
    caring: true,
    collaborative: true
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
      var aCount, agentic, cCount, communal, corpus, word, _i, _len, _ref;
      corpus = this.corpus.get();
      if (!corpus) {
        return;
      }
      communal = {};
      agentic = {};
      aCount = 0;
      cCount = 0;
      _ref = corpus.split(' ');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        word = _ref[_i];
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
