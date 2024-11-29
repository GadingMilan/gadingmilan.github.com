let productArray = [];
let autoincrement = 1;
const prodactTable = document.getElementById("prodactTable");
let currentEditIndex = null

function saveForm() {
const produk = document.getElementById("produk").value;
const harga = document.getElementById("harga").value;
const satuan = document.getElementById("satuan").value;
const kategori = document.getElementById("kategori").value;
const gambar = document.getElementById("gambar").value;
const stok = document.getElementById("stok").value;

if (currentEditIndex !== null) {
    productArray[currentEditIndex] = {
        kode: productArray[currentEditIndex].kode,
        produk,
        harga,
        satuan,
        kategori,
        gambar,
        stok: Number(stok)
    };
    currentEditIndex = null;

} else {
    const kode = "MD-0" + autoincrement++;
    productArray.push({
        kode,
        produk,
        harga,
        satuan,
        kategori,
        gambar,
        stok: Number(stok)
    });
}

renderTable();
document.getElementById("kode").value = "MD-0" + autoincrement;
}

function renderTable() {
    const tablebody = document.getElementById("prodactTable").getElementsByTagName("tbody")[0];
    let rownumber = 1;
    tablebody.innerHTML = "";
    productArray.forEach((prodact) => {
        const row = tablebody.insertRow();

        row.innerHTML = `
        <tr id="${prodact.kode}">
        <td>${rownumber++}</td>
        <td>${prodact.kode}</td>
        <td>${prodact.produk}</td>
        <td>${prodact.harga}</td>
        <td>${prodact.satuan}</td>
        <td>${prodact.kategori}</td>
        <td><img src="${prodact.gambar}" alt="${prodact.produk}" style="width: 100px; height: 100px; align-item: center"></td>
        <td>${prodact.stok}</td>
        <td>
        <button class="edit" onclick="editProdact('${prodact.kode}')">Edit</button>
        <button class="delete" onclick="deleteProdact('${prodact.kode}')">Delete</button> 
        </td>
        `;
        if (prodact.stok < 5) {
            const merah = row.cells[7];
            merah.classList.add("low-stock");
          }
    });
}

function editProdact(kode) {
    const prodact = productArray.find((p) => p.kode === kode);
    if (prodact) {
        document.getElementById("kode").value = prodact.kode
        document.getElementById("produk").value = prodact.produk
        document.getElementById("harga").value = prodact.harga
        document.getElementById("satuan").value = prodact.satuan
        document.getElementById("kategori").value = prodact.kategori
        document.getElementById("gambar").value = prodact.gambar
        document.getElementById("stok").value = prodact.stok

        currentEditIndex = productArray.indexOf(prodact);
    }
}

function deleteProdact(kode) {
    if (confirm("Yakin ingin menghapus Produk ini?"))
    { productArray = productArray.filter((prodact) => prodact.kode !== kode);
        renderTable();
    }
}

document.getElementById("kode").value = "MD-0" + autoincrement;