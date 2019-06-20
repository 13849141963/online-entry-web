$(function () {
    $("#jqGrid").jqGrid({
        url: '../base/baseUser/list',
        datatype: "json",
        colModel: [			
			{ label: 'userId', name: 'userId', width: 45, key: true },
			{ label: '登录账号', name: 'loginName', width: 75},
			{ label: '用户名称', name: 'userName', width: 90},
			/*{ label: '密码有效期', name: 'passwordTime', width: 90},*/
			{ label: '用户性别', name: 'sex', width: 90
			, formatter: function(value, options, row){
				return value === 1 ? 
						'<span class="label label-success">男</span>' : 
						'<span class="label label-danger">女</span>'; }},
			{ label: '居住地址', name: 'address', width: 100 },
			{ label: '用户手机', name: 'phone', width: 100 },
			{ label: '用户邮箱', name: 'email', width: 100 },
			{ label: '状态', name: 'userStatus', width: 80, formatter: function(value, options, row){
				if(value===1){
					return '<span class="label label-success">开启</span>';
				}
				if(value===2){
					return '<span class="label label-danger">关闭</span>';
				}
				if(value===3){
					return '<span class="label label-danger">锁定</span>';
				}
			}}   ,         
			/*{ label: '用户类型', name: 'userType', width: 80},    */     
			{ label: '创建者', name: 'creatorName', width: 100 },
			{ label: '机构', name: 'orgId', width: 100 }
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
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order",
            sidx: "sidx"
        },
        postData : {
        	
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        	jQuery("#jqGrid").setGridParam().hideCol("userId").trigger("reloadGrid");
        	jQuery("#jqGrid").setGridParam().hideCol("orgId").trigger("reloadGrid");
        }
    });
});

var setting = {
		data: {
			simpleData: {
				enable: true,
				idKey: "orgId",
				pIdKey: "parentId",
				rootPId: -1
			},
			key: {
				url:"nourl"
			}
		},
		callback: {
			//onClick: reloadOrgs,
			onClick: OnRightClick
		}
	};
var ztree;

var vm = new Vue({
	el:'#rrapp',
	data:{
		newPassword:'',
		baseUser:{},
		org:{
			parentId:0
		}
	},
	created: function() {		
		//加载机构树
		$.get("../base/org/select", function(r){
			ztree = $.fn.zTree.init($("#orgTree"), setting, r.orgList);
			var node = ztree.getNodeByParam("orgId", 0);
			ztree.selectNode(node);
		});
		this.orgTree();
    },
	methods: {
		
		query: function () {
			var userName=$("#userName").val();
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'userName': userName}
            }).trigger("reloadGrid");
		},
		update: function (event) {
			var userId = getSelectedRow();
			if(userId == null){
				return ;
			}
			
			location.href = "baseUser_add.html?userId="+userId;
		},
		open: function (event) {
			var userId = getSelectedRow();
			if(userId == null){
				return ;
			}
			
			confirm('确定要开启用户状态？', function(){
				$.ajax({
					type: "POST",
					url: "../base/baseUser/open",
					data: JSON.stringify(userId),
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
		},	
		close: function (event) {
			var userId = getSelectedRow();
			if(userId == null){
				return ;
			}
			
			confirm('确定要关闭用户状态？', function(){
				$.ajax({
					type: "POST",
					url: "../base/baseUser/close",
					data: JSON.stringify(userId),
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
		},	
		clock: function (event) {
			var userId = getSelectedRow();
			if(userId == null){
				return ;
			}
			
			confirm('确定要锁定用户状态？？', function(){
				$.ajax({
					type: "POST",
					url: "../base/baseUser/clock",
					data: JSON.stringify(userId),
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
		},	
		changeUserRole: function (event) {
			var userId = getSelectedRow();
			if(userId == null){
				return ;
			}
			location.href = "baseUser_role.html?userId="+userId;
		},	
		changePwd: function (event) {
			var userId = getSelectedRow();
			if(userId == null){
				return ;
			}
			
			layer.open({
				type: 1,
				skin: 'layui-layer-lan',
				title: "重置密码",
				area: ['550px', '270px'],
				shadeClose: false,
				content: jQuery("#changePwdLayer"),
				btn: ['修改','取消'],
				btn1: function (index) {
					vm.baseUser.userId=userId
					vm.baseUser.userPwd=$("#newPassword").val();
					$.ajax({
						type: "POST",
					    url: "../base/baseUser/changePwd",
					    data: JSON.stringify(vm.baseUser),
					    dataType: "json",
					    success: function(result){
							if(result.code == 0){
								layer.close(index);
								layer.alert('修改成功', function(index){
									location.reload();
								});
							}else{
								layer.alert(result.msg);
							}
						}
					});
	            }
			});
		},	
		del: function (event) {
			var userIds = getSelectedRows();
			if(userIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../base/baseUser/delete",
				    data: JSON.stringify(userIds),
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
		},
		orgTree: function(){
			layer.open({
				type: 1,
				offset: 'lt',
				skin: 'layui-layer-lan',
				title: "选择机构",
				area: ['18%', '45%'],
				shade: 0,
				closeBtn: 0,
				shadeClose: false,
				content: jQuery("#orgLayer")

			});
		}
	}
});
/*function reloadOrgs(){
	var node = ztree.getSelectedNodes();
	$("#jqGrid").jqGrid('setGridParam', {postData: {orgId:node[0].orgId}}).trigger("reloadGrid");
}*/
function OnRightClick(){
	var node = ztree.getSelectedNodes();
	$("#jqGrid").jqGrid('setGridParam',{ 
        postData:{'orgId': node[0].orgId},
        page:1 
    }).trigger("reloadGrid");
}