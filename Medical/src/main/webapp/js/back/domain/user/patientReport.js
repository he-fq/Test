/** 基础数据和基础设置 */
lh.config = {
	mainObjLowerName : 'patientReport',
	mainObjUpperName : 'PatientReport',
	queryObj:{isLink:1}
}
if(!lh.param)lh.param = {};
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
	    height:lh.dom.clientHeight-88,
	    columns:[
		[
			{field:'checkbox',title:'多选框',checkbox:true},
			{field:'id',title:'',hidden:true},
			{field:'operate',title:'操作',width:160,align:'center',formatter: function(value,row,index){
				return  '<span class="opt_alive"><span style="cursor: pointer;color: #EC4949" onclick="window.open(\'/back/prdPrint/'+row.id+'\');">打印</span>'
				+' | <span class="update" style="cursor: pointer;color: #1B9AF7" onclick="updateReportByAdiconBarcode(\''+row.adiconBarcode+'\');">更新</span>'
				+' | <span class="update" style="cursor: pointer;color: green" onclick="lh.jumpToUrl(\'/back/patientReportDetail/'+row.id+'\');">修改</span></span>'
				+'<span class="opt_trash"><span style="cursor: pointer;color: #EC4949;" onclick="lh.commonBatchThoroughDelete('+row.id+')">彻底删除</span>'
				+'&nbsp;|&nbsp;<span style="cursor: pointer;color: green" onclick="lh.commonBatchRecover('+row.id+')">恢复</span></span>';
			}},
	        {field:'adiconBarcode',title:'艾迪康编号',width:120,align:'center'},
	        {field:'itemName',title:'项目名称',width:120,align:'center'},
	        {field:'patientName',title:'患者姓名',width:120,align:'center'},
	        {field:'attrStr2',title:'被检测人',width:120,align:'center'},
	        {field:'doctorName',title:'所属医生',width:120,align:'center'},
	        {field:'sexName',title:'性别',width:80,align:'center'},
	        {field:'age',title:'年龄',width:80,align:'center'},
	        {field:'resultHint',title:'检测结果',width:120,align:'center',formatter: function(value,row,index){
	        	var resultHint = value;
				if(resultHint == 'd'){
					return '<span style="color:red;">异常</span>';//'低'
				}else if(resultHint == 'z'){
					return '<span style="color:green;">正常</span>';
				}else if(resultHint == 'g'){
					return '<span style="color:red;">异常</span>';//'高'
				}
	        	return lh.formatGridDate(value);
	        }},
	        {field:'technician',title:'检测人',width:120,align:'center'},	
	       /* {field:'attrDate',title:'出生日期',width:100,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }},*/
	        /*{field:'ageType',title:'年龄类型',width:120,align:'center'},*/
	        {field:'attrDate',title:'采血日期',width:100,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }},
	        {field:'collectionDate',title:'采集时间',width:100,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }},
	        {field:'lisDate',title:'测试时间',width:100,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }},
	        {field:'reportDate',title:'报告时间',width:100,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }},
	        /*{field:'serialNumber',title:'样本标号',width:120,align:'center'},
	        {field:'sampleType',title:'样本种类',width:120,align:'center'},
	        {field:'clinicalDiagnosis',title:'诊断结果',width:120,align:'center'},
	        {field:'itemCode',title:'艾迪康检测项目编号',width:120,align:'center'},
	        {field:'itemName_CN',title:'检测项目名称',width:120,align:'center'},
	        {field:'result',title:'项目测定值',width:120,align:'center'},
	        {field:'resultReference',title:'参考值',width:120,align:'center'},
	        {field:'resultUnit',title:'参考值单位',width:120,align:'center'},
	        {field:'resultPathology',title:'病理结果',width:120,align:'center'},
	        {field:'sampleChar',title:'临床症状',width:120,align:'center'},*/
	        {field:'mainStatus',title:'状态',width:60,align:'center',formatter: function(value,row,index){
	        	return value == 2 ? '<span style="color:orange">停用</span>' : '启用';
	        }},
	        {field:'deletedBy',title:'删除人',width:100,align:'center'},
	        {field:'deletedAt',title:'删除时间',width:100,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }},
	        {field:'updatedBy',title:'修改人',width:100,align:'center'},
	        {field:'updatedAt',title:'修改时间',width:100,align:'center',formatter: function(value,row,index){
	        	return lh.formatGridDate(value);
	        }},
	        {field:'createdBy',title:'创建人',width:100,align:'center'},
	        {field:'createdAt',title:'创建时间',width:100,align:'center',formatter: function(value,row,index){
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

function updateReportByAdiconBarcode(adiconBarcode){
	if(!adiconBarcode){
		 $.messager.alert('提示', '条形码为空，无法执行更新操作');return;
	}
	lh.post("back", '/back/updateReportByAdiconBarcode', {adiconBarcode:adiconBarcode}, function(rsp){
		if(rsp.success){
			lh.$grid.datagrid('reload');
			$.messager.alert('提示', '数据更新成功');
		}else{
			$.messager.alert('提示', rsp.msg);
		}
	});
}

function onClickRowOfGrid(){}

/** 初始化查询条件中的组件及数据 */
function initQueryComponent(){
	$('#sc_sex').combobox({
		valueField : 'id',
		textField : 'name',
		editable : false,
		multiple : false,
		panelHeight : 'auto',
		data : [{
			'id' : 1,
			'name' : '男'
		},{
			'id' : 2,
			'name' : '女'
		}]
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
	/*$('#sc_adiconBarcode').combobox({
		valueField : 'id',
		textField : 'name',
		editable : false,
		multiple : false,
		required : false,
		panelHeight : '200',
		url:'/back/getPatientReportArray'
	});*/
	$('#sc_ascOrdesc').combobox({
		valueField : 'id',
		textField : 'name',
		editable : false,
		multiple : false,
		required : false,
		panelHeight : 'auto',
		data : [{
			'id' : 1,
			'name' : '用户名升序'
		},{
			'id' : 2,
			'name' : '用户名降序'
		},{
			'id' : 3,
			'name' : '创建时间升序'
		},{
			'id' : 4,
			'name' : '创建时间降序'
		}]
	});
}

/** 初始化表单中的组件及数据 */
function initFormComponent(){
	/*if(!UPLOAD_OBJ.hasInit){
		initUploadSimple({showEdBtns:true,showItemDiv:true,multiFlag:false,multiReplace:true,
			successFun:function(fileId, filePath){
				$("#upld_container_"+fileId).remove();
				$("#pic").attr('src', filePath);
		}});
	}
	$("#upload_outer_div").empty();*/

	$('#f_sex').combobox({
		valueField : 'id',
		textField : 'name',
		editable : false,
		multiple : false,
		required : true,
		panelHeight : 'auto',
		data : [{
			'id' : 1,
			'name' : '男'
		},{
			'id' : 2,
			'name' : '女'
		}]
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
	$('#f_patientId').combobox({
		valueField : 'id',
		textField : 'name',
		editable : true,
		multiple : false,
	    required : true,
	    panelHeight : 200,
	    filter: lh.comboboxDefaultFilter,
	    url : '/back/getUserArray',
	    onSelect:function(data){
	    	freshPatientData(data);
		}
	});
	$('#f_doctorId').combobox({
		valueField : 'id',
		textField : 'name',
		editable : false,
		multiple : false,
	    required : true,
	    panelHeight : 200,
	    filter: lh.comboboxDefaultFilter,
	    url : '/back/getDoctorArray'
	});
	$('#f_itemCodes').combobox({
		valueField : 'code',
		textField : 'name',
		editable : true,
		multiple : false,
	    required : true,
	    panelHeight : 200,
	    filter: lh.comboboxDefaultFilter,
	    url : '/back/getCancerArray'
	});
	
	$('#f_attrInt').combobox({//职业
		valueField : 'id',
		textField : 'codeName',
		editable : false,
		multiple : false,
		required : false,
		panelHeight : 200,
		url : "/back/getDictArrayByParentCode?parentCode=job"
	});
	
}


function freshPatientData(data){
	lh.param.patientId = null;//先清空患者ID
	if(!data)return;
	$.post('/back/getUserById', {userId : data.id}, function(rsp){
		if(rsp.success){
			var user = rsp.user;
			if(!user){
				$.messager.alert('提示', '该用户不存在');return;
			}
			lh.param.patientId = data.id;
			$('#f_patientIdcardNum').textbox('setValue',user.idcardNum);
			$('#f_patientName').textbox('setValue',user.realName);
			$('#f_patientPhone').textbox('setValue',user.phone);
			$('#f_sex').combobox('setValue', user.sex);
			$('#f_patientJob').combobox('setValue',user.jobId);
			$('#f_age').numberbox('setValue', user.age);
			//$('#f_birthday').datebox('setValue', lh.formatDate(user.birthday));
		}else{
			$.messager.alert('提示', rsp.msg);
		}
	});
	
}

/** 新增修改操作执行之前的拦截方法，返回false则不执行新增修改，如无对应操作可不用申明此方法 */
function preAddOrUpdate(mainObj){
	if(!mainObj)return false;
	mainObj.itemCode = mainObj.itemCodes;
	if(lh.param.patientId){
		mainObj.patientId = lh.param.patientId;
	}
	mainObj.patientPhone = mainObj.phone;
	//mainObj.attrInt = mainObj.patientJob;//工作
	mainObj.attrDate = mainObj.attrDate;//采血日期
	if(mainObj.attrDate)mainObj.attrDate += ' 00:00:00';
	return true;
}

/** 回调：打开窗口设置完成后 执行此方法 */
function afterOpenWin(data, operation, isReadOnly){
	if(!data){
		$('#f_attrDate').datebox('setValue',  lh.formatDate({date:new Date(),flag:'date'}));
		return;
	}
	/*$('#f_idcardNum').textbox('readonly', true);
	$('#f_patientName').textbox('readonly', true);
	$('#f_phone').textbox('readonly', true);
	$('#f_sex').combobox('readonly', true);
	$('#f_patientJob').combobox('readonly', true);
	$('#f_attrDate').datebox('readonly', true);*/
	
	$('#f_attrInt').combobox('setValue', data.attrInt);
	if(data.attrDate){
		$('#f_attrDate').datebox('setValue', lh.formatDate({date:data.attrDate,flag:'date'}));
	}
	$('#f_age').numberbox('setValue', data.age);
	
}
//血液检测导出js
function exportpatientReport(){
	var obj = lh.getQueryObj();
	delete obj.ascOrdesc;
	window.location.href = '/back/patientReportExcel?obj='+obj;
}


