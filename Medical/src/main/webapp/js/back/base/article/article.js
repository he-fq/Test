/** 基础数据和基础设置 */
lh.config = {
	mainObjLowerName : 'article',
	mainObjUpperName : 'Article',
}

$(function() {
	loadGrid();
	initQueryComponent();
});

/** 加载主表格 */
function loadGrid(){
	lh.$grid.datagrid({
	    loadMsg:'',
		idField:'id',
		sortName:'id',
		sortOrder:'desc',
		striped:true,
		fitColumns:false,
		singleSelect:true,
		selectOnCheck:false,
		checkOnSelect:false,
		pagination:true,
		url:lh.config.gridUrl,
	    queryParams:lh.config.queryObj,//查询参数
	    pageSize:lh.grid.pageSize,//每页数据条数
	    pageList:lh.grid.pageList,//每页数据条数选择数组
	    width:lh.dom.clientSafeWidth-1,
	    height:lh.dom.clientHeight-125,
	    columns:[
		[
			{field:'checkbox',title:'多选框',checkbox:true},
			{field:'id',title:'',hidden:true},
	        {field:'operate',title:'操作',width:120,align:'center',formatter: function(value,row,index){
	        	return  '<span class="opt_alive"><span style="cursor: pointer;color: #EC4949" onclick="openMainObj('+index+',\'update\')">修改</span>'
	        	+'&nbsp;|&nbsp;<span class="update" style="cursor: pointer;color: green" onclick="openMainObj('+index+',\'read\')">查看</span></span>'
	        	+'<span class="opt_trash"><span style="cursor: pointer;color: #EC4949;" onclick="lh.commonBatchThoroughDelete('+row.id+')">彻底删除</span>'
	        	+'&nbsp;|&nbsp;<span style="cursor: pointer;color: green" onclick="lh.commonBatchRecover('+row.id+')">恢复</span></span>';
	        }},
			{field:'typeName',title:'栏目',width:160,align:'center'},
			{field:'username',title:'医生',width:120,align:'center'},
			{field:'title',title:'标题',width:480,align:'center'},
		   /* {field:'description',title:'描述',width:220,align:'center'},*/
			{field:'isTop',title:'置顶',width:60,align:'center',formatter: function(value,row,index){
	        	return value == 2 ? '<span style="color:orange">是</span>' : '否';
	        }},
	        {field:'mainStatus',title:'状态',width:60,align:'center',formatter: function(value,row,index){
	        	return value == 2 ? '<span style="color:orange">停用</span>' : '启用';
	        }},
	        {field:'deletedBy',title:'删除人',width:120,align:'center'},
	        {field:'deletedAt',title:'删除时间',width:120,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }},
	        {field:'updatedBy',title:'修改人',width:120,align:'center'},
	        {field:'updatedAt',title:'修改时间',width:120,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }},
	        {field:'createdBy',title:'创建人',width:120,align:'center'},
	        {field:'createdAt',title:'创建时间',width:120,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }}
	    ]],
        onLoadError: function(data){
	    	lh.backDatagridErrorCheck(data);
	    },
	    onDblClickRow: function(index, row){
	    	openMainObjWin(index, 'read');
        },
	    onLoadSuccess:function(data){
	    	lh.filtGridOperation();
	    	lh.clipboard();//复制功能
	   }  
	});
}

function onClickRowOfGrid(){}

function openMainObj(index, operation){
	var rows,data;
	if(index >= 0){
		rows = lh.$grid.datagrid('getRows');
		data = rows[index];//获取该行的数据
		var url = '/back/addOrUpdateArticlePage?articleId='+data.id+"&operation="+operation;
		//lh.jumpToUrl('/back/addOrUpdateArticlePage?articleId='+data.id+"&operation="+operation);
		window.parent.showMain('修改文章资讯', url);
	}
}

/** 初始化查询条件中的组件及数据 */
function initQueryComponent(){
	$('#sc_userId').combobox({
		valueField : 'id',
		textField : 'name',
		editable : true,
		multiple : false,
		required : false,
		panelHeight : 200,
		url : '/back/getDoctorArray'//getUserArray:此项目接收人是医生
	});
	$('#sc_typeId').combobox({
		valueField : 'id',
		textField : 'name',
		editable : false,
		multiple : false,
	    required : false,
	    panelHeight : 200,
	    url : '/back/getArticleTypeArray'
		/*data : [{
			'id' : 1,
			'name' : '启用'
		},{
			'id' : 2,
			'name' : '停用'
		}]*/
	});
	$('#sc_mainStatus').combobox({
		valueField : 'id',
		textField : 'name',
		editable : false,
		multiple : false,
	    required : false,
	    panelHeight : 'auto',
		data : [{
			'id' : 1,
			'name' : '启用'
		},{
			'id' : 2,
			'name' : '停用'
		}]
	});
	$('#sc_ascOrdesc').combobox({
		valueField : 'id',
		textField : 'name',
		editable : false,
		multiple : false,
		required : false,
		panelHeight : 'auto',
		data : [{
			'id' : 1,
			'name' : '创建时间升序'
		},{
			'id' : 2,
			'name' : '创建时间降序'
		},{
			'id' : 3,
			'name' : '标题升序'
		},{
			'id' : 4,
			'name' : '标题降序'
		}]
	});
}

/** 初始化表单中的组件及数据 */
function initFormComponent(){
	$('#f_userId').combobox({
		valueField : 'id',
		textField : 'name',
		editable : true,
		multiple : false,
		required : false,
		panelHeight : 200,
		url : '/back/getDoctorArray'//getUserArray:此项目接收人是医生
	});
	$('#f_mainStatus').combobox({
		valueField : 'id',
		textField : 'name',
		editable : false,
		multiple : false,
	    required : true,
	    panelHeight : 'auto',
		data : [{
			'id' : 1,
			'name' : '启用'
		},{
			'id' : 2,
			'name' : '停用'
		}]
	});
}

/** 新增修改操作执行之前的拦截方法，返回false则不执行新增修改，如无对应操作可不用申明此方法 */
function preAddOrUpdate(mainObj){
	return true;
}

