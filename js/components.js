/* ============================================================
   合同闪签官网 · 共享组件（导航/页脚注入 + 套餐数据）
   页面只需包含 <div data-component="header"></div> 等占位节点
   ============================================================ */

window.SITE = window.SITE || {};

/* ---------- 套餐数据（与《商业方案V1》《ToB方案 3.1》一致） ---------- */
SITE.PLANS = {
  trial: {
    key: 'trial', name: '单次体验版', price: '¥12.9', unit: '/个合同项目',
    quota: '1 个合同项目', team: '1 人', tag: '',
    desc: '偶尔需要合同、体验 AI 能力',
    feats: ['1 个完整合同项目', 'AI 信息抽取与合同生成', 'Word / PDF 导出'],
    action: '小程序内购买', actionType: 'mini'
  },
  starter: {
    key: 'starter', name: '尝鲜版', price: '¥99', unit: '/月',
    quota: '10 个合同项目/月', team: '1–5 名销售/商务', tag: '',
    desc: '没有专职法务，希望提高效率',
    feats: ['10 个合同项目/月', '项目内多轮修改不限次', 'AI 智能起草合同', 'AI 风险审核', '企业模板共享'],
    action: '立即购买', actionType: 'buy'
  },
  team: {
    key: 'team', name: '团队版', price: '¥399', unit: '/月',
    quota: '40 个合同项目/月', team: '5–20 名销售/商务', tag: '最受欢迎',
    desc: '销售团队持续签单，需要合同流程优化',
    feats: ['40 个合同项目/月', '项目内多轮修改不限次', 'AI 智能起草合同', 'AI 风险审核', '版本对比', '企业模板共享', 'Web 管理后台 · 成员与用量'],
    action: '立即购买', actionType: 'buy'
  },
  growth: {
    key: 'growth', name: '成长企业版', price: '¥899', unit: '/月',
    quota: '100 个合同项目/月', team: '10–50 名销售/商务', tag: '',
    desc: '多销售团队、多业务部门',
    feats: ['100 个合同项目/月', '项目内多轮修改不限次', '全部 AI 能力 + 法律审查', '多部门额度统筹', 'Web 管理后台 · 成员/用量/企业模板', '专属客户成功支持'],
    action: '立即购买', actionType: 'buy'
  },
  enterprise: {
    key: 'enterprise', name: '企业定制版', price: '面议', unit: '建议 ¥2999/月起',
    quota: '定制 · 不限量', team: '50 人以上', tag: '',
    desc: '多部门、多主体、企业级管理',
    feats: ['合同项目额度定制（不限量）', '全部能力 + 优先新功能', '专属部署与数据方案', '1 对 1 实施与培训'],
    action: '联系销售', actionType: 'contact'
  }
};

/* 主推套餐 key */
SITE.HOT_PLAN = 'team';

/* 意向单字段（与官网规划 3.2 一致） */
SITE.LEAD_FIELDS = [
  { name: 'company', label: '企业名称', required: true, type: 'text', placeholder: '如：XX科技有限公司' },
  { name: 'contact', label: '联系人', required: true, type: 'text', placeholder: '您的姓名' },
  { name: 'phone', label: '手机号', required: true, type: 'tel', placeholder: '用于销售顾问联系您' },
  { name: 'wechat', label: '微信号', required: false, type: 'text', placeholder: '选填，便于微信端沟通' },
  { name: 'team_size', label: '团队规模', required: false, type: 'select', options: ['1 人', '1–5 人', '5–20 人', '10–50 人', '50 人以上'] },
  { name: 'monthly_contracts', label: '预计每月合同量', required: false, type: 'select', options: ['10 个以内', '10–40 个', '40–100 个', '100 个以上'] },
  { name: 'remark', label: '需求备注', required: false, type: 'textarea', placeholder: '选填，如：需要补充协议/多轮谈判/行业合同' }
];

/* ---------- 导航 & 页脚模板 ---------- */
SITE.NAV_ITEMS = [
  { href: 'product.html', label: '产品介绍' },
  { href: 'solutions.html', label: '解决方案' },
  { href: 'pricing.html', label: '套餐价格' },
  { href: 'faq.html', label: '常见问题' },
  { href: 'about.html', label: '关于我们' }
];

