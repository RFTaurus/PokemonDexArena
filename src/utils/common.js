export function deviceBrowsingEnvironment() {
  const { standalone } = window.navigator;
  const userAgent = window.navigator.userAgent.toLowerCase();
  const safari = /safari/.test(userAgent);
  const ios = /iphone|ipod|ipad/.test(userAgent);

  if (ios) {
    if (!standalone && safari) {
      return {
        isSafari: true,
        isWebViewIOS: false,
        isWebViewAndroid: false,
        isWebBrowser: false,
      };
    } else if (!standalone && !safari) {
      return {
        isSafari: false,
        isWebViewIOS: true,
        isWebViewAndroid: false,
        isWebBrowser: false,
      };
    }
  } else {
    if (userAgent.includes("wv")) {
      return {
        isSafari: false,
        isWebViewIOS: false,
        isWebViewAndroid: true,
        isWebBrowser: false,
      };
    }
    return {
      isSafari: false,
      isWebViewIOS: false,
      isWebViewAndroid: false,
      isWebBrowser: true,
    };
  }
}

export const getPackageClass = () => {
  return "";
};
