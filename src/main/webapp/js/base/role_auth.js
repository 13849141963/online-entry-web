var setting = {
	data: {
		simpleData: {
			enable: true,
			idKey: "functionId",
			pIdKey: "parentId",
			rootPId: -1
		},
		key: {
			url:"nourl"
		}
	},
	check:{
		enable:true,
		nocheckInherit:true
	}
};
var ztree;

//角色ID
var roleId = T.p("roleId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		role:{}
	},
	created: function() {
		//加载菜单树
		$.get("../base/func/perms/"+roleId, function(r){
			ztree = $.fn.zTree.init($("#menuTree"), setting, r.funcList);
			//展开所有节点
//			ztree.expandAll(true);
			if(roleId != null){
				vm.getRole(roleId);
			}
		});
    },
	methods: {
		getRole: function(roleId){
            $.get("../base/role/func/"+roleId, function(r){
            	vm.role = r.role;
                //勾选角色所拥有的菜单
    			var functionIds = vm.role.functionIdList;
    			for(var i=0; i<functionIds.length; i++) {
    				var node = ztree.getNodeByParam("functionId", functionIds[i]);
    				ztree.checkNode(node, true, false);
    			}
    		});
		},
		saveOrUpdate: function (event) {
			//获取选择的菜单
			var nodes = ztree.getCheckedNodes(true);
			var functionIdList = new Array();
			for(var i=0; i<nodes.length; i++) {
				functionIdList.push(nodes[i].functionId);
			}
			vm.role.functionIdList = functionIdList;
			$.ajax({
				type: "POST",
			    url: "../base/func/auth",
			    data: JSON.stringify(vm.role),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.back();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		back: function (event) {
			history.go(-1);
		}
	}
});
