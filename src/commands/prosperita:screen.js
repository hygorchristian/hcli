module.exports = {
	name: 'prosperita:screen',
	description: 'Cria uma nova tela dentro de src/screens para o projeto Prosperitá',
	run: async toolbox => {
		const { parameters, createComponentProsperita } = toolbox
		const name = parameters.first
		const lang = parameters.options.lang || 'ts'

			await createComponentProsperita('screens', { name, lang })
	}
}
