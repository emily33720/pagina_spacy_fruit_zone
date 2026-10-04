// =========================================================
// SPACY FRUIT ZONE — catálogo, carrito, pedido por WhatsApp,
// modo claro/oscuro y ventanas animadas del menú
// =========================================================

// 📱 Número de WhatsApp del negocio (formato internacional, sin + ni espacios)
// Cambialo por el número real de Spacy Fruit Zone.
const WHATSAPP_NUMBER = "50360588060";

// 🍓 Catálogo de productos
// - "flavors": si el producto se puede elegir en distintas frutas,
//   poné aquí el nombre y, si hay foto disponible, la ruta de imagen.
const PRODUCTS = [
  {
    id: "mix",
    name: "Mix de frutas",
    category: "mixes",
    price: 2.00,
    img: "img/mix.jpg",
    badge: "El favorito",
    desc: "Sandía, mango, piña y fresa con Tajín, chamoy, gomitas, limón y sal.",
    fruits: ["Sandía", "Mango", "Piña", "Fresa"],
    ingredients: ["Tajín", "Chamoy", "Gomitas", "Limón", "Sal"],
    steps: [
      "Cortamos la fruta fresca en cubos parejos.",
      "Armamos capas de fruta dentro del vaso.",
      "Agregamos las gomitas encima.",
      "Bañamos con chamoy y espolvoreamos Tajín.",
      "Terminamos con un toque de limón y sal, listo para servir."
    ],
    flavors: null
  },
  {
    id: "sandia",
    name: "Sandía",
    category: "preparada",
    price: 1.00,
    img: "img/fruta-sandia.jpg",
    badge: null,
    desc: "Fresca, jugosa y deliciosa.",
    fruits: ["Sandía"],
    ingredients: ["Tajín", "Chamoy", "Limón", "Sal"],
    steps: [
      "Cortamos la sandía fresca en cubos parejos.",
      "La colocamos en el vaso hasta llenar.",
      "Bañamos con chamoy en forma de hilo.",
      "Espolvoreamos Tajín y un toque de sal.",
      "Servimos bien fría con un gajo de limón."
    ],
    flavors: null
  },
  {
    id: "mango",
    name: "Mango",
    category: "preparada",
    price: 1.00,
    img: "img/fruta-mango.jpg",
    badge: null,
    desc: "Dulce, natural y lleno de sabor.",
    fruits: ["Mango"],
    ingredients: ["Tajín", "Chamoy", "Limón", "Sal"],
    steps: [
      "Cortamos el mango fresco en cubos parejos.",
      "Lo colocamos en el vaso hasta llenar.",
      "Bañamos con chamoy en forma de hilo.",
      "Espolvoreamos Tajín y un toque de sal.",
      "Servimos bien frío con un gajo de limón."
    ],
    flavors: null
  },
  {
    id: "pina",
    name: "Piña",
    category: "preparada",
    price: 1.00,
    img: "img/fruta-pina.jpg",
    badge: null,
    desc: "Refrescante, dulce y natural.",
    fruits: ["Piña"],
    ingredients: ["Tajín", "Chamoy", "Limón", "Sal"],
    steps: [
      "Cortamos la piña fresca en cubos parejos.",
      "La colocamos en el vaso hasta llenar.",
      "Bañamos con chamoy en forma de hilo.",
      "Espolvoreamos Tajín y un toque de sal.",
      "Servimos bien fría con un gajo de limón."
    ],
    flavors: null
  },
  {
    id: "pepino",
    name: "Pepino",
    category: "preparada",
    price: 1.00,
    img: "img/pepino.jpg",
    badge: null,
    desc: "Crujiente, fresco y picosito.",
    fruits: ["Pepino"],
    ingredients: ["Tajín", "Chamoy", "Limón", "Sal"],
    steps: [
      "Cortamos el pepino fresco en tiras parejas.",
      "Lo colocamos en el vaso hasta llenar.",
      "Bañamos con chamoy en forma de hilo.",
      "Espolvoreamos Tajín y un toque de sal.",
      "Servimos bien frío con un gajo de limón."
    ],
    flavors: null
  },
  {
    id: "pepinos-locos",
    name: "Pepinos Locos",
    category: "picantes",
    price: 1.75,
    img: "img/pepinos-locos.jpg",
    badge: "Picante",
    desc: "Pepino con Takis, gomitas, chamoy, Tajín, limón y sal.",
    fruits: ["Pepino"],
    ingredients: ["Takis", "Gomitas", "Chamoy", "Tajín", "Limón", "Sal"],
    steps: [
      "Cortamos el pepino fresco en trozos.",
      "Lo colocamos en el vaso y agregamos los Takis triturados.",
      "Sumamos gomitas encima.",
      "Bañamos con chamoy y espolvoreamos Tajín.",
      "Terminamos con limón y sal al gusto."
    ],
    flavors: null
  },
  {
    id: "pepino-explosivo",
    name: "Pepino Explosivo",
    category: "picantes",
    price: 1.75,
    img: "img/pepino-explosivo.jpg",
    badge: "Nuevo",
    desc: "Pepino fresco picado, acompañado de Takis Jalapeño Chile Limón, elotitos, chamoy y Tajín. Una combinación crujiente, picosita y llena de sabor, perfecta para quienes disfrutan de un antojo dulce, ácido y picante.",
    fruits: ["Pepino"],
    ingredients: ["Takis Jalapeño Chile Limón", "Elotitos", "Chamoy", "Tajín"],
    steps: [
      "Picamos el pepino fresco en trozos parejos.",
      "Lo colocamos en el recipiente hasta llenar.",
      "Agregamos los elotitos y los Takis Jalapeño Chile Limón encima.",
      "Bañamos con chamoy y espolvoreamos Tajín.",
      "Servimos al momento para que todo quede bien crujiente."
    ],
    flavors: null
  }
];

