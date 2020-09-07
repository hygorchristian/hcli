module.exports = {
  name: 'generate:reducer',
  description: 'Creates a new reducer/state hook in folder src/hooks',
  run: async toolbox => {
    const { parameters, createReducer } = toolbox
    const name = parameters.first

    await createReducer({ name })
  }
}
