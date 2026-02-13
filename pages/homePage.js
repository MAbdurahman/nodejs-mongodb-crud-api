function HomePage() {

   //HTML
   return `<!doctype html>
    <html lang='en-US'>
    <head>
        <meta charset='UTF-8'>
        <meta content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'
              name='viewport'>
        <meta content='ie=edge' http-equiv='X-UA-Compatible'>      
        <!--normalize styles -->
        <link crossorigin='anonymous' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css'
              integrity='sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=='
              referrerpolicy='no-referrer' rel='stylesheet'/>
          <!-- google fonts-->   
          <link href='https://fonts.googleapis.com' rel='preconnect'>
          <link crossorigin href='https://fonts.gstatic.com' rel='preconnect'>
          <link href='https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Noto+Sans+Mono:wght@100..900&display=swap' rel='stylesheet'> 
        <title>Backend Server</title>
        <style>
            
            *,
            *::after,
            *::before {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                -o-user-select: none;
                user-select: none;
            }
            
            *::-moz-focus-inner {
                border: 0;
            }
            
            *:focus {
                outline: none;
            }
            
            html {
                font-size: 100%;
            }
            
            @media only screen and (max-width: 820px) {
                html {
                    font-size: 75%;
                }
            }
            
            @media only screen and (max-width: 540px) {
                html {
                    font-size: 50%;
                }
            }
            
            @media only screen and (max-width: 430px) {
                html {
                    font-size: 40%;
                }
            }
            
            @media only screen and (max-width: 375px) {
                html {
                    font-size: 37.5%;
                }
            }
            
            @media only screen and (max-width: 360px) {
                html {
                    font-size: 33.3333%;
               }
            }
            @media only screen and (max-width: 320px) {
                html {  
                    font-size: 30%;
                }
            }
            
            body {
                margin: 0;
                min-height: 100vh;
                font-family: 'Montserrat', sans-serif;
                font-optical-sizing: auto;
                font-weight: 400;
                font-style: normal;
                overflow: hidden;
            }
            
            .wrapper {
                position: relative;
                width: 100vw;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background-color: rgb(22, 22, 22);
            }
            
            #home {
                position: relative;
                height: 100%;
                width: 100%;
            }
            
            .brand {
                display: -webkit-box;
                display: flex;
                -webkit-box-align: center;
                align-items: center;
                -webkit-box-pack: center;
                justify-content: center;
            }
            
            .brand-gif {
                width: 55%;
                display: -webkit-box;
                display: flex;
                align-self: center;
            }
            
            @media screen and (max-width: 768px) {
                .brand-gif {
                    width: 60%;
                }
            }
            
            .page-title {
                text-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            
            .page-title > h1 {
                color: rgb(255, 255, 255);
                font-family: 'Lora', serif;
                font-optical-sizing: auto;
                font-style: normal;
                font-size: 5rem;
                font-weight: 500;
                margin-bottom: 0;
            }
            
            
            .page-title h2 {
                color: rgb(255, 255, 255);
                font-family: 'Montserrat', sans-serif;
                font-optical-sizing: auto;
                font-style: normal;
                font-size: 2rem;
                font-weight: 400;
                margin: 0;
            }
        </style>
    </head>
    <body>
    <div class='wrapper'>
        <section id='home'>
            <div class='page-title'>
                <h1>Backend Server</h1>
                <h2>MongoDB, Express.js, and Node.js</h2>
            </div>
        </section>
    </div>
    </body>
    </html>`
}

export default HomePage;