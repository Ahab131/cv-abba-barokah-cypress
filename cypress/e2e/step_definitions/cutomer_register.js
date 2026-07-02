const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// ============================================================
// GLOBAL BACKGROUND / PRE-CONDITION
// ============================================================

Given("customer berada di halaman registrasi via login", () => {
  cy.visit("/login");
  cy.contains("Registrasi").click();
  cy.get('input[name="username"]', { timeout: 10000 }).should("exist");
});

// ============================================================
// SCENARIO TC-005: Registrasi Akun Valid (Positive Path)
// ============================================================

When("customer memasukkan identitas registrasi lengkap yang valid", () => {
  cy.get('input[name="username"]').clear().type("Isopad23");
  cy.get('input[name="name"]').clear().type("Abdul Hakim Al Baihaqy");
  cy.get('input[name="password"]').clear().type("Hakim180904");
  cy.get('input[name="alamat_lengkap"]').clear().type("Jl. sana sini No. 16, kota Surabaya");
  cy.get('input[name="email"]').clear().type("hakimalbaihaqy100@gmail.com");
  
  cy.get('select[name="provinsi"]').select("Jawa Timur", { force: true });
  cy.get('input[name="phone"]').clear().type("0857-8596-4677");
  cy.get('select[name="kota"]').select("Surabaya", { force: true });
});

When("menekan tombol Sign Up", () => {
  cy.get('button[type="submit"]').click();
});

Then("customer berhasil terdaftar dan diarahkan kembali ke halaman login", () => {
  cy.get('input[name="email"]', { timeout: 10000 }).should("exist");
  cy.url().should("include", "/login");
});

// ============================================================
// SCENARIO TC-007-A: Email Sudah Terdaftar (Negative Path)
// ============================================================

When("customer memasukkan email yang sudah terdaftar {string}", (duplicateEmail) => {
  cy.get('input[name="username"]').clear().type("Isopad23");
  cy.get('input[name="name"]').clear().type("Abdul Hakim");
  cy.get('input[name="password"]').clear().type("Hakim180904");
  cy.get('input[name="alamat_lengkap"]').clear().type("Jl. sana sini No. 16, kota Surabaya");
  cy.get('input[name="email"]').clear().type(duplicateEmail);
  
  cy.get('select[name="provinsi"]').select("Jawa Timur", { force: true });
  cy.get('input[name="phone"]').clear().type("0857-8596-4677");
  cy.get('select[name="kota"]').select("Surabaya", { force: true });
});

Then("sistem menolak dan menampilkan pop up {string}", (errorMessage) => {
  cy.url().should("include", "/register");
  cy.get(".swal2-popup").should("be.visible");
  cy.get(".swal2-html-container").should("contain.text", "sudah terdaftar");
  cy.get(".swal2-confirm").click();
});

// ============================================================
// SCENARIO TC-007-B: Tidak Memasukkan Data / Field Kosong (Negative Path)
// ============================================================

When("customer mengosongkan semua data registrasi", () => {
  cy.get('input[name="username"]').clear();
  cy.get('input[name="name"]').clear();
  cy.get('input[name="password"]').clear();
  cy.get('input[name="alamat_lengkap"]').clear();
  cy.get('input[name="email"]').clear();
  cy.get('input[name="phone"]').clear();
});

Then("sistem menolak dan menampilkan pop up validasi {string}", (validationMessage) => {
  cy.url().should("include", "/register");
  cy.get(".swal2-popup").should("be.visible");
  cy.get(".swal2-title").should("contain.text", "Registrasi Gagal");
  cy.get(".swal2-html-container").should("contain.text", "wajib diisi lengkap");
  cy.get(".swal2-confirm").click();
});

// ============================================================
// REVISI - SCENARIO TC-007-C: Password Kurang dari 8 Karakter (Negative Path)
// ============================================================

When("customer memasukkan password kurang dari delapan karakter {string}", (shortPassword) => {
  // Input data sesuai test data TC-007-C di tabel
  cy.get('input[name="username"]').clear().type("Revenge");
  cy.get('input[name="name"]').clear().type("Abdul Hakim");
  cy.get('input[name="password"]').clear().type(shortPassword); // Mengisi "Hakim12"
  cy.get('input[name="alamat_lengkap"]').clear().type("Jl. sana sini No. 16, kota Surabaya");
  cy.get('input[name="email"]').clear().type("hakimalbaihaqy@gmail.com");
  
  cy.get('select[name="provinsi"]').select("Jawa Timur", { force: true });
  cy.get('input[name="phone"]').clear().type("0857-8596-4677");
  cy.get('select[name="kota"]').select("Surabaya", { force: true });
});

Then("sistem menolak registrasi dan menampilkan pop up validasi password {string}", (expectedMessage) => {
  cy.url().should("include", "/register");

  // Memastikan SweetAlert muncul dan berisi pesan validasi password minimal 8 karakter
  cy.get(".swal2-popup").should("be.visible");
  cy.get(".swal2-html-container").should("contain.text", expectedMessage);
  
  // Tutup SweetAlert-nya
  cy.get(".swal2-confirm").click();
});