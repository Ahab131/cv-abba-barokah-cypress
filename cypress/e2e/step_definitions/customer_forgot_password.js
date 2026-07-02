const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// ============================================================
// GLOBAL BACKGROUND / PRE-CONDITION
// ============================================================

Given("customer berada di halaman lupa password via login", () => {
  cy.visit("/login");
  cy.contains("Lupa Password?").click();
  cy.get('input[name="email"]', { timeout: 10000 }).should("exist");
});

// ============================================================
// GLOBAL REUSABLE ACTION: MENEKAN TOMBOL SUBMIT
// ============================================================

When("menekan tombol Perbarui Password", () => {
  cy.get('button[type="submit"]').click();
});

// ============================================================
// SCENARIO TC-012: Email Valid (Positive Path)
// ============================================================

When("customer memasukkan email yang terdaftar {string} dan password baru {string}", (email, newPassword) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(newPassword);
  cy.get('input[name="password_confirmation"]').clear().type(newPassword);
});

Then("sistem berhasil memperbarui sandi dan diarahkan kembali ke halaman login dengan pop up sukses {string}", (successTitle) => {
  cy.url({ timeout: 10000 }).should("include", "/login");
  
  cy.get(".swal2-popup", { timeout: 10000 }).should("be.visible");
  cy.get(".swal2-html-container").should(($div) => {
    const text = $div.text().toLowerCase();
    expect(text).to.include(successTitle.toLowerCase());
  });
  
  cy.get(".swal2-confirm").click();
});

// ============================================================
// SCENARIO TC-010-A: Email Tidak Terdaftar (Negative Path)
// ============================================================

When("customer memasukkan email tidak terdaftar {string} dan password baru {string}", (invalidEmail, newPassword) => {
  cy.get('input[name="email"]').clear().type(invalidEmail);
  cy.get('input[name="password"]').clear().type(newPassword);
  cy.get('input[name="password_confirmation"]').clear().type(newPassword);
});

// ============================================================
// SCENARIO TC-010-B: Menggunakan Password Yang Sama Sebelumnya (Negative Path)
// ============================================================

When("customer memasukkan email {string} dan password yang sama dengan password saat ini {string}", (email, oldPassword) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(oldPassword);
  cy.get('input[name="password_confirmation"]').clear().type(oldPassword);
});

Then("sistem mendeteksi respons perubahan password lama {string}", (expectedText) => {
  cy.get(".swal2-popup", { timeout: 10000 }).should("be.visible");
  cy.get(".swal2-html-container").should(($div) => {
    const text = $div.text().toLowerCase();
    expect(text).to.include(expectedText.toLowerCase());
  });
  cy.get(".swal2-confirm").click();
});

// ============================================================
// SCENARIO TC-010-C: Mengosongkan Semua Field Data (Negative Path)
// ============================================================

When("customer mengosongkan semua field lupa password", () => {
  cy.get('input[name="email"]').clear();
  cy.get('input[name="password"]').clear();
  cy.get('input[name="password_confirmation"]').clear();
});

Then("form lupa password tertahan oleh validasi bawaan browser", () => {
  cy.url().should("not.include", "/login");
  cy.get(".swal2-popup").should("not.exist");
  
  cy.get('input[name="email"]').then(($input) => {
    expect($input[0].validity.valueMissing).to.be.true;
  });
});

// ============================================================
// SCENARIO TC-010-D: Password Kurang Dari 8 Karakter (Negative Path)
// ============================================================

When("customer memasukkan email {string} dengan password kurang dari delapan karakter {string}", (email, shortPassword) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(shortPassword);
  cy.get('input[name="password_confirmation"]').clear().type(shortPassword);
});

// ============================================================
// SCENARIO TC-010-E: Mengosongkan Konfirmasi Password (Negative Path)
// ============================================================

When("customer memasukkan email {string} dan password {string} tetapi mengosongkan konfirmasi password", (email, password) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('input[name="password_confirmation"]').clear();
});

Then("form konfirmasi tertahan oleh validasi bawaan browser dengan pesan {string}", (validationMsg) => {
  cy.url().should("not.include", "/login");
  cy.get(".swal2-popup").should("not.exist");

  cy.get('input[name="password_confirmation"]').then(($input) => {
    expect($input[0].validity.valueMissing).to.be.true;
  });
});

// ============================================================
// GLOBAL REUSABLE THEN ASSERTION FOR SWEETALERT ERROR POP-UP
// ============================================================

Then("sistem menolak perubahan dan menampilkan pop up error {string}", (expectedErrorText) => {
  cy.get(".swal2-popup", { timeout: 10000 }).should("be.visible");
  cy.get(".swal2-html-container").should(($div) => {
    const text = $div.text().toLowerCase();
    expect(text).to.include(expectedErrorText.toLowerCase());
  });
  cy.get(".swal2-confirm").click();
});