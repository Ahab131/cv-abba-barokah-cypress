const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// ============================================================
// CUSTOMER REGISTER STEP DEFINITIONS
//
// Alur Registrasi:
// 1. Masuk ke /login lalu klik tautan 'Sign Up' menuju /register
// 2. Mengisi field form registrasi sesuai dengan struktur `register.blade.php`
// 3. Menekan submit, divalidasi oleh AuthController, lalu diredirect ke /login
// ============================================================

Given("customer berada di halaman registrasi via login", () => {
  // Sesuai pre-condition: Membuka login lalu berpindah ke registrasi
  cy.visit("/login");
  cy.contains("Sign Up").click();
  
  // Memastikan elemen form registrasi sudah siap
  cy.get('input[name="username"]', { timeout: 10000 }).should("exist");
});

When("customer memasukkan identitas registrasi lengkap yang valid", () => {
  // Pengisian data berdasarkan Test Data pada dokumen TC-005
  cy.get('input[name="username"]').clear().type("Isopad23");
  cy.get('input[name="name"]').clear().type("Abdul Hakim");
  cy.get('input[name="password"]').clear().type("Madrid-Bayern_1-2");
  cy.get('input[name="alamat_lengkap"]').clear().type("Jl. sana sini No. 16, kota Surabaya");
  cy.get('input[name="email"]').clear().type("hakimalbaihaqy100@gmail.com");
  
  // Memilih dropdown menu wilayah
  cy.get('select[name="provinsi"]').select("Jawa Timur");
  cy.get('input[name="phone"]').clear().type("0857-8596-4677");
  cy.get('select[name="kota"]').select("Surabaya");
});

When("menekan tombol Sign Up", () => {
  cy.get('button[type="submit"]').click();
  // Memberikan jeda waktu prapemrosesan backend Laravel (BCrypt & Database Insert)
  cy.wait(3000);
});

Then("customer berhasil terdaftar dan diarahkan kembali ke halaman login", () => {
  // Expected Result & Actual Result: URL kembali ke halaman login
  cy.url({ timeout: 10000 }).should("include", "/login");
  
  // Optional: Memastikan form login utama sudah termuat kembali
  cy.get('input[name="email"]').should("exist");
});