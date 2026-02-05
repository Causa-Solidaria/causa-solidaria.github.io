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
