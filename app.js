const $ = id => document.getElementById(id);
const productList = $("productList");
const cartList = $("cartList");
const searchInput = $("searchInput");
const controls = {
    discount: $("discountPercent"), autoShipping: $("autoShipping"), shipping: $("shippingFee"),
    insurance: $("insurancePercent"), fee: $("feePercent")
};

const CNY_PER_USD = 6.8;
let cart = [];
const expandedGroups = new Set();
let groups = new Map();

function rebuildGroups() {
    groups = products.reduce((map, product) => {
        if (!map.has(product.name)) map.set(product.name, []);
        map.get(product.name).push(product);
        return map;
    }, new Map());
}

rebuildGroups();

const money = value => "$" + Number(value || 0).toFixed(2);
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

function visibleGroups(keyword = "") {
    const query = keyword.trim().toLowerCase();
    return Array.from(groups.entries()).reduce((result, [name, specs]) => {
        if (!query) return result.concat([[name, specs]]);
        const nameMatch = name.toLowerCase().includes(query);
        const matches = nameMatch ? specs : specs.filter(p =>
            p.code.toLowerCase().includes(query) || p.spec.toLowerCase().includes(query));
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
        const header = el("button", "product-group__header");
        header.type = "button";
        header.append(el("span", "product-group__title", name), el("span", "product-group__meta", `${specs.length} 个规格`), el("span", "product-group__arrow", "⌄"));
        const body = el("div", "product-group__body");
        const open = Boolean(keyword.trim()) || expandedGroups.has(name);
        group.classList.toggle("is-open", open); body.hidden = !open; header.setAttribute("aria-expanded", String(open));
        specs.forEach(product => {
            const row = el("div", "product-spec");
            const info = el("div", "product-spec__info");
            info.append(el("strong", "product-spec__code", product.code), el("span", "product-spec__size", product.spec));
            const add = el("button", "add-cart-btn", "加入报价"); add.type = "button"; add.onclick = () => addCart(product.id);
            row.append(info, el("span", "product-spec__price", money(product.price)), add); body.append(row);
        });
        header.onclick = () => { expandedGroups.has(name) ? expandedGroups.delete(name) : expandedGroups.add(name); renderProducts(searchInput.value); };
        group.append(header, body); productList.append(group);
    });
}

function addCart(id) {
    const product = products.find(p => p.id === id); if (!product) return;
    const item = cart.find(p => p.id === id);
    item ? item.quantity++ : cart.push({ ...product, quantity: 1 });
    renderCart();
}
function changeQty(id, amount) {
    const item = cart.find(p => p.id === id); if (!item) return;
    item.quantity += amount; if (item.quantity <= 0) cart = cart.filter(p => p.id !== id);
    renderCart();
}

// 与旧版一致：总盒数 1–10=$55，11–20=$80，21–30=$105；以后每增加 10 盒加 $25。
function automaticShipping(quantity) {
    if (quantity <= 0) return 0;
    if (quantity <= 10) return 55;
    if (quantity <= 20) return 80;
    if (quantity <= 30) return 105;
    return 105 + Math.ceil((quantity - 30) / 10) * 25;
}

function calculate() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const costCny = cart.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const discountRate = clampPercent(controls.discount);
    const insuranceRate = clampPercent(controls.insurance);
    const feeRate = clampPercent(controls.fee);
    if (controls.autoShipping.checked) controls.shipping.value = automaticShipping(quantity).toFixed(2);
    controls.shipping.disabled = controls.autoShipping.checked;
    const shipping = Math.max(0, Number(controls.shipping.value) || 0);
    const discount = subtotal * discountRate / 100;
    const afterDiscount = subtotal - discount;
    const insurance = (afterDiscount + shipping) * insuranceRate / 100;
    const total = afterDiscount + shipping + insurance;
    const processingFee = total * feeRate / 100;
    const profit = total - shipping - processingFee - costCny / CNY_PER_USD;
    return { subtotal, costCny, quantity, discountRate, discount, afterDiscount, shipping, insuranceRate, insurance, feeRate, processingFee, total, profit };
}

function renderCart() {
    cartList.replaceChildren();
    if (!cart.length) cartList.append(el("p", "empty-state", "还没有加入商品"));
    cart.forEach(item => {
        const row = el("div", "cart-item");
        const info = el("div", "cart-item__info"); info.append(el("strong", "", item.name), el("span", "", `${item.code} · ${item.spec} · ${money(item.price)} · 成本 ${cny(item.cost)}`));
        const qty = el("div", "qty-control"); const minus = el("button", "qty-btn", "−"); const plus = el("button", "qty-btn", "+");
        minus.type = plus.type = "button"; minus.onclick = () => changeQty(item.id, -1); plus.onclick = () => changeQty(item.id, 1);
        qty.append(minus, el("span", "qty-value", item.quantity), plus);
        row.append(info, qty, el("strong", "cart-item__subtotal", money(item.price * item.quantity))); cartList.append(row);
    });
    renderTotals();
}

function renderTotals() {
    const v = calculate();
    $("subtotalPrice").textContent = money(v.subtotal); $("discountAmount").textContent = "-" + money(v.discount);
    $("discountedSubtotal").textContent = money(v.afterDiscount); $("shippingAmount").textContent = money(v.shipping);
    $("insuranceAmount").textContent = money(v.insurance); $("totalPrice").textContent = money(v.total);
    $("totalCost").textContent = cny(v.costCny); $("feeAmount").textContent = "-" + money(v.processingFee);
    $("totalProfit").textContent = money(v.profit); $("totalProfit").style.color = v.profit < 0 ? "#b42318" : "";
    renderQuotation(v);
}

