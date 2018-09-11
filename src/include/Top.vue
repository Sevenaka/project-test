<template>
	<div>
		<div class="tp">
			<div class="row">
				<div class="col-6 col-sm-6 col-md-6 col-lg-8 col-xl-8">
					<div class="row" v-if="!mobile" v-cloak>
						<div class="col-lg-4 col-xl-4">
							<div class="itm">
								<i class="fas fa-map-marker-alt"></i>
								<p>
									+7 (7232) 246-47-18<br />
									г. Усть-Каменогорск
								</p>
								<div class="ln"></div>
							</div>
						</div>
						<div class="col-lg-4 col-xl-4">
							<div class="itm">
								<i class="fas fa-map-marker-alt"></i>
								<p>
									+7 (7232) 246-47-18<br />
									г. Алматы
								</p>
								<div class="ln"></div>
							</div>
						</div>
						<div class="col-lg-4 col-xl-4">
							<div class="itm">
								<i class="fas fa-map-marker-alt"></i>
								<p>
									+7 (7232) 246-47-18<br />
									г. Астана
								</p>
							</div>
						</div>
					</div>
					<div class="dropdown" v-if="mobile" v-cloak>
						<button class="btn btn-primary" type="button" id="mobileBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i class="fas fa-bars"></i>
						</button>
						<div class="dropdown-menu" aria-labelledby="mobileBtn">
							<a class="dropdown-item" href="tel:+7 (7232) 246-47-18">
								+7 (7232) 246-47-18<br />
								г. Усть-Каменогорск
							</a>
							<a class="dropdown-item" href="tel:+7 (7232) 246-47-18">
								+7 (7232) 246-47-18<br />
								г. Алматы
							</a>
							<a class="dropdown-item" href="tel:+7 (7232) 246-47-18">
								+7 (7232) 246-47-18<br />
								г. Астана
							</a>
						</div>
					</div>
				</div>
				<div class="col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
					<button  data-toggle="modal" data-target="#authModal" role="button" class="btn btn-primary"><i class="fas fa-user"></i> Вход</button >
				</div>
			</div>
		</div>
		<div class="head">
			<div class="row">
				<div class="col-sm-12 col-md-12 col-lg-5 col-xl-5">
					<router-link :to="{ name: 'front'}" class="mn-lg"><img src="/src/assets/images/lg.png"></router-link>
				</div>
				<div class="col-sm-12 col-md-12 col-lg-7 col-xl-7 mdl-inf">
					<div class="row">
						<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
							<div class="text">
								Республика Казахстан<br />
								Восточно-Казахстанская область<br />
								г. Усть-Каменогорск, <br />
								Набережная Славского, 14, 2 этаж
							</div>
						</div>
						<div class="col-sm-12 col-md-12 col-lg-6 col-xl-6">
							<div class="mdl"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    module.exports = {
		data: function(){
			return {
				windowWidth: 0,
				mobile: false
			}
		},
		mounted() {
			var self = this;
			self.$nextTick(function() {
				window.addEventListener('resize', self.getWindowWidth);
				self.getWindowWidth()
			})
		},
		methods: {
			getWindowWidth(event) {
				var self = this;
				self.windowWidth = document.documentElement.clientWidth;
				if(self.windowWidth >= 992){
					self.mobile = false
				}else{
					self.mobile = true
				}
			},
		},
		beforeDestroy() {
			var self = this;
			window.removeEventListener('resize', self.getWindowWidth);
		},
    }
</script>