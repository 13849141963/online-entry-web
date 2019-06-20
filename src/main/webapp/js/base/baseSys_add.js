var sysId = T.p("sysId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		title:"新增应用",
		sys:{
			state:1,
		}
	},
	created: function() {
		if(sysId != null){
			this.title = "编辑应用";
			this.getSys(sysId)
		}
    },
	methods: {
		getSys: function(sysId){
			$.get("../base/baseSys/info/"+sysId, function(r){
				vm.sys = r.sys;
			});
		},
		
		saveOrUpdate: function (event) {
			var url = vm.sys.sysId == null ? "../base/baseSys/save" : "../base/baseSys/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.sys),
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