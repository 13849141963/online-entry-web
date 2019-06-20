var logReportId = T.p("logReportId");
$(function () {
	 $("#jqGrid").jqGrid({
	        url: '/'+rootPath+'/phReportLogHeResult/list.do',
	        datatype: "json",
	        postData:{'logReportId':logReportId},
	        colModel: [	
				{ label: 'Id', name: 'id', width: 35, key: true,hidden : true,sortable: false },
				{ label: '体检项名称', name: 'dictname',index:'dictname', width: 35 },
				//{ label: '内部Id,无需关注', name: 'logreportid', width: 35 },
				{ label: '体检项结果', name: 'resultvalue',index:'resultvalue', width: 25 },
				{ label: '体检项单位', name: 'unit',index:'unit', width: 45 },
				{ label: '体检项参考范围', name: 'refvalue',index:'refvalue', width: 35 },
				//{ label: '内部结果标识 无须关注', name: 'resultid', width: 45 },
				//{ label: '体检项创建时间 无须关注', name: 'createtime', width: 35 },
				{ label: '体检项科室', name: 'dictdepart',index:'dictdepart', width: 35 },
				{ label: '医生', name: 'doctor',index:'doctor', width: 35  },
				{ label: '体检时间', name: 'examtime',index:'examtime',width: 35 }
				//{ label: '体检结果状态', name: 'status', width: 35 }        
	        ],
			viewrecords: true,
	        height: 600,
	        rowNum: 500,
			rowList : [500],
	        rownumbers: true, 
	        rownumWidth: 35, 
	        autowidth:true,
	        multiselect: false,
	        //pager: "#jqGridPager",
	        jsonReader : {
	            root: "list",
	            page: "currPage",
	            total: "totalPage",
	            records: "totalCount"
	        },
	        prmNames : {
	            page:"page", 
	            rows:"limit", 
	            order: "order",
	            sidx: "sidx"
	        },
	        gridComplete:function(){
	        	//隐藏grid底部滚动条
	        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	        }
	    });
});

/*
function addCellAttr(rowId, val, rawObject, cm, rdata) {
	if (val == '关闭') {
		return "style='background-color: #5cb85c'";
	} else {
		return "style='color:blue'";
	}
}
*/

