var empId = T.p("empId");
$(function () {
    $("#jqGrid").jqGrid({
        url: '/'+rootPath+'/exam/list.do',
        datatype: "json",
        postData:{'empId':empId},
        colModel: [	
			{ label: '体检ID', name: 'examId', width: 35, key: true,hidden : true,sortable: false },
//			{ label: '员工ID', name: 'empId', width: 35  },
//			{ label: '预约标识', name: 'appointId', width: 35 },
			{ label: '员工姓名', name: 'empName',index:'EMP_NAME', width: 25 },
			{ label: '身份证号', name: 'idCode',index:'ID_CODE', width: 45 },
			{ label: '体检卡号', name: 'examNo',index:'EXAM_NO', width: 25 },
//			{ label: '体检机构ID', name: 'exapOrgId', width: 35 },
			{ label: '体检机构', name: 'exapOrgName',index:'EXAP_ORG_NAME', width: 25 },
			{ label: '数据状态', name: 'value',index:'EXAM_STATUS', width: 35 },
			{ label: '所属公司', name: 'companyName',index:'COMPANY_NAME', width: 35 },
			{ label: '预约时间', name: 'appointmentTime',index:'APPOINTMENT_TIME', width: 45 },
			//{ label: '创建时间', name: 'createTime',index:'CREATE_TIME', width: 45 },
			//{ label: '上传时间', name: 'uploadReportTime',index:'UPLOAD_REPORT_TIME', width: 35},
			{ label: '分析完成时间', name: 'getDataTime',index:'GET_DATA_TIME', width: 35},
			{ label: '报告下载', name: 'reportId', width: 25,formatter: function(value, options, row){
				if (value  == null){
					return "暂无体检报告";
				}else{
					return '<a href="#" onclick="downloadFile('+"'"+value+"'"+')" class="btn btn-primary btn-xs " role="button"><i class="glyphicon glyphicon-arrow-down"></i>下载</a>';
				}
			}},
//			{ label: '操作', name: 'examId', width: 35,sortable: false, formatter: function(value, options, row){
//				return '<a href="#" onclick="model('+value+')" class="btn btn-primary btn-xs pull-left" role="button">体检报告数据查看</a>';
//			}},
			{ label: '数据内容', name: 'logId', width: 15,sortable: false, formatter: function(value, options, row){
				if(typeof(value) == 'undefined')
					return '暂无';
				else{
					return '<a href="phReportLogHeResult.html?logReportId='+value+'" class="btn btn-primary btn-xs" role="button">详情</a>';
				}
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
//	var empId = $("#empId").val();
//	parm = encodeURI(parm);
//	var sys = vm.selected1;
//	console.log(sys);
//	if(parm != "undefined" || sys != "undefined")
		$("#jqGrid").jqGrid('setGridParam', {
			page : 1,
			postData : {
				empId : '',
				exapOrgId : $("#exapOrgId").val(),
				exapOrgName : $("#exapOrgName").val(),
				examStatus : $("#examStatus").val(),
				companyName : $("#companyName").val(),
				examNo : $("#examNo").val(),
				appointmentTimeBegin : $("#appointmentTimeBegin").val(),
				appointmentTimeEnd : $("#appointmentTimeEnd").val(),
				createTimeBegin : $("#createTimeBegin").val(),
				createTimeEnd : $("#createTimeEnd").val(),			
				uploadReportTimeBegin : $("#uploadReportTimeBegin").val(),
				uploadReportTimeEnd : $("#uploadReportTimeEnd").val(),
				getDataTimeBegin : $("#getDataTimeBegin").val(),
				getDataTimeEnd : $("#getDataTimeEnd").val(),
				empName : $("#empName").val(),
				idCode : $("#idCode").val(),
			}
		}).trigger("reloadGrid");
}
var vm = new Vue({
	el:'#rrapp',
	data:{
		baseRoleSysList:{},
		selected1:'-1',
		examStatus:{},
		exapOrgs:{}
	},
	created : function() {
		// this.getDict();
		this.getExamStatus();
		this.getExapOrgs();
	},
	methods: {
		queryByName: function (event) {
			reloadGrid();
		},
		getExamStatus:function(){
            $.get('/'+rootPath+"/examStatus/list.do", function(r){
            	vm.examStatus = r;
    		});
		},
		getDict: function(){
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
		},
	    getExapOrgs: function(){
			$.get("/"+rootPath+"/examOrgs/list.do", function(r){
				vm.exapOrgs = r;
			});
		},
		exp: function (event) {
			var examId = getSelectedRows();
			if(examId == null){
				return ;
			}
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
		downForIds: function (event) {
		    var examIds = getSelectedRows();
			location.href='/'+rootPath+'/FileDownloadForZip.do?examIds='+examIds;
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
	$('#appointmentTimeBegin').daterangepicker({
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
	$('#appointmentTimeEnd').daterangepicker({
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
	
	
	$('#uploadReportTimeBegin').daterangepicker({
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
	$('#uploadReportTimeEnd').daterangepicker({
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
	$('#getDataTimeBegin').daterangepicker({
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
	$('#getDataTimeEnd').daterangepicker({
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
					//console.log(strValue);
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
	//console.log('/'+rootPath+'/systemFileDownload.do?fileId='+fileId);
	location.href='/'+rootPath+'/systemFileDownload.do?fileId='+fileId;
}