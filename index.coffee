# https://github.com/derbyjs/derby-standalone

AGENTIC=
  daring: true
  bold: true
  confident: true
  assertive: true
  aggressive: true
  ambitious: true
  dominant: true
  forceful: true
  intellectual: true

COMMUNAL=
  affectionate: true
  helpful: true
  kind: true
  sympathetic: true
  sensitive: true
  nuturing: true
  agreeable: true
  caring: true
  collaborative: true

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