function reloadGrid(){
//	var empId = $("#empId").val();
//	parm = encodeURI(parm);
//	var sys = vm.selected1;
//	console.log(sys);
//	if(parm != "undefined" || sys != "undefined")
		$("#jqGrid").jqGrid('setGridParam', {
			page : 1,
			postData : {
				Id : $("#Id").val(),
				examId : $("#examId").val(),
				//siginDate : $("#siginDate").val(),
				//createTime : $("#createTime").val(),
				logId : $("#logId").val(),
				remark : $("#remark").val(),
				suggest : $("#suggest").val(),
				userName : $("#userName").val(),
				instName : $("#instName").val(),
				instGroupId : $("#instGroupId").val(),			
				siginDateBegin : $("#siginDateBegin").val(),
				siginDateEnd : $("#siginDateEnd").val(),
				createTimeBegin : $("#createTimeBegin").val(),
				createTimeEnd : $("#createTimeEnd").val()
			}
		}).trigger("reloadGrid");
}
var vm = new Vue({
	el:'#rrapp',
	data:{
		baseRoleSysList:{},
		selected1:'-1',
		phReportJsonData:{
		}
	},
	created : function() {
		 //this.getDict();
	},
	methods: {
		queryByName: function (event) {
			reloadGrid();
		},
		getDict: function(examId){
			$.get("/"+rootPath+"/phreportjsondata/list.do?examId="+examId, function(r){
				vm.phReportJsonData=r;
    		});
		},
		update: function (event) {
			var examId = getSelectedRow();
			if(examId == null){
				return ;
			}
			
			location.href = "exam_add.html?examId="+examId;
		},
		exp: function (event) {
			var arr = new Array;
			//arr[0] = "empId=" + $("#empId").val();
			//arr[1] = "&";
			arr[2] = "examNo=" + $("#examNo").val();
			arr[3] = "&";
			arr[4] = "exapOrgName=" + $("#exapOrgName").val();
			arr[5] = "&";
			arr[6] = "examStatus=" + $("#examStatus").val();
			arr[7] = "&";
			arr[8] = "companyName=" + $("#companyName").val();
			arr[9] = "&";
			arr[10] = "appointmentTimeBegin=" + $("#appointmentTimeBegin").val();
			arr[11] = "&";
			arr[12] = "appointmentTimeEnd=" + $("#appointmentTimeEnd").val();
			arr[13] = "&";
			arr[14] = "createTimeBegin=" + $("#createTimeBegin").val();
			arr[15] = "&";
			arr[16] = "createTimeEnd=" + $("#createTimeEnd").val();
			arr[17] = "&";
			arr[18] = "uploadReportTimeBegin=" + $("#uploadReportTimeBegin").val();
			arr[19] = "&";
			arr[20] = "uploadReportTimeEnd=" + $("#uploadReportTimeEnd").val();
			arr[21] = "&";
			arr[22] = "getDataTimeBegin=" + $("#getDataTimeBegin").val();
			arr[23] = "&";
			arr[24] = "getDataTimeEnd=" + $("#getDataTimeEnd").val();
			arr[25] = "&";
			arr[26] = "empName=" + $("#empName").val();
			arr[27] = "&";
			arr[28] = "idCode=" + $("#idCode").val();
			arr[29] = "&";
			arr[30] = "ids="+jQuery("#jqGrid").getGridParam("selarrrow");
			var str = arr.join("");
			//console.log(str);
			location.href = "/"+window.rootPath+"/exam/export.do?" + str;
		},
		auth: function (event) {
			var examId = getSelectedRow();
			if(examId == null){
				return ;
			}
//			if(parent.$("#tabTitle").text() == ""){
//				parent.$("#nav_title").append("<li class='active' id='tabTitle'><a href='http://127.0.0.1:8080/idm-web/base/role_auth.html?roleId="+roleId+"'>角色授权</a></li>");
//			}
			window.location.href = "role_auth.html?roleId="+roleId;
		},
		back: function (event) {
			history.go(-1);
		},
		del: function (event) {
			var examId = getSelectedRows();
			//alert(examId);
			if(examId == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					contentType :  "application/x-www-form-urlencoded",
				    url: "/"+rootPath+"/exam/delete.do",
				    data : {'jsonList':JSON.stringify(examId)},  
				    dataType: "json",   
				    success: function(r){
						if(r.code == 0){
							if(r.deleteMsg != null && r.deleteMsg != "" && r.deleteMsg != "undefined"){
								alert(r.deleteMsg, function(index){
									$("#jqGrid").trigger("reloadGrid");
								});
							} else {
								alert('操作成功', function(index){
									$("#jqGrid").trigger("reloadGrid");
								});
							}
						}else{
							alert(r.msg);
						}
					}
				});
			});
		}
	}
});
var beginTimeTake='';
$(document).ready(function() {
	$('#createTimeBegin').daterangepicker({
		 singleDatePicker: true,
	        showDropdowns: true,
	        autoUpdateInput: false,
	        timePicker24Hour : true,
	        timePicker : true,
	        locale : {  
	        	format: 'YYYY-MM-DD HH:mm',
	        	applyLabel : '确定',  
	            cancelLabel : '取消',  
	            fromLabel : '',  
	            toLabel : '至',  
	            customRangeLabel : '自定义',  
	            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
	            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
	                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
	            firstDay : 1  
	        }
	    }, 
	    function(start, end, label) {
	        beginTimeTake = start;
	        if(!this.startDate){
	            this.element.val('');
	        }else{
	            this.element.val(this.startDate.format(this.locale.format));
	        }
	});
	$('#createTimeEnd').daterangepicker({
		 singleDatePicker: true,
	        showDropdowns: true,
	        autoUpdateInput: false,
	        timePicker24Hour : true,
	        timePicker : true,
	        locale : {  
	        	format: 'YYYY-MM-DD HH:mm',
	        	applyLabel : '确定',  
	            cancelLabel : '取消',  
	            fromLabel : '',  
	            toLabel : '至',  
	            customRangeLabel : '自定义',  
	            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
	            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
	                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
	            firstDay : 1  
	        }
	    }, 
	    function(start, end, label) {
	        beginTimeTake = start;
	        if(!this.startDate){
	            this.element.val('');
	        }else{
	            this.element.val(this.startDate.format(this.locale.format));
	        }
	});
	$('#siginDateBegin').daterangepicker({
		 singleDatePicker: true,
	        showDropdowns: true,
	        autoUpdateInput: false,
	        timePicker24Hour : true,
	        timePicker : true,
	        locale : {  
	        	format: 'YYYY-MM-DD HH:mm',
	        	applyLabel : '确定',  
	            cancelLabel : '取消',  
	            fromLabel : '',  
	            toLabel : '至',  
	            customRangeLabel : '自定义',  
	            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
	            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
	                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
	            firstDay : 1  
	        }
	    }, 
	    function(start, end, label) {
	        beginTimeTake = start;
	        if(!this.startDate){
	            this.element.val('');
	        }else{
	            this.element.val(this.startDate.format(this.locale.format));
	        }
	});
	$('#siginDateEnd').daterangepicker({
		 singleDatePicker: true,
	        showDropdowns: true,
	        autoUpdateInput: false,
	        timePicker24Hour : true,
	        timePicker : true,
	        locale : {  
	        	format: 'YYYY-MM-DD HH:mm',
	        	applyLabel : '确定',  
	            cancelLabel : '取消',  
	            fromLabel : '',  
	            toLabel : '至',  
	            customRangeLabel : '自定义',  
	            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
	            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
	                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
	            firstDay : 1  
	        }
	    }, 
	    function(start, end, label) {
	        beginTimeTake = start;
	        if(!this.startDate){
	            this.element.val('');
	        }else{
	            this.element.val(this.startDate.format(this.locale.format));
	        }
	});
});
function model(examId){
	    $.ajax({ 
	    		url : '/'+rootPath+'/report/info.do', 
	    		data : {
	    			examId : examId
	    		},
				success : function(strValue) { 
				    if(strValue == null){
					    parent.jQuery("#logMsgResult").val("暂无数据");
					    parent.jQuery("#myModalLabel").html("体检报告数据详情");
					    parent.$("#myModal").modal({
					    	keyboard : true,
					    	show : true
					    });
				    }else{
					    parent.jQuery("#logMsgResult").val(strValue.examData);
					    parent.jQuery("#myModalLabel").html("体检报告数据详情");
					    parent.$("#myModal").modal({
					    	keyboard : true,
					    	show : true
					    });
				    }

				}
	    })

}
function downloadFile(fileId){
	location.href='/'+rootPath+'/systemFileDownload.do?fileId='+fileId;
}