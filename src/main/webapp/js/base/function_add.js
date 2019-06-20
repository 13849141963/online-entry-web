//功能ID
var functionId = T.p("selectedNodeId");
var selectGridId = T.p("selectGridId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		title:"新增功能",
		baseFunctionTypeList:{},
		selected:'1',
		func:{}
	},
	created: function() {
		if (selectGridId != null) 
			this.getFunction(selectGridId);
		else 
			this.getFunction(functionId);
    },
	methods: {
		getFunction: function(functionId){
            $.get("../base/func/info/"+functionId, function(r){
            	vm.func = r.func;
            	vm.baseFunctionTypeList = vm.func.baseFunctionTypeList;
            	if (vm.func.functionType != null) 
            		vm.selected = vm.func.functionType;
    		});
		},
		saveOrUpdate: function (event) {
			vm.func.functionId = selectGridId;
			vm.func.functionType = vm.selected;
			var url = selectGridId == null ? "../base/func/save" : "../base/func/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.func),
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
if (selectGridId != null) {
	vm.title = "修改功能";
}