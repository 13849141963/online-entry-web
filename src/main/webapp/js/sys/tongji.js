$(function () {
    $("#jqGrid").jqGrid({
        url: '/'+rootPath+'/tongji.do',
        datatype: "json",
        postData : {"jsonList" : '{"asd":"asd"}'},
        colModel: [			
			{ label: '机构名称', name: 'exapOrgName',index:'EXAP_ORG_NAME', width: 75 },	
			{ label: '已预约', name: 'appCount',index:'appCount', width: 75  },	
			{ label: '取消预约', name: 'cancelCount',index:'cancelCount', width: 75 },	
			{ label: '体检报告已回传', name: 'reportCount',index:'reportCount', width: 75},	
			{ label: '体检报告已上传至KJD', name: 'uoloadCount',index:'uoloadCount', width: 75 },	
			{ label: '体检分析数据已取回', name: 'fetchDataCount',index:'fetchDataCount', width: 75  },	
//			{ label: '状态', name: 'EXAM_STATUS',index:'EXAM_STATUS',sortable: false , width: 80,formatter: function(value, options, row){
//				if(value === 1){
//					return '已预约';
//				}
//				if(value === 2){
//					return '取消预约';
//				}
//				if(value === 3){
//					return '已上传至康健得';
//				}
//				if(value === 4){
//					return '报告已回传';
//				}
//				if(value === 5){
//					return '数据已取回';
//				}
//			}}, 
			{ label: '总数量', name: 'totalCount',index:'totalCount', width: 90 }
        ],
		viewrecords: true,
        height: 800,
        rowNum: 500,
		rowList : [500],
        rownumbers: true, 
        rownumWidth: 35, 
        autowidth:true,
        multiselect: false,
       // pager: "#jqGridPager",
        jsonReader : {
            root: "list",
            page: "currPage",
            total: "totalPage",
            records: "totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        	//var ids = $("#jqGrid").getDataIDs();
        	//console.log(ids.length);
        }
    });
});
jQuery("#jqGrid").setGridParam().hideCol("userId").trigger("reloadGrid");
var vm = new Vue({
	el:'#rrapp',
	data:{
		exapOrgs:{}
	},
	created: function() {
		this.getExapOrgs();
    },
	methods: {
		queryByName: function (event) {
			reloadGrid();
		},
		update: function (event) {
			var empId = getSelectedRow();
			if(empId == null){
				return ;
			}
			
			location.href = "emp_add.html?empId="+empId;
		},
	    getExapOrgs: function(){
			$.get("/"+rootPath+"/examOrgs/list.do", function(r){
				console.log(r);
				vm.exapOrgs = r;
			});
		},
		exp: function (event) {
			var arr = new Array;
			arr[0] = "exapOrgName=" + $("#exapOrgName").val();
			arr[1] = "&";
			arr[2] = "createTimeBegin=" + $("#createTimeBegin").val();
			arr[3] = "&";
			arr[4] = "createTimeEnd=" + $("#createTimeEnd").val();
			arr[5] = "&";
			var str = arr.join("");
			
			location.href = "/"+window.rootPath+"/emp/export.do?" + str;
		},
		del: function (event) {
			var userIds = getSelectedRows();
			if(userIds == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					contentType :  "application/x-www-form-urlencoded",
				    url: "/"+rootPath+"/emp/delete.do",
				    data : {'jsonList':JSON.stringify(userIds)},  
				    dataType: "json",   
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		}
	}
});
function reloadGrid(){
		$("#jqGrid").jqGrid('setGridParam', {
			page : 1,
			postData : {
				exapOrgName : $("#exapOrgName").val(),
				createTimeBegin : $("#createTimeBegin").val(),
				createTimeEnd : $("#createTimeEnd").val()
			}
		}).trigger("reloadGrid");
}

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