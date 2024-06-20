<template>
	<div class="container mx-auto p-4 bg-gray-900 text-gray-200">
		<h1 class="text-2xl font-bold mb-4 text-center">
			Options Profit Calculator
		</h1>
		<div class="bg-gray-800 shadow-md rounded-lg p-6 flex justify-center">
			<canvas
				id="riskRewardChart"
				class="max-w-full"
			></canvas>
		</div>
		<div class="mt-4 text-center bg-gray-800 p-4 rounded-lg shadow-md">
			<p class="text-lg">
				<strong>Max Profit:</strong>
				<span class="text-green-400">{{ maxProfit }}</span>
			</p>
			<p class="text-lg">
				<strong>Max Loss:</strong>
				<span class="text-red-400">{{ maxLoss }}</span>
			</p>
			<p class="text-lg">
				<strong>Break Even Points:</strong>
				<span class="text-blue-400">{{ breakEvenPoints.join(', ') }}</span>
			</p>
		</div>
	</div>
</template>

<script>
	import { Chart, registerables } from 'chart.js';
	Chart.register(...registerables);

	export default {
		name: 'CodingChallenge',
		props: {
			optionsData: {
				type: Array,
				required: true,
				validator: value => value.length <= 4, // Accept up to four options contracts
			},
		},
		data() {
			return {
				maxProfit: null,
				maxLoss: null,
				breakEvenPoints: [],
			};
		},
		mounted() {
			this.calculateRiskReward();
			this.createChart();
		},
		methods: {
			calculateProfitLoss(price, option) {
				const { strike_price, type, bid, ask, long_short } = option;
				const multiplier = long_short === 'long' ? 1 : -1;
				if (type === 'Call') {
					return (
						multiplier *
						(price > strike_price ? price - strike_price - ask : -bid)
					);
				} else {
					return (
						multiplier *
						(price < strike_price ? strike_price - price - ask : -bid)
					);
				}
			},
			calculateRiskReward() {
				const prices = Array.from({ length: 200 }, (_, i) => i);
				const profitLossData = prices.map(price =>
					this.optionsData.reduce(
						(acc, option) => acc + this.calculateProfitLoss(price, option),
						0
					)
				);

				this.maxProfit = Math.max(...profitLossData);
				this.maxLoss = Math.min(...profitLossData);

				// Finding break-even points where profit/loss crosses zero
				this.breakEvenPoints = prices.filter((price, index) => {
					if (index === 0 || index === profitLossData.length - 1) return false;
					return (
						(profitLossData[index - 1] < 0 && profitLossData[index + 1] > 0) ||
						(profitLossData[index - 1] > 0 && profitLossData[index + 1] < 0)
					);
				});
			},
			createChart() {
				const ctx = document.getElementById('riskRewardChart').getContext('2d');
				const prices = Array.from({ length: 200 }, (_, i) => i);
				const overallData = prices.map(price =>
					this.optionsData.reduce(
						(acc, option) => acc + this.calculateProfitLoss(price, option),
						0
					)
				);
				const datasets = this.optionsData.map((option, index) => {
					const optionData = prices.map(price =>
						this.calculateProfitLoss(price, option)
					);
					const colors = [
						{
							borderColor: 'rgba(255, 99, 132, 1)',
							backgroundColor: 'rgba(255, 99, 132, 0.2)',
						},
						{
							borderColor: 'rgba(54, 162, 235, 1)',
							backgroundColor: 'rgba(54, 162, 235, 0.2)',
						},
						{
							borderColor: 'rgba(75, 192, 192, 1)',
							backgroundColor: 'rgba(75, 192, 192, 0.2)',
						},
						{
							borderColor: 'rgba(153, 102, 255, 1)',
							backgroundColor: 'rgba(153, 102, 255, 0.2)',
						},
					][index];

					return {
						label: `Option ${index + 1}`,
						data: optionData,
						borderColor: colors.borderColor,
						backgroundColor: colors.backgroundColor,
						borderWidth: 2,
						pointRadius: 0,
						fill: true,
						tension: 0.1,
					};
				});

				datasets.push({
					label: 'Overall Profit/Loss',
					data: overallData,
					borderColor: 'rgba(255, 99, 132, 1)',
					backgroundColor: 'rgba(255, 99, 132, 0.2)',
					borderWidth: 4,
					pointRadius: 0,
					fill: true,
					tension: 0.1,
				});

				new Chart(ctx, {
					type: 'line',
					data: {
						labels: prices,
						datasets: datasets,
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							legend: {
								display: true,
								labels: {
									color: '#D1D5DB',
									font: {
										size: 14,
									},
								},
								onHover: function (e) {
									e.native.target.style.cursor = 'pointer';
								},
							},
							tooltip: {
								backgroundColor: '#1F2937',
								titleColor: '#F9FAFB',
								bodyColor: '#F9FAFB',
								cornerRadius: 4,
								displayColors: true,
								callbacks: {
									label: function (context) {
										const value = context.raw;
										return `Profit/Loss: ${value.toFixed(2)}`;
									},
								},
							},
						},
						hover: {
							mode: 'nearest',
							intersect: false,
						},
						scales: {
							x: {
								title: {
									display: true,
									text: 'Price of Underlying at Expiry',
									color: '#D1D5DB',
								},
								grid: {
									color: 'rgba(209, 213, 219, 0.2)',
								},
								ticks: {
									color: '#D1D5DB',
								},
							},
							y: {
								title: {
									display: true,
									text: 'Profit/Loss',
									color: '#D1D5DB',
								},
								grid: {
									color: 'rgba(209, 213, 219, 0.2)',
								},
								ticks: {
									color: '#D1D5DB',
								},
							},
						},
					},
				});
			},
		},
	};
</script>

<style scoped>
	.container {
		max-width: 800px;
	}
	canvas {
		width: 100%;
		height: 400px;
	}
	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}
		canvas {
			height: 300px;
		}
		.text-lg {
			font-size: 1rem;
		}
	}
</style>
