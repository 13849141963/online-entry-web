//角色ID
var roleId = T.p("roleId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		title:"新增角色",
		baseRoleStatusList:{},
		baseRoleSysList:{},
		selected:'1',
		selected1:'-1',
		role:{}
	},
	created: function() {
		if(roleId != null){
			this.getRole(roleId);
		} else {
			this.getDict();
		}
    },
	methods: {
		getRole: function(roleId){
            $.get("../base/role/info/"+roleId, function(r){
            	vm.role = r.role;
            	vm.baseRoleStatusList = r.role.baseRoleStatusList;
            	vm.baseRoleSysList = r.role.baseRoleSysList;
            	vm.selected = r.role.roleStatus;
            	vm.selected1 = r.role.sysId;
    		});
		},
		getDict: function(){
            $.get("../base/role/dict", function(r){
            	vm.role = r.role;
            	vm.baseRoleStatusList = r.role.baseRoleStatusList;
            	vm.baseRoleSysList = r.role.baseRoleSysList;
    		});
		},
		saveOrUpdate: function (event) {
			vm.role.roleStatus = vm.selected;
			vm.role.sysId = vm.selected1;
			var url = vm.role.roleId == null ? "../base/role/save" : "../base/role/update";
			$.ajax({
				type: "POST",
			    url: url,
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
