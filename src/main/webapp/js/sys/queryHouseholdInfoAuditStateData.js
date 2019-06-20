$(function () {
    $("#jqGrid").jqGrid({
    	 url:'http://'+window.location.host+'/olentry-web/householdInfoAuditState',
         datatype: "json",
         colNames : [ '姓名', '证件号码',  '职业','户别','户口所在地', '审核状态','户口卡正面','户口卡反面','户口卡合成页' ],
         colModel : [ 
                     {name: 'empName', width: 70 ,align : "center"}, 
                     {name: 'idCode', width: 70,align : "center"}, 
                     {name: 'profession', width: 70,align : "center" }, 
                     {name: 'householdCate', width: 70 ,align : "center"}, 
                     {name: 'householdCity', width: 70,align : "center"}, 
                     {name: 'checkResult', width: 70,align : "center"}, 
                     {name: 'householdIndex', width: 80,align : "center"},
                     {name: 'householdSelf', width: 80,align : "center"}, 
                     {name: 'householdChange', width: 80,align : "center"},
                   ],
           viewrecords: true,
           height: 400,
           rowNum: 10,
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
	            page:"page", 
	            rows:"limit", 
	            order: "order",
	        },
    });
});

function reloadGrid(){
		//获取下拉框中的value数据
		//var empName= vm.empName;
	     var empName= encodeURI(encodeURI(vm.empName));
		var idCode= vm.idCode;
		var mobile= vm.mobile;
		if(empName !=null && empName != "" && idCode!=null && idCode != "" && mobile !=null && mobile != ""){
			$("#jqGrid").jqGrid('setGridParam', {
				page:1,
				postData : {
								'empName':empName,
								'idCode':idCode,
								'mobile':mobile,
							}
			}).trigger("reloadGrid");
		}else{
			alert("员工的名称,身份证号,手机号均不能为空!!!");
		}
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
