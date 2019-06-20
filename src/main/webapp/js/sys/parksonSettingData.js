$(function () {
    $("#jqGrid").jqGrid(/*{
        url:'http://10.0.45.25:8686/olentry-web/parkson',
        datatype: "json",
       // postData:{'jsonList':'{"cont":"1"}'},
        colModel: [	
            { label: 'Id', name: 'settingid', width: 35, key: true,hidden : true,sortable: false },
			{ label: '工作类型', name: 'jobTypeName', width: 70 ,align : "center"},
			{ label: '户口所在地', name: 'householdAreaName', width: 70,align : "center"},
			{ label: '户别', name: 'householdTypeName', width: 70,align : "center" },
			{ label: '映射户别', name: 'mappingHouseholdTypeName', width: 70 ,align : "center"},
			{ label: '人员类别', name: 'personTypeName', width: 70,align : "center"},
			{ label: '人员职务', name: 'personPostName', width: 70,align : "center"},
			{ label: '是否缴纳公积金', name: 'raiseAccufundFlagName', width: 80,align : "center"},
			{ label: '缴费人员类别', name: 'feePersonTypeName', width: 80,align : "center"},
			{ label: '人事档案手续类型', name: 'personnelHandleTypeName', width: 80,align : "center"},
			{ label: '人事档案审核提示', name: 'personnelRemark', width: 80,align : "center"},
			{ label: '是否需要签字声明', name: 'personalSignatureName', width: 85 ,align : "center"},
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
            root: "successResult.pageRecords",
            page: "successResult.page",
            total:"successResult.pagination",
            records: "successResult.totalCount",
            repeatitems : false,
        },
        prmNames : {
            page:"pageNo", 
            rows:"pageSize", 
            order: "order",
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    }*/
    		
{
    	    url : 'http://'+window.location.host+'/olentry-web/parkson',
	        datatype : "json",
	        colNames : [ '工作类型', '户口所在地', '户别', '映射户别', '人员类别','人员职务', '是否缴纳公积金','缴费人员类别','人事档案手续类型','人事档案审核提示','是否需要签字声明' ],
	        colModel : [ 
	                     {name: 'jobTypeName', width: 70 ,align : "center"}, 
	                     {name: 'householdAreaName', width: 70,align : "center"}, 
	                     {name: 'householdTypeName', width: 70,align : "center" }, 
	                     {name: 'mappingHouseholdTypeName', width: 70 ,align : "center"}, 
	                     {name: 'personTypeName', width: 70,align : "center"}, 
	                     {name: 'personPostName', width: 70,align : "center"}, 
	                     {name: 'raiseAccufundFlagName', width: 80,align : "center"},
	                     {name: 'feePersonTypeName', width: 80,align : "center"}, 
	                     {name: 'personnelHandleTypeName', width: 80,align : "center"},
	                     {name: 'personnelRemark', width: 80,align : "center"},
	                     {name: 'personalSignatureName', width: 85 ,align : "center"},
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
		var householdArea= vm.selecteda;
		var householdType= vm.selectedb;
		var personType= vm.selectedc;
		var postType= vm.selectedd;
		$("#jqGrid").jqGrid('setGridParam', {
			page:1,
			postData : {
							'householdArea':householdArea,
							'householdType':householdType,
							'personType':personType,
							'postType':postType,
						}
		}).trigger("reloadGrid");
}
var vm = new Vue({
	el:'#rrapp',
	data:{
		baseRoleSysList:{},
		selected1:'-1',
		exapOrgs:{},
		homes:[{text:'北京',value:1},{text:'非北京',value:2}],
		hegotos:[{name:'城镇户口',duty:1},
					{name:'农业户口',duty:2},
					{name:'非农业家庭户口',duty:3},
					{name:'城镇家庭户口',duty:4},
					{name:'居民户口',duty:5},
					{name:'家庭户口',duty:6},
					{name:'居民家庭户口',duty:7},
					{name:'农业家庭户口',duty:8},
					{name:'集体户口',duty:9}],
		genress:[{graduates:'应届生',types:1},{graduates:'非应届生',types:2}],
		positions:[{work:'员工',labor:1},{work:'经理',labor:2}],
		selected:'',
		selecteda:'',
		selectedb:'',
		selectedc:'',
		selectedd:'',
	},
	methods: {
		queryByName: function (event) {
			reloadGrid();
		},
	}
});
