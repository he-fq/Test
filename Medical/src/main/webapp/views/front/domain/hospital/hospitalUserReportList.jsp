<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/views/common/meta_info.htm"%>
<%@ include file="/views/common/common_css.htm"%>
<link rel="stylesheet" type="text/css" href="/css/front/style.css"
	title="v" />
<link rel="stylesheet" type="text/css"
	href="/third-party/pagination/paging.css" />
</head>
<body>
	<%@ include file="/views/front/common/hospital/top.htm"%>
	<div class="pz_main">
		<%@ include file="/views/front/common/hospital/hospitalTop.htm"%>
		<div class="w_1000">
			<%@ include file="/views/front/common/hospital/hospitalLeft.htm"%><!--左边导航 -->
			<div class="w_851">
				<div class="t_851_2">检测档案</div>
				<div class="c_851">
					<div class="t_851_3">
						<table cellpadding="0" cellspacing="0" border="0">
							<tr height="44" valign="middle">
								<td width="100">医生姓名：</td>
								<td width="140"><input type="text" class="text_input2"
									style="width: 130px;" id="doctorName" /></td>
								<td width="80">被检人：</td>
								<td width="140"><input type="text" class="text_input2"
									style="width: 130px;" id="patientName" /></td>
								<td width="60">排序：</td>
								<td width="100"><select id="searchType" class="text_input2"
									style="width: 80px;">
										<option value="">请选择</option>
										<option value="1">项目名称</option>
										<option value="2">检测时间</option>
										<option value="3">检测结果</option>
								</select></td>
								<td width="100"><select id="ascOrdesc" class="text_input2"
									style="width: 80px;">
										<option value="">请选择</option>
										<option value="ASC">升序</option>
										<option value="DESC">降序</option>
								</select></td>
								<td width="64"><input type="submit" class="sub_1"
									value="搜索" onclick="loadGridData()" /></td>
								<td width="64"><input type="submit" class="sub_1"
									value="重置" onclick="resetQuery()" style="margin-left: 10px;" /></td>
							</tr>
						</table>
					</div>

					<table cellpadding="0" cellspacing="0" border="0" width="849">
						<tbody id="reportList"></tbody>
						<tr height="53" align="center"
							style="color: #666666; display: none" id="noData">
							<td>暂无数据</td>
						</tr>
					</table>
				</div>
				<div class="fy_new">
					<div id="page" class="inline-center"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="pz_down">
		<%@ include file="/views/front/common/bottom.htm"%><!-- 底部栏 -->
	</div>
	<%@ include file="/views/common/common_js.htm"%>
	<%@ include file="/views/common/common_front_js.htm"%>
	<script type="text/javascript"
		src="/js/front/domain/hospital/hospitalCommon.js" title="v"></script>
	<script type="text/javascript"
		src="/js/front/domain/hospital/hospitalUserReportList.js" title="v"></script>
	<script id="template" type="x-tmpl-mustache">
		<tr height="53" align="center" style="font-size:14px; color:#63a13f">
			<td width="120" align="center">医生</td>
            <td width="120" align="center">姓名</td>
            <td width="60">性别</td>
            <td width="60">年龄</td>
            <td width="80">联系电话</td>
            <td width="120">项目名称</td>
            <td width="80">采血日期</td>
            <td width="80">检测结果</td>
            <td width="140">操作</td>
        </tr>
		{{#rows}}
			<tr height="53" align="center" style="color:#666666">
				<td width="120" align="center">{{doctorName}}</td>
		        <td width="120" align="center">{{patientName}}</td>
		        <td width="60">{{sexName}}</td>
		        <td width="60">{{age}}{{ageType}}</td>
		        <td width="80">{{patientPhone}}</td>
		        <td width="120">{{itemName}}</td>
		        <td width="80">{{&getAttrDate}}</td>
		        <td width="80">{{&resultHintName}}</td>
		        <td width="140">
					<button class="btn btn-info" onclick="window.open('/hospital/prdPrint/{{id}}');">打印</button>
					<button class="btn btn-success" onclick="readPatientReport({{id}});">详情</button>
				</td>
			</tr>
		{{/rows}}
	</script>
</body>
</html>

