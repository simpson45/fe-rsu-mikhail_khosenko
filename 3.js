function acc_menu(id){
	for(var i=1;i<5;i++){
		var menu = document.getElementById('menu_' + i).style;
		var header = document.getElementById('header_' + i).style;
		menu.display = 'none';
		header.background = "";
		header.color = "#567";
		header.borderRadius = "5px";
		if (i==id){
			menu.display = 'block';
			header.background = "skyblue";
			header.color = "#fff";
			header.borderRadius = "5px 5px 0 0";
		}
	}
}