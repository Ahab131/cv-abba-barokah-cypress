const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// ============================================================
// GLOBAL BACKGROUND / PRE-CONDITION
// ============================================================

Given("customer berada di halaman lupa password via login", () => {
  cy.visit("/login");
  
  // Klik link Lupa Password yang ada di sebelah Sign Up
  cy.contains("Lupa Password?").click();
  
  // Memastikan form reset password sudah termuat sempurna
  cy.get('input[name="email"]', { timeout: 10000 }).should("exist");
});

// ============================================================
// SCENARIO TC-008-A: Email Valid (Positive Path)
// ============================================================

When("customer memasukkan email yang terdaftar {string} dan password baru {string}", (email, newPassword) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(newPassword);
  cy.get('input[name="password_confirmation"]').clear().type(newPassword);
});

// ============================================================
// GLOBAL REUSABLE ACTION: MENEKAN TOMBOL SUBMIT
// ============================================================

When("menekan tombol Perbarui Password", () => {
  cy.get('button[type="submit"]').click();
});

// ============================================================
// SCENARIO TC-008-A: ASSERTION SUKSES
// ============================================================

Then("sistem berhasil memperbarui sandi dan diarahkan kembali ke halaman login dengan pop up sukses {string}", (successTitle) => {
  // Pastikan dialihkan kembali ke login
  cy.url({ timeout: 10000 }).should("include", "/login");
  
  // Verifikasi SweetAlert sukses muncul di halaman login sesuai revisi judul terbaru
  cy.get(".swal2-popup").should("be.visible");
  cy.get(".swal2-title").should("contain.text", successTitle);
  
  // Tutup SweetAlert
  cy.get(".swal2-confirm").click();
});

// ============================================================
// SCENARIO TC-008-B: Email Tidak Terdaftar (Negative Path)
// ============================================================

When("customer memasukkan email tidak terdaftar {string} dan password baru {string}", (invalidEmail, newPassword) => {
  cy.get('input[name="email"]').clear().type(invalidEmail);
  cy.get('input[name="password"]').clear().type(newPassword);
  cy.get('input[name="password_confirmation"]').clear().type(newPassword);
});

// ============================================================
// SCENARIO TC-008-C: Konfirmasi Tidak Sesuai (Negative Path)
// ============================================================

When("customer memasukkan email {string}, password {string}, namun konfirmasi salah {string}", (email, password, wrongConfirm) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('input[name="password_confirmation"]').clear().type(wrongConfirm);
});

// ============================================================
// SCENARIO TC-008-D: Menggunakan Password Lama Kembali (Negative Path)
// ============================================================

When("customer memasukkan email {string} dan password lama {string}", (email, oldPassword) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(oldPassword);
  cy.get('input[name="password_confirmation"]').clear().type(oldPassword);
});

// ============================================================
// GLOBAL REUSABLE THEN ASSERTION FOR ERRORS
// ============================================================

Then("sistem menolak perubahan dan menampilkan pop up error {string}", (expectedErrorTitle) => {
  // Tetap berada di halaman forgot-password karena gagal divalidasi oleh controller
  cy.url().should("include", "/forgot-password");
  
  // Verifikasi SweetAlert2 error muncul dengan title yang sesuai dengan skenario test case
  cy.get(".swal2-popup").should("be.visible");
  cy.get(".swal2-title").should("contain.text", expectedErrorTitle);
  
  // Tutup SweetAlert
  cy.get(".swal2-confirm").click();
});