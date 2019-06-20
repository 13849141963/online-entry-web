var empTaskId = T.p("empTaskId");

$(function () {
	$("#defaultTable").show();
	$("#enrollTable").hide();
	$("#socialTable").hide();
	$("#syncTable").hide();
	$("#materialTable").hide();
	$("#procedureTable").hide();
	 $("#defaultGrid").jqGrid({
	        url: 'http://'+window.location.host+'/olentry-web/showTaskDetail',
	        datatype: "json",
	        postData:{'empTaskId':empTaskId},
	        colModel: [	
				{ label: 'Id', name: 'procedureCheckId', width: 35, key: true,hidden : true,sortable: false },
				{ label: '审核类型', name: 'checkType',index:'checkType', width: 35 },
				
				{ label: '审核结果', name: 'checkResult',index:'checkResult', width: 25 },
				{ label: '审核不通过原因', name: 'rejectReason',index:'rejectReason', width: 45 },
				{ label: '审核不通过其它原因', name: 'rejectRemark',index:'rejectRemark', width: 35 },
				
				{ label: '手续类型', name: 'procedureType',index:'procedureType', width: 35 },
				{ label: '审核人', name: 'checkerName',index:'checkerName', width: 35  },
				{ label: '审核时间', name: 'checkTime',index:'checkTime',width: 35,editable:false}  
					
                 
				     
	        ],
			viewrecords: true,
	        height: 600,
	        rowNum: 500,
			rowList : [5,10,20],
	        rownumbers: true, 
	        rownumWidth: 35, 
	        autowidth:true,
	        multiselect: false,
	        //pager: "#jqGridPager",
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
	        	$("#defaultGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	        }
	    });
});

//入职登记
function queryEnroll(){
	$("#defaultTable").hide();
	$("#enrollTable").show();
	$("#socialTable").hide();
	$("#syncTable").hide();
	$("#materialTable").hide();
	$("#procedureTable").hide();
	
	 $("#enrollGrid").jqGrid({
		 
	        url: 'http://'+window.location.host+'/olentry-web/queryEnroll',
	        datatype: "json",
	        postData:{'empTaskId':empTaskId},
	        colModel: [	
				{ label: 'Id', name: 'enrollId', width: 35, key: true,hidden : true,sortable: false },
				{ label: '员工姓名', name: 'empName', width: 10 },
				
				{ label: '身份证号', name: 'idCode', width: 20 },
				{ label: '手机号', name: 'mobile', width: 15 },
				{ label: '工作类型', name: 'jobType', width: 10 },
				
				{ label: '人员类型', name: 'empType', width: 10 },
				{ label: '职务', name: 'post', width: 7  },
				{ label: '性别', name: 'gender', width: 7  },
				{ label: '学历', name: 'educationBackground', width: 7  },
				{ label: '婚姻状况', name: 'marriageStatus',width: 10,editable:false}, 
				{ label: '户口性质', name: 'householdType',width: 10,editable:false} , 
				{ label: '户口所在地', name: 'householdCity',width: 10,editable:false}, 
				{ label: '户口类别', name: 'householdCate',width: 10,editable:false}, 
				{ label: '户口类别', name: 'householdCate',width: 10,editable:false},
				{ label: '职业', name: 'profession',width: 10,editable:false}, 
				{ label: '户口地址', name: 'householdAddr',width: 20,editable:false}, 
				{ label: '现住址', name: 'residenceAddr',width: 20,editable:false}, 
				
			     
	        ],
			viewrecords: true,
	        height: 600,
	        rowNum: 500,
			rowList : [5,10,20],
	        rownumbers: true, 
	        rownumWidth: 35, 
	        autowidth:true,
	        multiselect: false,
	        //pager: "#jqGridPager",
	        jsonReader : {
	        	 root: "successResult",
	             page: "currPage",
	             total: "totalPage",
	             records: "successResult.totalCount",
	            repeatitems:true
	        },
	        prmNames : {
	            page:"page", 
	            rows:"limit", 
	            order: "order",
	            sidx: "sidx"
	        },
	        gridComplete:function(){
	        	//隐藏grid底部滚动条
	        	$("#enrollGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	        }
	    });
}

//同步日志
function querySyncLog(){
	$("#defaultTable").hide();
	$("#enrollTable").hide();
	$("#socialTable").hide();
	$("#syncTable").show();
	$("#materialTable").hide();
	$("#procedureTable").hide();
	
	 $("#syncGrid").jqGrid({
		 
	        url: 'http://'+window.location.host+'/olentry-web/querySyncLog',
	        datatype: "json",
	        postData:{'empTaskId':empTaskId},
	        colModel: [	
				{ label: 'Id', name: 'id', width: 35, key: true,hidden : true,sortable: false },
				{ label: '同步手续类型', name: 'syncProduceType', width: 15 },
				
				{ label: '员工姓名', name: 'empName', width: 20 },
				{ label: '身份证号', name: 'idCode', width: 15 },
				{ label: '入参', name: 'inputData', width: 30 },
				
				{ label: '出参', name: 'outputData', width: 30 },
				{ label: '响应码', name: 'code', width: 7  },
				{ label: '错误信息', name: 'errorMsg', width: 30  },
				{ label: '记录时间', name: 'recordTime', width: 20  }
				
				
			     
	        ],
			viewrecords: true,
	        height: 600,
	        rowNum: 500,
			rowList : [5,10,20],
	        rownumbers: true, 
	        rownumWidth: 35, 
	        autowidth:true,
	        multiselect: false,
	        //pager: "#jqGridPager",
	        jsonReader : {
	        	 root: "successResult",
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
	        	$("#syncGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	        }
	    });
}
//手续办理
function queryProcedure(){
	$("#defaultTable").hide();
	$("#enrollTable").hide();
	$("#socialTable").hide();
	$("#syncTable").hide();
	$("#materialTable").hide();
	$("#procedureTable").show();
	
	$("#procedureGrid").jqGrid({
		
		url: 'http://'+window.location.host+'/olentry-web/queryProcedure',
		datatype: "json",
		postData:{'empTaskId':empTaskId},
		colModel: [	
		           { label: 'Id', name: 'empProcedureId', width: 35, key: true,hidden : true,sortable: false },
		           { label: '手续类型', name: 'procedureType', width: 15 },
		           
		           { label: '手续办理状态', name: 'procedureStatus', width: 20 },
		           { label: '同步状态', name: 'syncMisFlag', width: 15 ,formatter:function(value, options, row){
						if(value == "未同步"){
							return "<font color='red'>"+value+"</font>";
						}
						return "<font color='black'>"+value+"</font>";
					}},
		           { label: '同步时间', name: 'syncTime', width: 30 },
		           
		           { label: '是否需要在线办理', name: 'isRequired', width: 30 },
		           { label: '同步备注', name: 'syncRemark', width: 20  }
		          
		           
		           
		           
		           ],
		           viewrecords: true,
		           height: 600,
		           rowNum: 500,
		           rowList : [5,10,20],
		           rownumbers: true, 
		           rownumWidth: 35, 
		           autowidth:true,
		           multiselect: false,
		           //pager: "#jqGridPager",
		           jsonReader : {
		        	   root: "successResult",
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
		        	   $("#procedureTable").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
		           }
	});
}









//新参查询
function newSocial(){
	$("#defaultTable").hide();
	$("#enrollTable").hide();
	$("#socialTable").show();
	$("#syncTable").hide();
	$("#materialTable").hide();
	$("#procedureTable").hide();
	$("#socialGrid").jqGrid({
	    datatype: "json",
	    url:'http://'+window.location.host+'/olentry-web/newSocial',
	    postData:{'empTaskId':empTaskId},
	    colModel: [	
			{ label: '参保人电话', name: 'contactTel',index:'checkType', width: 35 },
			{ label: '户口性质', name: 'householdTypeName',index:'checkResult', width: 25 },
			{ label: '首次参加工作时间', name: 'firstWorkTime',index:'rejectReason', width: 45 },
			{ label: '户口所在地', name: 'householdZip',index:'rejectRemark', width: 35 },
			{ label: '邮编', name: 'postCode',index:'procedureType', width: 35 },
			{ label: '政治面貌', name: 'politicalStatusName',index:'procedureType', width: 35 },
			{ label: '医疗机构1', name: 'hospital1',index:'checkerName', width: 35  },
			{ label: '医疗机构2', name: 'hospital2',index:'checkerName', width: 35  },
			{ label: '医疗机构3', name: 'hospital3',index:'checkerName', width: 35  },
			{ label: '医疗机构4', name: 'hospital4',index:'checkerName', width: 35  },
			{ label: '医疗机构5', name: 'hospital5',index:'checkerName', width: 35  },
			{ label: '联系人电话', name: 'contactPersonTel',index:'checkerName', width: 35  },
			{ label: '联系人姓名', name: 'contactPersonName',index:'checkerName', width: 35  },
			{ label: '银行', name: 'delegateBank',index:'checkerName', width: 35  },
			{ label: '银行账号', name: 'delegateBankAccount',index:'checkerName', width: 35  },
	    ],
	    //pager: "#jqGridPager",
		viewrecords: true,
	    height: 600,
	    jsonReader : {
	    	 root: "successResult.pageRecords",
	    },
	    rowNum: 500,
		rowList : [5,10,20],
	    rownumbers: true, 
	    rownumWidth: 35, 
	    autowidth:true,
	    multiselect: false,
	    gridComplete:function(){
	    	//隐藏grid底部滚动条
	    	$("#socialGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	    }
	});
}



function ReSizePic(ThisPic){
    var RePicWidth = 200; //这里修改为您想显示的宽度值

    //============以下代码请勿修改==================================

    var TrueWidth = ThisPic.width;    //图片实际宽度
    var TrueHeight = ThisPic.height;  //图片实际高度
    var Multiple = TrueWidth / RePicWidth;  //图片缩小(放大)的倍数

    ThisPic.width = RePicWidth;  //图片显示的可视宽度
    ThisPic.height = TrueHeight / Multiple;  //图片显示的可视高度
}

//查询电子材料
function electroniMaterial(){
	$("#defaultTable").hide();
	$("#enrollTable").hide();
	$("#socialTable").hide();
	$("#syncTable").hide();
	$("#materialTable").show();
	$("#procedureTable").hide();
	$("#materialGrid").jqGrid({
	    datatype: "json",
	    url:'http://'+window.location.host+'/olentry-web/materialInfo',
	    postData:{'empTaskId':empTaskId},
	    colModel: [	
			{ label: '材料的类型', name: 'materialTypeName', width: 35 },
			{ label: '手续类型', name: 'procedureTypeName', width: 35 },
			{ label: '查看材料', name: 'materialFileId', width: 35 ,formatter: function(value, options, row){
				//return '<img src="http://10.0.75.151:18081/fileserver/getErRecordDataById.do?fileId='+value+'" onload="ReSizePic(this);">'
				return '<a href="http://10.0.75.151:18081/fileserver/getErRecordDataById.do?fileId='+value+'" class="btn btn-primary btn-xs " role="button"><img src="http://10.0.75.151:18081/fileserver/getErRecordDataById.do?fileId='+value+'" onload="ReSizePic(this);"></a>';
			}}
	    ],
	   // pager: "#jqGridPager",
		viewrecords: true,
	    height: 600,
	    jsonReader : {
	    	 root: "successResult.pageRecords",
	    	 
	    },
	    rowNum: 500,
		rowList : [5,10,20],
	    rownumbers: true, 
	    rownumWidth: 35, 
	    autowidth:true,
	    multiselect: false,
	    gridComplete:function(){
	    	//隐藏grid底部滚动条
	    	$("#materialGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
	    }
	});
}
var vm = new Vue({
	el:'#rrapp',
	data:{
		baseRoleSysList:{},
		selected1:'-1',
		phReportJsonData:{
		},
	},
	created : function() {
		 //this.getDict();
	},
	methods: {
	
		
		//展示入职登记
		showEnrollInfo: function (event) {
			queryEnroll();
		},
		//展示社保新参
		showNewSocial: function (event) {
			newSocial();
		},
		//展示同步日志
		showSyncLog: function (event) {
			querySyncLog();
		},
		//展示电子材料
		showMaterial: function (event) {
			
			electroniMaterial();
		},
		//展示手续办理状态
		showProcedureHandleStatus: function (event) {
			queryProcedure();
		},
		

		back: function (event) {
			history.go(-1);
		},
	
	}
});

