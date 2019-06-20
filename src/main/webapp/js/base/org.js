$(function () {
    $("#jqGrid").jqGrid({
		url: '../base/org/list',
        datatype: "json",
        colModel: [			
			{ label: '机构ID', name: 'orgId', width: 40, key: true },
			{ label: '机构名称', name: 'orgName', width: 60 },
			{ label: '上级机构', name: 'parentName', width: 60 },
			{ label: '所属公司', name: 'companyName', width: 60 },
			{ label: '机构简称', name: 'shortName', width: 60 },
			{ label: '描述', name: 'description', width: 60 },
			{ label: '地址', name: 'address', width: 60 }
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
        sortable:true,
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order",
            sidx: "sidx"
        },
        postData : {
        	corpId:corpId
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
				idKey: "orgId",
				pIdKey: "parentId",
				rootPId: -1
			},
			key: {
				url:"nourl"
			}
		},
		callback: {
			onClick: reloadOrgs
		}
	};
var ztree;

var corpId = T.p("corpId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		org:{
			parentId:0
		}
	},
	created: function() {	
		//加载机构树
		$.get("../base/org/select", function(r){
			console.log(r.orgList);
			ztree = $.fn.zTree.init($("#orgTree"), setting, r.orgList);
			var node = ztree.getNodeByParam("orgId", 0);
			ztree.selectNode(node);
		});
		this.orgTree();
    },
	methods: {
		insert: function (event) {
			var selectedNode = ztree.getSelectedNodes();
			if(selectedNode == null) {
				return ;
			}
			location.href = "org_add.html?selectedNodeId="+selectedNode[0].orgId;
		},
		update: function (event) {
			var orgId = getSelectedRow();
			if(orgId == null){
				return ;
			}
			
			location.href = "org_add.html?orgId="+orgId;
		},
		del: function (event) {
			var orgIds = getSelectedRows();
			if(orgIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../base/org/delete",
				    data: JSON.stringify(orgIds),
				    success: function(r){
				    	if(r.code === 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
								
								$.get("../base/org/select", function(r){
									ztree = $.fn.zTree.init($("#orgTree"), setting, r.orgList);
									var node = ztree.getNodeByParam("orgId", 0);
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
		orgTree: function(){
			layer.open({
				type: 1,
				offset: 'lt',
				skin: 'layui-layer-lan',
				closeBtn: 0,
				title: "选择机构",
				area: ['18%', '50%'],
				shade: 0,
				shadeClose: false,
				content: jQuery("#orgLayer")
			});
		}
	}
});
function reloadOrgs(){
	var node = ztree.getSelectedNodes();
	$("#jqGrid").jqGrid('setGridParam', {postData: {'orgId':node[0].orgId}}).trigger("reloadGrid");
}