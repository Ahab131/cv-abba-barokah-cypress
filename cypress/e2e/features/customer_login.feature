Feature: Customer Login

  Scenario: TC-006 - Customer Login Akun Valid
    Given customer berada di halaman login
    When customer memasukkan email "hakimalbaihaqy100@gmail.com" dan password "Hakim180904"
    And menekan tombol Sign In
    Then customer berhasil login dan diarahkan ke landing page utama

  Scenario: TC-006A - Customer Login Akun Invalid (Password Salah)
    Given customer berada di halaman login
    When customer memasukkan email "hakimalbaihaqy100@gmail.com" dan password "salah123"
    And menekan tombol Sign In
    Then sistem menolak login dan menampilkan pop up error "Login Gagal"

  Scenario: TC-006B - Customer Login Field Kosong
    Given customer berada di halaman login
    When customer mengosongkan email dan password
    And menekan tombol Sign In
    Then form tertahan oleh validasi bawaan browser