// Descripción corta por categoría (se muestra debajo de los filtros)
const CATEGORY_DESC = {
  todas: "Mostrando todo el catálogo: mixes, fruta a tu gusto y picantes bien locos.",
  mixes: "🍉 Combos ya armados con varias frutas, listos para compartir o disfrutar solo.",
  preparada: "🥭 Elegí tu fruta favorita: sandía, mango, piña o pepino, preparada al momento con Tajín, chamoy, limón y sal.",
  picantes: "🌶️ Para quienes quieren sentir el picante de verdad, con Takis y chamoy extra."
};

// 🛒 Estado del carrito: { key: { name, price, qty } }
let cart = {};
let currentProduct = null;
let currentFlavor = null;

// 🍇 Estado del filtro de categoría activo
let currentFilter = "todas";

// 🍓 Frutas reconocidas al armar un pedido personalizado en "Armá tu pedido"
// (clave normalizada, sin tildes) → nombre para mostrar y precio por fruta
const FRUIT_KEYWORDS = {
  sandia: { label: "Sandía", price: 1.00 },
  mango: { label: "Mango", price: 1.00 },
  pina: { label: "Piña", price: 1.00 },
  fresa: { label: "Fresa", price: 1.00 },
  pepino: { label: "Pepino", price: 1.00 }
};
const CUSTOM_BASE_PRICE = 1.50; // precio si no reconocemos ninguna fruta en el texto

// ---------- Utilidades ----------
const fmt = (n) => `$${n.toFixed(2)}`;
const el = (id) => document.getElementById(id);

