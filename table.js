var i, j;
document.write("<table class=\"table1\">");
switch (lang) {
	case 'eng':
		document.write("<tr><td style=\"text-align: right\" colspan=\"2\">team name trimmer <br> (available character: <br> A-Z, a-z, Japanese and number)</td><td style=\"text-align: center\">→</td>");
		for(i=1;i<=6;i++) {
			document.write("<td><label class=\"label_check\"><input type=\"checkbox\" class=\"check_eng\" id=\"trim" +i+ "\" checked=\"checked\"></label></td>");
		}
		document.write("</tr>");
		document.write("<tr><th>player</th><th>name</th><th>pts</th>");
		for(i=1;i<=6;i++)
			document.write("<th><input type=\"text\" class=\"tb_team\" value=\"Team" +i+ "\" id=\"team" +i+ "\" tabindex=\"" +i+ "\"></th>");
		for(i=1;i<=12;i++) {
			document.write("<tr>");
    			document.write("<td>p" +i+ "</td>");
    			document.write("<td><canvas class=\"canvas\" id=\"canvas" +i+ "\"></canvas></td>");
    			img_table(i);
    			document.write("<td><input type=\"text\" class=\"tb_pts\" id=\"pts_p" +i+ "\" tabindex=\"" +(6+i)+ "\"></td>");
    			document.write("<td><label class=\"label_radio\"><input type=\"radio\" name=\"team_p" +i+ "\"  value=\"1\" checked=\"checked\"></label></td>");
    			for(j=2;j<=6;j++)
    				document.write("<td><label class=\"label_radio\"><input type=\"radio\" name=\"team_p" +i+ "\" value=\"" +j+ "\"></label></td>");
    			document.write("</tr>");
		}
		document.write("<tr><td colspan=\"9\">↓ for disconnected player(CPU)</td></tr>");
		for(i=0;i<3;i++){
			document.write("<tr>");
			document.write("<td><select id=\"select"+i+"\">");
			document.write("<option value=\"0\">-</option>");
			for(j=1;j<=12;j++){
				document.write("<option value=\""+j+"\">p"+j+"</option>");
			}
			document.write("</select></td>");
			document.write("<td><input type=\"text\" id=dcname"+i+"></td>");
			document.write("<td><input type=\"text\" class=\"tb_pts\" id=\"dcpts_p" +i+ "\"></td>");
			document.write("<td><label class=\"label_radio\"><input type=\"radio\" name=\"dcteam_p" +i+ "\"  value=\"1\" checked=\"checked\"></label></td>");
			for(j=2;j<=6;j++)
				document.write("<td><label class=\"label_radio\"><input type=\"radio\" name=\"dcteam_p" +i+ "\" value=\"" +j+ "\"></label></td>");
			document.write("</tr>");
		}
		document.write("<tr><td></td><td><div style=\"text-align:right\">comment(optional)</div></td><td colspan=\"7\"><textarea id=\"comment\" class=\"tb_comment\" rows=\"4\" tabindex=\"20\"></textarea></td></tr>");
		break;
	case 'jpn':
		document.write("<tr><td style=\"text-align: right\" colspan=\"2\">チーム名のトリミング <br> (対応文字:英語, 日本語, 数字)</td><td style=\"text-align: center\">→</td>");
		for(i=1;i<=6;i++) {
			document.write("<td><label class=\"label_check\"><input type=\"checkbox\" class=\"check_jpn\" id=\"trim" +i+ "\" checked=\"checked\"></label></td>");
		}
		document.write("</tr>");
		document.write("<tr><th>プレイヤー</th><th>名前</th><th>個人点</th>");
		for(i=1;i<=6;i++)
			document.write("<th><input type=\"text\" class=\"tb_team\" value=\"Team" +i+ "\" id=\"team" +i+ "\" tabindex=\"" +i+ "\"></th>");
		for(i=1;i<=12;i++) {
			document.write("<tr>");
    			document.write("<td>p" +i+ "</td>");
    			document.write("<td><canvas class=\"canvas\" id=\"canvas" +i+ "\"></canvas></td>");
    			img_table(i);
    			document.write("<td><input type=\"text\" class=\"tb_pts\" id=\"pts_p" +i+ "\" tabindex=\"" +(6+i)+ "\"></td>");
    			document.write("<td><label class=\"label_radio\"><input type=\"radio\" name=\"team_p" +i+ "\"  value=\"1\" checked=\"checked\"></label></td>");
    			for(j=2;j<=6;j++)
    				document.write("<td><label class=\"label_radio\"><input type=\"radio\" name=\"team_p" +i+ "\" value=\"" +j+ "\"></label></td>");
    			document.write("</tr>");
		}
		document.write("<tr><td colspan=\"9\">↓ プレイヤー名のテキスト入力（回線落ち用）</td></tr>");
		for(i=0;i<3;i++){
			document.write("<tr>");
			document.write("<td><select id=\"select"+i+"\">");
			document.write("<option value=\"0\">-</option>");
			for(j=1;j<=12;j++){
				document.write("<option value=\""+j+"\">p"+j+"</option>");
			}
			document.write("</select></td>");
			document.write("<td><input type=\"text\" id=dcname"+i+"></td>");
			document.write("<td><input type=\"text\" class=\"tb_pts\" id=\"dcpts_p" +i+ "\"></td>");
			document.write("<td><label class=\"label_radio\"><input type=\"radio\" name=\"dcteam_p" +i+ "\"  value=\"1\" checked=\"checked\"></label></td>");
			for(j=2;j<=6;j++)
				document.write("<td><label class=\"label_radio\"><input type=\"radio\" name=\"dcteam_p" +i+ "\" value=\"" +j+ "\"></label></td>");
			document.write("</tr>");
		}
		document.write("<tr><td></td><td><div style=\"text-align:right\">コメント(任意)</div></td><td colspan=\"7\"><textarea id=\"comment\" class=\"tb_comment\" rows=\"4\" tabindex=\"20\"></textarea></td></tr>");
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
		console.log("e="+e.target.files[0]);
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
				/*
				 *
				 * OCR for player's points
				 *
				 */
				var ocrPts = 0;
				var rgbArray = new Array(21);
				var imagedata;
				/*
				 * 0:yellow or others
				 * 1-9:ones place
				 * 10-18:tens place
				 * 19,20:hundreds place
				 */

				ctx.drawImage(img
						,img_width*0.91, 0.008*img_height+0.0722*img_height*img_spot, img_width*0.045, 0.05*img_height
						, 0, 0, canvasWidth, canvasHeight);

				imagedata=ctx.getImageData(2, 2, 10, 10);
				if((imagedata.data[0]+imagedata.data[1]-imagedata.data[2])>380) {
					rgbArray[0]=1;
				} else {
					rgbArray[0]=0;
				}


		        imagedata = ctx.getImageData(150, 7, 8, 2);
		        rgbArray[1]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(150, 12.5, 8, 2);
		        rgbArray[2]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(127, 5.6, 15, 1);
		        rgbArray[3]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(133, 7, 6, 2);
		        rgbArray[4]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(127, 10.4, 15, 1);
		        rgbArray[5]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(133, 12.5, 6, 2);
		        rgbArray[6]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(127, 15.3, 15, 1);
		        rgbArray[7]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(115, 7, 8, 2);
		        rgbArray[8]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(115, 12.5, 8, 1);
		        rgbArray[9]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(95, 7, 7, 2);
		        rgbArray[10]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(95, 12.5, 7, 2);
		        rgbArray[11]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(74, 5.6, 15, 1);
		        rgbArray[12]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(78, 7, 6, 2);
		        rgbArray[13]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(74, 10.4, 15, 1);
		        rgbArray[14]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(78, 12.5, 6, 2);
		        rgbArray[15]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(74, 15.3, 15, 1);
		        rgbArray[16]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(61, 7, 7, 2);
		        rgbArray[17]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(61, 12.5, 7, 1);
		        rgbArray[18]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(25, 7, 5, 2);
		        rgbArray[19]=borderline(imageStyle, rgbArray[0], imagedata);

		        imagedata = ctx.getImageData(25, 12.5, 5, 2);
		        rgbArray[20]=borderline(imageStyle, rgbArray[0], imagedata);

		        if(rgbArray[4]==1&&rgbArray[6]==1) {
		        	rgbArray[3]=0;
		        	rgbArray[5]=0;
		        	rgbArray[7]=0;
		        }
		        if(rgbArray[13]==1&&rgbArray[15]==1) {
		        	rgbArray[12]=0;
		        	rgbArray[14]=0;
		        	rgbArray[16]=0;
		        }

		        console.log(img_spot+" : "+rgbArray);

		        switch (JSON.stringify(rgbArray.slice(1,10))) {
		        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
		        	ocrPts+=0;
		        	break;
		        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
		        	ocrPts+=1;
		        	break;
		        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
		        	ocrPts+=2;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
		        	ocrPts+=3;
		        	break;
		        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
		        	ocrPts+=4;
		        	break;
		        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
		        	ocrPts+=5;
		        	break;
		        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
		        	ocrPts+=6;
		        	break;
		        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
		        	ocrPts+=7;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
		        	ocrPts+=8;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
		        	ocrPts+=9;
		        	break;
		        default:
		        	ocrPts+=-9999;
		        	break;
		        }

		        switch (JSON.stringify(rgbArray.slice(10,19))) {
		        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
		        	ocrPts+=0;
		        	break;
		        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
		        	ocrPts+=10;
		        	break;
		        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
		        	ocrPts+=20;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
		        	ocrPts+=30;
		        	break;
		        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
		        	ocrPts+=40;
		        	break;
		        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
		        	ocrPts+=50;
		        	break;
		        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
		        	ocrPts+=60;
		        	break;
		        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
		        	ocrPts+=70;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
		        	ocrPts+=80;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
		        	ocrPts+=90;
		        	break;
		        default:
		        	ocrPts+=-9999;
		        	break;
		        }

		        switch (JSON.stringify(rgbArray.slice(19,21))) {
		        case JSON.stringify([0,0]):
		        	ocrPts+=0;
		        	break;
		        case JSON.stringify([1,1]):
		        	ocrPts+=100;
		        	break;
		        default:
		        	ocrPts+=-9999;
		        	break;
		        }
		        console.log(ocrPts);

		        if(ocrPts>=0) {
		        	document.getElementById("pts_p"+img_spot).value = ocrPts;
		        } else {
		        	document.getElementById("pts_p"+img_spot).value = "?";
		        }

		        ctx.drawImage(img
		        		,img_width*0.525, 0.008*img_height+0.0722*img_height*img_spot, img_width*0.26, 0.05*img_height
		        		, 0, 0, canvasWidth*0.85, canvasHeight);
		        ctx.drawImage(img
		        		,img_width*0.91, 0.008*img_height+0.0722*img_height*img_spot, img_width*0.045, 0.05*img_height
		        		, canvasWidth*0.85, 0, canvasWidth*0.15, canvasHeight);

				break;
			case 1:
				/*
				 *
				 * OCR for player's points
				 *
				 */
				var ocrPts = 0;
				var rgbArray = new Array(21);
				var totalRgbArray = new Array(21);totalRgbArray[0]=0;
				var border = new Array(0,0,0,0,0,0);
				var imagedata;
				/*
				 * 0:yellow or others
				 * 1-9:ones place
				 * 10-18:tens place
				 * 19,20:hundreds place
				 */


				ctx.drawImage(img
						, img_width*0.4051, 0.1257*img_height+0.05816*img_height*img_spot, img_width*0.0583, 0.05*img_height
						, 0, 0, canvasWidth, canvasHeight);

				imagedata=ctx.getImageData(2, 2, 10, 10);
				if((imagedata.data[0]+imagedata.data[1]-imagedata.data[2])>380) {
					rgbArray[0]=1;
				} else {
					rgbArray[0]=0;
				}

				if(rgbArray[0]==0) { //not yellow

					imagedata = ctx.getImageData(150, 6, 8, 2);
					totalRgbArray[1]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(150, 12.5, 8, 2);
					totalRgbArray[2]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(127, 3.5, 15, 1);
					totalRgbArray[3]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(133, 6, 6, 2);
					totalRgbArray[4]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(127, 9.75, 15, 1);
					totalRgbArray[5]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(133, 12.5, 6, 2);
					totalRgbArray[6]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(127, 16.5, 15, 1);
					totalRgbArray[7]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(115, 6, 8, 2);
					totalRgbArray[8]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(115, 12.5, 8, 1);
					totalRgbArray[9]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(95, 6, 7, 2);
					totalRgbArray[10]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(95, 12.5, 7, 2);
					totalRgbArray[11]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(74, 3.5, 15, 1);
					totalRgbArray[12]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(78, 6, 6, 2);
					totalRgbArray[13]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(74, 9.75, 15, 1);
					totalRgbArray[14]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(78, 12.5, 6, 2);
					totalRgbArray[15]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(74, 16.5, 15, 1);
					totalRgbArray[16]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(61, 6, 7, 2);
					totalRgbArray[17]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(61, 12.5, 7, 1);
					totalRgbArray[18]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(25, 6, 5, 2);
					totalRgbArray[19]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					imagedata = ctx.getImageData(25, 12.5, 5, 2);
					totalRgbArray[20]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

					function compareFunc(a,b) {
						return a-b;
					}
					var sortTotalRgbArray=totalRgbArray.slice(1).sort(compareFunc);
					console.log("sort="+sortTotalRgbArray);
					var maxDiff=0;

					/*
					ボーダーの決め方
					rgbの合計値を昇順にソートし、最も差が開いている隣り合った二値の平均をボーダーとする
					ただし、
					rgbの数値が大きいグループの最小値が350より大きく
					rgbの数値が小さいグループの最大値が480より小さくなるようにする。

					認識に失敗したとき:
					次に差が開いている隣り合った二値の平均をボーダーとする
					*/
					for(var k=0; k<19; k++) {
						if(350 < sortTotalRgbArray[k+1] && sortTotalRgbArray[k] < 480) {
							if(maxDiff<sortTotalRgbArray[k+1]-sortTotalRgbArray[k]) {
								maxDiff=sortTotalRgbArray[k+1]-sortTotalRgbArray[k];
								border[0]=(sortTotalRgbArray[k+1]+sortTotalRgbArray[k])/2;
							}
						}
					}
					console.log(img_spot+":::"+"border[0]="+border[0]+"->"+totalRgbArray);

					for(k=1; k<=20; k++){
						if(totalRgbArray[k]>border[0])
							rgbArray[k]=1;
						else
							rgbArray[k]=0;
					}
				} else { //yellow
					imagedata = ctx.getImageData(150, 6, 8, 2);
					rgbArray[1]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(150, 12.5, 8, 2);
					rgbArray[2]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(127, 3.5, 15, 1);
					rgbArray[3]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(133, 6, 6, 2);
					rgbArray[4]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(127, 9.75, 15, 1);
					rgbArray[5]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(133, 12.5, 6, 2);
					rgbArray[6]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(127, 16.5, 15, 1);
					rgbArray[7]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(115, 6, 8, 2);
					rgbArray[8]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(115, 12.5, 8, 1);
					rgbArray[9]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(95, 6, 7, 2);
					rgbArray[10]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(95, 12.5, 7, 2);
					rgbArray[11]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(74, 3.5, 15, 1);
					rgbArray[12]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(78, 6, 6, 2);
					rgbArray[13]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(74, 9.75, 15, 1);
					rgbArray[14]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(78, 12.5, 6, 2);
					rgbArray[15]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(74, 16.5, 15, 1);
					rgbArray[16]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(61, 6, 7, 2);
					rgbArray[17]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(61, 12.5, 7, 1);
					rgbArray[18]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(25, 6, 5, 2);
					rgbArray[19]=borderline(imageStyle, rgbArray[0], imagedata);

					imagedata = ctx.getImageData(25, 12.5, 5, 2);
					rgbArray[20]=borderline(imageStyle, rgbArray[0], imagedata);

				}

		        if(rgbArray[4]==1&&rgbArray[6]==1) {
		        	rgbArray[3]=0;
		        	rgbArray[5]=0;
		        	rgbArray[7]=0;
		        }
		        if(rgbArray[13]==1&&rgbArray[15]==1) {
		        	rgbArray[12]=0;
		        	rgbArray[14]=0;
		        	rgbArray[16]=0;
		        }

		        console.log(img_spot+" : "+rgbArray);

		        switch (JSON.stringify(rgbArray.slice(1,10))) {
		        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
		        case JSON.stringify([0,0,0,0,0,0,0,0,0]):
		        	ocrPts+=0;
		        	break;
		        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
		        	ocrPts+=1;
		        	break;
		        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
		        	ocrPts+=2;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
		        	ocrPts+=3;
		        	break;
		        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
		        	ocrPts+=4;
		        	break;
		        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
		        	ocrPts+=5;
		        	break;
		        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
		        	ocrPts+=6;
		        	break;
		        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
		        	ocrPts+=7;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
		        	ocrPts+=8;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
		        	ocrPts+=9;
		        	break;
		        default:
		        	ocrPts+=-9999;
		        	break;
		        }

		        switch (JSON.stringify(rgbArray.slice(10,19))) {
		        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
		        case JSON.stringify([0,0,0,0,0,0,0,0,0]):
		        	ocrPts+=0;
		        	break;
		        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
		        	ocrPts+=10;
		        	break;
		        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
		        	ocrPts+=20;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
		        	ocrPts+=30;
		        	break;
		        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
		        	ocrPts+=40;
		        	break;
		        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
		        	ocrPts+=50;
		        	break;
		        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
		        	ocrPts+=60;
		        	break;
		        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
		        	ocrPts+=70;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
		        	ocrPts+=80;
		        	break;
		        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
		        	ocrPts+=90;
		        	break;
		        default:
		        	ocrPts+=-9999;
		        	break;
		        }

		        switch (JSON.stringify(rgbArray.slice(19,21))) {
		        case JSON.stringify([0,0]):
		        	ocrPts+=0;
		        	break;
		        case JSON.stringify([1,1]):
		        	ocrPts+=100;
		        	break;
		        default:
		        	ocrPts+=-9999;
		        	break;
		        }
		        console.log(ocrPts);

		        if(ocrPts>=0) { //succeeded in OCR
		        	document.getElementById("pts_p"+img_spot).value = ocrPts;
		        } else { //failed in OCR -> reset order
		        	for(var m=1; m<6&&ocrPts<0; m++) {
		        		maxDiff=0;
		        		for(var k=0; k<19; k++) {
		        			if(350 < sortTotalRgbArray[k+1] && sortTotalRgbArray[k] < 500 && border.indexOf((sortTotalRgbArray[k+1]+sortTotalRgbArray[k])/2)==-1) {
		        				if(maxDiff<sortTotalRgbArray[k+1]-sortTotalRgbArray[k]) {
		        					maxDiff=sortTotalRgbArray[k+1]-sortTotalRgbArray[k];
		        					border[m]=(sortTotalRgbArray[k+1]+sortTotalRgbArray[k])/2;
		        				}
		        			}
		        		}
		        		console.log(img_spot+":::"+"border[m]="+border[m]+"->"+totalRgbArray);

		        		for(k=1; k<=20; k++){
		        			if(totalRgbArray[k]>border[m])
		        				rgbArray[k]=1;
		        			else
		        				rgbArray[k]=0;
		        		}


		        		if(rgbArray[4]==1&&rgbArray[6]==1) {
		        			rgbArray[3]=0;
		        			rgbArray[5]=0;
		        			rgbArray[7]=0;
		        		}
		        		if(rgbArray[13]==1&&rgbArray[15]==1) {
		        			rgbArray[12]=0;
		        			rgbArray[14]=0;
		        			rgbArray[16]=0;
		        		}

		        		console.log(img_spot+" : "+rgbArray);

		        		ocrPts = 0;

		        		switch (JSON.stringify(rgbArray.slice(1,10))) {
		        		case JSON.stringify([1,1,1,0,0,0,1,1,1]):
		        		case JSON.stringify([0,0,0,0,0,0,0,0,0]):
		        			ocrPts+=0;
		        		break;
		        		case JSON.stringify([0,0,0,1,0,1,0,0,0]):
		        			ocrPts+=1;
		        		break;
		        		case JSON.stringify([1,0,1,0,1,0,1,0,1]):
		        			ocrPts+=2;
		        		break;
		        		case JSON.stringify([1,1,1,0,1,0,1,0,0]):
		        			ocrPts+=3;
		        		break;
		        		case JSON.stringify([1,1,0,0,1,0,0,1,0]):
		        			ocrPts+=4;
		        		break;
		        		case JSON.stringify([0,1,1,0,1,0,1,1,0]):
		        			ocrPts+=5;
		        		break;
		        		case JSON.stringify([0,1,1,0,1,0,1,1,1]):
		        			ocrPts+=6;
		        		break;
		        		case JSON.stringify([1,1,1,0,0,0,0,0,0]):
		        			ocrPts+=7;
		        		break;
		        		case JSON.stringify([1,1,1,0,1,0,1,1,1]):
		        			ocrPts+=8;
		        		break;
		        		case JSON.stringify([1,1,1,0,1,0,1,1,0]):
		        			ocrPts+=9;
		        		break;
		        		default:
		        			ocrPts+=-9999;
		        		break;
		        		}

		        		switch (JSON.stringify(rgbArray.slice(10,19))) {
		        		case JSON.stringify([1,1,1,0,0,0,1,1,1]):
		        		case JSON.stringify([0,0,0,0,0,0,0,0,0]):
		        			ocrPts+=0;
		        		break;
		        		case JSON.stringify([0,0,0,1,0,1,0,0,0]):
		        			ocrPts+=10;
		        		break;
		        		case JSON.stringify([1,0,1,0,1,0,1,0,1]):
		        			ocrPts+=20;
		        		break;
		        		case JSON.stringify([1,1,1,0,1,0,1,0,0]):
		        			ocrPts+=30;
		        		break;
		        		case JSON.stringify([1,1,0,0,1,0,0,1,0]):
		        			ocrPts+=40;
		        		break;
		        		case JSON.stringify([0,1,1,0,1,0,1,1,0]):
		        			ocrPts+=50;
		        		break;
		        		case JSON.stringify([0,1,1,0,1,0,1,1,1]):
		        			ocrPts+=60;
		        		break;
		        		case JSON.stringify([1,1,1,0,0,0,0,0,0]):
		        			ocrPts+=70;
		        		break;
		        		case JSON.stringify([1,1,1,0,1,0,1,1,1]):
		        			ocrPts+=80;
		        		break;
		        		case JSON.stringify([1,1,1,0,1,0,1,1,0]):
		        			ocrPts+=90;
		        		break;
		        		default:
		        			ocrPts+=-9999;
		        		break;
		        		}

		        		switch (JSON.stringify(rgbArray.slice(19,21))) {
		        		case JSON.stringify([0,0]):
		        			ocrPts+=0;
		        		break;
		        		case JSON.stringify([1,1]):
		        			ocrPts+=100;
		        		break;
		        		default:
		        			ocrPts+=-9999;
		        		break;
		        		}
		        		console.log(ocrPts);

		        		if(ocrPts>=0) {
		        			document.getElementById("pts_p"+img_spot).value = ocrPts;
		        		}
		        	}
		        }
		        if(ocrPts<0)
		        	document.getElementById("pts_p"+img_spot).value = "?";
				ctx.drawImage(img
						, img_width*0.11, 0.127*img_height+0.058*img_height*img_spot, img_width*0.35, 0.05*img_height
						, 0, 0, canvasWidth, canvasHeight);
				break;

			default:
				break;


			}
		}
	}
	function borderline(imageStyle, y, imagedata) {
		console.log("r="+imagedata.data[0]+"g="+imagedata.data[1]+"b="+imagedata.data[2]+"rgb="+Number(Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2])));
		if(y==0) {
			if(imageStyle==0) { //imageStyle:race
				if(Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2])>500) {
					return 1; //white
				} else {
					return 0; //others
				}
			} else { //imageStyle:final

				if(Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2])>400) {
					return 1; //white
				} else {
					return 0; //others
				}
			}
		} else {
			if(Number(imagedata.data[0])+Number(imagedata.data[1])<380) {
				return 1; //black
			} else {
				return 0;
			}
		}
	}
}


