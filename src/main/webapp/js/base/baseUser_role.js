//用户ID
var userId = T.p("userId");

//通过系统选择角色的表格
$(function () {
    $("#jqGridSysRole").jqGrid({
        url: "../base/baseSys/sysRole/"+userId,
        datatype: "json",
        colModel: [			
			{ label: 'roleId', name: 'roleId', width: 45, key: true },
			{ label: '角色名', name: 'roleName', width: 45 },
			{ label: '角色描述', name: 'roleDesc', width: 45 }
		
        ],
		viewrecords: true,
        height: 400,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: false, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        cellLayout:0,
        /*pager: "#jqGridPagerSysRole",*/
        jsonReader : {
            root: "list",
            /*page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"*/
        },
        /*prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },*/
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGridSysRole").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        	$("#jqGridSysRole").closest('.ui-jqgrid-view').find('.ui-jqgrid-hdiv').hide()
        	jQuery("#jqGridSysRole").setGridParam().hideCol("roleId").trigger("reloadGrid");
        	jQuery("#jqGridSysRole").setGridParam().hideCol("roleDesc").trigger("reloadGrid");
        }
    });
});
//选择一条记录
function getSelectedSysRoleRow() {
	var grid = $("#jqGridSysRole");
	var rowKey = grid.getGridParam("selrow");
	if(!rowKey){
		alert("请选择一条记录");
		return ;
	}
	
	var selectedIDs = grid.getGridParam("selarrrow");
	if(selectedIDs.length > 1){
		alert("只能选择一条记录");
		return ;
	}
	
	return selectedIDs[0];
}

$(function () {
    $("#jqGrid").jqGrid({
        url: "../base/baseUser/userRoleList/"+userId,
        datatype: "json",
        colModel: [			
			{ label: 'baseUserRoleId', name: 'baseUserRoleId', width: 45, key: true },
			{ label: 'userId', name: 'userId', width: 45 },
			{ label: 'userId', name: 'userId', width: 45 },
			{ label: 'roleId', name: 'roleId', width: 45 },
			{ label: '角色名', name: 'roleName', width: 75},
			{ label: '授权是否开启', name: 'userRoleState', width: 75, formatter: function(value, options, row){
				return value === 1 ? 
						'<span class="label label-success">有效</span>' : 
						'<span class="label label-danger">删除</span>'; }},
			{ label: '授权时间', name: 'createTime', width: 75}
        ],
		viewrecords: true,
        height: 400,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:false,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        	jQuery("#jqGrid").setGridParam().hideCol("baseUserRoleId").trigger("reloadGrid");
        	jQuery("#jqGrid").setGridParam().hideCol("userId").trigger("reloadGrid");
        	jQuery("#jqGrid").setGridParam().hideCol("roleId").trigger("reloadGrid");
        }
    });
});


var vm = new Vue({
	el:'#rrapp',
	data:{
		sysList:{},
		userRole:{},
		user:{
			status:1
		}
	},
	created: function() {
		this.getSysList();
		if(userId != null){
			this.getUser(userId)
		}
	},
	methods: {
		getUser: function(userId){
			$.get("../base/baseUser/info/"+userId, function(r){
				vm.user = r.user;
			});
		},
		getSysList: function(){
			$.get("../base/baseSys/selectSys", function(r){
				vm.sysList = r.list;
			});
		},
		choiceSys: function (){
			var sysId=$("#sysSelect").val(); //获取选中记录的value值 
			$("#jqGridSysRole").jqGrid('setGridParam', {postData: {sysId:sysId}}).trigger("reloadGrid");
		},
		/*save: function (event) {
			if(userId == null){
				return ;
			}
			location.href = "baseUser_sysRole.html?userId="+userId;
		},*/
		
		addUserRole: function (event){
			var roleId = getSelectedSysRoleRow();
			var userId = vm.user.userId
			if(roleId == null){
				return ;
			}
			vm.userRole.roleId=roleId;
			vm.userRole.userId=userId;
			
			$.ajax({
				type: "POST",
			    url: "../base/baseUser/addRole",
			    data: JSON.stringify(vm.userRole),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							$("#jqGridSysRole").trigger("reloadGrid");
							$("#jqGrid").trigger("reloadGrid");
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		
		cancel: function (event) {
			var baseUserRoleIds = getSelectedRows();
			if(baseUserRoleIds == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					url: "../base/baseUser/cancelUserRole",
					data: JSON.stringify(baseUserRoleIds),
					success: function(r){
						if(r.code === 0){
							alert('操作成功', function(index){
								$("#jqGridSysRole").trigger("reloadGrid");
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		back: function (event) {
			history.go(-1);
		}
	}
});