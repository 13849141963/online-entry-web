//用户ID
var empId = T.p("empId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		title:"新增员工信息",
		selectRoleList:{},
		selectCropList:{},
		emp:{
//			status:1,
//			sysIdList:[],
//			roleIdList:[],
			empId:null
		}
	},
	created: function() {
		if(empId != null){
			this.title = "查看员工信息";
			this.getEmp(empId)
		}
		//获取角色信息
		//this.getRoleList();
		//this.getCropList();
    },
	methods: {
		getEmp: function(empId){
			$.get("/"+rootPath+"/emp/info.do?empId="+empId, function(r){
				vm.emp = r;
			});
		},
		getRoleList: function(){
			$.get("../sys/role/select", function(r){
				vm.selectRoleList = r.list;
			});
		},
		getCropList: function(){
			$.get("../base/baseSys/selectSys", function(r){
				vm.selectCropList = r.list;
			});
		},
		saveOrUpdate: function (event) {
			var url = vm.emp.empId == null ? "/"+rootPath+"/emp/save.do" : "/"+rootPath+"/emp/update.do";
			//console.log(vm.emp.empId);
			$.ajax({
				type: "POST",
			    url: url,
				contentType :  "application/x-www-form-urlencoded",
			    data: {'jsonList':JSON.stringify(vm.emp)},
			    dataType: "json", 
			    success: function(r){
			    	if(r.code == 0){
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