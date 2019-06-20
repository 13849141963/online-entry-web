$(function () {
    $("#jqGrid").jqGrid({
        url: '../base/baseSys/list',
        datatype: "json",
        colModel: [			
			{ label: 'sysId', name: 'sysId', width: 45, key: true },
			{ label: '应用名字', name: 'sysName', width: 90 },
			{ label: '应用标识', name: 'alias', width: 75 },
			{ label: '应用地址', name: 'sysUrl', width: 100 },
			{ label: '应用描述', name: 'remark', width: 100 },
			{ label: '状态', name: 'openFlag', width: 80, formatter: function(value, options, row){
				return value === 0 ? 
						'<span class="label label-danger">禁用</span>' : 
							'<span class="label label-success">正常</span>';
			}},
			{ label: '创建人姓名', name: 'creatorName', width: 100 },
			{ label: '操作时间', name: 'operTime', width: 100 }
        ],
		viewrecords: true,
        height: 400,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 30, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order",
            sidx: "sidx"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        	jQuery("#jqGrid").setGridParam().hideCol("sysId").trigger("reloadGrid");
        	jQuery("#jqGrid").setGridParam().hideCol("operTime").trigger("reloadGrid");
        }
    });
});
var vm = new Vue({
	el:'#rrapp',
	data:{
		
	},
	methods: {
		update: function (event) {
			var sysId = getSelectedRow();
			if(sysId == null){
				return ;
			}
			
			location.href = "baseSys_add.html?sysId="+sysId;
		},
		del: function (event) {
			var sysIds = getSelectedRows();
			if(sysIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../base/baseSys/delete",
				    data: JSON.stringify(sysIds),
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
		},
		changeState: function (event) {
			var sysIds = getSelectedRows();
			if(sysIds == null){
				return ;
			}
			
			confirm('确定要改变选中的应用的状态？', function(){
				$.ajax({
					type: "POST",
					url: "../base/baseSys/changeState",
					data: JSON.stringify(sysIds),
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