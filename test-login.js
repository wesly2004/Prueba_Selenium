const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');

async function loginTest() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options())
    .build();

  try {
    await driver.get('file://' + path.resolve(__dirname, 'index.html'));

    // Ingresar credenciales válidas o inválidas según el caso
    await driver.findElement(By.id('username')).sendKeys('admin');
    await driver.findElement(By.id('password')).sendKeys('admin');
    await driver.findElement(By.id('button')).click();

    // Esperar hasta que aparezca el mensaje de login
    let mensaje = await driver.wait(
      until.elementLocated(By.id('mensaje-login')),
      10000
    );

    let textoMensaje = await mensaje.getText();
    console.log("Mensaje de login:", textoMensaje);

    // Crear carpeta de capturas si no existe
    const screenshotDir = path.resolve(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir);
    }

    // Guardar captura de pantalla
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const resultado = textoMensaje.includes('✅') ? 'exito' : 'error';
    const screenshotName = `login-${resultado}-${timestamp}.png`;

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(path.join(screenshotDir, screenshotName), screenshot, 'base64');

    if (textoMensaje.includes('✅ Login exitoso')) {
      console.log("Prueba de login exitosa");
    } else {
      console.log("El mensaje de login no es el esperado");
    }

  } catch (error) {
    console.log("Error durante la prueba:", error);
  } finally {
    await driver.quit();
  }
}

loginTest();
