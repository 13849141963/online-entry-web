$(function () {
    $("#jqGrid").jqGrid({
        url: '/'+rootPath+'/report/list.do',
        datatype: "json",
        postData : {"jsonList" : '{"asd":"asd"}'},
        colModel: [			
			{ label: '体检ID', name: 'examId', width: 45, key: true },
			{ label: '报告数据', name: 'examData', width: 75 },
			{ label: '创建时间', name: 'createTime', width: 90 }
        ],
		viewrecords: true,
        height: 400,
        rowNum: 10,
		rowList : [10,30,50],
//        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "list",
            page: "currPage",
            total: "totalPage",
            records: "totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});
jQuery("#jqGrid").setGridParam().hideCol("userId").trigger("reloadGrid");
var vm = new Vue({
	el:'#rrapp',
	data:{
		
	},
	methods: {
		update: function (event) {
			var examId = getSelectedRow();
			if(examId == null){
				return ;
			}
			
			location.href = "report_add.html?examId="+examId;
		},
		del: function (event) {
			var examId = getSelectedRows();
			if(examId == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					contentType :  "application/x-www-form-urlencoded",
				    url: "/"+rootPath+"/report/delete.do",
				    data : {'jsonList':JSON.stringify(examId)},  
				    dataType: "json",   
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
		}
	}
});