Feature: Customer Landing Page & Navigation Access (Website CV ABBA Barokah)

  @guest
  Scenario: TC-011 A - Memastikan Proteksi Akses Menu Navbar untuk Pengguna yang Belum Login (Guest)
    Given pengunjung membuka beranda tanpa login
    When pengunjung menekan menu navbar "Produk"
    Then sistem memunculkan sweetalert dengan title "Akses Terbatas!" dan pesan "Silahkan Login / Registrasi Terlebih Dahulu!"

  @guest
  Scenario: TC-011 B - Memastikan Proteksi Tombol Order Produk Memicu SweetAlert bagi Pengguna Belum Login
    Given pengunjung membuka beranda tanpa login
    When pengunjung menekan tombol penawaran "Order Produk"
    Then sistem memunculkan sweetalert dengan title "Akses Terbatas!" dan pesan "Silahkan Login / Registrasi Terlebih Dahulu!"

  @auth
  Scenario: TC-011 C - Memastikan Tautan Navigasi Contact Berfungsi Mengarahkan Halaman ke Footer
    Given pengunjung membuka beranda tanpa login
    When pengunjung menekan menu navbar "Kontak"
    Then halaman bergeser ke area footer dengan id "#main-footer"

  @auth
  Scenario: TC-011 D - Memastikan Fitur Pencarian Produk Dapat Digunakan dengan Kata Kunci Valid
    Given pengunjung berada di halaman beranda utama setelah login sah
    When pengunjung mencari barang dengan teks "Meja" lalu enter
    Then sistem menyaring produk dan menampilkan teks nama "Meja kantor"

  @auth
  Scenario: TC-008-A - Melakukan Pencarian dengan Kata Kunci Produk yang Tidak Ada di Database
    Given pengunjung berada di halaman beranda utama setelah login sah
    When pengunjung mencari barang dengan teks "Kursi" lalu enter
    Then sistem menyaring produk dan menampilkan pesan kosong "Belum ada produk terbaru yang tersedia"