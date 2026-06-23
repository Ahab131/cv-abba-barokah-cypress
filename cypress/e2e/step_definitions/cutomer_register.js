const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// ============================================================
// GLOBAL BACKGROUND / PRE-CONDITION
// ============================================================

Given("customer berada di halaman registrasi via login", () => {
  // Masuk ke halaman login terlebih dahulu sesuai dengan alur pre-condition
  cy.visit("/login");
  
  // Klik link menuju halaman sign up
  cy.contains("Sign Up").click();
  
  // Memastikan form registrasi sudah benar-benar termuat di browser
  cy.get('input[name="username"]', { timeout: 10000 }).should("exist");
});

// ============================================================
// SCENARIO TC-005: Registrasi Akun Valid (Positive Path)
// ============================================================

When("customer memasukkan identitas registrasi lengkap yang valid", () => {
  // Pengisian data berdasarkan Test Data dokumen TC-005
  cy.get('input[name="username"]').clear().type("Isopad23");
  cy.get('input[name="name"]').clear().type("Abdul Hakim Al Baihaqy");
  cy.get('input[name="password"]').clear().type("Hakim180904");
  cy.get('input[name="alamat_lengkap"]').clear().type("Jl. sana sini No. 16, kota Surabaya");
  cy.get('input[name="email"]').clear().type("hakimalbaihaqy100@gmail.com");
  
  // Memilih dropdown Provinsi & Kota
  cy.get('select[name="provinsi"]').select("Jawa Timur");
  cy.get('input[name="phone"]').clear().type("0857-8596-4677");
  cy.get('select[name="kota"]').select("Surabaya");
});

When("menekan tombol Sign Up", () => {
  // Melakukan klik pada tombol submit form
  cy.get('button[type="submit"]').click();
});

Then("customer berhasil terdaftar dan diarahkan kembali ke halaman login", () => {
  // Cek keberadaan elemen input email di halaman login untuk memastikan redirect sukses
  cy.get('input[name="email"]', { timeout: 10000 }).should("exist");

  // Validasi final kecocokan URL akhir aplikasi
  cy.url().should("include", "/login");
});

// ============================================================
// SCENARIO TC-007-A: Email Sudah Terdaftar (Negative Path)
// ============================================================

When("customer memasukkan email yang sudah terdaftar {string}", (duplicateEmail) => {
  // Isi data valid, namun gunakan email yang sudah ada di database untuk memicu error unique
  cy.get('input[name="username"]').clear().type("Isopad23");
  cy.get('input[name="name"]').clear().type("Abdul Hakim");
  cy.get('input[name="password"]').clear().type("Hakim180904");
  cy.get('input[name="alamat_lengkap"]').clear().type("Jl. sana sini No. 16, kota Surabaya");
  cy.get('input[name="email"]').clear().type(duplicateEmail);
  
  cy.get('select[name="provinsi"]').select("Jawa Timur");
  cy.get('input[name="phone"]').clear().type("0857-8596-4677");
  cy.get('select[name="kota"]').select("Surabaya");
});

Then("sistem menolak dan menampilkan pop up {string}", (errorMessage) => {
  // URL harus tetap tertahan di halaman register karena gagal validasi
  cy.url().should("include", "/register");

  // Deteksi kemunculan modul SweetAlert2 berdasarkan text-message custom di controller Anda
  cy.get(".swal2-popup").should("be.visible");
  cy.get(".swal2-html-container").should("contain.text", "sudah terdaftar");
  
  // Tutup jendela pop-up SweetAlert
  cy.get(".swal2-confirm").click();
});

// ============================================================
// SCENARIO TC-007-B: Tidak Memasukkan Data / Field Kosong (Negative Path)
// ============================================================

When("customer mengosongkan semua data registrasi", () => {
  // Mengosongkan seluruh field input secara eksplisit menggunakan .clear()
  cy.get('input[name="username"]').clear();
  cy.get('input[name="name"]').clear();
  cy.get('input[name="password"]').clear();
  cy.get('input[name="alamat_lengkap"]').clear();
  cy.get('input[name="email"]').clear();
  cy.get('input[name="phone"]').clear();
});

Then("sistem menolak dan menampilkan pop up validasi {string}", (validationMessage) => {
  // URL harus tetap di halaman register
  cy.url().should("include", "/register");

  // Deteksi SweetAlert validasi kegagalan input kosong (required)
  cy.get(".swal2-popup").should("be.visible");
  cy.get(".swal2-title").should("contain.text", "Registrasi Gagal");
  cy.get(".swal2-html-container").should("contain.text", "wajib diisi lengkap");
  
  // Tutup kembali jendela SweetAlert
  cy.get(".swal2-confirm").click();
});