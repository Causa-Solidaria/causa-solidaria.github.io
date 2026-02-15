import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR" suppressHydrationWarning>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          rel="stylesheet"
        />
        {/* VLibras */}
        <script async src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
      </Head>
      <body className="antialiased">
        <div dangerouslySetInnerHTML={{
          __html: `
            <div vw class="enabled">
              <div vw-access-button class="active"></div>
              <div vw-plugin-wrapper>
                <div class="vw-plugin-top-wrapper"></div>
              </div>
            </div>
          `
        }} />
        <Main />
        <NextScript />

        {/* Inicialização do VLibras */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              new window.VLibras.Widget('https://vlibras.gov.br/app');
            `,
          }}
        />

        {/* Script do Tawk.to */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              Tawk_API.customStyle = {
                visibility: {
                  desktop: { position: 'br', xOffset: 20, yOffset: 20 },
                  mobile:  { position: 'br', xOffset: 10, yOffset: 10 }
                }
              };
              Tawk_API.onLoad = function(){
                Tawk_API.setAttributes({ 'hash': '' }, function(error){});
                // Força a cor verde primária no botão
                var style = document.createElement('style');
                style.textContent = [
                  '.tawk-min-container .tawk-button { background-color: #097D03 !important; }',
                  '.tawk-min-container .tawk-button:hover { background-color: #05b02a !important; }',
                  '#tawk-bubble-container .tawk-button { background-color: #097D03 !important; }',
                  '#tawk-bubble-container .tawk-button:hover { background-color: #05b02a !important; }'
                ].join('\\n');
                document.head.appendChild(style);
                // Também tenta injetar no iframe
                try {
                  var frames = document.querySelectorAll('iframe');
                  frames.forEach(function(f){
                    try {
                      var fd = f.contentDocument || f.contentWindow.document;
                      if(fd) fd.head.appendChild(style.cloneNode(true));
                    } catch(e){}
                  });
                } catch(e){}
              };
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/68adda10661c3b192cff79e7/1j3jhnket';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </Html>
  );
}