// Quita tildes y pasa a minúsculas, para que "mangó" encuentre "mango" y viceversa
function normalizeText(str) {
  return (str || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Filtra el catálogo según la categoría activa
function getFilteredProducts() {
  return PRODUCTS.filter(p => currentFilter === "todas" || p.category === currentFilter);
}

// ---------- Render de tarjetas de producto ----------
function renderProducts() {
  const grid = el("productGrid");
  grid.innerHTML = "";

  const list = getFilteredProducts();

  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.category = p.category;

    const photoHtml = p.img
      ? `<img src="${p.img}" alt="${p.name}" class="product-photo">`
      : `<div class="product-icon-fallback">🍓</div>`;

    card.innerHTML = `
      ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
      <div class="product-photo-wrap" data-open="${p.id}">
        ${photoHtml}
      </div>
      <div class="product-body">
        <h3 data-open="${p.id}">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <span class="price-tag">${fmt(p.price)}${p.flavors ? " +" : ""}</span>
        <button class="add-btn" data-quickadd="${p.id}">Agregar al pedido</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Animación de aparición al hacer scroll, escalonada por tarjeta
  grid.querySelectorAll(".product-card").forEach((card, i) => observeReveal(card, i * 70));

  // Abrir modal al tocar la foto o el nombre
  grid.querySelectorAll("[data-open]").forEach(node => {
    node.addEventListener("click", () => openModal(node.dataset.open));
  });

  // Agregado rápido (usa el sabor por defecto si aplica)
  grid.querySelectorAll("[data-quickadd]").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = PRODUCTS.find(p => p.id === btn.dataset.quickadd);
      const flavor = product.flavors ? product.flavors[0].name : null;
      addToCart(product, flavor);
    });
  });
}

// ---------- Filtros ----------
el("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentFilter = btn.dataset.filter;
  renderProducts();
  el("filtersDesc").textContent = CATEGORY_DESC[currentFilter] || "";
});

// ---------- Armá tu pedido (combinación personalizada) ----------
const buildInput = el("buildInput");
const buildAdd = el("buildAdd");

buildAdd.addEventListener("click", addCustomBuild);

// Enter dentro del input también agrega la combinación
buildInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addCustomBuild();
  }
});

function addCustomBuild() {
  const raw = buildInput.value.trim();
  if (!raw) {
    showToast("Escribí las frutas que querés combinar 🍓");
    buildInput.focus();
    return;
  }

  const normalized = normalizeText(raw);
  const matched = Object.keys(FRUIT_KEYWORDS)
    .filter(key => normalized.includes(key))
    .map(key => FRUIT_KEYWORDS[key]);

  const price = matched.length ? matched.length * FRUIT_KEYWORDS.mango.price : CUSTOM_BASE_PRICE;

  // Usamos el texto normalizado como key para que, si el cliente escribe
  // la misma combinación otra vez, sume cantidad en vez de duplicar la línea.
  const pseudoProduct = {
    id: `custom-${normalized}`,
    name: `Tu combo: ${raw}`,
    price
  };

  addToCart(pseudoProduct, null);

  const fruitNames = matched.map(f => f.label).join(", ");
  showToast(fruitNames ? `Combo con ${fruitNames} agregado 🛒` : "Tu combo agregado 🛒");

  buildInput.value = "";
  buildInput.focus();
}

// ---------- Modal de producto ----------
function openModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  currentProduct = product;
  currentFlavor = product.flavors ? product.flavors[0].name : null;

  el("modalImg").src = product.flavors ? product.flavors[0].img : (product.img || "");
  el("modalImg").alt = product.name;
  el("modalImg").style.display = product.img || product.flavors ? "block" : "none";
  el("modalCategory").textContent = categoryLabel(product.category);
  el("modalName").textContent = product.name;
  el("modalDesc").textContent = product.desc;
  el("modalPrice").textContent = fmt(product.price);

  // 🍓 Frutas que contiene
  const fruitsBox = el("modalFruits");
  fruitsBox.innerHTML = (product.fruits || []).map(f => `<span>${f}</span>`).join("");
  el("modalFruitsBlock").style.display = (product.fruits && product.fruits.length) ? "" : "none";

  // 🌶️ Ingredientes
  const ingBox = el("modalIngredients");
  ingBox.innerHTML = (product.ingredients || []).map(i => `<span>${i}</span>`).join("");
  el("modalIngredientsBlock").style.display = (product.ingredients && product.ingredients.length) ? "" : "none";

  // 👩‍🍳 Proceso de preparación
  const stepsBox = el("modalSteps");
  stepsBox.innerHTML = (product.steps || []).map(s => `<li>${s}</li>`).join("");
  el("modalStepsBlock").style.display = (product.steps && product.steps.length) ? "" : "none";

  // 🍬 Opciones (sabores para elegir)
  const flavorsBox = el("modalFlavors");
  flavorsBox.innerHTML = "";
  if (product.flavors) {
    product.flavors.forEach((f, i) => {
      const b = document.createElement("button");
      b.className = "flavor-btn" + (i === 0 ? " active" : "");
      b.textContent = f.name;
      b.addEventListener("click", () => {
        flavorsBox.querySelectorAll(".flavor-btn").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        currentFlavor = f.name;
        el("modalImg").src = f.img;
      });
      flavorsBox.appendChild(b);
    });
  }
  el("modalOptionsBlock").style.display = product.flavors ? "" : "none";

  el("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  el("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

el("modalClose").addEventListener("click", closeModal);
el("modalOverlay").addEventListener("click", (e) => {
  if (e.target === el("modalOverlay")) closeModal();
});

el("modalAdd").addEventListener("click", () => {
  addToCart(currentProduct, currentFlavor);
  closeModal();
});

function categoryLabel(cat) {
  const labels = {
    mixes: "Mix de frutas",
    preparada: "Fruta preparada",
    picantes: "Picante"
  };
  return labels[cat] || "";
}

// ---------- Carrito ----------
function addToCart(product, flavor) {
  const key = flavor ? `${product.id}::${flavor}` : product.id;
  const displayName = flavor ? `${product.name} (${flavor})` : product.name;

  if (cart[key]) {
    cart[key].qty += 1;
  } else {
    cart[key] = { name: displayName, price: product.price, qty: 1 };
  }
  renderCart();
  showToast(`${displayName} agregado 🛒`);
}

function changeQty(key, delta) {
  if (!cart[key]) return;
  cart[key].qty += delta;
  if (cart[key].qty <= 0) delete cart[key];
  renderCart();
}

function removeItem(key) {
  delete cart[key];
  renderCart();
}

function renderCart() {
  const lista = el("pedidoLista");
  const keys = Object.keys(cart);

  lista.innerHTML = "";

  if (keys.length === 0) {
    lista.innerHTML = `<li class="pedido-vacio" id="pedidoVacio">Todavía no agregás productos. ¡Elegí algo del catálogo!</li>`;
  } else {
    keys.forEach(key => {
      const item = cart[key];
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="item-info">
          <span class="item-name">${item.name}</span>
          <span class="item-price">${fmt(item.price)} c/u</span>
        </div>
        <div class="qty-controls">
          <button class="qty-btn" data-dec="${key}">−</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-inc="${key}">+</button>
          <button class="remove-btn" data-remove="${key}" aria-label="Eliminar">🗑️</button>
        </div>
      `;
      lista.appendChild(li);
    });
  }

  // Total y contador
  let total = 0;
  let count = 0;
  keys.forEach(k => {
    total += cart[k].price * cart[k].qty;
    count += cart[k].qty;
  });
  el("pedidoTotal").textContent = fmt(total);
  el("cartCount").textContent = count;

  // Listeners de cantidad
  lista.querySelectorAll("[data-inc]").forEach(b =>
    b.addEventListener("click", () => changeQty(b.dataset.inc, 1)));
  lista.querySelectorAll("[data-dec]").forEach(b =>
    b.addEventListener("click", () => changeQty(b.dataset.dec, -1)));
  lista.querySelectorAll("[data-remove]").forEach(b =>
    b.addEventListener("click", () => removeItem(b.dataset.remove)));
}