window.onload = function() {
	var checkOption = document.getElementsByName('imagestyle');
	checkOption.forEach(function(e) {
		e.addEventListener("click", function(){
			for(var i=1; i<=12; i++){
				img_table1(i);
			}
			function img_table1(img_spot) {
				var file = document.getElementById('file');
				var canvas = document.getElementById('canvas'+String(img_spot));
				var canvasWidth = 180;
				var canvasHeight = 20;
				var uploadImgSrc;


				//	Canvasの準備
				canvas.width = canvasWidth;
				canvas.height = canvasHeight;
				var ctx = canvas.getContext('2d');

				function loadLocalImage(file1) {
					// ファイル情報を取得
					//var fileData = e.target.files[0];
					var fileData = file1.files[0];
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
				//file.addEventListener('change', loadLocalImage, false);
				loadLocalImage(file);

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
							/*
							 *
							 * OCR for player's points
							 *
							 */
							var ocrPts = 0;
							var rgbArray = new Array(21);
							var imagedata;
							/*
							 * 0:yellow or others
							 * 1-9:ones place
							 * 10-18:tens place
							 * 19,20:hundreds place
							 */

							ctx.drawImage(img
									,img_width*0.91, 0.008*img_height+0.0722*img_height*img_spot, img_width*0.045, 0.05*img_height
									, 0, 0, canvasWidth, canvasHeight);

							imagedata=ctx.getImageData(2, 2, 10, 10);
							if((imagedata.data[0]+imagedata.data[1]-imagedata.data[2])>380) {
								rgbArray[0]=1;
							} else {
								rgbArray[0]=0;
							}


					        imagedata = ctx.getImageData(150, 7, 8, 2);
					        rgbArray[1]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(150, 12.5, 8, 2);
					        rgbArray[2]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(127, 5.6, 15, 1);
					        rgbArray[3]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(133, 7, 6, 2);
					        rgbArray[4]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(127, 10.4, 15, 1);
					        rgbArray[5]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(133, 12.5, 6, 2);
					        rgbArray[6]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(127, 15.3, 15, 1);
					        rgbArray[7]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(115, 7, 8, 2);
					        rgbArray[8]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(115, 12.5, 8, 1);
					        rgbArray[9]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(95, 7, 7, 2);
					        rgbArray[10]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(95, 12.5, 7, 2);
					        rgbArray[11]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(74, 5.6, 15, 1);
					        rgbArray[12]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(78, 7, 6, 2);
					        rgbArray[13]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(74, 10.4, 15, 1);
					        rgbArray[14]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(78, 12.5, 6, 2);
					        rgbArray[15]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(74, 15.3, 15, 1);
					        rgbArray[16]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(61, 7, 7, 2);
					        rgbArray[17]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(61, 12.5, 7, 1);
					        rgbArray[18]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(25, 7, 5, 2);
					        rgbArray[19]=borderline(imageStyle, rgbArray[0], imagedata);

					        imagedata = ctx.getImageData(25, 12.5, 5, 2);
					        rgbArray[20]=borderline(imageStyle, rgbArray[0], imagedata);

					        if(rgbArray[4]==1&&rgbArray[6]==1) {
					        	rgbArray[3]=0;
					        	rgbArray[5]=0;
					        	rgbArray[7]=0;
					        }
					        if(rgbArray[13]==1&&rgbArray[15]==1) {
					        	rgbArray[12]=0;
					        	rgbArray[14]=0;
					        	rgbArray[16]=0;
					        }

					        console.log(img_spot+" : "+rgbArray);

					        switch (JSON.stringify(rgbArray.slice(1,10))) {
					        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
					        	ocrPts+=0;
					        	break;
					        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
					        	ocrPts+=1;
					        	break;
					        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
					        	ocrPts+=2;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
					        	ocrPts+=3;
					        	break;
					        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
					        	ocrPts+=4;
					        	break;
					        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
					        	ocrPts+=5;
					        	break;
					        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
					        	ocrPts+=6;
					        	break;
					        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
					        	ocrPts+=7;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
					        	ocrPts+=8;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
					        	ocrPts+=9;
					        	break;
					        default:
					        	ocrPts+=-9999;
					        	break;
					        }

					        switch (JSON.stringify(rgbArray.slice(10,19))) {
					        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
					        	ocrPts+=0;
					        	break;
					        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
					        	ocrPts+=10;
					        	break;
					        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
					        	ocrPts+=20;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
					        	ocrPts+=30;
					        	break;
					        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
					        	ocrPts+=40;
					        	break;
					        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
					        	ocrPts+=50;
					        	break;
					        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
					        	ocrPts+=60;
					        	break;
					        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
					        	ocrPts+=70;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
					        	ocrPts+=80;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
					        	ocrPts+=90;
					        	break;
					        default:
					        	ocrPts+=-9999;
					        	break;
					        }

					        switch (JSON.stringify(rgbArray.slice(19,21))) {
					        case JSON.stringify([0,0]):
					        	ocrPts+=0;
					        	break;
					        case JSON.stringify([1,1]):
					        	ocrPts+=100;
					        	break;
					        default:
					        	ocrPts+=-9999;
					        	break;
					        }
					        console.log(ocrPts);

					        if(ocrPts>=0) {
					        	document.getElementById("pts_p"+img_spot).value = ocrPts;
					        } else {
					        	document.getElementById("pts_p"+img_spot).value = "?";
					        }

					        ctx.drawImage(img
					        		,img_width*0.525, 0.008*img_height+0.0722*img_height*img_spot, img_width*0.26, 0.05*img_height
					        		, 0, 0, canvasWidth*0.85, canvasHeight);
					        ctx.drawImage(img
					        		,img_width*0.91, 0.008*img_height+0.0722*img_height*img_spot, img_width*0.045, 0.05*img_height
					        		, canvasWidth*0.85, 0, canvasWidth*0.15, canvasHeight);

							break;
						case 1:
							/*
							 *
							 * OCR for player's points
							 *
							 */
							var ocrPts = 0;
							var rgbArray = new Array(21);
							var totalRgbArray = new Array(21);totalRgbArray[0]=0;
							var border = new Array(0,0,0,0,0,0);
							var imagedata;
							/*
							 * 0:yellow or others
							 * 1-9:ones place
							 * 10-18:tens place
							 * 19,20:hundreds place
							 */


							ctx.drawImage(img
									, img_width*0.4051, 0.1257*img_height+0.05816*img_height*img_spot, img_width*0.0583, 0.05*img_height
									, 0, 0, canvasWidth, canvasHeight);

							imagedata=ctx.getImageData(2, 2, 10, 10);
							if((imagedata.data[0]+imagedata.data[1]-imagedata.data[2])>380) {
								rgbArray[0]=1;
							} else {
								rgbArray[0]=0;
							}

							if(rgbArray[0]==0) { //not yellow

								imagedata = ctx.getImageData(150, 6, 8, 2);
								totalRgbArray[1]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(150, 12.5, 8, 2);
								totalRgbArray[2]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(127, 3.5, 15, 1);
								totalRgbArray[3]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(133, 6, 6, 2);
								totalRgbArray[4]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(127, 9.75, 15, 1);
								totalRgbArray[5]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(133, 12.5, 6, 2);
								totalRgbArray[6]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(127, 16.5, 15, 1);
								totalRgbArray[7]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(115, 6, 8, 2);
								totalRgbArray[8]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(115, 12.5, 8, 1);
								totalRgbArray[9]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(95, 6, 7, 2);
								totalRgbArray[10]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(95, 12.5, 7, 2);
								totalRgbArray[11]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(74, 3.5, 15, 1);
								totalRgbArray[12]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(78, 6, 6, 2);
								totalRgbArray[13]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(74, 9.75, 15, 1);
								totalRgbArray[14]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(78, 12.5, 6, 2);
								totalRgbArray[15]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(74, 16.5, 15, 1);
								totalRgbArray[16]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(61, 6, 7, 2);
								totalRgbArray[17]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(61, 12.5, 7, 1);
								totalRgbArray[18]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(25, 6, 5, 2);
								totalRgbArray[19]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								imagedata = ctx.getImageData(25, 12.5, 5, 2);
								totalRgbArray[20]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

								function compareFunc(a,b) {
									return a-b;
								}
								var sortTotalRgbArray=totalRgbArray.slice(1).sort(compareFunc);
								console.log("sort="+sortTotalRgbArray);
								var maxDiff=0;

								/*
								ボーダーの決め方
								rgbの合計値を昇順にソートし、最も差が開いている隣り合った二値の平均をボーダーとする
								ただし、
								rgbの数値が大きいグループの最小値が350より大きく
								rgbの数値が小さいグループの最大値が480より小さくなるようにする。

								認識に失敗したとき:
								次に差が開いている隣り合った二値の平均をボーダーとする
								*/
								for(var k=0; k<19; k++) {
									if(350 < sortTotalRgbArray[k+1] && sortTotalRgbArray[k] < 480) {
										if(maxDiff<sortTotalRgbArray[k+1]-sortTotalRgbArray[k]) {
											maxDiff=sortTotalRgbArray[k+1]-sortTotalRgbArray[k];
											border[0]=(sortTotalRgbArray[k+1]+sortTotalRgbArray[k])/2;
										}
									}
								}
								console.log(img_spot+":::"+"border[0]="+border[0]+"->"+totalRgbArray);

								for(k=1; k<=20; k++){
									if(totalRgbArray[k]>border[0])
										rgbArray[k]=1;
									else
										rgbArray[k]=0;
								}
							} else { //yellow
								imagedata = ctx.getImageData(150, 6, 8, 2);
								rgbArray[1]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(150, 12.5, 8, 2);
								rgbArray[2]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(127, 3.5, 15, 1);
								rgbArray[3]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(133, 6, 6, 2);
								rgbArray[4]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(127, 9.75, 15, 1);
								rgbArray[5]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(133, 12.5, 6, 2);
								rgbArray[6]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(127, 16.5, 15, 1);
								rgbArray[7]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(115, 6, 8, 2);
								rgbArray[8]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(115, 12.5, 8, 1);
								rgbArray[9]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(95, 6, 7, 2);
								rgbArray[10]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(95, 12.5, 7, 2);
								rgbArray[11]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(74, 3.5, 15, 1);
								rgbArray[12]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(78, 6, 6, 2);
								rgbArray[13]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(74, 9.75, 15, 1);
								rgbArray[14]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(78, 12.5, 6, 2);
								rgbArray[15]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(74, 16.5, 15, 1);
								rgbArray[16]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(61, 6, 7, 2);
								rgbArray[17]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(61, 12.5, 7, 1);
								rgbArray[18]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(25, 6, 5, 2);
								rgbArray[19]=borderline(imageStyle, rgbArray[0], imagedata);

								imagedata = ctx.getImageData(25, 12.5, 5, 2);
								rgbArray[20]=borderline(imageStyle, rgbArray[0], imagedata);

							}

					        if(rgbArray[4]==1&&rgbArray[6]==1) {
					        	rgbArray[3]=0;
					        	rgbArray[5]=0;
					        	rgbArray[7]=0;
					        }
					        if(rgbArray[13]==1&&rgbArray[15]==1) {
					        	rgbArray[12]=0;
					        	rgbArray[14]=0;
					        	rgbArray[16]=0;
					        }

					        console.log(img_spot+" : "+rgbArray);

					        switch (JSON.stringify(rgbArray.slice(1,10))) {
					        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
					        case JSON.stringify([0,0,0,0,0,0,0,0,0]):
					        	ocrPts+=0;
					        	break;
					        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
					        	ocrPts+=1;
					        	break;
					        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
					        	ocrPts+=2;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
					        	ocrPts+=3;
					        	break;
					        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
					        	ocrPts+=4;
					        	break;
					        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
					        	ocrPts+=5;
					        	break;
					        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
					        	ocrPts+=6;
					        	break;
					        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
					        	ocrPts+=7;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
					        	ocrPts+=8;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
					        	ocrPts+=9;
					        	break;
					        default:
					        	ocrPts+=-9999;
					        	break;
					        }

					        switch (JSON.stringify(rgbArray.slice(10,19))) {
					        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
					        case JSON.stringify([0,0,0,0,0,0,0,0,0]):
					        	ocrPts+=0;
					        	break;
					        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
					        	ocrPts+=10;
					        	break;
					        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
					        	ocrPts+=20;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
					        	ocrPts+=30;
					        	break;
					        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
					        	ocrPts+=40;
					        	break;
					        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
					        	ocrPts+=50;
					        	break;
					        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
					        	ocrPts+=60;
					        	break;
					        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
					        	ocrPts+=70;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
					        	ocrPts+=80;
					        	break;
					        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
					        	ocrPts+=90;
					        	break;
					        default:
					        	ocrPts+=-9999;
					        	break;
					        }

					        switch (JSON.stringify(rgbArray.slice(19,21))) {
					        case JSON.stringify([0,0]):
					        	ocrPts+=0;
					        	break;
					        case JSON.stringify([1,1]):
					        	ocrPts+=100;
					        	break;
					        default:
					        	ocrPts+=-9999;
					        	break;
					        }
					        console.log(ocrPts);

					        if(ocrPts>=0) { //succeeded in OCR
					        	document.getElementById("pts_p"+img_spot).value = ocrPts;
					        } else { //failed in OCR -> reset order
					        	for(var m=1; m<6&&ocrPts<0; m++) {
					        		maxDiff=0;
					        		for(var k=0; k<19; k++) {
					        			if(350 < sortTotalRgbArray[k+1] && sortTotalRgbArray[k] < 500 && border.indexOf((sortTotalRgbArray[k+1]+sortTotalRgbArray[k])/2)==-1) {
					        				if(maxDiff<sortTotalRgbArray[k+1]-sortTotalRgbArray[k]) {
					        					maxDiff=sortTotalRgbArray[k+1]-sortTotalRgbArray[k];
					        					border[m]=(sortTotalRgbArray[k+1]+sortTotalRgbArray[k])/2;
					        				}
					        			}
					        		}
					        		console.log(img_spot+":::"+"border[m]="+border[m]+"->"+totalRgbArray);

					        		for(k=1; k<=20; k++){
					        			if(totalRgbArray[k]>border[m])
					        				rgbArray[k]=1;
					        			else
					        				rgbArray[k]=0;
					        		}


					        		if(rgbArray[4]==1&&rgbArray[6]==1) {
					        			rgbArray[3]=0;
					        			rgbArray[5]=0;
					        			rgbArray[7]=0;
					        		}
					        		if(rgbArray[13]==1&&rgbArray[15]==1) {
					        			rgbArray[12]=0;
					        			rgbArray[14]=0;
					        			rgbArray[16]=0;
					        		}

					        		console.log(img_spot+" : "+rgbArray);

					        		ocrPts = 0;

					        		switch (JSON.stringify(rgbArray.slice(1,10))) {
					        		case JSON.stringify([1,1,1,0,0,0,1,1,1]):
					        		case JSON.stringify([0,0,0,0,0,0,0,0,0]):
					        			ocrPts+=0;
					        		break;
					        		case JSON.stringify([0,0,0,1,0,1,0,0,0]):
					        			ocrPts+=1;
					        		break;
					        		case JSON.stringify([1,0,1,0,1,0,1,0,1]):
					        			ocrPts+=2;
					        		break;
					        		case JSON.stringify([1,1,1,0,1,0,1,0,0]):
					        			ocrPts+=3;
					        		break;
					        		case JSON.stringify([1,1,0,0,1,0,0,1,0]):
					        			ocrPts+=4;
					        		break;
					        		case JSON.stringify([0,1,1,0,1,0,1,1,0]):
					        			ocrPts+=5;
					        		break;
					        		case JSON.stringify([0,1,1,0,1,0,1,1,1]):
					        			ocrPts+=6;
					        		break;
					        		case JSON.stringify([1,1,1,0,0,0,0,0,0]):
					        			ocrPts+=7;
					        		break;
					        		case JSON.stringify([1,1,1,0,1,0,1,1,1]):
					        			ocrPts+=8;
					        		break;
					        		case JSON.stringify([1,1,1,0,1,0,1,1,0]):
					        			ocrPts+=9;
					        		break;
					        		default:
					        			ocrPts+=-9999;
					        		break;
					        		}

					        		switch (JSON.stringify(rgbArray.slice(10,19))) {
					        		case JSON.stringify([1,1,1,0,0,0,1,1,1]):
					        		case JSON.stringify([0,0,0,0,0,0,0,0,0]):
					        			ocrPts+=0;
					        		break;
					        		case JSON.stringify([0,0,0,1,0,1,0,0,0]):
					        			ocrPts+=10;
					        		break;
					        		case JSON.stringify([1,0,1,0,1,0,1,0,1]):
					        			ocrPts+=20;
					        		break;
					        		case JSON.stringify([1,1,1,0,1,0,1,0,0]):
					        			ocrPts+=30;
					        		break;
					        		case JSON.stringify([1,1,0,0,1,0,0,1,0]):
					        			ocrPts+=40;
					        		break;
					        		case JSON.stringify([0,1,1,0,1,0,1,1,0]):
					        			ocrPts+=50;
					        		break;
					        		case JSON.stringify([0,1,1,0,1,0,1,1,1]):
					        			ocrPts+=60;
					        		break;
					        		case JSON.stringify([1,1,1,0,0,0,0,0,0]):
					        			ocrPts+=70;
					        		break;
					        		case JSON.stringify([1,1,1,0,1,0,1,1,1]):
					        			ocrPts+=80;
					        		break;
					        		case JSON.stringify([1,1,1,0,1,0,1,1,0]):
					        			ocrPts+=90;
					        		break;
					        		default:
					        			ocrPts+=-9999;
					        		break;
					        		}

					        		switch (JSON.stringify(rgbArray.slice(19,21))) {
					        		case JSON.stringify([0,0]):
					        			ocrPts+=0;
					        		break;
					        		case JSON.stringify([1,1]):
					        			ocrPts+=100;
					        		break;
					        		default:
					        			ocrPts+=-9999;
					        		break;
					        		}
					        		console.log(ocrPts);

					        		if(ocrPts>=0) {
					        			document.getElementById("pts_p"+img_spot).value = ocrPts;
					        		}
					        	}
					        }
					        if(ocrPts<0)
					        	document.getElementById("pts_p"+img_spot).value = "?";
							ctx.drawImage(img
									, img_width*0.11, 0.127*img_height+0.058*img_height*img_spot, img_width*0.35, 0.05*img_height
									, 0, 0, canvasWidth, canvasHeight);
							break;

						default:
							break;


						}
					}
				}
				function borderline(imageStyle, y, imagedata) {
					console.log("r="+imagedata.data[0]+"g="+imagedata.data[1]+"b="+imagedata.data[2]+"rgb="+Number(Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2])));
					if(y==0) {
						if(imageStyle==0) { //imageStyle:race
							if(Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2])>500) {
								return 1; //white
							} else {
								return 0; //others
							}
						} else { //imageStyle:final

							if(Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2])>400) {
								return 1; //white
							} else {
								return 0; //others
							}
						}
					} else {
						if(Number(imagedata.data[0])+Number(imagedata.data[1])<380) {
							return 1; //black
						} else {
							return 0;
						}
					}
				}
			}
		});
	});
}




