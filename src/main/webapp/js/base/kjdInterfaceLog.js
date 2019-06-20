var empId = T.p("empId");
$(function () {
    $("#jqGrid").jqGrid({
        url: '/'+rootPath+'/apiLog/list.do',
        datatype: "json",
        postData:{'sysId':'kjd'},
        colModel: [	
			{ label: '体检ID', name: 'logId', width: 35, key: true,hidden : true,sortable: false },
//			{ label: '员工姓名', name: 'accessKey', width: 25 },
			{ label: '访问地址', name: 'url', width: 45 },
//			{ label: '请求数据', name: 'reqData', width: 45 },
//			{ label: '响应数据', name: 'resData', width: 35 },
			{ label: '状态', name: 'status', width: 35 , formatter: function(value, options, row){
				if(value=='DONE'){
					return '<div style="color:#00CC33">成功</div>';
				}
				if(value=='ERROR'){
					return '<div style="color:#CC3333">失败</div>';
				}
			}},
			{ label: '经过时间(毫秒)', name: 'elapsedTime', width: 35 },
			{ label: '创建时间', name: 'createTime', width: 25 },
//			{ label: '创建时间', name: 'source', width: 45 },
			{ label: '访问IP', name: 'remoteIp', width: 35},
			{ label: '服务器IP', name: 'serverIp', width: 35},
//			{ label: '取回结果时间', name: 'remark', width: 35},
			{ label: '标识', name: 'sysId', width: 35},
			{ label: '操作', name: 'logId', width: 35, formatter: function(value, options, row){
				return '<a href="#" onclick="model('+value+')" class="btn btn-primary btn-xs " role="button">请求响应数据详情</a>';
			}}    
        ],
		viewrecords: true,
        height: 400,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
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


function reloadGrid(){
		$("#jqGrid").jqGrid('setGridParam', {
			page : 1,
			postData : {
				logId : $("#logId").val(),
				accessKey : $("#accessKey").val(),
				url : $("#url").val(),
				reqData : $("#reqData").val(),
				resData : $("#resData").val(),
				status : $("#status").val(),
				elapsedTime : $("#elapsedTime").val(),
				createTimeBegin : $("#createTimeBegin").val(),
				createTimeEnd : $("#createTimeEnd").val(),
				source : $("#source").val(),			
				remoteIp : $("#remoteIp").val(),
				serverIp : $("#serverIp").val(),
				remark : $("#remark").val(),
				sysId : $("#sysId").val()
			}
		}).trigger("reloadGrid");
}
var vm = new Vue({
	el:'#rrapp',
	data:{
		baseRoleSysList:{},
		selected1:'-1'
	},
	created : function() {

	},
	methods: {
		queryByName: function (event) {
			reloadGrid();
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
			location.href = "/"+window.rootPath+"/exam/export.do?" + str;
		},
		auth: function (event) {
			var examId = getSelectedRow();
			if(examId == null){
				return ;
			}
			window.location.href = "role_auth.html?roleId="+roleId;
		},
		del: function (event) {
			var examId = getSelectedRows();
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
});
function model(logId){
    $.ajax({ 
    		url : '/'+rootPath+'/apiLog/info.do', 
    		data : {
    			logId: logId
    		},
			success : function(strValue) { 
			    if(strValue == null){
				    parent.jQuery("#reqData").val("暂无数据");
				    parent.jQuery("#resData").val("暂无数据");
				    //parent.jQuery("#myModalLabel").html("体检报告数据详情");
				    parent.$("#myModal1").modal({
				    	keyboard : true,
				    	show : true
				    });
			    }else{
				    parent.jQuery("#reqData").val(strValue.reqData);
				    parent.jQuery("#resData").val(strValue.resData);
//				    parent.jQuery("#myModalLabel").html("体检报告数据详情");
				    parent.$("#myModal1").modal({
				    	keyboard : true,
				    	show : true
				    });
			    }

			}
    })

}