function renderQuotation(v) {
    const wrap = $("quoteContent");
    if (!cart.length) { wrap.innerHTML = '<p class="empty-state">Add products to generate an official quotation.</p>'; return; }
    const table = el("table", "quote-table");
    const head = el("thead"); head.innerHTML = "<tr><th>Product</th><th>Specification</th><th>Unit Price</th><th>Quantity</th><th>Subtotal</th></tr>"; table.append(head);
    const body = el("tbody");
    cart.forEach(item => { const row = el("tr"); [item.code + " " + item.name, item.spec, money(item.price), `${item.quantity} box`, money(item.price * item.quantity)].forEach(text => row.append(el("td", "", text))); body.append(row); });
    table.append(body);
    const summary = el("table", "quote-summary");
    const rows = [["Products Subtotal", money(v.subtotal)]];
    if (v.discountRate) rows.push([`Discount (${v.discountRate}%)`, "-" + money(v.discount)], ["After Discount", money(v.afterDiscount)]);
    rows.push(["Shipping Fee", money(v.shipping)], [`Insurance (${v.insuranceRate}%)`, money(v.insurance)], ["FINAL TOTAL", money(v.total)]);
    rows.forEach(([label, value], index) => { const row = el("tr", index === rows.length - 1 ? "quote-total" : ""); row.append(el("td", "", label), el("td", "", value)); summary.append(row); });
    wrap.replaceChildren(table, summary);
}

function search() { renderProducts(searchInput.value); }
$("searchBtn").onclick = search; searchInput.oninput = search; searchInput.onkeydown = e => { if (e.key === "Enter") search(); };
Object.values(controls).forEach(input => { input.addEventListener("input", renderTotals); input.addEventListener("change", renderTotals); });
$("clearCartBtn").onclick = () => { cart = []; renderCart(); };
$("printQuoteBtn").onclick = () => window.print();

function openAdmin() {
    $("adminPanel").hidden = false;
    renderAdminProducts();
    $("adminPanel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeAdmin() {
    $("adminPanel").hidden = true;
    resetProductForm();
}

function resetProductForm() {
    $("productForm").reset();
    $("editProductId").value = "";
}

function renderAdminProducts() {
    const keyword = $("adminSearch").value.trim().toLowerCase();
    const list = products.filter(product => !keyword ||
        product.code.toLowerCase().includes(keyword) ||
        product.name.toLowerCase().includes(keyword) ||
        product.spec.toLowerCase().includes(keyword));
    $("adminProductCount").textContent = `显示 ${list.length} / ${products.length} 件商品`;
    const body = $("adminProductList");
    body.replaceChildren();
    list.forEach(product => {
        const row = el("tr");
        [product.code, product.name, product.spec, money(product.price), cny(product.cost)].forEach(value => row.append(el("td", "", value)));
        const actionsCell = el("td");
        const actions = el("div", "admin-actions");
        const edit = el("button", "", "修改");
        const remove = el("button", "delete-product-btn", "删除");
        edit.type = remove.type = "button";
        edit.onclick = () => editProduct(product.id);
        remove.onclick = () => deleteProduct(product.id);
        actions.append(edit, remove); actionsCell.append(actions); row.append(actionsCell); body.append(row);
    });
}

function editProduct(id) {
    const product = products.find(item => String(item.id) === String(id));
    if (!product) return;
    $("editProductId").value = product.id;
    $("adminCode").value = product.code;
    $("adminName").value = product.name;
    $("adminSpec").value = product.spec;
    $("adminPrice").value = product.price;
    $("adminCost").value = product.cost;
    $("adminCode").focus();
}

function persistProductChanges() {
    saveProducts(products);
    rebuildGroups();
    expandedGroups.clear();
    renderProducts(searchInput.value);
    renderCart();
    renderAdminProducts();
}

function deleteProduct(id) {
    const product = products.find(item => String(item.id) === String(id));
    if (!product || !confirm(`确定删除 ${product.code} ${product.name}？`)) return;
    products = products.filter(item => String(item.id) !== String(id));
    cart = cart.filter(item => String(item.id) !== String(id));
    persistProductChanges();
}

$("productForm").onsubmit = event => {
    event.preventDefault();
    const editingId = $("editProductId").value;
    const data = {
        code: $("adminCode").value.trim().toUpperCase(),
        name: $("adminName").value.trim(),
        spec: $("adminSpec").value.trim(),
        price: Number($("adminPrice").value),
        cost: Number($("adminCost").value),
        profit: 0
    };
    if (!data.code || !data.name || !data.spec || data.price < 0 || data.cost < 0) return;
    if (editingId) {
        const index = products.findIndex(item => String(item.id) === String(editingId));
        if (index < 0) return;
        products[index] = { ...products[index], ...data };
        const cartItem = cart.find(item => String(item.id) === String(editingId));
        if (cartItem) Object.assign(cartItem, data);
    } else {
        const id = `custom-${Date.now()}`;
        products.push({ id, ...data });
    }
    resetProductForm();
    persistProductChanges();
};

$("adminBtn").onclick = openAdmin;
$("closeAdminBtn").onclick = closeAdmin;
$("cancelEditBtn").onclick = resetProductForm;
$("adminSearch").oninput = renderAdminProducts;
$("restoreProductsBtn").onclick = () => {
    if (!confirm("确定恢复默认商品？所有后台添加和修改的商品都会被清除。")) return;
    products = defaultProducts.map(product => ({ ...product }));
    cart = [];
    saveProducts(products);
    resetProductForm();
    persistProductChanges();
};
renderProducts(); renderCart();
