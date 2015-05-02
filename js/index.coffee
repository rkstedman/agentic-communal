# https://github.com/derbyjs/derby-standalone

AGENTIC=
  'self-confident': true
  active: true
  aggressive: true
  ambitious: true
  assertive: true
  authoritative: true
  bold: true
  coarse: true
  confident: true
  daring: true
  decisive: true
  dominant: true
  driver: true
  entreneurial: true
  forceful: true
  'go-getter': true
  independent: true
  influencial: true
  innovator: true
  intellectual: true
  outspoken: true
  rational: true
  'risk-taker': true
  strong: true
  strategic: true
  tough: true
  thinker: true

COMMUNAL=
  affectionate: true
  agreeable: true
  appreciative: true
  caring: true
  collaborative: true
  committed: true
  dependent: true
  dedicated: true
  emotional: true
  friendly: true
  hardworking: true
  helpful: true
  gentle: true
  kind: true
  mild: true
  nice: true
  nuturing: true
  pleasant: true
  tactical: true
  thoughtful: true
  sensitive: true
  supportive: true
  sympathetic: true
  warm: true
  # relationship builder
  # team player: true

SOCIAL_COMMUNAL=
  hardworking: true
  conscientious: true
  dependeable: true
  meticulous: true


app = derby.createApp()
# convenience function for loading templates that are defined as <script type="text/template">
app.registerViews()
class Home
  init: ->
    @corpus = @model.at 'corpus'
    @agenticAdjectives = @model.at 'agenticAdjectives'
    @communalAdjectives = @model.at 'communalAdjectives'
    @score = @model.at 'score'

  create: ->
    @corpus.on 'change', =>
      @analyzeCorpus()

  analyzeCorpus: ->
    corpus = @corpus.get()
    return unless corpus
    communal = {}
    agentic = {}
    aCount = 0
    cCount = 0
    for word in corpus.split(' ')
      word = word.replace ',', '' # get rid of commas
      if AGENTIC[word] is true
        agentic[word] ||= 0
        agentic[word] += 1
        aCount++
      else if COMMUNAL[word] is true
        communal[word] ||= 0
        communal[word] += 1
        cCount++
    @agenticAdjectives.set Object.keys(agentic)
    @communalAdjectives.set Object.keys(communal)
    @score.set cCount - aCount

app.component 'home', Home

page = app.createPage()
document.body.appendChild(page.getFragment('body'))

app.model.set("_page.text", "hello world")
app.model.add("testing", { x: 5, text: "hi"})
