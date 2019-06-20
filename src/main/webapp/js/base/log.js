$(function () {
    $("#jqGrid").jqGrid({
        url: '../base/log/list',
        datatype: "json",
        colModel: [		
			{ label: '日志ID', name: 'logId', width: 35, key: true,hidden : true,sortable: false  },
			{ label: '菜单url', name: 'logUrl', width: 150,sortable: false },
			{ label: '请求方式', name: 'httpMethod', width: 35,sortable: false },
			{ label: '操作结果', name: 'opResult', width: 35, formatter: function(value, options, row){
				return value == '2' ? 
						'<span class="label label-danger">失败</span>' : 
						'<span class="label label-success">成功</span>';
				}},
			{ label: '用户名称', name: 'userName', width: 45 },
			{ label: '用户ip地址', name: 'ipAddr', width: 60,sortable: false },
			{ label: '日志信息', name: 'logMsg', width: 40,sortable: false,formatter: function(value, options, row){
				return "<a href='#' onclick='detailInfor("+row.logId+")' >点击查看信息</a>";
				} },
			{ label: '开始时间', name: 'beginTimeName', width: 80 },
			{ label: '耗时（ms）', name: 'timeConsuming', width: 40,sortable: false }
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

var vm = new Vue({
	el:'#rrapp',
	data:{
	},
	methods: {
		queryByName: function (event) {
			reloadGrid();
		}
	}
});

function detailInfor(logId){
	$.ajax({
		type: "POST",
	    url: "../base/log/detailInfor",
	    data: JSON.stringify(logId),
	    success: function(r){
			if(r.code == 0){
				parent.jQuery("#logMsgResult").val(r.result);
				parent.$("#myModal").modal({
				    keyboard:true,
				    show:true
				});
//				parent.$('#myModal').on('show.bs.modal', function () {
//					  // 执行一些动作...
////					parent.$('html,body').animate({scrollTop:0});
//				})
//				layer.open({
//					type: 1,
//					skin: 'layui-layer-molv',
//					title: "日志详细信息",
//					area: ['550px', '370px'],
//					shadeClose: false,
//					offset: '100px',
//					content: jQuery("#detailInfo")
//				});
			}else{
				alert(r.msg);
			}
		}
	});
}

function reloadGrid(){
	var parm = $("#userName").val();
	parm = encodeURI(parm);
	var date = $("#reservation").val();
	if(parm != "undefined" || date != "undefined")
		$("#jqGrid").jqGrid('setGridParam', {postData: {userName:parm,timeSlot:date}}).trigger("reloadGrid");
}

//获取当前日期；
function detailInfo(value){
	alert(value);
	}
 function judge(data){
   if(data>10){
     data = data
   }else{
     data = "0"+data
   }
   return data
 }
 var date = new Date();
 var day = judge(date.getDate());
 var month =judge(date.getMonth()+1) ;
 var Year = date.getFullYear();
$(document).ready(function() {
   $('#reservation').daterangepicker({
     timePicker: true,
     // timePicker12Hour : false, //24小时制 
     timePickerIncrement : 60, 
     timePickerSeconds:true,
     timePickerIncrement: 1,
     format: 'YYYY-MM-DD h:mm A',
     startDate:Year+'-'+month+'-01',
     endDate:Year+'-'+month+'-'+day,
      showDropdowns : true,  
       showWeekNumbers : false, //是否显示第几周  
                 timePicker : true, //是否显示小时和分钟  
                 timePickerIncrement : 1, //时间的增量，单位为分钟  
                 timePicker12Hour : false, //是否使用12小时制来显示时间  
                 opens : 'right', //日期选择框的弹出位置  
                 buttonClasses : [ 'btn btn-default' ],  
                 applyClass : 'btn-small btn-primary blue',  
                 cancelClass : 'btn-small',  
                 format : 'YYYY-MM-DD HH:mm', //控件中from和to 显示的日期格式  
                 separator : ' - ',  
                 locale : {  
                     applyLabel : '确定',  
                     cancelLabel : '取消',  
                     fromLabel : '',  
                     toLabel : '至',  
                     customRangeLabel : '自定义',  
                     daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
                     monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                             '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
                     firstDay : 1  
                 }
   }, function(start, end, label) {
     console.log(start.toISOString(), end.toISOString(), label);
   });
});
