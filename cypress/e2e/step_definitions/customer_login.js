const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// ============================================================
// GLOBAL BACKGROUND / PRE-CONDITION
// ============================================================

Given("customer berada di halaman login", () => {
  // Mengunjungi halaman login utama customer
  cy.visit("/login");
  
  // Memastikan elemen input email sudah siap di render browser
  cy.get('input[name="email"]', { timeout: 10000 }).should("exist");
});

// ============================================================
// SCENARIO TC-006: Customer Login Akun Valid (Positive Path)
// ============================================================

When("customer memasukkan email {string} dan password {string}", (email, password) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear().type(password);
});

When("menekan tombol Sign In", () => {
  // Menekan tombol submit form login
  cy.get('button[type="submit"]').click();
});

Then("customer berhasil login dan diarahkan ke landing page utama", () => {
  // Sesuai AuthController, jika customer sukses login akan diredirect ke route('home') alias '/'
  cy.url({ timeout: 10000 }).should("eq", Cypress.config().baseUrl + "/");
  
  // Memastikan session login berhasil dengan mendeteksi hilangnya tombol sign-in atau adanya element dashboard khusus customer
  cy.get('form[action*="logout"]').should("exist"); 
});

// ============================================================
// SCENARIO TC-006A: Customer Login Akun Invalid (Negative Path)
// ============================================================

Then("sistem menolak login dan menampilkan pop up error {string}", (errorMessage) => {
  // URL harus tetap bertahan di halaman login
  cy.url().should("include", "/login");

  // Mendeteksi kemunculan modul pop-up error dari SweetAlert2 sesuai script login.blade.php Anda
  cy.get(".swal2-popup").should("be.visible");
  cy.get(".swal2-title").should("contain.text", errorMessage);
  cy.get(".swal2-html-container").should("contain.text", "Email atau password salah.");
  
  // Menutup SweetAlert pop-up dengan mengklik OK
  cy.get(".swal2-confirm").click();
});

// ============================================================
// SCENARIO TC-006B: Customer Login Field Kosong (Negative Path)
// ============================================================

When("customer mengosongkan email dan password", () => {
  cy.get('input[name="email"]').clear();
  cy.get('input[name="password"]').clear();
});

Then("form tertahan oleh validasi bawaan browser", () => {
  // Karena input email/password di login.blade.php Anda memiliki atribut HTML5 'required'
  // Browser akan memblokir submit form. URL dipastikan tidak berubah.
  cy.url().should("include", "/login");
  
  // Memastikan SweetAlert tidak muncul (karena form belum ter-submit ke backend)
  cy.get(".swal2-popup").should("not.exist");
});

// ============================================================
// TAMBAHAN - SCENARIO TC-006C: Password Kosong (Negative Path)
// ============================================================

When("customer memasukkan email {string} dan mengosongkan password", (email) => {
  cy.get('input[name="email"]').clear().type(email);
  cy.get('input[name="password"]').clear();
});

Then("form password tertahan oleh validasi bawaan browser", () => {
  cy.url().should("include", "/login");
  cy.get(".swal2-popup").should("not.exist");
  
  // Opsional tambahan: memastikan browser memicu HTML5 invalidation pada field password
  cy.get('input[name="password"]').then(($input) => {
    expect($input[0].validity.valueMissing).to.be.true;
  });
});

// ============================================================
// TAMBAHAN - SCENARIO TC-006D: Format Email Tanpa '@' (Negative Path)
// ============================================================

When("customer memasukkan email tanpa format at {string} dan password {string}", (invalidEmail, password) => {
  cy.get('input[name="email"]').clear().type(invalidEmail);
  cy.get('input[name="password"]').clear().type(password);
});

Then("form email tertahan oleh validasi bawaan browser", () => {
  cy.url().should("include", "/login");
  cy.get(".swal2-popup").should("not.exist");

  // Opsional tambahan: memastikan browser mendeteksi format email salah (typeMismatch)
  cy.get('input[name="email"]').then(($input) => {
    expect($input[0].validity.typeMismatch).to.be.true;
  });
});