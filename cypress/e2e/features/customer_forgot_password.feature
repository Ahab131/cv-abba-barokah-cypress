Feature: Customer Auth Flow Lifecycle

  # ============================================================
  # LANGKAH 1: REGISTER CUSTOMER BARU
  # ============================================================
  Scenario: TC-005 - Customer Registrasi Akun Valid
    Given customer berada di halaman registrasi via login
    When customer memasukkan identitas registrasi lengkap yang valid
    And menekan tombol Sign Up
    Then customer berhasil terdaftar dan diarahkan kembali ke halaman login

  # ============================================================
  # LANGKAH 2: LOGIN MENGGUNAKAN AKUN YANG BARU DAFTAR
  # ============================================================
  Scenario: TC-006 - Customer Login Akun Valid
    Given customer berada di halaman login
    When customer memasukkan email "hakimalbaihaqy100@gmail.com" dan password "Madrid-Bayern_1-2"
    And menekan tombol Sign In
    Then customer berhasil login dan diarahkan ke landing page utama

  # ============================================================
  # LANGKAH 3: FITUR LUPA PASSWORD (AKUN SUDAH TERSEDIA DARI LANGKAH 1)
  # ============================================================
  Scenario: TC-008-A - Customer Mengubah Password dengan Email Valid
    Given customer berada di halaman lupa password via login
    When customer memasukkan email yang terdaftar "hakimalbaihaqy100@gmail.com" dan password baru "Abdul180904"
    When menekan tombol Perbarui Password
    Then sistem berhasil memperbarui sandi dan diarahkan kembali ke halaman login dengan pop up sukses "Password Berhasil Diperbarui"

  Scenario: TC-008-B - Customer Mengubah Password dengan Email Tidak Terdaftar
    Given customer berada di halaman lupa password via login
    When customer memasukkan email tidak terdaftar "palsu@gmail.com" dan password baru "Abdul180904"
    When menekan tombol Perbarui Password
    Then sistem menolak perubahan dan menampilkan pop up error "Email tidak terdaftar"

  Scenario: TC-008-C - Customer Mengubah Password dengan Konfirmasi Tidak Sesuai
    Given customer berada di halaman lupa password via login
    When customer memasukkan email "hakimalbaihaqy100@gmail.com", password "Abdul180904", namun konfirmasi salah "BedaPassword123"
    When menekan tombol Perbarui Password
    Then sistem menolak perubahan dan menampilkan pop up error "Konfirmasi password baru tidak cocok"

  Scenario: TC-008-D - Customer Mengubah Password Menggunakan Password yang Sudah Terdaftar
    Given customer berada di halaman lupa password via login
    When customer memasukkan email "hakimalbaihaqy100@gmail.com" dan password lama "Abdul180904"
    When menekan tombol Perbarui Password
    Then sistem menolak perubahan dan menampilkan pop up error "Gagal Mengubah Password"