// ---------- Enviar pedido por WhatsApp ----------
el("enviarWhatsapp").addEventListener("click", () => {
  const keys = Object.keys(cart);
  if (keys.length === 0) {
    showToast("Agregá al menos un producto antes de enviar 🍓");
    return;
  }

  const nombre = el("clienteNombre").value.trim();
  if (!nombre) {
    showToast("Escribí tu nombre para poder enviar el pedido");
    el("clienteNombre").focus();
    return;
  }

  const direccion = el("clienteDireccion").value.trim();
  const notas = el("clienteNotas").value.trim();
  const metodoPago = getMetodoPago();

  const pagoInfo = buildPagoInfo(metodoPago);
  if (pagoInfo === false) return; // faltan datos del método de pago, ya se avisó con un toast

  let mensaje = `Hola Spacy Fruit Zone 🐾🍓\nSoy ${nombre} y quiero hacer este pedido:\n\n`;
  let total = 0;

  keys.forEach(key => {
    const item = cart[key];
    const subtotal = item.price * item.qty;
    total += subtotal;
    mensaje += `${item.qty} x ${item.name} — ${fmt(subtotal)}\n`;
  });

  mensaje += `\nTotal: ${fmt(total)}`;
  mensaje += `\nMétodo de pago: ${PAGO_LABELS[metodoPago]}`;
  if (pagoInfo) mensaje += `\n${pagoInfo}`;
  if (direccion) mensaje += `\n\nDirección: ${direccion}`;
  if (notas) mensaje += `\nNotas: ${notas}`;
  mensaje += `\n\n¡Gracias! 🌶️`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  showConfirmation();
});

