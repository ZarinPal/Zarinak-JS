
(function(window){
    class Zarinak {
        constructor() {
            this.authority = '';
            this.body = document.body;
            this.targetUrl = 'https://www.zarinpal.com/pg/StartPay/';
            this.iframeId = 'Zarinak';

            if (window.addEventListener){
                addEventListener('message', this.receiveMessage, false);
            } else {
                attachEvent('onmessage', this.receiveMessage);
            }
        }

        setAuthority(input) {
            this.authority = input;
        }

        open() {
            if (this.authority == '' || this.authority == null || this.authority == undefined) {
                console.log('Authority is empty');
                return false;
            }

            if (isNaN(this.authority)) {
                console.log('Authority is invalid');
                return false;
            }

            let isMobile = {
                Windows() {
                    return /IEMobile/i.test(navigator.userAgent);
                },
                Android() {
                    return /Android/i.test(navigator.userAgent);
                },
                BlackBerry() {
                    return /BlackBerry/i.test(navigator.userAgent);
                },
                iOS() {
                    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
                },
                any() {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
                }
            };

            if (isMobile.any()) {
                window.location.href = this.targetUrl + this.authority + '/' + this.iframeId;
            } else {
                let iframe = document.createElement('iframe');
                iframe.src = this.targetUrl + this.authority + '/' + this.iframeId;
                iframe.id = this.iframeId;
                iframe.name = this.iframeId;
                iframe.frameBorder = "0";
                iframe.allowTransparency =  "true";
                iframe.style.backgroundColor = 'transparent';
                iframe.style.zIndex = '99999999';
                iframe.style.display = 'block';
                iframe.style.border = '0px none transparent';
                iframe.style.overflowX = 'hidden';
                iframe.style.overflowY = 'auto';
                iframe.style.visibility = 'visible';
                iframe.style.margin = '0 0 0 0';
                iframe.style.padding = '0 0 0 0';
                iframe.style.webkitTapHighlightColor = 'transparent';
                iframe.style.position = 'fixed';
                iframe.style.left = '0px';
                iframe.style.top = '0px';
                iframe.style.width = '100%';
                iframe.style.height = '100%';

                //console.log(urlParams, urlParams.join('/'), body);
                this.body.insertBefore(iframe, this.body.firstChild);
            }
        };

        close(href) {
            let iframe = document.getElementById(this.iframeId);
            iframe.parentElement.removeChild(iframe);
            if (href != null) {
                window.location = href;
            }
        }

        receiveMessage(event) {
            if (event.data.action == 'Close') {
                window.Zarinak.close(event.data.href);
            }
        }

    }

    if (typeof window.Zarinak == 'undefined') {
        window.Zarinak = new Zarinak();
        var checkout = document.getElementById('zarinak-checkout');
        if (checkout != null) {
            var authority = checkout.getAttribute('data-authority');
            if (authority != null) {
                window.Zarinak.setAuthority(authority);
                window.Zarinak.open();
            }
        }
    }

})(window);
