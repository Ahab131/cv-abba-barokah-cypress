Feature: Customer Forgot Password

  Scenario: TC-012 - Customer Mengubah Password dengan Email Valid
    Given customer berada di halaman lupa password via login
    When customer memasukkan email yang terdaftar "hakimalbaihaqy100@gmail.com" dan password baru "Albaihaqy180904"
    And menekan tombol Perbarui Password
    Then sistem berhasil memperbarui sandi dan diarahkan kembali ke halaman login dengan pop up sukses "Password berhasil diperbarui"

  Scenario: TC-010-A - Customer Mengubah Password dengan Email Tidak Terdaftar
    Given customer berada di halaman lupa password via login
    When customer memasukkan email tidak terdaftar "hakimalbaihaqy@gmail.com" dan password baru "Albaihaqy180904"
    And menekan tombol Perbarui Password
    Then sistem menolak perubahan dan menampilkan pop up error "Email tidak terdaftar"

  Scenario: TC-010-B - Customer Mengubah Password dengan Password Lama yang Sama
    Given customer berada di halaman lupa password via login
    When customer memasukkan email "hakimalbaihaqy100@gmail.com" dan password yang sama dengan password saat ini "Abdul180904"
    And menekan tombol Perbarui Password
    Then sistem mendeteksi respons perubahan password lama "Password"

  Scenario: TC-010-C - Customer Mengosongkan Semua Field Data Lupa Password
    Given customer berada di halaman lupa password via login
    When customer mengosongkan semua field lupa password
    And menekan tombol Perbarui Password
    Then form lupa password tertahan oleh validasi bawaan browser

  Scenario: TC-010-D - Customer Mengubah Password dengan Karakter Kurang Dari 8
    Given customer berada di halaman lupa password via login
    When customer memasukkan email "hakimalbaihaqy100@gmail.com" dengan password kurang dari delapan karakter "Abdul"
    And menekan tombol Perbarui Password
    Then sistem menolak perubahan dan menampilkan pop up error "Password minimal 8 karakter"

  Scenario: TC-010-E - Customer Mengosongkan Data Konfirmasi Password Baru
    Given customer berada di halaman lupa password via login
    When customer memasukkan email "hakimalbaihaqy100@gmail.com" dan password "Albaihaqy180904" tetapi mengosongkan konfirmasi password
    And menekan tombol Perbarui Password
    Then form konfirmasi tertahan oleh validasi bawaan browser dengan pesan "Harap isi Bidang ini!"