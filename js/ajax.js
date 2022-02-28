function ajax(option) {
	let xhr = new XMLHttpRequest();
	xhr.open(option.method, option.url);    //获取请求方法和地址
	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

	let dataStr = '';
	let strArr = [];
	for (let key in option.data) {
		strArr.push(key+'='+option.data[key]);
	}
	dataStr = strArr.join('&');

	for (let key in option.header) {
		xhr.setRequestHeader(key,option.header[key]);
	}
	xhr.send(dataStr);
	xhr.onreadystatechange = function () {
		if(xhr.readyState===4&&xhr.status===200) {
			option.callback(xhr);
		}
	}
}