// ---------- Método de pago ----------
const PAGO_LABELS = {
  tarjeta: "Tarjeta (crédito/débito)",
  transferencia: "Transferencia bancaria",
  billetera: "Billetera digital / pago instantáneo",
  contraentrega: "Contra entrega"
};

function getMetodoPago() {
  const checked = document.querySelector('input[name="metodoPago"]:checked');
  return checked ? checked.value : "tarjeta";
}

// Muestra solo el bloque de datos que corresponde al método elegido
function togglePagoDetalle() {
  const metodo = getMetodoPago();
  document.querySelectorAll(".pago-detalle").forEach(box => {
    box.hidden = box.id !== `pagoDetalle-${metodo}`;
  });
}
document.querySelectorAll('input[name="metodoPago"]').forEach(input => {
  input.addEventListener("change", togglePagoDetalle);
});
togglePagoDetalle();

// Valida y arma la línea extra con los datos del método de pago elegido.
// Nunca pedimos número completo de tarjeta ni CVV: eso se cobra con
// datáfono en persona, nunca por WhatsApp.
function buildPagoInfo(metodo) {
  if (metodo === "tarjeta") {
    const titular = el("pagoTitular").value.trim();
    if (!titular) {
      showToast("Escribí el nombre del titular de la tarjeta");
      el("pagoTitular").focus();
      return false;
    }
    const tipo = el("pagoTipoTarjeta").value;
    return `Tarjeta ${tipo} — Titular: ${titular} (se cobra con datáfono al entregar)`;
  }

  if (metodo === "transferencia") {
    const banco = el("pagoBancoOrigen").value.trim();
    const referencia = el("pagoReferencia").value.trim();
    if (!banco || !referencia) {
      showToast("Completá tu banco y el número de referencia de la transferencia");
      (banco ? el("pagoReferencia") : el("pagoBancoOrigen")).focus();
      return false;
    }
    return `Transferencia desde: ${banco} — Referencia: ${referencia}`;
  }

  if (metodo === "billetera") {
    const wallet = el("pagoWallet").value;
    const dato = el("pagoWalletDato").value.trim();
    if (!dato) {
      showToast("Escribí tu número o usuario de la billetera digital");
      el("pagoWalletDato").focus();
      return false;
    }
    return `Billetera: ${wallet} — Número/usuario: ${dato}`;
  }

  return ""; // contra entrega: no necesita datos extra
}

// ---------- Confirmación de compra ----------
let confirmacionTimer;
function showConfirmation() {
  const box = el("pedidoConfirmacion");
  box.classList.add("show");
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  clearTimeout(confirmacionTimer);
  confirmacionTimer = setTimeout(() => box.classList.remove("show"), 8000);
}

// =========================================================
// ---------- Reseñas y calificaciones ----------
// =========================================================
const SAMPLE_REVIEWS = [
  { name: "Karla M.", stars: 5, text: "El mix de frutas está buenísimo, siempre fresco y bien picante. ¡Mi favorito!" },
  { name: "Diego R.", stars: 5, text: "Pedí los Pepinos Locos y llegaron rapidísimo por WhatsApp. Recomendado." },
  { name: "Fátima S.", stars: 4, text: "Muy rico, solo le pondría un poquito menos de chamoy en el mix." }
];

let reviews = [...SAMPLE_REVIEWS];
let selectedStars = 0;

function renderReviews() {
  const lista = el("resenasLista");
  lista.innerHTML = reviews.map(r => `
    <li class="resena-card">
      <div>
        <span class="resena-nombre">${r.name}</span>
        <span class="resena-stars">${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}</span>
      </div>
      <p class="resena-texto">${r.text}</p>
    </li>
  `).join("");
}

// Estrellas seleccionables (calificación de 1 a 5)
const starButtons = document.querySelectorAll("#starRating .star");
starButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedStars = Number(btn.dataset.star);
    updateStarDisplay();
  });
});

function updateStarDisplay() {
  starButtons.forEach(btn => {
    btn.classList.toggle("active", Number(btn.dataset.star) <= selectedStars);
  });
}

