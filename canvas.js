var file = document.getElementById('file');
var canvas = document.getElementById('canvas_result');
var canvasWidth = 660;
var canvasHeight = 550;
var uploadImgSrc;
var selectfont="游ゴシック体";
var ptsString = new Array(12); //player's points(string)
var pts = new Array(12); //player's points(Number)
var rank = new Array(12); //player's rank
var maxplayer = new Array(12);
var team = new Array(12); //player's team
var teamname = new Array(6); //name of team x
var teamrank = new Array(6); // rank of team
var teampts = new Array(6); //pts of team x
var maxteam = new Array(6);
var displayed = new Array(12); //already displayed = 1, not yet = 0
var margin = new Array(12);
var dcplayer = new Array(3);


var today = new Date();
var style=0; //0:wa, 1:
/* color[style][x]
 * - x=
 * 0-6:header color,
 * 7:letter(table), 8:letter outline(table),
 * 9:letter(background), 10:letter outline(backgrounde)
 * 11:background, 12-14:table background */
var color = [
	['#3e546b', '#d5a02e', '#918d43', '#c1541c', '#e2b2c0', '#baaa52', '#1f8c90', '#000', '#000', '#fff', '#000', '#a9a9a9', '#f5f5f5', '#e8e8e8', '#d3d3d3'], //style:wa
	['#', '#', '#', '#', '#', '#','#','#','#','#','#','#','#','#']
	];

//Canvasの準備
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');

function loadLocalImage(e) {
	// ファイル情報を取得
	var fileData = e.target.files[0];

	// 画像ファイル以外は処理を止める
	if(!fileData.type.match('image.*')) {
		alert('画像を選択してください');
		return;
	}

	// FileReaderオブジェクトを使ってファイル読み込み
	var reader = new FileReader();
	// ファイル読み込みに成功したときの処理
	reader.onload = function() {
		// Canvas上に表示する
		uploadImgSrc = reader.result;
		document.getElementById("img_result").src = uploadImgSrc;
		//canvasDraw1();
	}
	// ファイル読み込みを実行
	reader.readAsDataURL(fileData);
}

//ファイルが指定された時にloadLocalImage()を実行
file.addEventListener('change', loadLocalImage, false);

