const menuItems=[
 {name:"Greek Salad",price:12.99,emoji:"🥗",desc:"Crisp greens, tomatoes, olives, feta and our lemon dressing."},
 {name:"Bruschetta",price:8.99,emoji:"🍅",desc:"Grilled bread topped with tomatoes, basil and extra virgin olive oil."},
 {name:"Lemon Dessert",price:6.99,emoji:"🍋",desc:"A bright, creamy lemon dessert finished with fresh zest."},
 {name:"Grilled Fish",price:18.99,emoji:"🐟",desc:"Seasonal fish grilled with herbs, lemon and Mediterranean vegetables."},
 {name:"Pasta Primavera",price:15.99,emoji:"🍝",desc:"Handmade pasta tossed with seasonal vegetables and parmesan."},
 {name:"Mediterranean Platter",price:19.99,emoji:"🫓",desc:"Hummus, falafel, pita, olives and fresh Mediterranean sides."}
];
let cart=JSON.parse(localStorage.getItem("littleLemonCart")||"[]");
const cards=document.getElementById("menuCards"), count=document.getElementById("cartCount"), modal=document.getElementById("modal"), content=document.getElementById("modalContent");
function renderMenu(items=menuItems){cards.innerHTML=items.map((x,i)=>`<article class="food-card"><div class="food-img">${x.emoji}</div><div class="food-info"><div class="food-title"><span>${x.name}</span><span class="price">$${x.price.toFixed(2)}</span></div><p>${x.desc}</p><button class="add" data-index="${i}">Add to order</button></div></article>`).join("");document.querySelectorAll(".add").forEach(b=>b.onclick=()=>addToCart(items[b.dataset.index]));}
function updateCount(){count.textContent=cart.reduce((s,x)=>s+x.qty,0);localStorage.setItem("littleLemonCart",JSON.stringify(cart));}
function addToCart(item){let found=cart.find(x=>x.name===item.name);found?found.qty++:cart.push({...item,qty:1});updateCount();toast(`${item.name} added to your order`);}
function toast(msg){let t=document.createElement("div");t.className="toast";t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2200);}
function openModal(html){content.innerHTML=html;modal.classList.remove("hidden")}
function closeModal(){modal.classList.add("hidden")}
document.getElementById("cartButton").onclick=()=>{let total=cart.reduce((s,x)=>s+x.price*x.qty,0);openModal(`<h2>Your order</h2>${cart.length?`<div class="cart-list">${cart.map(x=>`<div class="cart-row"><span>${x.name} × ${x.qty}</span><strong>$${(x.price*x.qty).toFixed(2)}</strong></div>`).join("")}</div><hr><h3>Total: $${total.toFixed(2)}</h3><button class="btn primary" id="checkout">Place order</button>`:`<p>Your basket is empty. Add a dish from the menu to get started.</p>`}`);const c=document.getElementById("checkout");if(c)c.onclick=()=>{cart=[];updateCount();closeModal();toast("Order placed successfully!");}}
document.getElementById("closeModal").onclick=closeModal;modal.onclick=e=>{if(e.target===modal)closeModal()};
document.getElementById("viewMenu").onclick=()=>document.getElementById("menu").scrollIntoView({behavior:"smooth"});
document.getElementById("orderNow").onclick=()=>document.getElementById("menu").scrollIntoView({behavior:"smooth"});
document.getElementById("menuToggle").onclick=()=>document.getElementById("nav").classList.toggle("open");
document.querySelectorAll("#nav a").forEach(a=>a.onclick=()=>document.getElementById("nav").classList.remove("open"));
const date=document.getElementById("date");date.min=new Date().toISOString().split("T")[0];
document.getElementById("bookingForm").onsubmit=e=>{e.preventDefault();const d=date.value,t=document.getElementById("time").value,g=document.getElementById("guests").value,o=document.getElementById("occasion").value;localStorage.setItem("littleLemonReservation",JSON.stringify({d,t,g,o}));openModal(`<h2>Reservation confirmed! 🎉</h2><p>Your table for <strong>${g}</strong> guest(s) is reserved for <strong>${d}</strong> at <strong>${t}</strong>.</p><p>Occasion: ${o}. We look forward to seeing you at Little Lemon.</p><button class="btn primary" id="done">Done</button>`);document.getElementById("done").onclick=closeModal;e.target.reset()};
renderMenu();updateCount();