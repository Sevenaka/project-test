<template>
	<div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-side">
		<div class="sidebar">
			<div v-if="loading" class="ld-spn" v-cloak><i class="fas fa-circle-notch"></i></div>
			<div class="itm" v-for="item in sidebarItems">
				<a href="#">
					<img src="/src/assets/images/itm.jpg" :alt="item.title" :title="item.title">
					<div class="tit">
						{{ item.title | textSz(20) }}
					</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
	const axios = require('axios');
    module.exports = {
		data: function(){
			return {
				sidebarItems: [],
				loading: false
			}
		},
		mounted() {
			this.doCORSRequest({method: 'GET', url: 'http://api.idregion.kz/getlist?token=923db9bcefa652ceae21b42b3dfccb93&limit=3&offset=0'});
		},
		methods: {
			doCORSRequest: function(options) {
				var self = this;
				
				self.loading = true
				
				axios.get(`${'https://cors-anywhere.herokuapp.com/'}` + options.url)
				.then(function (response){
					self.sidebarItems = response.data
					self.loading = false
					//console.log(self.sidebarItems)
				})
				.catch(function (error){
					console.log(error);
				})
				.then(function () {

				});
			}
		}
    }
</script>