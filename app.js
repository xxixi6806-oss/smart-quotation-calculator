const SUPABASE_URL = "https://ufpndgmmaikwqpiracme.supabase.co";
const SUPABASE_KEY = "sb_publishable_peaamSgZveNnaR_qkyazxA_EmiGWqA4";
const ADMIN_EMAIL = "xxixi6806@gmail.com";
const cloud = window.supabase?.createClient(SUPABASE_URL, SUPABASE_KEY);
const $ = id => document.getElementById(id);
const productList = $("productList");
const cartList = $("cartList");
const searchInput = $("searchInput");
const controls = {
    discount: $("discountPercent"), autoShipping: $("autoShipping"), shipping: $("shippingFee"),
    insurance: $("insurancePercent"), fee: $("feePercent")
};

const CNY_PER_USD = 6.7;
const AUD_PER_USD = 1.43;
const PROCESSING_FEE_RATE = 10;
let currentCurrency = "USD";
let cart = [];
let isAdmin = false;
let groups = new Map();
const expandedGroups = new Set();

const currencyInfo = { USD: { symbol: "$", rate: 1 }, AUD: { symbol: "A$", rate: AUD_PER_USD } };
const toDisplayCurrency = valueUsd => Number(valueUsd || 0) * currencyInfo[currentCurrency].rate;
const fromDisplayCurrency = value => Number(value || 0) / currencyInfo[currentCurrency].rate;
const roundCurrency = value => Math.round((Number(value || 0) + 1e-9) * 100) / 100;
const money = valueUsd => currencyInfo[currentCurrency].symbol + roundCurrency(toDisplayCurrency(valueUsd)).toFixed(2);
const truncateCurrency = value => Math.trunc(Number(value || 0));
const wholeMoney = valueUsd => currencyInfo[currentCurrency].symbol + truncateCurrency(toDisplayCurrency(valueUsd));
const truncateDisplayedUsd = valueUsd => fromDisplayCurrency(truncateCurrency(toDisplayCurrency(valueUsd)));
const usdMoney = value => "$" + Number(value || 0).toFixed(2);
const cny = value => "¥" + Number(value || 0).toFixed(2);
const clampPercent = input => {
    const value = Math.max(0, Math.min(100, Number(input.value) || 0));
    if (Number(input.value) !== value) input.value = value;
    return value;
};

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function rebuildGroups() {
    groups = products.reduce((map, product) => {
        if (!map.has(product.name)) map.set(product.name, []);
        map.get(product.name).push(product);
        return map;
    }, new Map());
}

function normalizeProducts(rows, admin = false) {
    return rows.map(row => ({
        id: Number(row.id), code: String(row.code), name: String(row.name), spec: String(row.spec),
        price: Number(row.price), cost: admin ? Number(row.cost || 0) : 0
    }));
}

async function loadCloudProducts(admin = isAdmin) {
    if (!cloud) return false;
    const source = admin ? "products" : "public_products";
    const columns = admin ? "id,code,name,spec,price,cost" : "id,code,name,spec,price";
    const { data, error } = await cloud.from(source).select(columns).order("id", { ascending: true });
    if (error) {
        console.error("云端商品读取失败", error);
        return false;
    }
    products = normalizeProducts(data, admin);
    const byId = new Map(products.map(product => [String(product.id), product]));
    cart = cart.map(item => byId.has(String(item.id)) ? { ...byId.get(String(item.id)), quantity: item.quantity } : null).filter(Boolean);
    rebuildGroups();
    renderProducts(searchInput.value);
    renderCart();
    if (admin) renderAdminProducts();
    return true;
}

function visibleGroups(keyword = "") {
    const query = keyword.trim().toLowerCase();
    return Array.from(groups.entries()).reduce((result, [name, specs]) => {
        if (!query) return result.concat([[name, specs]]);
        const nameMatch = name.toLowerCase().includes(query);
        const matches = nameMatch ? specs : specs.filter(p => p.code.toLowerCase().includes(query) || p.spec.toLowerCase().includes(query));
        if (matches.length) result.push([name, matches]);
        return result;
    }, []);
}

