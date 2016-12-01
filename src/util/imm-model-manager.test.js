import test from 'ava'
import ModelManager from './imm-model-manager'

const createIt = (opts = {}) => {
  return new ModelManager(opts)
}

const logging = {
  logging: {
    modelManager: true
  }
}

const log = console.log

const mm = createIt({ logging })

test.afterEach(t => {
  mm.clear()
})

test('createModel', t => {
  let model = mm.createModel()
  log(model)
  t.pass()
})

test('createFor', t => {
  let model = mm.createFor([])
  log(model)
  t.pass()
})

test('isEmpty', t => {
  t.true(model.isEmpty(), 'is empty')
  let model = mm.createFor([1])
  t.false(model.isEmpty(), 'is not empty')
})

test('at (index) empty', t => {
  let model = mm.createFor([])
  let item0 = model.at(0)
  t.falsy(item0, 'nothing at 0 in empty list')
})

test('at (index) elements', t => {
  let model = mm.createFor([1, 2])
  let item0 = model.at(0)
  let item1 = model.at(1)
  log(model)
  t.is(item0, 0)
  t.is(item1, 1)
})

test('first', t => {
  let model = mm.createFor([1, 2])
  let item = model.first
  log('first', item)
  t.is(item, 1)
})

test('last', t => {
  let model = mm.createFor([1, 2])
  let item = model.last
  log('last', item)
  t.is(item, 2)
})

// insertAt
test('insertAt', t => {
  let model = mm.createFor([3, 4])
  let inserted = model.insertAt(0, [1, 2])
  log('inserted', inserted)
  t.is(inserted.model, [1, 2, 3, 4])
})

// removeAt
test('removeAt', t => {
  let model = mm.createFor([1, 2, 3, 4, 5])
  let removedFirst = model.removeAt(0)
  log('removed first', removedFirst)
  t.is(removedFirst.model, [2, 3, 4, 5])

  let removedLast = model.removeAt(2)
  log('removed last', removedLast)
  t.is(removedLast.model, [2, 3, 4])

  let removedMid = model.removeAt(1)
  log('removed mid', removedMid)
  t.is(removedLast.model, [2, 4])
})

// addToHistory


test('undo', t => {
  let initialModel = [1, 2]
  let model = mm.createFor(initialModel)
  model.insertAt(0, [0])
  let firstModel = model.undo()
  log('first model', firstModel)
  t.deepEqual(firstModel.model, initialModel)
})

test('redo', t => {
  let initialModel = [1, 2]
  let imodel = mm.createFor(initialModel)
  let latestModel = imodel.insertAt(0, [0])
  log('latest model', latestModel)

  let prevModel = imodel.undo()
  log('prev model', prevModel)
  t.deepEqual(prevModel.model, initialModel)

  let nextModel = imodel.redo()
  log('next model', nextModel)
  t.deepEqual(nextModel.model, latestModel.model)
})

test('timeTravel (index)', t => {
  let initialModel = [1, 2]
  let model = mm.createFor(initialModel)
  model.insertAt(0, [0])
  let firstModel = model.timeTravel(0)
  log('first model', firstModel)
  t.deepEqual(firstModel.model, initialModel)
})



// ...