// Simple product list using provided filenames. Prices are sample values.
const PRODUCTS = [
  {id:'bestipink', name:'Bestie Pink Tee', price:24.99, file:'bestipink.jpg'},
  {id:'bestiepurple', name:'Bestie Purple Tee', price:24.99, file:'bestipurple.jpg'},
  {id:'classicblack', name:'Classic Black Tee', price:22.99, file:'classicblack.jpg'},
  {id:'classicwhite', name:'Classic White Tee', price:22.99, file:'classicwhite.jpg'},
  {id:'totebag', name:'Canvas Tote Bag', price:14.99, file:'totebag.jpg'},
  {id:'truckerblack', name:'Trucker Cap Black', price:19.99, file:'truckerblack.jpg'},
  {id:'truckerwhite', name:'Trucker Cap White', price:19.99, file:'truckerwhite.jpg'},
];

// Cart stored in localStorage
const CART_KEY = 'glbecom_cart_v1';
function readCart(){try{return JSON.parse(localStorage.getItem(CART_KEY)||'[]')}catch(e){return []}}
function writeCart(cart){localStorage.setItem(CART_KEY,JSON.stringify(cart))}

function addToCart(productId){
  const cart = readCart();
  const item = cart.find(i=>i.id===productId);
  if(item) item.qty++;
  else cart.push({id:productId,qty:1});
  writeCart(cart);
  renderCartBadge();
  renderMiniCart();
}

function removeFromCart(productId){
  let cart = readCart();
  cart = cart.filter(i=>i.id!==productId);
  writeCart(cart);
  renderCartBadge();
  renderMiniCart();
}

function changeQty(productId, delta){
  const cart = readCart();
  const it = cart.find(i=>i.id===productId);
  if(!it) return;
  it.qty += delta;
  if(it.qty<1) removeFromCart(productId);
  else writeCart(cart);
  renderCartBadge();
  renderMiniCart();
}

function cartTotals(){
  const cart = readCart();
  let subtotal = 0, items = 0;
  for(const it of cart){
    const p = PRODUCTS.find(p=>p.id===it.id);
    if(!p) continue;
    subtotal += p.price * it.qty;
    items += it.qty;
  }
  return {subtotal,items};
}

function renderCartBadge(){
  const badge = document.getElementById('cart-badge');
  if(!badge) return;
  badge.textContent = cartTotals().items;
}

function renderProducts(){
  const container = document.getElementById('products');
  if(!container) return;
  container.innerHTML = '';
  for(const p of PRODUCTS){
    const el = document.createElement('div'); el.className='product';
    const img = document.createElement('img');
    img.src = locateAsset(p.file);
    img.alt = p.name;
    el.appendChild(img);
    const h = document.createElement('h4'); h.textContent = p.name; el.appendChild(h);
    const price = document.createElement('div'); price.className='price'; price.textContent = `$${p.price.toFixed(2)}`; el.appendChild(price);
    const btn = document.createElement('button'); btn.className='btn primary'; btn.textContent='Add to cart';
    btn.addEventListener('click',()=>addToCart(p.id));
    el.appendChild(btn);
    container.appendChild(el);
  }
}

function locateAsset(name){
  // Assets are expected at /assets/<name>
  return `/assets/${name}`;
}

function renderMiniCart(){
  const container = document.getElementById('mini-cart-items');
  const subtotalEl = document.getElementById('mini-cart-subtotal');
  if(!container || !subtotalEl) return;
  const cart = readCart();
  container.innerHTML = '';
  for(const it of cart){
    const p = PRODUCTS.find(p=>p.id===it.id);
    if(!p) continue;
    const div = document.createElement('div'); div.className='mini-cart-item';
    const img = document.createElement('img'); img.src = locateAsset(p.file); div.appendChild(img);
    const meta = document.createElement('div'); meta.style.flex='1';
    const title = document.createElement('div'); title.textContent = p.name; meta.appendChild(title);
    const price = document.createElement('div'); price.className='price'; price.textContent = `$${(p.price*it.qty).toFixed(2)}`; meta.appendChild(price);
    const qty = document.createElement('div'); qty.className='qty';
    const minus = document.createElement('button'); minus.textContent='-'; minus.addEventListener('click',()=>changeQty(it.id,-1));
    const num = document.createElement('span'); num.textContent=it.qty; num.style.padding='0 8px';
    const plus = document.createElement('button'); plus.textContent='+'; plus.addEventListener('click',()=>changeQty(it.id,1));
    const rem = document.createElement('button'); rem.textContent='Remove'; rem.addEventListener('click',()=>removeFromCart(it.id));
    qty.appendChild(minus); qty.appendChild(num); qty.appendChild(plus); qty.appendChild(rem);
    meta.appendChild(qty);
    div.appendChild(meta);
    container.appendChild(div);
  }
  subtotalEl.textContent = cartTotals().subtotal.toFixed(2);
}

// Mini-cart toggle
document.addEventListener('DOMContentLoaded',()=>{
  renderCartBadge();
  renderMiniCart();
  renderProducts();

  const cartIcon = document.getElementById('cart-icon');
  const mini = document.getElementById('mini-cart');
  if(cartIcon && mini){
    cartIcon.addEventListener('click',()=>{
      mini.classList.toggle('hidden');
      mini.setAttribute('aria-hidden', mini.classList.contains('hidden'));
    });
  }

  // Wire view cart / checkout
  const viewCart = document.getElementById('view-cart');
  if(viewCart) viewCart.addEventListener('click',()=>window.location.href='/store.html');
  const checkout = document.getElementById('checkout');
  if(checkout) checkout.addEventListener('click',()=>{
    alert('Checkout flow is not implemented in this demo.');
  });

  // Init three.js background if canvas present
  initBackground();
});

// --- Simple Three.js animated background ---
function initBackground(){
  const canvas = document.getElementById('bg-canvas');
  if(!canvas || typeof THREE === 'undefined') return;
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 5;
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Particles
  const geom = new THREE.BufferGeometry();
  const count = 800;
  const positions = new Float32Array(count*3);
  for(let i=0;i<count;i++){
    positions[i*3+0] = (Math.random()-0.5)*20;
    positions[i*3+1] = (Math.random()-0.5)*10;
    positions[i*3+2] = (Math.random()-0.5)*20;
  }
  geom.setAttribute('position', new THREE.BufferAttribute(positions,3));
  const material = new THREE.PointsMaterial({size:0.08, color:0xff6bcb, transparent:true, opacity:0.9});
  const points = new THREE.Points(geom, material);
  scene.add(points);

  let t=0;
  function resize(){
    const w = window.innerWidth, h=window.innerHeight;
    renderer.setSize(w,h); camera.aspect = w/h; camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  function animate(){
    t += 0.005;
    points.rotation.y = t*0.6;
    points.rotation.x = Math.sin(t*0.3)*0.1;
    // color shift
    material.color.setHSL((Math.sin(t*0.2)+1)/4+0.2, 0.9, 0.6);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}
