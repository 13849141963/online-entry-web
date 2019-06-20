$(function () {
    $("#jqGrid").jqGrid({
        url: '/'+rootPath+'/emp/list.do',
        datatype: "json",
        postData : {"jsonList" : '{"asd":"asd"}'},
        colModel: [			
			{ label: '用户ID', name: 'empId', width: 45, key: true,hidden : true },
			{ label: '员工姓名', name: 'empName',index:'emp_name', width: 75 },
			
			{ label: '身份证号', name: 'idCode',index:'id_code', width: 80}, 
			{ label: '授权标识', name: 'authFlag',index:'auth_flag', width: 80,formatter: function(value, options, row){
				if(value=='1'){
					return '<span class="glyphicon glyphicon-ok" style="color:green;"></span>';
				}
				if(value=='2'){
					return '<span class="glyphicon glyphicon-remove" style="color:red;"></span>';
				}
				return '<span class="glyphicon glyphicon-ok" style="color:green;"></span>';
			}}, 
			{ label: '邮箱', name: 'email',index:'email', width: 90 },
			{ label: '手机号', name: 'mobile',index:'mobile', width: 100 },
			{ label: '创建时间', name: 'createTime',index:'create_time', width: 80},   
			{ label: '操作', name: 'empId', width: 80, formatter: function(value, options, row){
				return '<a href="exam.html?empId='+value+'" class="btn btn-primary btn-xs col-md-6" role="button">体检信息查看</a>';
			}}
        ],
		viewrecords: true,
        height: 400,
        rowNum: 10,
		rowList : [10,30,50],
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
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});
jQuery("#jqGrid").setGridParam().hideCol("userId").trigger("reloadGrid");
var vm = new Vue({
	el:'#rrapp',
	data:{
		
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
		exp: function (event) {
			var arr = new Array;
			arr[0] = "empName=" + $("#empName").val();
			arr[1] = "&";
			arr[2] = "email=" + $("#email").val();
			arr[3] = "&";
			arr[4] = "mobile=" + $("#mobile").val();
			arr[5] = "&";
			arr[6] = "idCode=" + $("#idCode").val();
			arr[7] = "&";
			arr[8] = "authFlag=" + $("#authFlag").val();
			arr[9] = "&";
			arr[10] = "createTimeBegin=" + $("#createTimeBegin").val();
			arr[11] = "&";
			arr[12] = "createTimeEnd=" + $("#createTimeEnd").val();
			arr[13] = "&";
			arr[14] = "ids="+jQuery("#jqGrid").getGridParam("selarrrow");
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
				empName : $("#empName").val(),
				email : $("#email").val(),
				mobile : $("#mobile").val(),
				idCode : $("#idCode").val(),
				authFlag : $("#authFlag").val(),
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