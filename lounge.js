function converter() {
	var i, j;
	input = document.getElementById('inputText').value;
	type = input.split('!scoreboard ')[1][0];
	switch (type) {
	case 'f':
		members = input.split('!scoreboard ')[1].slice(4);
		if (members.slice(-1) == '`')
			members = members.slice(0, -1);
		alert(members);
		member = members.split(' ');
		output = String('FFA - Free for All\n');
		for (i = 0; i < 12; i++) {
			output = output + member[i] + ' [] 0\n';
		}
	case '6':
		members = input.split('!scoreboard ')[1].slice(2);
		if (members.slice(-1) == '`')
			members = members.slice(0, -1);
		member = members.split(' ');
		output = String('');
		for (i = 0; i < 6; i++) {
			output = output + '\nTeam ' + (i + 1) + ' - *\n';
			for (j = 0; j < 2; j++) {
				output = output + member[i * 2 + j] + ' [] 0\n';
			}
		}
		break;
	case '4':
		members = input.split('!scoreboard ')[1].slice(2);
		if (members.slice(-1) == '`')
			members = members.slice(0, -1);
		member = members.split(' ');
		output = String('');
		for (i = 0; i < 4; i++) {
			output = output + '\nTeam ' + (i + 1) + ' - *\n';
			for (j = 0; j < 3; j++) {
				output = output + member[i * 3 + j] + ' [] 0\n';
			}
		}
		break;
	case '3':
		members = input.split('!scoreboard ')[1].slice(2);
		if (members.slice(-1) == '`')
			members = members.slice(0, -1);
		member = members.split(' ');
		output = String('');
		for (i = 0; i < 3; i++) {
			output = output + '\nTeam ' + (i + 1) + ' - *\n';
			for (j = 0; j < 4; j++) {
				output = output + member[i * 4 + j] + ' [] 0\n';
			}
		}
		break;
	default:
		alert('error');
		break;
	}
	document.getElementById('outputText').value = output;
}
function copy() {
	var textarea = document.getElementById('outputText');
	textarea.select();
	document.execCommand("copy");
	alert('クリップボードにコピーされました！')
}