var empId = T.p("empId"); 

$(function () {
	loadGrid();

}
);




function loadGrid(){
	var data="{creator :'"+$("#creator").val()+"'}";
    $("#jqGrid").jqGrid({
        url:'http://'+window.location.host+'/olentry-web/task',
        datatype: "json",
    	postData : data,
        colModel: [	
			{ label: 'Id', name: 'taskId', width: 6, key: true,hidden : true,sortable: false },
			
			{ label: '任务名称', name: 'taskName', width: 6 },
			{ label: '入职手续', name: 'procedures', width: 6 },
		
			{ label: '体检套餐', name: 'checkupService', width: 9 },
			{ label: '办理指南', name: 'guides', width:6 },
		
		/*	{ label: '其它办理指南名称', name: 'otherGuideName', width: 12 },
			
			
			{ label: '其它办理指南内容', name: 'otherGuideContent', width: 12 },*/
			
			{ label: '任务类型', name: 'taskType', width: 6 },
			{ label: '任务状态', name: 'taskStatus', width: 6 },
			
			{ label: '删除状态', name: 'delFlag', width: 6 },
			
		/*	{ label: '备注', name: 'remark', width: 6 },*/
			
			{ label: 'pc入职链接', name: 'pcEntryLink', width: 9 },
			{ label: '微信入职链接', name: 'wxQcodeLink', width: 9 },
			{ label: 'app入职链接', name: 'appQcodeLink', width: 9 },
			{ label: '创建时间', name: 'createTime', width: 12 },
			{ label: '创建人id', name: 'creator', width: 10 },
			{ label: '创建人名称', name: 'creatorName', width: 9 },
			{ label: '入职业务类型', name: 'bizType', width: 9 },
			{ label: '业务代表Id', name: 'busiRep', width: 15}
			
		/*{ label: '详情', name: 'otherGuideContent', width: 6 ,formatter: function(value, options, row){
				return '<a href="phReportLogHeResult.html?logReportId='+value+'" class="btn btn-primary btn-xs " role="button">查看</a>';
			}}*/
    
        ],
		viewrecords: true,
        height: 400,
        rowNum: 10,
        mtype: 'POST', 
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "successResult.pageRecords",
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
}

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
	var data="{creator :'"+$("#creator").val()+"'}";
		$("#jqGrid").jqGrid('setGridParam', {
			page : 1,
			postData : data
		}).trigger("reloadGrid");
}
var vm = new Vue({
	el:'#rrapp',
	data:{
		baseRoleSysList:{},
		selected1:'-1',
		exapOrgs:{}
	},
	/*created : function() {
		// this.getDict();
		this.getExapOrgs();
	},*/
	methods: {
		queryByName: function (event) {
			reloadGrid();
			
		},
		/*getDict: function(){
            $.get("../base/role/dict", function(r){
            	vm.baseRoleSysList = r.role.baseRoleSysList;
    		});
		},
		update: function (event) {
			var examId = getSelectedRow();
			if(examId == null){
				return ;
			}
			
			location.href = "exam_add.html?examId="+examId;
		},*/
		/*getExapOrgs: function(){
			$.get("/"+rootPath+"/examOrgs/list.do", function(r){
				vm.exapOrgs = r;
			});
		},*/
		/*exp: function (event) {
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
		},*/
		/*auth: function (event) {
			var examId = getSelectedRow();
			if(examId == null){
				return ;
			}
//			if(parent.$("#tabTitle").text() == ""){
//				parent.$("#nav_title").append("<li class='active' id='tabTitle'><a href='http://127.0.0.1:8080/idm-web/base/role_auth.html?roleId="+roleId+"'>角色授权</a></li>");
//			}
			window.location.href = "role_auth.html?roleId="+roleId;
		},*/
	/*	del: function (event) {
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
		}*/
	}
});
var beginTimeTake='';
$(document).ready(function() {
/*	$('#createTimeBegin').daterangepicker({
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
	});*/
});
function model(examId){
	/* $.ajax({ 
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
	    })*/

}
function downloadFile(fileId){
	location.href='/'+rootPath+'/systemFileDownload.do?fileId='+fileId;
}