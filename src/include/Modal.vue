<template>
	<div class="modal fade" id="authModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
			<div class="modal-content">
			  <div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Авторизация</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true">&times;</span>
				</button>
			  </div>
			  <div class="modal-body">
				<form>
				  <div class="form-group">
					<label for="exampleInputEmail1">Ваш логин</label>
					<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
				  </div>
				  <div class="form-group">
					<label for="exampleInputPassword1">Пароль</label>
					<input type="password" class="form-control" id="exampleInputPassword1">
				  </div>
				  <button type="submit" class="btn btn-primary">Войти</button>
				</form>
			  </div>
			</div>
		  </div>
		</div>
</template>