el("enviarResena").addEventListener("click", () => {
  const nombre = el("resenaNombre").value.trim();
  const texto = el("resenaTexto").value.trim();

  if (!selectedStars) {
    showToast("Elegí una calificación con las estrellas ⭐");
    return;
  }
  if (!nombre) {
    showToast("Escribí tu nombre para dejar la reseña");
    el("resenaNombre").focus();
    return;
  }
  if (!texto) {
    showToast("Contanos algo en tu reseña 📝");
    el("resenaTexto").focus();
    return;
  }

  // Mostramos la reseña de inmediato arriba de la lista
  reviews.unshift({ name: nombre, stars: selectedStars, text: texto });
  renderReviews();

  // También la enviamos por WhatsApp para que le llegue al negocio
  const mensaje = `Hola Spacy Fruit Zone 🐾⭐\nSoy ${nombre} y quiero dejar mi reseña:\n\nCalificación: ${"★".repeat(selectedStars)} (${selectedStars}/5)\n"${texto}"`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  showToast("¡Gracias por tu reseña! 🌶️");

  el("resenaNombre").value = "";
  el("resenaTexto").value = "";
  selectedStars = 0;
  updateStarDisplay();
});

// ---------- Toast ----------
let toastTimer;
function showToast(msg) {
  const toast = el("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ---------- Menú móvil ----------
el("navToggle").addEventListener("click", () => {
  el("navLinks").classList.toggle("open");
});
el("navLinks").querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => el("navLinks").classList.remove("open")));

// Botón carrito en el header sube a la sección de pedido
el("cartToggle").addEventListener("click", () => {
  document.getElementById("pedido").scrollIntoView({ behavior: "smooth" });
});

// =========================================================
// ---------- Modo claro / oscuro ----------
// =========================================================
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  el("themeToggle").textContent = theme === "dark" ? "☀️" : "🌙";
  el("themeToggle").setAttribute(
    "aria-label",
    theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
  );
  localStorage.setItem("sfz-theme", theme);
}

el("themeToggle").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  applyTheme(current === "dark" ? "light" : "dark");
});

// Sincroniza el ícono del botón con el tema ya aplicado en <head>
applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

// =========================================================
// ---------- Ventanas animadas del menú ----------
// Nosotros / Qué ofrecemos / Contacto: cada una abre como una
// "ventanita" con su propia animación de entrada y elementos
// flotantes decorativos.
// =========================================================
const WINDOWS = {
  nosotros: {
    anim: "nosotros",
    decor: ["🐾", "🍉", "🐾"],
    html: `
      <p class="win-eyebrow">Nosotros</p>
      <h3 class="win-title">Fruta del día, preparada a tu gusto 🐾</h3>
      <p>En Spacy Fruit Zone escogemos la fruta fresca cada mañana y la preparamos justo cuando llega tu pedido. Nada de dejarla armada horas antes: se corta, se sazona y sale directo para vos, con el nivel de picante que prefieras.</p>
      <ul class="win-list win-nosotros-list">
        <li>Fruta fresca seleccionada cada día</li>
        <li>Preparado al momento del pedido</li>
        <li>Vos elegís el picante: suave, normal o extra</li>
      </ul>
    `
  },
  info: {
    anim: "info",
    decor: ["✨", "🍓", "🌶️", "✨"],
    html: `
      <p class="win-eyebrow">Qué ofrecemos</p>
      <h3 class="win-title">¿Qué es Spacy Fruit Zone? 🍓</h3>
      <p>Spacy Fruit Zone es un emprendimiento dedicado a la preparación y venta de frutas frescas, combinadas con diferentes ingredientes y sabores para ofrecer una experiencia diferente en cada producto.</p>
      <p>Nuestra variedad incluye Mix de frutas, fruta preparada (sandía, mango, piña y pepino) y Pepinos Locos, utilizando ingredientes frescos y preparados al momento.</p>
      <ul class="win-list">
        <li>🌶️ Sabores dulces, ácidos y picantes.</li>
        <li>🍓 Frutas frescas y variadas.</li>
        <li>🥭 Preparaciones hechas al momento.</li>
        <li>✨ Opciones para diferentes gustos.</li>
      </ul>
    `
  },
  contacto: {
    anim: "contacto",
    decor: ["📍", "📲", "🕑"],
    html: `
      <p class="win-eyebrow">Contacto</p>
      <h3 class="win-title">Encontranos 📍</h3>
      <ul class="win-list">
        <li>📍 <strong>Zona:</strong> Santo Tomás, San Salvador</li>
        <li>🕑 <strong>Horario:</strong> Lunes a sábado, 9am – 6pm</li>
        <li>📱 <strong>WhatsApp:</strong> <a href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener">+503 6058-8060</a></li>
        <li>🚗 <strong>Entrega:</strong> a domicilio o para recoger, coordinalo directo al enviar tu pedido por WhatsApp.</li>
      </ul>
    `
  }
};

