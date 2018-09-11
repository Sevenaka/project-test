<template>
	<div class="row">
		<div class="col-sm-12 col-md-12 col-lg-8 col-xl-8 col-main">
			<div class="main-fltr">
				<div class="row">
					<div class="col-sm-12 col-md-12 col-lg-7 col-xl-7 itm">
						<div class="fltr-sort">
							<label>Сортировать по:</label>
							<div class="mn-fltr">
								<div class="form-check">
								  <input v-model="filtr" @change="changeFilter()" class="form-check-input" type="radio" name="fltr" id="fltr1" value="asc">
								  <label class="form-check-label" for="fltr1" title="Сортировать по заголовку">
									<i class="fas fa-sort-alpha-down"></i>
								  </label>
								</div>
								<div class="form-check">
								  <input v-model="filtr" @change="changeFilter()" class="form-check-input" type="radio" name="fltr" id="fltr2" value="desc">
								  <label class="form-check-label" for="fltr2" title="Сортировать по заголовку">
									<i class="fas fa-sort-alpha-up"></i>
								  </label>
								</div>
								<div class="form-check">
								  <input v-model="filtr" @change="changeFilter()" class="form-check-input" type="radio" name="fltr" id="fltr3" value="id" checked>
								  <label class="form-check-label" title="Сортировать по идентификатору" for="fltr3">
									<i class="fas fa-sort-numeric-down"></i>
								  </label>
								</div>
							</div>
						</div>
					</div>
					<div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 itm">
						<div class="tit-fltr">
							<span>Фильтр по заголовку</span> <i class="fas fa-angle-right"></i>
						</div>
					</div>
				</div>
			</div>
			<div class="main-cnt">
				<div class="row">
					<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-cont">
						<div :class="['cnt-ts cnt-ts-' + item.id]" v-for="(item, index) in frontItems">
							<div class="row">
								<div class="col-sm-12 col-md-12 col-lg-5 col-xl-5">
									<img src="/src/assets/images/itm.jpg" :alt="item.title" :title="item.title">
								</div>
								<div class="col-sm-12 col-md-12 col-lg-7 col-xl-7">
									<div class="price">
										<i class="fas fa-dollar-sign"></i> <span>{{ item.price | toCurrency}}</span>
									</div>
									<h2>{{ item.title }}</h2>
									<p>
										{{ item.body }}
									</p>
									<div class="tel">
										<i class="fas fa-mobile-alt"></i> 
										<div :id="['ts-tel-' + item.id]">8-<span v-on:click="phone($event, item.id)">Показать телефон</span></div>
										<div v-if="phoneLoad == item.id" class="ld-spn" v-cloak><i class="fas fa-circle-notch"></i></div>
									</div>
								</div>
							</div>
						</div>
						<infinite-loading @infinite="infiniteHandler" ref="infiniteLoading" spinner="spiral">
							<span slot="no-more" class="inf-alrt alert alert-primary" role="alert">Увы, данных больше нет :(</span>
						</infinite-loading>
					</div>
				</div>
			</div>
		</div>
		<sidebar></sidebar>
	</div>
</template>

<script>
	const axios = require('axios');
	
    //923db9bcefa652ceae21b42b3dfccb93;
    module.exports = {
		data: function(){
			return {
				frontItems: [],
				loading: false,
				phoneLoad: false,
				thisPhone: '',
				offset: 0,
				limit: 5,
				filtr: 'id',
				sortAsc: false,
				sortId: true
			}
		},
		methods: {
			infiniteHandler($state) {
				
				var self = this;
				
				var api = 'http://api.idregion.kz/getlist?token=923db9bcefa652ceae21b42b3dfccb93';
				
				axios.get(`${'https://cors-anywhere.herokuapp.com/'}` + api, {
					params: {
						limit: self.limit,
						offset: self.offset,
					},
				}).then(function (response){
					
					if (response.data.length) {
						self.frontItems = self.frontItems.concat(response.data);
					
						self.offset = self.offset + self.limit;
						
						if(!self.sortId){
							let ascDesc = self.sortAsc ? 1 : -1;
							self.frontItems = self.frontItems.sort((a, b) => ascDesc * a.title.localeCompare(b.title));
						}
						
						$state.loaded();
						if (self.frontItems.length / 20 === 10) {
							$state.complete();
						}
					} else {
						$state.complete();
					}
				});
			},
			changeFilter() {
				var self = this;
				self.frontItems = [];
				self.offset = 0;
				
				
				if(self.filtr == 'desc') self.sortAsc = false;
				if(self.filtr == 'asc') self.sortAsc = true;
				if(self.filtr == 'desc' || self.filtr == 'asc'){
					self.sortId = false;
				}
				if(self.filtr == 'id'){
					self.sortAsc = false;
					self.sortId = true;
				} 
				
				self.$nextTick(() => {
					self.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
				});
			},
			phone: function (event, nid) {
				var self = this;
				self.phoneLoad = nid
				
				var phoneUrl = 'http://api.idregion.kz/getphone?token=923db9bcefa652ceae21b42b3dfccb93&nid=' + nid;
				axios.get(`${'https://cors-anywhere.herokuapp.com/'}` + phoneUrl)
				.then(function (response){
					self.phoneLoad = false
					
					var div,
						phones = ''
					div = document.getElementById("ts-tel-" + nid)
					if(div){
						response.data.forEach(function(element, index) {
							phones += "<a href=' tel:" + element + " '>" + element + "</a><br />";
						});
					}
					
					div.innerHTML = phones;
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