import { useEffect } from 'react';


export function InitFacebookSDK() {

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '1051208665855150',
        cookie: true,
        xfbml: true,
        version: 'v17.0'
      });

      window.FB.getLoginStatus(function (response: any) {
        statusChangeCallback(response);
      });
    }

    function statusChangeCallback(response: any) {
      console.log('statusChangeCallback');
      console.log(response);
      if (response.status === 'connected') {
        testAPI();
      } else {
      }
    }

    function testAPI() {
      console.log('Welcome! Fetching your information....');
      window.FB.api('/me', function (response: any) {
        console.log('Successful login for: ' + response.name);
        //document.getElementById('status')!.innerHTML = 'Thanks for logging in, ' + response.name + '!';
      });
    }

    // Load the Facebook SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode!.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);
}
