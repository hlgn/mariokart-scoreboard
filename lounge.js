function converter() {
	var i, j;
	var error=0;

	input = document.getElementById('inputText').value

	if(input.split('!scoreboard').length < 2) {
		alert('syntax error: not found !scoreboard');
		error = 1;
	}
	type = input.split('!scoreboard ')[1][0];
	if (!error) {
		switch (type) {
		case 'f':
			members = input.split('!scoreboard ')[1].slice(4);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(' ');
			output = String('FFA - Free for All\n');
			link = String('FFA - Free for All%0A');
			for (i = 0; i < 12; i++) {
				output = output + member[i] + ' [] 0\n';
				link = link + member[i] + ' [] 0%0A';
			}
			break;
		case '6':
			members = input.split('!scoreboard ')[1].slice(2);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(' ');
			output = String('');
			link = String('');
			for (i = 0; i < 6; i++) {
				output = output + '\nTeam ' + (i + 1) + ' - .\n';
				link = link + '%0ATeam ' + (i + 1) + ' - .%0A';
				for (j = 0; j < 2; j++) {
					output = output + member[i * 2 + j] + ' [] 0\n';
					link = link + member[i * 2 + j] + ' [] 0%0A';
				}
			}
			break;
		case '4':
			members = input.split('!scoreboard ')[1].slice(2);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(' ');
			output = String('');
			link = String('');
			for (i = 0; i < 4; i++) {
				output = output + '\nTeam ' + (i + 1) + ' - .\n';
				link = link + '%0ATeam ' + (i + 1) + ' - .%0A';
				for (j = 0; j < 3; j++) {
					output = output + member[i * 3 + j] + ' [] 0\n';
					link = link + member[i * 3 + j] + ' [] 0%0A';
				}
			}
			break;
		case '3':
			members = input.split('!scoreboard ')[1].slice(2);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(' ');
			output = String('');
			link = String('');
			for (i = 0; i < 3; i++) {
				output = output + '\nTeam ' + (i + 1) + ' - .\n';
				link = link + '%0ATeam ' + (i + 1) + ' - .%0A';
				for (j = 0; j < 4; j++) {
					output = output + member[i * 4 + j] + ' [] 0\n';
					link = link + member[i * 4 + j] + ' [] 0%0A';
				}
			}
			break;
		default:
			alert('syntax error: not found the race format');
			error = 1;
			break;
		}
		if(member[11]==null && !error) {
			alert('syntax error: The number of players is less than 12');
			error = 1;
		}
	}

	if(!error) {
		//document.getElementById('outputText').value = output;
		document.getElementById('link').href='https://gb.hlorenzi.com/table?data='+link;
		window.location.href='https://gb.hlorenzi.com/table?data='+link;
	}
}
/*
function copy() {
	var textarea = document.getElementById('outputText');
	textarea.select();
	document.execCommand("copy");
	alert('クリップボードにコピーされました！')
}
 */
function loadExample() {
	document.getElementById('inputText').value = '**Poll Ended!**\n\n`1.` FFA - **3**\n`2.` 2v2 - **6**\n`3.` 3v3 - **1**\n`4.` 4v4 - **0**\n`5.` 6v6 - **0**\n`Winner` - **2v2**\n\n`Team 1`: Player1 Player2\n`Team 2`: Player3 Player4\n`Team 3`: Player5 Player6\n`Team 4`: Player7 Player8\n`Team 5`: Player9 Player10\n`Team 6`: Player11 Player12\n\nTable: `!scoreboard 6 Player1 Player2 Player3 Player4 Player5 Player6 Player7 Player8 Player9 Player10 Player11 Player12`'
}