function renderProducts(keyword = "") {
    productList.replaceChildren();
    const list = visibleGroups(keyword);
    if (!list.length) return productList.append(el("p", "empty-state", "没有找到匹配的产品"));
    list.forEach(([name, specs]) => {
        const group = el("article", "product-group");
        const header = el("button", "product-group__header"); header.type = "button";
        header.append(el("span", "product-group__title", name), el("span", "product-group__meta", `${specs.length} 个规格`), el("span", "product-group__arrow", "⌄"));
        const body = el("div", "product-group__body");
        const open = Boolean(keyword.trim()) || expandedGroups.has(name);
        group.classList.toggle("is-open", open); body.hidden = !open; header.setAttribute("aria-expanded", String(open));
        specs.forEach(product => {
            const row = el("div", "product-spec"); const info = el("div", "product-spec__info");
            info.append(el("strong", "product-spec__code", product.code), el("span", "product-spec__size", product.spec));
            const add = el("button", "add-cart-btn", "加入报价"); add.type = "button"; add.onclick = () => addCart(product.id);
            row.append(info, el("span", "product-spec__price", money(product.price)), add); body.append(row);
        });
        header.onclick = () => { expandedGroups.has(name) ? expandedGroups.delete(name) : expandedGroups.add(name); renderProducts(searchInput.value); };
        group.append(header, body); productList.append(group);
    });
}

function addCart(id) {
    const product = products.find(p => String(p.id) === String(id)); if (!product) return;
    const item = cart.find(p => String(p.id) === String(id)); item ? item.quantity++ : cart.push({ ...product, quantity: 1 }); renderCart();
}
function changeQty(id, amount) {
    const item = cart.find(p => String(p.id) === String(id)); if (!item) return;
    item.quantity += amount; if (item.quantity <= 0) cart = cart.filter(p => String(p.id) !== String(id)); renderCart();
}
function automaticShipping(quantity) {
    if (quantity <= 0) return 0; if (quantity <= 10) return 55; if (quantity <= 20) return 80; if (quantity <= 30) return 105;
    return 105 + Math.ceil((quantity - 30) / 10) * 25;
}
function calculate() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const costCny = cart.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const discountRate = clampPercent(controls.discount), insuranceRate = clampPercent(controls.insurance), feeRate = PROCESSING_FEE_RATE;
    if (controls.autoShipping.checked) controls.shipping.value = truncateCurrency(toDisplayCurrency(automaticShipping(quantity)));
    controls.shipping.disabled = controls.autoShipping.checked;
    const shippingDisplay = Math.max(0, truncateCurrency(controls.shipping.value));
    if (Number(controls.shipping.value) !== shippingDisplay) controls.shipping.value = shippingDisplay;
    const shipping = fromDisplayCurrency(shippingDisplay);
    const discount = subtotal * discountRate / 100, afterDiscount = subtotal - discount;
    const insurance = truncateDisplayedUsd((afterDiscount + shipping) * insuranceRate / 100);
    const total = afterDiscount + shipping + insurance;
    const processingFee = total * PROCESSING_FEE_RATE / 100;
    const costUsd = costCny / CNY_PER_USD;
    const profit = total - costUsd - shipping - processingFee;
    return { subtotal, costCny, discountRate, discount, afterDiscount, shipping, insuranceRate, insurance, processingFee, total, profit };
}

