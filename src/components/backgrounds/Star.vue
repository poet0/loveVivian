<template>
	<div>
		<canvas id="canvas" class="canvas"></canvas>
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
			return {}
		},
		methods: {},
		created() {
			
		},
		mounted(){
			let canvas = document.getElementById('canvas'),
				ctx = canvas.getContext('2d'),
				width = window.innerWidth,
				height = window.innerHeight,
				//实例化月亮和星星。流星是随机时间生成，所以只初始化数组
				moon = new Moon(ctx, width, height),
				stars = new Stars(ctx, width, height, 200),
				meteors = [],
				count = 0
			
			canvas.width = width;
			canvas.height = height;
			
			const meteorGenerator = ()=> {
				//x位置偏移，以免经过月亮
				let x = Math.random() * width + 800
				meteors.push(new Meteor(ctx, x, height))
				
				//每隔随机时间，生成新流星
				setTimeout(()=> {
					meteorGenerator()
					
				}, Math.random() * 2000)
			}
			
			const frame = ()=>{
				count++
				count % 10 == 0 && stars.blink()
				moon.draw()
				stars.draw()
				
				meteors.forEach((meteor, index, arr)=> {
					//如果流星离开视野之内，销毁流星实例，回收内存
					if (meteor.flow()) {
						meteor.draw()
					} else {
						arr.splice(index, 1)
					}
				})
				requestAnimationFrame(frame)
			}
			meteorGenerator()
			frame()
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