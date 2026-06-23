const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// ============================================================
// HOOKS: HANYA RESET DATABASE SATU KALI DI AWAL FILE RUN
// ============================================================
before(() => {
  // Database di-refresh murni sekali saja sebelum seluruh rangkaian skenario berjalan.
  // Ini menjamin database dalam kondisi bersih/kosong dari user duplikat.
  cy.exec("php artisan migrate:fresh --seed");
});

// ============================================================
// STEP DEFINITIONS: REGISTRASI (TC-005)
// ============================================================

Given("customer berada di halaman registrasi via login", () => {
  cy.visit("/login");
  cy.contains("Sign Up").click();
  cy.get('input[name="username"]', { timeout: 10000 }).should("exist");
});

When("customer memasukkan identitas registrasi lengkap yang valid", () => {
  cy.get('input[name="username"]').clear().type("Isopad23");
  cy.get('input[name="name"]').clear().type("Abdul Hakim");
  cy.get('input[name="password"]').clear().type("Madrid-Bayern_1-2"); // Password Awal
  cy.get('input[name="alamat_lengkap"]').clear().type("Jl. sana sini No. 16, kota Surabaya");
  cy.get('input[name="email"]').clear().type("hakimalbaihaqy100@gmail.com");
  
  cy.get('select[name="provinsi"]').select("Jawa Timur");
  cy.get('input[name="phone"]').clear().type("0857-8596-4677");
  cy.get('select[name="kota"]').select("Surabaya");
});

When("menekan tombol Sign Up", () => {
  cy.get('button[type="submit"]').click();
});

Then("customer berhasil terdaftar dan diarahkan kembali ke halaman login", () => {
  cy.get('input[name="email"]', { timeout: 10000 }).should("exist");
  cy.url().should("include", "/login");
});

// ============================================================
// STEP DEFINITIONS: LOGIN (TC-006)
// ============================================================

Given("customer berada di halaman login", () => {
  cy.visit("/login");
  cy.get('input[name="email"]', { timeout: 10000 }).should("exist");
});

When("customer memasukkan email {string} dan password {string}", (email, password) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
});

When("menekan tombol Sign In", () => {
  cy.get('button[type="submit"]').click();
});

Then("customer berhasil login dan diarahkan ke landing page utama", () => {
  cy.url({ timeout: 10000 }).should("eq", Cypress.config().baseUrl + "/");
  cy.get('form[action*="logout"]').should("exist");
  
  // Melakukan logout kembali agar bisa menguji form Lupa Password dari halaman luar
  cy.get('form[action*="logout"]').submit(); 
});

// ============================================================
// STEP DEFINITIONS: LUPA PASSWORD (TC-008)
// ============================================================

Given("customer berada di halaman lupa password via login", () => {
  cy.visit("/login");
  cy.contains("Lupa Password?").click();
  cy.get('input[name="email"]', { timeout: 10000 }).should("exist");
});

When("customer memasukkan email yang terdaftar {string} dan password baru {string}", (email, newPassword) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(newPassword);
  cy.get('input[name="password_confirmation"]').clear().type(newPassword);
});

When("menekan tombol Perbarui Password", () => {
  cy.get('button[type="submit"]').click();
});

Then("sistem berhasil memperbarui sandi dan diarahkan kembali ke halaman login dengan pop up sukses {string}", (successTitle) => {
  cy.url({ timeout: 10000 }).should("include", "/login");
  cy.get(".swal2-popup").should("be.visible");
  cy.get(".swal2-title").should("contain.text", successTitle);
  cy.get(".swal2-confirm").click();
});

When("customer memasukkan email tidak terdaftar {string} dan password baru {string}", (invalidEmail, newPassword) => {
  cy.get('input[name="email"]').clear().type(invalidEmail);
  cy.get('input[name="password"]').clear().type(newPassword);
  cy.get('input[name="password_confirmation"]').clear().type(newPassword);
});

When("customer memasukkan email {string}, password {string}, namun konfirmasi salah {string}", (email, password, wrongConfirm) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('input[name="password_confirmation"]').clear().type(wrongConfirm);
});

When("customer memasukkan email {string} dan password lama {string}", (email, oldPassword) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(oldPassword);
  cy.get('input[name="password_confirmation"]').clear().type(oldPassword);
});

Then("sistem menolak perubahan dan menampilkan pop up error {string}", (expectedErrorTitle) => {
  cy.url().should("include", "/forgot-password");
  cy.get(".swal2-popup").should("be.visible");
  cy.get(".swal2-title").should("contain.text", expectedErrorTitle);
  cy.get(".swal2-confirm").click();
});