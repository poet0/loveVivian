<template>
	<el-container>
		<el-header></el-header>
		<el-main></el-main>
		<el-footer></el-footer>
	</el-container>
</template>

<script>
	export default {
		name: "home",
		data() {
			return {}
		},
		methods: {},
		created() {
			
		}
	}
</script>

<style lang="scss" scoped>
	header {
		background-color: #000000;
	}
	
	main {
		height: 500px;
		background-color: #ffff00;
	}
	
	footer{
		background-color: #ff0000;
	}
</style>