//Canvas上に画像を表示する
function canvasDraw1() {
	var p, q, a, tmppts, pORn, infinite;
	var totalpts=0;
	var downloadLink = document.getElementById('download_link');
	var filename = 'mkr'+today.getFullYear()+(today.getMonth()+1)+today.getDate()+'.png';
	teampts = [0,0,0,0,0,0]; //initiallization of teampts
	//get elements by HTML
	var element_radio, imageStyle;
	for(p=0;p<2;p++){
		if(document.getElementsByName('imagestyle')[p].checked) {
			imageStyle=p;
		}
	}
	for(var p=0;p<12;p++) {
		ptsString[p] = document.getElementById('pts_p'+Number(p+1)).value;
		if(isNaN(ptsString[p])){
			tmppts=0;
			pts[p]=0;
			pORn=1;
			for(var a=0;a<ptsString[p].length;a++){
				if(!isNaN(ptsString[p].charAt(a))&&ptsString[p].charAt(a)!=null&&ptsString[p].charAt(a).indexOf(' ')!=0){//数値の時
					tmppts=tmppts*10+pORn*Number(ptsString[p].charAt(a));
				} else if(ptsString[p].charAt(a)=='+' || ptsString[p].charAt(a).indexOf(' ')==0){
					pts[p]+=tmppts;
					tmppts=0;
					pORn=1;
				} else if(ptsString[p].charAt(a)=='-'){
					pts[p]+=tmppts;
					tmppts=0;
					pORn=-1;
				} else {
					switch (lang) {
					case 'eng':
						alert('player'+(p+1)+' - pts\nincluded \''+ptsString[p].charAt(a)+'\' (in \"'+ptsString[p]+'\")\nYou can only use number, \'+\' and \'-\'');
						break;
					case 'jpn':
						alert('player'+(p+1)+'の個人点の \"'+ptsString[p]+'\"の中に\''+ptsString[p].charAt(a)+'\'が含まれています\n数字と \'+\'、 \'-\'のみを使用してください');
						break;
					}
					return;
				}
			}
			pts[p]+=tmppts;
		} else {
			pts[p]=Number(ptsString[p]);
		}
		element_radio = document.getElementsByName('team_p'+Number(p+1));
		for(var a=0; a<element_radio.length; a++){
			if(element_radio[a].checked)
				team[p] = a;
		}
		teampts[team[p]]+=pts[p];
		totalpts+=pts[p];
	}
	for(var p=0;p<3;p++) {
		dcplayer[p] = Number(document.getElementById('select'+Number(p)).selectedIndex)-1;
		if(dcplayer[p]!=-1) {
			teampts[team[dcplayer[p]]]-=pts[dcplayer[p]];
			totalpts-=pts[dcplayer[p]];
			ptsString[dcplayer[p]] = document.getElementById('dcpts_p'+Number(p)).value;
			if(isNaN(ptsString[dcplayer[p]])){
				tmppts=0;
				pts[dcplayer[p]]=0;
				pORn=1;
				for(var a=0;a<ptsString[dcplayer[p]].length;a++){
					if(!isNaN(ptsString[dcplayer[p]].charAt(a))&&ptsString[dcplayer[p]].charAt(a)!=null&&ptsString[dcplayer[p]].charAt(a).indexOf(' ')!=0){//数値の時
						tmppts=tmppts*10+pORn*Number(ptsString[dcplayer[p]].charAt(a));
					} else if(ptsString[dcplayer[p]].charAt(a)=='+' || ptsString[dcplayer[p]].charAt(a).indexOf(' ')==0){
						pts[dcplayer[p]]+=tmppts;
						tmppts=0;
						pORn=1;
					} else if(ptsString[dcplayer[p]].charAt(a)=='-'){
						pts[dcplayer[p]]+=tmppts;
						tmppts=0;
						pORn=-1;
					} else {
						switch (lang) {
						case 'eng':
							alert('player'+(dcplayer[p]+1)+' - pts\nincluded \''+ptsString[dcplayer[p]].charAt(a)+'\' (in \"'+ptsString[dcplayer[p]]+'\")\nYou can only use number, \'+\' and \'-\'');
							break;
						case 'jpn':
							alert('player'+(dcplayer[p]+1)+'の個人点の \"'+ptsString[dcplayer[p]]+'\"の中に\''+ptsString[dcplayer[p]].charAt(a)+'\'が含まれています\n数字と \'+\'、 \'-\'のみを使用してください');
							break;
						}
						return;
					}
				}
				pts[dcplayer[p]]+=tmppts;
			} else {
				pts[dcplayer[p]]=Number(ptsString[dcplayer[p]]);
			}
			element_radio = document.getElementsByName('dcteam_p'+Number(p));
			for(var a=0; a<element_radio.length; a++){
				if(element_radio[a].checked)
					team[dcplayer[p]] = a;
			}
			teampts[team[dcplayer[p]]]+=pts[dcplayer[p]];
			totalpts+=pts[dcplayer[p]];
		}
	}
	switch (lang) {
	case 'eng':
		if(totalpts%82==0) {
			if(totalpts/82==1) {
				document.getElementById('total').innerHTML=totalpts+"pts (12 players : "+(totalpts/82)+" race)";
			} else {
				document.getElementById('total').innerHTML=totalpts+"pts (12 players : "+(totalpts/82)+" races)";
			}
		} else {
			if(parseInt(totalpts/82)==0) {
				document.getElementById('total').innerHTML=totalpts+"pts (12 players : "+parseInt(totalpts/82+1)+" race<span style=\"color:red\"> - "+(82-totalpts%82)+" pts</span>)";
			} else {
				document.getElementById('total').innerHTML=totalpts+"pts (12 players : "+parseInt(totalpts/82+1)+" races<span style=\"color:red\"> - "+(82-totalpts%82)+" pts</span>)";
			}
		}
		break;
	case 'jpn':
		if(totalpts%82==0) {
			document.getElementById('total').innerHTML=totalpts+"点 (12人 : "+(totalpts/82)+"レース)";
		} else {
			document.getElementById('total').innerHTML=totalpts+"点 (12人 : "+parseInt(totalpts/82+1)+"レース<span style=\"color:red\"> - "+(82-totalpts%82)+"点</span>)";
		}
		break;
	}

	for(var p=0;p<6;p++){
		teamname[p] = document.getElementById('team'+Number(p+1)).value.trim();
		margin[p]=0;
		if(document.getElementById('trim'+Number(p+1)).checked && teamname[p]!='Team'+(p+1)) {
			margin[p]=marginChecker(teamname[p]);
		}
	}

	//player rank
	rank=[0,0,0,0,0,0,0,0,0,0,0,0];
	infinite=0;
	for(p=1;p<=12;infinite++){
		maxpts=-9999;
		maxplayer = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
		for(q=0;q<12;q++){
			if(rank[q]==0) {
				if(maxpts<pts[q]){
					maxpts=pts[q];
					maxplayer = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
					maxplayer[0]=q;
				} else if(maxpts==pts[q]) {
					for(r=0;maxplayer[r]!=-1;r++);
					maxplayer[r]=q;
				}
			}
		}
		for(q=0;q<12;q++){
			if(maxplayer[q]!=-1&&q==0) {
				rank[maxplayer[q]]=p+maxplayer[q]/100;
				p++;
			}
			else if(maxplayer[q]!=-1) {//Tie
				rank[maxplayer[q]]=parseInt(rank[maxplayer[0]], 10)+maxplayer[q]/100;
				p++;
			}
		}
		if(infinite>20){
			alert('error: infinite roop at \"rank\"');
			return;
		}

	}

	//team rank
	teamrank=[0,0,0,0,0,0];
	infinite=0;
	for(p=1;p<=6;infinite++){
		maxpts=-9999;
		maxteam = [-1,-1,-1,-1,-1,-1];
		for(q=0;q<6;q++){
			if(teamrank[q]==0) {
				if(maxpts<teampts[q]){
					maxpts=teampts[q];
					maxteam = [-1,-1,-1,-1,-1,-1];
					maxteam[0]=q;
				} else if(maxpts==teampts[q]) {
					for(r=0;maxteam[r]!=-1;r++);
					maxteam[r]=q;
				}
			}
		}
		for(q=0;q<6;q++){
			if(maxteam[q]!=-1&&q==0) {
				teamrank[maxteam[q]]=p+maxteam[q]/100;
				p++;
			}
			else if(maxteam[q]!=-1) {//Tie
				teamrank[maxteam[q]]=parseInt(teamrank[maxteam[0]], 10)+maxteam[q]/100;
				p++;
			}
		}
		if(infinite>20){
			alert('error: infinite roop at \"teamrank\"');
			return;
		}

	}


	// canvas内の要素をクリアする
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	// Canvas上に画像を表示
	var img = new Image();
	img.src = uploadImgSrc;
	img.onload = function() {

		var img_width = img.naturalWidth;
		var img_height = img.naturalHeight;
		ctx.fillStyle = color[style][11];
		ctx.fillRect(0, 0, canvasWidth, canvasHeight);

		ctx.fillStyle = color[style][0];
		ctx.fillRect(0, 0, 80, 30);
		ctx.fillStyle = color[style][1];
		ctx.fillRect(80, 0, 100, 30);
		ctx.fillStyle = color[style][2];
		ctx.fillRect(180, 0, 60, 30);
		ctx.fillStyle = color[style][3];
		ctx.fillRect(240, 0, 140, 30);
		ctx.fillStyle = color[style][4];
		ctx.fillRect(380, 0, 200, 30);
		ctx.fillStyle = color[style][5];
		ctx.fillRect(580, 0, 30, 30);
		ctx.fillStyle = color[style][6];
		ctx.fillRect(610, 0, 50, 30);

		addText();

		var drawVerticalLine = function() {
			ctx.strokeStyle = color[style][11];
			ctx.lineWidth = 2;

			//add vertical line(1)
			ctx.beginPath();
			ctx.moveTo(80, 30); //x=(team_rank+team_pts)/2
			ctx.lineTo(80, 450);
			ctx.closePath();
			ctx.stroke();
			//add vertical line(2)
			ctx.beginPath();
			ctx.moveTo(180, 30);
			ctx.lineTo(180, 450);
			ctx.closePath();
			ctx.stroke();
			//add vertical line(3)
			ctx.beginPath();
			ctx.moveTo(240, 30);
			ctx.lineTo(240, 450);
			ctx.closePath();
			ctx.stroke();
			//add vertical line(4)
			ctx.beginPath();
			ctx.moveTo(380, 30);
			ctx.lineTo(380, 450);
			ctx.closePath();
			ctx.stroke();

			//add vertical line(5)
			/*ctx.beginPath();
    		ctx.moveTo(577.5, 30);
    		ctx.lineTo(577.5, 450);
    		ctx.closePath();
    		ctx.stroke();
    		//add vertical line(6)
    		ctx.beginPath();
    		ctx.moveTo(((40+10)+(130+10))/2, 30);
    		ctx.lineTo(((40+10)+(130+10))/2, 450);
    		ctx.closePath();
    		ctx.stroke();*/
		}

		var drawHorizontalLine = function(t) {
			ctx.strokeStyle = color[style][11];
			ctx.lineWidth = 2;
			var spot_line=1+(t-1)*format;
			var nspot_line=1+t*format;

			//add team color
			switch(t%6){
			case 1:
				ctx.fillStyle = color[style][0];
				break;
			case 2:
				ctx.fillStyle = color[style][1];
				break;
			case 3:
				ctx.fillStyle = color[style][2];
				break;
			case 4:
				ctx.fillStyle = color[style][3];
				break;
			case 5:
				ctx.fillStyle = color[style][4];
				break;
			case 0:
				ctx.fillStyle = color[style][5];
				break;
			default:
				ctx.fillStyle = '#000';
			}
			ctx.fillRect(0, 37.5+35*(spot_line-1.5)+10, canvasWidth, 35*format);
			//add holizontal line
			ctx.beginPath();
			ctx.moveTo(0, 37.5+35*(spot_line-1.5)+10);
			if(t==1) ctx.lineTo(canvasWidth, 37.5+35*(spot_line-1.5)+10);
			else ctx.lineTo(canvasWidth, 37.5+35*(spot_line-1.5)+10);
			ctx.closePath();
			ctx.stroke();
		};

		var addTeam=function(s,previouspts){//チーム内で得点が高い人順に表示 チームの人数次第でチーム名、チーム点、線引きなど
			var display_player; //表示するプレイヤー
			var numofplayer=0; //num of player in this team
			var color1, color2;
			for(i=0;i<12;i++){
				if(team[i]==s) numofplayer++;
			}
			if(numofplayer){
				//add background
				/*ここで背景色をいれる*/
				if(numofteam%2==0) {
					color1=color[style][12];
					color2=color[style][13];
				} else {
					color1=color[style][13];
					color2=color[style][14];
				}
				ctx.fillStyle = color1;
				ctx.fillRect(0, 37.5+35*(player_spot-0.5)+10, 80, 35*numofplayer);
				ctx.fillStyle = color2;
				ctx.fillRect(80, 37.5+35*(player_spot-0.5)+10, 100, 35*numofplayer);
				ctx.fillStyle = color1;
				ctx.fillRect(180, 37.5+35*(player_spot-0.5)+10, 60, 35*numofplayer);
				ctx.fillStyle = color2;
				ctx.fillRect(240, 37.5+35*(player_spot-0.5)+10, 140, 35*numofplayer);
				ctx.fillStyle = color1;
				ctx.fillRect(380, 37.5+35*(player_spot-0.5)+10, 200, 35*numofplayer);
				ctx.fillStyle = color2;
				ctx.fillRect(580, 37.5+35*(player_spot-0.5)+10, 30, 35*numofplayer);
				ctx.fillStyle = color1;
				ctx.fillRect(610, 37.5+35*(player_spot-0.5)+10, 50, 35*numofplayer);
				//add team name, pts, diff_pts, holizontal line and rank
				ctx.textAlign = 'center';
				ctx.textBaseline = 'middle';
				//-add team name
				//ctx.font = "30px "+selectfont;
				if(numofplayer>=6) ctx.font = "38px "+selectfont;
				else ctx.font = (20+numofplayer*3)+"px "+selectfont;
				//ctx.font = "40px fantasy";
				ctx.fillStyle = color[style][7];
				ctx.fillText(teamname[s],310, 37.5+35*(2*player_spot+numofplayer-1)/2+10, 140);
				ctx.lineWidth = 0.75;
				ctx.strokeStyle = color[style][8];
				ctx.strokeText(teamname[s],310, 37.5+35*(2*player_spot+numofplayer-1)/2+10, 140);
				//-add team pts
				if(numofplayer>=6) ctx.font = "38px "+selectfont;
				else ctx.font = (20+numofplayer*3)+"px "+selectfont;
				ctx.fillStyle = color[style][7];
				ctx.fillText(teampts[s],130, 37.5+35*(2*player_spot+numofplayer-1)/2+10);
				ctx.lineWidth = 0.75;
				ctx.strokeStyle = color[style][8];
				ctx.strokeText(teampts[s],130, 37.5+35*(2*player_spot+numofplayer-1)/2+10);
				//-add team diff_pts and holizontal line
				if(numofplayer>=6) ctx.font = "26px "+selectfont;
				else ctx.font = (13+numofplayer*2)+"px "+selectfont;
				if(previouspts==-1) { //displayed top
					//--add diff_pts
					ctx.fillStyle = color[style][7];
					ctx.fillText('-',210, 37.5+35*(2*player_spot+numofplayer-1)/2+10);
					ctx.lineWidth = 0.75;
					ctx.strokeStyle = color[style][8];
					ctx.strokeText('-',210, 37.5+35*(2*player_spot+numofplayer-1)/2+10);
				} else {
					//--add diff_pts
					ctx.fillStyle = color[style][7];
					ctx.fillText(Number(teampts[s])-previouspts,210, 37.5+35*(2*player_spot+numofplayer-1)/2+10);
					ctx.lineWidth = 0.75;
					ctx.strokeStyle = color[style][8];
					ctx.strokeText(Number(teampts[s])-previouspts,210, 37.5+35*(2*player_spot+numofplayer-1)/2+10);
				}
				//-add team rank
				if(numofplayer>=6) ctx.font = "31px "+selectfont;
				else ctx.font = (16+numofplayer*2.5)+"px "+selectfont;
				if(parseInt(teamrank[s])==1) {
					ctx.fillStyle = '#dbb400'; //gold
					ctx.fillText(String(parseInt(teamrank[s]))+"st",40, 37.5+35*(2*player_spot+numofplayer-1)/2+10);
				}
				else if(parseInt(teamrank[s])==2) {
					ctx.fillStyle = '#c9caca'; //silver
					ctx.fillText(String(parseInt(teamrank[s]))+"nd",40, 37.5+35*(2*player_spot+numofplayer-1)/2+10);
				}
				else if(parseInt(teamrank[s])==3) {
					ctx.fillStyle = '#c47022'; //bronze
					ctx.fillText(String(parseInt(teamrank[s]))+"rd",40, 37.5+35*(2*player_spot+numofplayer-1)/2+10);
				}
				else {
					ctx.fillStyle = color[style][7];
					ctx.fillText(String(String(parseInt(teamrank[s])))+"th",40, 37.5+35*(2*player_spot+numofplayer-1)/2+10);
				}






				//in descending ordor
				for(i=0;i<12;i++){
					maxpts=-9999;
					display_player=-1;
					for(p=0;p<12;p++){
						if(team[p]==s && displayed[p]==0){
							if(maxpts<pts[p]) {
								maxpts=pts[p];
								display_player=p;
							}
						}

					}
					if(display_player!=-1) { //チーム内全員がすでに表示されていればスルー
						displayed[display_player]=1;


						addPts(player_spot,display_player); //team, rank
						if(margin[s]<0) {
							margin[s]=0;
						}
						//ここをimageStyleで変える!!!!!!!!!!!!!!!!!!!!!!!!!
						switch(imageStyle) {
						case 0:
							ctx.drawImage(img
									,img_width*0.527, 0.008*img_height+0.072*img_height*(display_player+1), img_width*0.255, 0.05*img_height
									,390,35+35*player_spot,180,25); //画像表示
							ctx.drawImage(img
									,img_width*(0.532+margin[s]), 0.008*img_height+0.072*img_height*(display_player+1), img_width*(0.255-margin[s]), 0.05*img_height
									,4+390,35+35*player_spot,180-canvasWidth*margin[s],25); //画像表示
							ctx.drawImage(img
									,img_width*0.712, 0.008*img_height+0.072*img_height*(display_player+1), img_width*0.03, 0.05*img_height
									,4+390+180*(1-0.075/0.255)-canvasWidth*margin[s],35+35*player_spot,180*(0.03/0.255)+canvasWidth*margin[s],25); //margin
							ctx.drawImage(img
									,img_width*0.742, 0.008*img_height+0.072*img_height*(display_player+1), img_width*0.045, 0.05*img_height
									,4+390+180*(1-0.045/0.255),35+35*player_spot,180*(0.045/0.255),25); //国旗
							for(var n=0; n<3; n++) {
								if(dcplayer[n]==display_player) {
									ctx.drawImage(img
											,img_width*0.712, 0.008*img_height+0.072*img_height*(display_player+1), img_width*0.03, 0.05*img_height
											,390,35+35*player_spot,184,25);
									ctx.textAlign = 'start';
									ctx.lineWidth = 1;
									var imagedata=ctx.getImageData(390,35+35*player_spot,184,25);
									if((imagedata.data[0]+imagedata.data[1]-imagedata.data[2])>380) {
										ctx.fillStyle = '#000';
									} else {
										ctx.fillStyle = '#fff';
									}
									ctx.fillText(document.getElementById('dcname'+n).value.trim(), 394, 35+12.5+35*player_spot, 180);
								}
							}
							break;

						case 1:
							ctx.drawImage(img
									,img_width*0.11, 0.127*img_height+0.058*img_height*(display_player+1), img_width*0.24, 0.05*img_height
									,390,35+35*player_spot,180-canvasWidth*margin[s]*1.1,25); //画像表示
							ctx.drawImage(img
									,img_width*(0.12+margin[s]*1.1), 0.127*img_height+0.058*img_height*(display_player+1), img_width*(0.24-margin[s]*1.1), 0.05*img_height
									,4+390,35+35*player_spot,180-canvasWidth*margin[s]*1.1,25); //画像表示
							ctx.drawImage(img
									,img_width*0.32, 0.127*img_height+0.058*img_height*(display_player+1), img_width*0.04, 0.05*img_height
									,4+540-canvasWidth*margin[s]*1.1,35+35*player_spot,30+canvasWidth*margin[s]*1.1,25); //margin
							for(var n=0; n<3; n++) {
								if(dcplayer[n]==display_player) {
									ctx.drawImage(img
											,img_width*0.32, 0.127*img_height+0.058*img_height*(display_player+1), img_width*0.04, 0.05*img_height
											,390,35+35*player_spot,184,25);
									ctx.textAlign = 'start';
									ctx.lineWidth = 1;
									var imagedata=ctx.getImageData(390,35+35*player_spot,184,25);
									if((imagedata.data[0]+imagedata.data[1]-imagedata.data[2])>380) {
										ctx.fillStyle = '#000';
									} else {
										ctx.fillStyle = '#fff';
										ctx.globalAlpha = 0.7;
									}
									ctx.fillText(document.getElementById('dcname'+n).value.trim(), 394, 35+12.5+35*player_spot, 180);
									ctx.globalAlpha = 1;
								}
							}
							break;

						default:
							break;



						}

						player_spot++;
					}
				}
			}
			return Number(teampts[s]);
		}

		var player_spot=0; //spot in table (considered team rank)
		var numofteam=0;
		displayed = [0,0,0,0,0,0,0,0,0,0,0,0]; //initialization of displayed stats
		ctx.fillStyle = '#f5f5f5';
		//ctx.fillRect(0, 30, canvasWidth, 420);
		previouspts=-1; //next higher rank team's points
		for(t=1;player_spot<12;t++) {
			for(s=0;s<6;s++){
				if(parseInt(teamrank[s])==t) {
					previouspts=addTeam(s,previouspts);
					numofteam++;
				}
			}
		}
	}
	var button = document.getElementById('download_button');
	button.addEventListener('click', function(){

		if (canvas.msToBlob) {
			var blob = canvas.msToBlob();
			window.navigator.msSaveBlob(blob, filename);
		} else {
			downloadLink.href = canvas.toDataURL('image/png');
			downloadLink.download = filename;
			downloadLink.click();
		}

	});
}