function openWindow(key) {
  const data = WINDOWS[key];
  if (!data) return;

  el("winBody").innerHTML = data.html;
  el("winCard").dataset.anim = data.anim;

  const decor = el("winDecor");
  decor.innerHTML = "";
  data.decor.forEach((emoji, i) => {
    const span = document.createElement("span");
    span.textContent = emoji;
    span.style.left = `${10 + i * 28}%`;
    span.style.top = `${8 + (i % 2) * 70}%`;
    span.style.animationDelay = `${i * 0.4}s`;
    decor.appendChild(span);
  });

  el("winOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeWindow() {
  el("winOverlay").classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-window]").forEach(trigger => {
  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    openWindow(trigger.dataset.window);
  });
  // Permitir abrir con Enter/Espacio cuando el disparador no es un botón nativo
  trigger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openWindow(trigger.dataset.window);
    }
  });
});

el("winClose").addEventListener("click", closeWindow);
el("winOverlay").addEventListener("click", (e) => {
  if (e.target === el("winOverlay")) closeWindow();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeWindow();
    closeModal();
  }
});

// =========================================================
// ---------- Movimiento de letras ----------
// Envuelve cada letra de un elemento en su propio <span class="letra">
// con un pequeño retraso de animación, para que el texto se mueva
// letra por letra (ver keyframes en style.css). Respeta elementos
// anidados (por ejemplo <span class="brand-dash">) recorriéndolos.
// =========================================================
function wrapLettersRecursive(node, indexRef) {
  if (node.nodeType === Node.TEXT_NODE) {
    const frag = document.createDocumentFragment();
    node.textContent.split("").forEach(ch => {
      const span = document.createElement("span");
      span.className = "letra";
      span.style.animationDelay = `${indexRef.i * 0.045}s`;
      span.textContent = ch === " " ? "\u00A0" : ch;
      if (ch !== " ") indexRef.i++;
      frag.appendChild(span);
    });
    node.replaceWith(frag);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    Array.from(node.childNodes).forEach(child => wrapLettersRecursive(child, indexRef));
  }
}

function animateLetters(selector) {
  document.querySelectorAll(selector).forEach(target => {
    const indexRef = { i: 0 };
    Array.from(target.childNodes).forEach(child => wrapLettersRecursive(child, indexRef));
    target.classList.add("letras-anim");
  });
}

// =========================================================
// ---------- Aparición suave de secciones al hacer scroll ----------
// Agrega la clase "reveal" a los elementos indicados y usa un
// IntersectionObserver para sumarles "in-view" cuando entran en
// pantalla, dando sensación de movimiento al navegar la página.
// =========================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function observeReveal(node, delay = 0) {
  if (!node || node.classList.contains("reveal")) return;
  node.classList.add("reveal");
  if (delay) node.style.transitionDelay = `${delay}ms`;
  revealObserver.observe(node);
}

function setupScrollReveal() {
  document.querySelectorAll(
    ".section-head, .nosotros-teaser-inner, .pedido-box, .footer-inner, .resena-form-card"
  ).forEach(node => observeReveal(node));

  document.querySelectorAll(".red-card").forEach((node, i) => observeReveal(node, i * 90));
  document.querySelectorAll(".resena-card").forEach((node, i) => observeReveal(node, i * 90));
}

// ---------- Inicio ----------
el("year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
renderReviews();
setupScrollReveal();

// Aplicamos el movimiento de letras al nombre de la marca y a "picante" del hero
animateLetters(".brand-name");
animateLetters(".hero-picante");