function reload() {
	for(var i=1; i<=12; i++){
		img_table1(i);
	}
	function img_table1(img_spot) {
		var file = document.getElementById('file');
		var canvas = document.getElementById('canvas'+String(img_spot));
		var canvasWidth = 180;
		var canvasHeight = 20;
		var uploadImgSrc;


		//	Canvasの準備
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		var ctx = canvas.getContext('2d');

		function loadLocalImage(file1) {
			// ファイル情報を取得
			//var fileData = e.target.files[0];
			var fileData = file1.files[0];
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
		//file.addEventListener('change', loadLocalImage, false);
		loadLocalImage(file);

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
					/*
					 *
					 * OCR for player's points
					 *
					 */
					var ocrPts = 0;
					var rgbArray = new Array(21);
					var imagedata;
					/*
					 * 0:yellow or others
					 * 1-9:ones place
					 * 10-18:tens place
					 * 19,20:hundreds place
					 */

					ctx.drawImage(img
							,img_width*0.91, 0.008*img_height+0.0722*img_height*img_spot, img_width*0.045, 0.05*img_height
							, 0, 0, canvasWidth, canvasHeight);

					imagedata=ctx.getImageData(2, 2, 10, 10);
					if((imagedata.data[0]+imagedata.data[1]-imagedata.data[2])>380) {
						rgbArray[0]=1;
					} else {
						rgbArray[0]=0;
					}


			        imagedata = ctx.getImageData(150, 7, 8, 2);
			        rgbArray[1]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(150, 12.5, 8, 2);
			        rgbArray[2]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(127, 5.6, 15, 1);
			        rgbArray[3]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(133, 7, 6, 2);
			        rgbArray[4]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(127, 10.4, 15, 1);
			        rgbArray[5]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(133, 12.5, 6, 2);
			        rgbArray[6]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(127, 15.3, 15, 1);
			        rgbArray[7]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(115, 7, 8, 2);
			        rgbArray[8]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(115, 12.5, 8, 1);
			        rgbArray[9]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(95, 7, 7, 2);
			        rgbArray[10]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(95, 12.5, 7, 2);
			        rgbArray[11]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(74, 5.6, 15, 1);
			        rgbArray[12]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(78, 7, 6, 2);
			        rgbArray[13]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(74, 10.4, 15, 1);
			        rgbArray[14]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(78, 12.5, 6, 2);
			        rgbArray[15]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(74, 15.3, 15, 1);
			        rgbArray[16]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(61, 7, 7, 2);
			        rgbArray[17]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(61, 12.5, 7, 1);
			        rgbArray[18]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(25, 7, 5, 2);
			        rgbArray[19]=borderline(imageStyle, rgbArray[0], imagedata);

			        imagedata = ctx.getImageData(25, 12.5, 5, 2);
			        rgbArray[20]=borderline(imageStyle, rgbArray[0], imagedata);

			        if(rgbArray[4]==1&&rgbArray[6]==1) {
			        	rgbArray[3]=0;
			        	rgbArray[5]=0;
			        	rgbArray[7]=0;
			        }
			        if(rgbArray[13]==1&&rgbArray[15]==1) {
			        	rgbArray[12]=0;
			        	rgbArray[14]=0;
			        	rgbArray[16]=0;
			        }

			        console.log(img_spot+" : "+rgbArray);

			        switch (JSON.stringify(rgbArray.slice(1,10))) {
			        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
			        	ocrPts+=0;
			        	break;
			        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
			        	ocrPts+=1;
			        	break;
			        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
			        	ocrPts+=2;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
			        	ocrPts+=3;
			        	break;
			        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
			        	ocrPts+=4;
			        	break;
			        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
			        	ocrPts+=5;
			        	break;
			        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
			        	ocrPts+=6;
			        	break;
			        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
			        	ocrPts+=7;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
			        	ocrPts+=8;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
			        	ocrPts+=9;
			        	break;
			        default:
			        	ocrPts+=-9999;
			        	break;
			        }

			        switch (JSON.stringify(rgbArray.slice(10,19))) {
			        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
			        	ocrPts+=0;
			        	break;
			        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
			        	ocrPts+=10;
			        	break;
			        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
			        	ocrPts+=20;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
			        	ocrPts+=30;
			        	break;
			        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
			        	ocrPts+=40;
			        	break;
			        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
			        	ocrPts+=50;
			        	break;
			        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
			        	ocrPts+=60;
			        	break;
			        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
			        	ocrPts+=70;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
			        	ocrPts+=80;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
			        	ocrPts+=90;
			        	break;
			        default:
			        	ocrPts+=-9999;
			        	break;
			        }

			        switch (JSON.stringify(rgbArray.slice(19,21))) {
			        case JSON.stringify([0,0]):
			        	ocrPts+=0;
			        	break;
			        case JSON.stringify([1,1]):
			        	ocrPts+=100;
			        	break;
			        default:
			        	ocrPts+=-9999;
			        	break;
			        }
			        console.log(ocrPts);

			        if(ocrPts>=0) {
			        	document.getElementById("pts_p"+img_spot).value = ocrPts;
			        } else {
			        	document.getElementById("pts_p"+img_spot).value = "?";
			        }

			        ctx.drawImage(img
			        		,img_width*0.525, 0.008*img_height+0.0722*img_height*img_spot, img_width*0.26, 0.05*img_height
			        		, 0, 0, canvasWidth*0.85, canvasHeight);
			        ctx.drawImage(img
			        		,img_width*0.91, 0.008*img_height+0.0722*img_height*img_spot, img_width*0.045, 0.05*img_height
			        		, canvasWidth*0.85, 0, canvasWidth*0.15, canvasHeight);

					break;
				case 1:
					/*
					 *
					 * OCR for player's points
					 *
					 */
					var ocrPts = 0;
					var rgbArray = new Array(21);
					var totalRgbArray = new Array(21);totalRgbArray[0]=0;
					var border = new Array(0,0,0,0,0,0);
					var imagedata;
					/*
					 * 0:yellow or others
					 * 1-9:ones place
					 * 10-18:tens place
					 * 19,20:hundreds place
					 */


					ctx.drawImage(img
							, img_width*0.4051, 0.1257*img_height+0.05816*img_height*img_spot, img_width*0.0583, 0.05*img_height
							, 0, 0, canvasWidth, canvasHeight);

					imagedata=ctx.getImageData(2, 2, 10, 10);
					if((imagedata.data[0]+imagedata.data[1]-imagedata.data[2])>380) {
						rgbArray[0]=1;
					} else {
						rgbArray[0]=0;
					}

					if(rgbArray[0]==0) { //not yellow

						imagedata = ctx.getImageData(150, 6, 8, 2);
						totalRgbArray[1]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(150, 12.5, 8, 2);
						totalRgbArray[2]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(127, 3.5, 15, 1);
						totalRgbArray[3]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(133, 6, 6, 2);
						totalRgbArray[4]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(127, 9.75, 15, 1);
						totalRgbArray[5]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(133, 12.5, 6, 2);
						totalRgbArray[6]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(127, 16.5, 15, 1);
						totalRgbArray[7]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(115, 6, 8, 2);
						totalRgbArray[8]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(115, 12.5, 8, 1);
						totalRgbArray[9]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(95, 6, 7, 2);
						totalRgbArray[10]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(95, 12.5, 7, 2);
						totalRgbArray[11]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(74, 3.5, 15, 1);
						totalRgbArray[12]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(78, 6, 6, 2);
						totalRgbArray[13]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(74, 9.75, 15, 1);
						totalRgbArray[14]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(78, 12.5, 6, 2);
						totalRgbArray[15]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(74, 16.5, 15, 1);
						totalRgbArray[16]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(61, 6, 7, 2);
						totalRgbArray[17]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(61, 12.5, 7, 1);
						totalRgbArray[18]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(25, 6, 5, 2);
						totalRgbArray[19]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						imagedata = ctx.getImageData(25, 12.5, 5, 2);
						totalRgbArray[20]=Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2]);

						function compareFunc(a,b) {
							return a-b;
						}
						var sortTotalRgbArray=totalRgbArray.slice(1).sort(compareFunc);
						console.log("sort="+sortTotalRgbArray);
						var maxDiff=0;

						/*
						ボーダーの決め方
						rgbの合計値を昇順にソートし、最も差が開いている隣り合った二値の平均をボーダーとする
						ただし、
						rgbの数値が大きいグループの最小値が350より大きく
						rgbの数値が小さいグループの最大値が480より小さくなるようにする。

						認識に失敗したとき:
						次に差が開いている隣り合った二値の平均をボーダーとする
						*/
						for(var k=0; k<19; k++) {
							if(350 < sortTotalRgbArray[k+1] && sortTotalRgbArray[k] < 480) {
								if(maxDiff<sortTotalRgbArray[k+1]-sortTotalRgbArray[k]) {
									maxDiff=sortTotalRgbArray[k+1]-sortTotalRgbArray[k];
									border[0]=(sortTotalRgbArray[k+1]+sortTotalRgbArray[k])/2;
								}
							}
						}
						console.log(img_spot+":::"+"border[0]="+border[0]+"->"+totalRgbArray);

						for(k=1; k<=20; k++){
							if(totalRgbArray[k]>border[0])
								rgbArray[k]=1;
							else
								rgbArray[k]=0;
						}
					} else { //yellow
						imagedata = ctx.getImageData(150, 6, 8, 2);
						rgbArray[1]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(150, 12.5, 8, 2);
						rgbArray[2]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(127, 3.5, 15, 1);
						rgbArray[3]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(133, 6, 6, 2);
						rgbArray[4]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(127, 9.75, 15, 1);
						rgbArray[5]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(133, 12.5, 6, 2);
						rgbArray[6]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(127, 16.5, 15, 1);
						rgbArray[7]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(115, 6, 8, 2);
						rgbArray[8]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(115, 12.5, 8, 1);
						rgbArray[9]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(95, 6, 7, 2);
						rgbArray[10]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(95, 12.5, 7, 2);
						rgbArray[11]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(74, 3.5, 15, 1);
						rgbArray[12]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(78, 6, 6, 2);
						rgbArray[13]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(74, 9.75, 15, 1);
						rgbArray[14]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(78, 12.5, 6, 2);
						rgbArray[15]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(74, 16.5, 15, 1);
						rgbArray[16]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(61, 6, 7, 2);
						rgbArray[17]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(61, 12.5, 7, 1);
						rgbArray[18]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(25, 6, 5, 2);
						rgbArray[19]=borderline(imageStyle, rgbArray[0], imagedata);

						imagedata = ctx.getImageData(25, 12.5, 5, 2);
						rgbArray[20]=borderline(imageStyle, rgbArray[0], imagedata);

					}

			        if(rgbArray[4]==1&&rgbArray[6]==1) {
			        	rgbArray[3]=0;
			        	rgbArray[5]=0;
			        	rgbArray[7]=0;
			        }
			        if(rgbArray[13]==1&&rgbArray[15]==1) {
			        	rgbArray[12]=0;
			        	rgbArray[14]=0;
			        	rgbArray[16]=0;
			        }

			        console.log(img_spot+" : "+rgbArray);

			        switch (JSON.stringify(rgbArray.slice(1,10))) {
			        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
			        case JSON.stringify([0,0,0,0,0,0,0,0,0]):
			        	ocrPts+=0;
			        	break;
			        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
			        	ocrPts+=1;
			        	break;
			        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
			        	ocrPts+=2;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
			        	ocrPts+=3;
			        	break;
			        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
			        	ocrPts+=4;
			        	break;
			        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
			        	ocrPts+=5;
			        	break;
			        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
			        	ocrPts+=6;
			        	break;
			        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
			        	ocrPts+=7;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
			        	ocrPts+=8;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
			        	ocrPts+=9;
			        	break;
			        default:
			        	ocrPts+=-9999;
			        	break;
			        }

			        switch (JSON.stringify(rgbArray.slice(10,19))) {
			        case JSON.stringify([1,1,1,0,0,0,1,1,1]):
			        case JSON.stringify([0,0,0,0,0,0,0,0,0]):
			        	ocrPts+=0;
			        	break;
			        case JSON.stringify([0,0,0,1,0,1,0,0,0]):
			        	ocrPts+=10;
			        	break;
			        case JSON.stringify([1,0,1,0,1,0,1,0,1]):
			        	ocrPts+=20;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,0,0]):
			        	ocrPts+=30;
			        	break;
			        case JSON.stringify([1,1,0,0,1,0,0,1,0]):
			        	ocrPts+=40;
			        	break;
			        case JSON.stringify([0,1,1,0,1,0,1,1,0]):
			        	ocrPts+=50;
			        	break;
			        case JSON.stringify([0,1,1,0,1,0,1,1,1]):
			        	ocrPts+=60;
			        	break;
			        case JSON.stringify([1,1,1,0,0,0,0,0,0]):
			        	ocrPts+=70;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,1,1]):
			        	ocrPts+=80;
			        	break;
			        case JSON.stringify([1,1,1,0,1,0,1,1,0]):
			        	ocrPts+=90;
			        	break;
			        default:
			        	ocrPts+=-9999;
			        	break;
			        }

			        switch (JSON.stringify(rgbArray.slice(19,21))) {
			        case JSON.stringify([0,0]):
			        	ocrPts+=0;
			        	break;
			        case JSON.stringify([1,1]):
			        	ocrPts+=100;
			        	break;
			        default:
			        	ocrPts+=-9999;
			        	break;
			        }
			        console.log(ocrPts);

			        if(ocrPts>=0) { //succeeded in OCR
			        	document.getElementById("pts_p"+img_spot).value = ocrPts;
			        } else { //failed in OCR -> reset order
			        	for(var m=1; m<6&&ocrPts<0; m++) {
			        		maxDiff=0;
			        		for(var k=0; k<19; k++) {
			        			if(350 < sortTotalRgbArray[k+1] && sortTotalRgbArray[k] < 500 && border.indexOf((sortTotalRgbArray[k+1]+sortTotalRgbArray[k])/2)==-1) {
			        				if(maxDiff<sortTotalRgbArray[k+1]-sortTotalRgbArray[k]) {
			        					maxDiff=sortTotalRgbArray[k+1]-sortTotalRgbArray[k];
			        					border[m]=(sortTotalRgbArray[k+1]+sortTotalRgbArray[k])/2;
			        				}
			        			}
			        		}
			        		console.log(img_spot+":::"+"border[m]="+border[m]+"->"+totalRgbArray);

			        		for(k=1; k<=20; k++){
			        			if(totalRgbArray[k]>border[m])
			        				rgbArray[k]=1;
			        			else
			        				rgbArray[k]=0;
			        		}


			        		if(rgbArray[4]==1&&rgbArray[6]==1) {
			        			rgbArray[3]=0;
			        			rgbArray[5]=0;
			        			rgbArray[7]=0;
			        		}
			        		if(rgbArray[13]==1&&rgbArray[15]==1) {
			        			rgbArray[12]=0;
			        			rgbArray[14]=0;
			        			rgbArray[16]=0;
			        		}

			        		console.log(img_spot+" : "+rgbArray);

			        		ocrPts = 0;

			        		switch (JSON.stringify(rgbArray.slice(1,10))) {
			        		case JSON.stringify([1,1,1,0,0,0,1,1,1]):
			        		case JSON.stringify([0,0,0,0,0,0,0,0,0]):
			        			ocrPts+=0;
			        		break;
			        		case JSON.stringify([0,0,0,1,0,1,0,0,0]):
			        			ocrPts+=1;
			        		break;
			        		case JSON.stringify([1,0,1,0,1,0,1,0,1]):
			        			ocrPts+=2;
			        		break;
			        		case JSON.stringify([1,1,1,0,1,0,1,0,0]):
			        			ocrPts+=3;
			        		break;
			        		case JSON.stringify([1,1,0,0,1,0,0,1,0]):
			        			ocrPts+=4;
			        		break;
			        		case JSON.stringify([0,1,1,0,1,0,1,1,0]):
			        			ocrPts+=5;
			        		break;
			        		case JSON.stringify([0,1,1,0,1,0,1,1,1]):
			        			ocrPts+=6;
			        		break;
			        		case JSON.stringify([1,1,1,0,0,0,0,0,0]):
			        			ocrPts+=7;
			        		break;
			        		case JSON.stringify([1,1,1,0,1,0,1,1,1]):
			        			ocrPts+=8;
			        		break;
			        		case JSON.stringify([1,1,1,0,1,0,1,1,0]):
			        			ocrPts+=9;
			        		break;
			        		default:
			        			ocrPts+=-9999;
			        		break;
			        		}

			        		switch (JSON.stringify(rgbArray.slice(10,19))) {
			        		case JSON.stringify([1,1,1,0,0,0,1,1,1]):
			        		case JSON.stringify([0,0,0,0,0,0,0,0,0]):
			        			ocrPts+=0;
			        		break;
			        		case JSON.stringify([0,0,0,1,0,1,0,0,0]):
			        			ocrPts+=10;
			        		break;
			        		case JSON.stringify([1,0,1,0,1,0,1,0,1]):
			        			ocrPts+=20;
			        		break;
			        		case JSON.stringify([1,1,1,0,1,0,1,0,0]):
			        			ocrPts+=30;
			        		break;
			        		case JSON.stringify([1,1,0,0,1,0,0,1,0]):
			        			ocrPts+=40;
			        		break;
			        		case JSON.stringify([0,1,1,0,1,0,1,1,0]):
			        			ocrPts+=50;
			        		break;
			        		case JSON.stringify([0,1,1,0,1,0,1,1,1]):
			        			ocrPts+=60;
			        		break;
			        		case JSON.stringify([1,1,1,0,0,0,0,0,0]):
			        			ocrPts+=70;
			        		break;
			        		case JSON.stringify([1,1,1,0,1,0,1,1,1]):
			        			ocrPts+=80;
			        		break;
			        		case JSON.stringify([1,1,1,0,1,0,1,1,0]):
			        			ocrPts+=90;
			        		break;
			        		default:
			        			ocrPts+=-9999;
			        		break;
			        		}

			        		switch (JSON.stringify(rgbArray.slice(19,21))) {
			        		case JSON.stringify([0,0]):
			        			ocrPts+=0;
			        		break;
			        		case JSON.stringify([1,1]):
			        			ocrPts+=100;
			        		break;
			        		default:
			        			ocrPts+=-9999;
			        		break;
			        		}
			        		console.log(ocrPts);

			        		if(ocrPts>=0) {
			        			document.getElementById("pts_p"+img_spot).value = ocrPts;
			        		}
			        	}
			        }
			        if(ocrPts<0)
			        	document.getElementById("pts_p"+img_spot).value = "?";
					ctx.drawImage(img
							, img_width*0.11, 0.127*img_height+0.058*img_height*img_spot, img_width*0.35, 0.05*img_height
							, 0, 0, canvasWidth, canvasHeight);
					break;

				default:
					break;


				}
			}
		}
		function borderline(imageStyle, y, imagedata) {
			console.log("r="+imagedata.data[0]+"g="+imagedata.data[1]+"b="+imagedata.data[2]+"rgb="+Number(Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2])));
			if(y==0) {
				if(imageStyle==0) { //imageStyle:race
					if(Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2])>500) {
						return 1; //white
					} else {
						return 0; //others
					}
				} else { //imageStyle:final

					if(Number(imagedata.data[0])+Number(imagedata.data[1])+Number(imagedata.data[2])>400) {
						return 1; //white
					} else {
						return 0; //others
					}
				}
			} else {
				if(Number(imagedata.data[0])+Number(imagedata.data[1])<380) {
					return 1; //black
				} else {
					return 0;
				}
			}
		}
	}
}









