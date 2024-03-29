let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let listCard2 = document.querySelector(".listCard2");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

//เมื่อคลิกที่ openShopping, จะเพิ่มคลาส active ให้กับ body เพื่อแสดงตะกร้าสินค้า.
openShopping.addEventListener("click", () => {
    body.classList.add("active");
});
//เมื่อคลิกที่ closeShopping, คลาส active จะถูกลบออกจาก body เพื่อซ่อนตะกร้าสินค้า.
closeShopping.addEventListener("click", () => {
    body.classList.remove("active");
});

//มีข้อมูลของสินค้าที่เก็บไว้ในอาร์เรย์ products.
let products = [{
        id: 1,
        name: "หัว Marbo nic50 - องุ่น",
        image: "1.PNG",
        price: 100,
    },
    {
        id: 2,
        name: "หัว Marbo nic50 - แตงโม",
        image: "2.PNG",
        price: 100,
    },
    {
        id: 3,
        name: "หัว Marbo nic50 - องุ่นอโล",
        image: "3.PNG",
        price: 100,
    },
    {
        id: 4,
        name: "หัว Marbo - แอปเปิล",
        image: "4.PNG",
        price: 100,
    },
    {
        id: 5,
        name: "หัว Marbo - พีช",
        image: "5.PNG",
        price: 100,
    },
    {
        id: 6,
        name: "หัว Marbo - พีชสตอ",
        image: "6.PNG",
        price: 100,
    },
    {
        id: 7,
        name: "หัว Marbo - มิ้นท์",
        image: "7.PNG",
        price: 100,
    },
    {
        id: 8,
        name: "หัว Marbo - มะนาว",
        image: "8.PNG",
        price: 100,
    },
    {
        id: 9,
        name: "หัว Jues+ - แฟนต้าองุ่น",
        image: "9.PNG",
        price: 100,
    },
    {
        id: 10,
        name: "หัว Jues+ -สตอ โยเกิร์ต",
        image: "10.PNG",
        price: 100,
    },
];
let listCards = [];

//มันจะสร้าง HTML elements สำหรับแต่ละสินค้าและแสดงผลลัพธ์ในหน้าเว็บ โดยใช้ forEach loop สำหรับทุกสินค้าใน array products
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card <i class="fas fa-shopping-cart"></i></button>`; // เพิ่มไอคอนรถเข็นหลังจากปุ่ม "Add To Card"
        list.appendChild(newDiv);
    });
}
initApp();
function addToCard(key) {
  if (listCards[key] == null) {
    listCards[key] = { ...products[key], quantity: 1 }; // ถ้าสินค้ายังไม่ได้ถูกเพิ่ม ให้เพิ่มสินค้านั้นและกำหนด quantity เป็น 1
  } else {
    listCards[key].quantity += 1; // ถ้าสินค้าได้ถูกเพิ่มแล้ว ให้เพิ่ม quantity
  }
  reloadCard(); // โหลดการ์ดสินค้าใหม่เพื่ออัปเดต UI
}



// ใช้ในการเปลี่ยนจำนวนของสินค้าในตะกร้า หรือลบสินค้าออกจากตะกร้า
function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key]; //// ลบสินค้าออกถ้าจำนวนเป็น 0
  } else {
    listCards[key].totalItemPrice = quantity * products[key].price; //เป็นคำนวณนี้เป็นการอัปเดตราคาของสินค้าในตะกร้า
    listCards[key].quantity = quantity; //// อัปเดตจำนวนสินค้า
  }
  reloadCard();
}

function clearCart() {
  listCards = []; // เคลียร์รายการสินค้าทั้งหมดในตะกร้า
  reloadCard(); // โหลดการ์ดสินค้าใหม่เพื่ออัปเดต UI
}   


//ใช้ในการโหลดการ์ดสินค้าใหม่เพื่ออัปเดต UI แสดงรายการสินค้าที่มีในตะกร้า และคำนวณราคารวม.
// ใช้ในการโหลดการ์ดสินค้าใหม่เพื่ออัปเดต UI แสดงรายการสินค้าที่มีในตะกร้า และคำนวณราคารวม.
function reloadCard() {
  // ล้างค่าของ listCard เพื่อเตรียมการแสดงสินค้าใหม่
  listCard.innerHTML = "";

  // กำหนดค่าเริ่มต้นของ count และ totalPrice เป็น 0
  let count = 0;
  let totalPrice = 0;

  // เรียกใช้งานฟังก์ชันเพื่อเรียกข้อมูลของผู้ซื้อ
  const buyerName = document.getElementById("buyer-name").value;
  const buyerPhone = document.getElementById("buyer-phone").value;

  

  // สร้าง element เพื่อแสดงข้อมูลผู้ซื้อใน listCard
  let buyerInfoDiv = document.createElement("div");
  buyerInfoDiv.innerHTML = `
        <div class="buyer-name">ชื่อผู้ซื้อ: ${buyerName}</div>
        <div class="buyer-phone">เบอร์โทรศัพท์: ${buyerPhone}</div>
        
    `;
  listCard.appendChild(buyerInfoDiv);

  // วนลูปผ่าน listCards เพื่อแสดงสินค้าที่มีอยู่ในตะกร้า
  listCards.forEach((value, key) => {
    if (value != null) {
      // เพิ่มจำนวนสินค้าในตะกร้า
      count += value.quantity;

      // คำนวณราคารวมสำหรับแต่ละสินค้า
      let totalItemPrice = value.price * value.quantity;

      // เพิ่มราคารวมของสินค้าทั้งหมด
      totalPrice += totalItemPrice;

      // สร้าง element ใหม่สำหรับแสดงสินค้า
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${totalItemPrice.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                </div>
            `;

      // เพิ่ม element ที่สร้างเข้าไปใน listCard
      listCard.appendChild(newDiv);
    }
  });

  // เพิ่มราคารวมสินค้าใน buyerInfoDiv
  buyerInfoDiv.innerHTML += `<div class="buyer-price">ราคารวมสินค้า: ${totalPrice.toLocaleString()} บาท</div>`;
  // แสดงราคารวมและจำนวนสินค้าทั้งหมด
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}
document.getElementById("save-pdf").addEventListener("click", function () {
  // จับภาพองค์ประกอบคอนเทนเนอร์ใบเสร็จรับเงิน
  const receiptContainer = document.getElementById("listCard");

  // ใช้ dom-to-image เพื่อแปลงคอนเทนเนอร์ใบเสร็จรับเงินให้เป็นรูปภาพ
  domtoimage.toBlob(receiptContainer).then(function (blob) {
    // Save the image as a file using FileSaver.js
    saveAs(blob, "Check.png");
  });
});

