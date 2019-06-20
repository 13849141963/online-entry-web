$(function () {
    $("#jqGrid").jqGrid({
        url: '../base/corp/list',
        datatype: "json",
        colModel: [			
			{ label: '公司ID', name: 'corpId', width: 40, key: true},
			{ label: '公司名称', name: 'companyName', width: 60 },
			{ label: '上级公司', name: 'parentName', width: 60 },
			{ label: '公司简称', name: 'shortName', width: 40},
			{ label: '描述', name: 'description', width: 60 },
			{ label: '所在地区', name: 'corpArea', width: 60 },
			{ label: '详细地址', name: 'officeAddr', width: 60 },
			{ label: '公司网址', name: 'website', width: 60 }
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
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var setting = {
		data: {
			simpleData: {
				enable: true,
				idKey: "corpId",
				pIdKey: "parentId",
				rootPId: -1
			},
			key: {
				url:"nourl"
			}
		},
		callback: {
			onClick: reloadCorps
		}
	};
var ztree;

var vm = new Vue({
	el:'#rrapp',
	data:{
		corp:{
			parentId:0
		}
	},
	created: function() {		
		//加载机构树
		$.get("../base/corp/select", function(r){
			ztree = $.fn.zTree.init($("#corpTree"), setting, r.corpList);
			var node = ztree.getNodeByParam("corpId", 0);
			ztree.selectNode(node);
		});
		this.corpTree();
    },
	methods: {
		update: function (event) {
			var corpId = getSelectedRow();
			if(corpId == null){
				return ;
			}
			
			location.href = "corp_add.html?corpId="+corpId;
		},
		manageOrg: function (event) {
			var corpId = getSelectedRow();
			if(corpId == null){
				return ;
			}
			
			location.href = "org.html?corpId="+corpId;
		},
		del: function (event) {
			var corpIds = getSelectedRows();
			if(corpIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../base/corp/delete",
				    data: JSON.stringify(corpIds),
				    success: function(r){
				    	if(r.code === 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
								
								$.get("../base/corp/select", function(r){
									ztree = $.fn.zTree.init($("#corpTree"), setting, r.corpList);
									var node = ztree.getNodeByParam("corpId", 0);
									ztree.selectNode(node);
								});
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		corpTree: function(){
			layer.open({
				type: 1,
				offset: 'lt',
				skin: 'layui-layer-lan',
				closeBtn: 0,
				title: "选择公司",
				area: ['18%', '50%'],
				shade: 0,
				shadeClose: false,
				content: jQuery("#corpLayer")
			});
		}
	}
});
function reloadCorps(){
	var node = ztree.getSelectedNodes();
	$("#jqGrid").jqGrid('setGridParam', {postData: {corpId:node[0].corpId}}).trigger("reloadGrid");
}