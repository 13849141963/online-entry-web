var empTaskId="";


$(function () {
	
    $("#jqGrid").jqGrid({
    	
        url: "http://"+window.location.host+"/olentry-web/empTask",
        datatype: "json",
        colModel: [	
			{ label: 'Id', name: 'empTaskId', width: 35, key: true,hidden : true,sortable: false },
			
			/*{ label: '任务Id', name: 'taskId', width: 25 },*/
			{ label: '业务客户编号', name: 'busiCustNo', width: 10},
			
			{ label: '公司名称', name: 'companyName', width: 20},
			
			{ label: '员工姓名', name: 'empName', width: 10},
			
			{ label: '身份证号', name: 'idCode', width: 25 },
			{ label: '手机号', name: 'mobile', width: 20 },
			
			{ label: '员工状态', name: 'empStatus', width: 10 },
			
			
			
			{ label: '任务状态', name: 'taskStatus', width: 15 },
			
			{ label: '入职登记状态', name: 'enrollStatus', width: 20 },
			
			/*{ label: '入职体检办理状态', name: 'healthExamStatus', width: 10 },*/
			
			{ label: '人事档案办理状态', name: 'personnelStatus', width: 20 },
			
			{ label: '社保办理状态', name: 'insStatus', width: 20 },
			
			{ label: '劳动合同办理状态', name: 'insStatus', width: 20 },
			
			{ label: '提交时间', name: 'submitTime', width: 25 },
			
			{ label: '同步状态', name: 'syncMisFlag', width: 10 ,formatter:function(value, options, row){
				if(value == "未同步"){
					return "<font color='red' id='sync'>"+value+"</font>";
				}
				return value;
			}},
			
			{ label: '订单号', name: 'orderId', width: 15},
			
			{ label: '操作', name: 'empTaskId', width: 20 ,formatter: function(value, options, row){
				
										return '<a href="empTaskDetailResult.html?empTaskId='+value+'" class="btn btn-primary btn-xs " role="button">详细信息查看</a>';
			}}
    
        ],
		viewrecords: true,
        height: 400,
        rowNum: 10,
		rowList : [5,10,15],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        multiboxonly:true,
      gridComplete: hideSelectAll,
        beforeSelectRow: beforeSelectRow,
        pager: "#jqGridPager",
        jsonReader : {
            root: "successResult.pageRecords",
            page: "currPage",
            total: "totalPage",
            records: "successResult.totalCount"
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

function hideSelectAll() {  
    $("#jqGrid").hide();  
    return(true);  
} 

function beforeSelectRow() {  
    $("#jqGrid").jqGrid('resetSelection');  
    return(true);  
} 

function reloadGrid(){

     
	    var empNameStr = encodeURI(encodeURI($("#empName").val()));
		$("#jqGrid").jqGrid('setGridParam', {
			page : 1,
			//postData :data,
		postData : {
				empName : empNameStr,
				idCode : $("#idCode").val(),
				mobile : $("#mobile").val(),
				empStatus : $("#empStatus").val(),
				taskStatus : $("#taskStatus").val(),
				enrollStatus : $("#enrollStatus").val(),			
				personnelStatus : $("#personnelStatus").val(),
				insStatus : $("#insStatus").val(),
				contractStatus : $("#contractStatus").val(),
				syncMisFlag : $("#syncMisFlag").val(),
				submitStartTime : $("#submitStartTime").val(),
				submitEndTime : $("#submitEndTime").val()
				
				
			}
		}).trigger("reloadGrid");
}
var vm = new Vue({
	el:'#rrapp',
	data:{
		baseRoleSysList:{},
		selected1:'-1',
		exapOrgs:{},
		empStatus:{},
		taskStatus:{},
		syncFlag:{}
	},
	created : function() {
		
		this.getEmpStatus();
		this.getTaskStatus();
		this.getSyncFlag();
	},
	methods: {
		
		syncData: function (event) {
			empTaskId=$('#jqGrid').jqGrid('getGridParam','selrow');
			if(empTaskId==null){
				alert("请先选择要同步的数据");
				return;
			}
			var rowData = $('#jqGrid').jqGrid('getRowData',empTaskId);
			var syncFlag=rowData.syncMisFlag;
			if(syncFlag == "已同步"){
				alert("不需要同步");
				
			}else{
			   var url ="http://"+window.location.host+"/olentry-web/syncProcedures?empTaskId="+empTaskId;
			
				var flag =confirm('确定要进行同步？',function(){
					
					$.get(url,function(data){
						if(data.success==false){
							alert(data.message);
						}
						
					});
				})
			   
			  
			}
			
		},
				/*	$.ajax({
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
					});*/
				
				
			
		
		
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
		getEmpStatus: function(){
			var url ="http://"+window.location.host+"/olentry-web/getDict"
			var data="{dictType:'1'}"
			$.post(url,data,function(data) {
				vm.empStatus=data;
				},"json");
		},
		getTaskStatus: function(){
			
			var url ="http://"+window.location.host+"/olentry-web/getDict"
			var data="{dictType:'35'}"
			$.post(url,data,function(data) {
				vm.taskStatus=data;
				},"json");
		},
		getSyncFlag: function(){
			var url ="http://"+window.location.host+"/olentry-web/getDict"
			var data="{dictType:'32'}"
			$.post(url,data,function(data) {
				vm.syncFlag=data;
				},"json");
		},
		
	
		
	}
});
var beginTimeTake='';
$(document).ready(function() {
	$('#submitStartTime').daterangepicker({
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
	$('#submitEndTime').daterangepicker({
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

