<template>
	<canvas ref="canvas" :width="width" :height="height"></canvas>
</template>

<script>
	export default {
		name: "particle",
		data() {
			return {
				width: 0,
				height: 0,
				area: {
					x: null,
					y: null,
					max: 20000
				},
				dots: []
			}
		},
		methods: {
			setCanvas() {
				let ctx = this.$refs.canvas.getContext('2d');
				ctx.clearRect(0, 0, this.width, this.height);
				ctx.fillStyle = "rgba(255,255,255,0.5)";
				let ndots = [this.area].concat(this.dots);
				this.dots.forEach((dot) => {
					
					// 粒子位移
					dot.x += dot.xa;
					dot.y += dot.ya;
					
					// 遇到边界将加速度反向
					dot.xa *= (dot.x > this.width || dot.x < 0) ? -1 : 1;
					dot.ya *= (dot.y > this.height || dot.y < 0) ? -1 : 1;
					
					// 绘制点
					ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 3, 3);
					
					// 循环比对粒子间的距离
					for (let i = 0; i < ndots.length; i++) {
						let d2 = ndots[i];
						
						if (dot === d2 || d2.x === null || d2.y === null) continue;
						
						let xc = dot.x - d2.x;
						let yc = dot.y - d2.y;
						
						// 两个粒子之间的距离
						let dis = xc * xc + yc * yc;
						
						// 距离比
						let ratio;
						
						// 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
						if (dis < d2.max) {
							
							// 如果是鼠标，则让粒子向鼠标的位置移动
							if (d2 === this.area && dis > (d2.max / 2)) {
								dot.x -= xc * 0.01;
								dot.y -= yc * 0.01;
							}
							
							// 计算距离比
							ratio = (d2.max - dis) / d2.max;
							
							// 画线
							ctx.beginPath();
							ctx.lineWidth = ratio / 2;
							ctx.strokeStyle = 'rgba(255,255,255,' + (ratio + 0.2) + ')';
							ctx.moveTo(dot.x, dot.y);
							ctx.lineTo(d2.x, d2.y);
							ctx.stroke();
						}
					}
					
					// 将已经计算过的粒子从数组中删除
					ndots.splice(ndots.indexOf(dot), 1);
				});
				
			},
			resize() {
				this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
			},
			mousemove() {
				window.onmousemove = (e) => {
					e = e || window.event;
					this.area.x = e.clientX;
					this.area.y = e.clientY
				};
				window.onmouseout = () => {
					this.area.x = null;
					this.area.y = null
				}
			},
			setParticle() {
				for (let i = 0; i < 100; i++) {
					let x = Math.random() * this.width;
					let y = Math.random() * this.height;
					let xa = Math.random() * 2 - 1;
					let ya = Math.random() * 2 - 1;
					this.dots.push({
						x: x,
						y: y,
						xa: xa,
						ya: ya,
						max: 8000
					})
				}
			}
		},
		created() {
			this.resize();
			this.setParticle();
			window.onresize = () => {
				this.resize()
			};
			this.mousemove()
		},
		mounted() {
			setInterval(() => {
				this.setCanvas()
			}, 25)
		}
	}
</script>

<style lang="scss" scoped>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #0d1953;
	}
</style>