Feature: Customer Register

  Scenario: TC-005 - Customer Registrasi Akun Valid
    Given customer berada di halaman registrasi via login
    When customer memasukkan identitas registrasi lengkap yang valid
    And menekan tombol Sign Up
    Then customer berhasil terdaftar dan diarahkan kembali ke halaman login