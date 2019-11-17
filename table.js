var i, j;
document.write("<table class=\"table1\">");
/*document.write("<tr><td></td><td></td><td style=\"text-align:center\">(4)<br>input<br>player<br>points</td><td style=\"text-align:center\" colspan=\"6\">(3) input team name</td></tr>");
document.write("<tr><td></td><td></td><td style=\"text-align:center\">↓</td>");
for(i=0;i<6;i++)
	document.write("<td style=\"text-align:center\">↓</td>");
document.write("</tr>");*/
switch (lang) {
	case 'eng':
		document.write("<tr><td style=\"text-align: right\" colspan=\"2\">team name trimmer <br> (available character: <br> A-Z, a-z, Japanese and number)</td><td style=\"text-align: center\">→</td>");
		for(i=1;i<=6;i++) {
			document.write("<td><input type=\"checkbox\" id=\"trim" +i+ "\" checked=\"checked\"></td>");
		}
		document.write("</tr>");
		document.write("<tr><th>player</th><th>name</th><th>pts</th>");
		for(i=1;i<=6;i++)
			document.write("<th><input type=\"text\" style=\"width:5em\" value=\"Team" +i+ "\" id=\"team" +i+ "\" tabindex=\"" +i+ "\"></th>");
		for(i=1;i<=12;i++) {
			document.write("<tr>");
    			document.write("<td>p" +i+ "</td>");
    			document.write("<td><canvas id=\"canvas" +i+ "\"></canvas></td>");
    			img_table(i);
    			document.write("<td><input type=\"text\" style=\"width:5em\" id=\"pts_p" +i+ "\" value=\""+i+"\" tabindex=\"" +(6+i)+ "\"></td>");
    			document.write("<td style=\"text-align: center\"><input type=\"radio\" name=\"team_p" +i+ "\"  value=\"1\" checked=\"checked\"></td>");
    			for(j=2;j<=6;j++)
    				document.write("<td style=\"text-align: center\"><input type=\"radio\" name=\"team_p" +i+ "\" value=\"" +j+ "\"></td>");
    			document.write("</tr>");
		}
		document.write("<tr><td></td><td><div style=\"text-align:right\">comment(optional)</div></td><td colspan=\"7\"><textarea id=\"comment\" style=\"width:100%\" rows=\"4\" tabindex=\"20\"></textarea></td></tr>");
		break;
	case 'jpn':
		document.write("<tr><td style=\"text-align: right\" colspan=\"2\">チーム名のトリミング <br> (対応文字:英語, 日本語, 数字)</td><td style=\"text-align: center\">→</td>");
		for(i=1;i<=6;i++) {
			document.write("<td><input type=\"checkbox\" id=\"trim" +i+ "\" checked=\"checked\"></td>");
		}
		document.write("</tr>");
		document.write("<tr><th>プレイヤー</th><th>名前</th><th>個人点</th>");
		for(i=1;i<=6;i++)
			document.write("<th><input type=\"text\" style=\"width:5em\" value=\"Team" +i+ "\" id=\"team" +i+ "\" tabindex=\"" +i+ "\"></th>");
		for(i=1;i<=12;i++) {
			document.write("<tr>");
    			document.write("<td>p" +i+ "</td>");
    			document.write("<td><canvas id=\"canvas" +i+ "\"></canvas></td>");
    			img_table(i);
    			document.write("<td><input type=\"text\" style=\"width:5em\" id=\"pts_p" +i+ "\" value=\""+i+"\" tabindex=\"" +(6+i)+ "\"></td>");
    			document.write("<td style=\"text-align: center\"><input type=\"radio\" name=\"team_p" +i+ "\"  value=\"1\" checked=\"checked\"></td>");
    			for(j=2;j<=6;j++)
    				document.write("<td style=\"text-align: center\"><input type=\"radio\" name=\"team_p" +i+ "\" value=\"" +j+ "\"></td>");
    			document.write("</tr>");
		}
		document.write("<tr><td></td><td><div style=\"text-align:right\">コメント(任意)</div></td><td colspan=\"7\"><textarea id=\"comment\" style=\"width:100%\" rows=\"4\" tabindex=\"20\"></textarea></td></tr>");
		break;
	default:
		break;
}
document.write("</table>");

function img_table(img_spot) {
	var file = document.getElementById('file');
	var canvas = document.getElementById('canvas'+String(img_spot));
	var canvasWidth = 180;
	var canvasHeight = 20;
	var uploadImgSrc;

	//	Canvasの準備
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	var ctx = canvas.getContext('2d');

	function loadLocalImage(e) {
		// ファイル情報を取得
		var fileData = e.target.files[0];

		// 画像ファイル以外は処理を止める
		if(!fileData.type.match('image.*')) {
			if(img_spot==1) alert('select image data');
			return;
		}

		// FileReaderオブジェクトを使ってファイル読み込み
		var reader = new FileReader();
		// ファイル読み込みに成功したときの処理
		reader.onload = function() {
			// Canvas上に表示する
			uploadImgSrc = reader.result;
			canvasDraw();
		}
		// ファイル読み込みを実行
		reader.readAsDataURL(fileData);
	}

	//	ファイルが指定された時にloadLocalImage()を実行
	file.addEventListener('change', loadLocalImage, false);

	//	Canvas上に画像を表示する
	function canvasDraw() {
		// canvas内の要素をクリアする
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		// Canvas上に画像を表示
		var img = new Image();
		img.src = uploadImgSrc;
		img.onload = function() {
			var img_width = img.naturalWidth;
			var img_height = img.naturalHeight;
			var imageStyle;
			for(p=0;p<2;p++){
				if(document.getElementsByName('imagestyle')[p].checked)
					imageStyle=p;
				}
			switch(imageStyle) {
			case 0:
				ctx.drawImage(img
						,img_width*0.525, 0.008*img_height+0.072*img_height*img_spot, img_width*0.26, 0.05*img_height
						, 0, 0, canvasWidth*0.85, canvasHeight);
				ctx.drawImage(img
						,img_width*0.91, 0.008*img_height+0.072*img_height*img_spot, img_width*0.045, 0.05*img_height
						, canvasWidth*0.85, 0, canvasWidth*0.15, canvasHeight);
				break;
			case 1:
				ctx.drawImage(img
						, img_width*0.11, 0.127*img_height+0.058*img_height*img_spot, img_width*0.35, 0.05*img_height
						, 0, 0, canvasWidth, canvasHeight);
				break;

			default:
				break;

			}
		}
	}
}