function renderCart() {
    cartList.replaceChildren();
    if (!cart.length) cartList.append(el("p", "empty-state", "还没有加入商品"));
    cart.forEach(item => {
        const row = el("div", "cart-item"), info = el("div", "cart-item__info");
        const detail = `${item.code} · ${item.spec} · ${money(item.price)}` + (isAdmin ? ` · 成本 ${cny(item.cost)}` : "");
        info.append(el("strong", "", item.name), el("span", "", detail));
        const qty = el("div", "qty-control"), minus = el("button", "qty-btn", "−"), plus = el("button", "qty-btn", "+");
        minus.type = plus.type = "button"; minus.onclick = () => changeQty(item.id, -1); plus.onclick = () => changeQty(item.id, 1);
        qty.append(minus, el("span", "qty-value", item.quantity), plus);
        row.append(info, qty, el("strong", "cart-item__subtotal", money(item.price * item.quantity))); cartList.append(row);
    });
    renderTotals();
}
function renderTotals() {
    const v = calculate();
    $("subtotalPrice").textContent = money(v.subtotal); $("discountAmount").textContent = "-" + money(v.discount);
    $("discountedSubtotal").textContent = money(v.afterDiscount); $("shippingAmount").textContent = wholeMoney(v.shipping);
    $("insuranceAmount").textContent = wholeMoney(v.insurance); $("totalPrice").textContent = money(v.total);
    $("totalCost").textContent = cny(v.costCny); $("feeAmount").textContent = "-" + money(v.processingFee); $("totalProfit").textContent = money(v.profit);
    document.querySelectorAll(".admin-only").forEach(node => node.hidden = !isAdmin);
    renderQuotation(v);
}
function renderQuotation(v) {
    const wrap = $("quoteContent"); if (!cart.length) { wrap.innerHTML = '<p class="empty-state">Add products to generate an official quotation.</p>'; return; }
    const table = el("table", "quote-table"), head = el("thead"); head.innerHTML = "<tr><th>Product</th><th>Specification</th><th>Unit Price</th><th>Quantity</th><th>Subtotal</th></tr>"; table.append(head);
    const body = el("tbody"); cart.forEach(item => { const row = el("tr"); [item.code + " " + item.name, item.spec, money(item.price), `${item.quantity} box`, money(item.price * item.quantity)].forEach(text => row.append(el("td", "", text))); body.append(row); }); table.append(body);
    const summary = el("table", "quote-summary"), rows = [["Products Subtotal", money(v.subtotal)]];
    if (v.discountRate) rows.push([`Discount (${v.discountRate}%)`, "-" + money(v.discount)], ["After Discount", money(v.afterDiscount)]);
    rows.push(["Shipping Fee", wholeMoney(v.shipping)], [`Insurance (${v.insuranceRate}%)`, wholeMoney(v.insurance)], ["FINAL TOTAL", money(v.total)]);
    rows.forEach(([label, value], index) => { const row = el("tr", index === rows.length - 1 ? "quote-total" : ""); row.append(el("td", "", label), el("td", "", value)); summary.append(row); }); wrap.replaceChildren(table, summary);
}

function setCurrency(currency) {
    if (!currencyInfo[currency] || currency === currentCurrency) return;
    const shippingUsd = fromDisplayCurrency(controls.shipping.value);
    currentCurrency = currency;
    if (!controls.autoShipping.checked) controls.shipping.value = truncateCurrency(toDisplayCurrency(shippingUsd));
    $("currencyUSD").classList.toggle("is-active", currency === "USD");
    $("currencyAUD").classList.toggle("is-active", currency === "AUD");
    $("currencyUSD").setAttribute("aria-pressed", String(currency === "USD"));
    $("currencyAUD").setAttribute("aria-pressed", String(currency === "AUD"));
    $("shippingCurrencyLabel").textContent = currency;
    $("quoteCurrency").textContent = currency;
    $("currencyRateText").textContent = currency === "USD" ? `1 USD = ${AUD_PER_USD.toFixed(2)} AUD` : `1 AUD = ${(1 / AUD_PER_USD).toFixed(4)} USD`;
    renderProducts(searchInput.value);
    renderCart();
}

function resetProductForm() { $("productForm").reset(); $("editProductId").value = ""; }
function showAdminState(email) {
    $("adminLogin").hidden = true; $("adminContent").hidden = false; $("adminIdentity").textContent = `已登录：${email}`;
}
function showLoginState(message = "") {
    $("adminLogin").hidden = false; $("adminContent").hidden = true; $("authMessage").textContent = message;
}
async function openAdmin() {
    $("adminPanel").hidden = false; $("adminPanel").scrollIntoView({ behavior: "smooth", block: "start" });
    const { data } = await cloud.auth.getSession(); const email = data.session?.user?.email?.toLowerCase();
    if (email === ADMIN_EMAIL) { isAdmin = true; showAdminState(email); await loadCloudProducts(true); } else showLoginState();
}
async function closeAdmin() { $("adminPanel").hidden = true; resetProductForm(); }

function renderAdminProducts() {
    const keyword = $("adminSearch").value.trim().toLowerCase();
    const list = products.filter(p => !keyword || p.code.toLowerCase().includes(keyword) || p.name.toLowerCase().includes(keyword) || p.spec.toLowerCase().includes(keyword));
    $("adminProductCount").textContent = `显示 ${list.length} / ${products.length} 件商品`;
    const body = $("adminProductList"); body.replaceChildren();
    list.forEach(product => {
        const row = el("tr"); [product.code, product.name, product.spec, usdMoney(product.price), cny(product.cost)].forEach(value => row.append(el("td", "", value)));
        const cell = el("td"), actions = el("div", "admin-actions"), edit = el("button", "", "修改"), remove = el("button", "delete-product-btn", "删除");
        edit.type = remove.type = "button"; edit.onclick = () => editProduct(product.id); remove.onclick = () => deleteProduct(product.id); actions.append(edit, remove); cell.append(actions); row.append(cell); body.append(row);
    });
}
function editProduct(id) {
    const p = products.find(item => String(item.id) === String(id)); if (!p) return;
    $("editProductId").value = p.id; $("adminCode").value = p.code; $("adminName").value = p.name; $("adminSpec").value = p.spec; $("adminPrice").value = p.price; $("adminCost").value = p.cost; $("adminCode").focus();
}
async function deleteProduct(id) {
    const p = products.find(item => String(item.id) === String(id)); if (!p || !confirm(`确定删除 ${p.code} ${p.name}？`)) return;
    const { error } = await cloud.from("products").delete().eq("id", id); if (error) return alert("删除失败：" + error.message);
    cart = cart.filter(item => String(item.id) !== String(id)); await loadCloudProducts(true);
}

