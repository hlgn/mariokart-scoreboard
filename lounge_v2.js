function converter() {
	var i, j;
	var error=0;

	input = document.getElementById('inputText').value;
	size = document.getElementById('size');

	if(input.split('!scoreboard').length < 2) {
		alert('syntax error: not found \"!scoreboard\"');
		error = 1;
	}
	type = input.split('!scoreboard ')[1].split(' ')[0];
	if (!error) {
		switch (type) {
		case 'ffa':
			members = input.split('!scoreboard ')[1].slice(4);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(/,\s*|\n+/);
			if (member[11].slice(-1) == '`')
				member[11] = member[11].slice(0, -1);
			output = String('\n');
			link = String('FFA - Free for All%0A');
			for (i = 0; i < 12; i++) {
				output = output + member[i] + ' [] 0\n';
				link = link + member[i] + ' [] 0%0A';
			}
			size.selectedIndex = 0;
			break;
		case '1':
			members = input.split('!scoreboard ')[1].slice(2);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(/,\s*|\n+/);
			if (member[11].slice(-1) == '`')
				member[11] = member[11].slice(0, -1);
			output = String('\n');
			link = String('FFA - Free for All%0A');
			for (i = 0; i < 12; i++) {
				output = output + member[i] + ' [] 0\n';
				link = link + member[i] + ' [] 0%0A';
			}
			size.selectedIndex = 0;
			break;
		case '12':
			members = input.split('!scoreboard ')[1].slice(3);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(/,\s*|\n+/);
			if (member[11].slice(-1) == '`')
				member[11] = member[11].slice(0, -1);
			output = String('\n');
			link = String('FFA - Free for All%0A');
			for (i = 0; i < 12; i++) {
				output = output + member[i] + ' [] 0\n';
				link = link + member[i] + ' [] 0%0A';
			}
			size.selectedIndex = 0;
			break;
		case '6':
			members = input.split('!scoreboard ')[1].slice(2);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(/,\s*|\n/);
			if (member[11].slice(-1) == '`')
				member[11] = member[11].slice(0, -1);
			output = String('');
			link = String('');
			for (i = 0; i < 6; i++) {
				output = output + '\n' + (i + 1) + '\n';
				link = link + '%0A' + (i + 1) + '%0A';
				for (j = 0; j < 2; j++) {
					output = output + member[i * 2 + j] + ' [] 0\n';
					link = link + member[i * 2 + j] + ' [] 0%0A';
				}
			}
			size.selectedIndex = 1;
			break;
		case '2v2':
			members = input.split('!scoreboard ')[1].slice(4);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(/,\s*|\n+/);
			if (member[11].slice(-1) == '`')
				member[11] = member[11].slice(0, -1);
			output = String('');
			link = String('');
			for (i = 0; i < 6; i++) {
				output = output + '\n' + (i + 1) + '\n';
				link = link + '%0A' + (i + 1) + '%0A';
				for (j = 0; j < 2; j++) {
					output = output + member[i * 2 + j] + ' [] 0\n';
					link = link + member[i * 2 + j] + ' [] 0%0A';
				}
			}
			size.selectedIndex = 1;
			break;
		case '4':
			members = input.split('!scoreboard ')[1].slice(2);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(/,\s*|\n+/);
			if (member[11].slice(-1) == '`')
				member[11] = member[11].slice(0, -1);
			output = String('');
			link = String('');
			for (i = 0; i < 4; i++) {
				output = output + '\n' + (i + 1) + '\n';
				link = link + '%0A' + (i + 1) + '%0A';
				for (j = 0; j < 3; j++) {
					output = output + member[i * 3 + j] + ' [] 0\n';
					link = link + member[i * 3 + j] + ' [] 0%0A';
				}
			}
			size.selectedIndex = 2;
			break;
		case '3v3':
			members = input.split('!scoreboard ')[1].slice(4);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(/,\s*|\n+/);
			if (member[11].slice(-1) == '`')
				member[11] = member[11].slice(0, -1);
			output = String('');
			link = String('');
			for (i = 0; i < 4; i++) {
				output = output + '\n' + (i + 1) + '\n';
				link = link + '%0A' + (i + 1) + '%0A';
				for (j = 0; j < 3; j++) {
					output = output + member[i * 3 + j] + ' [] 0\n';
					link = link + member[i * 3 + j] + ' [] 0%0A';
				}
			}
			size.selectedIndex = 2;
			break;
		case '3':
			members = input.split('!scoreboard ')[1].slice(2);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(/,\s*|\n+/);
			if (member[11].slice(-1) == '`')
				member[11] = member[11].slice(0, -1);
			output = String('');
			link = String('');
			for (i = 0; i < 3; i++) {
				output = output + '\n' + (i + 1) + '\n';
				link = link + '%0A' + (i + 1) + '%0A';
				for (j = 0; j < 4; j++) {
					output = output + member[i * 4 + j] + ' [] 0\n';
					link = link + member[i * 4 + j] + ' [] 0%0A';
				}
			}
			size.selectedIndex = 3;
			break;
		case '4v4':
			members = input.split('!scoreboard ')[1].slice(4);
			if (members.slice(-1) == '`')
				members = members.slice(0, -1);
			member = members.split(/,\s*|\n+/);
			if (member[11].slice(-1) == '`')
				member[11] = member[11].slice(0, -1);
			output = String('');
			link = String('');
			for (i = 0; i < 3; i++) {
				output = output + '\n' + (i + 1) + '\n';
				link = link + '%0A' + (i + 1) + '%0A';
				for (j = 0; j < 4; j++) {
					output = output + member[i * 4 + j] + ' [] 0\n';
					link = link + member[i * 4 + j] + ' [] 0%0A';
				}
			}
			size.selectedIndex = 3;
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
		document.getElementById('outputText').value = output;
		//document.getElementById('link').href='https://gb.hlorenzi.com/table?data='+link;
		//window.location.href='https://gb.hlorenzi.com/table?data='+link;
	}
}

function check() {
	output = document.getElementById('outputText').value;
	link = output.replace(/\n/g,'%0A').replace(/\+/g,'%2B');
	open("https://gb.hlorenzi.com/table?data="+link,"_blank");

}

function command() {
	total = 0;
	output = document.getElementById('outputText').value;
	size = document.getElementById('size').value;
	tier = document.getElementById('tier').value;
	ary = output.split('\n');
	ary2 = ary.filter(function(value){
		return value.indexOf('[]') != -1;
	});
	data = [];
	ary2.forEach(function(value){
		name = value.split('[]')[0];
		if(name.slice(-1) == ' '){
			name = name.slice(0,-1);
		}
		num = value.split('[]')[1];


		if(isNaN(num)){
			tmppts=0;
			pts=0;
			pORn=1;
			for(var a=0;a<num.length;a++){
				if(!isNaN(num.charAt(a))&&num.charAt(a)!=null&&num.charAt(a).indexOf(' ')!=0){//数値の時
					tmppts=tmppts*10+pORn*Number(num.charAt(a));
				} else if(num.charAt(a)=='+' || num.charAt(a)=='|' || num.charAt(a).indexOf(' ')==0){
					pts+=tmppts;
					tmppts=0;
					pORn=1;
				} else if(num.charAt(a)=='-'){
					pts+=tmppts;
					tmppts=0;
					pORn=-1;
				} else {
					alert('included \''+num.charAt(a)+'\' (in \"'+num+'\")\nYou can only use number, \'+\' and \'-\''+"\n"+'個人点の \"'+num+'\"の中に\''+num.charAt(a)+'\'が含まれています\n数字と \'+\'、 \'-\'のみを使用してください');
					return;
				}
			}
			pts+=tmppts;
		} else {
			pts=Number(num);
		}
		total += pts;

		data.push(name);
		data.push(pts);
	});
	data = data.map(function(value){
		return ' '+value;
	});
	document.getElementById('total').innerHTML = total
	if(total != 984){
		document.getElementById('totalAlert').innerHTML = '≠984';
	} else {
		document.getElementById('totalAlert').innerHTML = '';
	}
	//document.getElementById('commandText').value = '!submit table '+size+' '+tier+data;
	document.getElementById('commandText').value = '!submit '+size+' '+tier+document.getElementById('outputText').value
}



function copy() {
	var textarea = document.getElementById('commandText');
	textarea.select();
	document.execCommand("copy");
	alert('successfully coopied to clipboard!\nコピーされました!\n'+textarea.value)
}

function loadExample() {
	document.getElementById('inputText').value = '**Poll Ended!**\n\n`1.` FFA - **3**\n`2.` 2v2 - **6**\n`3.` 3v3 - **1**\n`4.` 4v4 - **0**\n`5.` 6v6 - **0**\n`Winner` - **2v2**\n\n`Team 1`: Player1 Player2\n`Team 2`: Player3 Player4\n`Team 3`: Player5 Player6\n`Team 4`: Player7 Player8\n`Team 5`: Player9 Player10\n`Team 6`: Player11 Player12\n\nTable: `!scoreboard 6 Player1, Player2, Player3, Player4, Player5, Player6, Player7, Player8, Player9, Player10, Player11, Player12`'
}
