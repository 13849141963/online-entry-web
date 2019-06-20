$(function () {
    $("#jqGrid").jqGrid({
        url: '/phexama-api/exam/List.do',
        datatype: "json",
        colModel: [		
			{ label: '体检ID', name: 'examId', width: 35, key: true,hidden : true,sortable: false },
			{ label: '员工ID', name: 'empId', width: 75 },
			{ label: '预约标识', name: 'appointId', width: 35 },
			{ label: '体检机构ID', name: 'exapOrgId', width: 35 },
			{ label: '体检机构名称', name: 'exapOrgName', width: 35 },
			{ label: '数据状态', name: 'examStatus', width: 35 },
			{ label: '所属公司', name: 'companyName', width: 35 },
			{ label: '体检年度', name: 'examYear', width: 35 },
			{ label: '体检卡号', name: 'examNo', width: 35 },
			{ label: '授权标识', name: 'authFlag', width: 35 },
			{ label: '体检报告ID', name: 'reportId', width: 35 },
			{ label: '体检报告分析ID', name: 'reportAnaId', width: 35 },
			{ label: '体检套餐', name: 'examCombo', width: 35 },
			{ label: '体检时间', name: 'examTime', width: 35 },
			{ label: '预约时间', name: 'appointmentTime', width: 35 },
			{ label: '取消时间', name: 'cancelTime', width: 35 },
			{ label: '回传时间', name: 'reportBackTime', width: 35 },
			{ label: '上传员工标识', name: 'uploadEmpId', width: 35 },
			{ label: '上传时间', name: 'uploadReportTime', width: 35 },
			{ label: '取回结果时间', name: 'getDataTime', width: 35 },
			{ label: '创建时间', name: 'createTime', width: 35 }
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
	var parm = $("#roleName").val();
	parm = encodeURI(parm);
	var sys = vm.selected1;
	if(parm != "undefined" || sys != "undefined")
		$("#jqGrid").jqGrid('setGridParam', {postData: {roleName:parm,sysId:sys}}).trigger("reloadGrid");
}

var vm = new Vue({
	el:'#rrapp',
	data:{
		baseRoleSysList:{},
		selected1:'-1'
	},
	created: function() {
		this.getDict();
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
			var roleId = getSelectedRow();
			if(roleId == null){
				return ;
			}
			
			location.href = "role_add.html?roleId="+roleId;
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
			if(examId == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					contentType :  "application/x-www-form-urlencoded",
				    url: "/phexama-api/exam/delete.do",
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