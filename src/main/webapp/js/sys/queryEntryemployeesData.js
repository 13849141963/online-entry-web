$(function () {
    $("#jqGrid").jqGrid({
    	    url : 'http://'+window.location.host+'/olentry-web/employees/info',
	        datatype : "json",
	        colNames : [ '名称', '唯一号',  '性别','证件类型','证件号码', '手机号','邮箱','出生日期','操作人名称' ],
	        colModel : [ 
	                     {name: 'empName', width: 70 ,align : "center"}, 
	                     {name: 'uniquNo', width: 70,align : "center"}, 
	                     {name: 'genderName', width: 70,align : "center" }, 
	                     {name: 'idTypeName', width: 70 ,align : "center"}, 
	                     {name: 'idCode', width: 70,align : "center"}, 
	                     {name: 'mobile', width: 70,align : "center"}, 
	                     {name: 'email', width: 80,align : "center"},
	                     {name: 'birthDate', width: 80,align : "center"}, 
	                     {name: 'nationName', width: 80,align : "center"},
	                   ],
           viewrecords: true,
           height: 400,
           rowNum: 10,
           mtype: 'GET', 
   		   rowList : [10,30,50],
           rownumbers: true, //显示行号
           rownumWidth: 25,
           autowidth:true,
           multiselect: true,
           pager: "#jqGridPager",
	        jsonReader : {
	            root: "successResult.pageRecords",//数据
	            page: "successResult.page",//当前页
	            total:"successResult.rows",//总页数
	            records: "successResult.totalCount",//总条数
	            repeatitems : false,
	        },
	        prmNames : {
	            page:"pageNo", 
	            rows:"pageSize", 
	            order: "order",
	        },
});
});

function reloadGrid(){
		//获取下拉框中的value数据
		var empName= vm.empName;
		var idCode= vm.idCode;
		var mobile= vm.mobile;
		console.log("员工姓名:"+empName);
		console.log("身份证号码:"+idCode);
		console.log("手机号:"+mobile);
		$("#jqGrid").jqGrid('setGridParam', {
			page:1,
			postData : {
							'empName':empName,
							'idCode':idCode,
							'mobile':mobile,
						}
		}).trigger("reloadGrid");
}
var vm = new Vue({
	el:'#rrapp',
	data:{
		empName:'',
		idCode:'',
		mobile:'',
	},
	methods: {
		queryByName: function (event) {
			reloadGrid();
		},
	}
});
