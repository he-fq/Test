<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/views/common/meta_info.htm"%>
<%@ include file="/views/common/common_back_css.htm"%>
<link rel="stylesheet" type="text/css" href="/css/back/back.css"
	title="v" />
</head>
<body style="min-width: 1000px;">
	<!-- 查询条件  开始 -->
	<table id="mainQueryTable">
		<tbody>
			<tr class="tr_ht" align="right">
				<td class="td_pad"><span>科室名称：</span><input role="textbox"
					id="sc_name" class="domain-input easyui-textbox width140" /></td>
				<td class="td_pad"><span>排序：</span><input role="combobox"
					id="sc_ascOrdesc" class="domain-input easyui-combobox width140" /></td>
				<td class="td_pad"><button id="searchYes"
						onclick="doSearch();return false;"
						class="button button-primary button-rounded button-small">查
						询</button></td>
			</tr>
			<tr class="tr_ht" align="right">
				<td class="td_pad"><span>状态：</span><input role="combobox"
					id="sc_mainStatus" class="domain-input easyui-combobox width140" /></td>
				<td class="td_pad"></td>
				<td class="td_pad"><button id="searchClear"
						onclick="clearSearch();return false;"
						class="button button-primary button-rounded button-small">重
						置</button></td>
			</tr>
		</tbody>
	</table>
	<div class="clear-both height10"></div>
	<!-- 查询条件 结束 -->
	<div id="opt_outer_div">
		<div class="fl_opt_div">
			<button role="opt_1" id="btn_batchDelete"
				onclick="lh.commonBatchDelete()"
				class="button button-primary button-rounded button-small">批量删除</button>
			<button role="opt_1" onclick="addMainObj()"
				class="button button-primary button-rounded button-small">添加</button>
			<button role="opt_2" id="btn_batchRecover"
				onclick="lh.commonBatchRecover()"
				class="hide button button-primary button-rounded button-small">批量恢复</button>
			<button role="opt_2" id="btn_throughDelete"
				onclick="lh.commonBatchThoroughDelete()"
				class="hide button button-primary button-rounded button-small">彻底删除</button>

		</div>
		<div class="fr_opt_div">
			<button role="opt_1" id="btn_trash" onclick="lh.commonShowTrash()"
				class="button button-primary button-rounded button-small">回收站</button>
			<button role="opt_2" id="btn_trashBack"
				onclick="lh.commonReturnBack()"
				class="hide button button-primary button-rounded button-small">返回</button>
		</div>
	</div>
	<!-- 表格  开始 -->
	<div id='datagrid_div'>
		<table id="datagrid"></table>
	</div>
	<!-- 表格  结束 -->

	<div id="mainObjWindiv" style="display: none;">
		<div id='mainObjWin' class="easyui-window" title="科室信息"
			style="width: 450px;"
			data-options="modal:true,closed:true,maximizable:false,collapsible:false,minimizable:false">
			<div id="mainObjTip"></div>
			<form id="mainObjForm">
				<br />
				<table id="mainObjTable" class="padL5">
					<tbody>
						<tr class="tr_ht" align="right">
							<!-- <td class="td_pad"><span>所属诊所：</span><input role="combobox" id="f_hospitalId" class="domain-input easyui-combobox width100" data-options="required:true"/></td> -->
							<td class="td_pad"><span
								style="color: red; font-weight: bolder;">*</span><span>科室名称：</span><input
								role="textbox" id="f_name"
								class="domain-input easyui-textbox width140"
								data-options="required:true" /></td>
							<!-- <td class="td_pad"><span>上级科室：</span><input role="textbox" id="f_parentId" class="domain-input easyui-textbox width140" data-options="required:false"/></td> -->
							<td class="td_pad"><span
								style="color: red; font-weight: bolder;">*</span><span>状态：</span><input
								role="combobox" id="f_mainStatus"
								class="domain-input easyui-combobox width140"
								data-options="required:true" /></td>
						</tr>
						<!-- <tr class="tr_ht" align="right">
						</tr> -->
						<!-- <tr class="tr_ht" align="right">
							<td class="td_pad"><span>地址：</span><input role="textbox" id="f_address" class="domain-input easyui-textbox width100" data-options="required:true"/></td>
							<td class="td_pad"><span>邮箱：</span><input role="textbox" id="f_email" class="domain-input easyui-textbox width140" data-options="required:true"/></td>
							<td class="td_pad"><span>手机：</span><input role="textbox" id="f_phone" class="domain-input easyui-textbox width140" data-options="required:true"/></td>
							<td class="td_pad"><span>微博：</span><input role="textbox" id="f_weibo" class="domain-input easyui-textbox width140" data-options="required:true"/></td>
						</tr>
						<tr class="tr_ht" align="right">
							<td class="td_pad"><span>网址：</span><input role="textbox" id="f_website" class="domain-input easyui-textbox width140" data-options="required:true"/></td>
							<td class="td_pad"><span>省(直辖市)：</span><input role="combobox" id="f_province" class="domain-input easyui-combobox width100" data-options="required:true"/></td>
							<td class="td_pad"><span>市(县)：</span><input role="combobox" id="f_city" class="domain-input easyui-combobox width100" data-options="required:true"/></td>
						</tr>
						<tr class="tr_ht" align="right">
							<td class="td_pad"><span>QQ：</span><input role="textbox" id="f_qq" class="domain-input easyui-textbox width140" data-options="required:true"/></td>
							<td class="td_pad"><span>微信：</span><input role="textbox" id="f_weixin" class="domain-input easyui-textbox width140" data-options="required:true"/></td>
						</tr> -->
					</tbody>
				</table>
			</form>
			<div class="inline-center mgV40">
				<button id="mainObjSave" onclick="saveMainObj()"
					class="button button-primary button-rounded button-small">保存</button>
				<button id="mainObjBack" onclick="closeMainObjWin()"
					class="button button-primary button-rounded button-small">返回</button>
			</div>
		</div>
	</div>
	<%@ include file="/views/common/common_js.htm"%>
	<%@ include file="/views/common/common_back_js.htm"%>
	<script type="text/javascript">
  		lh.paramJsonStr = '${paramJson}';
  	</script>
	<script type="text/javascript" src="/js/common/back_template.js"
		title="v"></script>
	<script type="text/javascript"
		src="/js/back/domain/hospital/department.js" title="v"></script>
</body>
</html>