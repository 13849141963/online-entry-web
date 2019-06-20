$(function () {
    $("#jqGrid").jqGrid({
        url: '/phexama-api/emp/List.do',
        datatype: "json",
        postData : {"jsonList" : '{"asd":"asd"}'},
        colModel: [			
			{ label: '用户ID', name: 'empId', width: 45, key: true },
			{ label: '用户名', name: 'empName', width: 75 },
			{ label: '邮箱', name: 'email', width: 90 },
			{ label: '手机号', name: 'mobile', width: 100 },
			{ label: '创建时间', name: 'createTime', width: 80},   
			{ label: '操作', name: 'empId', width: 80, formatter: function(value, options, row){
//				return value === 0 ? 
//					'<span class="label label-danger">禁用</span>' : 
//					'<span class="label label-success">正常</span>';
				return '<button type="button"  class="btn btn-primary btn-xs btn-toggledisabled" ><i class="fa fa-edit"></i>&nbsp;&nbsp;体检信息</button>';
			}}
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
			var empId = getSelectedRow();
			if(empId == null){
				return ;
			}
			
			location.href = "user_add.html?empId="+empId;
		},
		del: function (event) {
			var userIds = getSelectedRows();
			if(userIds == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					contentType :  "application/x-www-form-urlencoded",
				    url: "/phexama-api/emp/delete.do",
				    data : {'jsonList':JSON.stringify(userIds)},  
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