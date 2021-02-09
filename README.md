## Projeto Alurapic

Projeto de uma aplicação de compartilhamento de fotos, em que é possível adicionar, comentar e curtir fotos.

Este projeto utiliza a versão do Angular 6.0.7.

## Como executar a aplicação

Para executar a aplicação basta rodar os comandos `npm install` e `ng serve` e acessar `http://localhost:4200/`

## API

A aplicação consome <a href ="https://github.com/guisouza25/alurapic-api-java" >esta</a> API. Execute primeiro a API antes de iniciar esta aplicação.

## Deploy

Esta aplicação está sendo executada na nuvem, utlizando o serviço S3 da AWS. A API encontra-se executada em um contêiner Docker utilizando o serviço ECS.

Acesse:

  http://alurapic-angular.s3-website-sa-east-1.amazonaws.com/#/home
  
Informando `flavio` para o login e `123` para a senha.




