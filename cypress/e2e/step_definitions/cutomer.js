const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// ============================================================
// CUSTOMER REGISTER STEP DEFINITIONS (REVISED)
// ============================================================

Given("customer berada di halaman registrasi via login", () => {
  // Masuk ke halaman login terlebih dahulu sesuai dengan alur pre-condition
  cy.visit("/login");
  
  // Klik link menuju halaman sign up
  cy.contains("Sign Up").click();
  
  // Memastikan form registrasi sudah benar-benar termuat di browser
  cy.get('input[name="username"]', { timeout: 10000 }).should("exist");
});

When("customer memasukkan identitas registrasi lengkap yang valid", () => {
  // Pengisian data berdasarkan Test Data dokumen TC-005
  cy.get('input[name="username"]').clear().type("Isopad23");
  cy.get('input[name="name"]').clear().type("Abdul Hakim");
  cy.get('input[name="password"]').clear().type("Madrid-Bayern_1-2");
  cy.get('input[name="alamat_lengkap"]').clear().type("Jl. sana sini No. 16, kota Surabaya");
  cy.get('input[name="email"]').clear().type("hakimalbaihaqy100@gmail.com");
  
  // Memilih dropdown Provinsi & Kota
  cy.get('select[name="provinsi"]').select("Jawa Timur");
  cy.get('input[name="phone"]').clear().type("0857-8596-4677");
  cy.get('select[name="kota"]').select("Surabaya");
});

When("menekan tombol Sign Up", () => {
  // Melakukan klik pada tombol submit
  cy.get('button[type="submit"]').click();
});

Then("customer berhasil terdaftar dan diarahkan kembali ke halaman login", () => {
  // STRATEGI REVISI: Alih-alih langsung mengecek cy.url(), kita cek keberadaan 
  // elemen input email yang menjadi penanda bahwa halaman login sudah sukses dimuat.
  cy.get('input[name="email"]', { timeout: 10000 }).should("exist");

  // Setelah elemen dipastikan ada, baru kita validasi kecocokan URL-nya
  cy.url().should("include", "/login");
});