$("productForm").onsubmit = async event => {
    event.preventDefault(); const editingId = $("editProductId").value;
    const data = { code: $("adminCode").value.trim().toUpperCase(), name: $("adminName").value.trim(), spec: $("adminSpec").value.trim(), price: Number($("adminPrice").value), cost: Number($("adminCost").value), updated_at: new Date().toISOString() };
    let result;
    if (editingId) result = await cloud.from("products").update(data).eq("id", editingId);
    else result = await cloud.from("products").insert({ id: Date.now(), ...data });
    if (result.error) return alert("保存失败：" + result.error.message);
    resetProductForm(); await loadCloudProducts(true);
};

$("loginForm").onsubmit = async event => {
    event.preventDefault(); const email = $("loginEmail").value.trim().toLowerCase(), password = $("loginPassword").value;
    $("authMessage").textContent = "正在登录…";
    const { data, error } = await cloud.auth.signInWithPassword({ email, password });
    if (error) return showLoginState("登录失败：" + error.message);
    if (data.user.email.toLowerCase() !== ADMIN_EMAIL) { await cloud.auth.signOut(); return showLoginState("此账号没有管理员权限。"); }
    isAdmin = true; showAdminState(data.user.email); await loadCloudProducts(true);
};
$("signUpBtn").onclick = async () => {
    const email = $("loginEmail").value.trim().toLowerCase(), password = $("loginPassword").value;
    if (email !== ADMIN_EMAIL) return showLoginState("请使用指定管理员邮箱创建账号。");
    if (password.length < 6) return showLoginState("密码至少需要 6 位。");
    $("authMessage").textContent = "正在创建账号…";
    const { error } = await cloud.auth.signUp({ email, password, options: { emailRedirectTo: location.origin + location.pathname } });
    showLoginState(error ? "创建失败：" + error.message : "确认邮件已发送。请打开邮件确认后再登录。 ");
};
$("logoutBtn").onclick = async () => { await cloud.auth.signOut(); isAdmin = false; products = defaultProducts.map(p => ({ ...p })); await loadCloudProducts(false); showLoginState("已退出登录。"); };
$("restoreProductsBtn").textContent = "重新载入云端";
$("restoreProductsBtn").classList.remove("danger-btn");
$("restoreProductsBtn").onclick = () => loadCloudProducts(true);
$("adminBtn").onclick = openAdmin; $("closeAdminBtn").onclick = closeAdmin; $("cancelEditBtn").onclick = resetProductForm; $("adminSearch").oninput = renderAdminProducts;
function search() { renderProducts(searchInput.value); }
$("searchBtn").onclick = search; searchInput.oninput = search; searchInput.onkeydown = event => { if (event.key === "Enter") search(); };
Object.values(controls).forEach(input => { input.addEventListener("input", renderTotals); input.addEventListener("change", renderTotals); });
$("clearCartBtn").onclick = () => { cart = []; renderCart(); }; $("printQuoteBtn").onclick = () => window.print();
$("currencyUSD").onclick = () => setCurrency("USD");
$("currencyAUD").onclick = () => setCurrency("AUD");

async function init() {
    rebuildGroups(); renderProducts(); renderCart();
    if (!cloud) return;
    const { data } = await cloud.auth.getSession();
    isAdmin = data.session?.user?.email?.toLowerCase() === ADMIN_EMAIL;
    await loadCloudProducts(isAdmin);
}
document.addEventListener("visibilitychange", () => { if (!document.hidden && !isAdmin) loadCloudProducts(false); });
setInterval(() => { if (!document.hidden && !isAdmin) loadCloudProducts(false); }, 30000);
init();
