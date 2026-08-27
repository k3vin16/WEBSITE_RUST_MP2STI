/* =============================================================
   SCRIPT.JS — Portofolio Kelompok RUST
   Catatan untuk Maba:
   - File ini sengaja dibuat sesederhana mungkin.
   - Hanya ada 1 fitur interaktif: tombol hamburger untuk
     membuka/menutup menu navigasi di tampilan mobile.
   - Ini contoh dasar "DOM manipulation":
       1. Ambil elemen dari HTML (document.querySelector)
       2. Beri event listener (event: 'click')
       3. Ubah class-nya (classList.toggle)
   ============================================================= */

// Tunggu sampai seluruh HTML selesai dimuat, baru jalankan script.
// Ini praktik yang baik supaya elemen yang dicari pasti sudah ada.
document.addEventListener('DOMContentLoaded', function () {

  // 1. Ambil tombol hamburger dan daftar link navbar
  var navToggle = document.querySelector('.navbar__toggle');
  var navLinks  = document.querySelector('.navbar__links');

  // 2. Pastikan elemennya ada dulu sebelum dipakai
  //    (jaga-jaga kalau suatu saat navbar diubah strukturnya)
  if (navToggle && navLinks) {

    // 3. Saat tombol hamburger diklik...
    navToggle.addEventListener('click', function () {
      // ...tambah/hapus class "is-open" pada daftar link.
      // Class "is-open" inilah yang diatur tampilannya di style.css
      // (lihat bagian media query mobile).
      navLinks.classList.toggle('is-open');

      // Bonus: ubah tampilan ikon hamburger jadi tanda "X" sederhana
      // dengan menambah/menghapus class pada tombolnya sendiri.
      navToggle.classList.toggle('is-active');
    });
  }

  /* =============================================================
     FITUR: TAB SERTIFIKAT PER ANGGOTA (khusus portfolio.html)
     Logikanya:
     1. Ambil semua tombol tab (.tab-btn) dan semua panel (.member-panel).
     2. Saat sebuah tombol diklik, baca atribut data-target-nya —
        itulah id panel yang harus ditampilkan.
     3. Lepas class "is-active" dari SEMUA tombol & panel dulu,
        baru pasang lagi ke tombol dan panel yang dipilih saja.
     Kalau elemen-elemen ini tidak ada di halaman (misal di
     index.html), kode ini otomatis tidak melakukan apa-apa.
  ============================================================= */
  var tabButtons   = document.querySelectorAll('.tab-btn');
  var memberPanels = document.querySelectorAll('.member-panel');

  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var targetPanel = document.getElementById(targetId);

      if (!targetPanel) return; // jaga-jaga kalau id salah ketik

      // Matikan semua tombol & panel yang sedang aktif
      tabButtons.forEach(function (b) { b.classList.remove('is-active'); });
      memberPanels.forEach(function (p) { p.classList.remove('is-active'); });

      // Aktifkan hanya tombol & panel yang baru saja diklik
      btn.classList.add('is-active');
      targetPanel.classList.add('is-active');
    });
  });

  /* =============================================================
     FITUR: MODAL "LIHAT DETAIL" SERTIFIKAT (khusus portfolio.html)
     Logikanya:
     1. Setiap kartu sertifikat (.cert-card) menyimpan datanya
        sendiri lewat atribut data-cert-title, data-cert-issuer,
        data-cert-desc, data-cert-img (lihat portfolio.html).
     2. Saat tombol "Lihat Detail" di dalam kartu itu diklik,
        JS mencari kartu induknya (closest('.cert-card')), lalu
        membaca atribut data-cert-*-nya.
     3. Nilai yang didapat dimasukkan ke dalam modal (jendela
        popup), lalu modal ditampilkan dengan class "is-open".
  ============================================================= */
  var certModal        = document.getElementById('certModal');
  var certModalImg      = document.getElementById('certModalImg');
  var certModalIssuer   = document.getElementById('certModalIssuer');
  var certModalTitle    = document.getElementById('certModalTitle');
  var certModalDesc     = document.getElementById('certModalDesc');
  var certModalClose    = document.getElementById('certModalClose');
  var certDetailButtons = document.querySelectorAll('.cert-card__detail-btn');

  // Fungsi untuk membuka modal dan mengisi kontennya
  function openCertModal(card) {
    certModalImg.src        = card.getAttribute('data-cert-img');
    certModalImg.alt        = card.getAttribute('data-cert-title');
    certModalIssuer.textContent = card.getAttribute('data-cert-issuer');
    certModalTitle.textContent  = card.getAttribute('data-cert-title');
    certModalDesc.textContent   = card.getAttribute('data-cert-desc');

    certModal.classList.add('is-open');
    document.body.classList.add('no-scroll'); // kunci scroll di belakang modal
  }

  // Fungsi untuk menutup modal
  function closeCertModal() {
    certModal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
  }

  if (certModal && certDetailButtons.length) {

    // Pasang event klik ke SEMUA tombol "Lihat Detail"
    certDetailButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.cert-card');
        if (card) openCertModal(card);
      });
    });

    // Tutup modal saat tombol "X" diklik
    certModalClose.addEventListener('click', closeCertModal);

    // Tutup modal saat area gelap di luar kotak modal diklik
    certModal.addEventListener('click', function (event) {
      if (event.target === certModal) closeCertModal();
    });

    // Tutup modal saat tombol Escape ditekan di keyboard
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeCertModal();
    });
  }

  /* -----------------------------------------------------------
     CATATAN UNTUK MABA:
     Kalau nanti ingin menambah interaksi baru (misalnya validasi
     form kontak, atau efek klik lainnya), tulis logikanya di
     dalam blok DOMContentLoaded ini juga, dengan pola yang sama:
       1. querySelector untuk ambil elemen
       2. addEventListener untuk pasang aksi
       3. classList / textContent untuk mengubah tampilan
  ----------------------------------------------------------- */

});