SITE.headerHTML = function (active) {
  const links = SITE.NAV_ITEMS.map(function (it) {
    const cls = it.href === active ? 'active' : '';
    return '<a href="' + it.href + '" class="' + cls + '">' + it.label + '</a>';
  }).join('');
  return (
    '<header class="site-header" id="siteHeader">' +
      '<div class="container nav">' +
        '<a class="nav-logo" href="index.html">' +
          '<img class="logo-img" src="assets/avatar-144.png" alt="合同闪签助手" width="38" height="38">' +
          '<span class="logo-text">合同闪签助手</span>' +
        '</a>' +
        '<nav class="nav-links" id="navLinks" aria-label="主导航">' + links +
          '<div class="nav-drawer-cta"><a class="btn btn-primary btn-lg" href="pricing.html">查看套餐</a></div>' +
        '</nav>' +
        '<div class="nav-cta">' +
          '<a class="btn btn-primary btn-sm" href="pricing.html">查看套餐</a>' +
          '<button class="nav-toggle" id="navToggle" aria-label="打开菜单" aria-expanded="false" aria-controls="navLinks">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</header>'
  );
};

SITE.footerHTML = function () {
  return (
    '<footer class="site-footer">' +
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<div class="footer-logo">' +
              '<img class="footer-logo-img" src="assets/avatar-512.png" alt="合同闪签助手" width="40" height="40">' +
              '<span class="logo-text">合同闪签助手</span>' +
            '</div>' +
            '<p class="slogan">让每一次商务沟通，快速变成可签合同。7×24 小时随时在线的合同闪签服务。</p>' +
          '</div>' +
          '<div class="footer-col"><h4>产品</h4>' +
            '<a href="product.html">产品介绍</a><a href="solutions.html">解决方案</a><a href="pricing.html">套餐价格</a><a href="faq.html">常见问题</a>' +
          '</div>' +
          '<div class="footer-col"><h4>开通与使用</h4>' +
            '<a href="purchase.html">购买套餐</a><a href="faq.html#open">开通流程</a><a href="faq.html#quota">额度说明</a><a href="faq.html#security">数据安全</a>' +
          '</div>' +
          '<div class="footer-col"><h4>合规</h4>' +
            '<a href="privacy.html">隐私政策</a><a href="terms.html">服务条款</a><a href="faq.html#legal">AI 使用声明</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© 2026 合同闪签助手 · 让每一次商务沟通，快速变成可签合同</span>' +
          '<span>ICP 备案号：备案中 ｜ 联系：sales@flashdeal.cn</span>' +
        '</div>' +
      '</div>' +
    '</footer>'
  );
};

/* 移动端吸底 CTA（营销页用） */
SITE.mobileCTA = function (btnLabel, btnHref) {
  return (
    '<div class="mobile-cta">' +
      '<a class="btn btn-outline" href="index.html#free">免费体验</a>' +
      '<a class="btn btn-primary" href="' + btnHref + '">' + btnLabel + '</a>' +
    '</div>'
  );
};

/* ---------- 注入 ---------- */
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-component="header"]').forEach(function (el) {
    el.outerHTML = SITE.headerHTML(el.getAttribute('data-active') || '');
  });
  document.querySelectorAll('[data-component="footer"]').forEach(function (el) {
    el.outerHTML = SITE.footerHTML();
  });
  // 导航开合（移动端抽屉 + 遮罩 + 汉堡动画）
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  const backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  backdrop.id = 'navBackdrop';
  document.body.appendChild(backdrop);
  const closeNav = function () {
    links.classList.remove('open');
    toggle.classList.remove('open');
    backdrop.classList.remove('show');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      backdrop.classList.toggle('show', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    backdrop.addEventListener('click', closeNav);
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') closeNav();
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 880) closeNav(); });
  }
  // 滚动阴影
  const header = document.getElementById('siteHeader');
  const onScroll = function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  // 移动端吸底
  document.querySelectorAll('[data-mobile-cta]').forEach(function (el) {
    el.outerHTML = SITE.mobileCTA(el.getAttribute('data-mobile-cta') || '查看套餐', el.getAttribute('data-mobile-href') || 'pricing.html');
  });
  // 滚动淡入
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach(function (el) { io.observe(el); });
});
