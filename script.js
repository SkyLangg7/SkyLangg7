// script page input-belanja
function tambahItem() {
  const item = document.getElementById("item").value;

  if (item.trim() === "") {
    alert("Item tidak boleh kosong");
    return;
  }

  const daftarBelanja = JSON.parse(localStorage.getItem("daftarBelanja")) || [];
  const checkedItems = JSON.parse(localStorage.getItem("checkedItems")) || [];

  // Waktu
  const sekarang = new Date();
  const tanggal = sekarang.getDate().toString().padStart(2, "0");
  const bulan = (sekarang.getMonth() + 1).toString().padStart(2, "0");
  const tahun = sekarang.getFullYear();
  const jam = sekarang.getHours().toString().padStart(2, "0");
  const menit = sekarang.getMinutes().toString().padStart(2, "0");

  const waktu = `${tanggal}/${bulan}/${tahun} ${jam}:${menit}`;

  // Menambahkan item ke daftar belanja dan status checkbox (false untuk item baru)
  daftarBelanja.push({ item: item, waktu: waktu });
  checkedItems.push(false);

  localStorage.setItem("daftarBelanja", JSON.stringify(daftarBelanja));
  localStorage.setItem("checkedItems", JSON.stringify(checkedItems));

  document.getElementById("item").value = "";

  alert("Item berhasil ditambahkan!");
}

function lihatDaftar() {
  window.location.href = "daftar-belanja.html";
}

// Script page daftar-belanja
function tampilkanDaftar() {
  const daftar = document.getElementById("daftar");
  const daftarBelanja = JSON.parse(localStorage.getItem("daftarBelanja")) || [];
  const checkedItems = JSON.parse(localStorage.getItem("checkedItems")) || [];

  daftar.innerHTML = "";

  daftarBelanja.forEach((data, index) => {
    const li = document.createElement("li");
    li.className = "list-belanja";
    li.textContent = `${index + 1}. ${data.item}`;

    // Kelompok ket. waktu dan hapus-btn checkbox
    const divDaftar = document.createElement("div");
    divDaftar.className = "ket-container";
    divDaftar.style.display = "flex";

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-style";
    checkbox.checked = checkedItems[index];
    checkbox.addEventListener("change", () => {
      checkedItems[index] = checkbox.checked;
      localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
    });

    // ket. waktu
    const teksWaktu = document.createElement("p");
    teksWaktu.textContent = `${data.waktu}`;
    teksWaktu.style.marginRight = "3vw";
    teksWaktu.className = "teks-waktu";

    // hapus button
    const hapusButton = document.createElement("button");
    hapusButton.textContent = "Hapus";
    hapusButton.className = "hapus-btn";
    hapusButton.onclick = () => hapusItem(index);

    li.appendChild(divDaftar);
    divDaftar.appendChild(checkbox);
    divDaftar.appendChild(teksWaktu);
    divDaftar.appendChild(hapusButton);
    daftar.appendChild(li);
  });
}

function hapusItem(index) {
  const daftarBelanja = JSON.parse(localStorage.getItem("daftarBelanja")) || [];
  const checkedItems = JSON.parse(localStorage.getItem("checkedItems")) || [];
  const hapusItem = confirm("Apakah anda yakim ingin menghapus item ini?");

  if (hapusItem) {
    daftarBelanja.splice(index, 1);
    checkedItems.splice(index, 1);

    localStorage.setItem("daftarBelanja", JSON.stringify(daftarBelanja));
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));

    tampilkanDaftar();

    alert("Item berhasil dihapus");
  }
}

// fungsi button hapus semua
function hapusSemua() {
  const daftarBelanja = JSON.parse(localStorage.getItem("daftarBelanja")) || [];
  const checkedItems = JSON.parse(localStorage.getItem("checkedItems")) || [];
  const hapusSemua = confirm("Apakah Anda yakin ingin menghapus semua item?");
  if (hapusSemua) {
    daftarBelanja.splice(0, daftarBelanja.length);
    checkedItems.splice(0, checkedItems.length);
    localStorage.setItem("daftarBelanja", JSON.stringify(daftarBelanja));
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
    tampilkanDaftar();
    alert("Semua item berhasil dihapus");
  }
}

// Fungsi Button Kembali
function kembali() {
  window.location.href = "input-belanja.html";
}

if (document.getElementById("daftar")) {
  tampilkanDaftar();
}
