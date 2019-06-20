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
		}
	};
var ztree;
//公司ID
var corpId = T.p("corpId");
var vm = new Vue({
	el:'#rrapp',
	data:{
		title:"新增公司",
		corp:{
			parentName:"",
			parentId:0
		}
	},
	created: function() {	
		if(corpId != null){
			this.title = "修改公司";
			this.getCorp(corpId);
		}
		
		//加载机构树
		$.get("../base/corp/select", function(r){
			ztree = $.fn.zTree.init($("#corpTree"), setting, r.corpList);
			var node = ztree.getNodeByParam("corpId", 0);
			ztree.selectNode(node);						
		});		
    },
	methods: {
		getCorp: function(corpId){
			$.get("../base/corp/info/"+corpId, function(r){
                vm.corp = r.corp;
            });
		},		
		saveOrUpdate: function (event) {
			var url = vm.corp.corpId == null ? "../base/corp/save" : "../base/corp/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.corp),
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
					var node = ztree.getSelectedNodes();
					//选择上级菜单
					vm.corp.parentId = node[0].corpId;
					vm.corp.parentName = node[0].companyName;
					
					layer.close(index);
	            }
			});
		},
		back: function (event) {
			history.go(-1);
		}
	}
});

