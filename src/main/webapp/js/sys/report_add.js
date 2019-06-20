//用户ID
var examId = T.p("examId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		title:"新增员工信息",
		selectRoleList:{},
		selectCropList:{},
		report:{
			examId:null
		}
	},
	created: function() {
		if(examId != null){
			this.title = "查看体检报告信息";
			this.getReport(examId)
		}
    },
	methods: {
		getReport: function(examId){
			$.get("/"+rootPath+"/report/info.do?examId="+examId, function(r){
				vm.report = r;
			});
		},
		saveOrUpdate: function (event) {
			var url = vm.exam.examId == null ? "/"+rootPath+"/exam/save.do" : "/"+rootPath+"/exam/update.do";
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