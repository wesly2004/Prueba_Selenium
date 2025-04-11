const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('Prueba de Login', function () {
  this.timeout(30000); // Tiempo extendido para evitar errores por demora

  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Debe iniciar sesión exitosamente con credenciales válidas', async () => {
    await driver.get('http://127.0.0.1:5500/index.html'); // Asegúrate de que esté corriendo

    await driver.findElement(By.id('username')).sendKeys('admin');
    await driver.findElement(By.id('password')).sendKeys('1234');
    await driver.findElement(By.id('button')).click();

    let mensaje = await driver.wait(until.elementLocated(By.id('mensaje-login')), 5000);
    let texto = await mensaje.getText();

    // Captura de pantalla automática
    let screenshot = await driver.takeScreenshot();
    fs.writeFileSync(path.join(__dirname, 'screenshots', 'login-exitoso.png'), screenshot, 'base64');

    assert.strictEqual(texto, '✅ Login exitoso');
  });
});
