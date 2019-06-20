$(function () {
    $("#jqGrid").jqGrid({
        url: '../base/func/list',
        datatype: "json",
        colModel: [			
			{ label: '功能ID', name: 'functionId', width: 30, key: true,hidden : true,sortable: false },
			{ label: '功能名称', name: 'functionName', width: 40 },
			{ label: '权限标识', name: 'perm', width: 100,sortable: false },
			{ label: '功能url', name: 'url', width: 60,sortable: false },
			{ label: '父功能', name: 'parentName', width: 40 },
			{ label: '所属系统', name: 'sysName', width: 60 },
			{ label: '父功能ID', name: 'parentId', width: 30,hidden : true,sortable: false },
			{ label: 'ID系统', name: 'sysId', width: 60,hidden : true,sortable: false },
			{ label: '功能类型', name: 'functionTypeName', width: 30,sortable: false },
			{ label: '功能类型', name: 'functionType', width: 30 ,hidden : true,sortable: false},
//			{ label: '描述', name: 'remark', width: 100 },
			{ label: '公司ID', name: 'corpId', width: 20 ,hidden : true,sortable: false},
			{ label: '状态', name: 'funState', width: 40 ,hidden : true,sortable: false},
			{ label: '排序', name: 'showOrder', width: 20 ,hidden : true,sortable: false},
			{ label: '叶子节点', name: 'isLeaf', width: 20 ,hidden : true,sortable: false},
			{ label: '层级', name: 'funcLevel', width: 20 ,hidden : true,sortable: false},
//			{ label: '操作人', name: 'operator', width: 30 },
//			{ label: '操作时间', name: 'operTime', width: 80 }
			{ label: '创建人', name: 'creatorName', width: 30 },
			{ label: '创建时间', name: 'createTime', width: 80 }
        ],
		viewrecords: true,
        height: 400,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
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
        }
    });
});

var setting = {
		data: {
			simpleData: {
				enable : true
			},
			key: {
				url:"nourl"
			}
		},
		async: {
			enable: true,
			url:'../base/func/getFuncTree',
			autoParam:["id=id"],
			type:"post",
			dataFilter: ajaxDataFilter
		},
		callback: {
			onClick: reloadFuncs
		}
	};
var ztree;

var vm = new Vue({
	el:'#rrapp',
	data:{
		org:{
			parentId:0
		}
	},
	created: function() {	
		//加载功能树
		$.get("../base/func/getFuncTree", function(r){
			ztree = $.fn.zTree.init($("#funcTree"), setting, r.funcList);
			var nodes = ztree.getNodes();
			ztree.expandNode(nodes[0], true, true, true);
			ztree.selectNode(nodes[0]);
			setTimeout('reloadFuncs()',100); 
		});
		this.funcTree();
    },
	methods: {
		insert: function (event) {
			var selectedNode = ztree.getSelectedNodes();
			if(selectedNode == null) {
				return ;
			}
			location.href = "function_add.html?selectedNodeId="+selectedNode[0].id;
		},
		update: function (event) {
			var selectGridId = getSelectedRow();
			if(selectGridId == null) {
				return ;
			}
			location.href = "function_add.html?selectGridId="+selectGridId;
		},
		del: function (event) {
			var selectGridIds = getSelectedRows();
			if(selectGridIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../base/func/delete",
				    data: JSON.stringify(selectGridIds),
				    success: function(r){
				    	if(r.code === 0){
				    		if(r.isRootNode != null){
				    			alert(r.isRootNode, function(index){
									$("#jqGrid").trigger("reloadGrid");
									
									$.get("../base/func/getFuncTree", function(r){
										ztree = $.fn.zTree.init($("#funcTree"), setting, r.funcList);
										var nodes = ztree.getNodes();
										ztree.expandNode(nodes[0], true, true, true);
										ztree.selectNode(nodes[0]);
										reloadFuncs();
									});
								});
				    		} else {
				    			alert('操作成功', function(index){
									$("#jqGrid").trigger("reloadGrid");
									
									$.get("../base/func/getFuncTree", function(r){
										ztree = $.fn.zTree.init($("#funcTree"), setting, r.funcList);
										var nodes = ztree.getNodes();
										ztree.expandNode(nodes[0], true, true, true);
										ztree.selectNode(nodes[0]);
										reloadFuncs();
									});
								});
				    		}
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		funcTree: function(){
			layer.open({
				type: 1,
				offset: 'lt',
				skin: 'layui-layer-lan',
				title: "系统权限",
				area: ['18%', '80%'],
				shade: 0,
				closeBtn: 0,
				shadeClose: false,
				content: jQuery("#funcLayer")
			});
		}
	}
});
function ajaxDataFilter(treeId, parentNode, responseData) {
    if (responseData) {
    	responseData = responseData.funcList;
    }
    return responseData;
};
function reloadFuncs(){
	var node = ztree.getSelectedNodes();
//	alert(node[0].id);
	$("#jqGrid").jqGrid('setGridParam', {postData: {functionId:node[0].id}}).trigger("reloadGrid");
}