Feature: Customer Register

  Scenario: TC-005 - Customer Registrasi Akun Valid
    Given customer berada di halaman registrasi via login
    When customer memasukkan identitas registrasi lengkap yang valid
    And menekan tombol Sign Up
    Then customer berhasil terdaftar dan diarahkan kembali ke halaman login

  Scenario: TC-007-A - Customer Memasukkan Alamat Email yang sudah digunakan
    Given customer berada di halaman registrasi via login
    When customer memasukkan email yang sudah terdaftar "hakimalbaihaqy100@gmail.com"
    And menekan tombol Sign Up
    Then sistem menolak dan menampilkan pop up "Email Sudah Terdaftar"

  Scenario: TC-007-B - Customer Tidak Memasukkan Data Registrasi
    Given customer berada di halaman registrasi via login
    When customer mengosongkan semua data registrasi
    And menekan tombol Sign Up
    Then sistem menolak dan menampilkan pop up validasi "wajib diisi lengkap"

  Scenario: TC-007-C - Customer Mengisi Data Registrasi dan input password kurang dari 8 karakter
    Given customer berada di halaman registrasi via login
    When customer memasukkan password kurang dari delapan karakter "Hakim12"
    And menekan tombol Sign Up
    Then sistem menolak registrasi dan menampilkan pop up validasi password "password minimal 8 karakter."