export default defineBackground(() => {
  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'ping') {
      // Respond immediately to confirm the extension is still valid
      // sendResponse({status: 'ok'});
    } else if (request.action === 'openPopup') {
      browser.windows.create({
        url: 'popup/index.html', // Path to your popup HTML file
        type: 'popup',
        width: 400,
        height: 300,
      });
    }
    // Return true to indicate we will send a response asynchronously
    return true;
  });
});