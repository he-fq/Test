/** 基础数据和基础设置 */
lh.config = {
	mainObjLowerName : 'medication',
	mainObjUpperName : 'Medication'
}
lh.forceAdd = false;
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
	    height:lh.dom.clientHeight-160,
	    columns:[
		[
			{field:'checkbox',title:'多选框',checkbox:true},
			{field:'id',title:'',hidden:true},
			{field:'operate',title:'操作',width:120,align:'center',formatter: function(value,row,index){
				return  '<span class="opt_alive"><span style="cursor: pointer;color: #EC4949" onclick="openMainObjWin('+index+',\'update\')">修改</span>'
				+'&nbsp;|&nbsp;<span class="update" style="cursor: pointer;color: green" onclick="openMainObjWin('+index+',\'read\')">查看</span></span>'
				+'<span class="opt_trash"><span style="cursor: pointer;color: #EC4949;" onclick="lh.commonBatchThoroughDelete('+row.id+')">彻底删除</span>'
				+'&nbsp;|&nbsp;<span style="cursor: pointer;color: green" onclick="lh.commonBatchRecover('+row.id+')">恢复</span></span>';
			}},
			{field:'medicationTypeName',title:'药品类型',width:120,align:'center'},
			{field:'name',title:'药物名称',width:120,align:'center'},
			{field:'englishName',title:'英语名称',width:120,align:'center'},
			{field:'usageAndDosage',title:'用法',width:120,align:'center'},
			{field:'attention',title:'禁忌',width:120,align:'center'},
			{field:'producer',title:'生厂商',width:120,align:'center'},
			{field:'produceAddress',title:'生产地址',width:120,align:'center'},
			{field:'producerTel',title:'生产商电话',width:120,align:'center'},
			{field:'producerCode',title:'生产商邮编',width:120,align:'center'},
			{field:'lotNumber',title:'产品批号',width:120,align:'center'},
			{field:'produceDate',title:'生产日期',width:120,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }},
			/*{field:'validTill',title:'有效期至',width:120,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }},*/
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

/** 初始化查询条件中的组件及数据 */
function initQueryComponent(){
	$('#sc_typeId').combobox({
		valueField : 'id',
		textField : 'name',
		editable : false,
		multiple : false,
	    required : false,
	    panelHeight : '200',
	    url:"/back/getMedicationTypeArray"
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
			'name' : '名称升序'
		},{
			'id' : 2,
			'name' : '名称降序'
		},{
			'id' : 3,
			'name' : '药品类型升序'
		},{
			'id' : 4,
			'name' : '药品类型降序'
		},{
			'id' : 5,
			'name' : '创建时间升序'
		},{
			'id' : 6,
			'name' : '创建时间降序'
		}]
	});
}

/** 初始化表单中的组件及数据 */
function initFormComponent(){
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
	$('#f_typeId').combobox({
		valueField : 'id',
		textField : 'name',
		editable : false,
		multiple : false,
	    required : true,
	    panelHeight : '200',
	    url:"/back/getMedicationTypeArray"
		/*data : [{
			'id' : 1,
			'name' : '启用'
		},{
			'id' : 2,
			'name' : '停用'
		}]*/
	});
}

/** 新增修改操作执行之前的拦截方法，返回false则不执行新增修改，如无对应操作可不用申明此方法 */
function preAddOrUpdate(mainObj){
	if(!mainObj)return;
	if(mainObj.produceDate){
		mainObj.produceDate = mainObj.produceDate + ' 00:00:00';
	}
	if(null == mainObj.id && !lh.forceAdd){//添加时检测重名
		lh.post('back', '/back/getMedicationCountByName', {name:mainObj.name},function(rsp){
			if(rsp.success){
				var medicationCount = rsp.medicationCount;
				if(!medicationCount || medicationCount<= 0){
					lh.forceAdd = true;
					lh.$mainObjForm.submit();//没有重名，直接提交
				}else{
					$.messager.confirm('提示', '存在同名药品，是否继续添加？', function(r){
						if (r){
							lh.forceAdd = true;
							lh.$mainObjForm.submit();
						}
					});
				}
			}else{
				lh.alert(rsp.msg);
			}
		});
		return false;
	}
	lh.forceAdd = false;
	return true;
}

function afterOpenWin(data, operation, isReadOnly){
	if(!data){
		$('#f_mainStatus').combobox('setValue', 1);
		return;
	}
	if(data.produceDate){
		$('#f_produceDate').datebox('setValue', lh.formatDate({date:new Date(data.produceDate),flag:'date'}));
	}
}

function exportMedication(){
	var obj = lh.getQueryObj();
	delete obj.ascOrdesc;
	window.location.href = '/back/medicationExcel?obj='+obj;
}
