Para garantir o funcionamento correto da aplicação, siga estes passos:

1. _**Instalação de Dependências:**_
   - Navegue até o diretório da pasta `client` e `server` usando seu terminal.
   - Execute `npm i` em cada diretório para instalar todas as dependências necessárias.

2. _**Configuração do Banco de Dados:**_
   - Verifique se o MySQL está configurado e em execução na sua máquina.
   - Configure extensões e plugins necessários no seu ambiente de desenvolvimento para interagir com o MySQL.

3. _**Configuração do Arquivo .env:**_
   - Na pasta `server`, crie um arquivo `.env` na raiz.
   - Dentro do arquivo `.env`, adicione a seguinte linha para configurar a porta:
     
     - PORT=3000
     
   - Isso define a porta padrão para o servidor backend.

4. _**Inicialização dos Servidores:**_
   - Abra dois terminais separados, um para a pasta `client` e outro para a pasta `server`.

5. _**Comandos de Inicialização:**_
   - No terminal da pasta `client`, digite:
     
     - npm run dev
    
   - Isso iniciará o servidor de desenvolvimento para o frontend.

   - No terminal da pasta `server`, digite:
     
     - npm start
    
   - Isso iniciará o servidor backend.

6. _**Visualização da Aplicação:**_
   - Após iniciar ambos os servidores, você pode acessar o site através do link `localhost` exibido no terminal da pasta client.
   - Certifique-se de usar as portas corretas configuradas nos scripts de inicialização, como `localhost:5173` para o cliente e `localhost:3000` (ou a porta especificada no `.env`) para o servidor.

Seguindo esses passos, você estará pronto para desenvolver e visualizar sua aplicação localmente, garantindo que todas as configurações e dependências estejam corretamente configuradas.
