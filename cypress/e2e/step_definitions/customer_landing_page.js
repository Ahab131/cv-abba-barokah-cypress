const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

// ============================================================
// PRE-CONDITIONS (GUEST vs AUTH)
// ============================================================

Given("pengunjung membuka beranda tanpa login", () => {
  cy.visit("/"); 
});

Given("pengunjung berada di halaman beranda utama setelah login sah", () => {
  cy.visit("/login");
  cy.get('input[name="email"]').clear().type("hakimalbaihaqy100@gmail.com");
  cy.get('input[name="password"]').clear().type("Hakim180904");
  cy.get('button[type="submit"]').click();
  cy.url({ timeout: 10000 }).should("not.include", "/login");
});

// ============================================================
// ACTIONS & ASSERTIONS
// ============================================================

When("pengunjung menekan menu navbar {string}", (menuName) => {
  cy.get("nav").contains(menuName).click();
});

When("pengunjung menekan tombol penawaran {string}", (buttonName) => {
  cy.contains("button", buttonName).click({ force: true });
});

Then("sistem memunculkan sweetalert dengan pesan {string}", (expectedAlertText) => {
  // Validasi SweetAlert muncul
  cy.get(".swal2-popup", { timeout: 8000 }).should("be.visible");
  cy.get(".swal2-title").should("contain.text", "Akses Terbatas");
  
  // NOTE: Kita hanya memverifikasi alert muncul tanpa mengklik tombol konfirmasinya,
  // agar browser tidak berpindah rute secara paksa di tengah pengujian skenario guest.
});

When("pengunjung menekan menu navbar khusus {string}", (menuName) => {
  cy.get("nav").contains(menuName).click();
});

Then("halaman bergeser ke area footer dengan id {string}", (footerId) => {
  cy.get(footerId).should("be.visible");
});

When("pengunjung mencari barang dengan teks {string} lalu enter", (keyword) => {
  cy.get('input[name="search"]').should("be.visible").clear().type(`${keyword}{enter}`);
});

Then("sistem menyaring produk dan menampilkan teks nama {string}", (productName) => {
  cy.get("main").should("contain.text", productName);
});

Then("sistem menyaring produk dan menampilkan pesan kosong {string}", (fallbackMessage) => {
  cy.get("main").should("contain.text", fallbackMessage);
});