function addText() {
	//add header
	ctx.font = "15px "+selectfont;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = '#fff';
	ctx.fillText("team_rank" ,40, 15);
	ctx.fillText("team_pts" ,130, 15);
	ctx.fillText("diff_pts" ,210, 15);
	ctx.fillText("team_name" ,310, 15);
	ctx.fillText("name" ,480, 15);
	ctx.fillText("pts" ,595, 15);
	ctx.fillText("rank" ,635, 15);

	//add comment
	ctx.fillStyle = color[style][14];
	ctx.fillRect(100, 460, 550, 70);
	ctx.font = "15px "+selectfont;
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillStyle = color[style][7];
	ctx.fillText(document.getElementById('comment').value ,110, 470);

	//add date
	ctx.font = "20px "+selectfont;
	ctx.textAlign = 'right';
	ctx.textBaseline = 'bottom';
	ctx.fillStyle = '#fff';
	ctx.fillText(today.getFullYear()+"/"+(today.getMonth()+1)+"/"+today.getDate() ,canvasWidth, canvasHeight);
}

function addPts(ps,p) { //add player's pts and rank
	ctx.font = "15px "+selectfont;
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillStyle = '#000';
	ctx.lineWidth = 0.5;
	ctx.fillText(String(pts[p]),595, 37.5+35*ps+10);
	if(parseInt(rank[p])==1) {
		ctx.fillStyle = '#dbb400'; //gold
		ctx.fillText(String(parseInt(rank[p]))+"st",635, 37.5+35*ps+10);
	}
	else if(parseInt(rank[p])==2) {
		ctx.fillStyle = '#c9caca'; //silver
		ctx.fillText(String(parseInt(rank[p]))+"nd",635, 37.5+35*ps+10);
	}
	else if(parseInt(rank[p])==3) {
		ctx.fillStyle = '#c47022'; //bronze
		ctx.fillText(String(parseInt(rank[p]))+"rd",635, 37.5+35*ps+10);
	}
	else {
		ctx.fillStyle = color[style][7];
		ctx.fillText(String(String(parseInt(rank[p])))+"th",635, 37.5+35*ps+10);
	}
}

