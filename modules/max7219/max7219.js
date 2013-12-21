//全局变量，用于维护配置信息
var glb_addon_name = "max7219";
var glb_json_cfg_file_path = "/app/" + glb_addon_name + "/cfg.json";
var glb_statue_invoke_target = "max7219.status";


var browser_side_config = null;

var glb_bitsmap_last = "";
var glb_posting = false;
//加载完成后运行
$(document).ready(
	function() {
		setTimeout(sys_status_info_update, 500); //延时 通过invoke接口 读取状态json的数据
		$("#sys_status_action_update").click(sys_status_info_update); //按钮 刷新状态
		
		// Variable Setup
		var cols = 8,
			rows = 8,
			curColor = "red",
			mouseDownState = false,
			eraseState = false,
			tracingMode = false,
			prevColor = "",
			$el;

		// Inital Build of Table  
		buildGrid(cols, rows);
		table_render();

		// Clearing the Design
		$("#draw_sandbox_reset").click(function() {
			buildGrid(rows, cols);
			table_render();
		});

		// Drawing functionality
		$("#drawing-table").delegate("td", "mousedown", function() {
			mouseDownState = true;
			$el = $(this);
			if (eraseState) {
				$el.removeAttr("style");
			} else if (tracingMode) {

			} else {
				$el.css("background", curColor);
			}
		}).delegate("td", "mouseenter", function() {
			$el = $(this);
			if (mouseDownState) {
				if (eraseState) {
					$el.removeAttr("style");
				} else {
					// DRAWING ACTION
					$el.css("background", curColor);
				}
			} else if (tracingMode) {
				$el.css("background", curColor);
			}

			table_render();
		}).delegate("td", "mouseleave", function() {
			$el = $(this);
			if (tracingMode) {
				$el.removeAttr("style");
			}
			//table_render();
		});
		$("html").bind("mouseup", function() {
			mouseDownState = false;
		});

		// Erasing functionality through OPTION key
		$(document).keydown(function(event) {
			if (event.keyCode == 18) {
				eraseState = true;
				$(".selected").addClass("previous");
				$(".color").removeClass("selected");
				$(".eraser").addClass("selected");
			} else if (event.keyCode == 17) {
				tracingMode = true;
			}
		}).keyup(function(event) {
			if (event.keyCode == 18) {
				eraseState = false;
				$(".color").removeClass("selected");
				$(".previous").addClass("selected").removeClass("previous");
				$("." + curColor).addClass("selected");
			} else if (event.keyCode == 17) {
				tracingMode = false;
			}
		});


	});

//	setInterval("color_update();", 1000);


function buildGrid(cols, rows) {
	var tableMarkup = "";
	for (x = 0; x < rows; x++) {
		tableMarkup += "<tr>";
		for (y = 0; y < cols; y++) {
			tableMarkup += "<td>&nbsp;</td>";
		}
		tableMarkup += "</tr>";
	}
	$("#drawing-table").html(tableMarkup)
};

function getTableArray() {
	var tds = $("#drawing-table").find("td");
	var bitArr = new Array();
	tds.each(function(idx, ele) {
		if (ele.style.background == "red") {
			bitArr.push(1);
		} else {
			bitArr.push(0);
		}
	});
	return bitArr;
}

function getHexString(bitArr, rowSize) {
	var rowSize = arguments[2] ? arguments[2] : 8;
	var str = "";
	var tmp = 0;
	for (var i = 0; i < bitArr.length; i++) {
		var pos = i % rowSize;
		tmp |= bitArr[i] << (rowSize - pos - 1);
		if (pos == 7) {
			str += (tmp >= 16) ? tmp.toString(16) : "0" + tmp.toString(16);
			tmp = 0;
		}
	};
	return str;
}

function table_render() {
	if (glb_posting == true) {
		setTimeout("table_render()", 500);
		return;
	}

	var arr = getTableArray();
	var str = getHexString(arr);
	if (glb_bitsmap_last != str) {
		data_obj = {
			method: "max7219.draw",
			params: str,
			id: 1234
		}
		glb_posting = true;
		$.ajax({
			url: "/logic/wifiIO/delegate",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify(data_obj),
			type: "post",
			complete: function(res) {
				glb_posting = false;
			}
		});
		glb_bitsmap_last = str;
	}
}


////////////////////////////////////////////////////
//插件管理 探测addon是否加载 进程是否在运行//
////////////////////////////////////////////////////

function sys_status_info_update() {
	$("#status_run").html("尝试读取...");
	$.ajax({
		url: "/logic/wifiIO/invoke?target=" + glb_statue_invoke_target,
		dataType: "json",
		type: "get",
		success: function(res_js) {
			if ("undefined" != typeof(res_js.error))
				$("#status_run").html("错误：" + res_js.error);
			else {
				$("#status_run").html("正在运行");
			}
		}
	});
}