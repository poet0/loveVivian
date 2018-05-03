<template>
	<el-container id="container">
		<transition
				name="custom-classes-transition"
				enter-active-class="fadeInDown"
				leave-active-class="fadeOutUp">
			<el-header v-show="show0">
				<span class="reset" @click="bbb">reset</span>
			</el-header>
		</transition>
		<el-main>
			<transition
			name="fadeLeft">
			<div v-show="show1"></div>
			</transition>
			<transition
					name="fadeRight">
				<div v-show="show2" @click="aaa"></div>
			</transition>
			<transition
			name="fadeLeft">
			<div v-show="show3"></div>
			</transition>
		</el-main>
		<transition
				name="custom-classes-transition"
				enter-active-class="fadeInUp"
				leave-active-class="fadeOutDown">
			<el-footer v-show="show4"></el-footer>
		</transition>
	</el-container>
</template>

<script>
	export default {
		name: "home",
		data() {
			return {
				show0: false,
				show1: false,
				show2: false,
				show3: false,
				show4: false
			}
		},
		methods: {
			aaa() {
				this.show2 = !this.show2;
				setTimeout(() => {
					this.show2 = !this.show2
				}, 1000)
			},
			bbb(){
				this.show0 = false;
				this.show1 = false;
				this.show2 = false;
				this.show3 = false;
				this.show4 = false;
				setTimeout(() => {
					this.show0 = true
				}, 1000)
				setTimeout(() => {
					this.show1 = true
				}, 1500)
				setTimeout(() => {
					this.show2 = true
				}, 2000)
				setTimeout(() => {
					this.show3 = true
				}, 2500)
				setTimeout(() => {
					this.show4 = true
				}, 3000)
			}
		},
		created() {
			this.bbb()
		}
	}
</script>

<style lang="scss" scoped>
	#container {
		flex-direction: column;
		-ms-flex-direction: column;
		.el-header, .el-main, .el-footer {
			padding: 0;
		}
	}
	
	header {
		background-color: #000000;
		.reset{
			float: right;
			margin-right: 8%;
			color: #ffffff;
			line-height: 60px;
			cursor: pointer;
		}
	}
	
	main {
		overflow: hidden;
		div {
			width: 75%;
			height: 250px;
			&:nth-child(odd) {
				float: left;
				background-color: #ffff00;
			}
			&:nth-child(even) {
				float: right;
				background-color: #0000ff;
			}
		}
	}
	
	footer {
		background-color: #ff0000;
	}
</style>