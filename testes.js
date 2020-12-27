var obj = {
	showContext: function showContext() {
		console.log(this)

		setTimeout(() => {
			this.log('after 1000ms')
		}, 1000)
	},
	log: function (value) {
		console.log(value)
	}
}

obj.log('dddd')
obj.showContext()


var obj = {

}

obj[prop] = 'dsd'