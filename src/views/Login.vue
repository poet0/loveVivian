<template>
	<div>
		<bgCanvas />
	</div>
</template>

<script>
	import Particle from '../components/backgrounds/Particle'
	import Particle2 from '../components/backgrounds/Particle2'
	import Star from '../components/backgrounds/Star'
  import bgCanvas from '../components/backgrounds/bgCanvas'

	export default {
		name: "login",
		components: {
			Particle,
			Particle2,
			Star,
      bgCanvas
		},
		data() {
			return {}
		},
		methods: {},
		created() {

		}
	}
</script>

<style lang="scss" scoped>

</style>
