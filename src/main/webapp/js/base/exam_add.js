//用户ID
var examId = T.p("examId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		title:"新增员工体检信息",
		exam:{
			examId:null
		},
		phReportJsonData:{

		}
	},
	created: function() {
		if(examId != null){
			this.title = "查看员工体检信息";
			this.getExam(examId)
		}
		//获取角色信息
		//this.getRoleList();
		//this.getCropList();
    },
	methods: {
		getExam: function(examId){
			$.get("/"+rootPath+"/exam/info.do?examId="+examId, function(r){
				switch(r.examStatus)
				{
				case 1:
				  r.examStatus='已预约';
				  break;
				case 2:
				  r.examStatus='取消预约';
				  break;
				case 3:
				  r.examStatus='体检报告已回传';					  
					  break;
				case 4:
			      r.examStatus='体检报告已上传至KJD';	
					  break;
				case 5:
				  r.examStatus='体检分析数据已取回';						
					break;
				default:
				}
				vm.exam = r;
			});
			$.get("/"+rootPath+"/phreportjsondata/list.do?examId="+examId, function(r){
				if(typeof(r.list[0])=='undefined'){
					
				}else{
					vm.phReportJsonData = r.list[0];
				}
				
			});
		},
		saveOrUpdate : function(event) {
			var url = vm.exam.examId == null ? "/"+rootPath+"/exam/save.do"
					: "/"+rootPath+"/exam/update.do";
			 //console.log(vm.exam.examId);
			$.ajax({
				type : "POST",
				url : url,
				contentType : "application/x-www-form-urlencoded",
				data : {
					'jsonList' : JSON.stringify(vm.exam)
				},
				dataType : "json",
				success : function(r) {
					if (r.code == 0) {
						alert('操作成功', function(index) {
							vm.back();
						});
					} else {
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