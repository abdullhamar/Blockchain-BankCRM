let web3;
let account;
let bankContract;
let contractABI;
let contractAddress;

let editingId = null;
let balanceVisible = false;

const logEl = msg => {
  const el = document.getElementById('log');
  el.innerText = (new Date()).toLocaleTimeString() + " — " + msg + "\n" + el.innerText;
};

// Load ABI
async function loadContractAbi() {
  try {
    const res = await fetch('/build/contracts/BankCRM.json');
    const json = await res.json();
    contractABI = json.abi;

    const networks = json.networks || {};
    const ids = Object.keys(networks);

    if (ids.length > 0) {
      contractAddress = networks[ids[ids.length - 1]].address;
      logEl("تم العثور على عنوان العقد: " + contractAddress);
    }
  } catch (e) {
    logEl("تعذر تحميل ABI، تأكد من وجود ملف Truffle.");
  }
}

// Connect Wallet
async function connectWallet() {
  if (!window.ethereum) return alert("يرجى تثبيت MetaMask");

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);

    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    document.getElementById("account").innerText = account;

    const netId = await web3.eth.net.getId();
    document.getElementById("networkName").innerText = netId;

    if (contractABI && contractAddress) {
      bankContract = new web3.eth.Contract(contractABI, contractAddress);
      logEl("تم الاتصال بالعقد بنجاح");
      refreshCustomers();
    }
  } catch (err) {
    logEl("فشل الاتصال: " + err.message);
  }
}

// Add Customer
async function addCustomerHandler(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const initBal = document.getElementById("initBal").value || "0";

  try {
    const tx = await bankContract.methods.addCustomer(name, email, initBal)
      .send({ from: account });

    logEl("تمت إضافة عميل: " + tx.transactionHash);
    e.target.reset();
    refreshCustomers();
  } catch (err) {
    logEl("خطأ الإضافة: " + err.message);
  }
}

// Refresh
async function refreshCustomers() {
  const tbody = document.querySelector("#customersTable tbody");
  tbody.innerHTML = "";

  try {
    const count = await bankContract.methods.customerCount().call();
    document.getElementById("totalCustomers").innerText = count;

    if (count == 0) {
      tbody.innerHTML = "<tr><td colspan='5'>لا يوجد عملاء</td></tr>";
      return;
    }

    const list = await bankContract.methods.listCustomers(1, count).call();

    list.forEach(c => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${c.id}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td class="balance-cell" data-balance="${c.balance}">
            ***
        </td>
        <td>
          <button class="secondary" onclick="promptEdit(${c.id}, '${c.name}', '${c.email}')">✏️ تعديل</button>
          <button onclick="removeCustomer(${c.id})">🗑 حذف</button>
        </td>
      `;

      tbody.appendChild(tr);
    });

    toggleBalanceView();
  } catch (err) {
    logEl("خطأ الجلب: " + err.message);
  }
}

// Remove
async function removeCustomer(id) {
  if (!confirm("تأكيد الحذف؟")) return;

  try {
    await bankContract.methods.removeCustomer(id).send({ from: account });
    logEl("تم حذف العميل: " + id);
    refreshCustomers();
  } catch (err) {
    logEl("خطأ الحذف: " + err.message);
  }
}

// ===== Modal System =====

function promptEdit(id, name, email) {
  editingId = id;

  document.getElementById("editName").value = name;
  document.getElementById("editEmail").value = email;

  document.getElementById("editModal").classList.remove("hidden");
}

document.getElementById("closeModalBtn").onclick = () => {
  document.getElementById("editModal").classList.add("hidden");
};

document.getElementById("saveEditBtn").onclick = () => {
  const name = document.getElementById("editName").value.trim();
  const email = document.getElementById("editEmail").value.trim();

  editCustomer(editingId, name, email);
  document.getElementById("editModal").classList.add("hidden");
};

// Edit Customer
async function editCustomer(id, name, email) {
  try {
    await bankContract.methods.updateCustomer(id, name, email)
      .send({ from: account });

    logEl("تم تعديل العميل #" + id);
    refreshCustomers();
  } catch (err) {
    logEl("خطأ التعديل: " + err.message);
  }
}

// ===== Show / Hide Balance =====
document.getElementById("showBalanceBtn").onclick = () => {
  balanceVisible = !balanceVisible;
  toggleBalanceView();
};

function toggleBalanceView() {
  const cells = document.querySelectorAll(".balance-cell");

  cells.forEach(td => {
    td.innerText = balanceVisible ? td.dataset.balance : "***";
  });

  document.getElementById("balanceHidden").innerText = 
    balanceVisible ? "الرصيد ظاهر" : "*** مخفي ***";

  document.getElementById("showBalanceBtn").innerText =
    balanceVisible ? "👁‍🗨 إخفاء" : "👁 إظهار";
}

// ===== Theme Switch =====
document.getElementById("themeToggle").onclick = () => {
  document.body.classList.toggle("dark-mode");
};

// Page Loaded
window.addEventListener("load", async () => {
  await loadContractAbi();

  document.getElementById("connectBtn").onclick = connectWallet;
  document.getElementById("addForm").addEventListener("submit", addCustomerHandler);
  document.getElementById("refreshBtn").onclick = refreshCustomers;
});
