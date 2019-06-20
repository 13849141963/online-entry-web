//用户ID
var userId = T.p("userId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		title:"新增用户",
		
		orgList:{},
		sexList:{},
		userStatusList:{},
		userTypeList:{},
		
		/*yesOrNoList:{},
		idenFactorTypeList:{},*/
		user:{
			status:1
		}
	},
	created: function() {
		//获取角色信息
		this.getOrgList()
		this.getSexList()
		this.getUserStatusList()
		this.getUserTypeList()
		/*this.getYesOrNoList()
		this.getIdenFactorType()*/
		if(userId != null){
			this.title = "修改用户";
			this.getUser(userId)
		}
    },
	methods: {
		getUser: function(userId){
			$.get("../base/baseUser/info/"+userId, function(r){
				vm.user = r.user;
			});
		},
		getOrgList: function(){
			$.get("../base/org/selectOrgSel", function(r){
				vm.orgList = r.list;
			});
		},
		getSexList: function(){
			$.get("../base/baseUser/selectSex", function(r){
				vm.sexList = r.list;
			});
		},
		getUserStatusList: function(){
			$.get("../base/baseUser/selectStatus", function(r){
				vm.userStatusList = r.list;
			});
		},
		getUserTypeList: function(){
			$.get("../base/baseUser/selectType", function(r){
				vm.userTypeList = r.list;
			});
		},
		
		saveOrUpdate: function (event) {
			var url = vm.user.userId == null ? "../base/baseUser/save" : "../base/baseUser/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.user),
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