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
</head>
<body>
	<div class="pz_top">
		<%@ include file="/views/front/common/top.htm"%><!-- 顶部栏 -->
		<%@ include file="/views/front/common/menuTop.htm"%><!-- 顶部菜单栏（搜索+菜单） -->
	</div>
	<div class="pz_main">
		<div class="w_1000">
			<div class="c_1100_10">
				当前位置：<a href="/">首页</a>- <span>${article.typeName}</span> - <span>${article.title}</span>
			</div>
			<div class="w_824" style="width: 1100px;">
				<div class="page" style="width: 1060px;">
					<div class="t_824" style="padding-bottom: 15px; width: 1060px;">
						<div class="tit3" style="width: 1060px;">${article.title}</div>
						<%-- <div class="time1">
							<div class="l_flo" style="float: left; margin-left: 133px;">
								<fmt:formatDate value="${article.createdAt}" pattern="YYYY-MM-dd HH:mm:ss" />
								&nbsp;&nbsp;&nbsp;发布人：<span>${article.createdBy}</span> &nbsp;&nbsp;&nbsp;访问次数：<font>${article.scans}</font> &nbsp;&nbsp;&nbsp;分享到：
							</div>
							<div class="bshare-custom" style="float: left; line-height: 24px; font-size: 12px;">
								<a title="分享到QQ空间" class="bshare-qzone"></a> <a title="分享到新浪微博" class="bshare-sinaminiblog"></a> <a title="分享到人人网" class="bshare-renren"></a> <a title="分享到腾讯微博" class="bshare-qqmb"></a> <a title="分享到网易微博"
									class="bshare-neteasemb"></a> <a title="更多平台" class="bshare-more bshare-more-icon more-style-addthis"></a>
							</div>
							<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=2&amp;lang=zh"></script>
							<script type="text/javascript" charset="utf-8" src="http://static.bshare.cn/b/bshareC0.js"></script>
						</div> --%>
					</div>
					<div class="d_824" style="width: 1060px;">
						${article.content} <br />
						<br />
						<div class="bshare-custom"
							style="float: left; line-height: 24px; margin-top: 25px; font-size: 12px;">
							<a title="分享到QQ空间" class="bshare-qzone"></a> <a title="分享到新浪微博"
								class="bshare-sinaminiblog"></a> <a title="分享到人人网"
								class="bshare-renren"></a> <a title="分享到腾讯微博"
								class="bshare-qqmb"></a> <a title="分享到网易微博"
								class="bshare-neteasemb"></a> <a title="更多平台"
								class="bshare-more bshare-more-icon more-style-addthis"></a>
						</div>
						<script type="text/javascript" charset="utf-8"
							src="http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=2&amp;lang=zh"></script>
						<script type="text/javascript" charset="utf-8"
							src="http://static.bshare.cn/b/bshareC0.js"></script>
					</div>
					<div class="updown"></div>
				</div>
			</div>
			<%-- <div class="w_256">
				<div class="c_256">
					<div class="t_256">${typeName}</div>
					<div class="pz_SideLayer1">
						<c:forEach items="${latestArticleList}" var="latestArticle">
							<li class="l3"><a href="/article/${latestArticle.typeId}/${latestArticle.id}">${latestArticle.title}</a></li>
						</c:forEach>
					</div>
				</div>
				<c:if test="${typeId != 43}">
					<div class="c_256_1">
						<div class="tit_h_47">
							热点讨论 <a href="/articleList/43" class="fr">更多</a>
						</div>
						<div class="list_256">
							<ul>
								<c:forEach items="${hotDiscussionList}" var="hotDiscussion">
									<li><a href="/article/${hotDiscussion.typeId}/${hotDiscussion.id}"><nobr>${hotDiscussion.title}</nobr></a></li>
								</c:forEach>
							</ul>
						</div>
					</div>
				</c:if>
				<div class="c_256_2">
					<div class="tit_h_47">优医在线</div>
					<div class="list_256_1">
						<ul>
							<c:forEach items="${doctorList}" var="doctor">
								<li style="border-top: 0;">
									<div class="l_86">
										<a href="/doctor/${doctor.attrStr}"><img src="${doctor.avatar}" width="86" height="86" onerror="this.src='/images/front/main13.png'" /></a>
									</div>
									<div class="r_126">
										<div class="t_126">
											<a href="/doctor/${doctor.attrStr}">${doctor.username}<br /> <span>${doctor.departmentName}/${doctor.titleNames}</span></a>
										</div>
										<div class="more_2">
											<a href="/consult?doctorId=${doctor.id}&hospitalId=${doctor.hospitalId}">在线咨询</a>
										</div>
									</div>
								</li>
							</c:forEach>
						</ul>
					</div>
				</div>
			</div> --%>
		</div>
	</div>

	<input type="hidden" id="articleId" value="${article.id}">

	<div class="pz_down">
		<%@ include file="/views/front/common/menuBottom.htm"%><!-- 底部菜单栏 -->
		<%@ include file="/views/front/common/bottom.htm"%><!-- 底部栏 -->
	</div>
	<%@ include file="/views/front/common/nav.htm"%><!-- 右侧浮动导航菜单 -->

	<%@ include file="/views/common/common_js.htm"%>
	<%@ include file="/views/common/common_front_js.htm"%>
	<script type="text/javascript"
		src="/js/front/domain/user/userCommon.js" title="v"></script>
	<script type="text/javascript" src="/js/front/base/article/article.js"
		title="v"></script>
</body>
</html>

