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
		}
	};
var corpsetting = {
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
		}
	};
var ztree;
var corptree;
//机构ID
var orgId = T.p("orgId");
var selectedNodeId = T.p("selectedNodeId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		title:"新增机构",
		org:{
			parentName:"",
			parentId:selectedNodeId,
			companyName:"",
			corpId:1
		},
	},
	created: function() {	
		if(orgId != null){
			this.title = "修改机构";
			this.getOrg(orgId);
		}
		
		//加载机构树
		$.get("../base/org/select", function(r){
			ztree = $.fn.zTree.init($("#orgTree"), setting, r.orgList);
			var node = ztree.getNodeByParam("orgId", 0);
			ztree.selectNode(node);						
		});	
		//加载公司树
		/*$.get("../base/corp/select", function(r){
			corptree = $.fn.zTree.init($("#corpTree"), corpsetting, r.corpList);
			var node = corptree.getNodeByParam("corpId", 0);
			corptree.selectNode(node);						
		});*/
    },
	methods: {
		getOrg: function(orgId){
			$.get("../base/org/info/"+orgId, function(r){
                vm.org = r.org;
            });
		},		
		saveOrUpdate: function (event) {
			var url = vm.org.orgId == null ? "../base/org/save" : "../base/org/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.org),
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
		orgTree: function(){
			layer.open({
				type: 1,
				offset: '50px',
				skin: 'layui-layer-lan',
				title: "选择机构",
				area: ['18%', '50%'],
				shade: 0,
				shadeClose: false,
				content: jQuery("#orgLayer"),
				btn: ['确定', '取消'],
				btn1: function (index) {
					var node = ztree.getSelectedNodes();
					//选择上级菜单
					vm.org.parentId = node[0].orgId;
					vm.org.parentName = node[0].orgName;
					
					layer.close(index);
	            }
			});
		},
		corpTree: function(){
			layer.open({
				type: 1,
				offset: '50px',
				skin: 'layui-layer-lan',
				title: "选择公司",
				area: ['18%', '50%'],
				shade: 0,
				shadeClose: false,
				content: jQuery("#corpLayer"),
				btn: ['确定', '取消'],
				btn1: function (index) {
					var node = corptree.getSelectedNodes();
					//选择上级菜单
					vm.org.corpId = node[0].corpId;
					vm.org.companyName = node[0].companyName;
					
					layer.close(index);
	            }
			});
		},
		back: function (event) {
			history.go(-1);
		}
	}
});

