/* ============================================================
   合同闪签官网 · 页面交互（选套餐 / 意向单 / FAQ / 购买页）
   ============================================================ */

(function () {
  'use strict';

  /* ---------- FAQ 手风琴 ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        q.parentElement.classList.toggle('open');
      });
    });
  });

  /* ---------- 套餐卡片 → 购买页 ---------- */
  document.addEventListener('click', function (e) {
    const buy = e.target.closest('[data-buy]');
    if (!buy) return;
    const plan = buy.getAttribute('data-buy');
    if (plan === 'trial') {
      // 单次体验版：小程序内购买（官网不卖）
      window.location.href = 'index.html#free';
      return;
    }
    if (plan === 'enterprise') {
      // 定制版：联系销售（占位：可替换为企微链接/表单）
      window.location.href = 'purchase.html?plan=enterprise';
      return;
    }
    window.location.href = 'purchase.html?plan=' + plan;
  });

  /* ---------- 套餐页动态渲染 ---------- */
  function renderPricingCards() {
    const wrap = document.getElementById('planCards');
    if (!wrap) return;
    const order = ['starter', 'team', 'growth'];
    wrap.innerHTML = order.map(function (key) {
      const p = SITE.PLANS[key];
      const hot = key === SITE.HOT_PLAN;
      const badge = p.tag ? '<span class="plan-badge">⭐ ' + p.tag + '</span>' : '';
      return (
        '<div class="plan-card' + (hot ? ' popular' : '') + '">' + badge +
          '<div class="plan-name">' + p.name + '</div>' +
          '<div class="plan-team">' + p.team + '</div>' +
          '<div class="plan-price"><span class="num">' + p.price + '</span> <span class="unit">' + p.unit + '</span></div>' +
          '<span class="plan-quota">' + p.quota + '</span>' +
          '<p class="plan-desc">' + p.desc + '</p>' +
          '<ul class="plan-feats">' + p.feats.map(function (f) { return '<li>' + f + '</li>'; }).join('') + '</ul>' +
          '<button class="btn ' + (hot ? 'btn-primary' : 'btn-outline') + '" data-buy="' + key + '">' + p.action + '</button>' +
        '</div>'
      );
    }).join('');
  }

  function renderPlanStrip() {
    const wrap = document.getElementById('planStrip');
    if (!wrap) return;
    const p1 = SITE.PLANS.trial, p2 = SITE.PLANS.enterprise;
    wrap.innerHTML =
      '<div class="plan-strip-card"><div class="left"><div class="t">' + p1.name + ' · ' + p1.price + p1.unit + '</div>' +
      '<div class="d">' + p1.desc + '，' + p1.quota + ' —— 小程序内即可购买体验</div></div>' +
      '<button class="btn btn-outline btn-sm" data-buy="trial">扫码体验</button></div>' +
      '<div class="plan-strip-card"><div class="left"><div class="t">' + p2.name + ' · ' + p2.price + '</div>' +
      '<div class="d">' + p2.desc + '，' + p2.quota + '</div></div>' +
      '<button class="btn btn-outline btn-sm" data-buy="enterprise">联系销售</button></div>';
  }

  /* ---------- 购买页 ---------- */
  function getParam(name) {
    const m = new URLSearchParams(window.location.search).get(name);
    return m || '';
  }

  function initPurchase() {
    // 仅购买页存在 #leadForm 才初始化
    const box = document.getElementById('leadForm');
    if (!box) return;
    let key = getParam('plan') || SITE.HOT_PLAN;
    if (!SITE.PLANS[key]) key = SITE.HOT_PLAN;
    const p = SITE.PLANS[key];

    // 订单回显
    document.getElementById('orderPlan').textContent = p.name;
    document.getElementById('orderPrice').textContent = p.price;
    document.getElementById('orderUnit').textContent = p.unit;
    document.getElementById('orderQuota').textContent = p.quota;
    document.getElementById('orderTeam').textContent = p.team;
    document.getElementById('orderTotal').textContent = p.price + (p.unit === '/月' ? '' : p.unit);

    // 切换套餐
    const select = document.getElementById('planSelect');
    ['starter', 'team', 'growth', 'enterprise'].forEach(function (k) {
      const opt = document.createElement('option');
      opt.value = k; opt.textContent = SITE.PLANS[k].name + ' ' + SITE.PLANS[k].price + SITE.PLANS[k].unit;
      if (k === key) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener('change', function () {
      window.location.href = 'purchase.html?plan=' + select.value;
    });

    // 定制版：走联系销售说明
    if (key === 'enterprise') {
      document.getElementById('payArea').style.display = 'none';
      document.getElementById('enterpriseNote').style.display = 'block';
    }

    // 支付占位区说明（当前未接支付 → 意向单；接入后此处展示 Native 二维码）
    document.getElementById('payMode').textContent =
      key === 'enterprise' ? '' : '在线支付通道即将开通，当前请先提交购买意向，销售顾问将协助您完成开通';

    // 表单提交（过渡态：POST /api/lead；接入支付后改为创建订单 → 二维码）
    const form = document.getElementById('leadForm');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (!document.getElementById('agree').checked) { alert('请先阅读并同意《服务条款》与《隐私政策》'); return; }
      const btn = form.querySelector('[type="submit"]');
      btn.disabled = true; btn.textContent = '提交中…';
      const payload = {
        plan: key,
        company: document.getElementById('f_company').value.trim(),
        contact: document.getElementById('f_contact').value.trim(),
        phone: document.getElementById('f_phone').value.trim(),
        wechat: document.getElementById('f_wechat').value.trim(),
        team_size: document.getElementById('f_team_size').value,
        monthly_contracts: document.getElementById('f_monthly_contracts').value,
        remark: document.getElementById('f_remark').value.trim()
      };
      // TODO(接入支付后)：改为 POST /pay/native {plan} → 返回二维码渲染到 #qrTarget
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        if (!res.ok) throw new Error('bad status');
        return res.json();
      }).then(function () {
        window.location.href = 'thanks.html?plan=' + encodeURIComponent(key) + '&company=' + encodeURIComponent(payload.company);
      }).catch(function () {
        // 静态预览/未接后端时：本地演示提交成功
        window.location.href = 'thanks.html?plan=' + encodeURIComponent(key) + '&company=' + encodeURIComponent(payload.company);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderPricingCards();
    renderPlanStrip();
    initPurchase();

    // 对比表主推列高亮（页面里直接写 class，无需处理）
    // 页面标题随套餐更新
    const t = document.getElementById('pageTitle');
    if (t) {
      const key = getParam('plan');
      if (key && SITE.PLANS[key]) { t.textContent = '购买 ' + SITE.PLANS[key].name; }
    }
  });

  /* 套餐速览卡（首页） */
  function renderMiniPlans() {
    const wrap = document.getElementById('miniPlans');
    if (!wrap) return;
    wrap.innerHTML = ['starter', 'team', 'growth'].map(function (key) {
      const p = SITE.PLANS[key];
      const hot = key === SITE.HOT_PLAN;
      return (
        '<div class="plan-card' + (hot ? ' popular' : '') + '" style="padding:22px;">' +
          (p.tag ? '<span class="plan-badge">⭐ ' + p.tag + '</span>' : '') +
          '<div class="plan-name">' + p.name + '</div>' +
          '<div class="plan-price"><span class="num" style="font-size:30px;">' + p.price + '</span> <span class="unit">' + p.unit + '</span></div>' +
          '<span class="plan-quota">' + p.quota + '</span>' +
          '<p class="plan-desc" style="min-height:0;">' + p.desc + '</p>' +
          '<button class="btn ' + (hot ? 'btn-primary' : 'btn-outline') + '" style="margin-top:14px;" data-buy="' + key + '">' + p.action + '</button>' +
        '</div>'
      );
    }).join('');
  }
  document.addEventListener('DOMContentLoaded', renderMiniPlans);
})();
