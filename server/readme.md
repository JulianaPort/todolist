# Descrição

Um TODO feito em react e nodejs.

#Informações importantes

no package.json usar no start do servidor transpile-only converte de js pra ts
 --ignore-watch node_modules para não ler o node_module
respawn para não para de executar
express é um micro framework - ele traz algumas funcionalidade prontas
migatrions - criar com numeros na frente pois a ordem de criação das tabelas é importante
knex -> escrever as querys em javascript
sobreescrever no package.json os comandos do knex:
em scripts :
 knex:migrate : "knex --knexfile (nome do arquivo de configuração) knexfile.ts migrate:latest"


# Funcionalidades

    ## Tarefas

    - Rotas para criar uma tarefa
    - Listar Tarefas
    - Filtar por estado da tarefa
    - Deletar Tarefas
    - Editar Tarefas
