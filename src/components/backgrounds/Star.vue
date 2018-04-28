<template>
	<div>
		<canvas ref="canvas" :width="width" :height="height" class="canvas"></canvas>
		<div class="city"></div>
		<div class="moon"></div>
	</div>
</template>

<script>
	import Stars from '../../../static/js/backgrounds/Star'
	import Moon from '../../../static/js/backgrounds/Moon'
	import Meteor from '../../../static/js/backgrounds/Meteor'
	
	export default {
		name: "star",
		data() {
			return {
				width: 0,
				height: 0,
				moon: '',
				stars: '',
				meteors: [],
				count: 0,
				creatMeteor: ''
			}
		},
		methods: {
			setCanvas(){
				let canvas = this.$refs.canvas,
					ctx = canvas.getContext('2d');
					//实例化月亮和星星。流星是随机时间生成，所以只初始化数组
					this.moon = new Moon(ctx, this.width, this.height);
					this.stars = new Stars(ctx, this.width, this.height, 200);
					this.meteors = [];
				this.meteorGenerator(ctx);
				this.frame()
			},
			resize(){
				this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
			},
			meteorGenerator(ctx){
				//x位置偏移，以免经过月亮
				let x = Math.random() * this.width + 800;
				this.meteors.push(new Meteor(ctx, x, this.height));
				
				//每隔随机时间，生成新流星
				this.creatMeteor = setTimeout(()=> {
					this.meteorGenerator(ctx)
				}, Math.random() * 2000)
			},
			frame(){
				this.count++;
				this.count % 10 == 0 && this.stars.blink();
				this.moon.draw();
				this.stars.draw();
				
				this.meteors.forEach((meteor, index, arr)=> {
					//如果流星离开视野之内，销毁流星实例，回收内存
					if (meteor.flow()) {
						meteor.draw()
					} else {
						arr.splice(index, 1)
					}
				});
				requestAnimationFrame(this.frame)
			}
		},
		created() {
			this.resize();
			window.onresize = () => {
				this.resize();
				clearTimeout(this.creatMeteor);
				this.setCanvas()
			}
		},
		mounted(){
			this.setCanvas()
		}
	}
</script>

<style lang="scss" scoped>
	canvas{
		position: fixed;
		top: 0;
		left: 0;
	}
	.city {
		width: 100%;
		height: 170px;
		position: fixed;
		bottom: 0px;
		z-index: 100;
		background: url('../../assets/img/city.png') no-repeat;
		background-size: cover;
	}
	.moon {
		width: 100px;
		height: 100px;
		position: absolute;
		left: 100px;
		top: 100px;
		background: url('../../assets/img/moon.png') no-repeat;
		background-size: cover;
	}
</style>