function marginChecker(str) {
	var m=0;
		switch(str) { //team name(string)
	case 'Zen':
		m=0.039;
		break;

	case 'ff':
	case 'ƒƒ':
	case 'fortissimo':
		m=0.021;
		break;

	case 'Krw':
	case 'Kяw':
		m=0.041;
		break;

	case 'ΓZ':
		m=0.035;
		break;

	default: //character
		for (a=0;a<str.length;a++) {
			if(str.charAt(a).match(/^[a-z]*$/)) {
				switch(str.charAt(a)) {
				case 'i':
				case 'l':
					m+=0.005;
					break;
				case 'j':
					m+=0.006;
					break;
				case 'f':
				case 't':
					m+=0.008;
					break;
				case 'r':
					m+=0.009;
					break;
				case 'k':
					m+=0.0115;
					break;
				case 'o':
				case 'p':
				case 'q':
					m+=0.0125;
					break;
				case 'w':
					m+=0.016;
					break;
				case 'm':
					m+=0.017;
					break;
				default:
					m+=0.0121;
				break;
				}
			} else if(str.charAt(a).match(/^[A-Z]*$/)) {
				switch(str.charAt(a)) {
				case 'I':
					m+=0.005;
					break;
				case 'F':
				case 'J':
				case 'L':
					m+=0.013;
					break;
				case 'T':
				case 'Y':
					m+=0.014;
					break;
				case 'H':
					m+=0.015;
					break;
				case 'Q':
					m+=0.0155;
					break;
				case 'O':
					m+=0.016;
					break;
				case 'M':
					m+=0.017;
					break;
				case 'W':
					m+=0.019;
					break;
				default:
					m+=0.0145;
				break;
				}
			} else if(str.charAt(a).match(/^[0-9]*$/)) {
				switch(str.charAt(a)) {
				case '1':
					m+=0.007;
				break;
				case '7':
					m+=0.013;
					break
				default:
					m+=0.014;
					break;
				}
			} else if(str.charAt(a).match(/^[あ-ー]*$/)) {
				m+=0.0175;
			} else {
				switch(str.charAt(a)) {
				case '‘':
				case '\'':
					m+=0.006;
					break;
				case '-':
					m+=0.008;
						break;
				default:
					m+=-9999;
					break;
				}
			}
		}
	break;
	}
	return m;
}
