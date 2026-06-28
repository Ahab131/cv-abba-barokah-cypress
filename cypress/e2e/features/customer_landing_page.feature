Feature: Customer Landing Page & Navigation Access

  @guest
  Scenario: TC-LP-001a - Memastikan Proteksi Akses Menu Product via Navbar untuk Guest
    Given pengunjung membuka beranda tanpa login
    When pengunjung menekan menu navbar "Product"
    Then sistem memunculkan sweetalert dengan pesan "Akses Terbatas! Silahkan Login / Registrasi Terlebih Dahulu!"
    
  @guest
  Scenario: TC-LP-001b - Memastikan Proteksi Akses Menu Purchase via Navbar untuk Guest
    Given pengunjung membuka beranda tanpa login
    When pengunjung menekan menu navbar "Purchase"
    Then sistem memunculkan sweetalert dengan pesan "Akses Terbatas! Silahkan Login / Registrasi Terlebih Dahulu!"

  @guest
  Scenario: TC-LP-002 - Memastikan Proteksi Tombol Order Produk untuk Guest
    Given pengunjung membuka beranda tanpa login
    When pengunjung menekan tombol penawaran "Order Produk"
    Then sistem memunculkan sweetalert dengan pesan "Akses Terbatas! Silahkan Login / Registrasi Terlebih Dahulu!"

  @auth
  Scenario: TC-LP-003 - Memastikan Tautan Navigasi Contact Berfungsi ke Footer
    Given pengunjung berada di halaman beranda utama setelah login sah
    When pengunjung menekan menu navbar khusus "Contact"
    Then halaman bergeser ke area footer dengan id "#main-footer"

  @auth
  Scenario: TC-LP-004 - Memastikan Fitur Pencarian Produk dengan Kata Kunci Valid
    Given pengunjung berada di halaman beranda utama setelah login sah
    When pengunjung mencari barang dengan teks "Meja Lipat" lalu enter
    Then sistem menyaring produk dan menampilkan teks nama "Meja Lipat"

  @auth
  Scenario: TC-LP-005-N - Melakukan Pencarian dengan Kata Kunci Produk yang Tidak Ada
    Given pengunjung berada di halaman beranda utama setelah login sah
    When pengunjung mencari barang dengan teks "Kursi" lalu enter
    Then sistem menyaring produk dan menampilkan pesan kosong "Belum ada produk terbaru yang tersedia"