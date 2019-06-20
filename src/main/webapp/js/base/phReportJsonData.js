var empId = T.p("empId");
//$(window).on('load', function () {
//	 $('#instName').selectpicker({
//		 //'selectedText': 'cat'
//	 });
//}); 
$(function () {
    $("#jqGrid").jqGrid({
        url: '/'+rootPath+'/phreportjsondata/list.do',
        datatype: "json",
       // postData:{'jsonList':'{"":""}'},
        colModel: [	
			{ label: 'Id', name: 'id', width: 35, key: true,hidden : true,sortable: false },
			//{ label: 'exam表主键', name: 'examid', width: 35  },
			{ label: '体检时间', name: 'sigindate', width: 25 },
			{ label: '报告上传时间', name: 'createtime', width: 25 },
			//{ label: '内部ID FESCO无需关注', name: 'logid', width: 45 },
			{ label: '体检结果', name: 'remark', width: 45 },
			{ label: '体检建议', name: 'suggest', width: 45 },
			//{ label: 'username', name: 'username', width: 35 },
			{ label: '体检机构名称', name: 'instname', width: 10 },
			//{ label: '体检机构ID', name: 'instgroupid', width: 35 },
			{ label: '操作', name: 'logid', width: 35 ,formatter: function(value, options, row){
				return '<a href="phReportLogHeResult.html?logReportId='+value+'" class="btn btn-primary btn-xs " role="button">详细信息查看</a>';
			}}
//			{ label: '数据状态', name: 'examStatus', width: 35 ,formatter: function(value, options, row){
//				if(value=='1'){
//					return '已预约';
//				}
//				if(value=='2'){
//					return '取消预约';
//				}
//				if(value=='3'){
//					return '体检报告已回传';
//				}
//				if(value=='4'){
//					return '体检报告已上传至KJD';
//				}
//				if(value=='5'){
//					return '体检分析数据已取回';
//				}
//			}},
//			{ label: '所属公司', name: 'companyName', width: 35 },
//			{ label: '体检卡号', name: 'examNo', width: 25 },
//			{ label: '创建时间', name: 'createTime', width: 45 },
//			{ label: '上传时间', name: 'uploadReportTime', width: 35},
//			{ label: '取回结果时间', name: 'getDataTime', width: 35},
//			{ label: '下载', name: 'reportId', width: 35,formatter: function(value, options, row){
//				if (value  == null){
//					return "暂无体检报告";
//				}else{
//					return '<a href="#" onclick="downloadFile('+"'"+value+"'"+')" class="btn btn-primary btn-xs " role="button">文件下载</a>';
//				}
//			}},
//			{ label: '操作', name: 'examId', width: 35, formatter: function(value, options, row){
//				return value === 0 ? 
//				'<span class="label label-danger">禁用</span>' : 
//				'<span class="label label-success">正常</span>';
//				return '<a href="#" onclick="model('+value+')" class="btn btn-primary btn-xs " role="button">体检报告数据查看</a>';
//			}}
//			{ label: '体检年度', name: 'examYear', width: 35 },
//			{ label: '授权标识', name: 'authFlag', width: 35 },
//			{ label: '体检报告ID', name: 'reportId', width: 35 },
//			{ label: '体检报告分析ID', name: 'reportAnaId', width: 35 },
//			{ label: '体检套餐', name: 'examCombo', width: 35 },
//			{ label: '体检时间', name: 'examTime', width: 35 },
//			{ label: '取消时间', name: 'cancelTime', width: 35 },
//			{ label: '回传时间', name: 'reportBackTime', width: 35 },
//			{ label: '上传员工标识', name: 'uploadEmpId', width: 35 },
//			{ label: '上传时间', name: 'uploadReportTime', width: 35 },
//			{ label: '取回结果时间', name: 'getDataTime', width: 35 },
			/*
			{ label: '公司ID', name: 'corpId', width: 35 },
			{ label: '角色分类', name: 'roleCate', width: 35 },
			{ label: '角色类型', name: 'roleType', width: 35 },
			{ label: '有效状态', name: 'userStatus', width: 45 },
			
			{ label: '体检机构ID', name: 'sysId', width: 45,hidden : true,sortable: false },
			{ label: '体检机构名称', name: 'roleSysName', width: 65,sortable: false },
			{ label: '角色状态', name: 'roleStatusName', width: 35,sortable: false, formatter: function(value, options, row){
				return value == '关闭' ? 
						'<span class="label label-danger">关闭</span>' : 
						'<span class="label label-success">开启</span>';
				}},
			{ label: '角色状态', name: 'roleStatus', width: 45,hidden : true,sortable: false },
//			{ label: '描述', name: 'roleDesc', width: 100 },
			{ label: '创建人', name: 'creatorName', width: 45,sortable: false },
//			{ label: '操作时间', name: 'operTime', width: 80 },
			/*
			{ label: '排序', name: 'roleOrder', width: 25 },
			
			{ label: '创建时间', name: 'buildTime', width: 80}     */              
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
		exapOrgs:{}
	},
	created : function() {
		// this.getDict();
		this.getExapOrgs();
	},
	methods: {
		queryByName: function (event) {
			reloadGrid();
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